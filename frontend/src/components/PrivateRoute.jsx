import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading, isAuthenticated, checkUser } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      checkUser();
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated && !currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRoute;