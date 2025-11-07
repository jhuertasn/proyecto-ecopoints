// src/views/RegistrarEntrega.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
// Importa la imagen de la vista
import imagenReciclaje from '../assets/images/reciclaje.jpg';

// Un pequeño componente para la notificación
const Notificacion = ({ tipo, mensaje }) => {
  if (!mensaje) return null;

  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-sm";
  const styles = {
    success: "bg-green-100 border border-green-500 text-green-700",
    error: "bg-red-100 border border-red-500 text-red-700",
    pending: "bg-yellow-100 border border-yellow-500 text-yellow-700",
  };
  const icon = { success: '✅', error: '❌', pending: '⏳' };

  return (
    <div className={`${baseClasses} ${styles[tipo]}`}>
      {icon[tipo]} {mensaje}
    </div>
  );
};


function RegistrarEntrega() {
  // Estado para el peso
  const [peso, setPeso] = useState(3);
  // Estado para los comentarios
  const [comentarios, setComentarios] = useState('');
  // Estado para la notificación
  const [notificacion, setNotificacion] = useState({ tipo: '', mensaje: '' });
  // Ref para el input de archivo
  const fileInputRef = useRef(null);
  
  // Efecto para ocultar la notificación después de 4 segundos
  useEffect(() => {
    if (notificacion.mensaje) {
      const timer = setTimeout(() => {
        setNotificacion({ tipo: '', mensaje: '' });
      }, 4000);
      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }
  }, [notificacion]);

  const handleIncrementarPeso = () => setPeso(p => p + 1);
  const handleDecrementarPeso = () => setPeso(p => Math.max(1, p - 1)); // No permite que sea menor a 1
  const handleAdjuntarImagen = () => fileInputRef.current.click();
const navigate = useNavigate(); // Asegúrate de tener esto
  const handleRegistrar = () => {
    // Aquí iría la lógica para enviar los datos a la API
  // alert('¡Registro Confirmado!'); // Comenta o elimina el alert
  navigate('/confirmacion-entrega'); // Redirige a la página de confirmación
 // 2. ¡Añade la llamada a confetti aquí!

  };
  
  const handleLimpiar = () => {
    setPeso(3);
    setComentarios('');
    setNotificacion({ tipo: 'error', mensaje: 'Campos limpiados' });
  };
  
  return (
    <div className="bg-gradient-to-b from-emerald-300 to-white text-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <Link to="/" className="text-gray-700 text-2xl hover:scale-110 transition-transform">
          ←
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          🌿 Eco<span className="text-emerald-700">Points</span>
        </h1>
        <div className="w-[250px] h-[42px] flex items-center justify-end">
          <Notificacion tipo={notificacion.tipo} mensaje={notificacion.mensaje} />
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="flex-grow flex items-center justify-center px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
          {/* Imagen */}
          <div className="w-full lg:w-1/2 flex justify-center items-start">
            <div className="rounded-xl shadow-lg bg-white overflow-hidden w-full h-[550px]">
              <img src={imagenReciclaje} alt="Tipos de residuos" className="w-full h-full object-cover object-center rounded-xl" />
            </div>
          </div>
          {/* Contenido derecho */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Detalles + Peso */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="bg-white shadow-lg rounded-xl p-6 flex-1">
                <h2 className="text-xl font-semibold mb-4 text-emerald-900">Detalles de la Entrega</h2>
                <div className="space-y-3 text-base">
                  <div className="flex justify-between items-center"><span>Fecha</span><span className="bg-emerald-200 px-3 py-1 rounded-full">12/10/25</span></div>
                  <div className="flex justify-between items-center"><span>Ciudad</span><span className="bg-emerald-200 px-3 py-1 rounded-full">Lima, Villa María</span></div>
                  <div className="flex justify-between items-center"><span>Punto Verde</span><span className="bg-emerald-200 px-3 py-1 rounded-full">Parque Integración</span></div>
                  <div className="flex justify-between items-center"><span>Tipo</span><span className="bg-emerald-200 px-3 py-1 rounded-full">Varios</span></div>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-xl p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-emerald-900">Peso del Residuo</h2>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button onClick={handleDecrementarPeso} className="bg-emerald-200 text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">−</button>
                    <span className="font-medium text-lg text-gray-800 w-16 text-center">{peso} KG</span>
                    <button onClick={handleIncrementarPeso} className="bg-emerald-200 text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">+</button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Adjuntar Imagen</h3>
                  <input type="file" ref={fileInputRef} className="hidden" />
                  <button onClick={handleAdjuntarImagen} className="bg-emerald-400 w-full py-2 rounded-lg font-semibold text-white hover:bg-emerald-500 transition">
                    Abrir
                  </button>
                </div>
              </div>
            </div>
            {/* Comentarios */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-4 text-emerald-900">Comentarios</h2>
              <textarea 
                className="border border-gray-300 rounded-lg p-3 mb-4 resize-none focus:ring-2 focus:ring-emerald-300"
                rows="4" 
                placeholder="Escribe tus observaciones..."
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
              ></textarea>
              <div className="flex gap-4">
                <button onClick={handleRegistrar} className="flex-1 bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition">
                  Registrar Entrega
                </button>
                <button onClick={handleLimpiar} className="flex-1 bg-red-100 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-200 transition">
                  Eliminar / Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistrarEntrega;