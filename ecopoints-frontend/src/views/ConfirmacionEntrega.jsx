// src/views/ConfirmacionEntrega.jsx
import React, { useEffect } from 'react'; // 1. Añade useEffect
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti'; // 2. Importa confetti

const ConfirmacionEntrega = () => {
  // 3. Usa useEffect para disparar el confeti al cargar la página
  useEffect(() => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  }, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center p-8">
      <div className="bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-5xl font-extrabold text-green-600 mb-4">¡Gracias! 🎉</h1>
        <p className="text-lg text-gray-700 mb-8">
          Tu entrega de reciclaje ha sido registrada con éxito.
          <br />
          Has ganado **50 puntos** por esta acción.
        </p>
        <Link 
          to="/ciudadano" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105"
        >
          Volver a mi Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ConfirmacionEntrega;