 // src/components/RecompensaCard.jsx
import React from 'react';

// Recibe los datos de la recompensa y una función para el clic como "props"
function RecompensaCard({ recompensa, onCanjear }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer"
      onClick={() => onCanjear(recompensa)}
    >
      <div className="bg-yellow-100 rounded-full p-3 mb-3 flex items-center justify-center w-24 h-24">
        {/* Usamos la imagen importada */}
        <img src={recompensa.imagen} alt={recompensa.titulo} className="w-full h-full object-contain" />
      </div>
      <h4 className="font-semibold text-lg text-gray-800 mb-1">{recompensa.titulo}</h4>
      <p className="text-sm text-gray-600 mb-2 h-10">{recompensa.descripcion}</p>
      
      {/* Usamos un div para el contenedor de puntos para que se alinee al final */}
      <div className="mt-auto pt-2">
        {recompensa.puntos > 0 ? (
          <p className="text-green-600 font-bold text-base">Puntos: {recompensa.puntos}</p>
        ) : (
          <p className="text-gray-500 font-medium text-base">Sin costo de puntos</p>
        )}
      </div>
    </div>
  );
}

export default RecompensaCard;