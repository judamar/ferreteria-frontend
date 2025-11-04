import { Link, useNavigate } from 'react-router-dom'
import storage from '../storage/storage.jsx'

const NavbarComponent = () => {
  const go = useNavigate()
  const logout = () => {
    storage.delete('authToken')
    storage.delete('authUser')
    go('/catalogo')
  }

  const authUser = storage.get('authUser')

  return (
    <nav className="navbar navbar-expand-xxl navbar-white bg-danger">
      <div className="container-fluid justify-content-center align-items-center">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.ico"
            alt="Logo"
            width="75"
            height="75"
            style={{ borderRadius: '10px' }}
          />
        </Link>
        <h1 className="navbar-brand text-white h1">CONSTRUMANTA P.</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="fa-solid fa-bars" />
        </button>
      </div>
      {/* VISTA ADMIN */}
      { authUser && authUser.esAdmin === 1 ? (
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2">
            <li className='nav-item px-lg-5 h4'>
              {storage.get('authUser').nombre}
            </li>
            <li className="nav-item dropdown">
              {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventarios
              </a>
              <ul className="dropdown-menu">
                <li className='px-lg-3'>
                  <Link to='/admin/productos' className='dropdown-item'>Productos</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/admin/categorias' className='dropdown-item'>Categorias</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/admin/herramientas' className='dropdown-item'>Herramientas</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/admin/estados_herramientas' className='dropdown-item'>Estados Herramientas</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Ventas
              </a>
              <ul className="dropdown-menu">
                <li className='px-lg-3'>
                  <Link to='/admin/estados_ventas' className='dropdown-item'>Estados ventas</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/admin/ventas' className='dropdown-item'>Ventas</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/admin/estados_reservas' className='dropdown-item'>Estados reservas</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/admin/reservas' className='dropdown-item'>Reservas</Link>
                </li>
              </ul>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/admin/usuarios' className='nav-link text-white'>Usuarios</Link>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/admin/proveedores' className='nav-link text-white'>Proveedores</Link>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/admin/sugerencias' className='nav-link text-white'>Sugerencias</Link>
            </li>
          </ul>
          <ul className='navbar-nav mx-auto mb-2'>
            <li className='nav-item px-lg-5 h3'>
              <button type='button' className='btn btn-warning' onClick={logout}>
                <i className="fa fa-sign-out"/>
                Salir
              </button>
            </li>
          </ul>
        </div>
        ) : (
          // VISTA USUARIO
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2">
              <li className='nav-item px-lg-5'>
                <Link to='/catalogo' className='nav-link text-white'>Catalogo</Link>
              </li>
              <li className='nav-item px-lg-5'>
                <Link to='/herramientas' className='nav-link text-white'>Herramientas</Link>
              </li>
              <li className='nav-item px-lg-5'>
                <Link to='/sugerencias' className='nav-link text-white'>Sugerencias</Link>
              </li>
              <li className='nav-item px-lg-5'>
                <Link to='/acerca_de' className='nav-link text-white'>Acerca de</Link>
              </li>
              <li className='nav-item px-lg-5'>
                <Link to='/terminos_y_condiciones' className='nav-link text-white'>Términos y condiciones</Link>
              </li>
              { !authUser ? (
                <ul className="navbar-nav mx-auto mb-2">
                  <li className='nav-item px-lg-5'>
                    <Link to='/login' className='nav-link text-white'>Iniciar Sesion</Link>
                  </li>
                  <li className='nav-item px-lg-5'>
                    <Link to='/register' className='nav-link text-white'>Registrarse</Link>
                  </li>
                </ul>
              ) : (
                <ul className='navbar-nav mx-auto mb-2'>
                  <li className='nav-item px-lg-5 h4'>
                    <button type='button' className='btn btn-warning' onClick={logout}>Salir</button>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        )}
    </nav>
  )
}

export default NavbarComponent