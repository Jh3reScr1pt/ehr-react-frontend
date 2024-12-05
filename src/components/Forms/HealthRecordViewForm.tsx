import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatientHandlers } from '../../handlers/patientHandlers';
import DatePicker from './components/DatePicker';
import { useMedicalRecord } from '../../context/MedicalRecord/useMedicalRecord';

import PresumptiveDiagnosisAccordionView from '../Accordions/PresumptiveDiagnosisAccordionView';

const HealthRecordViewForm = () => {
  const { id } = useParams<{ id?: string }>(); // id es opcional
  const navigate = useNavigate();
  const { getMedicalRecordInfoByMedicalRecordId } = useMedicalRecord();
  const [medicalRecordInfo, setMedicalRecordInfo] = useState<{
    medicalRecordId: number;
    code: string;
    reason: string;
    finalDiagnosis: string;
    symptoms: {
      symptom: string;
      severity: string;
    }[];
    vitalSigns: {
      sign: string;
      value: string;
    }[];
    patient: {
      id: number;
      fullName: string;
      ci: string;
      phone_number: string;
      address: string;
      age: number;
      birth_date: string;
    };
    treatments: {
      id: number;
      medication: string;
      notes: string;
    }[];
    presumptiveDiagnosis: {
      id: number;
      probability: string;
      diseaseGroup: {
        name: string;
        diseases: {
          name: string;
          codeCie: string;
        }[];
      };
    }[];
  } | null>(null);
  const [feedback, setFeedback] = useState<{
    error: string | null;
    success: string | null;
  }>({
    error: null,
    success: null,
  });

  const { handleChange, calculateAge } =
    usePatientHandlers().usePatientFormHandlers(id);

  let [age, setAge] = useState('');
  let [ageNow, setAgeNow] = useState('');

  const handleDateChange = (selectedDate: string) => {
    const calculatedAge = calculateAge(selectedDate);
    setAge(calculatedAge);
  };

  useEffect(() => {
    if (medicalRecordInfo?.patient.birth_date) {
      // Si hay una fecha de nacimiento, calcula la edad automáticamente
      const newAge = calculateAge(
        medicalRecordInfo.patient.birth_date.toString(),
      );
      setAgeNow(newAge);
    }
  }, [medicalRecordInfo?.patient, calculateAge]);

  useEffect(() => {
    if (id) {
      const loadPatient = async () => {
        try {
          const record = await getMedicalRecordInfoByMedicalRecordId(
            Number(id),
          );
          setMedicalRecordInfo(record);
          console.log(record);
        } catch (err) {
          setFeedback({
            error: 'Error cargando los datos del paciente.',
            success: null,
          });
        }
      };
      loadPatient();
    }
  }, [id]);

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
                medicalRecordInfo?.patient.birth_date
                  ? new Date(medicalRecordInfo.patient.birth_date)
                      .toISOString()
                      .split('T')[0]
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
                    value={medicalRecordInfo?.patient.fullName}
                    onChange={handleChange}
                    readOnly
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
                      value={medicalRecordInfo?.reason} // Enlazar con el estado
                      rows={3}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      readOnly={true}
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Diagnóstico Final
                    </label>
                    <textarea
                      name="diagnosis"
                      rows={5}
                      value={medicalRecordInfo?.finalDiagnosis} // Enlazar con el estado
                      placeholder="Ingrese el diagnóstico final"
                      readOnly
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tratamiento
                    </label>
                    <div className="mb-4.5 space-y-3">
                      {medicalRecordInfo?.treatments.map((treatment, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 w-full"
                        >
                          <input
                            type="text"
                            className="input w-full border-stroke bg-transparent text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            value={treatment.medication}
                            placeholder="Medicamento, peso neto, etc..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Segunda Columna - Formulario de Historia Clínica */}
            <div className="flex flex-col gap-9">
              <div className="">
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <div className="flex w-full justify-center rounded border-2 border-blue-600 p-3 font-medium text-gray hover:bg-opacity-90">
                      Diagnóstico Presuntivo
                    </div>
                  </div>

                  {/* Mostrar signos vitales confirmados */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Signos Vitales
                    </label>
                    <ul>
                      <>
                        <li>
                          Presión Arterial:{' '}
                          {medicalRecordInfo?.vitalSigns[0].value}
                        </li>
                        <li>
                          Temperatura: {medicalRecordInfo?.vitalSigns[3].value}
                          °C
                        </li>
                        <li>
                          Frecuencia Cardiáca:{' '}
                          {medicalRecordInfo?.vitalSigns[1].value} bpm
                        </li>
                        <li>
                          Frecuencia Respiratoria:{' '}
                          {medicalRecordInfo?.vitalSigns[2].value} rpm
                        </li>
                        <li>
                          Peso: {medicalRecordInfo?.vitalSigns[4].value} kg
                        </li>
                      </>
                    </ul>
                  </div>

                  {/* Mostrar síntomas seleccionados */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Síntomas
                    </label>
                    <ul>
                      {Array.isArray(medicalRecordInfo?.symptoms) &&
                      medicalRecordInfo.symptoms.length > 0 ? (
                        medicalRecordInfo.symptoms.map((symptom, index) => (
                          <li key={index}>
                            {symptom.symptom} - Intensidad: {symptom.severity}
                          </li>
                        ))
                      ) : (
                        <li>No hay síntomas disponibles.</li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Diagnóstico Presuntivo
                    </label>

                    <PresumptiveDiagnosisAccordionView
                      groups={
                        medicalRecordInfo?.presumptiveDiagnosis.map(
                          (diagnosis) => ({
                            id: diagnosis.id,
                            diseaseGroup: {
                              name: diagnosis.diseaseGroup.name,
                              diseases: diagnosis.diseaseGroup.diseases,
                            },
                            probability_level: parseFloat(
                              diagnosis.probability,
                            ),
                          }),
                        ) || [] // Valor predeterminado como un array vacío
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-start gap-4.5 pt-6">
          <button
            className="flex justify-center rounded bg-green-500 py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
            onClick={() =>
              navigate(`/patient/profile/${medicalRecordInfo?.patient.id}`)
            }
          >
            Volver
          </button>
        </div>
      </form>
    </>
  );
};

export default HealthRecordViewForm;
