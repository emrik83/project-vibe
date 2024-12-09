import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user || !['admin', 'vendor'].includes(user.role)) {
    return <Navigate to="/join" replace />;
  }

  return <>{children}</>;
}