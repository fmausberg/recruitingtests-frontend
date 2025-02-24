'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../api/auth/authContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/v0/auth/directlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail: formData.email, password: formData.password }),
    });
    const data = await response.json();
    console.log(data);

    if (data && data.jwttoken && data.appUser && data.appUser.username) {
      login(data.jwttoken, data.appUser.username);
      router.push('/home'); // Redirect to home page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-textPrimary mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
              placeholder="ihre@email.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-textPrimary mb-2"
            >
              Passwort
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Additional Links */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-slate-300 text-formsDesigns-checkbox shadow-sm focus:formsDesigns-focus focus:ring focus:ring-formsDesigns-focus focus:ring-opacity-50" />
              <span className="ml-2 text-textPrimary">Angemeldet bleiben</span>
            </label>
            <a href="/home/auth/forgot-password" className="text-links hover:text-links-hover">
              Passwort vergessen?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primaryButton text-primaryButton-text py-2 px-4 rounded-md hover:bg-primaryButton-hover focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus focus:ring-offset-2 transition-colors duration-300"
          >
            Einloggen
          </button>

          {/* Registration Link */}
          <p className="text-center text-sm text-textPrimary-light">
            Noch kein Konto?{' '}
            <a href="/home/auth/register" className="text-links hover:text-links-hover">
              Jetzt registrieren
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}