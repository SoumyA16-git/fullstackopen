import { useAnecdoteActions } from '../store'

const Anecdote = ({ anecdote }) => {
  const { deleteZeroVote, vote } = useAnecdoteActions()

  return (
    <li>
      <span>{anecdote.content} has {anecdote.votes} votes</span>{' '}
      <button type="button" onClick={() => vote(anecdote.id).catch(error => console.error(error))}>
        vote
      </button>
      {anecdote.votes === 0 && (
        <button type="button" onClick={() => deleteZeroVote(anecdote.id)}>
          delete
        </button>
      )}
    </li>
  )
}

export default Anecdote
