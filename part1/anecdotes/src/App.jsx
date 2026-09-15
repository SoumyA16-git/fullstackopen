import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later.',
  'The first 90 percent of the code accounts for the first 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'There are only two hard things in Computer Science: cache invalidation and naming things.'
]

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const mostVotes = Math.max(...votes)
  const mostVoted = votes.indexOf(mostVotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>

      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <button onClick={vote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>

      <p>{anecdotes[mostVoted]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
}

export default App