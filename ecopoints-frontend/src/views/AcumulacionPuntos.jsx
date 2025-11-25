// src/views/AcumulacionPuntos.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarCiudadano from '../components/NavbarCiudadano';

function AcumulacionPuntos() {
  const [puntos, setPuntos] = useState(0);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPuntos = async () => {
      const usuarioData = localStorage.getItem('usuario');
      if (!usuarioData) {
        navigate('/login');
        return;
      }
      
      const usuario = JSON.parse(usuarioData);
      const usuarioIdParaBuscar = usuario.usuario || usuario.id;
      try {
        // CORRECCIÓN: Manda el ID
        const res = await fetch(`/api/recompensas/puntos/${usuarioIdParaBuscar}`);
        
        if (res.ok) {
          const data = await res.json();
          // El backend devuelve un entero directo (ej: 50)
          setPuntos(data); 
        } else {
          console.error("Error al obtener puntos");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchPuntos();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <NavbarCiudadano />
      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-10 text-center text-white">
                <h2 className="text-4xl font-extrabold mb-2">Tus EcoPoints</h2>
                <p className="text-emerald-100 text-lg">Sigue reciclando para ganar más recompensas</p>
            </div>

            <div className="p-10 text-center">
                {cargando ? (
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-24 w-48 bg-gray-200 rounded mb-4"></div>
                        <div className="h-6 w-32 bg-gray-200 rounded"></div>
                    </div>
                ) : (
                    <>
                        <div className="text-9xl font-black text-emerald-600 tracking-tighter mb-2">
                            {puntos}
                        </div>
                        <div className="text-xl font-medium text-gray-500 uppercase tracking-wide mb-10">
                            Puntos Disponibles
                        </div>
                    </>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button 
                        onClick={() => navigate('/recompensas')}
                        className="btn btn-lg bg-amber-500 hover:bg-amber-600 text-white border-none shadow-lg transform hover:-translate-y-1 transition-all flex items-center gap-2"
                    >
                        <span>🎁</span> Canjear Premios
                    </button>
                    <button 
                        onClick={() => navigate('/historial')}
                        className="btn btn-lg btn-outline border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-700 shadow-md"
                    >
                        Ver Historial
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AcumulacionPuntos;