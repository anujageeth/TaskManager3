import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const loginWithGoogle = () => {
    // Direct redirect instead of popup
    window.location.href = `${API_URL}/google`;
  };

  const logout = async () => {
    try {
      const response = await axios.get(`${API_URL}/logout`, { 
        withCredentials: true 
      });
      
      if (response.status === 200) {
        setCurrentUser(null);
        setIsAuthenticated(false);
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error?.response?.data || error.message);
      // Force logout on frontend even if backend fails
      setCurrentUser(null);
      setIsAuthenticated(false);
      window.location.href = '/login';
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    isAuthenticated,
    loginWithGoogle,
    logout,
    checkUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};