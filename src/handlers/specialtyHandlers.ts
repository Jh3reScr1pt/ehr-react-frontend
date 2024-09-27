import { useNavigate } from 'react-router-dom';
import { useSpecialties } from '../context/Specialty/useSpecialties';
import { useToasts } from '../hooks/useToasts';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export const useSpecialtyHandlers = () => {
  const {
    updateSpecialtyState,
    deleteSpecialty,
    createSpecialty,
    updateSpecialty,
    getSpecialty,
  } = useSpecialties();
  const { ToastSuccess, ToastInfo, ToastError } = useToasts();
  const navigate = useNavigate();

  const handleEditClick = (specialtyId: number) => {
    navigate(`/specialty/edit/${specialtyId}`);
  };

  const handleDeactivate = async (specialtyId: number) => {
    try {
      const result = await updateSpecialtyState(specialtyId);
      result.success
        ? ToastSuccess('Especialidad desactivada exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al desactivar la especialidad');
    }
  };

  const handleReload = async (specialtyId: number) => {
    try {
      const result = await updateSpecialtyState(specialtyId);
      result.success
        ? ToastSuccess('Especialidad activada exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al activar la especialidad');
    }
  };

  const handleDelete = async (specialtyId: number) => {
    try {
      const result = await deleteSpecialty(specialtyId);
      result.success
        ? ToastSuccess('Especialidad eliminada exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al eliminar la especialidad');
    }
  };

  const handleInfoSpecialtySearch = () => {
    ToastInfo('Escribe el nombre de la especialidad que desea encontrar...');
  };

  const useSpecialtyFormHandlers = (id?: string) => {
    const [specialty, setSpecialty] = useState({
      specialty_name: '',
      specialty_description: '',
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
        const loadSpecialty = async () => {
          try {
            const specialtyData = await getSpecialty(Number(id));
            setSpecialty({
              specialty_name: specialtyData.specialty_name,
              specialty_description: specialtyData.specialty_description,
            });
          } catch (err) {
            setFeedback({
              error: 'Error cargando los datos de la especialidad.',
              success: null,
            });
          }
        };
        loadSpecialty();
      }
    }, [id]);

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSpecialty({ ...specialty, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFeedback({ error: null, success: null });

      try {
        let response;
        let answer = '';
        if (id) {
          response = await updateSpecialty(Number(id), specialty);
          answer = 'Cambios guardados';
        } else {
          response = await createSpecialty(specialty);
          answer = 'Especialidad creada exitosamente';
        }

        const { success, message } = response;
        if (success) {
          setFeedback({ success: message, error: null });
          ToastSuccess(answer);
          navigate('/specialty/list');
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
      navigate('/specialty/list');
    };

    return {
      specialty,
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
    handleInfoSpecialtySearch,
    useSpecialtyFormHandlers,
  };
};
