// useAuth.ts
import { useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const token = localStorage.getItem('login');
      console.log('Token from local storage:', token);
      return Boolean(token);
    } catch (error) {
      console.error('Error retrieving authentication status:', error);
      return false;
    }
  });

  // const login = (token: string) => {
  //   localStorage.setItem('login', token);
  //   setIsAuthenticated(true);
  //   console.log('User logged in');
  // };

  const logout = () => {
    localStorage.removeItem('login');
    setIsAuthenticated(false);
    console.log('User logged out');
  };

  console.log('isAuthenticated:', isAuthenticated);

  return { isAuthenticated, };
};
