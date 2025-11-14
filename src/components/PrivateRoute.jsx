import { Navigate } from "react-router-dom"
import { useData } from "../context/DataContext"

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useData()

  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />
  }

  return children
}
