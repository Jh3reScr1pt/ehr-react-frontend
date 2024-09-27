import React, { createContext, useEffect, useState } from 'react';
import {
  CreateRole,
  Role,
  UpdateRole,
} from '../../interfaces/Role/roles.interface';
import {
  createRoleRequest,
  getRolesRequest,
  updateRoleRequest,
  deleteRoleRequest,
  updateRoleStateRequest,
  getRoleRequest,
} from '../../api/roles';
import { RoleContextValue } from '../../interfaces/Role/RoleContextValue.interface';
import { Props } from '../../interfaces/props/props.interface';

export const RoleContext = createContext<RoleContextValue>({
  roles: [],
  loading: true,
  error: null,
  getRole: async () => {
    throw new Error('getRole() not implemented');
  },
  createRole: async () => {
    throw new Error('createRole() not implemented');
  },
  updateRole: async () => {
    throw new Error('updateRole() not implemented');
  },
  deleteRole: async () => {
    throw new Error('deleteRole() not implemented');
  },
  updateRoleState: async () => {
    throw new Error('updateRoleState() not implemented');
  },
});

export const RoleProvider: React.FC<Props> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar los roles al montar el componente
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRolesRequest();
        setRoles(data);
      } catch (err) {
        setError('Error fetching roles');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // Función para obtener un rol
  const getRole = async (id: number): Promise<Role> => {
    try {
      const role = await getRoleRequest(id);
      return role;
    } catch (err: any) {
      console.error('Error getting role:', err);
      throw err;
    }
  };

  // Función para crear un rol
  const createRole = async (
    role: CreateRole,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await createRoleRequest(role);
      setRoles((prevRoles) => [...prevRoles, response]); // Agregar el nuevo rol al estado
      return { success: true, message: 'Rol creado exitosamente' };
    } catch (err: any) {
      console.error('Error creating role:', err);
      return {
        success: false,
        message: err.message || 'Error al crear el rol',
      };
    }
  };

  // Función para actualizar un rol
  const updateRole = async (
    id: number,
    role: UpdateRole,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updateRoleRequest(id, role);

      // Verifica si el statusCode es 200
      if (response.statusCode === 200) {
        setRoles((prevRoles) =>
          prevRoles.map((r) => (r.id === id ? { ...r, ...role } : r)),
        );
        return {
          success: true,
          message: response.message || 'Rol actualizado exitosamente',
        };
      } else {
        // Lanza un error si el statusCode no es 200
        throw new Error(response.message || 'Error al actualizar el rol');
      }
    } catch (err: any) {
      console.error('Error updating role:', err);
      return {
        success: false,
        message: err.message || 'Error al actualizar el rol',
      };
    }
  };

  // Función para actualizar el estado de un rol
  const updateRoleState = async (
    id: number,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updateRoleStateRequest(id);
      if (response.statusCode === 200) {
        setRoles((prevRoles) =>
          prevRoles.map((r) =>
            r.id === id ? { ...r, isActive: !r.isActive } : r,
          ),
        );
        return {
          success: true,
          message:
            response.message || 'Estado del rol actualizado exitosamente',
        };
      } else {
        throw new Error(
          response.message || 'Error al actualizar el estado del rol',
        );
      }
    } catch (err: any) {
      console.error('Error updating role state:', err);
      return {
        success: false,
        message: err.message || 'Error al actualizar el estado del rol',
      };
    }
  };

  // Función para eliminar un rol
  const deleteRole = async (
    id: number,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      await deleteRoleRequest(id);
      setRoles((prevRoles) => prevRoles.filter((r) => r.id !== id)); // Eliminar el rol del estado
      return { success: true, message: 'Rol eliminado exitosamente' };
    } catch (err: any) {
      console.error('Error deleting role:', err);
      return {
        success: false,
        message: err.message || 'Error al eliminar el rol',
      };
    }
  };

  return (
    <RoleContext.Provider
      value={{
        roles,
        loading,
        error,
        getRole,
        createRole,
        updateRole,
        updateRoleState,
        deleteRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
