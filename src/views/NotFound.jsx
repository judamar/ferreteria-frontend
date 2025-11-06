import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center p-6'>
      <div className='max-w-4xl w-full'>
        <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
          {/* Sección visual del 404 */}
          <div className='bg-red-700 px-8 py-8 text-center relative overflow-hidden'>
            {/* Contenido principal */}
            <div className='relative z-10'>
              <div className='inline-flex items-center justify-center mb-6'>
                <i className='icon-[material-symbols--error-outline] text-6xl text-white animate-pulse'/>
              </div>

              <h1 className='text-4xl md:text-5xl font-black text-white mb-4 tracking-tight'>
                404
              </h1>

              <div className='w-24 h-1 bg-white mx-auto mb-6 rounded-full'></div>

              <p className='text-2xl md:text-3xl font-bold text-white mb-2'>
                ¡Oops! Página no encontrada
              </p>
              <p className='text-red-100 text-lg max-w-md mx-auto'>
                La página que estás buscando no existe o ha sido movida
              </p>
            </div>
          </div>

          {/* Sección de acciones */}
          <div className='px-8 py-6'>
            <div className='text-center mb-5'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                ¿Qué puedes hacer?
              </h2>
              <p className='text-gray-600'>
                Aquí hay algunas opciones para ayudarte a encontrar lo que buscas
              </p>
            </div>

            {/* Grid de opciones */}
            <div className='grid grid-cols-1 gap-6 mb-5'>
              <Link to='/' className='group'>
                <div className='border-2 border-gray-200 rounded-xl p-6 text-center hover:border-red-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 group-hover:bg-red-500 transition-colors duration-300'>
                    <i className='icon-[material-symbols--home-outline] text-3xl text-red-600 group-hover:text-white transition-colors duration-300'/>
                  </div>
                  <h3 className='font-bold text-gray-900 mb-2'>Ir al Inicio</h3>
                  <p className='text-gray-600 text-sm'>Volver a la página principal</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}