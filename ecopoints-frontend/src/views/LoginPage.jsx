// src/views/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // 1. Importar SweetAlert2
import loginBackground from '../assets/images/1-login-sign.jpg';

function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [recordar, setRecordar] = useState(false);
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const response = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, password }),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || 'Credenciales incorrectas');
      }

      const data = await response.json();
      
      // Guardamos la sesión
      localStorage.setItem('usuario', JSON.stringify(data));

      // 2. ALERTA BONITA (SweetAlert2)
      Swal.fire({
        title: `¡Hola, ${data.usuario}!`,
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        backdrop: `rgba(0,0,123,0.4)`
      }).then(() => {
        // Redirección
        if (data.rol === 'Recolector') {
            navigate('/recolector');
        } else if (data.rol === 'Ciudadano') {
            navigate('/ciudadano');
        } else {
            navigate('/dashboard'); // Municipalidad
        }
      });

    } catch (err) {
      // ALERTA DE ERROR
      Swal.fire({
        title: 'Error de acceso',
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#EF4444'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-1 bg-gray-100">
      {/* Columna Izquierda */}
      <div className="w-full h-full hidden md:block">
        <div
          className="hero min-h-screen flex flex-col justify-between items-start text-white p-8"
          style={{ backgroundImage: `url(${loginBackground})`, backgroundSize: 'cover' }}
        >
          <h1 className="mb-5 text-5xl font-light">Eco <b className="font-bold">Points</b></h1>
          <p className="mb-5 text-4xl font-light text-wrap">
            "Ahora es fácil encontrar puntos verdes y saber que mi esfuerzo por reciclar se traduce en algo"
          </p>
          <div>
            <div className="badge bg-white text-black text-xl badge-lg">Grupo 7</div>
            <p className="text-xl">Ciudadanos comprometidos</p>
          </div>
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="w-full h-full flex justify-center items-center flex-col gap-4 p-4">
        <h1 className="w-[80%] text-3xl md:text-4xl text-center font-bold text-black">
          ¡Bienvenido de vuelta!
        </h1>
        
        <div className="card w-full max-w-md shrink bg-white shadow-xl rounded-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset mb-6">
                <legend className="fieldset-legend mb-1 text-[#595959] font-semibold">Usuario</legend>
                <input
                  autoFocus
                  type="text"
                  className="input input-bordered w-full border-green-500 focus:ring-2 focus:ring-green-500"
                  placeholder="TuUsuario..."
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend mb-1 text-[#595959] font-semibold">Contraseña</legend>
                <input
                  type="password"
                  className="input input-bordered w-full border-green-500 focus:ring-2 focus:ring-green-500"
                  placeholder="*****************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={cargando}
                  className="btn w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl border-none"
                >
                  {cargando ? <span className="loading loading-spinner"></span> : 'Entrar'}
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-[#595959] font-medium">
                  ¿Aún no tienes una cuenta?{' '}
                  <Link to="/registro" className="text-green-600 font-bold hover:underline">Regístrate ahora</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;