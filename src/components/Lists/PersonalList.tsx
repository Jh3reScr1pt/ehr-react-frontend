import { useState } from 'react';
import Loader from '../../common/Loader';
import Table from '../Table';
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
import { usePersonal } from '../../context/Personal/usePersonal';
import { usePersonalHandlers } from '../../handlers/personalHandlers';

const PersonalList = () => {
  const { personal, loading, error } = usePersonal();
  const {
    handleEditClick,
    handleDeactivate,
    handleReload,
    handleDelete,
    handleInfoPersonalSearch,
  } = usePersonalHandlers();
  const { iconStates, toggleIconState } = useIconToggles();

  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const headers = [
    'Nombre(s)',
    'Apellidos',
    'CI',
    'Correo',
    'Estado',
    'Acciones',
  ];

  const filteredPersonal = personal.filter((p) =>
    p.first_name.toLowerCase().startsWith(searchTerm.toLowerCase()),
  );

  // Tipar las funciones correctamente
  const getFullName = (firstName: string, secondName?: string): string => {
    return secondName ? `${firstName} ${secondName}` : firstName;
  };

  const getFullLastName = (
    firstLastName: string,
    secondLastName?: string,
  ): string => {
    return secondLastName
      ? `${firstLastName} ${secondLastName}`
      : firstLastName;
  };

  return (
    <>
      {/* Busqueda y Boton de Crear usando el componente reutilizable */}
      <SearchAndCreateBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchClick={handleInfoPersonalSearch}
        createRoute="/personal/create"
        createButtonText="Crear Pers"
      />

      {/* Tabla */}
      <div className="flex flex-col gap-10 mt-4">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <Table headers={headers}>
            {filteredPersonal.map((p, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {getFullName(p.first_name, p.second_name)}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {getFullLastName(p.first_last_name, p.second_last_name)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{p.ci}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{p.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      p.isActive
                        ? 'bg-success text-success'
                        : 'bg-danger text-danger'
                    }`}
                  >
                    {p.isActive ? 'Activo' : 'Inactivo'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {p.isActive ? (
                      <>
                        <button
                          onMouseDown={() => toggleIconState(p.id, 'edit')}
                          onMouseUp={() => {
                            toggleIconState(p.id, 'edit');
                            handleEditClick(p.id);
                          }}
                          className="hover:text-primary"
                        >
                          {iconStates[p.id]?.edit ? (
                            <EditFilled />
                          ) : (
                            <EditOutlined />
                          )}
                        </button>
                        <button
                          onMouseDown={() => toggleIconState(p.id, 'close')}
                          onMouseUp={() => {
                            toggleIconState(p.id, 'close');
                            handleDeactivate(p.id);
                          }}
                          className="hover:text-primary"
                        >
                          {iconStates[p.id]?.close ? (
                            <CloseCircleFilled />
                          ) : (
                            <CloseCircleOutlined />
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onMouseUp={() => handleReload(p.id)}
                          className="hover:text-primary"
                        >
                          <ReloadOutlined />
                        </button>
                        <button
                          onMouseDown={() => toggleIconState(p.id, 'delete')}
                          onMouseUp={() => {
                            toggleIconState(p.id, 'delete');
                            handleDelete(p.id);
                          }}
                          className="hover:text-primary"
                        >
                          {iconStates[p.id]?.delete ? (
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

export default PersonalList;
