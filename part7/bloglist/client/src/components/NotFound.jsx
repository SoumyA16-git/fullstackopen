import { Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Back to blogs
      </Button>
    </Box>
  )
}

export default NotFound
