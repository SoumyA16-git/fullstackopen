import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test } from 'vitest'
import App from './App'
import { useFeedbackStore } from './store'

beforeEach(() => {
  useFeedbackStore.getState().actions.reset()
})

test('renders no feedback message initially', () => {
  render(<App />)

  expect(screen.getByText('No feedback given')).toBeInTheDocument()
})

test('stores feedback and calculates statistics', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: 'good' }))
  await user.click(screen.getByRole('button', { name: 'good' }))
  await user.click(screen.getByRole('button', { name: 'bad' }))

  expect(screen.getByText('2')).toBeInTheDocument()
  expect(screen.getByText('1')).toBeInTheDocument()
  expect(screen.getByText('0.3333333333333333')).toBeInTheDocument()
  expect(screen.getByText('66.66666666666666 %')).toBeInTheDocument()
})
