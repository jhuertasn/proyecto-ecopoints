// src/components/NavbarRecolector.jsx
import React, { useState, useEffect } from 'react'; // 1. Importamos los hooks necesarios
import { Link, useNavigate } from 'react-router-dom'; // 2. Importamos useNavigate

function NavbarRecolector() {
  const navigate = useNavigate();
  
  // Estado para guardar el nombre (por defecto 'Recolector' si no hay datos)
  const [nombreUsuario, setNombreUsuario] = useState('Recolector');

  // Al cargar el componente, buscamos el nombre real en localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        const datos = JSON.parse(usuarioGuardado);
        if (datos.usuario) {
          setNombreUsuario(datos.usuario);
        }
      } catch (error) {
        console.error("Error al leer usuario", error);
      }
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario'); // Borra los datos de sesión
    navigate('/'); // Redirige a la pantalla principal (Login)
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Lado Izquierdo: Logo y Links */}
        <div className="flex items-center space-x-4">
          <Link to="/recolector" className="text-lg font-bold">🌿 EcoPoints</Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/recolector" className="hover:text-green-400">Inicio</Link>
            <Link to="/recolector/gestion" className="hover:text-green-400">Gestión de Entregas</Link>
            <Link to="/recolector/historial" className="hover:text-green-400">Historial</Link>
            
          </div>
        </div>

        {/* Lado Derecho: Usuario y Botón Salir */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🧑‍🔧</span>
            {/* Aquí mostramos el nombre dinámico */}
            <span>{nombreUsuario}</span>
          </div>
          
          {/* Botón de Cerrar Sesión */}
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded shadow-sm transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

      </div>
    </nav>
  );
}

export default NavbarRecolector;