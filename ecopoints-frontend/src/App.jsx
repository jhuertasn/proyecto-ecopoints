// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portal from './views/Portal';

// --- (Importaciones originales que funcionaban) ---
import CitizenDashboard from './views/CitizenDashboard';
import CollectorDashboard from './views/CollectorDashboard';
import GestionEntregas from './views/GestionEntregas';
import ListaRecompensas from './views/ListaRecompensas';
import RegistrarEntrega from './views/RegistrarEntrega';
import MapaPuntosVerdes from './views/MapaPuntosVerdes';
import ReporteEntregas from './components/ReporteEntregas';
import EstadisticasPage from './components/EstadisticasPage';
import DashboardMunicipalidad from './components/DashboardMunicipalidad';
import LoginPage from './views/LoginPage';
import RegistroPage from './views/RegistroPage';
import HistorialEntregas from './views/HistorialEntregas';
import AcumulacionPuntos from './views/AcumulacionPuntos';


import ConfirmacionEntrega from './views/ConfirmacionEntrega';
import GestionPuntosVerdes from './views/GestionPuntosVerdes';
import NotificacionesCampanas from './views/NotificacionesCampanas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portal />} />
        
        {/* --- (Rutas originales que funcionaban) --- */}
        <Route path="/ciudadano" element={<CitizenDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/historial" element={<HistorialEntregas />} />
        <Route path="/puntos" element={<AcumulacionPuntos />} />
        <Route path="/recolector" element={<CollectorDashboard />} />
        <Route path="/recolector/gestion" element={<GestionEntregas />} />
        <Route path="/recompensas" element={<ListaRecompensas />} />
        <Route path="/registrar-entrega" element={<RegistrarEntrega />} />
        <Route path="/mapa" element={<MapaPuntosVerdes />} />
        <Route path="/reporte" element={<ReporteEntregas />} />
        <Route path="/estadisticas" element={<EstadisticasPage />} />
        <Route path="/dashboard" element={<DashboardMunicipalidad />} />

        
        <Route path="/confirmacion-entrega" element={<ConfirmacionEntrega />} /> 
        <Route path="/gestion-puntos-verdes" element={<GestionPuntosVerdes />} />
        <Route path="/notificaciones" element={<NotificacionesCampanas />} /> 
      </Routes>
    </Router>
  );
}

export default App;