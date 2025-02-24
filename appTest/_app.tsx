import React from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from './api/auth/authContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;