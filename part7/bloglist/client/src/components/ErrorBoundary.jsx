import React from 'react'
import { Typography, Container, Box } from '@mui/material'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container sx={{ my: 4, textAlign: 'center' }}>
          <Box>
            <Typography variant="h4" component="h2" color="error" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1">
              An unexpected error occurred.
            </Typography>
          </Box>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
