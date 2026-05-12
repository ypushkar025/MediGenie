import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user
  const loadUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/profile');
      setUser(res.data);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (formData) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', formData);
    setToken(res.data.token);
    setAuthToken(res.data.token);
    await loadUser();
  };

  // Login
  const login = async (formData) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', formData);
    setToken(res.data.token);
    setAuthToken(res.data.token);
    await loadUser();
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;