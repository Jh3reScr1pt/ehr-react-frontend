import logo from '../../images/logo/logo.svg';
import logoDark from '../../images/logo/logo-dark.svg';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
const Home = () => {
  return (
    <>
      <Breadcrumb pageName="Inicio" />
      <div className="flex flex-col items-center text-center py-16">
        {/* Logo */}
        <img
          className="hidden dark:block w-2/3 max-w-3xl"
          src={logo}
          alt="Logo"
        />
        <img
          className="dark:hidden w-2/3 max-w-3xl"
          src={logoDark}
          alt="Logo"
        />
        {/* Bienvenido Text */}
        <h1 className="mt-8 text-6xl font-bold">Bienvenido</h1>
        {/* Descripción del sistema */}
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Este sistema está diseñado para mejorar y facilitar las tareas
          administrativas de la gestión de historias clínicas. Explora las 
          funcionalidades y descubre todo lo que podemos
          ofrecerte.
        </p>
      </div>
    </>
  );
};

export default Home;
