// src/views/HistorialEntregas.jsx

import React from 'react';

// En una aplicación real, estos datos vendrían de tu microservicio (API).
// Por ahora, los definimos aquí como un ejemplo.
const entregasData = [
  { id: 'PV006', fecha: '12/09/2025', puntoVerde: 'Parque Central - Miraflores', material: 'Plástico', peso: '2 kg', puntos: 25 },
  { id: 'PV005', fecha: '08/09/2025', puntoVerde: 'Colegio Perú España - VES', material: 'Vidrio', peso: '2.5 kg', puntos: 30 },
  { id: 'PV004', fecha: '06/09/2025', puntoVerde: 'Mall Aventura Santa Anita', material: 'Papel', peso: '1.2 kg', puntos: 12 },
  { id: 'PV003', fecha: '01/09/2025', puntoVerde: 'Mercado San Juan - SJM', material: 'Vidrio', peso: '3 kg', puntos: 50 },
  { id: 'PV002', fecha: '29/08/2025', puntoVerde: 'Instituto Certus - Surco', material: 'Papel', peso: '1 kg', puntos: 10 },
  { id: 'PV001', fecha: '25/08/2025', puntoVerde: 'Plaza Lima Sur - Chorrillos', material: 'Plástico', peso: '1.2 kg', puntos: 15 },
];


function HistorialEntregas() {
  return (
    // Reemplazamos <body> por un <div> que envuelve todo
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Historial de Entregas
        </h1>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-center">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 border">ID</th>
                <th className="py-3 px-4 border">Fecha</th>
                <th className="py-3 px-4 border">Punto Verde</th>
                <th className="py-3 px-4 border">Material</th>
                <th className="py-3 px-4 border">Peso</th>
                <th className="py-3 px-4 border">Puntos</th>
                <th className="py-3 px-4 border">Estado</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {/* Aquí mapeamos los datos para generar las filas dinámicamente */}
              {entregasData.map((entrega) => (
                <tr key={entrega.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="py-3 px-4 border">{entrega.id}</td>
                  <td className="py-3 px-4 border">{entrega.fecha}</td>
                  <td className="py-3 px-4 border">{entrega.puntoVerde}</td>
                  <td className="py-3 px-4 border">{entrega.material}</td>
                  <td className="py-3 px-4 border">{entrega.peso}</td>
                  <td className="py-3 px-4 border text-green-600 font-semibold">+{entrega.puntos} pts</td>
                  <td className="py-3 px-4 border text-blue-500 font-medium">Ver entrega</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botones */}
        <div className="flex justify-center space-x-6 mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full shadow">
            Eliminar
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full shadow">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistorialEntregas;