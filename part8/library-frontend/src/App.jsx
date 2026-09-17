import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import Notify from './components/Notify'
import { BOOK_ADDED } from './queries'
import { addBookToCache } from './utils/updateCache'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(() =>
    localStorage.getItem('library-user-token')
  )
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client: apolloClient }) => {
      const addedBook = data.data?.bookAdded
      if (addedBook) {
        window.alert(`New book added: ${addedBook.title}`)
        addBookToCache(apolloClient.cache, addedBook)
      }
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} notify={notify} />

      <Recommend show={page === 'recommend'} token={token} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        notify={notify}
      />
    </div>
  )
}

export default App
