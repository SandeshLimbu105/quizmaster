import { login, register } from './api.js';

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export const getCurrentUser = () => {
  return {
    id: localStorage.getItem('userId'),
    token: localStorage.getItem('token')
  };
};

export const handleLogin = async (email, password) => {
  try {
    const data = await login(email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const handleRegister = async (username, email, password) => {
  try {
    const data = await register(username, email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};