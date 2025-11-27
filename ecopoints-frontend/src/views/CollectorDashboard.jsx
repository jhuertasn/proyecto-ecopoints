// src/views/CollectorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarRecolector from '../components/NavbarRecolector';
import RequestCard from '../components/RequestCard';
import Footer from '../components/Footer'; // Agregamos Footer para consistencia
import { Truck, CheckCircle, Clock, Package } from 'lucide-react';

// Imagen decorativa
import camionImage from '../assets/images/camion.png';

function CollectorDashboard() {
  const [requests, setRequests] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [stats, setStats] = useState({ pendientes: 0, pesoTotal: 0 });

  // 1. CARGAR SOLICITUDES REALES
  useEffect(() => {
    const cargarSolicitudes = async () => {
      try {
        const response = await fetch('/api/entregas/pendientes');
        if (response.ok) {
          const data = await response.json();
          
          // Calculamos estadísticas rápidas con los datos reales
          const totalPeso = data.reduce((acc, item) => acc + item.peso, 0);
          setStats({
            pendientes: data.length,
            pesoTotal: totalPeso
          });

          // Mapeo de datos
          const entregasFormateadas = data.map(item => {
             // Lógica de extracción de punto verde de comentarios
             let ubicacion = 'Punto de Reciclaje';
             if (item.comentarios && item.comentarios.includes('(Punto:')) {
                const partes = item.comentarios.split('(Punto: ');
                if (partes.length > 1) ubicacion = partes[1].replace(')', '').trim();
             }
             return {
                id: item.id,
                user: item.usuarioId,
                location: ubicacion,
                material: item.material,
                weight: `${item.peso} kg`
             };
          });
          setRequests(entregasFormateadas);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarSolicitudes();
  }, []);

  // 2. VALIDAR SOLICITUD
  const handleAcceptRequest = async (id) => {
    if (!window.confirm("¿Confirmar recolección?")) return;
    try {
      const response = await fetch(`/api/entregas/${id}/validar`, { method: 'PUT' });
      if (response.ok) {
        alert("✅ Recolección confirmada.");
        // Actualizar estado localmente
        const nuevasRequests = requests.filter(req => req.id !== id);
        setRequests(nuevasRequests);
        // Recalcular stats simples visualmente
        setStats(prev => ({ ...prev, pendientes: prev.pendientes - 1 }));
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  // 3. RECHAZAR SOLICITUD (Solo visual por ahora)
  const handleRejectRequest = (id) => {
    if (window.confirm("¿Rechazar esta solicitud?")) {
      setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
    }
  };

 return (
    <div className="bg-gray-50 font-sans antialiased min-h-screen flex flex-col">
      <NavbarRecolector />

      <main className="max-w-7xl mx-auto py-8 px-6 flex-grow w-full">
        
        {/* Bienvenida y Resumen */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10 flex flex-col md:flex-row items-center justify-between border border-gray-100">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Hola, Recolector 👋</h1>
            <p className="text-gray-500">Tienes <strong className="text-emerald-600">{stats.pendientes} recolecciones</strong> pendientes para hoy.</p>
            
            <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg text-blue-700 font-medium">
                    <Package size={20} /> {stats.pesoTotal} kg por recoger
                </div>
                <Link to="/recolector/gestion" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition">
                    <Truck size={20} /> Ir a Gestión
                </Link>
            </div>
          </div>
          <div className="w-48">
            <img src={camionImage} alt="Camión" className="w-full object-contain" />
          </div>
        </div>

        {/* Lista Rápida (Preview) */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock size={20} className="text-amber-500"/> Próximas Recolecciones
        </h2>
        
        {cargando ? (
          <p className="text-center py-10 text-gray-400">Cargando ruta...</p>
        ) : requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mostramos solo las primeras 4 para no saturar el dashboard */}
            {requests.slice(0, 4).map(req => (
               <RequestCard 
                  key={req.id} 
                  request={req} 
                  onAccept={handleAcceptRequest} 
                  onReject={handleRejectRequest} 
               />
            ))}
          </div>
        ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <CheckCircle size={48} className="mx-auto text-emerald-200 mb-2"/>
                <p className="text-gray-400 font-medium">¡Todo listo! No hay pendientes.</p>
            </div>
        )}
        
        {requests.length > 4 && (
            <div className="text-center mt-8">
                <Link to="/recolector/gestion" className="text-emerald-600 font-bold hover:underline">Ver todas las solicitudes ({requests.length}) →</Link>
            </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default CollectorDashboard;