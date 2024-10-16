import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Auth/useAuth';
import { ProtectedRouteProps } from '../interfaces/props/ProtectedRouteProps.interface';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  permission,
  children,
}) => {
  const { permissions } = useAuth();
  const location = useLocation();

  if (!permissions.includes(permission)) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
