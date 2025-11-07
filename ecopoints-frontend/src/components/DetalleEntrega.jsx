// src/components/DetalleEntrega.jsx
import React from 'react';

function DetalleEntrega({ entrega }) {
  // Si no hay ninguna entrega seleccionada, muestra un mensaje
  if (!entrega) {
    return (
      <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-6 border border-gray-200 h-fit sticky top-8 flex items-center justify-center">
        <p className="text-gray-500">Selecciona una entrega de la tabla para ver los detalles.</p>
      </div>
    );
  }

  // Si hay una entrega, muestra sus detalles
  return (
    <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-6 border border-gray-200 h-fit sticky top-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Detalle de entrega</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Recolector</p>
          <p className="font-semibold text-gray-800">{entrega.recolector}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Usuario</p>
          <p className="font-semibold text-gray-800">{entrega.usuario}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Materiales</p>
          <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
            {/* Mapeamos los materiales de la entrega */}
            {entrega.materiales.map((item, index) => (
              <li key={index}>
                {item.nombre} <span className="font-semibold">{item.peso}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Evidencia</p>
          <label htmlFor="file-upload" className="flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-150 transition-colors duration-200 camera-icon text-gray-600 font-medium">
            Agregar foto
            <input id="file-upload" type="file" className="hidden" />
          </label>
        </div>
      </div>

      <div className="flex justify-between space-x-4 mt-8">
        <button className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors duration-200 shadow-sm">Aceptar</button>
        <button className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-200 shadow-sm">Rechazar</button>
      </div>
    </div>
  );
}

export default DetalleEntrega;