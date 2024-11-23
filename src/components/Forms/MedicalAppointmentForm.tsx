import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from './components/DatePicker';
import { useMedicalAppointmentHandlers } from '../../handlers/medicalAppointmentHandlers';
import SelectDoctor from './SelectGroup/SelectDoctor';
import SelectPatient from './SelectGroup/SelectPatient';

const MedicalAppointmentForm = () => {
  const { id } = useParams<{ id?: string }>(); // id es opcional
  const {
    medicalAppointment,
    feedback,
    handleChange,
    handleDoctorChange,
    handlePatientChange,
    handleSubmit,
    handleCancel,
    shouldDisableFields,
  } = useMedicalAppointmentHandlers().useMedicalAppointmentFormHandlers(id);

  const [appointmentDate, setAppointmentDate] = useState(
    medicalAppointment.date_appointment
      ? new Date(medicalAppointment.date_appointment)
          .toISOString()
          .split('T')[0]
      : '',
  );
  console.log(medicalAppointment.date_appointment);
  console.log(appointmentDate);

  const handleDateChange = (selectedDate: string) => {
    setAppointmentDate(selectedDate);
  };

  useEffect(() => {
    // Asegúrate de que sólo deshabilites los campos cuando sea necesario
    const disableFields = shouldDisableFields(medicalAppointment);
  }, [medicalAppointment]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          medicalAppointment.date_appointment = new Date(appointmentDate);
          console.log(
            'Fecha de cita a enviar:',
            medicalAppointment.date_appointment.toString(),
          );
          handleSubmit(e);
        }}
      >
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Formulario de Cita Médica
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 ">
            <div className="flex flex-col gap-9">
              <div className="">
                <div className="p-6.5">
                  {feedback.success && (
                    <div className="mb-4.5 text-green-500">
                      {feedback.success}
                    </div>
                  )}
                  {feedback.error && (
                    <div className="mb-4.5 text-red-500">{feedback.error}</div>
                  )}

                  <SelectDoctor
                    id={medicalAppointment.doctorId}
                    onChange={handleDoctorChange}
                  />
                  <SelectPatient
                    id={medicalAppointment.patientId}
                    onChange={handlePatientChange}
                  />
                </div>
              </div>
            </div>

            {/* Segunda Columna  */}
            <div className="flex flex-col gap-9">
              <div className="">
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Hora de Inicio <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="start_time"
                        value={medicalAppointment.start_time}
                        onChange={handleChange}
                        placeholder="Ingrese la hora de inicio"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Hora de fin <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="end_time"
                        value={medicalAppointment.end_time}
                        onChange={handleChange}
                        placeholder="Ingrese la hora de fin"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                    </div>
                  </div>

                  <DatePicker
                    title="Fecha de la cita"
                    initialDate={
                      medicalAppointment.date_appointment
                        ? new Date(medicalAppointment.date_appointment)
                            .toISOString()
                            .split('T')[0]
                        : ''
                    }
                    onDateChange={handleDateChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones - Movidos a la parte inferior derecha de la segunda columna */}
        <div className="flex justify-end gap-4.5 mt-4">
          {!id ? (
            <>
              <button
                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                type="submit"
              >
                Guardar
              </button>
            </>
          ) : (
            <>
              <button
                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                type="submit"
              >
                Actualizar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default MedicalAppointmentForm;
