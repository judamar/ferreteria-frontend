import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {sendRequest} from '../functions.jsx'
import DivInput from '../components/DivInput.jsx'
import storage from '../storage/storage.jsx'

const Login = () => {
  const [cedula, setCedula] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const go = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    const form = {cedula, password}
    const res = await sendRequest('POST', form, '/usuarios/login', '', false)
    if (res && res.status === 'SUCCESS' && res.data.token) {
      storage.set('authToken', res.data.token)
      storage.set('authUser', res.data.user)
      if (res.data.user.esAdmin === 1) {
        go('/admin/productos')
      } else if (res.data.user.esAdmin === 0) {
        go('/catalogo')
      }
    }
  }

  return (
    <div className="container mx-auto p-6  flex flex-col justify-between gap-6">
      <div className="flex flex-col lg:px-8 bg-white rounded-2xl shadow-md h-full p-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="title-h3">
            Inicia sesión en tu cuenta
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={login} className="space-y-6">
            {/* Campo Cédula */}
            <div>
              <label htmlFor="cedula" className="block text-lg font-medium text-gray-900">
                Cédula
              </label>
              <div
                className="mt-2 flex items-center bg-white rounded-md px-3 py-1.5 outline-1 -outline-offset-1 outline-red-600 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-red-600">
                <i className="icon-[material-symbols--id-card-outline] text-gray-900 text-2xl mr-2"/>
                <input
                  id="cedula"
                  type="number"
                  required
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="Ingresa tu cédula"
                  className="block w-full bg-transparent text-black placeholder-gray-600 focus:outline-none text-lg"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-lg font-medium text-gray-900">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-lg font-semibold text-red-600 hover:text-red-500"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              <div
                className="mt-2 flex items-center bg-white rounded-md px-3 py-1.5 outline-1 -outline-offset-1 outline-red-600 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-red-600">
                <i className="icon-[gg--password] text-gray-900 text-2xl mr-2"/>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="block w-full bg-transparent text-black placeholder-gray-600 focus:outline-none text-lg"
                />
              </div>
            </div>

            {/* Botón Iniciar */}
            <div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-1.5 text-lg font-semibold text-white hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 gap-2 transition"
              >
                <i className="fa-solid fa-sign-in-alt"/>
                Iniciar sesión
              </button>
            </div>
          </form>

          {/* Enlaces secundarios */}
          <p className="mt-10 text-center text-sm text-gray-600">
            ¿No tienes cuenta?
            <Link to="/register" className="ml-1 font-semibold text-red-600 hover:text-red-500">
              Regístrate
            </Link>
          </p>

          {/* Botones Manuales
          <div className="mt-8 space-y-3">
            <a
              href="src/utils/pdfs/Manual_usuario.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-500 transition"
            >
              <i className="fa-solid fa-book mr-2"/>
              Manual de usuario
            </a>

            <a
              href="src/utils/pdfs/Manual_tecnico.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-500 transition"
            >
              <i className="fa-solid fa-book mr-2"/>
              Manual técnico
            </a>
          </div>
          */}
        </div>
      </div>
    </div>
  )
}

export default Login