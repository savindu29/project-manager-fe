import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('login');
    setIsAuthenticated(Boolean(token));
  }, []);

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
