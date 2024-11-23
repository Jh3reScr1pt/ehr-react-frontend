import React, { useEffect, useState } from 'react';
import { useDiagnoses } from '../../context/Fuzzy_Diagnosis/useDiagnoses';

interface SymptomsModalProps {
  onClose: () => void;
  handleSymptomsChange: (
    symptoms: { symptom_id: number; intensity: number }[],
  ) => void;
  onConfirm: () => Promise<void>;
}

const SymptomsModal: React.FC<SymptomsModalProps> = ({
  onClose,
  handleSymptomsChange,
  onConfirm,
}) => {
  const { symptoms } = useDiagnoses(); // Obtenemos los síntomas directamente del contexto
  const [selectedSymptoms, setSelectedSymptoms] = useState<
    { symptom_id: number; intensity: number }[]
  >([{ symptom_id: 0, intensity: 0 }]); // Inicializamos con un campo vacío

  useEffect(() => {
    handleSymptomsChange(selectedSymptoms);
  }, [selectedSymptoms, handleSymptomsChange]);

  const handleOptionChange = (index: number, symptom_id: number) => {
    const updatedSymptoms = [...selectedSymptoms];
    updatedSymptoms[index] = {
      ...updatedSymptoms[index],
      symptom_id,
    };
    setSelectedSymptoms(updatedSymptoms);
  };

  const handleSeverityChange = (index: number, intensity: number) => {
    const updatedSymptoms = [...selectedSymptoms];
    updatedSymptoms[index] = {
      ...updatedSymptoms[index],
      intensity,
    };
    setSelectedSymptoms(updatedSymptoms);
  };

  const addAnotherOption = () => {
    if (selectedSymptoms.length < 4) {
      setSelectedSymptoms([
        ...selectedSymptoms,
        { symptom_id: 0, intensity: 0 },
      ]);
    }
  };

  const removeOption = (index: number) => {
    const updatedSymptoms = selectedSymptoms.filter((_, i) => i !== index);
    setSelectedSymptoms(updatedSymptoms);
  };

  return (
    <div
      id="symptoms-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Paso 2: Síntomas
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4 md:p-5">
          <div id="wrapper-select-for-copy" className="space-y-3">
            {selectedSymptoms.map((symptom, index) => (
              <div
                key={`symptom-${index}`}
                id="content-select-for-copy"
                className="flex items-center gap-3 max-sm:flex-col"
              >
                {/* Selector de síntomas */}
                <div className="w-full sm:w-1/2">
                  <div className="label">
                    <span className="label-text">Síntomas</span>
                  </div>
                  <select
                    className="select border-stroke bg-transparent text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    aria-label="select symptom"
                    value={symptom.symptom_id}
                    onChange={(e) =>
                      handleOptionChange(index, parseInt(e.target.value, 10))
                    }
                  >
                    <option value={0} disabled>
                      Seleccione un síntoma
                    </option>
                    {symptoms.map((apiSymptom) => (
                      <option key={apiSymptom.id} value={apiSymptom.id}>
                        {apiSymptom.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selector de severidad */}
                <div className="w-full sm:w-1/2">
                  <div className="label">
                    <span className="label-text">Severidad</span>
                  </div>
                  <select
                    className="select border-stroke bg-transparent text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    aria-label="select severity"
                    value={symptom.intensity}
                    onChange={(e) =>
                      handleSeverityChange(index, parseInt(e.target.value, 10))
                    }
                  >
                    <option value={0} disabled>
                      Seleccione severidad
                    </option>
                    <option value={1}>Baja</option>
                    <option value={2}>Media</option>
                    <option value={3}>Alta</option>
                  </select>
                </div>

                {/* Botón de quitar */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="btn btn-square btn-outline btn-error flex items-center justify-center"
                    aria-label="delete button"
                    style={{
                      height: '42px',
                      width: '42px',
                      marginTop: '28px',
                    }}
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
              </div>
            ))}
          </div>

          <p className="mt-4 text-end">
            <button
              type="button"
              onClick={addAnotherOption}
              className="btn btn-sm btn-primary"
              disabled={selectedSymptoms.length >= 4}
            >
              Añadir otro síntoma
            </button>
          </p>

          <button
            type="button"
            onClick={onConfirm}
            className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Confirmar Diagnóstico
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymptomsModal;
