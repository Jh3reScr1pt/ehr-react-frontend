import { useState } from 'react'; // Importar el nuevo componente
import Loader from '../../common/Loader';
import Table from '../Table';
import { useRoles } from '../../context/Role/useRoles';
import { useRoleHandlers } from '../../handlers/roleHandlers';
import { useIconToggles } from '../../hooks/useIconToggles';
import {
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import SearchAndCreateBar from '../SearchAndCreateBar';

const RoleList = () => {
  const { roles, loading, error } = useRoles();
  const {
    handleEditClick,
    handleDeactivate,
    handleReload,
    handleDelete,
    handleInfoRoleSearch,
  } = useRoleHandlers();
  const { iconStates, toggleIconState } = useIconToggles();

  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const headers = ['Nombre del Rol', 'Descripción', 'Estado', 'Acciones'];
  const filteredRoles = roles.filter((role) =>
    role.role_name.toLowerCase().startsWith(searchTerm.toLowerCase()),
  );

  return (
    <>
      {/* Busqueda y Boton de Crear usando el componente reutilizable */}
      <SearchAndCreateBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchClick={handleInfoRoleSearch}
        createRoute="/role/create"
        createButtonText="Crear Rol"
        showCreateButton={false}
      />

      {/* Tabla */}
      <div className="flex flex-col gap-10 mt-4">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <Table headers={headers}>
            {filteredRoles.map((role, key) => (
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
                        <button
                          onMouseDown={() => toggleIconState(role.id, 'edit')}
                          onMouseUp={() => {
                            toggleIconState(role.id, 'edit');
                            handleEditClick(role.id);
                          }}
                          className="hover:text-primary"
                        >
                          {iconStates[role.id]?.edit ? (
                            <EditFilled />
                          ) : (
                            <EditOutlined />
                          )}
                        </button>
                        <button
                          onMouseDown={() => toggleIconState(role.id, 'close')}
                          onMouseUp={() => {
                            toggleIconState(role.id, 'close');
                            handleDeactivate(role.id);
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
                        <button
                          onMouseUp={() => handleReload(role.id)}
                          className="hover:text-primary"
                        >
                          <ReloadOutlined />
                        </button>
                        <button
                          onMouseDown={() => toggleIconState(role.id, 'delete')}
                          onMouseUp={() => {
                            toggleIconState(role.id, 'delete');
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
          </Table>
        </div>
      </div>
    </>
  );
};

export default RoleList;
