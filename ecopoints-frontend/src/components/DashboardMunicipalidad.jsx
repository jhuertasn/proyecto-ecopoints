import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, Gift, Globe, Umbrella, Award } from 'lucide-react';

import NavbarMunicipalidad from '../components/NavbarMunicipalidad';

// Datos simulados
const entregasData = [
  { distrito: 'Lima', serie1: 85, serie2: 72 },
  { distrito: 'Callao', serie1: 65, serie2: 58 },
  { distrito: 'Miraflores', serie1: 92, serie2: 88 },
  { distrito: 'San Isidro', serie1: 78, serie2: 70 },
  { distrito: 'Surco', serie1: 82, serie2: 75 }
];

const materialData = [
  { mes: 'Enero', kg: 152 },
  { mes: 'Febrero', kg: 234 },
  { mes: 'Marzo', kg: 187 },
  { mes: 'Abril', kg: 267 },
  { mes: 'Mayo', kg: 341 }
];

const ciudadanosData = [
  { distrito: 'Lima', serie1: 95, serie2: 88 },
  { distrito: 'Callao', serie1: 72, serie2: 65 },
  { distrito: 'Miraflores', serie1: 84, serie2: 78 },
  { distrito: 'San Isidro', serie1: 91, serie2: 85 },
  { distrito: 'Surco', serie1: 88, serie2: 80 }
];

const puntosVerdesData = [
  { mes: 'Octubre', units: 153 },
  { mes: 'Noviembre', units: 234 },
  { mes: 'Diciembre', units: 187 },
  { mes: 'Enero', units: 256 },
  { mes: 'Febrero', units: 304 }
];

const recompensasData = [
  { mes: 'Octubre', units: 152 },
  { mes: 'Noviembre', units: 234 },
  { mes: 'Diciembre', units: 187 },
  { mes: 'Enero', units: 256 },
  { mes: 'Febrero', units: 264 }
];

const DashboardMunicipalidad = () => {
  return (
    <div className="min-h-screen bg-gray-50">
     <NavbarMunicipalidad />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 px-6 py-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white max-w-xl">
            <h1 className="text-5xl font-bold mb-4">Municipalidad</h1>
            <p className="text-lg opacity-90">
              Experience seamless financial management with our secure and 
              user-friendly banking solutions. Access your accounts anytime, 
              anywhere.
            </p>
          </div>
          <div className="text-9xl">
            ♻️
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Primera fila de gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total de entregas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-center text-blue-900 font-semibold mb-2">
              Total de entregas registradas en el distrito.
            </h3>
            <p className="text-center text-sm text-gray-600 mb-4">Comparación</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={entregasData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="distrito" type="category" width={80} style={{ fontSize: '12px' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="serie1" fill="#60a5fa" name="Serie 1" />
                <Bar dataKey="serie2" fill="#1e40af" name="Serie 2" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cantidad total de material */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Gift className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-center text-blue-900 font-semibold mb-2">
              Cantidad total de material reciclado (kg).
            </h3>
            <p className="text-center text-sm text-gray-600 mb-4">Month on Month Chart</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={materialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" style={{ fontSize: '11px' }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="kg" fill="#60a5fa" name="Serie" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Número de ciudadanos activos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-center text-blue-900 font-semibold mb-2">
              Número de ciudadanos activos que reciclaron en el último mes.
            </h3>
            <p className="text-center text-sm text-gray-600 mb-4">Comparación</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ciudadanosData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="distrito" type="category" width={80} style={{ fontSize: '12px' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="serie1" fill="#60a5fa" name="Serie 1" />
                <Bar dataKey="serie2" fill="#1e40af" name="Serie 2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segunda fila de gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Puntos verdes operativos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Umbrella className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-center text-blue-900 font-semibold mb-4">
              Número de puntos verdes operativos.
            </h3>
            <p className="text-center text-sm text-gray-600 mb-4">Month on Month Chart</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={puntosVerdesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" style={{ fontSize: '12px' }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="units" fill="#60a5fa" name="Units" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total de recompensas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-center text-blue-900 font-semibold mb-4">
              Total de recompensas canjeadas.
            </h3>
            <p className="text-center text-sm text-gray-600 mb-4">Month on Month Chart</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={recompensasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" style={{ fontSize: '12px' }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="units" fill="#60a5fa" name="Units" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 justify-center mb-8">
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition">
            Ver reportes detallados
          </button>
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition">
            Ver estadísticas
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
              Platform for secure and responsive banking solutions. Access your finances anywhere.
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
              <li>📍 123 Banking Avenue Financial District, New York, NY 10001</li>
              <li>📞 1-800-BANKO-24</li>
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

export default DashboardMunicipalidad;