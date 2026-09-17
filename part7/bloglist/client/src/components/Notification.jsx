import { Alert, Box } from '@mui/material'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  const text = typeof message === 'object' ? message.message : message
  const severity = typeof message === 'object' && message.type === 'error' ? 'error' : 'success'

  if (!text) {
    return null
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Alert severity={severity}>
        {text}
      </Alert>
    </Box>
  )
}

export default Notification