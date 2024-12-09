import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AdminLoginButton } from './auth/AdminLoginButton';
import { Library, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Library className="h-6 w-6" />
            <span className="text-xl font-bold">VI-LIBRARY</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/vibe" 
              className={({ isActive }) => 
                `text-sm ${isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`
              }
            >
              VIBE
            </NavLink>
            <NavLink 
              to="/models" 
              className={({ isActive }) => 
                `text-sm ${isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`
              }
            >
              3D Models
            </NavLink>
            <NavLink 
              to="/pricing" 
              className={({ isActive }) => 
                `text-sm ${isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`
              }
            >
              Pricing
            </NavLink>
            <NavLink 
              to="/upload" 
              className={({ isActive }) => 
                `text-sm ${isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`
              }
            >
              Upload
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <AdminLoginButton />
            <Link 
              to="/join" 
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-900"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <NavLink 
                to="/vibe" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-black bg-gray-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                VIBE
              </NavLink>
              <NavLink 
                to="/models" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-black bg-gray-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                3D Models
              </NavLink>
              <NavLink 
                to="/pricing" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-black bg-gray-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </NavLink>
              <NavLink 
                to="/upload" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-black bg-gray-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Upload
              </NavLink>
              <div className="pt-4 pb-3 border-t border-gray-100">
                <Link 
                  to="/join" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-black text-white hover:bg-gray-900 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}