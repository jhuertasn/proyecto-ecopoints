// src/views/CitizenDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DraggableImageMap from '../components/DraggableImageMap';
import NavbarCiudadano from '../components/NavbarCiudadano';
import Footer from '../components/Footer'; // Agregamos Footer para consistencia

function CitizenDashboard() {
  const [userPoints, setUserPoints] = useState(0); // Estado para los puntos
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // Cargar puntos reales del usuario
  useEffect(() => {
    const fetchPuntos = async () => {
      const usuarioData = localStorage.getItem('usuario');
      if (!usuarioData) {
        // Si no hay sesión, no hacemos fetch (el Navbar manejará el logout si es necesario)
        return;
      }
      
      const usuario = JSON.parse(usuarioData);
      // Usamos usuario.usuario (el nombre) como ID, igual que en todo el proyecto
      const usuarioId = usuario.usuario || usuario.id;

      try {
        const res = await fetch(`/api/recompensas/puntos/${usuarioId}`);
        if (res.ok) {
          const data = await res.json();
          setUserPoints(data); // Actualizamos con el dato real
        }
      } catch (error) {
        console.error("Error cargando puntos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchPuntos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <NavbarCiudadano />

      <div className="flex-grow px-6 md:px-12 py-8">
        
        {/* HEADER / BIENVENIDA */}
        <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl font-extrabold text-emerald-700 mb-4 flex items-center gap-2">
                 🌿 EcoPoints
            </h1>
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-6">
                Recicla, Suma y Gana.
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                Convierte tus residuos reciclables en puntos que puedes canjear por beneficios sostenibles.
                Con <strong>EcoPoints</strong>, cada acción verde cuenta 🌎.
            </p>

            {/* BOTÓN DE ACCIÓN PRINCIPAL */}
            <Link 
                to="/registrar-entrega" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-4 px-10 rounded-full shadow-xl transition-transform transform hover:scale-105 inline-flex items-center gap-2"
            >
                ♻️ Registrar Entrega
            </Link>
        </div>

        {/* MAPA INTERACTIVO */}
        <div className="mb-16">
            <DraggableImageMap />
        </div>

        {/* TARJETAS DE ACCESO RÁPIDO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* CARD 1: Tus Puntos (Dato Real) */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between border-t-4 border-emerald-500 hover:shadow-xl transition-shadow">
            <div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-2">Tus Puntos</h3>
              <p className="text-gray-600">Consulta tus puntos acumulados y descubre cuánto has ayudado al planeta.</p>
            </div>
            <div className="flex items-end justify-between mt-8">
              <h4 className="text-4xl font-black text-gray-800">
                  {cargando ? "..." : userPoints} <span className="text-lg text-gray-500 font-normal">pts</span>
              </h4>
              {/* Link directo al detalle de puntos */}
              <Link to="/recompensas" className="btn btn-circle btn-ghost text-emerald-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
              </Link>
            </div>
          </div>

          {/* CARD 2: Centros Verdes */}
          <div className="bg-emerald-600 rounded-3xl shadow-lg p-8 text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Centros Verdes</h3>
              <p className="text-emerald-100">Encuentra los puntos de reciclaje más cercanos y entrega tus materiales fácilmente.</p>
            </div>
            <div className="flex justify-between items-end mt-8 relative z-10">
              <Link to="/mapa" className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-full shadow hover:bg-emerald-50 transition-colors">
                Ver mapa
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-200 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            {/* Efecto visual de fondo */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          </div>

          {/* CARD 3: Impacto (Redirige a Historial) */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Mi Historial</h3>
              <p className="text-gray-600">Revisa el detalle de todas tus entregas, el peso reciclado y el estado de validación.</p>
            </div>
            <div className="flex justify-between items-end mt-8">
              <Link to="/historial" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                Ver mis entregas <span>→</span>
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CitizenDashboard;