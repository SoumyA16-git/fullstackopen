import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material'

const UsersView = ({ users }) => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Users
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell><strong>User</strong></TableCell>
              <TableCell><strong>blogs created</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {user.blogs ? user.blogs.length : 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UsersView
