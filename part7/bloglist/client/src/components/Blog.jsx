import { Link } from 'react-router-dom'
import { Card, CardContent, Typography } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <Card sx={{ marginBottom: 2 }} className="blog">
      <CardContent>
        <Typography variant="h6">
          <Link
            to={`/blogs/${blog.id}`}
            style={{ textDecoration: 'none', color: '#1976d2' }}
          >
            {blog.title}
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          by {blog.author}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Blog
