// src/views/HistorialEntregas.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarCiudadano from '../components/NavbarCiudadano';
import { Recycle, Gift } from 'lucide-react';

function HistorialEntregas() {
  const [entregas, setEntregas] = useState([]);
  const [canjes, setCanjes] = useState([]);
  const [premiosMap, setPremiosMap] = useState({}); // Nuevo estado para nombres de premios
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      const usuarioData = localStorage.getItem('usuario');
      if (!usuarioData) {
        navigate('/login');
        return;
      }
      
      const usuario = JSON.parse(usuarioData);
      const usuarioId = usuario.usuario || usuario.id; 

      try {
        // 1. Cargar Entregas
        const resEntregas = await fetch(`/api/entregas/usuario/${usuarioId}`);
        if (resEntregas.ok) {
          const data = await resEntregas.json();
          setEntregas(data.reverse());
        }

        // 2. Cargar Canjes
        const resCanjes = await fetch(`/api/recompensas/canjes`);
        if (resCanjes.ok) {
          const data = await resCanjes.json();
          const misCanjes = data.filter(c => c.usuarioId === usuarioId);
          setCanjes(misCanjes.reverse());
        }

        // 3. NUEVO: Cargar Premios para obtener los nombres
        const resPremios = await fetch(`/api/recompensas/premios`);
        if (resPremios.ok) {
            const listaPremios = await resPremios.json();
            // Convertimos la lista en un diccionario { "P001": "Botella", ... }
            const mapa = {};
            listaPremios.forEach(p => {
                mapa[p.id] = p.nombre;
            });
            setPremiosMap(mapa);
        }

      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [navigate]);

  const getEstadoBadge = (estado) => {
    if (estado === 'VALIDADA') return <span className="badge badge-success text-white">Validada</span>;
    return <span className="badge badge-warning text-white">Pendiente</span>;
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 flex flex-col">
      <NavbarCiudadano />

      <main className="flex-grow container mx-auto px-4 py-10 max-w-6xl space-y-12">
        
        {/* SECCIÓN 1: ENTREGAS (RECICLAJE) */}
        <div className="bg-white shadow-xl rounded-xl p-8 border-t-4 border-emerald-500">
          <h1 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <Recycle /> Mis Entregas de Reciclaje
          </h1>
          {/* ... (Tabla de Entregas igual que antes) ... */}
          {cargando ? (
            <div className="text-center py-4">Cargando...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full text-center">
                <thead className="bg-emerald-100 text-emerald-800 font-bold">
                  <tr>
                    <th className="py-3 rounded-l-lg">ID</th>
                    <th>Material</th>
                    <th>Peso</th>
                    <th>Puntos Ganados</th>
                    <th className="rounded-r-lg">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {entregas.length > 0 ? (
                    entregas.map((entrega) => (
                      <tr key={entrega.id} className="hover:bg-emerald-50 transition-colors border-b border-gray-100">
                        <td className="font-mono text-xs text-gray-500">{entrega.id.substring(0, 8)}...</td>
                        <td className="font-semibold">{entrega.material}</td>
                        <td>{entrega.peso} kg</td>
                        <td className="font-bold text-emerald-600">+{Math.round(entrega.peso * 10)} pts</td>
                        <td>{getEstadoBadge(entrega.estado)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="py-6 text-gray-400 italic">No has realizado entregas aún.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SECCIÓN 2: CANJES (RECOMPENSAS) */}
        <div className="bg-white shadow-xl rounded-xl p-8 border-t-4 border-amber-500">
          <h1 className="text-2xl font-bold text-amber-700 mb-6 flex items-center gap-2">
            <Gift /> Mis Recompensas Canjeadas
          </h1>

          {cargando ? (
            <div className="text-center py-4">Cargando...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full text-center">
                <thead className="bg-amber-100 text-amber-800 font-bold">
                  <tr>
                    <th className="py-3 rounded-l-lg">ID Canje</th>
                    <th>Premio</th> {/* CAMBIO DE TÍTULO */}
                    <th>Puntos Usados</th>
                    <th className="rounded-r-lg">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {canjes.length > 0 ? (
                    canjes.map((canje) => (
                      <tr key={canje.id} className="hover:bg-amber-50 transition-colors border-b border-gray-100">
                        <td className="font-mono text-xs text-gray-500">{canje.id.substring(0, 8)}...</td>
                        
                        {/* AHORA MOSTRAMOS EL NOMBRE REAL USANDO EL MAPA */}
                        <td className="font-semibold text-gray-800">
                            {premiosMap[canje.premioId] || canje.premioId}
                        </td>
                        
                        <td className="font-bold text-red-500">-{canje.puntosUtilizados} pts</td>
                        <td className="text-sm text-gray-500">
                            {new Date(canje.fechaCanje).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className="py-6 text-gray-400 italic">Aún no has canjeado premios.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8 pb-8">
             <button 
                onClick={() => navigate('/registrar-entrega')}
                className="btn btn-lg bg-emerald-600 hover:bg-emerald-700 text-white border-none px-10 shadow-lg transform hover:scale-105 transition-all"
             >
                + Nueva Entrega
             </button>
        </div>

      </main>
    </div>
  );
}

export default HistorialEntregas;