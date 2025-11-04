import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { sendRequest } from '../functions.jsx'
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
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-4 offset-md-4'>
          <div className='card border border-danger'>
            <div className="card-header bg-danger border border-danger text-white">
              Iniciar Sesión
            </div>
            <div className='card-body'>
              <form onSubmit={login}>
                <DivInput type='number' icon='fa-at' value={cedula} className='form-control' placeholder='Cédula' required='required' handleChange={(e)=> setCedula(e.target.value)}/>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white">
                    <i className="fa-solid fa-key" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Contraseña"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Contraseña"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} />
                  </button>
                </div>
                <div className='d-grid col-10 mx-auto'>
                  {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button className='btn btn-danger'>
                    <i className='fa-solid fa-door-open'/> Iniciar
                  </button>
                </div>
              </form>
              <p className='text-center pt-2'>O</p>
              <div className='d-grid col-10 mx-auto'>
                <Link to='/register'>
                  {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button className='btn btn-danger w-100'>
                    <i className='fa-solid fa-user-plus'/>Registrarse
                  </button>
                </Link>
              </div>
              <div className='d-grid col-10 mx-auto mt-4'>
                <a className='btn btn-success' href='src\utils\pdfs\Manual_usuario.pdf' target='_blank' rel='noreferrer'>
                  <i className='fa-solid fa-book'/> Manual de usuario
                </a>
              </div>
              <div className='d-grid col-10 mx-auto mt-2'>
                <a className='btn btn-success' href='src\utils\pdfs\Manual_tecnico.pdf' target='_blank' rel='noreferrer'>
                  <i className='fa-solid fa-book'/> Manual tecnico
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login