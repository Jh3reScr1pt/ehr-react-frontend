// iconToggleUtils.ts
import { useState } from 'react';

export const useIconToggles = () => {
  const [iconStates, setIconStates] = useState<{
    [key: number]: { edit: boolean; close: boolean; delete: boolean };
  }>({});

  const toggleIconState = (
    roleId: number,
    iconType: 'edit' | 'close' | 'delete'
  ) => {
    setIconStates((prevState) => ({
      ...prevState,
      [roleId]: {
        ...prevState[roleId],
        [iconType]: !prevState[roleId]?.[iconType],
      },
    }));
  };

  return { iconStates, toggleIconState };
};
