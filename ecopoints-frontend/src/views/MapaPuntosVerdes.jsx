// src/views/MapaPuntosVerdes.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // 1. Importar useMap
import { Link, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import NavbarCiudadano from '../components/NavbarCiudadano';

// --- CONFIGURACIÓN DE ICONOS ---
const recycleIcon = L.icon({
  iconUrl: '/images/recycle-bin-svgrepo-com.svg', // Asegúrate que esta imagen exista en /public/images/
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const greenIcon = L.divIcon({
  html: '<div class="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>',
  className: '',
  iconSize: [14, 14]
});

// --- 2. COMPONENTE PARA ARREGLAR EL MAPA (MapResizer) ---
// Esto soluciona que el mapa se vea gris o descuadrado al cargar
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
}

function MapaPuntosVerdes() {
  const [modalData, setModalData] = useState(null);
  const [puntos, setPuntos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate(); // Para el botón del popup

  const abrirModal = (parque) => setModalData(parque);
  const cerrarModal = () => setModalData(null);

  // Cargar datos reales
  useEffect(() => {
    fetch('/api/puntos-verdes')
      .then((res) => res.json())
      .then((data) => {
        console.log("Puntos cargados:", data);
        setPuntos(data);
      })
      .catch((err) => console.error("Error cargando puntos:", err))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="h-screen flex flex-col font-sans bg-gray-50">
      <NavbarCiudadano />

      {/* Contenedor del Mapa */}
      <main className="flex-grow relative z-0">
        {cargando ? (
          <div className="flex h-full items-center justify-center text-emerald-600 font-bold">
            Cargando mapa de puntos...
          </div>
        ) : (
          <MapContainer
            center={[-12.0464, -77.0428]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <MapResizer /> {/* <--- IMPORTANTE: ESTO ARREGLA EL VISUAL */}

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {puntos.map(punto => {
              // Aseguramos que sean números
              const lat = parseFloat(punto.latitud);
              const lng = parseFloat(punto.longitud);

              return (
                <React.Fragment key={punto.id}>
                  {/* 1. Marcador del punto (Círculo Verde) */}
                  <Marker
                    position={[lat, lng]}
                    icon={greenIcon}
                    eventHandlers={{ click: () => abrirModal(punto) }}
                  />

                  {/* 2. Ícono de Reciclaje (DESPLAZADO LIGERAMENTE) */}
                  {/* Sumamos 0.0003 para que se vea arribita del punto verde, como antes */}
                  <Marker position={[lat + 0.0003, lng + 0.0003]} icon={recycleIcon}>
                    <Popup className="custom-popup">
                      <div className="text-center p-1">
                        <b className="text-emerald-700 text-base">{punto.nombre}</b>
                        <br />
                        <span className="font-semibold text-xs text-gray-600 uppercase">{punto.tipo}</span>
                        <br />
                        <span className="text-xs text-gray-500 italic">{punto.direccion}</span>

                        <div className="mt-2">
                          <button
                            onClick={() => navigate('/registrar-entrega', { state: { puntoPreseleccionado: punto.nombre } })} // <--- ESTO ES LO NUEVO
                            className="btn btn-sm btn-primary bg-emerald-600 border-none text-white w-full"
                          >
                            ♻️ Entregar Aquí
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}
          </MapContainer>
        )}

        {/* Tarjeta Flotante Informativa */}
        <div className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-xl z-[500] border-l-4 border-emerald-500 bg-opacity-90 backdrop-blur-sm w-64">
          <h2 className="font-bold text-gray-800 mb-1 text-sm">🗺️ Mapa de Puntos Verdes</h2>
          <p className="text-xs text-gray-500">
            Haz clic en los iconos para ver detalles o registrar una entrega.
          </p>
        </div>

      </main>

{/* Modal */}
{modalData && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center transform transition-all scale-100">
    <h2 className="text-xl font-bold text-emerald-700 mb-1">{modalData.nombre}</h2>
    <span className="badge badge-success text-white mb-4">{modalData.tipo}</span>
    
    <p className="text-gray-600 mb-6 text-sm bg-gray-50 p-3 rounded-lg">
        📍 {modalData.direccion}
    </p>

    <div className="flex flex-col gap-3">
        {/* CAMBIO AQUÍ: Usamos navigate en lugar de Link para pasar el state */}
        <button 
            onClick={() => navigate('/registrar-entrega', { state: { puntoPreseleccionado: modalData.nombre } })}
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full border-none"
        >
        🚮 Registrar Entrega Aquí
        </button>
        
        <button onClick={cerrarModal} className="btn btn-ghost btn-sm text-gray-500">Cerrar</button>
    </div>
    </div>
</div>
      )}
    </div>
  );
}

export default MapaPuntosVerdes;