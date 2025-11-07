// src/views/NotificacionesCampanas.jsx
import React from 'react';
import NavbarCiudadano from '../components/NavbarCiudadano';

const NotificacionesCampanas = () => {
  return (
    <>
      <NavbarCiudadano />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Notificaciones y Campañas</h1>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded" role="alert">
          <p className="font-bold">¡Nueva Campaña!</p>
          <p>Este fin de semana, ¡doble de puntos por cada kilo de vidrio que recicles! 🚧</p>
        </div>
      </div>
    </>
  );
};

export default NotificacionesCampanas;