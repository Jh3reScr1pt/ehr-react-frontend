import React from 'react';

interface VitalSignsModalProps {
  onClose: () => void;
  onContinue: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VitalSignsModal: React.FC<VitalSignsModalProps> = ({
  onClose,
  onContinue,
  handleChange,
}) => {
  return (
    <div
      id="vital-signs-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Paso 1: Signos Vitales
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
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4 md:p-5">
          <div className="mb-4.5 flex flex-col-2 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                PA <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="blood_pressure"
                onChange={handleChange}
                placeholder="Ingrese la presión arterial"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                T <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                name="temperature"
                onChange={handleChange}
                placeholder="Ingrese la temperatura"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col-2 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                FC <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                name="heart_rate"
                onChange={handleChange}
                placeholder="Ingrese la frecuencia cardíaca"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                FR <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                name="respiratory_rate"
                onChange={handleChange}
                placeholder="Ingrese la frecuencia respiratoria"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
          </div>
          {/* Campo adicional para el peso */}
          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Peso <span className="text-meta-1">*</span>
            </label>
            <input
              type="number"
              name="weight"
              onChange={handleChange}
              placeholder="Ingrese el peso en kg"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Continuar a Síntomas
          </button>
        </div>
      </div>
    </div>
  );
};

export default VitalSignsModal;
