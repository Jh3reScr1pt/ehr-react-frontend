import { useState } from 'react';

interface DiseaseGroup {
  disease_group: {
    id: number;
    name: string;
    cie_codes: string[];
  };
  probability_level: number;
}

interface PresumptiveDiagnosisAccordionProps {
  groups: DiseaseGroup[];
}

const PresumptiveDiagnosisAccordion: React.FC<
  PresumptiveDiagnosisAccordionProps
> = ({ groups }) => {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const toggleGroup = (groupId: number) => {
    setActiveGroup(activeGroup === groupId ? null : groupId);
  };

  return (
    <div className="accordion divide-y divide-neutral/20 w-full">
      {groups.map((group) => (
        <div key={group.disease_group.id} className="accordion-item">
          <button
            className="accordion-toggle inline-flex items-center justify-between text-start w-full px-4 py-2"
            aria-expanded={activeGroup === group.disease_group.id}
            onClick={() => toggleGroup(group.disease_group.id)}
          >
            <div className="inline-flex items-center gap-x-4">
              <span
                className={`icon-[tabler--plus] ${
                  activeGroup === group.disease_group.id ? 'hidden' : 'block'
                } text-base-content size-4.5`}
              ></span>
              <span
                className={`icon-[tabler--minus] ${
                  activeGroup === group.disease_group.id ? 'block' : 'hidden'
                } text-base-content size-4.5`}
              ></span>
              {group.disease_group.name}
            </div>
            {/* Mostrar el nivel de probabilidad */}
            <span className="text-sm font-medium text-base-content/80">
              {group.probability_level.toFixed(2)}%
            </span>
          </button>

          {/* Mostrar contenido del grupo si está expandido */}
          {activeGroup === group.disease_group.id && (
            <div className="accordion-content w-full overflow-hidden transition-[height] duration-300 ps-6">
              <ul className="space-y-2">
                {/* Mostrar códigos CIE-10 */}
                {group.disease_group.cie_codes.length > 0 ? (
                  group.disease_group.cie_codes.map((code, index) => (
                    <li key={index} className="text-base-content/80">
                      Código CIE-10: {code}
                    </li>
                  ))
                ) : (
                  <li className="text-base-content/80">
                    No hay códigos disponibles
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

export default PresumptiveDiagnosisAccordion;
