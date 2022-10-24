import { Navigate } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { currentUser, isAuthFetched } = useAuthContext();

    if (isAuthFetched && !currentUser) {
        return <Navigate to="/login" replace />
    }

    return (
      children
    )
}
