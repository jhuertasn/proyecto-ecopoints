// src/views/Portal.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Portal() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center">
        Bienvenido a 🌿 EcoPoints
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center">
        Selecciona tu rol para continuar
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Tarjeta de Ciudadano */}
        <Link to="/ciudadano" className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-bold">Soy Ciudadano</h2>
            <p>Registra tu reciclaje, suma puntos y encuentra puntos verdes.</p>
          </div>
        </Link>

        {/* Tarjeta de Recolector */}
        <Link to="/recolector" className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-bold">Soy Recolector</h2>
            <p>Gestiona tus rutas y confirma las entregas de los ciudadanos.</p>
          </div>
        </Link>

        {/* Tarjeta de Municipalidad */}
        <Link to="/dashboard" className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-bold">Soy Municipalidad</h2>
            <p>Visualiza reportes y estadísticas de reciclaje del distrito.</p>
          </div>
        </Link>
      </div>

      <div className="mt-12">
        <Link to="/login" className="text-green-600 hover:underline font-semibold">
          O inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}

export default Portal;