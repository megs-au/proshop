import { Alert } from "flowbite-react"

const Message = ({ color='info', children }) => {
  return <Alert color={color}>{children}</Alert>
}

export default Message