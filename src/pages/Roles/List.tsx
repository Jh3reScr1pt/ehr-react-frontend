import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import RoleList from '../../components/Lists/RoleList';
import { RoleProvider } from '../../context/Role/RoleContext';

function List() {
  return (
    <>
      <Breadcrumb pageName="Roles" />
      <div className="flex flex-col gap-10">
        <RoleProvider>
          <RoleList />
        </RoleProvider>
      </div>
    </>
  );
}

export default List;
