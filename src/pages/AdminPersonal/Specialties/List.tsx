import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import SpecialtyList from '../../../components/Lists/SpecialtyList';

import { SpecialtyProvider } from '../../../context/Specialty/SpecialtyContext';

function List() {
  return (
    <>
      <Breadcrumb pageName="Especialidades" />
      <SpecialtyProvider>
        <SpecialtyList />
      </SpecialtyProvider>
    </>
  );
}

export default List;
