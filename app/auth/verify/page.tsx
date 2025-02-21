"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const [message, setMessage] = useState('Verifying...');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        const response = await fetch('http://localhost:8080/api/v0/auth/verifyMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: token,
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setMessage('Email verified successfully! You can now log in.');
          setTimeout(() => {
            router.push('/auth/login'); // Redirect to login page after a delay
          }, 3000);
        } else {
          setMessage(data.message || 'There was an error verifying your email. Please try again.');
        }
      } else {
        setMessage('Invalid verification token.');
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
}