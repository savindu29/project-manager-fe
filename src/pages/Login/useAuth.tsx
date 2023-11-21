// useAuth.ts
import { useState } from 'react';

export const useAuth = () => {
  const authKey = 'loginToken'; // Use the same key as in the LoginPage component
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const token = localStorage.getItem(authKey);
      return Boolean(token);
    } catch (error) {
      console.error('Error retrieving authentication status:', error);
      return false;
    }
  });

  const login = (token: string) => {
    localStorage.setItem(authKey, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(authKey);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
