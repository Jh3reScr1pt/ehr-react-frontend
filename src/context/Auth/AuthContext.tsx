import React, { createContext, useState, useEffect } from 'react';
import { Props } from '../../interfaces/props/props.interface';
import { loginRequest } from '../../api/auth';
import { Authentication } from '../../interfaces/Auth/auth.interface';
import { AuthContextType } from '../../interfaces/Auth/AuthContextType.interface';
import { useNavigate } from 'react-router-dom';
import { useToasts } from '../../hooks/useToasts';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [role, setRole] = useState<string>('');
  const [userfullname, setUserFullname] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const { ToastSuccess, ToastInfo, ToastError } = useToasts();

  useEffect(() => {
    const storedPermissions = JSON.parse(
      localStorage.getItem('permissions') || '[]',
    );
    const storedRole = localStorage.getItem('role') || '';
    const storedUserFullname = localStorage.getItem('userfullname') || '';
    const token = localStorage.getItem('token');

    if (token) {
      setPermissions(storedPermissions);
      setRole(storedRole);
      setUserFullname(storedUserFullname);
      setToken(token);
    }
  }, []);

  const login = async (auth: Authentication) => {
    try {
      const { userfullname, role, permissions, message } =
        await loginRequest(auth);
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      // Actualizar el estado con la información del usuario
      setUserFullname(userfullname);
      setRole(role);
      setPermissions(permissions);
      setMessage(message);
      setToken(token);
      ToastSuccess(message);
    } catch (error) {
      console.error('Login failed:', error);
      ToastError('Credenciales inválidas');
      throw error; // Propagar el error para manejarlo en el frontend si es necesario
    }
  };

  const logout = () => {
    ToastInfo('Hasta luego ' + userfullname);
    localStorage.removeItem('token');
    localStorage.removeItem('userfullname');
    localStorage.removeItem('role');
    localStorage.removeItem('permissions');
    setUserFullname('');
    setRole('');
    setPermissions([]);
    setToken(null);
    navigate('/auth/signin');
  };

  return (
    <AuthContext.Provider
      value={{ userfullname, role, permissions, token, login, logout, message }}
    >
      {children}
    </AuthContext.Provider>
  );
};
