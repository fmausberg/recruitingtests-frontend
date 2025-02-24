"use client";

import React from 'react';
import { useAuth } from '../../appTest/api/auth/authContext';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import Link from 'next/link';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login'); // Redirect to login page after logout
  };

  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
      Klick mich
    </button>
  );
};

export default Header;