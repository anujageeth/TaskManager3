import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< Updated upstream
=======
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      setCurrentUser(response.data);
      setIsAuthenticated(true);
      setError(null);
    } catch (error) {
      if (!error.response || error.response.status !== 401) {
        console.error('Auth error:', error.response?.data || error.message);
      }
      setCurrentUser(null);
      setIsAuthenticated(false);
      
      // Only redirect if not on home page
      if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };
>>>>>>> Stashed changes

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await axios.get('/api/auth/user', { withCredentials: true });
        setCurrentUser(res.data);
        setLoading(false);
      } catch (err) {
        console.log('Not authenticated');
        setCurrentUser(null);
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout', { withCredentials: true });
      setCurrentUser(null);
    } catch (err) {
      setError('Error logging out');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};