import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'PATIENT' | 'DOCTOR' | 'PHARMACY' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  loginWithOTP: (phone: string, otp: string, role: string, additionalData?: any) => Promise<void>;
  requestOTP: (phone: string, role: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Set up axios interceptors
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Response interceptor to handle token expiry
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                refreshToken
              });
              const { token } = response.data;
              localStorage.setItem('token', token);
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              // Retry the original request
              return axios.request(error.config);
            } catch (refreshError) {
              logout();
            }
          } else {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/auth/profile`);
          setUser(response.data.user);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (credentials: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      const { user, token, refreshToken } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
      toast.success('Login successful!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const requestOTP = async (phone: string, role: string) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/otp/request`, { phone, role });
      toast.success('OTP sent successfully!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to send OTP';
      toast.error(message);
      throw error;
    }
  };

  const loginWithOTP = async (phone: string, otp: string, role: string, additionalData?: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/otp/verify`, {
        phone,
        otp,
        role,
        additionalData
      });

      const { user, token, refreshToken } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
      toast.success('Login successful!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'OTP verification failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
  };

  const refreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    if (!token) throw new Error('No refresh token');

    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken: token
    });

    const { token: newToken } = response.data;
    localStorage.setItem('token', newToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      loginWithOTP,
      requestOTP,
      logout,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};