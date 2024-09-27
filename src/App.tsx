import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';

// Personal
import CreatePersonal from './pages/AdminPersonal/Personal/Create';
import ListPersonal from './pages/AdminPersonal/Personal/List';
import EditPersonal from './pages/AdminPersonal/Personal/Edit';

// ROLES
import CreateRole from './pages/AdminPersonal/Roles/Create';
import ListRoles from './pages/AdminPersonal/Roles/List';
import EditRole from './pages/AdminPersonal/Roles/Edit';

// ESPECIALIDADES
import ListSpecialties from './pages/AdminPersonal/Specialties/List';
import CreateSpecialty from './pages/AdminPersonal/Specialties/Create';
import EditSpecialty from './pages/AdminPersonal/Specialties/Edit';

// Simulación de autenticación
//const isAuthenticated = () => {
// Aquí pones la lógica para verificar si el usuario está autenticado (token, sesión, etc.)
//return !!localStorage.getItem('authToken'); // Ejemplo básico
//};

// Simulación temporal de autenticación
const isAuthenticated = () => {
  return true; // Permite el acceso al dashboard temporalmente
};

// Componente para proteger rutas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" replace />;
  }
  return children;
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <Routes>
        {/* Páginas de autenticación fuera del layout */}
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Centro Médico ZOE" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Centro Médico ZOE" />
              <SignUp />
            </>
          }
        />

        {/* Rutas protegidas dentro del layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="EHR | Centro Médico ZOE" />
                <ECommerce />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Calendar | Centro Médico ZOE" />
                <Calendar />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Profile | Centro Médico ZOE" />
                <Profile />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Form Elements | Centro Médico ZOE" />
                <FormElements />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Form Layout | Centro Médico ZOE" />
                <FormLayout />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Tables | Centro Médico ZOE" />
                <Tables />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Settings | Centro Médico ZOE" />
                <Settings />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chart"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Basic Chart | Centro Médico ZOE" />
                <Chart />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Alerts | Centro Médico ZOE" />
                <Alerts />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Buttons | Centro Médico ZOE" />
                <Buttons />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />

        {/* <!-- EHR Section --> */}
        {/* <!-- Personal Section --> */}
        <Route
          path="/personal/create"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Crear Personal | Centro Médico ZOE" />
                <CreatePersonal />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/personal/list"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Lista de Personal | Centro Médico ZOE" />
                <ListPersonal />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/personal/edit/:id"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Editar Personal | Centro Médico ZOE" />
                <EditPersonal />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />

        {/* <!-- Role Section --> */}
        <Route
          path="/role/create"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Crear Rol | Centro Médico ZOE" />
                <CreateRole />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/role/list"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Lista de Roles | Centro Médico ZOE" />
                <ListRoles />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/role/edit/:id"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Editar Rol | Centro Médico ZOE" />
                <EditRole />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        {/* <!-- Specialty Section --> */}
        <Route
          path="/specialty/create"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Crear Especialidad | Centro Médico ZOE" />
                <CreateSpecialty />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/specialty/list"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Lista de Especialidades | Centro Médico ZOE" />
                <ListSpecialties />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/specialty/edit/:id"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PageTitle title="Editar Especialidad | Centro Médico ZOE" />
                <EditSpecialty />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
