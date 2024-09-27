import React, { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../../context/Role/RoleContext';
import { SelectRoleProps } from '../../../interfaces/props/SelectRoleProps.interface';

const SelectRole: React.FC<SelectRoleProps> = ({ id, disabled, onChange }) => {
  const { roles, loading, error } = useContext(RoleContext);
  const [selectedOption, setSelectedOption] = useState<number | ''>('');

  useEffect(() => {
    if (id === undefined || id === 0) {
      setSelectedOption(''); // Vuelve a establecer como vacío si no hay ID
    } else {
      setSelectedOption(id);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedOption(selectedId);
    onChange(selectedId);
  };

  if (loading) return <p>Loading roles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        Seleccionar Rol
      </label>
      <select
        value={selectedOption}
        onChange={handleChange}
        disabled={disabled}
        className="w-full rounded border border-stroke py-3 px-5 bg-transparent outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
      >
        <option value="" disabled>
          Selecciona su rol
        </option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.role_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectRole;
