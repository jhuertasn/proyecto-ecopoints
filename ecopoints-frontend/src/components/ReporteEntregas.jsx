import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, Download, FileSpreadsheet, Save } from 'lucide-react';
import NavbarMunicipalidad from '../components/NavbarMunicipalidad'; // 1. Importa el Navbar


// Datos simulados para el gráfico
const visualizacionData = [
  { mes: 'October', units: 153 },
  { mes: 'November', units: 234 },
  { mes: 'December', units: 167 },
  { mes: 'January', units: 250 },
  { mes: 'February', units: 304 }
];

// Lista de puntos verdes
const puntosVerdes = [
  'PV001 - Plaza de Armas de Comas',
  'PV002 - Parque Zonal Sinchi Roca',
  'PV003 - Mercado Central de Comas',
  'PV004 - Centro Comercial MegaPlaza',
  'PV005 - Universidad Nacional de Ingeniería (UNI) - Puerta 3',
  'PV006 - Municipalidad de Comas - Sede Central',
  'PV007 - Colegio Fe y Alegría N°12',
  'PV008 - Parque El Retablo',
  'PV009 - Complejo Deportivo Túpac Amaru',
  'PV010 - Centro de Salud Santa Luzmila II',
  'PV011 - Mercado Mayorista Pro',
  'PV012 - Parque Industrial Infantas',
  'PV013 - Plaza Vea Túpac Amaru',
  'PV014 - Paradero 50 Av. Túpac Amaru',
  'PV015 - Estación Naranjal - Metropolitano'
];

const ReporteEntregas = () => {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [puntoVerde, setPuntoVerde] = useState('');
  const [materialSeleccionado, setMaterialSeleccionado] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">

    <NavbarMunicipalidad />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 px-6 py-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white max-w-xl">
            <h1 className="text-5xl font-bold mb-4">Reporte de Entregas - Ecopoint</h1>
            <p className="text-lg opacity-90">
              Experience seamless financial management with our secure and 
              user-friendly banking solutions. Access your accounts anytime, 
              anywhere.
            </p>
          </div>
          <div className="text-8xl">
            📦⏱️
          </div>
        </div>
      </div>

      {/* Filtros Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Buscar por ciudadano */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-blue-700 font-bold text-lg mb-6">Buscar por ciudadano</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filtrar por punto verde */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-blue-700 font-bold text-lg mb-6">Filtrar por punto verde</h3>
            <select
              value={puntoVerde}
              onChange={(e) => setPuntoVerde(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-green-50 text-sm max-h-48"
              size="10"
            >
              <option value="">Dropdown</option>
              {puntosVerdes.map((punto, index) => (
                <option key={index} value={punto} className="py-1">
                  {punto}
                </option>
              ))}
            </select>
          </div>

          {/* Filtrar por material */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-blue-700 font-bold text-lg mb-6">Filtrar por material</h3>
            <div className="space-y-4">
              {['Plastico', 'Vidrio', 'Papel', 'Metal', 'Organico'].map((material) => (
                <label key={material} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="material"
                    value={material}
                    checked={materialSeleccionado === material}
                    onChange={(e) => setMaterialSeleccionado(e.target.value)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-blue-700 font-medium">{material}</span>
                </label>
              ))}
            </div>

            {/* Rango de fechas */}
            <div className="mt-8">
              <h4 className="text-blue-700 font-bold text-base mb-4">Rango de fechas</h4>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-blue-600 font-semibold text-sm block mb-2">desde</label>
                  <input
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-blue-600 font-semibold text-sm block mb-2">Hasta</label>
                  <input
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visualización de resultados */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-blue-800 font-bold text-2xl text-center mb-2">
            Visualización de resultados
          </h2>
          <p className="text-center text-gray-600 mb-8">Month on Month Chart</p>
          
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={visualizacionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" style={{ fontSize: '13px' }} />
              <YAxis domain={[0, 400]} ticks={[0, 100, 200, 300, 400]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="units" fill="#60a5fa" name="Units" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-6 justify-center mb-12">
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-lg font-bold shadow-lg transition-all hover:shadow-xl transform hover:scale-105 flex items-center gap-3">
            <Download size={20} />
            Descargar reporte en PDF
          </button>
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-lg font-bold shadow-lg transition-all hover:shadow-xl transform hover:scale-105 flex items-center gap-3">
            <FileSpreadsheet size={20} />
            Exportar a Excel
          </button>
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-lg font-bold shadow-lg transition-all hover:shadow-xl transform hover:scale-105 flex items-center gap-3">
            <Save size={20} />
            Guardar consulta
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-500 text-white px-2 py-1 rounded font-bold">E</div>
              <span className="font-semibold">Ecopoints</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted partner for secure and responsive banking solutions. Access your finances anytime, anywhere.
            </p>
            <div className="flex gap-3 text-gray-400">
              <span>f</span>
              <span>🐦</span>
              <span>📷</span>
              <span>in</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Online Banking</a></li>
              <li><a href="#" className="hover:text-white">Mobile App</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Reciclaje</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Checking Accounts</a></li>
              <li><a href="#" className="hover:text-white">Savings Accounts</a></li>
              <li><a href="#" className="hover:text-white">Credit Cards</a></li>
              <li><a href="#" className="hover:text-white">Loans & Mortgages</a></li>
              <li><a href="#" className="hover:text-white">Investments</a></li>
              <li><a href="#" className="hover:text-white">Business Banking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact & Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>🏛️ 123 Banking Street, Financial District, New York, NY 10001</li>
              <li>✈️ 1-800-BANKO-24</li>
              <li>✉️ support@banko.com</li>
              <li>🕐 Mon-Fri: 9AM-5PM EST</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 flex justify-between text-sm text-gray-400">
          <p>© 2025 Ecopoints. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default ReporteEntregas;