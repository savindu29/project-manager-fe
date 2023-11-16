import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const token = localStorage.getItem('login');
      return Boolean(token);
    } catch (error) {
      console.error('Error retrieving authentication status:', error);
      return false;
    }
  });

  const login = (token: string) => {
    localStorage.setItem('login', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('login');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
