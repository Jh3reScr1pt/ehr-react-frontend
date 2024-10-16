import { useNavigate } from 'react-router-dom';
import { useToasts } from '../hooks/useToasts';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { CreatePersonal } from '../interfaces/Personal/personal.interface';
import { usePatients } from '../context/Patient/UsePatient';

export const usePatientHandlers = () => {
  const {
    updatePatientState,
    deletePatient,
    createPatient,
    updatePatient,
    getPatient,
  } = usePatients();
  const { ToastSuccess, ToastInfo, ToastError } = useToasts();
  const navigate = useNavigate();

  const handleEditClick = (patientId: number) => {
    navigate(`/patients/edit/${patientId}`);
  };

  const handleDeactivate = async (patientId: number) => {
    try {
      const result = await updatePatientState(patientId);
      result.success
        ? ToastSuccess('Paciente desactivado exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al desactivar el personal');
    }
  };

  const handleReload = async (patientId: number) => {
    try {
      const result = await updatePatientState(patientId);
      result.success
        ? ToastSuccess('Paciente activado exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al activar el paciente');
    }
  };

  const handleDelete = async (patientId: number) => {
    try {
      const result = await deletePatient(patientId);
      result.success
        ? ToastSuccess('Paciente eliminado exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al eliminar el paciente');
    }
  };

  const handleInfoPersonalSearch = () => {
    ToastInfo('Escribe el nombre que desea encontrar...');
  };

  const usePatientFormHandlers = (id?: string) => {
    const [patient, setPatient] = useState({
      first_name: '',
      second_name: '',
      first_last_name: '',
      second_last_name: '',
      ci: '',
      phone_number: '',
      address: '',
      birth_date: new Date(),
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
        const loadPatient = async () => {
          try {
            const patientData = await getPatient(Number(id));
            setPatient({
              first_name: patientData.first_name,
              second_name: patientData.second_name,
              first_last_name: patientData.first_last_name,
              second_last_name: patientData.second_last_name,
              ci: patientData.ci,
              phone_number: patientData.phone_number,
              address: patientData.address,
              birth_date: patientData.birth_date,
            });
          } catch (err) {
            setFeedback({
              error: 'Error cargando los datos del rol.',
              success: null,
            });
          }
        };
        loadPatient();
      }
    }, [id]);

    const handleChange = (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      setPatient((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFeedback({ error: null, success: null });

      try {
        let response;
        let answer = '';
        if (id) {
          response = await updatePatient(Number(id), patient);
          answer = 'Cambios guardados';
        } else {
          response = await createPatient(patient);
          answer = 'Paciente registrado exitosamente';
        }

        const { success, message } = response;
        if (success) {
          setFeedback({ success: message, error: null });
          ToastSuccess(answer);
          navigate('/patients/list');
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
      navigate('/patients/list');
    };

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

    const shouldDisableFields = (personal: CreatePersonal) => {
      const areNamesValid = validateNames(personal);
      return !areNamesValid;
    };

    const validateCI = (ci: string) => {
      const ciRegex = /^\d+$/; // Solo números
      return ci && ciRegex.test(ci);
    };

    return {
      patient,
      feedback,
      handleChange,
      handleSubmit,
      handleCancel,
      validateNames,
      shouldDisableFields,
      validateCI,
    };
  };

  return {
    handleEditClick,
    handleDeactivate,
    handleReload,
    handleDelete,
    handleInfoPersonalSearch,
    usePatientFormHandlers,
  };
};
