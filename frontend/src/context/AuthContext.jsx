import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';

const API_URL = '/api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkUser = async () => {
    try {
      const response = await api.get(`${API_URL}/user`);
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

  useEffect(() => {
    checkUser();
  }, []);

  const logout = async () => {
    try {
      await api.get(`${API_URL}/logout`);
      setCurrentUser(null);
      setIsAuthenticated(false);
      window.location.href = '/login';
    } catch (err) {
      setError('Error logging out');
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        isAuthenticated,
        logout,
        checkUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;