import { useState, useEffect } from 'react';



const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the payload part of the token
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Token decoding error or invalid format, consider it expired
  }
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
    localStorage.removeItem('login');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Check token expiration on component mount
    const token = localStorage.getItem('login');
    setIsAuthenticated(Boolean(token) && token !== 'null' && !isTokenExpired(token));
  }, []);

  return { isAuthenticated, login, logout };
};