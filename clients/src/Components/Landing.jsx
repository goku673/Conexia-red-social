import React from 'react';

function Landing() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Correo Electrónico</label>
            <input type="email" id="email" className="w-full p-2 border rounded-md" placeholder="Correo Electrónico" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Contraseña</label>
            <input type="password" id="password" className="w-full p-2 border rounded-md" placeholder="Contraseña" />
          </div>
          <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          ¿No estás registrado?{' '}
          <button className="text-blue-500 hover:underline">Regístrate</button>
        </p>
      </div>
    </div>
  );
}

export default Landing;
