// components/Navbar.tsx
import { useState } from 'react';
import { useAuth } from '../../app/api/auth/authContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-navbar-background shadow-lg">
      {/* Container with max-width and centering */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-12 items-center h-16">
          {/* Logo: On Mobile 1 of 2 columns, on Desktop 3 of 12 columns */}
          <div className="col-span-1 md:col-span-3">
            <span className="text-xl font-bold text-navbar-text">Logo</span>
          </div>

          {/* Navigation: Hidden on Mobile, on Desktop 6 of 12 columns */}
          <div className="hidden md:block md:col-span-6">
            <div className="grid grid-cols-4 gap-4 justify-items-center">
              <a className="hover:text-navbar-hover text-navbar-text" href="/home">Home</a>
            </div>
          </div>

          {/* Buttons: On Mobile 1 of 2 columns, on Desktop 3 of 12 columns */}
          <div className="col-span-1 md:col-span-3 justify-self-end">
            {/* Hamburger Menu only visible on Mobile */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-primaryButton-text"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Buttons only visible on Desktop */}
            <div className="hidden md:flex gap-2">
              {isLoggedIn ? (
                <>
                  <a href="/home/profile">
                    <button className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded">
                      My Profile
                    </button>
                  </a>
                  <button 
                    onClick={logout} 
                    className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <a href="/home/auth/login">
                    <button className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded">
                      Login
                    </button>
                  </a>
                  <a href="/home/auth/register">
                    <button className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded">
                      Register
                    </button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <a href="/home">
              <a className="block py-2 hover:text-navbar-hover text-navbar-text">Home</a>
            </a>
            {isLoggedIn ? (
              <>
                <a href="/home/profile">
                  <a className="block py-2 hover:text-navbar-hover text-navbar-text">My Profile</a>
                </a>
                <button 
                  onClick={logout} 
                  className="block py-2 hover:text-navbar-hover text-navbar-text"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <a href="/home/auth/login">
                  <a className="block py-2 hover:text-navbar-hover text-navbar-text">Login</a>
                </a>
                <a href="/home/auth/register">
                  <a className="block py-2 hover:text-navbar-hover text-navbar-text">Register</a>
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
