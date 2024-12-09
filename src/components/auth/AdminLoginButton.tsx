import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function AdminLoginButton() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (user) {
    return (
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800"
      >
        <Shield className="h-4 w-4" />
        Logout ({user.role})
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowLoginModal(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800"
      >
        <Shield className="h-4 w-4" />
        Admin Panel
      </button>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}