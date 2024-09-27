export interface Personal {
  id: number;
  first_name: string;
  second_name: string;
  first_last_name: string;
  second_last_name: string;
  phone_number: string;
  email: string;
  password: string;
  ci: string;
  roleId: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePersonal = Omit<Personal, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdatePersonal = Partial<CreatePersonal>;
