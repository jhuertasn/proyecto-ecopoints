// src/views/GestionPuntosVerdes.jsx
import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Map as MapIcon } from 'lucide-react';
import NavbarMunicipalidad from '../components/NavbarMunicipalidad';
import Footer from '../components/Footer';

const GestionPuntosVerdes = () => {
  const [puntos, setPuntos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    distrito: 'Comas', 
    tipo: 'Reciclaje',
    latitud: '',
    longitud: ''
  });

  // 1. CARGAR PUNTOS (GET)
  const fetchPuntos = async () => {
    try {
      const res = await fetch('/api/puntos-verdes');
      const data = await res.json();
      setPuntos(data);
    } catch (error) {
      console.error("Error cargando puntos:", error);
    }
  };

  useEffect(() => {
    fetchPuntos();
  }, []);

  // Manejar inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. CREAR PUNTO (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        ...formData,
        latitud: parseFloat(formData.latitud),
        longitud: parseFloat(formData.longitud)
    };

    try {
      const res = await fetch('/api/puntos-verdes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Punto verde creado con éxito");
        setModalOpen(false);
        setFormData({ nombre: '', direccion: '', distrito: 'Comas', tipo: 'Reciclaje', latitud: '', longitud: '' });
        fetchPuntos(); 
      } else {
        alert("❌ Error al crear el punto");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <NavbarMunicipalidad />
      
      {/* HERO */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 px-6 py-10 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestión de Puntos Verdes</h1>
            <p className="text-emerald-100">Administra la ubicación estratégica de los puntos verdes del distrito.</p>
          </div>
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
            <MapIcon size={40} className="text-white opacity-90" />
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Puntos Activos</h2>
          <button 
            onClick={() => setModalOpen(true)} 
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none gap-2 shadow-lg normal-case text-base"
          >
            <Plus size={20} /> Añadir Nuevo Punto
          </button>
        </div>

        {/* TABLA CORREGIDA (5 TH -> 5 TD) */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs border-b border-gray-100">
              <tr>
                <th className="py-4 pl-6">ID</th>
                <th>Nombre del Punto</th>
                <th>Ubicación / Dirección</th>
                <th>Tipo</th>
                <th>Coordenadas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {puntos.map((punto) => (
                <tr key={punto.id} className="hover:bg-emerald-50/30 transition-colors">
                  {/* COLUMNA 1: ID */}
                  <td className="pl-6 font-mono text-gray-400">#{punto.id}</td>
                  
                  {/* COLUMNA 2: NOMBRE */}
                  <td className="font-bold text-gray-800 text-base">{punto.nombre}</td>
                  
                  {/* COLUMNA 3: UBICACIÓN */}
                  <td className="text-gray-600">
                    <div className="font-medium text-emerald-700">{punto.distrito || 'Sin distrito'}</div>
                    <div className="text-xs">{punto.direccion}</div>
                  </td>

                  {/* COLUMNA 4: TIPO (Ahora tiene su propia celda) */}
                  <td>
                    <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold border border-teal-200">
                        {punto.tipo}
                    </span>
                  </td>

                  {/* COLUMNA 5: COORDENADAS */}
                  <td className="text-xs font-mono text-gray-400">
                    <span className="block">Lat: {punto.latitud}</span>
                    <span className="block">Lng: {punto.longitud}</span>
                  </td>
                </tr>
              ))}
              {puntos.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center p-12 text-gray-400 bg-gray-50/30">
                        <div className="flex flex-col items-center gap-3">
                            <MapPin size={48} className="opacity-20"/>
                            <span>No hay puntos registrados aún.</span>
                        </div>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL DE CREACIÓN */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all scale-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Nuevo Punto Verde</h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="label-text font-bold text-gray-600 text-xs uppercase mb-1 block">Nombre</label>
                    <input name="nombre" placeholder="Ej: Parque Central" className="input input-bordered w-full focus:outline-emerald-500" onChange={handleChange} value={formData.nombre} required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label-text font-bold text-gray-600 text-xs uppercase mb-1 block">Distrito</label>
                        <select name="distrito" className="select select-bordered w-full focus:outline-emerald-500" onChange={handleChange} value={formData.distrito}>
                            <option value="Comas">Comas</option>
                            <option value="Los Olivos">Los Olivos</option>
                            <option value="Independencia">Independencia</option>
                            <option value="SMP">San Martín de Porres</option>
                            <option value="Carabayllo">Carabayllo</option>
                            <option value="Miraflores">Miraflores</option>
                            <option value="San Isidro">San Isidro</option>
                            <option value="Lima">Cercado de Lima</option>
                        </select>
                    </div>
                    <div>
                        <label className="label-text font-bold text-gray-600 text-xs uppercase mb-1 block">Tipo</label>
                        <select name="tipo" className="select select-bordered w-full focus:outline-emerald-500" onChange={handleChange} value={formData.tipo}>
                            <option value="Reciclaje">Estación de Reciclaje</option>
                            <option value="Acopio">Centro de Acopio</option>
                            <option value="Municipal">Punto Municipal</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="label-text font-bold text-gray-600 text-xs uppercase mb-1 block">Dirección</label>
                    <input name="direccion" placeholder="Ej: Av. Arequipa 123" className="input input-bordered w-full focus:outline-emerald-500" onChange={handleChange} value={formData.direccion} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                       <label className="label-text font-bold text-gray-600 text-xs uppercase mb-1 block">Latitud</label>
                       <input name="latitud" type="number" step="any" placeholder="-12.xxx" className="input input-bordered w-full focus:outline-emerald-500" onChange={handleChange} value={formData.latitud} required />
                   </div>
                   <div>
                       <label className="label-text font-bold text-gray-600 text-xs uppercase mb-1 block">Longitud</label>
                       <input name="longitud" type="number" step="any" placeholder="-77.xxx" className="input input-bordered w-full focus:outline-emerald-500" onChange={handleChange} value={formData.longitud} required />
                   </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                  <button type="button" onClick={() => setModalOpen(false)} className="btn btn-ghost hover:bg-gray-100">Cancelar</button>
                  <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none px-8">Guardar Punto</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GestionPuntosVerdes;