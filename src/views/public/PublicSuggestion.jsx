import React, { useState } from 'react'
import DivInput from '../../components/DivInput'
import storage from '../../storage/storage'
import { Link } from 'react-router-dom'
import { sendRequest } from '../../functions'

const PublicSuggestion = () => {
  const [message, setMessage] = useState('')

  const user = storage.get('authUser')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      usuarios_id: user.id,
      mensaje: message,
    }
    await sendRequest('POST', body, '/sugerencias', '')
  }

  return (
    user ? (
      <div className='container mx-auto p-6 flex flex-col items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200'>
          {/* Header tipo email */}
          <div className="bg-red-600 text-white py-3 px-8">
            <div className='flex items-center gap-3 mb-2'>
              <i className='icon-[material-symbols--mail-outline] text-4xl'/>
              <h3 className="text-3xl font-bold">Buzón de Sugerencias</h3>
            </div>
            <p className='text-red-100 text-sm'>Tu opinión nos ayuda a mejorar cada día</p>
          </div>

          {/* Cuerpo del email */}
          <div className='p-5'>
            <form onSubmit={handleSubmit} className='space-y-2'>
              {/* Campo De: (usuario actual) */}
              <div className='border-b border-gray-200 pb-4'>
                <div className='flex items-center gap-3'>
                  <label className='text-gray-600 font-semibold min-w-20'>De:</label>
                  <div className='flex items-center gap-2 text-gray-900'>
                    <i className='icon-[material-symbols--person] text-xl text-red-600'/>
                    <span className='text-lg'>{user.nombre}</span>
                  </div>
                </div>
              </div>

              {/* Campo Para: */}
              <div className='border-b border-gray-200 pb-4'>
                <div className='flex items-center gap-3'>
                  <label className='text-gray-600 font-semibold min-w-20'>Para:</label>
                  <div className='flex items-center gap-2 text-gray-900'>
                    <i className='icon-[material-symbols--support-agent] text-xl text-red-600'/>
                    <span className='text-lg'>Equipo de Administración</span>
                  </div>
                </div>
              </div>

              {/* Campo Asunto: */}
              <div className='border-b border-gray-200 pb-4'>
                <div className='flex items-center gap-3'>
                  <label className='text-gray-600 font-semibold min-w-20'>Asunto:</label>
                  <span className='text-gray-900 text-lg font-medium'>Nueva Sugerencia</span>
                </div>
              </div>

              {/* Área de mensaje */}
              <div className='mt-6'>
                <div className='relative'>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Escribe tu sugerencia aquí...'
                required
                rows={4}
                className='w-full px-4 py-4 border-2 text-gray-900 text-base border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all duration-200 resize-none'
              />
                  <div className='absolute bottom-3 right-3 text-gray-400 text-sm'>
                    {message.length} caracteres
                  </div>
                </div>
              </div>

              {/* Botón enviar */}
              <div className='flex justify-between items-center pt-4 border-t border-gray-200'>
                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                  <i className='icon-[material-symbols--info-outline]'/>
                  <span>Tu sugerencia será revisada por nuestro equipo</span>
                </div>
                <button
                  type='submit'
                  className='bg-red-600 text-white font-bold py-3 px-10 rounded-lg transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                >
                  <i className='icon-[material-symbols--send] text-xl'/>
                  Enviar Sugerencia
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    ): (
      <div className='container mx-auto p-6 flex flex-col items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200'>
          {/* Header */}
          <div className="bg-red-600 text-white py-6 px-8">
            <div className='flex items-center gap-3 mb-2'>
              <i className='icon-[material-symbols--mail-outline] text-4xl'/>
              <h3 className="text-3xl font-bold">Buzón de Sugerencias</h3>
            </div>
            <p className='text-red-100 text-sm'>Tu opinión nos ayuda a mejorar cada día</p>
          </div>

          {/* Cuerpo */}
          <div className='p-12 text-center'>
            <div className='mb-8'>
              <div className='inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6'>
                <i className='icon-[material-symbols--lock-outline] text-5xl text-red-600'/>
              </div>
              <h4 className='text-2xl font-bold text-gray-900 mb-4'>Acceso Restringido</h4>
              <p className='text-gray-600 text-lg mb-2'>Para poder enviar una sugerencia necesitas iniciar sesión</p>
              <p className='text-gray-500 text-sm'>Si no tienes una cuenta, puedes registrarte fácilmente</p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Link to='/login'>
                <button
                  type='button'
                  className='bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                >
                  <i className='icon-[material-symbols--login] text-xl'/>
                  Iniciar Sesión
                </button>
              </Link>
              <Link to='/register'>
                <button
                  type='button'
                  className='bg-white border-2 border-red-600 text-red-600 hover:bg-red-100 font-bold py-3 px-8 rounded-lg transition-all duration-200 flex items-center gap-2'
                >
                  <i className='icon-[material-symbols--person-add] text-xl'/>
                  Registrarse
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default PublicSuggestion