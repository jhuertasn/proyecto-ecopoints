// src/views/MapaPuntosVerdes.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet'; // Importamos L de leaflet para los íconos

// --- Datos y configuración del mapa ---
const parques = [
  { id: 1, nombre: "Parque Kennedy", desc: "Céntrico parque en Miraflores con ferias y arte callejero.", lat: -12.1215, lng: -77.0290 },
  { id: 2, nombre: "Parque El Olivar", desc: "Histórico parque con olivos centenarios en San Isidro.", lat: -12.0996, lng: -77.0368 },
  { id: 3, nombre: "Campo de Marte", desc: "Amplio parque con áreas deportivas en Jesús María.", lat: -12.0683, lng: -77.0431 },
  { id: 4, nombre: "Parque de la Reserva", desc: "Famoso por el Circuito Mágico del Agua.", lat: -12.0681, lng: -77.0339 },
  { id: 5, nombre: "Parque Ramón Castilla", desc: "Bonito parque con laguna en Lince.", lat: -12.0864, lng: -77.0342 },
  { id: 6, nombre: "Parque Reducto N°2", desc: "Parque histórico en Miraflores con museo y áreas verdes.", lat: -12.1253, lng: -77.0312 },
  { id: 7, nombre: "Parque María Reiche", desc: "Costero parque en Miraflores con vistas al mar.", lat: -12.1289, lng: -77.0501 },
  { id: 8, nombre: "Parque de las Leyendas", desc: "Zoológico y área verde en San Miguel.", lat: -12.0875, lng: -77.0943 },
  { id: 9, nombre: "Parque Grau", desc: "Área verde en Magdalena del Mar, cerca del malecón.", lat: -12.0979, lng: -77.0782 },
  { id: 10, nombre: "Parque Sinchi Roca", desc: "Gran parque con laguna artificial en Comas.", lat: -11.9483, lng: -77.0619 }
];

// Íconos personalizados (igual que en tu script)
const recycleIcon = L.icon({
  iconUrl: '/images/recycle-bin-svgrepo-com.svg', // Nota: La imagen debe estar en la carpeta 'public'
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const greenIcon = L.divIcon({
  html: '<div class="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>',
  className: '',
  iconSize: [14, 14]
});

// --- Componente principal de la vista ---
function MapaPuntosVerdes() {
  const [modalData, setModalData] = useState(null); // Estado para controlar el modal

  const abrirModal = (parque) => setModalData(parque);
  const cerrarModal = () => setModalData(null);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 shadow-md bg-gradient-to-r from-emerald-300 to-white">
        <Link to="/" className="text-emerald-800 text-2xl font-semibold hover:scale-110 transition-transform">←</Link>
        <h1 className="text-3xl font-extrabold text-emerald-900 tracking-wide drop-shadow-sm">🌿 EcoPoints</h1>
        <div className="w-6"></div>
      </header>
      
      <main className="relative h-[80vh]">
        <MapContainer center={[-12.0464, -77.0428]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {parques.map(parque => (
            <React.Fragment key={parque.id}>
              {/* Marcador del parque que abre el modal */}
              <Marker 
                position={[parque.lat, parque.lng]} 
                icon={greenIcon}
                eventHandlers={{ click: () => abrirModal(parque) }}
              />
              {/* Marcador del tacho de reciclaje con un popup */}
              <Marker position={[parque.lat + 0.0003, parque.lng + 0.0003]} icon={recycleIcon}>
                <Popup>
                  <b>{parque.nombre}</b><br />Tacho de reciclaje disponible ♻️
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>
      </main>

      {/* Modal (renderizado condicional) */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md text-center">
            <h2 className="text-2xl font-bold text-emerald-700 mb-3">{modalData.nombre}</h2>
            <p className="text-gray-700 mb-4">{modalData.desc}</p>
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