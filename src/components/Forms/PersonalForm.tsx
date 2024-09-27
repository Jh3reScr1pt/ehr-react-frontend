import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePersonalHandlers } from '../../handlers/personalHandlers';
import SelectRole from './SelectGroup/SelectRole';

const PersonalForm = () => {
  const { id } = useParams<{ id?: string }>(); // id es opcional
  const {
    personal,
    feedback,
    handleChange,
    handleSubmit,
    handleCancel,
    validateNames,
    generatePassword,
    validateCI,
    shouldDisableFields,
    handleRoleChange,
  } = usePersonalHandlers().usePersonalFormHandlers(id);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCiDisabled, setCiDisabled] = useState(true);
  const [isRoleDisabled, setRoleDisabled] = useState(true);

  // Sincronización del campo de email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setEmail(e.target.value);
  };

  useEffect(() => {
    setEmail(personal.email); // Sincroniza el email en credenciales
  }, [personal.email]);

  // Validar nombres y generar contraseña en el cambio de 'personal'
  useEffect(() => {
    const disableFields = shouldDisableFields(personal);
    setCiDisabled(disableFields);
    setRoleDisabled(disableFields);

    // Verifica si los nombres son válidos y si están presentes los campos clave
    if (validateNames(personal)) {
      setPassword(generatePassword(personal)); // Genera la contraseña si todo es válido
    } else {
      setPassword(''); // Limpia la contraseña si falta alguno de los campos
    }
  }, [personal]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          // Validar CI antes de enviar el formulario
          if (!validateCI(personal.ci)) {
            return; // Mostrar error si es necesario
          }
          personal.password = password;

          handleSubmit(e);
        }}
      >
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Formulario de Personal
                </h3>
              </div>
              <div className="p-6.5">
                {feedback.success && (
                  <div className="mb-4.5 text-green-500">
                    {feedback.success}
                  </div>
                )}
                {feedback.error && (
                  <div className="mb-4.5 text-red-500">{feedback.error}</div>
                )}

                {/* Primer Nombre */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Primer nombre <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={personal.first_name}
                      onChange={handleChange}
                      placeholder="Ingrese el primer nombre"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div>

                  {/* Segundo Nombre */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Segundo nombre (Opcional)
                    </label>
                    <input
                      type="text"
                      name="second_name"
                      value={personal.second_name}
                      onChange={handleChange}
                      placeholder="Ingrese el segundo nombre"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div>
                </div>

                {/* Primer Apellido */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Primer apellido <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_last_name"
                      value={personal.first_last_name}
                      onChange={handleChange}
                      placeholder="Ingrese el primer apellido"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div>

                  {/* Segundo Apellido */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Segundo apellido <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="second_last_name"
                      value={personal.second_last_name}
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
                    value={personal.ci}
                    onChange={handleChange}
                    placeholder="Ingrese el CI"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    disabled={isCiDisabled}
                  />
                </div>

                {/* Phone */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    value={personal.phone_number}
                    onChange={handleChange}
                    placeholder="Ingrese el número de teléfono"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Email */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Ingrese el email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* SelectRole with conditional disabled */}
                <SelectRole
                  id={personal.roleId}
                  disabled={isRoleDisabled}
                  onChange={handleRoleChange}
                />

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
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Credenciales de Acceso
                </h3>
              </div>
              <div className="p-6.5">
                {/* Password */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>
                {/* Password */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Contraseña generada
                  </label>
                  <input
                    type="text"
                    name="password"
                    value={password}
                    readOnly
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalForm;
