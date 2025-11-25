// src/views/GestionPuntosVerdes.jsx
import React, { useState, useEffect } from 'react';
import NavbarMunicipalidad from '../components/NavbarMunicipalidad';

const GestionPuntosVerdes = () => {
  const [puntos, setPuntos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tipo: 'Reciclaje',
    latitud: '',
    longitud: ''
  });

  // 1. CARGAR PUNTOS (GET) al iniciar
  useEffect(() => {
    fetchPuntos();
  }, []);

  const fetchPuntos = async () => {
    try {
      const res = await fetch('/api/puntos-verdes'); // Llama al proxy -> puerto 3007
      const data = await res.json();
      setPuntos(data);
    } catch (error) {
      console.error("Error cargando puntos:", error);
    }
  };

  // Manejar inputs del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. CREAR PUNTO (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convertir coordenadas a números para evitar errores
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
        setModalOpen(false); // Cerrar modal
        setFormData({ nombre: '', direccion: '', tipo: 'Reciclaje', latitud: '', longitud: '' }); // Limpiar form
        fetchPuntos(); // Recargar la tabla
      } else {
        alert("❌ Error al crear el punto");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <>
      <NavbarMunicipalidad />
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Puntos Verdes</h1>
          <button 
            onClick={() => setModalOpen(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2"
          >
            <span>+</span> Añadir Nuevo Punto
          </button>
        </div>

        {/* TABLA DE PUNTOS VERDES */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="table w-full">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Tipo</th>
                <th>Coordenadas</th>
              </tr>
            </thead>
            <tbody>
              {puntos.map((punto) => (
                <tr key={punto.id} className="hover:bg-gray-50">
                  <td className="font-mono text-xs">{punto.id}</td>
                  <td className="font-bold text-gray-700">{punto.nombre}</td>
                  <td>{punto.direccion}</td>
                  <td>
                    <span className="badge badge-success text-white badge-sm">{punto.tipo}</span>
                  </td>
                  <td className="text-xs text-gray-500">
                    Lat: {punto.latitud} <br/> Lng: {punto.longitud}
                  </td>
                </tr>
              ))}
              {puntos.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center p-8 text-gray-400">No hay puntos registrados aún.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL DE CREACIÓN (Usando estilos de DaisyUI o Tailwind puro) */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Nuevo Punto Verde</h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="label-text font-semibold">Nombre</label>
                    <input name="nombre" placeholder="Ej: Parque Central" className="input input-bordered w-full" onChange={handleChange} required />
                </div>
                
                <div>
                    <label className="label-text font-semibold">Dirección</label>
                    <input name="direccion" placeholder="Ej: Av. Arequipa 123" className="input input-bordered w-full" onChange={handleChange} required />
                </div>

                <div>
                    <label className="label-text font-semibold">Tipo</label>
                    <select name="tipo" className="select select-bordered w-full" onChange={handleChange}>
                        <option value="Reciclaje">Estación de Reciclaje</option>
                        <option value="Acopio">Centro de Acopio</option>
                        <option value="Municipal">Punto Municipal</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <div>
                       <label className="label-text font-semibold">Latitud</label>
                       <input name="latitud" type="number" step="any" placeholder="-12.xxx" className="input input-bordered w-full" onChange={handleChange} required />
                   </div>
                   <div>
                       <label className="label-text font-semibold">Longitud</label>
                       <input name="longitud" type="number" step="any" placeholder="-77.xxx" className="input input-bordered w-full" onChange={handleChange} required />
                   </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setModalOpen(false)} className="btn btn-ghost">Cancelar</button>
                  <button type="submit" className="btn btn-primary text-white">Guardar Punto</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GestionPuntosVerdes;