import { useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const { data: userData, loading: userLoading, refetch } = useQuery(ME, {
    fetchPolicy: 'network-only',
  })
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (show && refetch) {
      refetch()
    }
  }, [show, refetch])

  if (!show) {
    return null
  }

  if (userLoading || booksLoading || !userData?.me) {
    return <div>loading...</div>
  }

  const user = userData.me
  const books = booksData?.allBooks || []
  const favoriteGenre = user.favoriteGenre || ''

  const favoriteBooks = favoriteGenre
    ? books.filter((b) => b.genres && b.genres.includes(favoriteGenre))
    : books

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
