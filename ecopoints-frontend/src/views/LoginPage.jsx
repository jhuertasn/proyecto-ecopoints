// src/views/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginBackground from '../assets/images/1-login-sign.jpg';

function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [recordar, setRecordar] = useState(false);
  const [error, setError] = useState(''); // Para mostrar errores en pantalla
  const [cargando, setCargando] = useState(false); // Para deshabilitar el botón mientras carga

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // 1. Llamada al Backend a través del Proxy
      const response = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, password }),
      });

      // 2. Manejo de Errores
      if (!response.ok) {
        const errorMsg = await response.text(); // Tu backend devuelve texto en caso de error
        throw new Error(errorMsg || 'Credenciales incorrectas');
      }

      // 3. Login Exitoso
      const data = await response.json(); // Tu backend devuelve el objeto EventUsuario en JSON
      console.log('Login exitoso:', data);

      // Guardamos la sesión en el navegador
      localStorage.setItem('usuario', JSON.stringify(data));

      alert(`¡Bienvenido ${data.usuario}!`);

      // 4. Redirección inteligente según el rol
      if (data.rol === 'Recolector') {
        navigate('/recolector');
      } else if (data.rol === 'Ciudadano') {
        navigate('/ciudadano');  // Va directo al dashboard de ciudadano
      } else {
        // Si es Municipalidad o Admin (si agregas ese rol luego)
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error de login:', err);
      setError(err.message);
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
          style={{ backgroundImage: `url(${loginBackground})` }}
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
        <h1 className="w-[80%] text-3xl md:text-4xl text-center font-bold text-black text-pretty">
          ¡Bienvenido de vuelta!
        </h1>

        {/* Mensaje de Error */}
        {error && (
          <div role="alert" className="alert alert-error w-[65%] p-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        <div className="card w-full max-w-md shrink">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset mb-6">
                <legend className="fieldset-legend mb-1 text-[#595959]">Usuario</legend>
                <input
                  autoFocus
                  type="text"
                  className="w-full h-10 rounded-sm border border-green-500 focus:outline focus:outline-[#81DD9D] focus:outline-4 focus:bg-[#ADF0C7] placeholder:text-[#595959] p-2"
                  placeholder="TuUsuario..."
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend mb-1 text-[#595959]">Contraseña</legend>
                <input
                  type="password"
                  className="w-full h-10 rounded-sm border border-green-500 focus:outline focus:outline-[#81DD9D] focus:outline-4 focus:bg-[#ADF0C7] placeholder:text-[#595959] p-2"
                  placeholder="*****************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={cargando}
                  className="btn w-full bg-green-500 border-green-500 hover:bg-green-600 text-white font-bold text-xl disabled:bg-gray-400"
                >
                  {cargando ? 'Cargando...' : 'Entrar'}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-[#595959] font-medium">
                  ¿Aún no tienes una cuenta?{' '}
                  <Link to="/registro" className="text-green-500 font-bold hover:underline">Regístrate ahora</Link>
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