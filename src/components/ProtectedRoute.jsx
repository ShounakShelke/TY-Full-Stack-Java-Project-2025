import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user } = useAuth();

  // Show loading state while checking auth
  if (isAuthenticated === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (roles && user?.role && !roles.includes(user.role)) {
    return <Unauthorized/>;
  }

  return children;
}
