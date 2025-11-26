// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-500 text-white px-2 py-1 rounded font-bold">E</div>
            <span className="font-semibold">EcoPoints</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Plataforma integral para la gestión sostenible de residuos y recompensas ciudadanas.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white">Inicio</Link></li>
            <li><a href="#" className="hover:text-white">Sobre Nosotros</a></li>
            <li><a href="#" className="hover:text-white">Servicios</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Reciclaje</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/mapa" className="hover:text-white">Puntos Verdes</Link></li>
            <li><a href="#" className="hover:text-white">Tipos de Material</a></li>
            <li><Link to="/recompensas" className="hover:text-white">Recompensas</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 Av. Principal 123, Lima</li>
            <li>📞 (01) 555-0123</li>
            <li>✉️ contacto@ecopoints.pe</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 flex justify-between text-sm text-gray-400">
        <p>© 2025 EcoPoints. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;