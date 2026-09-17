import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.currentTarget
    const content = form.elements.anecdote.value.trim()

    if (content) {
      await add(content)
      form.reset()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="anecdote" aria-label="new anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm
