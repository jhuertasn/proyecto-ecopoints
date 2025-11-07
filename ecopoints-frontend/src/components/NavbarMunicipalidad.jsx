// src/components/NavbarMunicipalidad.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavbarMunicipalidad() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white text-blue-900 px-2 py-1 rounded font-bold">E</div>
          <span className="font-semibold text-lg">Ecopoints</span>
        </Link>
        <div className="flex gap-6 text-sm">
          {/* Usamos <Link> con las rutas correctas de tu App.jsx */}
          <Link to="/dashboard" className="hover:text-blue-200">Inicio</Link>
          <Link to="/reporte" className="hover:text-blue-200">Reportes</Link>
          <Link to="/estadisticas" className="hover:text-blue-200">Estadísticas</Link>
         <Link to="/gestion-puntos-verdes" className="hover:text-blue-200">Gestión de Puntos Verdes</Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
          <span className="text-xl">👤</span>
        </div>
        <span className="text-sm">Usuario Admin</span>
      </div>
    </nav>
  );
}

export default NavbarMunicipalidad;