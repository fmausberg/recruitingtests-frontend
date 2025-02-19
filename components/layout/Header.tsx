"use client";

import React from 'react';
import { useAuth } from '../../app/api/auth/authContext';
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
    <header className={styles.header ?? ''}>
      <nav className={styles.nav ?? ''}>
        <ul className={styles.ul ?? ''}>
          <li className={styles.li ?? ''}><Link className={styles.a ?? ''} href="/">Home</Link></li>
          {isLoggedIn ? (
            <>
              <li className={styles.li ?? ''}><Link className={styles.a ?? ''} href="/profile">Profile</Link></li>
              <li className={styles.li ?? ''}><button className={styles.button ?? ''} onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li className={styles.li ?? ''}><Link className={styles.a ?? ''} href="/auth/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;