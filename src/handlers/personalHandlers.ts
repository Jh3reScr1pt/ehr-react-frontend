import { useNavigate } from 'react-router-dom';
import { useToasts } from '../hooks/useToasts';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { usePersonal } from '../context/Personal/usePersonal';
import { CreatePersonal } from '../interfaces/Personal/personal.interface';


export const usePersonalHandlers = () => {
  const {
    updatePersonalState,
    deletePersonal,
    createPersonal,
    updatePersonal,
    getPersonal,
  } = usePersonal();
  const { ToastSuccess, ToastInfo, ToastError } = useToasts();
  const navigate = useNavigate();
  

  const handleEditClick = (personalId: number) => {
    navigate(`/personal/edit/${personalId}`);
  };

  const handleDeactivate = async (personalId: number) => {
    try {
      const result = await updatePersonalState(personalId);
      result.success
        ? ToastSuccess('Personal desactivado exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al desactivar el personal');
    }
  };

  const handleReload = async (personalId: number) => {
    try {
      const result = await updatePersonalState(personalId);
      result.success
        ? ToastSuccess('Personal activado exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al activar el personal');
    }
  };

  const handleDelete = async (personalId: number) => {
    try {
      const result = await deletePersonal(personalId);
      result.success
        ? ToastSuccess('Personal eliminado exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al eliminar el personal');
    }
  };

  const handleInfoPersonalSearch = () => {
    ToastInfo('Escribe el nombre que desea encontrar...');
  };

  const usePersonalFormHandlers = (id?: string) => {
    const [personal, setPersonal] = useState({
      first_name: '',
      second_name: '',
      first_last_name: '',
      second_last_name: '',
      phone_number: '',
      email: '',
      password: '',
      ci: '',
      roleId: 0,
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
        const loadPersonal = async () => {
          try {
            const personalData = await getPersonal(Number(id));
            setPersonal({
              first_name: personalData.first_name,
              second_name: personalData.second_name,
              first_last_name: personalData.first_last_name,
              second_last_name: personalData.second_last_name,
              phone_number: personalData.phone_number,
              email: personalData.email,
              password: personalData.password,
              ci: personalData.ci,
              roleId: personalData.roleId,
            });
          } catch (err) {
            setFeedback({
              error: 'Error cargando los datos del rol.',
              success: null,
            });
          }
        };
        loadPersonal();
      }
    }, [id]);

    const handleChange = (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      setPersonal((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (roleId: number) => {
      setPersonal((prev) => ({ ...prev, roleId }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFeedback({ error: null, success: null });

      try {
        let response;
        let answer = '';
        if (id) {
          response = await updatePersonal(Number(id), personal);
          answer = 'Cambios guardados';
        } else {

          // Crear al personal
          response = await createPersonal(personal);


          answer = 'Personal creado exitosamente';
        }

        const { success, message } = response;
        if (success) {
          setFeedback({ success: message, error: null });
          ToastSuccess(answer);
          navigate('/personal/list');
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
      navigate('/personal/list');
    };

    // handlers/personalHandlers.ts
    const validateNames = (personal: CreatePersonal) => {
      const { first_name, first_last_name, second_last_name } = personal;
      const isNamesFilled =
        first_name.length > 0 &&
        first_last_name.length > 0 &&
        second_last_name.length > 0;

      const areNamesValid =
        first_name.charAt(0) === first_name.charAt(0).toUpperCase() &&
        first_last_name.charAt(0) === first_last_name.charAt(0).toUpperCase() &&
        second_last_name.charAt(0) === second_last_name.charAt(0).toUpperCase();

      return isNamesFilled && areNamesValid;
    };

    const generatePassword = (personal: CreatePersonal) => {
      const { first_name, first_last_name, second_last_name, ci } = personal;
      if (first_name && first_last_name && second_last_name && ci) {
        const initials =
          `${first_name[0]}${first_last_name[0]}${second_last_name[0]}`.toUpperCase();
        return `${initials}${ci}`;
      }
      return '';
    };

    const shouldDisableFields = (personal: CreatePersonal) => {
      const areNamesValid = validateNames(personal);
      return !areNamesValid;
    };

    const validateCI = (ci: string) => {
      const ciRegex = /^\d+$/; // Solo números
      return ci && ciRegex.test(ci);
    };

    return {
      personal,
      feedback,
      handleChange,
      handleSubmit,
      handleCancel,
      generatePassword,
      validateNames,
      shouldDisableFields,
      validateCI,
      handleRoleChange,
    };
  };

  return {
    handleEditClick,
    handleDeactivate,
    handleReload,
    handleDelete,
    handleInfoPersonalSearch,
    usePersonalFormHandlers,
  };
};
