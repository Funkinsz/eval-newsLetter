import { useContext } from "react"
import { AuthContext } from "../../context"
import { Navigate } from "react-router"

export default function ProtectedAdmin({ children }) {
    const { user } = useContext(AuthContext)

    return user.rôle === 1 ? children : <Navigate to="/" />
}