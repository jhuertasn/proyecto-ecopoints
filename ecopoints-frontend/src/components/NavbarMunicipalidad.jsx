// src/components/NavbarMunicipalidad.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Importamos useNavigate

function NavbarMunicipalidad() {
  const navigate = useNavigate(); // 2. Inicializamos el hook

  // 3. Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario'); // Borra la sesión
    navigate('/'); // Redirige al Login
  };

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* LADO IZQUIERDO: Logo y Enlaces */}
      <div className="flex items-center gap-8">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-white text-blue-900 px-2 py-1 rounded font-bold">E</div>
          <span className="font-semibold text-lg">Ecopoints</span>
        </Link>
        <div className="flex gap-6 text-sm hidden md:flex">
          <Link to="/dashboard" className="hover:text-blue-200 transition">Inicio</Link>
          <Link to="/reporte" className="hover:text-blue-200 transition">Reportes</Link>
          <Link to="/estadisticas" className="hover:text-blue-200 transition">Estadísticas</Link>
          <Link to="/gestion-puntos-verdes" className="hover:text-blue-200 transition">Gestión de Puntos</Link>
        </div>
      </div>

      {/* LADO DERECHO: Usuario y Botón Salir */}
      <div className="flex items-center gap-4">
        
        {/* Info del Usuario */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
            <span className="text-xl">👤</span>
          </div>
          <span className="text-sm font-medium hidden sm:block">Admin</span>
        </div>

        {/* 4. Botón de Cerrar Sesión */}
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-4 rounded shadow-sm transition-colors"
        >
          Cerrar Sesión
        </button>

      </div>
    </nav>
  );
}

export default NavbarMunicipalidad;