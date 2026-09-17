import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Container, AppBar, Toolbar, Button, Box, Typography } from '@mui/material'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogDetail from './components/BlogDetail'
import Notification from './components/Notification'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import NotFound from './components/NotFound'
import ErrorBoundary from './components/ErrorBoundary'

import blogService from './services/blogs'
import userService from './services/users'
import { useUser } from './contexts/UserContext'
import { useNotification } from './contexts/NotificationContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { user, login, logout } = useUser()
  const { notification, showNotification } = useNotification()

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    initialData: []
  })

  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    initialData: []
  })

  const blogs = blogsResult.data || []
  const users = usersResult.data || []

  const sortedBlogs = [...blogs].sort(
    (a, b) => (b.likes || 0) - (a.likes || 0)
  )

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      showNotification(`a new blog "${newBlog.title}" by ${newBlog.author} added`)
    },
    onError: (error) => {
      showNotification(error.response?.data?.error || 'creating blog failed', 'error')
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, blog }) => blogService.update(id, blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      showNotification('blog liked')
    },
    onError: () => {
      showNotification('updating blog failed', 'error')
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      showNotification('blog deleted')
    },
    onError: () => {
      showNotification('deleting blog failed', 'error')
    }
  })

  const addCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      showNotification('comment added')
    },
    onError: () => {
      showNotification('adding comment failed', 'error')
    }
  })

  const handleLogin = async event => {
    event.preventDefault()

    try {
      await login({ username, password })
      setUsername('')
      setPassword('')
      showNotification('login successful')
      navigate('/')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    logout()
    setUsername('')
    setPassword('')
    showNotification('logged out')
    navigate('/')
  }

  const handleCreateBlog = async newBlog => {
    try {
      await createBlogMutation.mutateAsync(newBlog)
      navigate('/')
      return true
    } catch {
      return false
    }
  }

  const handleUpdateBlog = async (id, updatedBlog) => {
    return await updateBlogMutation.mutateAsync({ id, blog: updatedBlog })
  }

  const handleDeleteBlog = async id => {
    await deleteBlogMutation.mutateAsync(id)
    navigate('/')
  }

  const handleAddComment = async (id, comment) => {
    return await addCommentMutation.mutateAsync({ id, comment })
  }

  const Blogs = () => (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        blogs
      </Typography>

      {user && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          {user.name} logged in
        </Typography>
      )}

      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )

  const CreateBlog = () => {
    if (!user) {
      return (
        <div>
          <Typography variant="body1">login required</Typography>
        </div>
      )
    }

    return (
      <BlogForm
        createBlog={handleCreateBlog}
        hideTogglable={true}
      />
    )
  }

  const Login = () => (
    <LoginForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  )

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
          </Box>

          {!user && (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}

          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ color: 'white' }}>
                {user.name} logged in
              </span>
              <Button color="inherit" component={Link} to="/create">
                new blog
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Notification message={notification} />

      <ErrorBoundary>
        <Container sx={{ marginTop: 3 }}>
          <Routes>
            <Route
              path="/"
              element={<Blogs />}
            />

            <Route
              path="/users"
              element={<UsersView users={users} />}
            />

            <Route
              path="/users/:id"
              element={<UserView users={users} />}
            />

            <Route
              path="/blogs/:id"
              element={
                <BlogDetail
                  blogs={blogs}
                  user={user}
                  updateBlog={handleUpdateBlog}
                  deleteBlog={handleDeleteBlog}
                  addComment={handleAddComment}
                />
              }
            />

            <Route
              path="/create"
              element={<CreateBlog />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Container>
      </ErrorBoundary>
    </>
  )
}

export default App