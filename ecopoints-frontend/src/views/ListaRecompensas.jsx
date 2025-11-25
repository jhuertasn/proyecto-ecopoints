// src/views/ListaRecompensas.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecompensaCard from '../components/RecompensaCard';
import NavbarCiudadano from '../components/NavbarCiudadano';

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

// --- DICCIONARIO DE IMÁGENES ---
// Relaciona el nombre que viene de la Base de Datos con la imagen importada
const imageMap = {
  "Botella Ecológica": imgKit,
  "Bono Descuento S/10": imgCupon,
  "Descuento Eco-Tienda": imgDesc,
  "Cupón Online": imgCupon,
  "Crédito Eco-Transporte": imgBus,
  "Entrada Cultural": imgEntradas,
  "Comida Saludable": imgComida,
  "Semillas Urbanas": imgSemillas,
  "Kit Reutilizable": imgKit,
  "Accesorio Reciclado": imgMochila,
  "Planta un Árbol": imgArbol,
  "Medalla Digital": imgMedalla,
  "Ranking Mensual": imgCompetencia,
  "Compartir Logros": imgLogro,
  "Cashback Digital": imgCashback,
  "Tarjeta Prepago": imgTarjeta,
  "Donación a ONG": imgDonacion,
  "Talleres Gratis": imgTaller,
  "Eventos Verdes": imgEvento,
  "Top Reciclador": imgListado,
  // Imagen por defecto si el nombre no coincide con ninguno
  "default": imgMedalla 
};

function ListaRecompensas() {
  const [premios, setPremios] = useState([]);
  const [puntosUsuario, setPuntosUsuario] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // 1. Cargar Usuario, Puntos y Premios al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
        // A. Validar sesión
        const usuarioData = localStorage.getItem('usuario');
        if (!usuarioData) { navigate('/login'); return; }
        
        const user = JSON.parse(usuarioData);
        setUsuario(user);

        try {
            // B. Obtener Puntos del Usuario
            // Nota: Asegúrate de que el endpoint en tu backend sea /puntos/{id}
            const resPuntos = await fetch(`/api/recompensas/puntos/${user.usuario}`);
            if (resPuntos.ok) {
                const puntos = await resPuntos.json();
                setPuntosUsuario(puntos);
            }

            // C. Obtener Lista de Premios
            const resPremios = await fetch('/api/recompensas/premios');
            if (resPremios.ok) {
                const dataPremios = await resPremios.json();
                
                // Mapeamos los datos del backend al formato que espera tu tarjeta
                const premiosFormateados = dataPremios.map(p => ({
                    id: p.id,
                    titulo: p.nombre, // Backend: 'nombre' -> Frontend: 'titulo'
                    descripcion: `Stock disponible: ${p.stock}`,
                    puntos: p.costoPuntos,
                    // Asignamos imagen según el nombre, o una por defecto si no encuentra coincidencia
                    imagen: imageMap[p.nombre] || imageMap["default"] 
                }));
                
                setPremios(premiosFormateados);
            }
        } catch (error) {
            console.error("Error cargando datos:", error);
        } finally {
            setCargando(false);
        }
    };
    cargarDatos();
  }, [navigate]);

  // 2. Lógica de Canje
  const handleCanjearRecompensa = async (premio) => {
    // Validaciones locales
    if (puntosUsuario < premio.puntos) {
       alert(`❌ No tienes suficientes puntos. Necesitas ${premio.puntos} y tienes ${puntosUsuario}.`);
       return;
    }

    if (!window.confirm(`¿Estás seguro de canjear "${premio.titulo}" por ${premio.puntos} puntos?`)) {
        return;
    }

    try {
        const response = await fetch('/api/recompensas/canjear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuarioId: usuario.id,
                premioId: premio.id
            })
        });

        if (response.ok) {
            alert("🎉 ¡Canje exitoso! Disfruta tu recompensa.");
            // Recargamos la página para ver los puntos actualizados
            window.location.reload();
        } else {
            const errorMsg = await response.text();
            alert("❌ Error al canjear: " + errorMsg);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Error al conectar con el servidor de recompensas.");
    }
  };

  return (
    <div className="bg-gray-100 font-sans antialiased min-h-screen">
      {/* Navbar del Ciudadano */}
      <NavbarCiudadano />
      
      {/* Header con Saldo de Puntos */}
      <header className="bg-white shadow-sm p-4 border-b border-gray-200 sticky top-[72px] z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Catálogo de Recompensas</h1>
          <div className="bg-emerald-100 text-emerald-800 px-5 py-2 rounded-full font-bold shadow-sm border border-emerald-200">
             Tus Puntos: <span className="text-xl">{puntosUsuario}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Recompensas Disponibles</h2>

        {cargando ? (
            <div className="text-center py-12 text-gray-500">Cargando premios...</div>
        ) : (
            /* Mostramos todos los premios en una sola grilla */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {premios.length > 0 ? (
                  premios.map(recompensa => (
                    <RecompensaCard 
                      key={recompensa.id} 
                      recompensa={recompensa} 
                      onCanjear={handleCanjearRecompensa}
                    />
                  ))
              ) : (
                  <p className="col-span-full text-center text-gray-500">No hay premios disponibles en este momento.</p>
              )}
            </div>
        )}
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} EcoPoints — Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default ListaRecompensas;