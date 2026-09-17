import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ show, setToken, setPage, notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN, {
    onError: () => {
      notify('login failed')
    },
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    try {
      const response = await login({ variables: { username, password } })
      if (response?.data?.login?.value) {
        const loginToken = response.data.login.value
        setToken(loginToken)
        localStorage.setItem('library-user-token', loginToken)
        setPage('authors')
        setUsername('')
        setPassword('')
      }
    } catch {
      notify('login failed')
    }
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
