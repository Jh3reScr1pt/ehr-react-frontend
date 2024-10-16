export interface Patient {
  id: number;
  first_name: string;
  second_name: string;
  first_last_name: string;
  second_last_name: string;
  ci: string;
  phone_number: string;
  address: string;
  birth_date: Date;
  age?: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePatient = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdatePatient = Partial<CreatePatient>;
