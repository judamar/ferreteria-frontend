import {Link, useNavigate} from 'react-router-dom'
import storage from '../storage/storage.jsx'
import {ENV} from "../config/env.js"
import {useState} from "react";

const NavbarComponent = () => {
  const go = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const logout = () => {
    storage.delete('authToken')
    storage.delete('authUser')
    go('/catalogo')
  }

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const authUser = storage.get('authUser')

  return (
    <nav className="bg-red-700 text-white">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link className="flex items-center gap-4" to="/">
            <img
              src={import.meta.VITE_LOGO}
              alt="Acá va tu logo"
              className="w-[75px] h-[75px] rounded-xl shadow-xl"
            />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
            {ENV.NAME}
          </h1>
        </div>
        {/* Botón hamburguesa */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded hover:bg-red-800 transition-colors"
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>
      </div>
      {/* Menú Desktop y Mobile */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0 text-lg font-bold px-6 pb-2`}>
        {/* VISTA ADMIN */}
        {authUser && authUser.esAdmin === 1 ? (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                <span className="text-lg md:text-xl font-semibold py-2 md:py-0">
                  {storage.get('authUser').nombre}
                </span>

              {/* Dropdown Inventarios */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('inventarios')}
                  className="flex items-center justify-between w-full md:w-auto gap-2 py-2 hover:text-gray-200 transition-colors"
                >
                  Inventarios
                  <svg className={`w-4 h-4 transition-transform ${openDropdown === 'inventarios' ? 'rotate-180' : ''}`}
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div
                  className={`${openDropdown === 'inventarios' ? 'block' : 'hidden'} md:absolute md:left-0 md:mt-2 md:w-56 md:bg-white md:rounded-md md:shadow-lg pl-4 md:pl-0`}>
                  <Link to='/admin/productos'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    Productos
                  </Link>
                  <Link to='/admin/categorias'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    Categorias
                  </Link>
                  <Link to='/admin/herramientas'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    Herramientas
                  </Link>
                  <Link to='/admin/estados_herramientas'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    Estados Herramientas
                  </Link>
                </div>
              </div>

              {/* Dropdown Ventas */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('ventas')}
                  className="flex items-center justify-between w-full md:w-auto gap-2 py-2 hover:text-gray-200 transition-colors"
                >
                  Ventas
                  <svg className={`w-4 h-4 transition-transform ${openDropdown === 'ventas' ? 'rotate-180' : ''}`}
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div
                  className={`${openDropdown === 'ventas' ? 'block' : 'hidden'} md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg pl-4 md:pl-0`}>
                  <Link to='/admin/estados_ventas'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    Estados ventas
                  </Link>
                  <Link to='/admin/ventas'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    Ventas
                  </Link>
                  <Link to='/admin/estados_reservas'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    Estados reservas
                  </Link>
                  <Link to='/admin/reservas'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    Reservas
                  </Link>
                </div>
              </div>

              <Link to='/admin/usuarios' className='py-2 hover:text-gray-200 transition-colors'>
                Usuarios
              </Link>
              <Link to='/admin/proveedores' className='py-2 hover:text-gray-200 transition-colors'>
                Proveedores
              </Link>
              <Link to='/admin/sugerencias' className='py-2 hover:text-gray-200 transition-colors'>
                Sugerencias
              </Link>
            </div>

            <button
              type='button'
              className='flex items-center justify-center gap-2 px-4 py-2 mt-4 md:mt-0 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded transition-colors w-full md:w-auto'
              onClick={logout}
            >
              <i className="fa fa-sign-out"/>
              Salir
            </button>
          </div>
        ) : (
          // VISTA USUARIO
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <Link to='/catalogo' className='py-2 hover:text-gray-200 transition-colors'>
                <i className="fa-solid fa-store me-2"/>
                Catalogo
              </Link>
              <Link to='/herramientas' className='py-2 hover:text-gray-200 transition-colors'>
                <i className="fa-solid fa-screwdriver-wrench me-2"/>
                Herramientas
              </Link>
              <Link to='/sugerencias' className='py-2 hover:text-gray-200 transition-colors'>
                <i className="fa-solid fa-envelope me-2"/>
                Sugerencias
              </Link>
              <Link to='/acerca_de' className='py-2 hover:text-gray-200 transition-colors'>
                <i className="fa-solid fa-info-circle me-2"/>
                Acerca de
              </Link>
              <Link to='/terminos_y_condiciones' className='py-2 hover:text-gray-200 transition-colors'>
                <i className="fa-solid fa-file-contract me-2"/>
                Términos y condiciones
              </Link>
            </div>

            {!authUser ? (
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 mt-4 md:mt-0">
                <Link to='/login' className='py-2 hover:text-gray-200 transition-colors'>
                  <i className="fa-solid fa-sign-in-alt me-2"/>
                  Iniciar Sesion
                </Link>
                <Link to='/register' className='py-2 hover:text-gray-200 transition-colors'>
                  <i className="fa-solid fa-user-plus me-2"/>
                  Registrarse
                </Link>
              </div>
            ) : (
              <button
                type='button'
                className='px-4 py-2 mt-4 md:mt-0 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded transition-colors w-full md:w-auto'
                onClick={logout}
              >
                Salir
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavbarComponent