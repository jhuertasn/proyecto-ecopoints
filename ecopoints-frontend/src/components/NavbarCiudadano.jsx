// src/components/NavbarCiudadano.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Importamos useNavigate

function NavbarCiudadano() {
  const navigate = useNavigate(); // 2. Inicializamos el hook de navegación

  // 3. Función para cerrar sesión
  const handleLogout = () => {
    // Borramos los datos del usuario guardados en el navegador
    localStorage.removeItem('usuario');
    
    // Redirigimos al Portal de inicio
    navigate('/');
  };

  return (
    <nav className="bg-emerald-700 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Grupo Izquierdo: Logo y Menú */}
        <div className="flex items-center space-x-6">
          <Link to="/ciudadano" className="text-lg font-bold flex items-center gap-2">
            <span>🌿</span> EcoPoints
          </Link>
          
          {/* Menú de navegación (oculto en móviles muy pequeños si quisieras, aquí visible) */}
          <div className="hidden md:flex space-x-2 text-sm">
            <Link to="/ciudadano" className="hover:bg-emerald-600 px-3 py-2 rounded-md transition">Dashboard</Link>
            <Link to="/mapa" className="hover:bg-emerald-600 px-3 py-2 rounded-md transition">Mapa</Link>
            <Link to="/recompensas" className="hover:bg-emerald-600 px-3 py-2 rounded-md transition">Recompensas</Link>
            <Link to="/historial" className="hover:bg-emerald-600 px-3 py-2 rounded-md transition">Mi Historial</Link>
          </div>
        </div>

        {/* Grupo Derecho: Botón de Cerrar Sesión */}
        <div className="flex items-center gap-4">
            {/* Mensaje de bienvenida opcional */}
            {/* <span className="text-xs text-emerald-200 hidden sm:block">Hola, Ciudadano</span> */}
            
            <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-sm transition-colors flex items-center gap-1"
            >
                <span>🚪</span> Cerrar sesión
            </button>
        </div>

      </div>
    </nav>
  );
}

export default NavbarCiudadano;