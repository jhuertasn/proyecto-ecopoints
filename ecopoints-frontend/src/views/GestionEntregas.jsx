// src/views/GestionEntregas.jsx
import React, { useState, useEffect, useMemo } from 'react';
import NavbarRecolector from '../components/NavbarRecolector';
import DetalleEntrega from '../components/DetalleEntrega';

function GestionEntregas() {
  const [entregas, setEntregas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [entregaSeleccionada, setEntregaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);

  // 1. CARGAR DATOS DEL BACKEND (Solo pendientes)
  const cargarEntregas = async () => {
    setCargando(true);
    try {
      const response = await fetch('/api/entregas/pendientes');
      if (response.ok) {
        const data = await response.json();
        setEntregas(data);
        // Si hay datos, seleccionamos el primero para mostrar detalle
        if (data.length > 0) setEntregaSeleccionada(data[0]);
        else setEntregaSeleccionada(null);
      }
    } catch (error) {
      console.error("Error al cargar entregas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEntregas();
  }, []);

  // 2. FUNCIÓN PARA VALIDAR (Dispara RabbitMQ en el backend)
  const handleValidarEntrega = async () => {
    if (!entregaSeleccionada) return;
    
    const confirmacion = window.confirm("¿Confirmar que recibiste esta entrega? Se asignarán puntos al ciudadano.");
    if (!confirmacion) return;

    try {
      const response = await fetch(`/api/entregas/${entregaSeleccionada.id}/validar`, {
        method: 'PUT'
      });

      if (response.ok) {
        alert("✅ Entrega validada con éxito");
        // Recargamos la lista para que esa entrega desaparezca de "pendientes"
        cargarEntregas(); 
      } else {
        alert("❌ Error al validar la entrega");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  // Filtro de búsqueda local
  const entregasFiltradas = useMemo(() => {
    if (!busqueda) return entregas;
    return entregas.filter(e => 
      e.material.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.id.includes(busqueda)
    );
  }, [busqueda, entregas]);

  return (
    <div className="bg-gray-50 font-sans antialiased min-h-screen">
      <NavbarRecolector />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* LISTA (Izquierda) */}
        <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-2xl font-bold text-gray-800">Entregas Pendientes</h1>
                 <button onClick={cargarEntregas} className="btn btn-sm btn-ghost">🔄 Actualizar</button>
            </div>
            
            <div className="mb-6">
                <input 
                  type="text" 
                  placeholder="Buscar por material o ID..." 
                  value={busqueda} 
                  onChange={e => setBusqueda(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
                />
            </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Peso</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entregasFiltradas.map((entrega) => (
                  <tr 
                    key={entrega.id} 
                    onClick={() => setEntregaSeleccionada(entrega)} 
                    className={`cursor-pointer transition-colors ${entregaSeleccionada?.id === entrega.id ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{entrega.material}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{entrega.peso} kg</td>
                    <td className="px-6 py-4 text-sm"><span className="badge badge-warning badge-sm">{entrega.estado}</span></td>
                  </tr>
                ))}
                {entregas.length === 0 && !cargando && (
                    <tr><td colSpan="3" className="text-center p-8 text-gray-400">No hay entregas pendientes.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETALLE (Derecha) */}
        {/* Pasamos la función handleValidarEntrega al componente hijo */}
        <DetalleEntrega 
            entrega={entregaSeleccionada} 
            onValidar={handleValidarEntrega}
        />
      </main>
    </div>
  );
}

export default GestionEntregas;