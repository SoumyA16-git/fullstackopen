import { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import Togglable from './Togglable'

const BlogForm = ({ createBlog, hideTogglable = false }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    const success = await createBlog({
      title,
      author,
      url
    })

    if (success) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  const formContent = (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, margin: '1rem auto' }}>
      <Typography variant="h5" gutterBottom>
        Create new
      </Typography>

      <TextField
        id="title"
        label="title:"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        variant="outlined"
        fullWidth
      />

      <TextField
        id="author"
        label="author:"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        variant="outlined"
        fullWidth
      />

      <TextField
        id="url"
        label="url:"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        variant="outlined"
        fullWidth
      />

      <Button type="submit" variant="contained">
        Create
      </Button>
    </Box>
  )

  if (hideTogglable) {
    return formContent
  }

  return (
    <Togglable buttonLabel="create new blog">
      {formContent}
    </Togglable>
  )
}

export default BlogForm