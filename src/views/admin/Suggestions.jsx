import React,{ useEffect, useState, useRef } from 'react'
import { confirmation, sendRequest } from '../../functions.jsx'
import SuggestionCard from '../../components/SuggestionCard.jsx'

const Suggestions = () => {
  const [sugerencias, setSugerencias] = useState([])

  useEffect(() => {
    getSugerencias()
  }, [])

  const getSugerencias = async () => {
    const res = await sendRequest('GET', '', '/sugerencias', '')
    setSugerencias(res.data)
  }

  const deleteSugerencia = async (id) => {
    confirmation('', `/sugerencias/${id}`, '/admin/sugerencias')
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center' >SUGERENCIAS</h1>
      <div className='row'>
        {sugerencias.map((row) => (
          <div key={row.id} className='col-md-3 mb-4'>
            <SuggestionCard username={row.nombre_completo} message={row.mensaje} handleClick={() => deleteSugerencia(row.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Suggestions