import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { FileText, Download, FileSpreadsheet, Save } from 'lucide-react';
import NavbarMunicipalidad from '../components/NavbarMunicipalidad'; // 1. Importa el Navbar


const EstadisticasPage = () => {
  const [filters, setFilters] = useState({
    distrito: "PV001",
    materiales: ["Plástico", "Vidrio"],
    fechaDesde: "2025-01-01",
    fechaHasta: "2025-12-31",
  });

  const dataMensual = [
    { mes: "Ene", recicladoKg: 1200, agua: 3000, kwh: 500, arboles: 10 },
    { mes: "Feb", recicladoKg: 1500, agua: 3200, kwh: 600, arboles: 12 },
    { mes: "Mar", recicladoKg: 1800, agua: 3500, kwh: 700, arboles: 15 },
    { mes: "Abr", recicladoKg: 2000, agua: 4000, kwh: 800, arboles: 18 },
  ];

  const topCiudadanos = [
    { nombre: "Ana", puntos: 120 },
    { nombre: "Luis", puntos: 110 },
    { nombre: "Carlos", puntos: 95 },
  ];

  const topPuntosVerdes = [
    { nombre: "PV001 - Comas", impacto: 500 },
    { nombre: "PV015 - SMP", impacto: 450 },
    { nombre: "PV007 - Los Olivos", impacto: 430 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      

        <NavbarMunicipalidad />
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-green-400 to-green-500 px-6 py-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white max-w-xl">
            <h1 className="text-5xl font-bold mb-4"> Estadísticas de Reciclaje - Ecopoint</h1>
            <p className="text-lg opacity-90">
              Experience seamless financial management with our secure and 
              user-friendly banking solutions. Access your accounts anytime, 
              anywhere.
            </p>
          </div>
          <div className="text-8xl">
          📊
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded shadow">
        <select
          value={filters.distrito}
          onChange={(e) => setFilters({ ...filters, distrito: e.target.value })}
          className="border p-2 rounded w-64"
        >
          <option value="PV001">PV001 - Comas</option>
          <option value="PV015">PV015 - SMP</option>
          <option value="PV007">PV007 - Los Olivos</option>
        </select>

        <input
          type="date"
          value={filters.fechaDesde}
          onChange={(e) => setFilters({ ...filters, fechaDesde: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={filters.fechaHasta}
          onChange={(e) => setFilters({ ...filters, fechaHasta: e.target.value })}
          className="border p-2 rounded"
        />

        <div className="flex flex-wrap gap-2 items-center">
          {["Plástico", "Vidrio", "Papel", "Metal", "Orgánico"].map((mat) => (
            <label key={mat} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={filters.materiales.includes(mat)}
                onChange={() => {
                  const materiales = filters.materiales.includes(mat)
                    ? filters.materiales.filter((m) => m !== mat)
                    : [...filters.materiales, mat];
                  setFilters({ ...filters, materiales });
                }}
              />
              {mat}
            </label>
          ))}
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Aplicar filtros</button>
        <button
          onClick={() =>
            setFilters({ distrito: "", materiales: [], fechaDesde: "", fechaHasta: "" })
          }
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Restablecer
        </button>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Toneladas recicladas (kg)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dataMensual}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="recicladoKg" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Litros de agua ahorrados</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dataMensual}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="agua" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">KWH ahorrados</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dataMensual}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="kwh" fill="#FFC107" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Top ciudadanos</h2>
          <ul className="list-disc pl-5">
            {topCiudadanos.map((c) => (
              <li key={c.nombre}>{c.nombre} – {c.puntos} pts</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Árboles equivalentes</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dataMensual}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="arboles" fill="#8BC34A" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Top puntos verdes</h2>
          <ul className="list-disc pl-5">
            {topPuntosVerdes.map((p) => (
              <li key={p.nombre}>{p.nombre} – {p.impacto} kg</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Botones de exportación */}
      <div className="flex flex-wrap gap-6 justify-center mb-12">
      <button className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-lg font-bold shadow-lg transition-all hover:shadow-xl transform hover:scale-105 flex items-center gap-3">
            <Download size={20} />
            Exportar a PDF
          </button>
        <button className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-lg font-bold shadow-lg transition-all hover:shadow-xl transform hover:scale-105 flex items-center gap-3">
            <FileSpreadsheet size={20} />
            Exportar a Excel
          </button>
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-lg font-bold shadow-lg transition-all hover:shadow-xl transform hover:scale-105 flex items-center gap-3">
            <Save size={20} />
            Generar Informe     
            </button>
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

export default EstadisticasPage;
