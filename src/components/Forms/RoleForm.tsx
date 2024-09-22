import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRoles } from '../../context/Role/useRoles';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoleRequest } from '../../api/roles';

const RoleForm = () => {
  const { id } = useParams<{ id: string }>();
   // Extrae el id de los parámetros de la URL
  const [role, setRole] = useState({
    role_name: '',
    role_description: '',
  });
  const [feedback, setFeedback] = useState<{
    error: string | null;
    success: string | null;
  }>({
    error: null,
    success: null,
  });

  const { createRole, updateRole } = useRoles();
  const navigate = useNavigate();

  // Si hay un id, cargamos los datos del rol
  useEffect(() => {
    if (id) {
      const loadRole = async () => {
        try {
          const roleData = await getRoleRequest(Number(id));
          setRole({
            role_name: roleData.role_name,
            role_description: roleData.role_description,
          });
        } catch (err) {
          setFeedback({
            error: 'Error cargando los datos del rol.',
            success: null,
          });
        }
      };
      loadRole();
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback({ error: null, success: null });

    try {
      let response;
      if (id) {
        // Intentamos actualizar el rol
        response = await updateRole(Number(id), role);
      } else {
        // Si no hay id, creamos un nuevo rol
        response = await createRole(role);
      }

      const { success, message } = response;

      if (success) {
        setFeedback({ success: message, error: null });
        navigate('/role/list'); // Redirige si todo sale bien
      } else {
        // Si el success es false, mostramos el mensaje de error
        setFeedback({ error: message, success: null });
      }
    } catch (err: unknown) {
      let errorMessage = 'Error inesperado. Por favor, intente de nuevo.';

      // Verificamos si err es una instancia de Error
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setFeedback({
        error: errorMessage,
        success: null,
      });
    }
  };

  const handleCancel = () => {
    navigate('/role/list');
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Formulario de Rol
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              {feedback.error && (
                <div className="mb-4.5 text-red-500">{feedback.error}</div>
              )}
              {feedback.success && (
                <div className="mb-4.5 text-green-500">{feedback.success}</div>
              )}

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nombre del Rol
                </label>
                <input
                  type="text"
                  name="role_name"
                  value={role.role_name}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre del Rol"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Descripción
                </label>
                <textarea
                  rows={6}
                  name="role_description"
                  value={role.role_description}
                  onChange={handleChange}
                  placeholder="Ingrese la descripción del Rol"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4.5 mt-4">
                {!id && (
                  <button
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Crear
                  </button>
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

export default RoleForm;
