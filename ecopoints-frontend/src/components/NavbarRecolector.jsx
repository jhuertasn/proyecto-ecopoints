// src/components/NavbarRecolector.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavbarRecolector() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-lg font-bold">🌿 EcoPoints</Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/recolector" className="hover:text-green-400">Inicio</Link>
            {/* Asumimos que tendrás estas rutas. Si no, puedes quitarlas o apuntar a otra. */}
            <Link to="/recolector/gestion" className="hover:text-green-400">Gestión</Link>
            <Link to="/reporte" className="hover:text-green-400">Reportes</Link>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xl">🧑‍🔧</span>
          <span>Juan Pérez</span>
        </div>
      </div>
    </nav>
  );
}

export default NavbarRecolector;