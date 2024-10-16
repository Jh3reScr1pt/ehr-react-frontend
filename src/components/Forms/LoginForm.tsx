import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import { useAuth } from '../../context/Auth/useAuth';
import { Authentication } from '../../interfaces/Auth/auth.interface';

const LoginForm = () => {
  const { login } = useAuth(); // Usa el método login del AuthContext
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const authData: Authentication = { email, password };

    try {
      await login(authData); // Llama al método login del contexto
      navigate('/');
      // Redirige al dashboard después del login exitoso
    } catch (err) {
      console.log(err);
      // Muestra un mensaje de error en caso de fallo
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden dark:bg-boxdark">
        {/* Sección Izquierda - Imagen/Logo */}
        <div className="hidden md:flex md:w-1/2 bg-gray-200 dark:bg-gray-800 items-center justify-center p-10">
          <div className="text-center">
            <Link to="/">
              <img
                className="dark:hidden w-70 mx-auto mb-4"
                src={LogoDark}
                alt="Logo"
              />
              <img
                className="hidden dark:block w-70 mx-auto mb-4"
                src={Logo}
                alt="Logo"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-300">
              Bienvenido a nuestra plataforma. Por favor, inicie sesión para
              continuar.
            </p>
          </div>
        </div>

        {/* Sección Derecha - Formulario de Inicio de Sesión */}
        <div className="w-full md:w-1/2 p-6 sm:p-12 bg-white dark:bg-boxdark">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Inicio de Sesión
          </h2>
          {/* Muestra el mensaje de error */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
                className="w-full p-4 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-form-input dark:border-form-strokedark dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full p-4 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-form-input dark:border-form-strokedark dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <Link to="#" className="text-sm text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div>
              <input
                type="submit"
                value="Iniciar Sesión"
                className="w-full p-4 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 cursor-pointer transition"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
