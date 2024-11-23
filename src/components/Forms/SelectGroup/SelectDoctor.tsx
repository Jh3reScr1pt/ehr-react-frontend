import React, { useContext, useEffect, useState } from 'react';
import { SelectDoctorProps } from '../../../interfaces/props/SelectDoctorProps.interface';
import { PersonalContext } from '../../../context/Personal/PersonalContext';

const SelectDoctor: React.FC<SelectDoctorProps> = ({
  id,
  onChange,
}) => {
  const { personal, loading, error } = useContext(PersonalContext);
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
        Seleccionar el doctor
      </label>
      <select
        value={selectedOption}
        onChange={handleChange}
        className="w-full rounded border border-stroke py-3 px-5 bg-transparent outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
      >
        <option value="" disabled>
          Selecciona el doctor
        </option>
        {personal.map((personal) => (
          <option key={personal.id} value={personal.id}>
            Dr. {personal.first_name} {personal.first_last_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDoctor;
