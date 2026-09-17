import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardActions, Button, Typography, Box, TextField, List, ListItem, ListItemText } from '@mui/material'
import NotFound from './NotFound'

const BlogDetail = ({ blogs, user, updateBlog, deleteBlog, addComment }) => {
  const [comment, setComment] = useState('')
  const id = useParams().id
  const navigate = useNavigate()
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return <NotFound />
  }

  const handleLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes || 0) + 1,
      user: typeof blog.user === 'object'
        ? blog.user.id || blog.user._id
        : blog.user
    }

    await updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )

    if (confirmed) {
      deleteBlog(blog.id)
      navigate('/')
    }
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    if (!comment.trim()) return
    if (addComment) {
      await addComment(blog.id, comment)
    }
    setComment('')
  }

  const isOwnBlog =
    blog.user &&
    user &&
    (blog.user.username === user.username || blog.user.id === user.id)

  return (
    <Card sx={{ maxWidth: 700, margin: '2rem auto' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          <strong>URL:</strong> <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Likes:</strong> {blog.likes || 0}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Added by {blog.user.name}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            comments
          </Typography>

          <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 1, my: 2 }}>
            <TextField
              label="comment"
              size="small"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              inputProps={{ 'aria-label': 'comment' }}
            />
            <Button type="submit" variant="contained">
              add comment
            </Button>
          </Box>

          <List>
            {(blog.comments || []).map((c, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={c} />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
      <CardActions>
        {user && (
          <Button size="small" variant="contained" onClick={handleLike}>
            Like
          </Button>
        )}
        {isOwnBlog && (
          <Button size="small" variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default BlogDetail
