import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { AuthContextType } from '../../interfaces/Auth/AuthContextType.interface';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};