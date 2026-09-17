import { ALL_BOOKS } from '../queries'

export const addBookToCache = (cache, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery({ query: ALL_BOOKS, variables: {} }, (data) => {
    if (!data || !data.allBooks) return data
    return {
      allBooks: uniqByName(data.allBooks.concat(addedBook)),
    }
  })
}
