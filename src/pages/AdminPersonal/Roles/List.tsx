import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import RoleList from '../../../components/Lists/RoleList';
import { RoleProvider } from '../../../context/Role/RoleContext';

function List() {
  return (
    <>
      <Breadcrumb pageName="Roles" />
      <RoleProvider>
        <RoleList />
      </RoleProvider>
    </>
  );
}

export default List;
