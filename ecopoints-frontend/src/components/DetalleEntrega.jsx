// src/components/DetalleEntrega.jsx
import React from 'react';

// Recibimos 'onValidar' como prop desde el padre (GestionEntregas)
function DetalleEntrega({ entrega, onValidar }) {
  
  // Si no hay ninguna entrega seleccionada, muestra un mensaje
  if (!entrega) {
    return (
      <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-6 border border-gray-200 h-fit sticky top-24 flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500">Selecciona una entrega de la tabla para ver los detalles.</p>
      </div>
    );
  }

  // Si hay una entrega, muestra sus detalles
  return (
    <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-6 border border-gray-200 h-fit sticky top-24">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Detalle de entrega</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">ID de Entrega</p>
          <p className="font-mono text-xs text-gray-800 bg-gray-100 p-1 rounded">{entrega.id}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-sm text-gray-500">Usuario ID</p>
                <p className="font-semibold text-gray-800">{entrega.usuarioId}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">Estado</p>
                <span className="badge badge-warning text-xs">{entrega.estado}</span>
            </div>
        </div>

        <div className="divider"></div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Materiales Recibidos</p>
          <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-100">
             <span className="font-bold text-green-800">{entrega.material}</span>
             <span className="badge badge-lg bg-white border-green-200">{entrega.peso} kg</span>
          </div>
        </div>
        
        {/* Sección de Evidencia / Foto */}
        <div className="pt-4">
          <p className="text-sm text-gray-500 mb-2">Evidencia</p>
          {entrega.fotoUrl ? (
             <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-dashed border-gray-300">
                {/* Si es una URL real, usamos img. Si es dummy, mostramos un icono */}
                {entrega.fotoUrl.startsWith('http') && !entrega.fotoUrl.includes('dummy') ? (
                    <img src={entrega.fotoUrl} alt="Evidencia" className="object-cover w-full h-full" />
                ) : (
                    <span className="text-gray-400 text-sm">📄 {entrega.fotoUrl}</span>
                )}
             </div>
          ) : (
             <p className="text-xs text-gray-400 italic">Sin foto adjunta</p>
          )}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-between space-x-4 mt-8">
        <button 
            onClick={onValidar} // <--- CONECTADO
            className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors shadow-sm"
        >
            Validar
        </button>
        
        <button className="flex-1 px-4 py-2 bg-red-100 text-red-600 font-semibold rounded-md hover:bg-red-200 transition-colors shadow-sm">
            Rechazar
        </button>
      </div>
    </div>
  );
}

export default DetalleEntrega;