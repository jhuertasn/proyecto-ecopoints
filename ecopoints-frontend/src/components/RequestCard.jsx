// src/components/RequestCard.jsx
import React from 'react';

// Este componente recibe los datos de la solicitud y las funciones para los botones como "props"
function RequestCard({ request, onAccept, onReject }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
        <div className="col-span-2">
          <label htmlFor={`user-${request.id}`} className="block text-gray-600 font-medium">Usuario</label>
          <input type="text" id={`user-${request.id}`} value={request.user} className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 cursor-not-allowed" readOnly />
        </div>
        <div className="col-span-2">
          <label htmlFor={`puntoVerde-${request.id}`} className="block text-gray-600 font-medium">Punto Verde</label>
          <input type="text" id={`puntoVerde-${request.id}`} value={request.location} className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 cursor-not-allowed" readOnly />
        </div>
        <div className="col-span-1">
          <label htmlFor={`material-${request.id}`} className="block text-gray-600 font-medium">Material</label>
          <input type="text" id={`material-${request.id}`} value={request.material} className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 cursor-not-allowed" readOnly />
        </div>
        <div className="col-span-1">
          <label htmlFor={`peso-${request.id}`} className="block text-gray-600 font-medium">Peso</label>
          <input type="text" id={`peso-${request.id}`} value={request.weight} className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 cursor-not-allowed" readOnly />
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <button onClick={() => onAccept(request.id)} className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">Aceptar</button>
        <button onClick={() => onReject(request.id)} className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition">Rechazar</button>
      </div>
    </div>
  );
}

export default RequestCard;