// src/views/CitizenDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import DraggableImageMap from '../components/DraggableImageMap';
import NavbarCiudadano from '../components/NavbarCiudadano';

function CitizenDashboard() {
  const userPoints = '1,250';

  return (
    <>
      <NavbarCiudadano />

      <div className="bg-gradient-to-b from-emerald-300 to-white text-gray-800 flex flex-col px-10">
        
        {/*---NOMBRE---*/}
        <h1 className="text-4xl font-bold text-emerald-700 flex items-center space-x-2 px-8 py-5">
          <span>🌿 EcoPoints</span>
        </h1>
        
        {/* HERO - AHORA CON BOTÓN DE ACCIÓN */}
        <section className="text-center mt-10 mb-12 px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-4">Recicla. Suma. Gana.</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Convierte tus residuos reciclables en puntos que puedes canjear por beneficios sostenibles.
            Con <strong>EcoPoints</strong>, cada acción verde cuenta 🌎.
          </p>

          {/* --- NUEVO BOTÓN DE REGISTRAR ENTREGA --- */}
          <Link 
            to="/registrar-entrega" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 inline-flex items-center gap-2"
          >
            ♻️ Registrar Entrega
          </Link>
          {/* ---------------------------------------- */}

        </section>

        {/* MAPA INTERACTIVO */}
        <DraggableImageMap />

        {/* CARDS */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-8 pb-20 mt-12">
          
          {/* CARD 1: Tus Puntos */}
          <div className="hover-card bg-white rounded-3xl shadow-sm p-8 flex flex-col justify-between w-full md:w-1/3">
            <div>
              <h3 className="text-2xl font-semibold text-emerald-700 mb-2">Tus Puntos</h3>
              <p className="text-gray-600">Consulta tus puntos acumulados y descubre cuánto has ayudado al planeta.</p>
            </div>
            <div className="flex items-end justify-between mt-6">
              <h4 className="text-3xl font-bold text-gray-900">{userPoints} pts</h4>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* CARD 2: Centros Verdes */}
          <div className="hover-card bg-emerald-600 rounded-3xl p-8 text-white flex flex-col justify-between w-full md:w-1/3 relative overflow-hidden">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Centros Verdes</h3>
              <p className="text-emerald-50">Encuentra los puntos de reciclaje más cercanos y entrega tus materiales fácilmente.</p>
            </div>
            <div className="flex justify-between items-end mt-6">
              <Link to="/mapa" className="bg-white text-emerald-700 font-semibold px-6 py-2 rounded-full shadow hover:bg-emerald-50 transition">
                Ver mapa
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 opacity-80" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* CARD 3: Impacto Ambiental */}
          <div className="hover-card bg-white rounded-3xl shadow-sm p-8 flex flex-col justify-between w-full md:w-1/3">
            <div>
              <h3 className="text-2xl font-semibold text-emerald-700 mb-2">Impacto Ambiental</h3>
              <p className="text-gray-600">Descubre cuánto CO₂ has ayudado a reducir con tus entregas y comparte tu progreso.</p>
            </div>
            <div className="flex justify-between items-end mt-6">
              <Link to="/estadisticas" className="text-emerald-600 font-semibold hover:underline">
                Ver estadísticas
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default CitizenDashboard;