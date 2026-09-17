const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red', border: '1px solid red', padding: 10, margin: '10px 0' }}>
      {errorMessage}
    </div>
  )
}

export default Notify
