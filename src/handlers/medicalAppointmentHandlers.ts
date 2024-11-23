import { useNavigate } from 'react-router-dom';
import { useToasts } from '../hooks/useToasts';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useMedicalAppointments } from '../context/MedicalAppointment/UseMedicalAppointment';
import { CreateMedicalAppointment } from '../interfaces/Appointment/medical_appointment.inteface';

export const useMedicalAppointmentHandlers = () => {
  const {
    updateMedicalAppointmentState,
    deleteMedicalAppointment,
    createMedicalAppointment,
    updateMedicalAppointment,
    getMedicalAppointment,
  } = useMedicalAppointments();
  const { ToastSuccess, ToastInfo, ToastError } = useToasts();
  const navigate = useNavigate();

  const handleEditClick = (patientId: number) => {
    navigate(`/appointment/edit/${patientId}`);
  };

  const handleDeactivate = async (medicalAppointmentId: number) => {
    try {
      const result = await updateMedicalAppointmentState(medicalAppointmentId);
      result.success
        ? ToastSuccess('Cita médica desactivada exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al desactivar la cita médica');
    }
  };

  const handleReload = async (medicalAppointmentId: number) => {
    try {
      const result = await updateMedicalAppointmentState(medicalAppointmentId);
      result.success
        ? ToastSuccess('Cita médica activada exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al activar la cita médica');
    }
  };

  const handleDelete = async (medicalAppointmentId: number) => {
    try {
      const result = await deleteMedicalAppointment(medicalAppointmentId);
      result.success
        ? ToastSuccess('Cita eliminada exitosamente')
        : ToastInfo(result.message);
    } catch (error) {
      ToastError('Error al eliminar la cita');
    }
  };

  const handleInfoPersonalSearch = () => {
    ToastInfo('Escribe el nombre que desea encontrar...');
  };

  const useMedicalAppointmentFormHandlers = (id?: string) => {
    const [medicalAppointment, setMedicalAppointment] = useState({
      doctorId: 0,
      patientId: 0,
      date_appointment: new Date(),
      start_time: '',
      end_time: '',
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
        const loadMedicalAppointmet = async () => {
          try {
            const medicalAppointmentData = await getMedicalAppointment(
              Number(id),
            );
            setMedicalAppointment({
              doctorId: medicalAppointmentData.doctorId,
              patientId: medicalAppointmentData.patientId,
              date_appointment: medicalAppointmentData.date_appointment,
              start_time: medicalAppointmentData.start_time,
              end_time: medicalAppointmentData.end_time,
            });
          } catch (err) {
            setFeedback({
              error: 'Error cargando los datos de la cita médica.',
              success: null,
            });
          }
        };
        loadMedicalAppointmet();
      }
    }, [id]);

    const handleChange = (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      setMedicalAppointment((prev) => ({ ...prev, [name]: value }));
    };

    const handleDoctorChange = (doctorId: number) => {
      setMedicalAppointment((prev) => ({ ...prev, doctorId }));
    };

    const handlePatientChange = (patientId: number) => {
      setMedicalAppointment((prev) => ({ ...prev, patientId }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFeedback({ error: null, success: null });

      try {
        let response;
        let answer = '';
        if (id) {
          response = await updateMedicalAppointment(
            Number(id),
            medicalAppointment,
          );
          answer = 'Cambios guardados';
        } else {
          response = await createMedicalAppointment(medicalAppointment);
          answer = 'Cita médica registrada exitosamente';
        }

        const { success, message } = response;
        if (success) {
          setFeedback({ success: message, error: null });
          ToastSuccess(answer);
          navigate('/appointment/list');
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
      navigate('/appointment/list');
    };

    const validateFields = (medicalAppointment: CreateMedicalAppointment) => {
      const { start_time, end_time } = medicalAppointment;
      const isTimeFilled = start_time.length > 0 && end_time.length > 0;

      const areFieldsValids =
        start_time.charAt(0) === start_time.charAt(0).toUpperCase() &&
        end_time.charAt(0) === end_time.charAt(0).toUpperCase();

      return isTimeFilled && areFieldsValids;
    };

    const shouldDisableFields = (
      medicalAppointment: CreateMedicalAppointment,
    ) => {
      const areNamesValid = validateFields(medicalAppointment);
      return !areNamesValid;
    };

    return {
      medicalAppointment,
      feedback,
      handleChange,
      handleDoctorChange,
      handlePatientChange,
      handleSubmit,
      handleCancel,
      validateFields,
      shouldDisableFields,
    };
  };

  return {
    handleEditClick,
    handleDeactivate,
    handleReload,
    handleDelete,
    handleInfoPersonalSearch,
    useMedicalAppointmentFormHandlers,
  };
};
