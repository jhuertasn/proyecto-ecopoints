// src/views/ReporteEntregas.jsx
import React, { useState, useEffect } from 'react';
import { FileText, Download, FileSpreadsheet, Filter, Search, Trash2 } from 'lucide-react';
import NavbarMunicipalidad from '../components/NavbarMunicipalidad';
import Footer from '../components/Footer';

const ReporteEntregas = () => {
  const [entregas, setEntregas] = useState([]);
  const [puntosVerdes, setPuntosVerdes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Filtros
  const [filtroMaterial, setFiltroMaterial] = useState('');
  const [filtroPunto, setFiltroPunto] = useState('');
  const [busquedaUsuario, setBusquedaUsuario] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
        try {
            const resEnt = await fetch('/api/entregas/todas'); 
            if (resEnt.ok) setEntregas(await resEnt.json());

            const resPuntos = await fetch('/api/puntos-verdes');
            if (resPuntos.ok) setPuntosVerdes(await resPuntos.json());
        } catch (error) {
            console.error(error);
        } finally {
            setCargando(false);
        }
    };
    cargarDatos();
  }, []);

  const datosFiltrados = entregas.filter(item => {
    if (busquedaUsuario && !item.usuarioId.toLowerCase().includes(busquedaUsuario.toLowerCase()) && !item.id.includes(busquedaUsuario)) return false;
    if (filtroMaterial && item.material !== filtroMaterial) return false;
    if (filtroPunto && !JSON.stringify(item).includes(filtroPunto)) return false;
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
      
      <div className="print:hidden">
        <NavbarMunicipalidad />
      </div>

      {/* HERO: CAMBIADO A VERDE PARA UNIFICAR MARCA */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 px-6 py-10 text-white shadow-md print:hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Reporte de Entregas</h1>
            <p className="text-emerald-100 text-lg">Generación de informes detallados y auditoría de entregas.</p>
          </div>
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
            <FileText size={48} className="text-white" />
          </div>
        </div>
      </div>

      {/* CONTENIDO: flex-grow asegura que empuje el footer hacia abajo */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow">
        
        {/* FILTROS */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 print:hidden">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h3 className="flex items-center gap-2 text-gray-700 font-bold text-lg">
                    <Filter size={20} className="text-emerald-600" /> Filtros Avanzados
                </h3>
                <button 
                    onClick={() => {setBusquedaUsuario(''); setFiltroMaterial(''); setFiltroPunto('');}}
                    className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                >
                    <Trash2 size={14}/> Limpiar Filtros
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-control">
                    <label className="label-text text-xs font-bold text-gray-500 uppercase mb-2">Ciudadano (ID o Nombre)</label>
                    <div className="relative">
                        <input 
                            type="text" placeholder="Buscar..." className="input input-bordered w-full pl-10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                            value={busquedaUsuario} onChange={(e) => setBusquedaUsuario(e.target.value)} 
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label-text text-xs font-bold text-gray-500 uppercase mb-2">Material</label>
                    <select className="select select-bordered w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" value={filtroMaterial} onChange={(e) => setFiltroMaterial(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Plástico">Plástico</option>
                        <option value="Vidrio">Vidrio</option>
                        <option value="Papel">Papel</option>
                        <option value="Cartón">Cartón</option>
                        <option value="Metal">Metal</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label-text text-xs font-bold text-gray-500 uppercase mb-2">Punto de Acopio</label>
                    <select className="select select-bordered w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" value={filtroPunto} onChange={(e) => setFiltroPunto(e.target.value)}>
                        <option value="">Todos los puntos</option>
                        {puntosVerdes.map(p => (<option key={p.id} value={p.nombre}>{p.nombre}</option>))}
                    </select>
                </div>
            </div>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 print:shadow-none print:border-none">
            <div className="p-5 bg-gray-50 border-b border-gray-200 flex justify-between items-center print:bg-white print:border-none">
                <h2 className="font-bold text-xl text-gray-800 flex items-center gap-3">
                    Resultados <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">{datosFiltrados.length}</span>
                </h2>
                <div className="flex gap-3 print:hidden">
                    <button onClick={exportarExcel} className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none gap-2 shadow-sm">
                        <FileSpreadsheet size={16}/> Excel
                    </button>
                    <button onClick={() => window.print()} className="btn btn-sm bg-red-600 hover:bg-gray-100 text-white border border-gray-300 gap-2 shadow-sm">
                        <Download size={16}/> PDF
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs tracking-wider">
                        <tr>
                            <th className="py-4">ID Transacción</th>
                            <th>Ciudadano</th>
                            <th>Material</th>
                            <th>Peso</th>
                            <th>Estado</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                        {cargando ? (
                            <tr><td colSpan="6" className="text-center py-12 text-gray-500">Cargando datos del sistema...</td></tr>
                        ) : datosFiltrados.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-12 text-gray-400 bg-gray-50">No se encontraron registros con los filtros actuales.</td></tr>
                        ) : (
                            datosFiltrados.map((item) => (
                                <tr key={item.id} className="hover:bg-emerald-50/50 transition-colors">
                                    <td className="font-mono text-xs text-gray-500 font-medium">{item.id.substring(0, 8)}...</td>
                                    <td className="font-semibold text-gray-700">{item.usuarioId}</td>
                                    <td>
                                        <span className={`badge badge-sm font-medium ${item.material === 'Vidrio' ? 'badge-info bg-blue-100 text-blue-800 border-none' : 'badge-ghost bg-gray-200 border-none'}`}>
                                            {item.material}
                                        </span>
                                    </td>
                                    <td className="font-bold text-gray-800">{item.peso} kg</td>
                                    <td>
                                        {item.estado === 'VALIDADA' 
                                            ? <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Validada</div>
                                            : <div className="flex items-center gap-1 text-amber-600 font-bold text-xs"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Pendiente</div>
                                        }
                                    </td>
                                    <td className="text-xs text-gray-500 max-w-xs truncate italic">
                                        {item.comentarios || <span className="text-gray-300">Sin comentarios</span>}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </main>

      {/* FOOTER (Se mantendrá abajo gracias a flex-col en el div principal) */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default ReporteEntregas;