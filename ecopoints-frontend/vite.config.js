import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/usuarios': {
        target: 'http://localhost:9090', // Microservicio Usuarios
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/usuarios/, '/usuario')
      },
      '/api/puntos-verdes': {
        target: 'http://localhost:3007', // Microservicio Puntos Verdes
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/puntos-verdes/, '/puntos-verdes')
      },
      '/api/entregas': {
        target: 'http://localhost:3009', // Microservicio Entregas
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/entregas/, '/entregas')
      },
      '/api/recompensas': {
        target: 'http://localhost:3004', // Microservicio Recompensas
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/recompensas/, '/api/recompensas')
      },
      '/api/estadisticas': {
        target: 'http://localhost:3005', // Microservicio Estadísticas
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})