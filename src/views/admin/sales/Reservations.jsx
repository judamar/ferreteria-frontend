import React, {useEffect, useState, useRef} from 'react'
import DivAdd from '../../../components/DivAdd.jsx'
import DivSelect from '../../../components/DivSelect.jsx'
import DivTable from '../../../components/TableBase.jsx'
import DivInput from '../../../components/DivInput.jsx'
import DivSearch from '../../../components/DivSearch.jsx'
import Modal from '../../../components/Modal.jsx'
import {confirmation, sendRequest} from '../../../functions.jsx'

const Reservations = () => {
  const [reservas, setReservas] = useState([])
  const [id, setId] = useState('')
  const [fecha_fin, setFecha_fin] = useState('')
  const [fecha_inicio, setFecha_inicio] = useState('')
  const [cantidad, setCantidad] = useState('')

  const [usuarios, setUsuarios] = useState([])
  const [usuario_id, setUsuario_id] = useState('')

  const [herramientas, setHerramientas] = useState([])
  const [herramienta_maquina_id, setHerramienta_maquina_id] = useState('')

  const [estados_reserva, setEstados_reserva] = useState([])
  const [estado_reserva_id, setEstado_reserva_id] = useState('')

  const [operation, setOperation] = useState('')
  const [title, setTitle] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const NameInput = useRef(null)
  const close = useRef()

  let method = ''
  let url = ''
  let body = {}

  useEffect(() => {
    getReservations()
    getUsers()
    getStatuses()
    getHerramientas()
  }, [])

  const getReservations = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/reservas/herramienta/${searchTerm.trim()}` : '/reservas'
    const res = await sendRequest('GET', '', apiUrl, '')
    setReservas(res.data)
    setClassTable('')
  }

  const getUsers = async () => {
    const res = await sendRequest('GET', '', '/usuarios', '')
    setUsuarios(res.data)
  }

  const getHerramientas = async () => {
    const res = await sendRequest('GET', '', '/herramientas_maquinas', '')
    setHerramientas(res.data)
  }

  const getStatuses = async () => {
    const res = await sendRequest('GET', '', '/estados_reserva', '')
    setEstados_reserva(res.data)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getReservations();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const deleteReservation = async (name, id) => {
    confirmation(name, `/reservas/${id}`, '/admin/reservas')
  }

  const clear = () => {
    setHerramienta_maquina_id('')
    setFecha_fin('')
    setCantidad('')
    setUsuario_id('')
    setEstado_reserva_id('')
  }

  const openModal = (op, id, hid, uid, c, fecha, estado) => {
    clear()
    setIsModalOpen(true)

    setTimeout(() => {
      if (NameInput.current) {
        NameInput.current.focus()
      }
    }, 300)

    setOperation(op)
    setId(id)

    if (op === 1) {
      setTitle('Crear reserva')
    } else if (op === 2) {
      setTitle('Actualizar reserva')
      setHerramienta_maquina_id(hid)
      setUsuario_id(uid)
      setCantidad(c)

      let formattedDate = ''
      if (fecha && fecha.includes('/')) {
        const [day, month, year] = fecha.split('/')
        formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      } else if (fecha) {
        formattedDate = new Date(fecha).toISOString().split('T')[0]
      }

      setFecha_fin(formattedDate)
      setEstado_reserva_id(estado)
    } else if (op === 3) {
      setTitle('Actualizar fecha de fin')
    } else if (op === 4) {
      setTitle('Actualizar estado de reserva')
    }
  }



  const closeModal = () => {
    setIsModalOpen(false)
  }

  const save = async (e) => {
    e.preventDefault()

    let method, url, body

    // format date
    let formattedFechaFin = fecha_fin
    if (fecha_fin && fecha_fin.includes('-')) {
      const [year, month, day] = fecha_fin.split('-')
      formattedFechaFin = `${day}/${month}/${year}`
    }

    if (operation === 1) {
      method = 'POST'
      url = '/reservas'
      body = {
        usuario_id,
        herramienta_maquina_id,
        cantidad,
        fecha_fin: formattedFechaFin,
        estado_reserva_id
      }
    } else if (operation === 2) {
      method = 'PUT'
      url = `/reservas/${id}`
      body = {
        usuario_id,
        herramienta_maquina_id,
        cantidad,
        fecha_fin: formattedFechaFin,
        estado_reserva_id
      }
    }

    const res = await sendRequest(method, body, url, '', true)

    if (res.status === 'SUCCESS') {
      close.current?.click()
      clear()
      getReservations()
      setTimeout(() => {
        NameInput.current?.focus()
      }, 3000)
    }
  }


  return (
    <div className='container mx-auto px-4 py-6'>
      <div className="mb-8 text-center">
        <h1 className="title-h2">
          RESERVAS
        </h1>
        <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"/>
      </div>

      <div className="max-w-7xl mx-auto mb-6 flex">
        <DivSearch
          placeholder='Buscar reserva'
          handleChange={handleSearchChange}
          value={searchTerm}
          handleSearchSubmit={handleSearchSubmit}>
          <button
            type="button"
            className="button-add"
            onClick={() => openModal(1)}>
            <i className="icon-[material-symbols--add-circle-outline] text-xl"/>
            <span className="hidden sm:inline">Crear Reserva</span>
          </button>

        </DivSearch>
      </div>

      <div className="max-w-10xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className={`overflow-auto ${classTable}`}>
            <table className="w-full">
              <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">#
                </th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">HERRAMIENTA</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">CLIENTE</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">CEDULA</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">CONTACTO</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">CANTIDAD</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">F. INICIO</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">F. ENTREGA</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">DIAS FACTURADOS</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">$ ALQ.</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">$ TOTAL</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">ESTADO</th>
                <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider text-center">Acciones</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {reservas.map((row, index) => (
                <tr key={row.id || index} className="hover:bg-gray-200 dark:bg-gray-150">
                  <td className="py-1.5 px-6 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td
                    className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.nombre_articulo}</td>
                  <td
                    className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.nombre_completo}</td>
                  <td className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.cedula}</td>
                  <td className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.telefono}</td>
                  <td className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.cantidad}</td>
                  <td
                    className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.fecha_inicio_format}</td>
                  <td
                    className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.fecha_fin_format}</td>
                  <td
                    className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.dias_alquiler}</td>
                  <td
                    className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{new Intl.NumberFormat("es-CO").format(row.precio_alquiler)}</td>
                  <td
                    className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{new Intl.NumberFormat("es-CO").format(row.total)}</td>
                  <td className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.estado}</td>
                  <td className="py-1.5 px-6 text-center flex gap-2">
                    <button
                      type='button'
                      className='bg-yellow-500 hover:bg-yellow-600 text-white w-full p-1.5 rounded-lg transition-all duration-200 shadow hover:shadow-lg transform'
                      onClick={() => openModal(2, row.id, row.herramienta_maquina_id, row.usuario_id, row.cantidad, row.fecha_fin_format, row.estado_reserva_id)}>
                      <i className='fa-solid fa-pen-to-square'/>
                    </button>
                    <button
                      type='button'
                      className='bg-red-600 hover:bg-red-700 text-white w-full p-1.5 rounded-lg transition-all duration-200 shadow hover:shadow-lg transform hover:scale-105'
                      onClick={() => deleteReservation(row.id)}>
                      <i className='fa-solid fa-trash'/>
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={title}>
        <form onSubmit={save} className="flex flex-col gap-4">
          <DivSelect
            icon='icon-[lineicons--customer] text-gray-900 text-2xl'
            label='Cliente'
            value={usuario_id}
            required='required'
            placeholder='Selecciona un cliente'
            options={usuarios}
            sel='nombre_completo'
            handleChange={(e) => setUsuario_id(e.target.value)}
            ref={NameInput}
          />

          <DivSelect
            icon='icon-[material-symbols--tools-power-drill-outline-sharp]'
            label='Herramienta'
            value={herramienta_maquina_id}
            required='required'
            placeholder='Selecciona una herramienta'
            options={herramientas}
            sel='nombre_articulo'
            handleChange={(e) => setHerramienta_maquina_id(e.target.value)}
          />

          <DivInput
            icon='icon-[fluent-mdl2--quantity]'
            label='Cantidad'
            type='number'
            value={cantidad}
            required='required'
            placeholder='Cantidad a alquilar'
            handleChange={(e) => setCantidad(e.target.value)}
          />

          <DivInput
            icon='icon-[uiw--date]'
            label='Fecha de Entrega'
            type='date'
            value={fecha_fin}
            required='required'
            placeholder='Fecha de entrega'
            handleChange={(e) => setFecha_fin(e.target.value)}
          />

          <DivSelect
            icon='icon-[hugeicons--sale-tag-01]'
            label='Estado'
            value={estado_reserva_id}
            required='required'
            placeholder='Selecciona un estado'
            options={estados_reserva}
            sel='estado'
            handleChange={(e) => setEstado_reserva_id(e.target.value)}
          />

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200">
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold w-full py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <i className="icon-[material-symbols--save-outline] text-xl"/>
              {operation === 1 ? 'Crear Reserva' : 'Actualizar Reserva'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Reservations