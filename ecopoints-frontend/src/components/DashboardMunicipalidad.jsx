// src/views/DashboardMunicipalidad.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, Gift, Globe, Umbrella, Award } from 'lucide-react';
import NavbarMunicipalidad from '../components/NavbarMunicipalidad';

// --- Datos simulados (Se mantienen para lo que no tiene backend) ---
const entregasData = [ { distrito: 'Lima', serie1: 85, serie2: 72 }, { distrito: 'Callao', serie1: 65, serie2: 58 } ];
const ciudadanosData = [ { distrito: 'Lima', serie1: 95, serie2: 88 }, { distrito: 'Callao', serie1: 72, serie2: 65 } ];
const puntosVerdesData = [ { mes: 'Octubre', units: 153 }, { mes: 'Noviembre', units: 234 } ];
const recompensasData = [ { mes: 'Octubre', units: 152 }, { mes: 'Noviembre', units: 234 } ];

const DashboardMunicipalidad = () => {
  // Estado inicial seguro (con valores en 0 para evitar errores)
  const [stats, setStats] = useState({
    total_entregas: 0,
    total_kg_reciclados: 0,
    materiales_kg: { plastico: 0, vidrio: 0, papel: 0, otro: 0 }
  });

  const [cargando, setCargando] = useState(true);

  // Cargar datos del backend
  useEffect(() => {
    fetch('/api/estadisticas/globales')
      .then(res => {
          if (!res.ok) throw new Error("Error en la respuesta");
          return res.json();
      })
      .then(data => {
          console.log("Estadísticas cargadas:", data);
          // Aseguramos que materiales_kg exista, si no, ponemos un objeto vacío
          if (!data.materiales_kg) data.materiales_kg = {}; 
          setStats(data);
      })
      .catch(err => console.error("Error cargando estadísticas:", err))
      .finally(() => setCargando(false));
  }, []);

  // Preparar datos para el gráfico (con protección || 0)
  const materialChartData = [
    { nombre: 'Plástico', kg: stats.materiales_kg?.plastico || 0 },
    { nombre: 'Vidrio', kg: stats.materiales_kg?.vidrio || 0 },
    { nombre: 'Papel', kg: stats.materiales_kg?.papel || 0 },
    { nombre: 'Otro', kg: stats.materiales_kg?.otro || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarMunicipalidad />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 px-6 py-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white max-w-xl">
            <h1 className="text-5xl font-bold mb-4">Municipalidad</h1>
            <p className="text-lg opacity-90">
              Visualiza los datos y estadísticas clave del programa de reciclaje en tiempo real.
            </p>
          </div>
          <div className="text-9xl">♻️</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex-grow">
        
        {/* Resumen Numérico (Datos Reales) */}
        <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow text-center border-l-4 border-blue-500">
                <h3 className="text-4xl font-bold text-blue-900">{cargando ? "..." : stats.total_entregas}</h3>
                <p className="text-gray-500 font-semibold uppercase text-sm mt-2">Entregas Totales</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center border-l-4 border-green-500">
                <h3 className="text-4xl font-bold text-green-600">{cargando ? "..." : stats.total_kg_reciclados} kg</h3>
                <p className="text-gray-500 font-semibold uppercase text-sm mt-2">Total Reciclado</p>
            </div>
        </div>

        {/* Primera fila de gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total de entregas (Simulado) */}
          <div className="bg-white rounded-lg shadow-md p-6">
             <div className="flex justify-center mb-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Zap className="text-blue-600" size={24} /></div></div>
             <h3 className="text-center text-blue-900 font-semibold mb-2">Total de entregas por distrito</h3>
             <ResponsiveContainer width="100%" height={200}>
               <BarChart data={entregasData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="distrito" type="category" width={80} style={{ fontSize: '12px' }} /><Tooltip /><Legend /><Bar dataKey="serie1" fill="#60a5fa" /><Bar dataKey="serie2" fill="#1e40af" /></BarChart>
             </ResponsiveContainer>
          </div>

          {/* --- GRÁFICO REAL: MATERIALES --- */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-100">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Gift className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-center text-green-800 font-bold mb-2">
              Material Reciclado (kg)
            </h3>
            <p className="text-center text-xs text-gray-500 mb-4 uppercase tracking-wide">Datos en Tiempo Real</p>
            
            {cargando ? <p className="text-center text-gray-400 py-10">Cargando...</p> : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={materialChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" style={{ fontSize: '11px' }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="kg" fill="#10b981" name="Kilogramos" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          {/* -------------------------------- */}

          {/* Número de ciudadanos (Simulado) */}
          <div className="bg-white rounded-lg shadow-md p-6">
             <div className="flex justify-center mb-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Globe className="text-blue-600" size={24} /></div></div>
             <h3 className="text-center text-blue-900 font-semibold mb-2">Ciudadanos activos</h3>
             <ResponsiveContainer width="100%" height={200}>
               <BarChart data={ciudadanosData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="distrito" type="category" width={80} style={{ fontSize: '12px' }} /><Tooltip /><Legend /><Bar dataKey="serie1" fill="#60a5fa" /><Bar dataKey="serie2" fill="#1e40af" /></BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Segunda fila (Simulada) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6"><ResponsiveContainer width="100%" height={250}><BarChart data={puntosVerdesData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="mes" /><YAxis /><Tooltip /><Bar dataKey="units" fill="#60a5fa" /></BarChart></ResponsiveContainer></div>
            <div className="bg-white rounded-lg shadow-md p-6"><ResponsiveContainer width="100%" height={250}><BarChart data={recompensasData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="mes" /><YAxis /><Tooltip /><Bar dataKey="units" fill="#60a5fa" /></BarChart></ResponsiveContainer></div>
        </div>

      </div>

      {/* --- FOOTER RESTAURADO --- */}
      <footer className="bg-gray-900 text-white px-6 py-12 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-500 text-white px-2 py-1 rounded font-bold">E</div>
              <span className="font-semibold">EcoPoints</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Plataforma integral para la gestión sostenible de residuos y recompensas ciudadanas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Inicio</a></li>
              <li><a href="#" className="hover:text-white">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-white">Servicios</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Reciclaje</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Puntos Verdes</a></li>
              <li><a href="#" className="hover:text-white">Tipos de Material</a></li>
              <li><a href="#" className="hover:text-white">Recompensas</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Av. Principal 123, Lima</li>
              <li>📞 (01) 555-0123</li>
              <li>✉️ contacto@ecopoints.pe</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 flex justify-between text-sm text-gray-400">
          <p>© 2025 EcoPoints. Todos los derechos reservados.</p>
        </div>
      </footer>
      {/* ------------------------- */}

    </div>
  );
};

export default DashboardMunicipalidad;