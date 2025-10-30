import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Unauthorized/>;
  }

  return children;
}
