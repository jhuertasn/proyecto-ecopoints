// src/views/RegistroPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importa la imagen de fondo
import registroBackground from '../assets/images/2-registro-singup.jpg';

function RegistroPage() {
  // Estados para cada campo del formulario
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(true); // Inicializado en true como en el HTML
  
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página

    // --- Validación básica ---
    if (!usuario || !rol || !password) {
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

    // Si todo está bien, aquí llamarías a tu microservicio para registrar al usuario
    const formData = { usuario, rol, password };
    console.log('Enviando datos de registro:', formData);
    
    // Simulación de registro exitoso
    alert('¡Cuenta creada exitosamente! Serás redirigido al inicio de sesión.');
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <main className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-1 bg-gray-100">
      {/* Columna Izquierda con Imagen */}
      <div className="w-full h-full hidden md:block">
        <div
          className="hero min-h-screen flex flex-col justify-between items-start text-white p-8"
          style={{ backgroundImage: `url(${registroBackground})` }}
        >
          <h1 className="mb-5 text-5xl font-light">
            Eco <b className="font-bold">Points</b>
          </h1>
        </div>
      </div>

      {/* Columna Derecha con Formulario */}
      <div className="w-full h-full flex justify-center items-center flex-col gap-4 p-4 overflow-y-auto">
        <h1 className="w-[80%] text-3xl md:text-4xl text-center font-bold text-black text-pretty">
          Únete a la comunidad de recicladores
        </h1>
        <p className="text-xs text-[#595959] font-bold">
          Ayuda a construir un futuro más sostenible en el Perú.
        </p>
        <div className="card w-full max-w-md shrink">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 grid-rows-1 gap-4 items-end mb-6">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend mb-1 text-[#595959]">Usuario</legend>
                  <input
                    autoFocus
                    type="text"
                    className="w-full h-10 rounded-sm border border-green-500 focus:outline focus:outline-[#81DD9D] focus:outline-4 focus:bg-[#ADF0C7] placeholder:text-[#595959] p-2"
                    placeholder="TuUsuario2025..."
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </fieldset>
                <select 
                  className="select select-success border-green-500 h-10 min-h-10 focus:outline focus:outline-[#81DD9D] focus:outline-4 focus:bg-[#ADF0C7]"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                >
                  <option value="" disabled>Seleccione Rol</option>
                  <option value="Recolector">Recolector</option>
                  <option value="Ciudadano">Ciudadano</option>
                </select>
              </div>
              <fieldset className="fieldset mb-6">
                <legend className="fieldset-legend mb-1 text-[#595959]">Contraseña</legend>
                <input
                  type="password"
                  className="w-full h-10 rounded-sm border border-green-500 focus:outline focus:outline-[#81DD9D] focus:outline-4 focus:bg-[#ADF0C7] placeholder:text-[#595959] p-2"
                  placeholder="*****************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend mb-1 text-[#595959]">Repita Contraseña</legend>
                <input
                  type="password"
                  className="w-full h-10 rounded-sm border border-green-500 focus:outline focus:outline-[#81DD9D] focus:outline-4 focus:bg-[#ADF0C7] placeholder:text-[#595959] p-2"
                  placeholder="*****************"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </fieldset>
              <div className="mt-6 flex justify-start items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success checkbox-sm"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                />
                <p className="text-xs text-[#595959] font-medium">Acepto los Términos y Condiciones</p>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="btn w-full bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 text-white font-bold text-xl"
                >
                  Crear mi cuenta
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs text-[#595959] font-medium">
                  ¿Ya tienes una cuenta?{' '}
                  <Link to="/login" className="text-green-500 font-bold hover:underline">
                    Inicia sesión
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

export default RegistroPage;