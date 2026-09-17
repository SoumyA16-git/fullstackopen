import { beforeEach, expect, test, vi } from 'vitest'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

import { initialAnecdotes, useAnecdoteStore } from './store'
import anecdoteService from './services/anecdotes'

beforeEach(() => {
  vi.clearAllMocks()
  anecdoteService.create.mockImplementation(async anecdote => anecdote)
  anecdoteService.update.mockImplementation(async (_id, anecdote) => anecdote)
  anecdoteService.remove.mockResolvedValue(null)
  useAnecdoteStore.getState().actions.reset()
})

test('store adds anecdotes immutably', async () => {
  const before = useAnecdoteStore.getState().anecdotes
  await useAnecdoteStore.getState().actions.add('stored anecdote')
  const after = useAnecdoteStore.getState().anecdotes

  expect(after).toHaveLength(initialAnecdotes.length + 1)
  expect(after).not.toBe(before)
  expect(after.at(-1)).toMatchObject({ content: 'stored anecdote', votes: 0 })
})

test('store votes without mutating other anecdotes', async () => {
  await useAnecdoteStore.getState().actions.vote(0)
  const state = useAnecdoteStore.getState()

  expect(state.anecdotes[0].votes).toBe(1)
  expect(state.anecdotes[1].votes).toBe(0)
})

test('6.7 initializes anecdotes from the service', async () => {
  const serverAnecdotes = [{ id: 10, content: 'From server', votes: 4 }]
  anecdoteService.getAll.mockResolvedValue(serverAnecdotes)

  await useAnecdoteStore.getState().actions.initialize()

  expect(useAnecdoteStore.getState().anecdotes).toEqual(serverAnecdotes)
})

test('6.8 adds an anecdote through the service', async () => {
  const created = { id: 20, content: 'Persisted', votes: 0 }
  anecdoteService.create.mockResolvedValue(created)

  await useAnecdoteStore.getState().actions.add('Persisted')

  expect(anecdoteService.create).toHaveBeenCalled()
  expect(useAnecdoteStore.getState().anecdotes).toContainEqual(created)
})

test('6.9 updates votes through the service', async () => {
  const updated = { ...initialAnecdotes[0], votes: 1 }
  anecdoteService.update.mockResolvedValue(updated)

  await useAnecdoteStore.getState().actions.vote(0)

  expect(anecdoteService.update).toHaveBeenCalledWith(0, updated)
  expect(useAnecdoteStore.getState().anecdotes[0]).toEqual(updated)
})

test('6.10 stores a notification message', () => {
  useAnecdoteStore.getState().actions.showNotification('voted')

  expect(useAnecdoteStore.getState().notification).toBe('voted')
})

test('6.11 deletes only anecdotes with zero votes', async () => {
  await useAnecdoteStore.getState().actions.deleteZeroVote(0)

  expect(anecdoteService.remove).toHaveBeenCalledWith(0)
  expect(useAnecdoteStore.getState().anecdotes).not.toContainEqual(initialAnecdotes[0])
})
