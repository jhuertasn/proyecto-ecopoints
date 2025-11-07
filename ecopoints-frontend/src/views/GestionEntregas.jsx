// src/views/GestionEntregas.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DetalleEntrega from '../components/DetalleEntrega'; // Importamos el panel lateral

// Datos de ejemplo
const initialEntregas = [
  { id: '001', usuario: 'Jordan Huertas', puntoVerde: 'Parque Integración', material: 'Plástico', peso: '10 kg', estado: 'Pendiente', recolector: 'Pedro Ramírez', materiales: [{nombre: 'Plástico', peso: '10 kg'}] },
  { id: '002', usuario: 'Jhon Tacuri', puntoVerde: 'Calle Las Curvas', material: 'Vidrio', peso: '15 kg', estado: 'Validado', recolector: 'Ana López', materiales: [{nombre: 'Vidrio', peso: '15 kg'}] },
  { id: '003', usuario: 'Sebastian Navarro', puntoVerde: 'Calle Hurtado', material: 'Papel', peso: '8 kg', estado: 'Confirmado', recolector: 'Pedro Ramírez', materiales: [{nombre: 'Papel', peso: '8 kg'}] },
  { id: '004', usuario: 'Jesus Gonzales', puntoVerde: 'Av. Lima 402', material: 'Varios', peso: '6 kg', estado: 'Rechazado', recolector: 'Ana López', materiales: [{nombre: 'Cartón', peso: '4 kg'}, {nombre: 'Latas', peso: '2 kg'}] },
];

// Mapeo de estados a colores de Tailwind para la tabla
const estadoStyles = {
  'Pendiente': 'text-yellow-600',
  'Validado': 'text-green-600',
  'Confirmado': 'text-blue-600',
  'Rechazado': 'text-red-600',
};

function GestionEntregas() {
  const [entregas, setEntregas] = useState(initialEntregas);
  const [busqueda, setBusqueda] = useState('');
  const [entregaSeleccionada, setEntregaSeleccionada] = useState(entregas[0]); // Seleccionamos la primera por defecto

  // Filtramos las entregas basándonos en la búsqueda.
  // useMemo optimiza para que no se recalcule en cada render, solo si cambia la data.
  const entregasFiltradas = useMemo(() => {
    if (!busqueda) return entregas;
    return entregas.filter(e => 
      e.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.puntoVerde.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.material.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [busqueda, entregas]);

  return (
    <div className="bg-gray-50 font-sans antialiased">
      {/* Navbar */}
      <nav className="bg-white p-4 shadow-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/recolector" className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </Link>
            <span className="text-2xl font-bold text-gray-800">Gestión de Entregas</span>
          </div>
          <div><button className="bg-green-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-600 shadow-md">+ Nueva Entrega</button></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Contenido Principal */}
        <div className="lg:w-2/3">
          <div className="mb-6"><input type="text" placeholder="Buscar por usuario, punto verde o material..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 search-icon" /></div>
          
          {/* Tabla de Entregas */}
          <div className="bg-white shadow-md rounded-lg overflow-x-auto mb-8 border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {['ID', 'Usuario', 'Punto Verde', 'Material', 'Peso', 'Estado'].map(header => (
                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entregasFiltradas.map((entrega) => (
                  <tr key={entrega.id} onClick={() => setEntregaSeleccionada(entrega)} className="hover:bg-gray-100 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entrega.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entrega.usuario}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entrega.puntoVerde}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entrega.material}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entrega.peso}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${estadoStyles[entrega.estado]}`}>{entrega.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel Lateral */}
        <DetalleEntrega entrega={entregaSeleccionada} />
      </main>
    </div>
  );
}

export default GestionEntregas;