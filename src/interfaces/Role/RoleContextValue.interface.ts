import { CreateRole, Role, UpdateRole } from './roles.interface';

export interface RoleContextValue {
  roles: Role[];
  loading: boolean;
  error: string | null;
  getRole: (id: number) => Promise<Role>;
  createRole: (
    role: CreateRole,
  ) => Promise<{ success: boolean; message: string }>;
  updateRole: (
    id: number,
    role: UpdateRole,
  ) => Promise<{ success: boolean; message: string }>;
  deleteRole: (id: number) => Promise<{ success: boolean; message: string }>;
  updateRoleState: (
    id: number,
  ) => Promise<{ success: boolean; message: string }>;
}
