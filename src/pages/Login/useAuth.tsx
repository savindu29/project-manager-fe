import { useState } from 'react';

const isTokenExpired = (token: string | null): boolean => {
  return !token; // Consider the token expired if it's null or falsy
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const token = localStorage.getItem('login');

      // Check if the token is present and not expired
      return Boolean(token) && token !== 'null' && !isTokenExpired(token);
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
    // Set the token to null or some specific value
    localStorage.setItem('login', '');
    setIsAuthenticated(false);
    console.log('Token expired due to logout');
    window.location.href = '/dashboard';
  };

  return { isAuthenticated, login, logout };
};
