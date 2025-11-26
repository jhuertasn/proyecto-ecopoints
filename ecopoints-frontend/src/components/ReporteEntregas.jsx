// src/views/ReporteEntregas.jsx
import React, { useState, useEffect } from 'react';
import { FileText, Download, FileSpreadsheet, Filter, Search } from 'lucide-react';
import NavbarMunicipalidad from '../components/NavbarMunicipalidad';
import Footer from '../components/Footer'; // Asegúrate de tener este componente

const ReporteEntregas = () => {
  const [entregas, setEntregas] = useState([]);
  const [puntosVerdes, setPuntosVerdes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados para filtros
  const [filtroMaterial, setFiltroMaterial] = useState('');
  const [filtroPunto, setFiltroPunto] = useState('');
  const [busquedaUsuario, setBusquedaUsuario] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  // 1. Cargar Datos Reales
  useEffect(() => {
    const cargarDatos = async () => {
        try {
            // Cargar Entregas (Endpoint que lista todo)
            const resEnt = await fetch('/api/entregas/todas'); 
            if (resEnt.ok) setEntregas(await resEnt.json());

            // Cargar Puntos Verdes (Para el filtro)
            const resPuntos = await fetch('/api/puntos-verdes');
            if (resPuntos.ok) setPuntosVerdes(await resPuntos.json());

        } catch (error) {
            console.error("Error cargando datos:", error);
        } finally {
            setCargando(false);
        }
    };
    cargarDatos();
  }, []);

  // 2. Lógica de Filtrado
  const datosFiltrados = entregas.filter(item => {
    if (busquedaUsuario && !item.usuarioId.toLowerCase().includes(busquedaUsuario.toLowerCase())) return false;
    if (filtroMaterial && item.material !== filtroMaterial) return false;
    
    // Filtro por Punto Verde (Buscamos en comentarios o distrito si existe)
    const textoCompleto = JSON.stringify(item);
    if (filtroPunto && !textoCompleto.includes(filtroPunto)) return false;

    // Filtro de Fechas (Opcional, si tu backend no manda fechas, esto no hará nada malo)
    // if (fechaInicio && item.fecha && item.fecha < fechaInicio) return false;

    return true;
  });

  // 3. Exportar a Excel (CSV)
  const exportarExcel = () => {
    if (datosFiltrados.length === 0) return alert("No hay datos para exportar.");
    let csv = "ID,Ciudadano,Material,Peso,Estado\n";
    datosFiltrados.forEach(row => {
        csv += `${row.id},${row.usuarioId},${row.material},${row.peso},${row.estado}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Reporte_EcoPoints.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      
      {/* Ocultar Navbar al imprimir */}
      <div className="print:hidden">
        <NavbarMunicipalidad />
      </div>

      {/* Header */}
      <div className="bg-blue-900 px-6 py-10 text-white shadow-md print:hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reporte de Operaciones</h1>
            <p className="text-blue-200">Genera y descarga listados detallados de las entregas.</p>
          </div>
          <FileText size={64} className="text-blue-400 opacity-50" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow">
        
        {/* Filtros (Ocultos al imprimir) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 print:hidden">
            <div className="flex items-center gap-2 mb-4 text-gray-700 font-bold border-b pb-2">
                <Filter size={20} /> Filtros de Búsqueda
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Buscar Ciudadano */}
                <div className="form-control">
                    <label className="label-text text-xs font-bold text-gray-500 uppercase mb-1">BUSCAR CIUDADANO</label>
                    <div className="relative">
                        <input type="text" placeholder="Nombre o ID..." className="input input-bordered w-full pl-10" 
                            value={busquedaUsuario} onChange={(e) => setBusquedaUsuario(e.target.value)} />
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Material */}
                <div className="form-control">
                    <label className="label-text text-xs font-bold text-gray-500 uppercase mb-1">TIPO DE MATERIAL</label>
                    <select className="select select-bordered w-full" value={filtroMaterial} onChange={(e) => setFiltroMaterial(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Plástico">Plástico</option>
                        <option value="Vidrio">Vidrio</option>
                        <option value="Papel">Papel</option>
                        <option value="Cartón">Cartón</option>
                        <option value="Metal">Metal</option>
                    </select>
                </div>

                {/* Punto de Acopio */}
                <div className="form-control">
                    <label className="label-text text-xs font-bold text-gray-500 uppercase mb-1">PUNTO DE ACOPIO</label>
                    <select className="select select-bordered w-full" value={filtroPunto} onChange={(e) => setFiltroPunto(e.target.value)}>
                        <option value="">Todos los puntos</option>
                        {puntosVerdes.map(p => (
                            <option key={p.id} value={p.nombre}>{p.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 print:shadow-none print:border-none">
            <div className="p-5 bg-gray-50 border-b border-gray-200 flex justify-between items-center print:bg-white print:border-none">
                <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                    Resultados <span className="badge badge-primary badge-lg text-white">{datosFiltrados.length}</span>
                </h2>
                
                <div className="flex gap-3 print:hidden">
                    <button onClick={exportarExcel} className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none gap-2">
                        <FileSpreadsheet size={16}/> Excel
                    </button>
                    <button onClick={() => window.print()} className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none gap-2">
                        <Download size={16}/> PDF
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100 text-gray-600 font-bold">
                        <tr>
                            <th>ID</th>
                            <th>Ciudadano</th>
                            <th>Material</th>
                            <th>Peso</th>
                            <th>Estado</th>
                            <th>Detalle / Punto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargando ? (
                            <tr><td colSpan="6" className="text-center py-10 text-gray-500">Cargando datos...</td></tr>
                        ) : datosFiltrados.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-10 text-gray-400">No se encontraron registros.</td></tr>
                        ) : (
                            datosFiltrados.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                                    <td className="font-mono text-xs text-gray-500">{item.id.substring(0, 8)}...</td>
                                    <td className="font-medium">{item.usuarioId}</td>
                                    <td><span className="badge badge-ghost">{item.material}</span></td>
                                    <td className="font-bold">{item.peso} kg</td>
                                    <td>
                                        {item.estado === 'VALIDADA' 
                                            ? <span className="badge badge-success text-white gap-1">✔ Validada</span> 
                                            : <span className="badge badge-warning text-white gap-1">⏳ Pendiente</span>
                                        }
                                    </td>
                                    <td className="text-xs text-gray-500 max-w-xs truncate">
                                        {item.comentarios || '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </main>

      {/* Ocultar Footer al imprimir */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default ReporteEntregas;