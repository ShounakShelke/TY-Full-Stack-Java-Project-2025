import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login as apiLogin, register as apiRegister } from '../api/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (user && user.token) {
      setToken(user.token);
      localStorage.setItem('token', user.token);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      redirectToDashboard(user.role);
    }
  }, [user]);

  const redirectToDashboard = (role) => {
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'manager':
        navigate('/manager');
        break;
      case 'mechanic':
        navigate('/mechanic');
        break;
      case 'customer':
        navigate('/customer');
        break;
      default:
        navigate('/');
    }
  };

  const login = async ({ email, password }) => {
    const res = await apiLogin({ email, password });
    if (!res.error) {
      setUser(res);
      setToken(res.token);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res));
    }
    return res;
  };

  const register = async ({ email, username, password, role }) => {
    const res = await apiRegister({ email, username, password, role });
    if (!res.error) {
      setUser(res);
      setToken(res.token);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res));
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear(); // Also clean out all session storage for safety
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
