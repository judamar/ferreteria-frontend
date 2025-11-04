import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { sendRequest } from '../functions.jsx'
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
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-4 offset-md-4'>
          <div className='card border border-danger'>
            <div className="card-header bg-danger border border-danger text-white">
              Registrarse
            </div>
            <div className='card-body'>
              <form onSubmit={register}>
                <DivInput type='number' icon='fa-at' value={cedula} className='form-control' placeholder='Cédula' required='required' handleChange={(e)=> setCedula(e.target.value)}/>
                <DivInput type='text' icon='fa-user' value={nombre_completo} className='form-control' placeholder='Nombre Completo' required='required' handleChange={(e)=> setNombre_completo(e.target.value)}/>
                <DivInput type='email' icon='fa-envelope' value={correo_electronico} className='form-control' placeholder='Correo Electrónico' handleChange={(e)=> setCorreo_electronico(e.target.value)}/>
                <DivInput type='number' icon='fa-phone' value={telefono} className='form-control' placeholder='Teléfono' required='required' handleChange={(e)=> setTelefono(e.target.value)}/>
                <DivInput type='text' icon='fa-location-dot' value={direccion} className='form-control' placeholder='Dirección' handleChange={(e)=> setDireccion(e.target.value)}/>
                <DivInput type='password' icon='fa-key' value={password} className='form-control' placeholder='Contraseña' required='required' handleChange={(e)=> setPassword(e.target.value)}/>
                <div className='d-grid col-10 mx-auto'>
                  {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button className='btn btn-danger'>
                    <i className='fa-solid fa-door-open'/> Registrarse
                  </button>
                </div>
              </form>
              <Link to='/login'>
                <i className='fa-solid fa-user'/>Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register