import {  useState } from 'react';
import Loader from '../../common/Loader';
import {
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRoles } from '../../context/Role/useRoles';

const RoleList = () => {
  const { roles, loading, error } = useRoles();
  // Estado para controlar el estado de los íconos de edición, cierre y eliminación por rol
  const [iconStates, setIconStates] = useState<{
    [key: number]: { edit: boolean; close: boolean; delete: boolean };
  }>({});
  const navigate = useNavigate();

  // Funciones para alternar los íconos
  const toggleEditIcon = (roleId: number) => {
    setIconStates((prevState) => ({
      ...prevState,
      [roleId]: {
        ...prevState[roleId],
        edit: !prevState[roleId]?.edit, // Alterna el ícono de editar
      },
    }));
  };

  const toggleCloseIcon = (roleId: number) => {
    setIconStates((prevState) => ({
      ...prevState,
      [roleId]: {
        ...prevState[roleId],
        close: !prevState[roleId]?.close, // Alterna el ícono de cerrar
      },
    }));
  };
  const toggleDeleteIcon = (roleId: number) => {
    setIconStates((prevState) => ({
      ...prevState,
      [roleId]: {
        ...prevState[roleId],
        delete: !prevState[roleId]?.delete, // Alterna el ícono de eliminar
      },
    }));
  };
  const handleEditClick = (roleId: number) => {
    // Lógica adicional si la necesitas
    navigate(`/role/edit/${roleId}`);
  };

  const handleDeactivate = () => {
    alert('Desactivado');
  };

  const handleReload = () => {
    alert('Activado');
  };

  const handleDelete = (roleId: number) => {
    alert(`ID: ${roleId}`);
  };


  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Nombre del Rol
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Descripción
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Estado
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {role.role_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {role.role_description ? role.role_description : 'Vacío'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      role.isActive
                        ? 'bg-success text-success'
                        : 'bg-danger text-danger'
                    }`}
                  >
                    {role.isActive ? 'Activo' : 'Inactivo'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {role.isActive ? (
                      <>
                        {/* Botón de editar */}
                        <button
                          onMouseDown={() => toggleEditIcon(role.id)}
                          onMouseUp={() => {
                            toggleEditIcon(role.id);
                            handleEditClick(role.id); // Llamada a la redirección
                          }}
                          className="hover:text-primary "
                        >
                          {iconStates[role.id]?.edit ? (
                            <EditFilled />
                          ) : (
                            <EditOutlined />
                          )}
                        </button>
                        {/* Botón de cambiar estado */}
                        <button
                          onMouseDown={() => toggleCloseIcon(role.id)}
                          onMouseUp={() => {
                            toggleCloseIcon(role.id);
                            handleDeactivate();
                          }}
                          className="hover:text-primary"
                        >
                          {iconStates[role.id]?.close ? (
                            <CloseCircleFilled />
                          ) : (
                            <CloseCircleOutlined />
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Botón de recargar */}
                        <button
                          onMouseUp={handleReload}
                          className="hover:text-primary"
                        >
                          <ReloadOutlined />
                        </button>

                        {/* Botón de eliminar */}
                        <button
                          onMouseDown={() => toggleDeleteIcon(role.id)}
                          onMouseUp={() => {
                            toggleDeleteIcon(role.id);
                            handleDelete(role.id);
                          }}
                          className="hover:text-primary"
                        >
                          {iconStates[role.id]?.delete ? (
                            <DeleteFilled />
                          ) : (
                            <DeleteOutlined />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleList;
