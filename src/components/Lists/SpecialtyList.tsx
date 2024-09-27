import { useState } from 'react'; // Importar el nuevo componente
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
import { useSpecialties } from '../../context/Specialty/useSpecialties';
import { useSpecialtyHandlers } from '../../handlers/specialtyHandlers';

const SpecialtyList = () => {
  const { specialties, loading, error } = useSpecialties();
  const {
    handleEditClick,
    handleDeactivate,
    handleReload,
    handleDelete,
    handleInfoSpecialtySearch,
  } = useSpecialtyHandlers();
  const { iconStates, toggleIconState } = useIconToggles();

  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const headers = ['Especialidad', 'Descripción', 'Estado', 'Acciones'];
  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.specialty_name.toLowerCase().startsWith(searchTerm.toLowerCase()),
  );

  return (
    <>
      {/* Busqueda y Boton de Crear usando el componente reutilizable */}
      <SearchAndCreateBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchClick={handleInfoSpecialtySearch}
        createRoute="/specialty/create"
        createButtonText="Crear Esp"
      />

      {/* Tabla */}
      <div className="flex flex-col gap-10 mt-4">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <Table headers={headers}>
            {filteredSpecialties.map((specialty, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {specialty.specialty_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {specialty.specialty_description
                      ? specialty.specialty_description
                      : 'Vacío'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      specialty.isActive
                        ? 'bg-success text-success'
                        : 'bg-danger text-danger'
                    }`}
                  >
                    {specialty.isActive ? 'Activo' : 'Inactivo'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {specialty.isActive ? (
                      <>
                        <button
                          onMouseDown={() =>
                            toggleIconState(specialty.id, 'edit')
                          }
                          onMouseUp={() => {
                            toggleIconState(specialty.id, 'edit');
                            handleEditClick(specialty.id);
                          }}
                          className="hover:text-primary"
                        >
                          {iconStates[specialty.id]?.edit ? (
                            <EditFilled />
                          ) : (
                            <EditOutlined />
                          )}
                        </button>
                        <button
                          onMouseDown={() =>
                            toggleIconState(specialty.id, 'close')
                          }
                          onMouseUp={() => {
                            toggleIconState(specialty.id, 'close');
                            handleDeactivate(specialty.id);
                          }}
                          className="hover:text-primary"
                        >
                          {iconStates[specialty.id]?.close ? (
                            <CloseCircleFilled />
                          ) : (
                            <CloseCircleOutlined />
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onMouseUp={() => handleReload(specialty.id)}
                          className="hover:text-primary"
                        >
                          <ReloadOutlined />
                        </button>
                        <button
                          onMouseDown={() =>
                            toggleIconState(specialty.id, 'delete')
                          }
                          onMouseUp={() => {
                            toggleIconState(specialty.id, 'delete');
                            handleDelete(specialty.id);
                          }}
                          className="hover:text-primary"
                        >
                          {iconStates[specialty.id]?.delete ? (
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

export default SpecialtyList;
