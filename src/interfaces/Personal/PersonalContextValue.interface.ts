import { CreatePersonal, Personal, UpdatePersonal } from './personal.interface';

export interface PersonalContextValue {
  personal: Personal[];
  loading: boolean;
  error: string | null;
  getPersonal: (id: number) => Promise<Personal>;
  createPersonal: (
    personal: CreatePersonal,
  ) => Promise<{ success: boolean; message: string }>;
  updatePersonal: (
    id: number,
    role: UpdatePersonal,
  ) => Promise<{ success: boolean; message: string }>;
  deletePersonal: (
    id: number,
  ) => Promise<{ success: boolean; message: string }>;
  updatePersonalState: (
    id: number,
  ) => Promise<{ success: boolean; message: string }>;
}
