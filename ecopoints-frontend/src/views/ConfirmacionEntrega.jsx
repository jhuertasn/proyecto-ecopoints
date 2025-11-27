// src/views/ConfirmacionEntrega.jsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importar useLocation
import confetti from 'canvas-confetti';
import { Clock } from 'lucide-react';

const ConfirmacionEntrega = () => {
  const location = useLocation();
  
  // Recuperamos el peso enviado desde el registro (o 0 si no hay datos)
  const peso = location.state?.peso || 0;
  
  // Calculamos la ESTIMACIÓN (10 puntos por kilo, igual que en el backend)
  const puntosEstimados = Math.round(peso * 10);

  useEffect(() => {
    // Lanzamos confeti porque registrar ya es un logro
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  }, []);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center p-8">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg border-t-8 border-green-500">
        
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">¡Registro Exitoso! 🎉</h1>
        <p className="text-gray-500 mb-8">Gracias por ayudar al planeta.</p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex justify-center mb-2 text-yellow-600">
                <Clock size={40} />
            </div>
            <h3 className="text-xl font-bold text-yellow-700 mb-1">Validación Pendiente</h3>
            <p className="text-sm text-yellow-800 opacity-80 mb-4">
                Un recolector verificará tu entrega pronto.
            </p>
            
            <div className="text-3xl font-black text-green-600">
                +{puntosEstimados} pts
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-bold mt-1">
                Recompensa Estimada
            </p>
        </div>

        <div className="space-y-3">
            <Link 
            to="/historial" 
            className="btn btn-outline btn-success w-full"
            >
            Ver Estado en Historial
            </Link>

            <Link 
            to="/ciudadano" 
            className="btn bg-green-600 hover:bg-green-700 text-white w-full border-none"
            >
            Volver al Inicio
            </Link>
        </div>

      </div>
    </div>
  );
};

export default ConfirmacionEntrega;