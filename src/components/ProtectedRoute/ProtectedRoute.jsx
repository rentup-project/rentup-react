import { Navigate } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { currentUser, isAuthFetched } = useAuthContext();

    if(currentUser && isAuthFetched) {
      return children
    } else {
      return <Navigate to="/" replace />
    }
}
