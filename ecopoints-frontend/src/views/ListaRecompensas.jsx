// src/views/ListaRecompensas.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecompensaCard from '../components/RecompensaCard';
import NavbarCiudadano from '../components/NavbarCiudadano';
import Footer from '../components/Footer';

// --- IMPORTACIONES DE IMÁGENES ---
import imgDesc from '../assets/images/desc.png';
import imgCupon from '../assets/images/cupon.png';
import imgBus from '../assets/images/bus.png';
import imgEntradas from '../assets/images/entradas.png';
import imgComida from '../assets/images/comida.png';
import imgSemillas from '../assets/images/semillas.png';
import imgKit from '../assets/images/kit.png';
import imgMochila from '../assets/images/mochila.png';
import imgArbol from '../assets/images/arbol.png';
import imgMedalla from '../assets/images/medalla.png';
import imgCompetencia from '../assets/images/competencia.png';
import imgLogro from '../assets/images/logro.png';
import imgCashback from '../assets/images/cashback.png';
import imgTarjeta from '../assets/images/tarjeta.png';
import imgDonacion from '../assets/images/donacion.png';
import imgTaller from '../assets/images/taller.png';
import imgEvento from '../assets/images/evento.png';
import imgListado from '../assets/images/listado.png';

// Mapeo de imágenes
const imageMap = {
  "Descuento Eco-Tienda": imgDesc, "Cupón Online": imgCupon, "Crédito Eco-Transporte": imgBus,
  "Entrada Cultural": imgEntradas, "Comida Saludable": imgComida, "Semillas Urbanas": imgSemillas,
  "Kit Reutilizable": imgKit, "Accesorio Reciclado": imgMochila, "Planta un Árbol": imgArbol,
  "Medalla Digital": imgMedalla, "Ranking Mensual": imgCompetencia, "Compartir Logros": imgLogro,
  "Cashback Digital": imgCashback, "Tarjeta Prepago": imgTarjeta, "Donación a ONG": imgDonacion,
  "Talleres Gratis": imgTaller, "Eventos Verdes": imgEvento, "Top Reciclador": imgListado,
  "default": imgMedalla 
};

function ListaRecompensas() {
  const [premios, setPremios] = useState([]);
  const [puntosUsuario, setPuntosUsuario] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
        const usuarioData = localStorage.getItem('usuario');
        if (!usuarioData) { navigate('/login'); return; }
        const user = JSON.parse(usuarioData);
        setUsuario(user);

        try {
            // 1. Puntos (Usando el nombre de usuario)
            const resPuntos = await fetch(`/api/recompensas/puntos/${user.usuario}`);
            if (resPuntos.ok) setPuntosUsuario(await resPuntos.json());

            // 2. Premios
            const resPremios = await fetch('/api/recompensas/premios');
            if (resPremios.ok) {
                const data = await resPremios.json();
                // Mapeamos datos + imagen
                const lista = data.map(p => ({
                    id: p.id,
                    titulo: p.nombre,
                    descripcion: `Stock: ${p.stock} und.`,
                    puntos: p.costoPuntos,
                    imagen: imageMap[p.nombre] || imageMap["default"]
                }));
                setPremios(lista);
            }
        } catch (err) { console.error(err); } 
        finally { setCargando(false); }
    };
    cargarDatos();
  }, [navigate]);

  const handleCanjear = async (premio) => {
    if (puntosUsuario < premio.puntos) {
       alert(`❌ Te faltan ${premio.puntos - puntosUsuario} puntos.`);
       return;
    }
    if (!confirm(`¿Canjear "${premio.titulo}" por ${premio.puntos} puntos?`)) return;

    try {
        const response = await fetch('/api/recompensas/canjear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId: usuario.usuario, premioId: premio.id })
        });

        if (response.ok) {
            alert("🎉 ¡Canje exitoso!");
            window.location.reload();
        } else {
            alert("❌ Error al canjear.");
        }
    } catch (error) { console.error(error); }
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col">
      <NavbarCiudadano />
      
      {/* Header Puntos */}
      <div className="bg-white shadow-sm p-4 border-b border-gray-200 sticky top-[72px] z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Catálogo</h1>
          <div className="bg-emerald-100 text-emerald-800 px-5 py-2 rounded-full font-bold shadow-sm border border-emerald-200">
             Tus Puntos: <span className="text-xl">{puntosUsuario}</span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto py-8 px-4 flex-grow w-full">
        {cargando ? (
            <div className="text-center py-12 text-gray-500">Cargando catálogo...</div>
        ) : (
            <>
                {/* SECCIÓN: RECOMENDADOS (Baratos) */}
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">🌱 Para empezar (Menos de 200 pts)</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                    {premios.filter(p => p.puntos > 0 && p.puntos <= 200).map(p => (
                        <RecompensaCard key={p.id} recompensa={p} onCanjear={handleCanjear} />
                    ))}
                </div>

                {/* SECCIÓN: NIVEL EXPERTO */}
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">🏆 Nivel Experto (+200 pts)</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                    {premios.filter(p => p.puntos > 200).map(p => (
                        <RecompensaCard key={p.id} recompensa={p} onCanjear={handleCanjear} />
                    ))}
                </div>

                {/* SECCIÓN: LOGROS (Gratis) */}
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">🏅 Logros y Comunidad</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {premios.filter(p => p.puntos === 0).map(p => (
                        <RecompensaCard key={p.id} recompensa={p} onCanjear={handleCanjear} />
                    ))}
                </div>
            </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ListaRecompensas;