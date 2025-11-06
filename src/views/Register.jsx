import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {sendRequest} from '../functions.jsx'
import DivInput from '../components/DivInput.jsx'

const API_URL = import.meta.env.API_URL

const Register = () => {
  const [cedula, setCedula] = useState('')
  const [nombre_completo, setNombre_completo] = useState('')
  const [correo_electronico, setCorreo_electronico] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [password, setPassword] = useState('')
  const go = useNavigate()

  const register = async (e) => {
    e.preventDefault()
    const form = {cedula, nombre_completo, correo_electronico, telefono, direccion, password}
    const res = await sendRequest('POST', form, '/usuarios/signup', '', false)
    if (res && res.status === 'SUCCESS') {
      go('/login')
    }
  }
  return (
    <div className='container mx-auto my-auto p-6 flex flex-col items-center justify-center gap-6'>
      <div className='flex flex-col lg:px-8 w-full max-w-6xl bg-white rounded-2xl shadow-md p-6'>
        <div className='w-full'>
          <h3 className="title-h3">
            Regístrate
          </h3>
          <div className='mt-5 w-full'>
            <form onSubmit={register} className="space-y-6">
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
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

                <DivInput
                  label="Nombre completo"
                  id="name"
                  type='text'
                  icon='icon-[lets-icons--user]'
                  value={nombre_completo}
                  placeholder='Nombre Completo'
                  required='required'
                  handleChange={(e) =>
                    setNombre_completo(e.target.value)}/>

                <DivInput
                  label="Email"
                  id="email"
                  type='email'
                  icon='icon-[mi--email]'
                  value={correo_electronico}
                  placeholder='Correo Electrónico'
                  handleChange={(e) =>
                    setCorreo_electronico(e.target.value)}/>

                <DivInput
                  label="Telefono"
                  id="phone"
                  type='number'
                  icon='icon-[ci--phone]'
                  value={telefono}
                  placeholder='Teléfono'
                  required='required'
                  handleChange={(e) =>
                    setTelefono(e.target.value)}/>

                <DivInput
                  label="Dirección"
                  id="address"
                  type="text"
                  icon="icon-[tdesign--location]"
                  value={direccion}
                  placeholder="Dirección"
                  handleChange={(e) =>
                    setDireccion(e.target.value)}/>

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
              </div>
              <div>
                <button
                  type="submit"
                  className='flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-1.5 text-lg font-semibold text-white hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 gap-2 transition'>
                  <i className='fa-solid fa-user-plus'/> Registrarse
                </button>
              </div>
            </form>
            <p className="mt-3 text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?
              <Link to="/login" className="ml-1 font-semibold text-red-600 hover:text-red-500">
                Inica Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register