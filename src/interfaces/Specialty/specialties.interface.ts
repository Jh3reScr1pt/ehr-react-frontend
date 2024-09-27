export interface Specialty {
  id: number;
  specialty_name: string;
  specialty_description: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateSpecialty = Omit<Specialty, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateSpecialty = Partial<CreateSpecialty>;
