// src/components/NavbarCiudadano.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavbarCiudadano() {
  return (
    <nav className="bg-emerald-700 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">🌿 EcoPoints</Link>
        <div className="flex space-x-4 text-sm">
          <Link to="/ciudadano" className="hover:bg-emerald-600 px-3 py-2 rounded-md">Dashboard</Link>
          <Link to="/mapa" className="hover:bg-emerald-600 px-3 py-2 rounded-md">Mapa</Link>
          <Link to="/recompensas" className="hover:bg-emerald-600 px-3 py-2 rounded-md">Recompensas</Link>
          <Link to="/historial" className="hover:bg-emerald-600 px-3 py-2 rounded-md">Mi Historial</Link>
          <Link to="/puntos" className="hover:bg-emerald-600 px-3 py-2 rounded-md">Gestión de Puntos</Link>
        </div>
      </div>
    </nav>
  );
}
export default NavbarCiudadano;