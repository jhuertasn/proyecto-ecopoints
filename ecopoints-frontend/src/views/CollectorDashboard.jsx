// src/views/CollectorDashboard.jsx
import React, { useState } from 'react';
// La importación de Link ya no es necesaria aquí, porque está dentro del NavbarRecolector
import NavbarRecolector from '../components/NavbarRecolector'; // 1. La importación está correcta
import RequestCard from '../components/RequestCard';

// ... (tus otras importaciones de imágenes)
import camionImage from '../assets/images/camion.png';
import recoxperiodoImage from '../assets/images/recoxperiodo.png';
import recoxmaterialImage from '../assets/images/recoxmaterial.png';

const initialRequests = [
  { id: 1, user: 'Jordan Huertas', location: 'Parque Integración', material: 'Plástico', weight: '10 kg' },
  { id: 2, user: 'Jhon Tacuri', location: 'Calle Las Cuevas', material: 'Vidrio', weight: '15 kg' },
  { id: 3, user: 'Sebastian Nassimo', location: 'Calle Hurtado', material: 'Papel', weight: '8 kg' },
  { id: 4, user: 'Jesús Gonzáles', location: 'Av. Lima 402', material: 'Varios', weight: '6 kg' },
];

function CollectorDashboard() {
  const [requests, setRequests] = useState(initialRequests);
  // La variable collectorName ya no es necesaria aquí, porque la maneja el NavbarRecolector
  
  const handleAcceptRequest = (id) => {
    setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
  };
  
  const handleRejectRequest = (id) => {
    setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
  };

  return (
    <div className="bg-gray-50 font-sans antialiased">
      
      {/* 2. USA EL COMPONENTE REUTILIZABLE AQUÍ */}
      <NavbarRecolector />

      {/* 3. TODO EL CÓDIGO DEL NAVBAR ANTIGUO FUE ELIMINADO DE AQUÍ */}

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* ... (El resto de tu código para el banner, las tarjetas y las estadísticas se mantiene exactamente igual) ... */}
        {/* Banner Principal */}
        <div className="bg-green-600 text-white rounded-lg shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-4xl font-extrabold mb-4">Recolector</h1>
            <p className="text-lg opacity-90">
              Mantén el control de tus rutas y recolecciones de manera eficiente.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src={camionImage} alt="Camión de Reciclaje" className="max-w-full h-auto" style={{ maxHeight: '200px' }} />
          </div>
        </div>

        {/* Solicitudes de Recolección */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Solicitudes de Recolección</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {requests.length > 0 ? (
            requests.map(request => (
              <RequestCard 
                key={request.id} 
                request={request}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-500">No hay solicitudes pendientes.</p>
          )}
        </div>

        {/* ... (y el resto de tu código) ... */}

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EcoPoints. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default CollectorDashboard;