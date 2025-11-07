// src/views/GestionPuntosVerdes.jsx
import React from 'react';
import NavbarMunicipalidad from '../components/NavbarMunicipalidad';

const GestionPuntosVerdes = () => {
  return (
    <>
      <NavbarMunicipalidad />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestión de Puntos Verdes</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            + Añadir Nuevo Punto
          </button>
        </div>
        <p className="text-gray-500">Aquí iría una tabla con la lista de puntos verdes, con opciones para editar y eliminar. 🚧</p>
      </div>
    </>
  );
};

export default GestionPuntosVerdes;