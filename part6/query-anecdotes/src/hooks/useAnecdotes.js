import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import { useNotify } from './useNotify'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      if (anecdotes) {
        queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      }
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${newAnecdote.content}' created`)
    },
    onError: (error) => {
      notify(error.message)
    },
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      if (anecdotes) {
        queryClient.setQueryData(
          ['anecdotes'],
          anecdotes.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
        )
      }
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${updatedAnecdote.content}' voted`)
    },
    onError: (error) => {
      notify(error.message)
    },
  })

  const addAnecdote = (content) => {
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  const voteAnecdote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    error: result.error,
    addAnecdote,
    voteAnecdote,
  }
}
