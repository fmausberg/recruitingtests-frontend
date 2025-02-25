'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  interface User {
    username: string;
    mail: string;
    firstName: string;
    lastName: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appuser/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwttoken')}`, // Assuming the token is stored in localStorage
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message || 'Failed to fetch user data.');
        }
      } catch (err) {
        setError('An error occurred while fetching user data.');
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-16 pb-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">User Profile</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Username</label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300">
              {user.username}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Email</label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300">
              {user.mail}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">First Name</label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300">
              {user.firstName}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Last Name</label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300">
              {user.lastName}
            </p>
          </div>
          {/* Add more user profile fields as needed */}
        </div>
      </div>
    </div>
  );
}