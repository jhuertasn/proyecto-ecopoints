// src/views/DashboardMunicipalidad.jsx
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { Truck, Recycle, MapPin, Gift, Activity } from 'lucide-react';
import NavbarMunicipalidad from '../components/NavbarMunicipalidad';
import Footer from '../components/Footer';

// Colores para el gráfico de materiales
const COLORS = {
  plastico: '#3B82F6', // Azul
  vidrio: '#10B981',   // Verde
  papel: '#F59E0B',    // Amarillo
  otro: '#9CA3AF'      // Gris
};

// Componente de Tarjeta KPI
const KPICard = ({ title, value, icon, color, subtext }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-1`}>
        <div>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-1">{title}</p>
            <h3 className={`text-4xl font-extrabold text-${color}-600`}>{value}</h3>
            {subtext && <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Activity size={12}/> {subtext}</p>}
        </div>
        <div className={`p-4 bg-${color}-50 rounded-xl text-${color}-500`}>
            {React.cloneElement(icon, { size: 32 })}
        </div>
    </div>
);

const DashboardMunicipalidad = () => {
  const [stats, setStats] = useState({
    total_entregas: 0,
    total_kg_reciclados: 0,
    materiales_kg: { plastico: 0, vidrio: 0, papel: 0, otro: 0 }
  });
  
  const [totalPuntosVerdes, setTotalPuntosVerdes] = useState(0);
  const [totalCanjes, setTotalCanjes] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 1. Estadísticas Globales
        const resStats = await fetch('/api/estadisticas/globales');
        if (resStats.ok) {
            const data = await resStats.json();
            if (!data.materiales_kg) data.materiales_kg = {};
            setStats(data);
        }
        // 2. Puntos Verdes
        const resPuntos = await fetch('/api/puntos-verdes');
        if (resPuntos.ok) {
            const data = await resPuntos.json();
            setTotalPuntosVerdes(data.length);
        }
        // 3. Canjes
        const resCanjes = await fetch('/api/recompensas/canjes');
        if (resCanjes.ok) {
            const data = await resCanjes.json();
            setTotalCanjes(data.length);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  // Preparar datos para gráficos
  const materialChartData = [
    { name: 'Plástico', value: stats.materiales_kg?.plastico || 0, color: COLORS.plastico },
    { name: 'Vidrio', value: stats.materiales_kg?.vidrio || 0, color: COLORS.vidrio },
    { name: 'Papel', value: stats.materiales_kg?.papel || 0, color: COLORS.papel },
    { name: 'Otro', value: stats.materiales_kg?.otro || 0, color: COLORS.otro },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      <NavbarMunicipalidad />

      {/* HERO: Encabezado Verde Restaurado */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-12 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
            <div>
                <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
                    Panel de Control <span className="text-emerald-200">EcoPoints</span>
                </h1>
                <p className="text-emerald-100 text-lg max-w-2xl opacity-95">
                    Plataforma centralizada para el monitoreo en tiempo real del impacto ambiental y la gestión operativa municipal.
                </p>
            </div>
            {/* Icono Grande de Reciclaje */}
            <div className="hidden md:block text-emerald-200 opacity-40 transform rotate-12 drop-shadow-lg">
                <Recycle size={130} strokeWidth={1.5} />
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex-grow w-full space-y-8">
        
        {/* 1. SECCIÓN DE KPIs (Datos 100% Reales) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard 
                title="Entregas Validadas" 
                value={stats.total_entregas} 
                icon={<Truck />} color="blue" 
                subtext="Transacciones completadas" 
            />
            <KPICard 
                title="Total Reciclado" 
                value={`${stats.total_kg_reciclados} kg`} 
                icon={<Recycle />} color="green" 
                subtext="Peso total procesado" 
            />
            <KPICard 
                title="Puntos Activos" 
                value={totalPuntosVerdes} 
                icon={<MapPin />} color="teal" 
                subtext="Infraestructura operativa" 
            />
            <KPICard 
                title="Premios Entregados" 
                value={totalCanjes} 
                icon={<Gift />} color="amber" 
                subtext="Incentivos reclamados" 
            />
        </div>

        {/* 2. SECCIÓN DE ANÁLISIS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* A. Gráfico Principal: Desglose por Material */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl text-gray-800">Composición del Reciclaje</h3>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">EN VIVO</span>
                </div>
                
                {cargando ? (
                    <div className="h-64 flex items-center justify-center text-gray-400">Cargando datos...</div>
                ) : (
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={materialChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={60}>
                                    {materialChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* B. Meta Municipal (Gamificación Visual) */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">Meta del Mes</h3>
                    <p className="text-gray-500 text-sm mb-8">Objetivo de recolección municipal: 1,000 kg</p>
                    
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                                    Progreso
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-emerald-600">
                                    {Math.min(100, (stats.total_kg_reciclados / 1000 * 100)).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-emerald-100">
                            <div style={{ width: `${Math.min(100, (stats.total_kg_reciclados / 1000 * 100))}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-1000"></div>
                        </div>
                    </div>
                </div>

                {/* Lista Rápida de Resumen */}
                <div className="mt-6">
                    <h4 className="font-bold text-gray-700 mb-4 text-sm uppercase tracking-wide">Desglose Rápido</h4>
                    <div className="space-y-3">
                        {materialChartData.map((m) => (
                            <div key={m.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: m.color}}></div>
                                    {m.name}
                                </span>
                                <span className="font-bold text-gray-800">{m.value} kg</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

      </div>

      <Footer /> 
    </div>
  );
};

export default DashboardMunicipalidad;