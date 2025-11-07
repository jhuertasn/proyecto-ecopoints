// src/components/Navbar.jsx
import React from 'react';
// 1. Importa 'Link' para la navegación de React
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-white text-blue-900 px-2 py-1 rounded font-bold">E</div>
          <span className="font-semibold text-lg">Ecopoints</span>
        </div>
        <div className="flex gap-6 text-sm">
          {/* 2. Reemplazamos 'a' por 'Link' y 'href' por 'to' */}
          <Link to="/" className="hover:text-blue-200">Inicio</Link>
          <Link to="/reporte" className="hover:text-blue-200">Reportes</Link>
          <Link to="/estadisticas" className="hover:text-blue-200">Estadísticas</Link>
          <Link to="/recolector/gestion" className="hover:text-blue-200">Gestión</Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
          {/* Puedes usar un ícono real aquí más adelante */}
          <span className="text-xl">👤</span>
        </div>
        <span className="text-sm">Usuario Admin</span>
      </div>
    </nav>
  );
}

export default Navbar;