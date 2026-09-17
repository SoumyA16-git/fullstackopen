import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

import App from './App'
import { initialAnecdotes, useAnecdoteStore } from './store'
import anecdoteService from './services/anecdotes'

beforeEach(() => {
  vi.clearAllMocks()
  anecdoteService.getAll.mockResolvedValue(initialAnecdotes)
  anecdoteService.create.mockImplementation(async anecdote => anecdote)
  anecdoteService.update.mockImplementation(async (_id, anecdote) => anecdote)
  anecdoteService.remove.mockResolvedValue(null)
  useAnecdoteStore.getState().actions.reset()
})

test('6.2 votes for the selected anecdote', async () => {
  const user = userEvent.setup()
  render(<App />)

  const selectedSection = screen.getByRole('region', { name: 'anecdote of the day' })
  await user.click(within(selectedSection).getByRole('button', { name: 'vote' }))

  expect(within(selectedSection).getByText(/1\s+votes/)).toBeInTheDocument()
})

test('6.3 adds a new anecdote through the uncontrolled form', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.type(screen.getByRole('textbox', { name: 'new anecdote' }), 'A new test anecdote')
  await user.click(screen.getByRole('button', { name: 'add' }))

  expect(within(screen.getByRole('region', { name: 'all anecdotes' })).getByText(/A new test anecdote/)).toBeInTheDocument()
})

test('6.5 displays anecdotes in descending vote order', async () => {
  const user = userEvent.setup()
  render(<App />)

  const listSection = screen.getByRole('region', { name: 'all anecdotes' })
  const secondAnecdoteVote = within(listSection).getAllByRole('button', { name: 'vote' })[1]
  await user.click(secondAnecdoteVote)

  const items = screen.getAllByRole('listitem')
  expect(items[0]).toHaveTextContent(initialAnecdotes[1].content)
})

test('6.6 filters displayed anecdotes by content', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.type(screen.getByRole('textbox', { name: 'filter anecdotes' }), 'manpower')

  const list = screen.getByRole('region', { name: 'all anecdotes' })
  expect(within(list).getByText(/Adding manpower/)).toBeInTheDocument()
  expect(within(list).queryByText(/Premature optimization/)).not.toBeInTheDocument()
})

test('selectRandom chooses an anecdote using Math.random', async () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.5)
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: 'next anecdote' }))

  expect(screen.getByText(initialAnecdotes[3].content)).toBeInTheDocument()
  Math.random.mockRestore()
})
