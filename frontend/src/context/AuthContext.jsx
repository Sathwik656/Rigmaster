import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const loadProfile = async () => {
    try {
      const res = await apiClient.get(API_ENDPOINTS.auth.profile);
      if (res.data.success) {
        setUser(res.data.data.user);
      }
    } catch (err) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await apiClient.post(API_ENDPOINTS.auth.login, { email, password });
    if (res.data.success) {
      localStorage.setItem('accessToken', res.data.data.accessToken);
      localStorage.setItem('refreshToken', res.data.data.refreshToken);
      setUser(res.data.data.user);
      return { success: true, user: res.data.data.user };
    }
    return { success: false, error: res.data.error };
  };

  const register = async (email, password, name) => {
    const res = await apiClient.post(API_ENDPOINTS.auth.register, { email, password, name });
    if (res.data.success) {
      return { success: true, user: res.data.data.user };
    }
    return { success: false, error: res.data.error };
  };

  const logout = async () => {
    try {
      await apiClient.post(API_ENDPOINTS.auth.logout);
    } catch (err) {
      // Continue even if logout fails
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loadProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
