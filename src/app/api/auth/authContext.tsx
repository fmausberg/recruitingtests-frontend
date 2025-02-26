'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (jwttoken: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const jwttoken = localStorage.getItem('jwttoken');
    if (jwttoken) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (jwttoken: string, username: string) => {
    localStorage.setItem('jwttoken', jwttoken);
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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