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
    <nav className="bg-gradient-to-r from-red-700 to-red-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link className="flex items-center gap-4 order-3 xl:order-1" to="/">
            <img
              src={ENV.LOGO}
              alt="Acá va tu logo"
              className="w-auto max-h-[60px]"
            />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white text-shadow-md order-2">
            {ENV.NAME}
          </h1>
          {/* Botón hamburguesa */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 rounded hover:bg-red-800 transition-colors order-1 xl:order-3"
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
      </div>
      {/* Menú Desktop y Mobile */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} xl:block xl-4 xl:mt-0 text-lg font-bold px-6 pb-2`}>
        {/* VISTA ADMIN */}
        {authUser && authUser.esAdmin === 1 ? (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              {/* Dropdown Inventarios */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('inventarios')}
                  className="flex items-center justify-between w-full md:w-auto gap-2 py-2 hover:text-gray-200 transition-colors"
                >
                  <i className="icon-[lucide--boxes]"/>
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
                    <i className="icon-[eos-icons--products] mr-2" />
                    Productos
                  </Link>
                  <Link to='/admin/categorias'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    <i className="icon-[material-symbols--category-outline] mr-2" />
                    Categorias
                  </Link>
                  <Link to='/admin/herramientas'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    <i className="icon-[material-symbols--tools-power-drill-outline-sharp] mr-2" />
                    Herramientas
                  </Link>
                  <Link to='/admin/estados_herramientas'
                        className='block px-4 py-2 md:text-gray-800 hover:bg-red-800 md:hover:bg-gray-100 rounded transition-colors'>
                    <i className="icon-[tabler--tag] mr-2" />
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
              <Link to='/catalogo' className='py-2 hover:scale-110 transition-transform duration-300'>
                <i className="fa-solid fa-store me-2"/>
                Catalogo
              </Link>
              <Link to='/herramientas' className='py-2 hover:scale-110 transition-transform duration-300'>
                <i className="fa-solid fa-screwdriver-wrench me-2"/>
                Herramientas
              </Link>
              <Link to='/sugerencias' className='py-2 hover:scale-110 transition-transform duration-300'>
                <i className="fa-solid fa-envelope me-2"/>
                Sugerencias
              </Link>
              <Link to='/acerca_de' className='py-2 hover:scale-110 transition-transform duration-300'>
                <i className="fa-solid fa-info-circle me-2"/>
                Acerca de
              </Link>
              <Link to='/terminos_y_condiciones' className='py-2 hover:scale-110 transition-transform duration-300'>
                <i className="fa-solid fa-file-contract me-2"/>
                Términos y condiciones
              </Link>
            </div>

            {!authUser ? (
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 mt-4 md:mt-0">
                <Link to='/login' className='py-2 hover:scale-110 transition-transform duration-300'>
                  <i className="fa-solid fa-sign-in-alt me-2"/>
                  Inicia sesión
                </Link>
                <Link to='/register' className='py-2 hover:scale-110 transition-transform duration-300'>
                  <i className="fa-solid fa-user-plus me-2"/>
                  Registrate
                </Link>
              </div>
            ) : (
              <button
                type='button'
                className='px-4 py-2 mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition-colors w-full md:w-auto'
                onClick={logout}
              >
                <i className="fa-solid fa-right-from-bracket me-2"/>
                Cerrar Sesion
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavbarComponent