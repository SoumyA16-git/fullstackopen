import { useAnecdoteActions } from '../store'

const Filter = () => {
  const filter = useAnecdoteActions()

  return (
    <label>
      filter <input aria-label="filter anecdotes" onChange={event => filter.setFilter(event.target.value)} />
    </label>
  )
}

export default Filter