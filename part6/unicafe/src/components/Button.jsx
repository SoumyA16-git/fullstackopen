const Button = ({ onClick, children }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
)

export default Button
