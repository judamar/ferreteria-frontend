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
      <div className='container-fluid'>
        <div className='row mt-5'>
          <div className='col-md-4 offset-md-4'>
            <div className='card border border-danger'>
              <div className="card-header bg-danger border border-danger text-white">
                DEJAR SUGERENCIA
              </div>
              <div className='card-body'>
                <form onSubmit={handleSubmit}>
                  <DivInput type='text' icon='fa-message' value={message} className='form-control h-50' placeholder='Mensaje de sugerencia' required='required' handleChange={(e)=> setMessage(e.target.value)}/>
                  <div className='d-grid col-10 mx-auto'>
                    <button type='submit' className='btn btn-danger'>
                      <i className='fa-solid fa-paper-plane'/> Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    ): (
      <div className='container-fluid'>
        <div className='row mt-5'>
          <div className='col-md-4 offset-md-4'>
            <div className='card border border-danger'>
              <div className="card-header bg-danger border border-danger text-white">
                DEJAR SUGERENCIA
              </div>
              <div className='card-body'>
                <p className='text-center'>Para poder dejar una sugerencia debes iniciar sesión</p>
              </div>
              <div className='card-footer'>
                <Link to='/login'>
                  <button type='button' className='btn btn-danger'>
                    <i className='fa-solid fa-door-open'/> Iniciar Sesión
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> 
    )
  )
}

export default PublicSuggestion