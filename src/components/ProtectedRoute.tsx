import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Auth/useAuth';
import { ProtectedRouteProps } from '../interfaces/props/ProtectedRouteProps.interface';
import { useToasts } from '../hooks/useToasts';

interface ExtendedProtectedRouteProps extends ProtectedRouteProps {
  permissions: string[]; // Ahora puede aceptar múltiples permisos
  requireAll?: boolean; // Define si todos los permisos son requeridos (AND) o alguno (OR)
}

const ProtectedRoute: React.FC<ExtendedProtectedRouteProps> = ({
  permissions,
  requireAll = false, // Por defecto, solo se requiere uno (lógica OR)
  children,
}) => {
  const { token, permissions: userPermissions } = useAuth();
  const location = useLocation();
  const { ToastInfo } = useToasts();

  const hasPermission = requireAll
    ? permissions.every((perm) => userPermissions.includes(perm)) // Lógica AND
    : permissions.some((perm) => userPermissions.includes(perm)); // Lógica OR

  if (!token) {
    // Si no hay token, redirige a la página de inicio de sesión
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (!hasPermission) {
    // Muestra el mensaje de información
    ToastInfo('No tienes permisos para realizar esta acción.');
  
    // Redirige al usuario a la página principal
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  

  return <>{children}</>;
};

export default ProtectedRoute;
