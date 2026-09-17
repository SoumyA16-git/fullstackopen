import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useAllAnecdotes, useAnecdoteActions, useSelectedId } from './store'

const App = () => {
  const anecdotes = useAllAnecdotes()
  const selectedId = useSelectedId()
  const { initialize, selectRandom, vote } = useAnecdoteActions()
  const selected = anecdotes.find(anecdote => anecdote.id === selectedId)

  useEffect(() => {
    initialize().catch(error => console.error(error))
  }, [initialize])

  return (
    <main>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <section aria-label="anecdote of the day">
        <h2>Anecdote of the day</h2>
        <p>{selected.content}</p>
        <p>has {selected.votes} votes</p>
        <button type="button" onClick={() => vote(selected.id).catch(error => console.error(error))}>vote</button>
        <button type="button" onClick={selectRandom}>next anecdote</button>
      </section>

      <section aria-label="all anecdotes">
        <h2>All anecdotes</h2>
        <AnecdoteList />
      </section>

      <section aria-label="add anecdote">
        <h2>create new</h2>
        <AnecdoteForm />
      </section>
    </main>
  )
}

export default App
