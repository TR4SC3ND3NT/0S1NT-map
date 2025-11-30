import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth.js';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return React.createElement(Navigate, {
      to: '/login',
      replace: true,
      state: { from: location }
    });
  }

  return children;
}
