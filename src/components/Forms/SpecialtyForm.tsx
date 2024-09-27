import { useParams } from 'react-router-dom';
import { useSpecialtyHandlers } from '../../handlers/specialtyHandlers';

const SpecialtyForm = () => {
  const { id } = useParams<{ id: string }>();
  const { specialty, feedback, handleChange, handleSubmit, handleCancel } =
    useSpecialtyHandlers().useSpecialtyFormHandlers(id);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Formulario de Especialidad
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              {/* Revisar 
              {feedback.error && (
                <div className="mb-4.5 text-red-500">{feedback.error}</div>
              )}*/}
              {feedback.success && (
                <div className="mb-4.5 text-green-500">{feedback.success}</div>
              )}

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nombre de la Especialidad
                </label>
                <input
                  type="text"
                  name="specialty_name"
                  value={specialty.specialty_name}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre de la Especialidad"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Descripción
                </label>
                <textarea
                  rows={6}
                  name="specialty_description"
                  value={specialty.specialty_description}
                  onChange={handleChange}
                  placeholder="Ingrese la descripción de la Especialidad"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4.5 mt-4">
                {!id && (
                  <>
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Crear
                    </button>
                  </>
                )}
                {id && (
                  <>
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Guardar
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpecialtyForm;
