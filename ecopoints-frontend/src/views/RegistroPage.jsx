// src/views/RegistroPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registroBackground from '../assets/images/2-registro-singup.jpg';

function RegistroPage() {
  const [usuario, setUsuario] = useState('');
  // 1. NUEVO ESTADO PARA EL CORREO
  const [correo, setCorreo] = useState(''); 
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(true);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => { // Hacemos la función async
    e.preventDefault();

    // Validación básica
    if (!usuario || !rol || !password || !correo) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    if (!aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }

    try {
      // 2. CONEXIÓN REAL AL BACKEND (Usando el Proxy de Vite)
      // El proxy redirige /api/usuarios -> http://localhost:9090/usuario
      const response = await fetch('/api/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          password,
          correo,
          rol
        }),
      });

      // Leer la respuesta (puede ser texto o JSON según tu backend)
      const data = await response.text();

      if (response.ok) {
        alert('¡Cuenta creada exitosamente! ' + data);
        navigate('/login');
      } else {
        alert('Error al registrar: ' + data);
      }

    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <main className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-1 bg-gray-100">
      {/* Columna Izquierda (Igual que antes) */}
      <div className="w-full h-full hidden md:block">
        <div
          className="hero min-h-screen flex flex-col justify-between items-start text-white p-8"
          style={{ backgroundImage: `url(${registroBackground})` }}
        >
          <h1 className="mb-5 text-5xl font-light">Eco <b className="font-bold">Points</b></h1>
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="w-full h-full flex justify-center items-center flex-col gap-4 p-4 overflow-y-auto">
        <h1 className="w-[80%] text-3xl md:text-4xl text-center font-bold text-black text-pretty">Únete a la comunidad</h1>
        <div className="card w-full max-w-md shrink">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              
              {/* GRUPO: Usuario y Rol */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                 <fieldset className="fieldset">
                    <legend className="fieldset-legend mb-1 text-[#595959]">Usuario</legend>
                    <input autoFocus type="text" className="input input-bordered w-full border-green-500" 
                           value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="User123" />
                 </fieldset>
                 
                 <fieldset className="fieldset">
                    <legend className="fieldset-legend mb-1 text-[#595959]">Rol</legend>
                    <select className="select select-success border-green-500 w-full" 
                            value={rol} onChange={(e) => setRol(e.target.value)}>
                      <option value="" disabled>Seleccionar</option>
                      <option value="Recolector">Recolector</option>
                      <option value="Ciudadano">Ciudadano</option>
                      <option value="Municipalidad">Municipalidad</option>
                    </select>
                 </fieldset>
              </div>

              {/* 3. NUEVO CAMPO: Correo */}
              <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend mb-1 text-[#595959]">Correo Electrónico</legend>
                <input type="email" className="input input-bordered w-full border-green-500" 
                       value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="ejemplo@correo.com" />
              </fieldset>

              <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend mb-1 text-[#595959]">Contraseña</legend>
                <input type="password" className="input input-bordered w-full border-green-500" 
                       value={password} onChange={(e) => setPassword(e.target.value)} />
              </fieldset>

              <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend mb-1 text-[#595959]">Repita Contraseña</legend>
                <input type="password" className="input input-bordered w-full border-green-500" 
                       value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </fieldset>

              <div className="mt-6 flex justify-start items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-success checkbox-sm" 
                       checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} />
                <p className="text-xs text-[#595959]">Acepto los Términos y Condiciones</p>
              </div>

              <div className="mt-6">
                <button type="submit" className="btn w-full bg-green-500 text-white hover:bg-green-600">Crear mi cuenta</button>
              </div>

              <div className="mt-6 text-center">
                 <Link to="/login" className="text-green-500 font-bold hover:underline">Inicia sesión</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegistroPage;