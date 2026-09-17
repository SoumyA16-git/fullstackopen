import { useAnecdotes } from '../store'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const sortedAnecdotes = [...anecdotes].sort((first, second) => second.votes - first.votes)

  return (
    <ul>
      {sortedAnecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </ul>
  )
}

export default AnecdoteList
