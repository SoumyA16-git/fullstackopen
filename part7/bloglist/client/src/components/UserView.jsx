import { useParams, Link } from 'react-router-dom'
import { Typography, Box, List, ListItem, ListItemText, Paper, Button } from '@mui/material'
import NotFound from './NotFound'

const UserView = ({ users }) => {
  const { id } = useParams()
  const user = users.find((u) => u.id === id)

  if (!user) {
    return <NotFound />
  }

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {user.name}
      </Typography>

      <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
        added blogs
      </Typography>

      {user.blogs && user.blogs.length > 0 ? (
        <Paper variant="outlined">
          <List>
            {user.blogs.map((blog) => (
              <ListItem key={blog.id || blog.title} divider>
                <ListItemText
                  primary={
                    blog.id ? (
                      <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                        {blog.title}
                      </Link>
                    ) : (
                      blog.title
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="body1" color="textSecondary">
          no blogs added yet
        </Typography>
      )}

      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" component={Link} to="/users">
          back to users
        </Button>
      </Box>
    </Box>
  )
}

export default UserView
