// src/views/CollectorDashboard.jsx
import React, { useState, useEffect } from 'react';
import NavbarRecolector from '../components/NavbarRecolector';
import RequestCard from '../components/RequestCard';

// Importamos las imágenes
import camionImage from '../assets/images/camion.png';
import recoxperiodoImage from '../assets/images/recoxperiodo.png';
import recoxmaterialImage from '../assets/images/recoxmaterial.png';

function CollectorDashboard() {
  const [requests, setRequests] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 1. CARGAR SOLICITUDES REALES (GET)
  useEffect(() => {
    const cargarSolicitudes = async () => {
      try {
        const response = await fetch('/api/entregas/pendientes'); // Usamos el proxy
        if (response.ok) {
          const data = await response.json();

          // --- NUEVO MAPEO ---
          const entregasFormateadas = data.map(item => {
            // 1. Intentar extraer el Punto Verde de los comentarios
            let ubicacionExtraida = 'Punto de Reciclaje';
            if (item.comentarios && item.comentarios.includes('(Punto:')) {
              // El formato que guardamos fue: "blabla... (Punto: Parque Kennedy)"
              // Usamos split para separar por "(Punto: " y tomamos la segunda parte
              const partes = item.comentarios.split('(Punto: ');
              if (partes.length > 1) {
                // Quitamos el paréntesis de cierre ")"
                ubicacionExtraida = partes[1].replace(')', '').trim();
              }
            }

            return {
              id: item.id,
              // 2. Usar el ID del usuario como nombre (ya que guardamos el nombre en el ID)
              user: item.usuarioId,
              location: ubicacionExtraida,
              material: item.material,
              weight: `${item.peso} kg`
            };
          });

          setRequests(entregasFormateadas);
        }
      } catch (error) {
        console.error("Error al cargar solicitudes:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarSolicitudes();
  }, []);

  // 2. VALIDAR SOLICITUD (PUT) - Conecta con RabbitMQ
  const handleAcceptRequest = async (id) => {
    const confirmar = window.confirm("¿Aceptar esta recolección y asignar puntos?");
    if (!confirmar) return;

    try {
      const response = await fetch(`/api/entregas/${id}/validar`, {
        method: 'PUT'
      });

      if (response.ok) {
        alert("✅ Solicitud aceptada. Evento enviado a RabbitMQ.");
        // Eliminamos la solicitud de la lista localmente
        setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
      } else {
        alert("❌ Error al validar la solicitud.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor.");
    }
  };

  // 3. RECHAZAR SOLICITUD (Solo visual por ahora)
  const handleRejectRequest = (id) => {
    if (window.confirm("¿Rechazar esta solicitud?")) {
      setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
    }
  };

  return (
    <div className="bg-gray-50 font-sans antialiased">
      {/* Navbar Reutilizable */}
      <NavbarRecolector />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Solicitudes de Recolección Pendientes</h2>

        {cargando ? (
          <p className="text-center text-gray-500 py-10">Cargando solicitudes...</p>
        ) : (
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
              <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-500 text-lg">🎉 No hay solicitudes pendientes por ahora.</p>
              </div>
            )}
          </div>
        )}

        {/* Estadísticas (Estáticas por ahora o puedes conectarlas si tienes el endpoint) */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Estadísticas de Recolección</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalles de recolección por Período</h3>
            <div className="relative w-full h-72 bg-gray-50 flex items-center justify-center rounded-md overflow-hidden">
              <img src={recoxperiodoImage} alt="Gráfico por Período" className="object-contain w-full h-full p-2" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalles de recolección por Material</h3>
            <div className="relative w-full h-full bg-gray-50 flex items-center justify-center rounded-md overflow-hidden">
              <img src={recoxmaterialImage} alt="Gráfico por Material" className="object-contain w-full h-full p-2" />
            </div>
          </div>
        </div>
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