import { Navigate } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { currentUser } = useAuthContext();

    if(currentUser) {
      return children
    } else {
      return <Navigate to="/" replace />
    }
}
