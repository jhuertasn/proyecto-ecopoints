// src/views/NotificacionesCampanas.jsx
import React from 'react';
import NavbarCiudadano from '../components/NavbarCiudadano';
import { Megaphone, Calendar, MapPin } from 'lucide-react';

const CampanaCard = ({ titulo, fecha, lugar, descripcion, tipo }) => (
  <div className={`card bg-base-100 shadow-xl border-l-4 ${tipo === 'urgente' ? 'border-red-500' : 'border-green-500'}`}>
    <div className="card-body">
      <h2 className="card-title flex items-center gap-2">
        <Megaphone className={tipo === 'urgente' ? 'text-red-500' : 'text-green-500'} />
        {titulo}
        {tipo === 'urgente' && <div className="badge badge-error text-white">Nuevo</div>}
      </h2>
      <p className="text-gray-600 my-2">{descripcion}</p>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm text-gray-500">
        <div className="flex items-center gap-1">
            <Calendar size={16}/> {fecha}
        </div>
        <div className="flex items-center gap-1">
            <MapPin size={16}/> {lugar}
        </div>
      </div>
      
      <div className="card-actions justify-end mt-4">
        <button className="btn btn-sm btn-outline btn-success">Más Información</button>
      </div>
    </div>
  </div>
);

const NotificacionesCampanas = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <NavbarCiudadano />
      
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-emerald-800 mb-2">📢 Campañas y Noticias</h1>
            <p className="text-gray-600">Entérate de las últimas actividades de reciclaje en tu distrito.</p>
        </div>

        <div className="space-y-6">
            <CampanaCard 
                titulo="¡Gran Reciclatón de Vidrio!"
                fecha="Sábado 30 de Noviembre, 9:00 AM"
                lugar="Parque de la Exposición"
                descripcion="Trae tus botellas de vidrio y recibe **doble puntaje** por cada kilo. ¡Habrá premios sorpresa para los primeros 50 vecinos!"
                tipo="urgente"
            />

            <CampanaCard 
                titulo="Nuevo Punto Verde en Los Olivos"
                fecha="Permanente"
                lugar="Av. Carlos Izaguirre 813"
                descripcion="La municipalidad ha inaugurado un nuevo centro de acopio para plásticos y cartones. Abierto de Lunes a Sábado."
                tipo="info"
            />

            <CampanaCard 
                titulo="Taller de Compostaje Casero"
                fecha="Domingo 01 de Diciembre, 10:00 AM"
                lugar="Plaza de Armas"
                descripcion="Aprende a reducir tus residuos orgánicos y crea abono para tus plantas. Entrada libre."
                tipo="info"
            />
        </div>
      </div>
    </div>
  );
};

export default NotificacionesCampanas;