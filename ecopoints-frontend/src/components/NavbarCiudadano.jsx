// src/components/NavbarCiudadano.jsx
import React, { useState, useEffect } from 'react'; // 1. Importamos los hooks
import { Link, useNavigate } from 'react-router-dom';

function NavbarCiudadano() {
  const navigate = useNavigate();
  
  // 2. Estado para guardar el nombre (valor por defecto 'Ciudadano')
  const [nombreUsuario, setNombreUsuario] = useState('Ciudadano');

  // 3. Al cargar, leemos el usuario del localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        const datos = JSON.parse(usuarioGuardado);
        // Si el objeto tiene el campo 'usuario', lo usamos
        if (datos.usuario) {
          setNombreUsuario(datos.usuario);
        }
      } catch (error) {
        console.error("Error al leer usuario", error);
      }
    }
  }, []);

  // 4. Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/'); // Redirige al inicio (Login)
  };

  return (
    <nav className="bg-emerald-700 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Grupo Izquierdo: Logo y Menú */}
        <div className="flex items-center space-x-6">
          <Link to="/ciudadano" className="text-lg font-bold flex items-center gap-2">
            <span>🌿</span> EcoPoints
          </Link>
          
          <div className="hidden md:flex space-x-2 text-sm">
            <Link to="/ciudadano" className="hover:bg-emerald-600 px-3 py-2 rounded-md transition">Dashboard</Link>
            <Link to="/mapa" className="hover:bg-emerald-600 px-3 py-2 rounded-md transition">Mapa</Link>
            <Link to="/recompensas" className="hover:bg-emerald-600 px-3 py-2 rounded-md transition">Recompensas</Link>
            <Link to="/historial" className="hover:bg-emerald-600 px-3 py-2 rounded-md transition">Mi Historial</Link>
          </div>
        </div>

        {/* Grupo Derecho: Usuario y Cerrar Sesión */}
        <div className="flex items-center gap-4">
            
            {/* Muestra el nombre del usuario */}
            <div className="flex items-center gap-2 bg-emerald-800/30 px-3 py-1 rounded-full">
                <span className="text-xl">👤</span>
                <span className="text-sm font-medium">{nombreUsuario}</span>
            </div>
            
            <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-sm transition-colors flex items-center gap-1"
            >
                <span>🚪</span> Cerrar Cesión
            </button>
        </div>

      </div>
    </nav>
  );
}

export default NavbarCiudadano;