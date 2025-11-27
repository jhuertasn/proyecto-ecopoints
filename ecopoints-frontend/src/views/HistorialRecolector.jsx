// src/views/HistorialRecolector.jsx
import React, { useState, useEffect } from 'react';
import NavbarRecolector from '../components/NavbarRecolector';
import Footer from '../components/Footer';
import { CheckCircle, Calendar } from 'lucide-react';

function HistorialRecolector() {
  const [entregas, setEntregas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        // Reutilizamos el endpoint que creamos para el reporte del admin
        // Este trae TODAS. En el frontend filtramos las validadas.
        const response = await fetch('/api/entregas/todas'); 
        
        if (response.ok) {
          const data = await response.json();
          // Filtramos solo las que ya están VALIDADA
          const validadas = data.filter(e => e.estado === 'VALIDADA');
          setEntregas(validadas.reverse()); // Las más recientes primero
        }
      } catch (error) {
        console.error("Error cargando historial:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarHistorial();
  }, []);

  return (
    <div className="bg-gray-50 font-sans antialiased min-h-screen flex flex-col">
      <NavbarRecolector />

      <main className="max-w-7xl mx-auto py-8 px-6 flex-grow w-full">
        
        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-full text-green-600">
                <CheckCircle size={32} />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Mis Recolecciones</h1>
                <p className="text-gray-500">Historial de entregas validadas.</p>
            </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">ID Entrega</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Material</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Peso Recogido</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {cargando ? (
                  <tr><td colSpan="4" className="text-center py-8 text-gray-500">Cargando historial...</td></tr>
              ) : entregas.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-8 text-gray-400">Aún no has validado ninguna entrega.</td></tr>
              ) : (
                entregas.map((entrega) => (
                  <tr key={entrega.id} className="hover:bg-green-50/30 transition-colors">
                    <td className="px-6 py-4 text-xs text-gray-500 font-mono">#{entrega.id.substring(0, 8)}...</td>
                    <td className="px-6 py-4">
                        <span className="font-bold text-gray-800">{entrega.material}</span>
                    </td>
                    <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-xs font-bold border border-gray-200">
                            {entrega.peso} kg
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                            <CheckCircle size={12}/> Validada
                        </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default HistorialRecolector;