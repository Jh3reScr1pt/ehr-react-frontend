import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePatientHandlers } from '../../handlers/patientHandlers';
import DatePicker from './components/DatePicker';

const PatientForm = () => {
  const { id } = useParams<{ id?: string }>(); // id es opcional
  const {
    patient,
    feedback,
    handleChange,
    handleSubmit,
    handleCancel,
    validateCI,
    shouldDisableFields,
    calculateAge,
  } = usePatientHandlers().usePatientFormHandlers(id);
  const [isCiDisabled, setCiDisabled] = useState(true);
  let [age, setAge] = useState('');
  let [ageNow, setAgeNow] = useState('');
  const [birthdate, setBirthdate] = useState(
    patient.birth_date
      ? new Date(patient.birth_date).toISOString().split('T')[0]
      : '',
  );

  const handleDateChange = (selectedDate: string) => {
    setBirthdate(selectedDate); // Actualizar el estado birthdate con el formato string
    const calculatedAge = calculateAge(selectedDate);
    setAge(calculatedAge);
  };

  useEffect(() => {
    if (patient.birth_date) {
      // Si hay una fecha de nacimiento, calcula la edad automáticamente
      const newAge = calculateAge(patient.birth_date.toString());
      setAgeNow(newAge);
    }
  }, [patient, calculateAge]);

  useEffect(() => {
    const disableFields = shouldDisableFields(patient);
    setCiDisabled(disableFields);
  }, [patient]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!validateCI(patient.ci)) {
            return;
          }
          patient.birth_date = new Date(birthdate);
          console.log(
            'Fecha de nacimiento a enviar:',
            patient.birth_date.toString(),
          );
          handleSubmit(e);
        }}
      >
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Formulario del Paciente
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

                  {/* Primer Nombre y Segundo Nombre */}
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Primer nombre <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={patient.first_name}
                        onChange={handleChange}
                        placeholder="Ingrese el primer nombre"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Segundo nombre (Opcional)
                      </label>
                      <input
                        type="text"
                        name="second_name"
                        value={patient.second_name}
                        onChange={handleChange}
                        placeholder="Ingrese el segundo nombre"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Primer Apellido y Segundo Apellido */}
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Primer apellido <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_last_name"
                        value={patient.first_last_name}
                        onChange={handleChange}
                        placeholder="Ingrese el primer apellido"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Segundo apellido <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="second_last_name"
                        value={patient.second_last_name}
                        onChange={handleChange}
                        placeholder="Ingrese el segundo apellido"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                    </div>
                  </div>

                  {/* CI */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      CI <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="ci"
                      value={patient.ci}
                      onChange={handleChange}
                      placeholder="Ingrese el CI"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      disabled={isCiDisabled}
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      value={patient.phone_number}
                      onChange={handleChange}
                      placeholder="Ingrese el número de teléfono"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Segunda Columna - Formulario del Paciente 2 */}
            <div className="flex flex-col gap-9">
              <div className="">
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Dirección
                    </label>
                    <textarea
                      name="address"
                      value={patient.address}
                      rows={5}
                      onChange={handleChange}
                      placeholder="Ingresar la dirección del paciente"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    >
                      {patient.address}
                    </textarea>
                  </div>
                  <div className="mb-4.5">
                    <DatePicker
                      title="Fecha de nacimiento"
                      initialDate={
                        patient.birth_date
                          ? new Date(patient.birth_date)
                              .toISOString()
                              .split('T')[0]
                          : ''
                      } // birthdate es string en formato yyyy-mm-dd
                      onDateChange={handleDateChange}
                      editable={true}
                    />
                  </div>

                  {/* Edad */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Edad
                    </label>
                    <input
                      type="age"
                      placeholder={ageNow}
                      value={age}
                      readOnly
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div>
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

export default PatientForm;
