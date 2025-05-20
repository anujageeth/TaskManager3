import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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