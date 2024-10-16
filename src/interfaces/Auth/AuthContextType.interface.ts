import { Authentication } from './auth.interface';

export interface AuthContextType {
  userfullname: string;
  role: string;
  permissions: string[];
  message: string;
  login: (auth: Authentication) => Promise<void>;
  logout: () => void;
}
