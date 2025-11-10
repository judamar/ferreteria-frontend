import React, {useEffect, useState, useRef} from 'react'
import DivAdd from '../../../components/DivAdd.jsx'
import DivTable from '../../../components/TableBase.jsx'
import DivInput from '../../../components/DivInput.jsx'
import Modal from '../../../components/Modal.jsx'
import {confirmation, sendRequest} from '../../../functions.jsx'
import DivSearch from "../../../components/DivSearch.jsx";

const ToolsStatuses = () => {
  const [estados, setEstados] = useState([])
  const [id, setId] = useState('')
  const [estado, setEstado] = useState('')

  const [operation, setOperation] = useState('')
  const [title, setTitle] = useState('')
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const NameInput = useRef(null)
  const close = useRef()

  let method = ''
  let url = ''
  let body = {}

  useEffect(() => {
    getStatuses()
  }, [])

  const getStatuses = async () => {
    const apiUrl = '/estados_herramienta_maquina'
    const res = await sendRequest('GET', '', apiUrl, '')
    setEstados(res.data)
    setClassTable('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getStatuses();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const deleteStatus = async (name, id) => {
    confirmation(name, `/estados_herramienta_maquina/${id}`, '/admin/estados_herramientas')
  }

  const clear = () => {
    setEstado('')
  }

  const openModal = (op, id, e) => {
    clear()
    setIsModalOpen(true)
    setTimeout(() => {
      if (NameInput.current) {
        NameInput.current.focus()
      }
    }, 600)
    setOperation(op)
    setId(id)
    if (op === 1) {
      setTitle('Añadir Estado')
    } else {
      setTitle('Actualizar Estado')
      setEstado(e)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const save = async (e) => {
    body = {
      estado: estado
    }
    e.preventDefault()
    if (operation === 1) {
      method = 'POST'
      url = '/estados_herramienta_maquina'
    } else {
      method = 'PUT'
      url = `/estados_herramienta_maquina/${id}`
    }
    const res = await sendRequest(method, body, url, '', true)
    if (method === 'PUT' && res.status === 'SUCCESS') {
      close.current.click()
    }
    if (res.status === 'SUCCESS') {
      clear()
      getStatuses()
      setTimeout(() => {
        if (NameInput.current) {
          NameInput.current.focus()
        }
      }, 3000)
    }
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className="mb-8">
        <h1 className='text-4xl font-bold text-gray-900 text-center mb-1.5'>
          ESTADOS DE HERRAMIENTAS
        </h1>
        <div className='w-48 h-1 bg-red-600 mx-auto rounded-full'></div>
      </div>

      <div className="max-w-7xl mx-auto mb-6 flex">
        <DivSearch
          placeholder="Buscar estados"
          handleChange={handleSearchChange}
          value={searchTerm}
          handleSearchSubmit={handleSearchSubmit}>
          <button
            type='button'
            className="button-add"
            onClick={() => openModal(1)}>
            <i className="icon-[material-symbols--add-circle-outline] text-xl"/>
            Añadir estado
          </button>
        </DivSearch>
      </div>

      <div className='max-w-6xl mx-auto'>
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${classLoad}`}>
          <div className={`overflow-x-auto ${classTable}`}>
            <table className='w-full'>
              <thead className="bg-red-600 text-white">
              <tr>
                <th className='py-4 px-6 text-left font-bold text-sm uppercase tracking-wider'>#</th>
                <th className='py-4 px-6 text-left font-bold text-sm uppercase tracking-wider'>ESTADO</th>
                <th className='py-4 px-6 text-center font-bold text-sm uppercase tracking-wider w-24'>Editar</th>
                <th className='py-4 px-6 text-center font-bold text-sm uppercase tracking-wider w-24'>Eliminar</th>
              </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
              {estados.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors buration-50">
                  <td className="py-2 px-6 text-gray-900 text-base">{index + 1}</td>
                  <td className="py-2 px-6 text-gray-900 text-base">{row.estado}</td>
                  <td className="py-2 px-6 text-center">
                    <button
                      type='button'
                      className='bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-all duration-200 shadow hover:shadow-lg transform hover:scale-105'
                      onClick={() => openModal(2, row.id, row.estado)}>
                      <i className='icon-[material-symbols--edit-outline] text-xl'/>
                    </button>
                  </td>
                  <td className="py-2 px-6 text-center">
                    <button
                      type='button'
                      className='bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all duration-200 shadow hover:shadow-lg transform hover:scale-105'
                      onClick={() => deleteStatus(row.estado, row.id)}>
                      <i className='icon-[material-symbols--delete-outline] text-xl'/>
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={title}>
          <DivInput
            label="Estado"
            type="text"
            icon="icon-[material-symbols--label-outline]"
            value={estado}
            placeholder="Estado"
            required="required"
            handleChange={(e) => setEstado(e.target.value)}
          />
          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold w-full py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={save}>
              <i className="icon-[material-symbols--save-outline] text-xl" />
              Guardar
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ToolsStatuses