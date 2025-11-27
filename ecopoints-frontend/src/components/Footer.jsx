// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-12 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* COLUMNA 1: MARCA Y MISIÓN */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-white">
            <div className="bg-emerald-500 text-white px-2 py-1 rounded font-bold">E</div>
            <span className="font-bold text-xl tracking-tight">EcoPoints</span>
          </div>
          <p className="text-sm leading-relaxed mb-4 text-gray-400">
            Transformando la gestión de residuos en oportunidades para la comunidad. 
            Tecnología y sostenibilidad unidas por un Lima más limpio.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-400 transition"><Github size={20} /></a>
            <a href="#" className="hover:text-emerald-400 transition"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* COLUMNA 2: CONTACTO (Datos ficticios pero realistas) */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contacto</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-emerald-500 mt-0.5" />
              <span>Av. Principal 123, Centro de Lima<br/>Lima, Perú</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-emerald-500" />
              <span>(01) 555-0123</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-emerald-500" />
              <span>contacto@ecopoints.pe</span>
            </li>
          </ul>
        </div>

        {/* COLUMNA 3: EQUIPO DE DESARROLLO (¡Puntos extra!) */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Desarrollado por</h4>
          <ul className="space-y-2 text-sm">
            <li>👨‍💻 Jordan Huertas Negron</li>
            <li>👨‍💻 Jhon Tacuri Gutierrez</li>
            <li>👨‍💻 Jordy Farias Bravo</li>
            <li>👨‍💻 Jesus Gonzales vela</li>
            <li>👨‍💻 Armando Huaman Navarro</li>
            <li className="pt-2 text-xs text-gray-500">Grupo 7 - Arquitectura de Tecnologías de la información</li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} EcoPoints. Proyecto Académico.</p>
      </div>
    </footer>
  );
};

export default Footer;