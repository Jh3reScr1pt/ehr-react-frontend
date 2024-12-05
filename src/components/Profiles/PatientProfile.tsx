import { useNavigate, useParams } from 'react-router-dom';
import { usePatientHandlers } from '../../handlers/patientHandlers';
import { useEffect, useState } from 'react';
import DatePicker from '../Forms/components/DatePicker';
import { useMedicalRecord } from '../../context/MedicalRecord/useMedicalRecord';

const PatientProfile = () => {
  const { id } = useParams<{ id?: string }>();
  const { patient, feedback, calculateAge } =
    usePatientHandlers().usePatientFormHandlers(id);
  const { getMedicalRecordsByPatientId } = useMedicalRecord();
  const [age, setAge] = useState('');
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleDateChange = (selectedDate: string) => {
    const calculatedAge = calculateAge(selectedDate);
    setAge(calculatedAge);
  };

  useEffect(() => {
    if (patient.birth_date) {
      // Si hay una fecha de nacimiento, calcula la edad automáticamente
      const calculatedAge = calculateAge(patient.birth_date.toString());
      setAge(calculatedAge);
    }
  }, [patient, calculateAge]);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      if (id) {
        try {
          const records = await getMedicalRecordsByPatientId(Number(id));
          setMedicalRecords(records);
        } catch (error) {
          console.error('Error fetching medical records:', error);
        }
      }
    };

    fetchMedicalRecords();
  }, [id, getMedicalRecordsByPatientId]);

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Información del Paciente
              </h3>
            </div>
            <div className="p-7">
              {feedback.success && (
                <div className="mb-4.5 text-green-500">{feedback.success}</div>
              )}
              {feedback.error && (
                <div className="mb-4.5 text-red-500">{feedback.error}</div>
              )}
              <form action="#">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullNames"
                    >
                      Nombre(s)
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-5  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="fullName"
                        id="fullName"
                        defaultValue={patient.first_name + patient.second_name}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullLastNames"
                    >
                      Apellidos
                    </label>
                    <div className=" relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="fullLastNames"
                        id="fullLastNames"
                        defaultValue={
                          patient.first_last_name + patient.second_last_name
                        }
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="ci"
                    >
                      CI
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-5  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="ci"
                        id="ci"
                        defaultValue={patient.ci}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phone_number"
                    >
                      Celular
                    </label>
                    <div className=" relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        defaultValue={patient.phone_number}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
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
                      editable={false}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="age"
                    >
                      Edad
                    </label>
                    <div className=" relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="age"
                        id="age"
                        value={age} // muestra la edad calculada
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="address"
                  >
                    Dirección
                  </label>
                  <div className="relative">
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="address"
                      id="address"
                      rows={2}
                      defaultValue={patient.address}
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-start gap-4.5 pt-6">
            <button
              className="flex justify-center rounded bg-green-500 py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={() => navigate('/patient/list')}
            >
              Volver
            </button>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Historial Clínico
              </h3>
            </div>
            <div
              className="p-7 max-h-[400px] overflow-y-auto custom-scrollbar"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#6b7280 #1f2937',
              }}
            >
              {/* Lista de registros médicos */}
              <ul className="border-base-content/25 divide-base-content/25 divide-y rounded-md border">
                {medicalRecords.length > 0 ? (
                  medicalRecords.map((record) => (
                    <li
                      key={record.medicalRecordId}
                      className="flex items-start sm:items-center p-3 first:rounded-t-md last:rounded-b-md"
                      onClick={() =>
                        navigate(
                          `/health_record/view/${record.medicalRecordId}`,
                        )
                      }
                    >
                      <img
                        src="https://media.istockphoto.com/id/922551734/es/vector/m%C3%A9dica-cruz-blanca.jpg?s=612x612&w=0&k=20&c=w13NgznHG_s7O4To1U4lV1SUTtH0f4mq9-NE4VHVbwU="
                        alt="Historial Médico"
                        className="w-13 mr-3 rounded-full"
                      />
                      <div className="flex grow flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div>
                          <h6 className="text-base text-base-content/90">
                            {record.code} {/* Código de la historia clínica */}
                          </h6>
                          <small className="text-base-content/50 text-sm">
                            {new Date(record.createdAt).toLocaleDateString()}{' '}
                            {/* Fecha de creación */}
                          </small>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-center text-sm text-gray-500">
                    No hay registros médicos disponibles.
                  </li>
                )}
              </ul>
            </div>
            <div className="flex justify-end gap-4.5 pt-6 px-7 mb-9">
              <button
                className="flex justify-center rounded bg-blue-500 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                type="button"
                onClick={() => navigate(`/health_record/create/${id}`)}
              >
                Agregar Registro
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
