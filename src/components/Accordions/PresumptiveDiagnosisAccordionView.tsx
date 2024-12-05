import { useState } from 'react';

interface Disease {
  name: string;
  codeCie: string;
}

interface DiseaseGroup {
  id: number;
  diseaseGroup: {
    name: string;
    diseases: Disease[];
  };
  probability_level: number;
}

interface PresumptiveDiagnosisAccordionProps {
  groups: DiseaseGroup[];
}

const PresumptiveDiagnosisAccordionView: React.FC<
  PresumptiveDiagnosisAccordionProps
> = ({ groups }) => {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const toggleGroup = (groupId: number) => {
    setActiveGroup(activeGroup === groupId ? null : groupId); // Abre o cierra acordeones de forma individual
  };

  return (
    <div className="accordion divide-y divide-neutral/20 w-full">
      {groups.map((group) => (
        <div key={group.id} className="accordion-item">
          <button
            className="accordion-toggle inline-flex items-center justify-between text-start w-full px-4 py-2"
            aria-expanded={activeGroup === group.id}
            onClick={() => toggleGroup(group.id)}
          >
            <div className="inline-flex items-center gap-x-4">
              <span
                className={`icon-[tabler--plus] ${
                  activeGroup === group.id ? 'hidden' : 'block'
                } text-base-content size-4.5`}
              ></span>
              <span
                className={`icon-[tabler--minus] ${
                  activeGroup === group.id ? 'block' : 'hidden'
                } text-base-content size-4.5`}
              ></span>
              {group.diseaseGroup.name}
            </div>
            {/* Mostrar el nivel de probabilidad */}
            <span className="text-sm font-medium text-base-content/80">
              {group.probability_level.toFixed(2)}%
            </span>
          </button>

          {/* Mostrar contenido del grupo si está expandido */}
          {activeGroup === group.id && (
            <div className="accordion-content w-full overflow-hidden transition-[height] duration-300 ps-6">
              <ul className="space-y-2">
                {/* Mostrar enfermedades con códigos CIE-10 */}
                {group.diseaseGroup.diseases.length > 0 ? (
                  group.diseaseGroup.diseases.map((disease, index) => (
                    <li key={index} className=" text-base-content/80 py-2 pl-10">
                      | {disease.name} - {disease.codeCie}
                    </li>
                  ))
                ) : (
                  <li className="text-base-content/80 py-4">
                    No hay enfermedades disponibles en este grupo.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PresumptiveDiagnosisAccordionView;
