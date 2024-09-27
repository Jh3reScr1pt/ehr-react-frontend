// roleHandlers.ts
import { useNavigate } from 'react-router-dom';
import { useRoles } from '../context/Role/useRoles';
import { useToasts } from '../hooks/useToasts';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

export const useRoleHandlers = () => {
  const { updateRoleState, deleteRole, createRole, updateRole, getRole } =
    useRoles();
  const { ToastSuccess, ToastInfo, ToastError } = useToasts();
  const navigate = useNavigate();

  const handleEditClick = (roleId: number) => {
    navigate(`/role/edit/${roleId}`);
  };

  const handleDeactivate = async (roleId: number) => {
    try {
      const result = await updateRoleState(roleId);
      result.success
        ? ToastSuccess('Rol desactivado exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al desactivar el rol');
    }
  };

  const handleReload = async (roleId: number) => {
    try {
      const result = await updateRoleState(roleId);
      result.success
        ? ToastSuccess('Rol activado exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al activar el rol');
    }
  };

  const handleDelete = async (roleId: number) => {
    try {
      const result = await deleteRole(roleId);
      result.success
        ? ToastSuccess('Rol eliminado exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al eliminar el rol');
    }
  };

  const handleInfoRoleSearch = () => {
    ToastInfo('Escribe el nombre del rol que desea encontrar...');
  };

  const useRoleFormHandlers = (id?: string) => {
    const [role, setRole] = useState({
      role_name: '',
      role_description: '',
    });
    const [feedback, setFeedback] = useState<{
      error: string | null;
      success: string | null;
    }>({
      error: null,
      success: null,
    });

    useEffect(() => {
      if (id) {
        const loadRole = async () => {
          try {
            const roleData = await getRole(Number(id));
            setRole({
              role_name: roleData.role_name,
              role_description: roleData.role_description,
            });
          } catch (err) {
            setFeedback({
              error: 'Error cargando los datos del rol.',
              success: null,
            });
          }
        };
        loadRole();
      }
    }, [id]);

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRole({ ...role, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFeedback({ error: null, success: null });

      try {
        let response;
        let answer = '';
        if (id) {
          response = await updateRole(Number(id), role);
          answer = 'Cambios guardados';
        } else {
          response = await createRole(role);
          answer = 'Rol creado exitosamente';
        }

        const { success, message } = response;
        if (success) {
          setFeedback({ success: message, error: null });
          ToastSuccess(answer);
          navigate('/role/list');
        } else {
          setFeedback({ error: message, success: null });
          ToastError(message);
        }
      } catch (err) {
        setFeedback({
          error: err instanceof Error ? err.message : 'Error inesperado',
          success: null,
        });
      }
    };

    const handleCancel = () => {
      navigate('/role/list');
    };

    return {
      role,
      feedback,
      handleChange,
      handleSubmit,
      handleCancel,
    };
  };

  return {
    handleEditClick,
    handleDeactivate,
    handleReload,
    handleDelete,
    handleInfoRoleSearch,
    useRoleFormHandlers,
  };
};
