// src/views/ListaRecompensas.jsx
import React from 'react';
import RecompensaCard from '../components/RecompensaCard';

// PASO 1: Importa todas las imágenes que usarás
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


// PASO 2: Organiza todos los datos en una estructura de JavaScript.
// Esto simula lo que recibirías de tu microservicio.
const recompensasData = {
  "🛍️ Beneficios Prácticos y de Consumo": [
    { id: 1, titulo: "Descuento Eco-Tienda", descripcion: "10% de descuento en productos sostenibles.", puntos: 200, imagen: imgDesc },
    { id: 2, titulo: "Cupón Online", descripcion: "Cupones para Mercado Libre, Linio, Falabella.", puntos: 250, imagen: imgCupon },
    { id: 3, titulo: "Crédito Eco-Transporte", descripcion: "Descuento en bicicletas o transporte público.", puntos: 150, imagen: imgBus },
    { id: 4, titulo: "Entrada Cultural", descripcion: "Entradas a cines, museos o eventos culturales.", puntos: 300, imagen: imgEntradas },
    { id: 5, titulo: "Comida Saludable", descripcion: "Promociones en restaurantes locales o saludables.", puntos: 280, imagen: imgComida },
  ],
  "🌱 Recompensas Ecológicas": [
    { id: 6, titulo: "Semillas Urbanas", descripcion: "Canje por semillas o plantas para tu huerto.", puntos: 180, imagen: imgSemillas },
    { id: 7, titulo: "Kit Reutilizable", descripcion: "Bolsas de tela, botellas, termos, etc.", puntos: 350, imagen: imgKit },
    { id: 8, titulo: "Accesorio Reciclado", descripcion: "Libretas o estuches de material reciclado.", puntos: 220, imagen: imgMochila },
    { id: 9, titulo: "Planta un Árbol", descripcion: "Tus puntos equivalen a plantar un árbol a tu nombre.", puntos: 500, imagen: imgArbol },
  ],
  "🏆 Gamificación": [
    { id: 10, titulo: "Medalla Digital", descripcion: "Logros como 'Eco-Héroe' o 'Reciclador Nivel Oro'.", puntos: 0, imagen: imgMedalla },
    { id: 11, titulo: "Ranking Mensual", descripcion: "Competencia sana entre vecinos y distritos.", puntos: 0, imagen: imgCompetencia },
    { id: 12, titulo: "Compartir Logros", descripcion: "Comparte tus avances en redes sociales.", puntos: 0, imagen: imgLogro },
  ],
  "💸 Recompensas Financieras": [
    { id: 13, titulo: "Cashback Digital", descripcion: "Acumula un % de dinero por tus reciclajes.", puntos: 400, imagen: imgCashback },
    { id: 14, titulo: "Tarjeta Prepago", descripcion: "Tarjeta recargable con saldo por reciclar.", puntos: 550, imagen: imgTarjeta },
    { id: 15, titulo: "Donación a ONG", descripcion: "Dona tus puntos a ONGs ambientales.", puntos: 100, imagen: imgDonacion },
  ],
  "🎉 Recompensas Sociales y Comunitarias": [
    { id: 16, titulo: "Talleres Gratis", descripcion: "Participa en talleres de reciclaje y compostaje.", puntos: 200, imagen: imgTaller },
    { id: 17, titulo: "Eventos Verdes", descripcion: "Invitaciones a ferias y eventos ambientales exclusivos.", puntos: 180, imagen: imgEvento },
    { id: 18, titulo: "Top Reciclador", descripcion: "Listado de 'Top 10 Recicladores del Mes'.", puntos: 0, imagen: imgListado },
  ]
};

function ListaRecompensas() {
  
  // Función que se llamaría al hacer clic en una tarjeta
  const handleCanjearRecompensa = (recompensa) => {
    // Aquí podrías abrir un modal de confirmación
    alert(`Has seleccionado canjear: ${recompensa.titulo} por ${recompensa.puntos} puntos.`);
  };

  return (
    <div className="bg-gray-100 font-sans antialiased">
      <header className="bg-white shadow-sm p-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Lista de recompensas</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Recompensas por tu esfuerzo</h2>

        {/* PASO 3: Itera sobre el objeto de datos para renderizar cada sección */}
        {Object.entries(recompensasData).map(([categoria, recompensas]) => (
          <section key={categoria} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{categoria}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {/* Mapeamos las recompensas de la categoría actual para crear las tarjetas */}
              {recompensas.map(recompensa => (
                <RecompensaCard 
                  key={recompensa.id} 
                  recompensa={recompensa} 
                  onCanjear={handleCanjearRecompensa}
                />
              ))}
            </div>
          </section>
        ))}
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