const baseUrl = 'http://localhost:3001/anecdotes'

const normalize = anecdote => ({
  ...anecdote,
  id: Number(anecdote.id)
})

const request = async (url, options) => {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.status === 204 ? null : response.json()
}

const getAll = async () => (await request(baseUrl)).map(normalize)

const create = async anecdote => normalize(await request(baseUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(anecdote)
}))

const update = async (id, anecdote) => normalize(await request(`${baseUrl}/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(anecdote)
}))

const remove = id => request(`${baseUrl}/${id}`, { method: 'DELETE' })

export default { getAll, create, update, remove }