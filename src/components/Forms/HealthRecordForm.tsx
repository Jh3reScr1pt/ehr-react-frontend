import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatientHandlers } from '../../handlers/patientHandlers';
import DatePicker from './components/DatePicker';
import VitalSignsModal from '../Modals/VitalSignsModal';
import SymptomsModal from '../Modals/SymptomsModal';
import PresumptiveDiagnosisAccordion from '../Accordions/PresumptiveDiagnosisAccordion';
import { useDiagnoses } from '../../context/Fuzzy_Diagnosis/useDiagnoses';
import { useMedicalRecord } from '../../context/MedicalRecord/useMedicalRecord';
import { useToasts } from '../../hooks/useToasts';

const HealthRecordForm = () => {
  const { id } = useParams<{ id?: string }>(); // id es opcional
  const {
    patient,
    feedback,
    handleChange,
    handleCancel,
    shouldDisableFields,
    calculateAge,
  } = usePatientHandlers().usePatientFormHandlers(id);

  const { registerFullMedicalRecordProcess } = useMedicalRecord();
  const navigate = useNavigate();
  const { ToastSuccess, ToastError } = useToasts();

  const [isCiDisabled, setCiDisabled] = useState(true);
  let [age, setAge] = useState('');
  let [ageNow, setAgeNow] = useState('');
  const [birthdate, setBirthdate] = useState(
    patient.birth_date
      ? new Date(patient.birth_date).toISOString().split('T')[0]
      : '',
  );
  const [vitalSigns, setVitalSigns] = useState({
    blood_pressure: '',
    heart_rate: 0,
    respiratory_rate: 0,
    temperature: 0,
    weight: 0,
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState<
    { symptom_id: number; intensity: number }[]
  >([]);

  const { createDiagnosis } = useDiagnoses();

  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [isDiagnosisConfirmed, setDiagnosisConfirmed] = useState(false);
  const [reason, setReason] = useState(''); // Estado para el motivo de consulta
  const [finalDiagnosis, setFinalDiagnosis] = useState(''); // Estado para el diagnóstico final
  const [showVitalSignsModal, setShowVitalSignsModal] = useState(false);
  const [showSymptomsModal, setShowSymptomsModal] = useState(false);
  const [treatmentItems, setTreatmentItems] = useState<string[]>([]);

  const handleDateChange = (selectedDate: string) => {
    setBirthdate(selectedDate); // Actualizar el estado birthdate con el formato string
    const calculatedAge = calculateAge(selectedDate);
    setAge(calculatedAge);
  };
  // Función para agregar un nuevo tratamiento
  const addTreatment = () => {
    setTreatmentItems([...treatmentItems, '']); // Añade un nuevo tratamiento vacío
  };

  // Función para eliminar un tratamiento por índice
  const removeTreatment = (index: number) => {
    setTreatmentItems(treatmentItems.filter((_, i) => i !== index));
  };

  // Función para manejar cambios en un tratamiento específico
  const handleTreatmentChange = (index: number, value: string) => {
    const updatedTreatments = [...treatmentItems];
    updatedTreatments[index] = value;
    setTreatmentItems(updatedTreatments);
  };
  const handleVitalSignsChange = (key: string, value: string | number) => {
    setVitalSigns({ ...vitalSigns, [key]: value });
  };

  const handleSymptomsChange = (
    updatedSymptoms: { symptom_id: number; intensity: number }[],
  ) => {
    setSelectedSymptoms(updatedSymptoms);
  };
  const handleConfirmDiagnosis = async () => {
    try {
      const response = await createDiagnosis({
        vital_signs: vitalSigns,
        symptoms: selectedSymptoms,
      });
      console.log('Diagnóstico recibido del API:', response);
      setDiagnosis(response); // Guardamos el diagnóstico recibido del API
      setDiagnosisConfirmed(true); // Activar el estado de confirmación
      setShowSymptomsModal(false); // Cerrar el modal de síntomas
      ToastSuccess('Diagnóstico presuntivo exitoso.');
    } catch (error) {
      console.error('Error al confirmar el diagnóstico:', error);
      ToastError('Algo salió mal');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const medicalRecordData = {
        patientId: Number(id),
        reason,
        finalDiagnosis,
        symptomsInformation: selectedSymptoms
          .map(
            (symptom) =>
              `Symptom-${symptom.symptom_id}-Intensity-${symptom.intensity}`,
          )
          .join(','),
        vitalSignsInformation: Object.entries(vitalSigns)
          .map(([key, value]) => `${key}-${value}`)
          .join(','),
      };

      // Validar y transformar los grupos del diagnóstico presuntivo
      if (!diagnosis || !diagnosis.groups || !Array.isArray(diagnosis.groups)) {
        throw new Error(
          'Los grupos de enfermedades no están disponibles o son inválidos.',
        );
      }

      console.log('Grupos recibidos del diagnóstico:', diagnosis.groups);

      const diseaseGroups = diagnosis.groups.map((group: any) => {
        if (!group.disease_group?.name || group.probability_level == null) {
          throw new Error(
            `El grupo de enfermedades es inválido: ${JSON.stringify(group)}`,
          );
        }
        return {
          name: group.disease_group.name,
          probability: group.probability_level,
        };
      });

      console.log('Grupos formateados para enviar:', diseaseGroups);

      const treatmentData = {
        medication: treatmentItems.join(', '),
        notes: 'Este es un tratamiento combinado',
      };

      const result = await registerFullMedicalRecordProcess(
        medicalRecordData,
        diseaseGroups, // Pasar los grupos correctamente formateados
        treatmentData,
      );

      console.log('Proceso completado con éxito:', result);
      ToastSuccess('Registro completado exitosamente.');
      navigate(`/patient/profile/${id}`);
    } catch (error) {
      console.error('Error al completar el proceso:', error);
      ToastError('Hubo un error al registrar el historial médico.');
    }
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
        }}
      >
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Formulario de Historia Clínica
            </h3>
          </div>
          <div className=" pt-6.5 px-6.5">
            <DatePicker
              title="Fecha"
              initialDate={
                patient.birth_date
                  ? new Date(patient.birth_date).toISOString().split('T')[0]
                  : ''
              } // birthdate es string en formato yyyy-mm-dd
              onDateChange={handleDateChange}
              editable={false}
            />
          </div>

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 ">
            <div className="flex flex-col gap-9">
              <div className="pt-6.5 px-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nombre(s) y Apellidos
                  </label>
                  <input
                    type="text"
                    name="full name"
                    value={patient.first_name}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    disabled={isCiDisabled}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-9">
              <div className="">
                <div className=" pt-6.5 px-6.5">
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

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 ">
            {/* Primera Columna - Formulario de Historia Clínica */}
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

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Motivo de Consulta
                    </label>
                    <textarea
                      name="reason"
                      value={reason} // Enlazar con el estado
                      rows={3}
                      onChange={(e) => setReason(e.target.value)} // Actualizar estado al escribir
                      placeholder="Ingresar el motivo de consulta"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    >
                      {patient.address}
                    </textarea>
                  </div>

                  {diagnosis && (
                    <>
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Diagnóstico Final
                        </label>
                        <textarea
                          name="diagnosis"
                          rows={5}
                          value={finalDiagnosis} // Enlazar con el estado
                          onChange={(e) => setFinalDiagnosis(e.target.value)} // Actualizar estado al escribir
                          placeholder="Ingrese el diagnóstico final"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        ></textarea>
                      </div>

                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Tratamiento
                        </label>
                        <div className="mb-4.5 space-y-3">
                          {treatmentItems.map((treatment, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 w-full"
                            >
                              <input
                                type="text"
                                className="input w-full border-stroke bg-transparent text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                value={treatment}
                                onChange={(e) =>
                                  handleTreatmentChange(index, e.target.value)
                                }
                                placeholder="Medicamento, peso neto, etc..."
                              />
                              <button
                                type="button"
                                className="btn btn-square btn-outline btn-error"
                                onClick={() => removeTreatment(index)}
                                aria-label="delete button"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <div className="text-end">
                            <button
                              type="button"
                              onClick={addTreatment}
                              className="btn btn-sm btn-primary"
                            >
                              Añadir medicamento
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Segunda Columna - Formulario de Historia Clínica */}
            <div className="flex flex-col gap-9">
              <div className="">
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <button
                      type="button"
                      onClick={() => setShowVitalSignsModal(true)}
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                      Iniciar Proceso de Diagnóstico Presuntivo
                    </button>
                  </div>
                  {/* Modal para Signos Vitales */}
                  {showVitalSignsModal && (
                    <VitalSignsModal
                      onClose={() => setShowVitalSignsModal(false)}
                      onContinue={() => {
                        setShowVitalSignsModal(false);
                        setShowSymptomsModal(true);
                      }}
                      handleChange={(e) =>
                        handleVitalSignsChange(e.target.name, e.target.value)
                      }
                    />
                  )}
                  {/* Modal para Síntomas */}
                  {showSymptomsModal && (
                    <SymptomsModal
                      onClose={() => setShowSymptomsModal(false)}
                      handleSymptomsChange={(updatedSymptoms) =>
                        handleSymptomsChange(updatedSymptoms)
                      }
                      onConfirm={handleConfirmDiagnosis}
                    />
                  )}
                  {/* Mostrar signos vitales confirmados */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Signos Vitales
                    </label>
                    <ul>
                      {diagnosis ? (
                        <>
                          <li>
                            Presión Arterial:{' '}
                            {diagnosis.vital_signs.blood_pressure}
                          </li>
                          <li>
                            Temperatura: {diagnosis.vital_signs.temperature}°C
                          </li>
                          <li>
                            Frecuencia Cardiáca:{' '}
                            {diagnosis.vital_signs.heart_rate} bpm
                          </li>
                          <li>
                            Frecuencia Respiratoria:{' '}
                            {diagnosis.vital_signs.respiratory_rate} rpm
                          </li>
                          <li>Peso: {diagnosis.vital_signs.weight} kg</li>
                        </>
                      ) : (
                        <p>Aún no se ha confirmado el diagnóstico.</p>
                      )}
                    </ul>
                  </div>

                  {/* Mostrar síntomas seleccionados */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Síntomas
                    </label>
                    <ul>
                      {diagnosis ? (
                        diagnosis.symptoms.map((symptom: any) => (
                          <li key={symptom.symptom_name}>
                            {symptom.symptom_name} - Intensidad:{' '}
                            {['Baja', 'Media', 'Alta'][symptom.intensity - 1]}
                          </li>
                        ))
                      ) : (
                        <p>Aún no se han confirmado los síntomas.</p>
                      )}
                    </ul>
                  </div>

                  {diagnosis && (
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Diagnóstico Presuntivo
                      </label>
                      <PresumptiveDiagnosisAccordion
                        groups={diagnosis.groups}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones - Movidos a la parte inferior derecha de la segunda columna */}
        <div className="flex justify-end gap-4.5 mt-4">
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
              disabled={!isDiagnosisConfirmed}
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </>
        </div>
      </form>
    </>
  );
};

export default HealthRecordForm;
