// src/views/AcumulacionPuntos.jsx
import React, { useState } from 'react';

// Datos de ejemplo que simulan una respuesta de tu microservicio/API
const fakeUserData = {
  usuario: 'Jhon Tacuri',
  puntoVerde: 'Calle Las Curvas',
  material: 'Vidrio',
  peso: '15 kg',
  puntos: 1000,
};

function AcumulacionPuntos() {
  // useState para manejar el valor del input del DNI
  const [dni, setDni] = useState('');
  
  // useState para guardar los datos del usuario una vez "encontrado"
  const [userData, setUserData] = useState(null);

  // Función que se ejecuta al hacer clic en el botón "Aceptar"
  const handleBuscarClick = () => {
    // En una app real, aquí llamarías a tu API con el DNI.
    // Por ahora, simulamos que lo encontramos y mostramos los datos.
    if (dni.trim() !== '') {
      setUserData(fakeUserData);
    } else {
      // Opcional: podrías mostrar un error si el DNI está vacío
      alert('Por favor, ingresa un DNI.');
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        
        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Puntos Acumulados</h1>
        
        {/* Campo DNI */}
        <div className="flex items-center space-x-3 mb-6">
          <label htmlFor="dni" className="font-semibold text-gray-700">Ingresa tu DNI :</label>
          <input 
            id="dni" 
            type="text" 
            placeholder="Escribe aquí" 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none w-48"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow"
            onClick={handleBuscarClick}
          >
            Aceptar
          </button>
        </div>

        {/* Tarjeta de información (se muestra solo si userData tiene datos) */}
        {userData && (
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div className="font-semibold">Usuario</div>
              <div>
                <input type="text" value={userData.usuario} readOnly className="w-full border border-gray-300 rounded-md px-3 py-1 bg-white text-center shadow-sm" />
              </div>

              <div className="font-semibold">Punto Verde</div>
              <div>
                <input type="text" value={userData.puntoVerde} readOnly className="w-full border border-gray-300 rounded-md px-3 py-1 bg-white text-center shadow-sm text-blue-600 font-medium" />
              </div>

              <div className="font-semibold">Material</div>
              <div>
                <input type="text" value={userData.material} readOnly className="w-full border border-gray-300 rounded-md px-3 py-1 bg-white text-center shadow-sm" />
              </div>

              <div className="font-semibold">Peso</div>
              <div>
                <input type="text" value={userData.peso} readOnly className="w-full border border-gray-300 rounded-md px-3 py-1 bg-white text-center shadow-sm" />
              </div>
            </div>

            {/* Puntos acumulados */}
            <div className="mt-8 text-center">
              <p className="text-gray-700 font-medium text-lg">Puntos hasta el momento:</p>
              <p className="text-5xl font-extrabold text-green-600 mt-2">{userData.puntos} pts</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AcumulacionPuntos;