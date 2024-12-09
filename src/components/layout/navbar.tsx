import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Library, Menu, X, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'VIBE', path: '/vibe' },
  { label: '3D Models', path: '/models' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Upload', path: '/upload' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Library className="h-6 w-6" />
            <span className="text-xl font-bold">VI-LIBRARY</span>
          </Link>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  'text-sm transition-colors',
                  isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900'
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user?.role === 'admin' ? (
              <>
                <Button 
                  variant="default"
                  size="sm"
                  href="/admin"
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline"
                  size="sm"
                  href="/join"
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Button>
                <Button variant="ghost" href="/join">
                  Sign In
                </Button>
                <Button href="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    isActive ? 'text-black bg-gray-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-100">
                {user?.role === 'admin' ? (
                  <>
                    <Button 
                      variant="default"
                      href="/admin"
                      className="w-full flex items-center gap-2 justify-center mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-4 w-4" />
                      Admin Panel
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 justify-center"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline"
                      href="/join"
                      className="w-full flex items-center gap-2 justify-center mb-2"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Panel
                    </Button>
                    <Button variant="ghost" href="/join" className="w-full justify-start">
                      Sign In
                    </Button>
                    <Button href="/signup" className="w-full mt-2">
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}