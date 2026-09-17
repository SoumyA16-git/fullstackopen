/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'
import persistentUser from '../services/persistentUser'
import blogService from '../services/blogs'
import loginService from '../services/login'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = persistentUser.getUser()
    if (loggedUser) {
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const login = async (credentials) => {
    const loggedUser = await loginService.login(credentials)
    persistentUser.saveUser(loggedUser)
    blogService.setToken(loggedUser.token)
    setUser(loggedUser)
    return loggedUser
  }

  const logout = () => {
    persistentUser.removeUser()
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}

export default UserContext
