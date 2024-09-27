import {
  CreateSpecialty,
  Specialty,
  UpdateSpecialty,
} from './specialties.interface';

export interface SpecialtyContextValue {
  specialties: Specialty[];
  loading: boolean;
  error: string | null;
  getSpecialty: (id: number) => Promise<Specialty>;
  createSpecialty: (
    specialty: CreateSpecialty,
  ) => Promise<{ success: boolean; message: string }>;
  updateSpecialty: (
    id: number,
    specialty: UpdateSpecialty,
  ) => Promise<{ success: boolean; message: string }>;
  deleteSpecialty: (
    id: number,
  ) => Promise<{ success: boolean; message: string }>;
  updateSpecialtyState: (
    id: number,
  ) => Promise<{ success: boolean; message: string }>;
}
