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
    <div className="container mx-auto my-auto p-6 flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col lg:px-8 w-full max-w-4xl bg-white rounded-2xl shadow-md p-6">
        <div className="w-full">
          <h3 className="title-h3">
            Inicia sesión en tu cuenta
          </h3>
        </div>
        <div className="mt-5 w-full">
          <form onSubmit={login} className="space-y-6">
            {/* Campo Cédula */}
            <DivInput
              label="Cédula"
              id="cedula"
              type='number'
              icon='icon-[material-symbols--id-card-outline]'
              value={cedula}
              placeholder='Cédula'
              required='required'
              handleChange={(e) =>
                setCedula(e.target.value)}/>

            {/* Campo Contraseña */}
            <DivInput
              label="Contraseña"
              id="password"
              type="password"
              icon="icon-[gg--password]"
              value={password}
              placeholder='Contraseña'
              required='required'
              handleChange={(e) =>
                setPassword(e.target.value)}/>
            <button
              type="button"
              onClick={() =>
                setShowPassword((s) => !s)}
              className="text-lg font-semibold text-red-600 hover:text-red-500">
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>

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
          <p className="mt-3 text-center text-sm text-gray-600">
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