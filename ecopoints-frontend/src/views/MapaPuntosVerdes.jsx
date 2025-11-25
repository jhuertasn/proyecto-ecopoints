// src/views/MapaPuntosVerdes.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';

// Íconos (se mantienen igual)
const recycleIcon = L.icon({
  iconUrl: '/images/recycle-bin-svgrepo-com.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const greenIcon = L.divIcon({
  html: '<div class="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>',
  className: '',
  iconSize: [14, 14]
});

function MapaPuntosVerdes() {
  const [modalData, setModalData] = useState(null);
  const [puntos, setPuntos] = useState([]); // Estado para los puntos reales
  const [cargando, setCargando] = useState(true);

  const abrirModal = (parque) => setModalData(parque);
  const cerrarModal = () => setModalData(null);

  // --- EFECTO PARA CARGAR DATOS DE LA BD ---
  useEffect(() => {
    fetch('/api/puntos-verdes') // Llama al proxy -> microservicio 3007
      .then((res) => res.json())
      .then((data) => {
        console.log("Puntos cargados:", data);
        setPuntos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando puntos:", err);
        setCargando(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 shadow-md bg-gradient-to-r from-emerald-300 to-white">
        <Link to="/ciudadano" className="text-emerald-800 text-2xl font-semibold hover:scale-110 transition-transform">←</Link>
        <h1 className="text-3xl font-extrabold text-emerald-900 tracking-wide drop-shadow-sm">🌿 EcoPoints</h1>
        <div className="w-6"></div>
      </header>

      <main className="relative h-[80vh]">
        {cargando ? (
          <div className="flex items-center justify-center h-full">Cargando mapa...</div>
        ) : (
          <MapContainer center={[-12.0464, -77.0428]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Renderizamos los puntos que vinieron de la BD */}
            {puntos.map(punto => (
              <React.Fragment key={punto.id}>
                {/* Marcador del parque */}
                <Marker
                  position={[punto.latitud, punto.longitud]}
                  icon={greenIcon}
                  eventHandlers={{ click: () => abrirModal(punto) }}
                />
                {/* Ícono de reciclaje (ligeramente desplazado para que se vea) */}
                <Marker position={[punto.latitud, punto.longitud]} icon={recycleIcon}>
                  <Popup>
                    <div className="text-center">
                      <b className="text-emerald-700 text-lg">{punto.nombre}</b>
                      <br />
                      <span className="font-semibold text-gray-600">{punto.tipo}</span>
                      <br />
                      <span className="text-xs text-gray-500">{punto.direccion}</span>
                    </div>
                  </Popup>
                </Marker>

              </React.Fragment>
            ))}
          </MapContainer>
        )}
      </main>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md text-center">
            <h2 className="text-2xl font-bold text-emerald-700 mb-3">{modalData.nombre}</h2>
            <p className="text-gray-700 mb-4">{modalData.descripcion}</p>
            <Link to="/registrar-entrega" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg">
              🚮 Entregar Reciclaje
            </Link>
            <div className="mt-4">
              <button onClick={cerrarModal} className="text-sm text-gray-500 hover:text-gray-700">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapaPuntosVerdes;