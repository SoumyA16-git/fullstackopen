import { describe, expect, test, vi, beforeEach } from 'vitest'
import anecdoteReducer, {
  setAnecdotes,
  appendAnecdote,
  updateAnecdote,
  initializeAnecdotes,
  createAnecdote,
  voteAnecdote,
} from './anecdoteReducer'
import filterReducer, { filterChange } from './filterReducer'
import notificationReducer, {
  setNotificationText,
  clearNotification,
  setNotification,
} from './notificationReducer'
import anecdoteService from '../services/anecdotes'

vi.mock('../services/anecdotes')

describe('Redux Anecdotes Reducers & Thunks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('anecdoteReducer', () => {
    test('appendAnecdote adds an anecdote', () => {
      const state = []
      const action = appendAnecdote({ id: '1', content: 'test anecdote', votes: 0 })
      const newState = anecdoteReducer(state, action)
      expect(newState).toHaveLength(1)
      expect(newState).toContainEqual({ id: '1', content: 'test anecdote', votes: 0 })
    })

    test('setAnecdotes replaces all anecdotes', () => {
      const state = [{ id: '1', content: 'old', votes: 0 }]
      const action = setAnecdotes([
        { id: '2', content: 'first', votes: 1 },
        { id: '3', content: 'second', votes: 5 },
      ])
      const newState = anecdoteReducer(state, action)
      expect(newState).toHaveLength(2)
      expect(newState[0].content).toBe('first')
      expect(newState[1].votes).toBe(5)
    })

    test('updateAnecdote updates the matching anecdote', () => {
      const state = [
        { id: '1', content: 'first', votes: 0 },
        { id: '2', content: 'second', votes: 2 },
      ]
      const action = updateAnecdote({ id: '2', content: 'second', votes: 3 })
      const newState = anecdoteReducer(state, action)
      expect(newState.find((a) => a.id === '2').votes).toBe(3)
      expect(newState.find((a) => a.id === '1').votes).toBe(0)
    })
  })

  describe('filterReducer', () => {
    test('filterChange updates filter text', () => {
      const state = ''
      const action = filterChange('react')
      const newState = filterReducer(state, action)
      expect(newState).toBe('react')
    })
  })

  describe('notificationReducer', () => {
    test('setNotificationText and clearNotification', () => {
      const state = ''
      const setAction = setNotificationText('new notification')
      const step1 = notificationReducer(state, setAction)
      expect(step1).toBe('new notification')

      const clearAction = clearNotification()
      const step2 = notificationReducer(step1, clearAction)
      expect(step2).toBe('')
    })
  })

  describe('Asynchronous action creators (Redux Thunk)', () => {
    test('initializeAnecdotes fetches from service and dispatches setAnecdotes', async () => {
      const anecdotes = [{ id: '1', content: 'fetched', votes: 4 }]
      anecdoteService.getAll.mockResolvedValue(anecdotes)

      const dispatch = vi.fn()
      const thunk = initializeAnecdotes()
      await thunk(dispatch)

      expect(anecdoteService.getAll).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(setAnecdotes(anecdotes))
    })

    test('createAnecdote sends new anecdote to service and dispatches appendAnecdote', async () => {
      const newAnecdote = { id: '2', content: 'new wisdom', votes: 0 }
      anecdoteService.createNew.mockResolvedValue(newAnecdote)

      const dispatch = vi.fn()
      const thunk = createAnecdote('new wisdom')
      await thunk(dispatch)

      expect(anecdoteService.createNew).toHaveBeenCalledWith('new wisdom')
      expect(dispatch).toHaveBeenCalledWith(appendAnecdote(newAnecdote))
    })

    test('voteAnecdote updates anecdote on service and dispatches updateAnecdote', async () => {
      const initial = { id: '3', content: 'wisdom', votes: 5 }
      const updated = { id: '3', content: 'wisdom', votes: 6 }
      anecdoteService.update.mockResolvedValue(updated)

      const dispatch = vi.fn()
      const thunk = voteAnecdote(initial)
      await thunk(dispatch)

      expect(anecdoteService.update).toHaveBeenCalledWith({ id: '3', content: 'wisdom', votes: 6 })
      expect(dispatch).toHaveBeenCalledWith(updateAnecdote(updated))
    })

    test('setNotification thunk dispatches setNotificationText immediately and clearNotification after delay', async () => {
      vi.useFakeTimers()
      const dispatch = vi.fn()
      const thunk = setNotification('You voted', 3)
      await thunk(dispatch)

      expect(dispatch).toHaveBeenCalledWith(setNotificationText('You voted'))
      expect(dispatch).not.toHaveBeenCalledWith(clearNotification())

      vi.advanceTimersByTime(3000)
      expect(dispatch).toHaveBeenCalledWith(clearNotification())
      vi.useRealTimers()
    })
  })
})
