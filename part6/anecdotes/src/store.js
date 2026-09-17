import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

export const initialAnecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later.',
  'The first 90 percent of the code accounts for the first 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'There are only two hard things in Computer Science: cache invalidation and naming things.'
].map((content, id) => ({ id, content, votes: 0 }))

const createId = anecdotes =>
  anecdotes.reduce((highest, anecdote) => Math.max(highest, anecdote.id), -1) + 1

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: initialAnecdotes,
  selectedId: initialAnecdotes[0].id,
  filter: '',
  notification: null,
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes })
    },
    selectRandom: () => set(state => ({
      selectedId: state.anecdotes[
        Math.floor(Math.random() * state.anecdotes.length)
      ].id
    })),
    vote: async id => {
      const anecdote = get().anecdotes.find(item => item.id === id)
      const updated = { ...anecdote, votes: anecdote.votes + 1 }
      const saved = await anecdoteService.update(id, updated)
      set(state => ({
        anecdotes: state.anecdotes.map(item => item.id === id ? saved : item)
      }))
      get().actions.showNotification(`you voted '${anecdote.content}'`)
    },
    add: async content => {
      const saved = await anecdoteService.create({
        id: createId(get().anecdotes),
        content,
        votes: 0
      })
      set(state => ({ anecdotes: state.anecdotes.concat(saved) }))
      get().actions.showNotification(`a new anecdote '${content}' added`)
    },
    setFilter: filter => set({ filter }),
    deleteZeroVote: async id => {
      const anecdote = get().anecdotes.find(item => item.id === id)
      if (!anecdote || anecdote.votes !== 0) return
      await anecdoteService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(item => item.id !== id)
      }))
    },
    showNotification: message => {
      set({ notification: message })
      setTimeout(() => set({ notification: null }), 5000)
    },
    reset: () => set({
      anecdotes: initialAnecdotes,
      selectedId: initialAnecdotes[0].id,
      filter: '',
      notification: null
    })
  }
}))

export const useAllAnecdotes = () => useAnecdoteStore(state => state.anecdotes)

export const useAnecdotes = () => {
  const anecdotes = useAllAnecdotes()
  const filter = useAnecdoteStore(state => state.filter).toLowerCase()
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
}
export const useSelectedId = () => useAnecdoteStore(state => state.selectedId)
export const useNotification = () => useAnecdoteStore(state => state.notification)
export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)
