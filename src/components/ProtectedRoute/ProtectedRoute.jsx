import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../store/AccessTokenStore";
import { useAuthContext } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  if (!currentUser) {
    const token = getAccessToken()
    const { currentUser } = useAuthContext()

    if (!token && !currentUser) {
        return <Navigate to="/login" replace />;
  }

  return (
    children
  );
}
