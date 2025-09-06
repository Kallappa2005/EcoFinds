import { Navigate, useLocation } from 'react-router-dom';
import { useUserData } from '../../context/userDataUtils';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUserData();
  const location = useLocation();

  if (isLoading) {
    // You could render a loading spinner here
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
