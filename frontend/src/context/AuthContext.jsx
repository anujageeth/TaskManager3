import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/user', {
        withCredentials: true
      });
      setCurrentUser(response.data);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const logout = async () => {
    try {
      await axios.get('http://localhost:5000/api/auth/logout', {
        withCredentials: true
      });
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the request fails, clear the user state
      setCurrentUser(null);
      navigate('/login');
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    loading,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};