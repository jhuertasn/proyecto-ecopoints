// src/views/HistorialEntregas.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarCiudadano from '../components/NavbarCiudadano';

function HistorialEntregas() {
  const [entregas, setEntregas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarHistorial = async () => {
      // 1. Obtener el ID del usuario logueado (o el nombre, según como guardes)
      const usuarioData = localStorage.getItem('usuario');
      if (!usuarioData) {
        navigate('/login');
        return;
      }
      
      const usuario = JSON.parse(usuarioData);
      // IMPORTANTE: Usa el mismo campo que usaste al registrar (usuario.usuario o usuario.id)
      // Si en el registro guardaste el nombre 'JuanPerez', aquí usa usuario.usuario
      const usuarioIdParaBuscar = usuario.usuario || usuario.id; 

      try {
        // 2. Llamada al backend
        const response = await fetch(`/api/entregas/usuario/${usuarioIdParaBuscar}`);
        
        if (response.ok) {
          const data = await response.json();
          // Ordenar por fecha o ID descendente para ver lo más reciente primero
          // (Si el backend no devuelve fecha, el ID suele servir si es autoincremental, pero con UUID no. 
          // Lo dejamos tal cual llega por ahora).
          setEntregas(data.reverse());
        } else {
          console.error("Error al obtener historial");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarHistorial();
  }, [navigate]);

  // Helper para estilos de estado
  const getEstadoBadge = (estado) => {
    if (estado === 'VALIDADA') return <span className="badge badge-success text-white">Validada</span>;
    return <span className="badge badge-warning text-white">Pendiente</span>;
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <NavbarCiudadano />

      <div className="flex items-center justify-center py-10 px-4">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-6xl">
          <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
            🍃 Mi Historial de Reciclaje
          </h1>

          {cargando ? (
            <div className="text-center py-10">Cargando tus entregas...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full text-center">
                <thead className="bg-emerald-600 text-white">
                  <tr>
                    <th className="py-3 rounded-tl-lg">ID Entrega</th>
                    <th className="py-3">Material</th>
                    <th className="py-3">Peso (kg)</th>
                    <th className="py-3">Puntos Estimados</th>
                    <th className="py-3">Estado</th>
                    <th className="py-3 rounded-tr-lg">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {entregas.length > 0 ? (
                    entregas.map((entrega) => (
                      <tr key={entrega.id} className="hover:bg-emerald-50 transition-colors">
                        <td className="py-4 font-mono text-xs text-gray-500">
                            {entrega.id.substring(0, 8)}...
                        </td>
                        <td className="py-4 font-semibold">{entrega.material}</td>
                        <td className="py-4">{entrega.peso} kg</td>
                        
                        {/* Cálculo visual de puntos: Peso * 10 */}
                        <td className="py-4 font-bold text-emerald-600">
                            +{Math.round(entrega.peso * 10)} pts
                        </td>
                        
                        <td className="py-4">{getEstadoBadge(entrega.estado)}</td>
                        <td className="py-4">
                            <button className="btn btn-xs btn-ghost text-blue-500">Ver</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-8 text-gray-400 italic">
                        No tienes entregas registradas aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-center mt-8">
             <button 
                onClick={() => navigate('/registrar-entrega')}
                className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none px-8"
             >
                + Nueva Entrega
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistorialEntregas;