'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../api/auth/authContext';
import { authenticatedFetch } from '../../api/apiHelper';

export default function UserProfile() {
  console.log("C1");
  interface User {
    username: string;
    mail: string;
    mailVerifiedAt: Date | null | undefined;
    firstName: string;
    lastName: string;
    birthday: Date | null | undefined;
  }

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  console.log("C2");

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);  // Check the value of isLoggedIn
    const fetchUser = async () => {
      try {
        console.log("Calling authenticatedFetch...");
        const response = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_URL}/appuser/me`, {
          method: 'GET',
        });
        console.log("Response from API:", response);  // Add this log
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to fetch user data.');
        }
      } catch (err) {
        console.log(err)
        setError('An error occurred while fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const sendVerificationMail = async () => {
    if (!user) return;

    console.log("Sending verification mail...");

    try {
      const response = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sendVerificationMail`, {
        method: 'POST',
        body: JSON.stringify({ username: user.username }),
      });

      console.log("Response:", response);

      if (response.ok) {
        alert('Verification mail sent successfully.');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to send verification mail.');
      }
    } catch (err) {
      console.error("Error:", err);
      alert('An error occurred while sending verification mail.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-slate-50 pt-16 pb-16 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center bg-slate-50 pt-16 pb-16 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">You are not logged in!</h1>
          <div className="space-y-6" />
          <div>
            <p className="text-textPrimary text-center">Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="">Error: {error}</div>;
  }

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-16 pb-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">User Profile</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Username</label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300">
              {user?.username}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Email</label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300">
              {user?.mail}
            </p>
            <p>Mail verified at: {formatDate(user?.mailVerifiedAt)}</p>
            <button
              onClick={sendVerificationMail}
              className="mt-4 bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded"
            >
              Resend Verification Mail
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">First Name</label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300">
              {user?.firstName}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Last Name</label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300">
              {user?.lastName}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Birthday</label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300">
              {formatDate(user?.birthday)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}