import { Authentication } from '../interfaces/Auth/auth.interface';
import { API_URL } from './api';
import { DecodedToken } from '../interfaces/Auth/DecodedToken.interface';
import { jwtDecode } from 'jwt-decode';

const API_URL_AUTH = `${API_URL}/auth`;

export const loginRequest = async (auth: Authentication) => {
  const response = await fetch(`${API_URL_AUTH}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(auth),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('token', data.access_token);

    // Decodificar el token usando la interfaz personalizada
    const decoded = jwtDecode<DecodedToken>(data.access_token);
    const msg = data.message;

    // Almacenar la información relevante en localStorage
    localStorage.setItem('userfullname', decoded.userfullname);
    localStorage.setItem('role', decoded.role);
    localStorage.setItem('permissions', JSON.stringify(decoded.permissions));

    return {
      userfullname: decoded.userfullname,
      role: decoded.role,
      permissions: decoded.permissions,
      message: msg,
    };
  } else {
    throw new Error(data.message || 'Login failed');
  }
};
