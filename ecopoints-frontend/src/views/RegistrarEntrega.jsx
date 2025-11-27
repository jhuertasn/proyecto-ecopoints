// src/views/RegistrarEntrega.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // 1. IMPORTAR useLocation
import imagenReciclaje from '../assets/images/reciclaje.jpg';
import Swal from 'sweetalert2';

// Componente de Notificación
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
  const navigate = useNavigate();
  const location = useLocation(); // 2. ACTIVAR LA "ANTENA" PARA RECIBIR DATOS

  // Estados
  const [peso, setPeso] = useState(3.0);
  const [material, setMaterial] = useState('Plástico');

  // Estados de Ubicación
  const [listaPuntos, setListaPuntos] = useState([]);
  const [puntoVerdeNombre, setPuntoVerdeNombre] = useState('');
  const [distrito, setDistrito] = useState('');

  const [comentarios, setComentarios] = useState('');
  const [nombreFoto, setNombreFoto] = useState('');
  const [notificacion, setNotificacion] = useState({ tipo: '', mensaje: '' });
  const [usuarioId, setUsuarioId] = useState(null);

  const fileInputRef = useRef(null);

  // --- 1. CARGAR DATOS Y PROCESAR PRE-SELECCIÓN ---
  useEffect(() => {
    // A. Validar Usuario
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      const usuario = JSON.parse(usuarioData);
      setUsuarioId(usuario.usuario);
    } else {
      navigate('/login');
    }

    // B. Cargar Puntos Verdes de la API
    fetch('/api/puntos-verdes')
      .then(res => res.json())
      .then(data => {
        console.log("📦 Datos recibidos de API:", data);
        setListaPuntos(data);

        if (data.length > 0) {
          let puntoInicial = data[0];

          // 3. LÓGICA DE PRE-SELECCIÓN (Si venimos del mapa)
          if (location.state?.puntoPreseleccionado) {
            console.log("📍 Vengo del mapa con:", location.state.puntoPreseleccionado);
            const preseleccionado = data.find(p => p.nombre === location.state.puntoPreseleccionado);
            if (preseleccionado) {
              puntoInicial = preseleccionado;
            }
          }

          // 4. SETEAR VALORES INICIALES (Punto y Distrito)
          setPuntoVerdeNombre(puntoInicial.nombre);
          setDistrito(puntoInicial.distrito || 'Sin Distrito Asignado');
        }
      })
      .catch(err => console.error("Error cargando puntos:", err));

  }, [navigate, location]); // Agregamos 'location' a las dependencias

  // Limpiar notificación
  useEffect(() => {
    if (notificacion.mensaje) {
      const timer = setTimeout(() => setNotificacion({ tipo: '', mensaje: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [notificacion]);

  // --- MANEJADORES ---

  // Cambio manual en el dropdown
  const handlePuntoChange = (e) => {
    const nombreSeleccionado = e.target.value;
    setPuntoVerdeNombre(nombreSeleccionado);

    const puntoEncontrado = listaPuntos.find(p => p.nombre === nombreSeleccionado);
    if (puntoEncontrado) {
      setDistrito(puntoEncontrado.distrito || 'Sin Distrito Asignado');
    }
  };

  const handleIncrementarPeso = () => setPeso(p => parseFloat((p + 0.5).toFixed(1)));
  const handleDecrementarPeso = () => setPeso(p => Math.max(0.5, parseFloat((p - 0.5).toFixed(1))));

  const handleAdjuntarImagen = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    if (e.target.files[0]) setNombreFoto(e.target.files[0].name);
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
      distrito: distrito,
      fotoUrl: nombreFoto ? `http://bucket-falso.com/${nombreFoto}` : "http://foto.com/default.png",
      comentarios: comentarios + ` (Punto: ${puntoVerdeNombre})`
    };

    try {
      const response = await fetch('/api/entregas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaEntrega)
      });

      if (response.ok) {
        Swal.fire({
          title: '¡Entrega Registrada!',
          text: 'Tu solicitud ha sido enviada. Espera la validación del recolector.',
          icon: 'success',
          confirmButtonColor: '#10B981', // Color Emerald-500
          confirmButtonText: 'Genial'
        }).then(() => {
          setTimeout(() => navigate('/confirmacion-entrega', { state: { peso: peso } }), 1500);
        });

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
                    value={puntoVerdeNombre}
                    onChange={handlePuntoChange}
                  >
                    {listaPuntos.length === 0 && <option disabled>Cargando puntos...</option>}
                    {listaPuntos.map(p => (
                      <option key={p.id} value={p.nombre}>{p.nombre}</option>
                    ))}
                  </select>
                </div>

                {/* CAMPO DE DISTRITO (SOLO LECTURA) */}
                <div className="form-control w-full mt-2">
                  <label className="label"><span className="label-text font-semibold text-gray-500">Distrito</span></label>
                  <input
                    type="text"
                    className="input input-bordered input-sm w-full bg-gray-200 text-gray-600 cursor-not-allowed focus:outline-none"
                    value={distrito}
                    readOnly
                  />
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
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
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