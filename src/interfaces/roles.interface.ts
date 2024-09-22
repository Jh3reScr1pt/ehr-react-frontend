export interface Role {
  id: number;
  role_name: string;
  role_description?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateRole = Omit<Role, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateRole = Partial<CreateRole>;
