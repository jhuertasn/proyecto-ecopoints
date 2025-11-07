// src/views/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importa la imagen de fondo desde tu carpeta de assets
import loginBackground from '../assets/images/1-login-sign.jpg';

function LoginPage() {
  // Estados para controlar los inputs del formulario
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [recordar, setRecordar] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir después del login

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    // Aquí iría la lógica de autenticación con tu microservicio
    console.log('Intentando iniciar sesión con:', { usuario, password, recordar });
    // Simulamos un login exitoso y redirigimos al dashboard del ciudadano
    alert('¡Inicio de sesión exitoso! (Simulación)');
    navigate('/'); // Redirige a la página principal
  };

  return (
    <main className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-1 bg-gray-100">
      {/* Columna Izquierda con Imagen */}
      <div className="w-full h-full hidden md:block">
        <div
          className="hero min-h-screen flex flex-col justify-between items-start text-white p-8"
          style={{ backgroundImage: `url(${loginBackground})` }}
        >
          <h1 className="mb-5 text-5xl font-light">
            Eco <b className="font-bold">Points</b>
          </h1>
          <p className="mb-5 text-4xl font-light text-wrap">
            "Ahora es fácil encontrar puntos verdes y saber que mi esfuerzo por reciclar se traduce en algo"
          </p>
          <div>
            <div className="badge bg-white text-black text-xl badge-lg">Grupo 7</div>
            <p className="text-xl">Ciudadanos comprometidos</p>
          </div>
        </div>
      </div>

      {/* Columna Derecha con Formulario */}
      <div className="w-full h-full flex justify-center items-center flex-col gap-4 p-4">
        <h1 className="w-[80%] text-3xl md:text-4xl text-center font-bold text-black text-pretty">
          ¡Bienvenido de vuelta a la comunidad!
        </h1>
        <p className="text-xs text-[#595959] font-bold text-center">
          Ayuda a transformar el Perú registrando tu reciclaje y ganando recompensas.
        </p>
        <div className="card w-full max-w-md shrink">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset mb-6">
                <legend className="fieldset-legend mb-1 text-[#595959]">Usuario</legend>
                <input
                  autoFocus
                  type="text"
                  className="w-full h-10 rounded-sm border border-green-500 focus:outline focus:outline-[#81DD9D] focus:outline-4 focus:bg-[#ADF0C7] placeholder:text-[#595959] p-2 focus:outline-offset-0"
                  placeholder="TuUsuario2025..."
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend mb-1 text-[#595959]">Contraseña</legend>
                <input
                  type="password"
                  className="w-full h-10 rounded-sm border border-green-500 focus:outline focus:outline-[#81DD9D] focus:outline-4 focus:bg-[#ADF0C7] placeholder:text-[#595959] p-2 focus:outline-offset-0"
                  placeholder="*****************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
              <div className="mt-6 flex justify-between items-center">
                <a href="#" className="text-xs text-green-500 font-bold hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="text-xs text-[#595959] font-medium">Recordar sesión</p>
                <input
                  type="checkbox"
                  className="toggle border-green-300 border text-black checked:border-green-500 checked:bg-green-500 checked:text-white toggle-xs"
                  checked={recordar}
                  onChange={(e) => setRecordar(e.target.checked)}
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="btn w-full bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 text-white font-bold text-xl"
                >
                  Entrar
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs text-[#595959] font-medium">
                  ¿Aún no tienes una cuenta?{' '}
                  <Link to="/registro" className="text-green-500 font-bold hover:underline">
                    Regístrate ahora
                  </Link>
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