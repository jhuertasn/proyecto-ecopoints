// src/views/RegistrarEntrega.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import imagenReciclaje from '../assets/images/reciclaje.jpg';

// Componente de Notificación (Igual que antes)
const Notificacion = ({ tipo, mensaje }) => {
  if (!mensaje) return null;
  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-sm transition-all duration-300";
  const styles = {
    success: "bg-green-100 border border-green-500 text-green-700",
    error: "bg-red-100 border border-red-500 text-red-700",
    pending: "bg-yellow-100 border border-yellow-500 text-yellow-700",
  };
  const icon = { success: '✅', error: '❌', pending: '⏳' };
  return <div className={`${baseClasses} ${styles[tipo]}`}>{icon[tipo]} {mensaje}</div>;
};

function RegistrarEntrega() {
  const [peso, setPeso] = useState(3.0);
  const [material, setMaterial] = useState('Plástico');
  const [puntoVerdeId, setPuntoVerdeId] = useState(''); // Estado para el punto verde seleccionado
  const [listaPuntos, setListaPuntos] = useState([]);   // Lista de puntos verdes traídos de la API
  const [comentarios, setComentarios] = useState('');
  const [nombreFoto, setNombreFoto] = useState('');     // Para mostrar el nombre del archivo
  const [notificacion, setNotificacion] = useState({ tipo: '', mensaje: '' });
  const [usuarioId, setUsuarioId] = useState(null);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 1. Cargar Usuario y Puntos Verdes al inicio
  useEffect(() => {
    // Cargar Usuario
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      const usuario = JSON.parse(usuarioData);
      setUsuarioId(usuario.usuario); 
    } else {
      alert("Debes iniciar sesión primero");
      navigate('/login');
    }

    // Cargar Puntos Verdes (Fetch real)
    fetch('/api/puntos-verdes')
      .then(res => res.json())
      .then(data => {
        setListaPuntos(data);
        if (data.length > 0) {
          setPuntoVerdeId(data[0].nombre); // Seleccionar el primero por defecto (o usar ID)
        }
      })
      .catch(err => console.error("Error cargando puntos:", err));
      
  }, [navigate]);

  // Limpiar notificación
  useEffect(() => {
    if (notificacion.mensaje) {
      const timer = setTimeout(() => setNotificacion({ tipo: '', mensaje: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [notificacion]);

  const handleIncrementarPeso = () => setPeso(p => parseFloat((p + 0.5).toFixed(1)));
  const handleDecrementarPeso = () => setPeso(p => Math.max(0.5, parseFloat((p - 0.5).toFixed(1))));
  
  const handleAdjuntarImagen = () => fileInputRef.current.click();
  
  // Manejar selección de archivo
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNombreFoto(e.target.files[0].name);
    }
  };

  const handleRegistrar = async () => {
    if (!usuarioId) {
        setNotificacion({ tipo: 'error', mensaje: 'Error: Usuario no identificado' });
        return;
    }
    setNotificacion({ tipo: 'pending', mensaje: 'Enviando entrega...' });

    const nuevaEntrega = {
        usuarioId: usuarioId,
        material: material,
        peso: peso,
        // Usamos el punto verde seleccionado. 
        // Si tu backend de entregas no tiene campo para 'puntoVerde', puedes 
        // concatenarlo en los comentarios o pedir que agreguen el campo.
        // Por ahora, lo mandamos en comentarios si no hay campo específico.
        fotoUrl: nombreFoto ? `http://bucket-falso.com/${nombreFoto}` : "http://foto.com/default.png",
        comentarios: comentarios + ` (Punto: ${puntoVerdeId})` 
    };

    try {
        const response = await fetch('/api/entregas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaEntrega)
        });

        if (response.ok) {
            setNotificacion({ tipo: 'success', mensaje: '¡Entrega registrada con éxito!' });
            setTimeout(() => navigate('/confirmacion-entrega'), 1500);
        } else {
            setNotificacion({ tipo: 'error', mensaje: 'Error al registrar la entrega' });
        }
    } catch (error) {
        console.error(error);
        setNotificacion({ tipo: 'error', mensaje: 'Error de conexión' });
    }
  };
  
  const handleLimpiar = () => {
    setPeso(3.0);
    setComentarios('');
    setMaterial('Plástico');
    setNombreFoto('');
    if (fileInputRef.current) fileInputRef.current.value = "";
    setNotificacion({ tipo: 'error', mensaje: 'Campos limpiados' });
  };
  
  return (
    <div className="bg-gradient-to-b from-emerald-300 to-white text-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <Link to="/ciudadano" className="text-gray-700 text-2xl hover:scale-110 transition-transform">←</Link>
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          🌿 Eco<span className="text-emerald-700">Points</span>
        </h1>
        <div className="w-[250px] h-[42px] flex items-center justify-end">
          <Notificacion tipo={notificacion.tipo} mensaje={notificacion.mensaje} />
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
          {/* Imagen */}
          <div className="w-full lg:w-1/2 flex justify-center items-start">
            <div className="rounded-xl shadow-lg bg-white overflow-hidden w-full h-[550px]">
              <img src={imagenReciclaje} alt="Tipos de residuos" className="w-full h-full object-cover object-center rounded-xl" />
            </div>
          </div>

          {/* Contenido */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Detalles */}
              <div className="bg-white shadow-lg rounded-xl p-6 flex-1 space-y-3">
                <h2 className="text-xl font-semibold mb-2 text-emerald-900">Detalles</h2>
                
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Fecha</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-bold">
                        {new Date().toLocaleDateString()}
                    </span>
                </div>

                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-semibold">Material</span></label>
                  <select 
                    className="select select-bordered select-sm w-full"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  >
                    <option value="Plástico">Plástico</option>
                    <option value="Vidrio">Vidrio</option>
                    <option value="Papel">Papel</option>
                    <option value="Cartón">Cartón</option>
                    <option value="Metal">Metal</option>
                  </select>
                </div>

                {/* SELECTOR DINÁMICO DE PUNTOS VERDES */}
                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-semibold">Punto Verde</span></label>
                  <select 
                    className="select select-bordered select-sm w-full"
                    value={puntoVerdeId}
                    onChange={(e) => setPuntoVerdeId(e.target.value)}
                  >
                    <option value="" disabled>Selecciona un punto</option>
                    {listaPuntos.map(p => (
                        <option key={p.id} value={p.nombre}>{p.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Peso y Foto */}
              <div className="bg-white shadow-lg rounded-xl p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-emerald-900">Peso (Kg)</h2>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button onClick={handleDecrementarPeso} className="btn btn-circle btn-sm bg-emerald-200 border-none text-lg font-bold text-emerald-800 hover:bg-emerald-300"> − </button>
                    <span className="font-bold text-3xl text-gray-800 w-20 text-center">{peso}</span>
                    <button onClick={handleIncrementarPeso} className="btn btn-circle btn-sm bg-emerald-200 border-none text-lg font-bold text-emerald-800 hover:bg-emerald-300"> + </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2 text-sm">Evidencia</h3>
                  
                  {/* INPUT FILE OCULTO */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept="image/*"
                  />
                  
                  <button onClick={handleAdjuntarImagen} className="btn btn-outline btn-success btn-sm w-full">
                    {nombreFoto ? '✅ Foto cargada' : '📷 Adjuntar Foto'}
                  </button>
                  {nombreFoto && <p className="text-xs text-gray-500 mt-1 truncate">{nombreFoto}</p>}
                </div>
              </div>
            </div>

            {/* Comentarios */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-2 text-emerald-900">Comentarios</h2>
              <textarea 
                className="textarea textarea-bordered w-full focus:outline-emerald-500 mb-4"
                rows="3" 
                placeholder="Escribe tus observaciones..."
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
              ></textarea>
              <div className="flex gap-4">
                <button onClick={handleRegistrar} className="btn bg-emerald-600 hover:bg-emerald-700 text-white flex-1 border-none text-lg">
                  Registrar Entrega
                </button>
                <button onClick={handleLimpiar} className="btn btn-ghost text-red-500 hover:bg-red-50 flex-1 border-red-200">
                  Limpiar
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