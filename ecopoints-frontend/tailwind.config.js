// tailwind.config.js
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
  // AÑADE ESTA SECCIÓN PARA CONFIGURAR DAISYUI
  daisyui: {
    themes: ["light"], // Usa el tema "light". Esto resuelve los conflictos de color.
  },
}