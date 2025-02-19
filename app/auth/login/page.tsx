"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Now using 'next/navigation'

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8080/api/v0/auth/directlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail: mail, password: password }),
    });
    const data = await response.json();
    console.log(data);

    if (data && data.jwttoken && data.appUser && data.appUser.username) {
      sessionStorage.setItem('jwttoken', data.jwttoken);
      sessionStorage.setItem('username', data.appUser.username);
      router.push('/home'); // Redirect to home page
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Username/eMail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
