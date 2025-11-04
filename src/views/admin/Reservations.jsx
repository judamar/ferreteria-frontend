import React,{ useEffect, useState, useRef } from 'react'
import DivAdd from '../../components/DivAdd.jsx'
import DivSelect from '../../components/DivSelect.jsx'
import DivTable from '../../components/DivTable.jsx'
import DivInput from '../../components/DivInput.jsx'
import DivSearch from '../../components/DivSearch.jsx'
import Modal from '../../components/Modal.jsx'
import { confirmation, sendRequest } from '../../functions.jsx'

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
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')
  const [cedula, setCedula] = useState('')
  
  const NameInput = useRef(null)
  const close = useRef()

  let method = ''
  let url = ''
  let body = {}

  useEffect(()=>{
    getReservations()
    getUsers()
    getStatuses()
    getHerramientas()
  },[])

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

  const deleteProvider = async (name, id) => {
    confirmation(name, `/reservas/${id}`, '/admin/reservas')
  }

  const clear = () => {
    setHerramienta_maquina_id('')
    setFecha_fin('')
    setCantidad('')
    setUsuario_id('')
    setEstado_reserva_id('')
  }

  const openModal = (op, id, hid, uid, c) => {
    clear()
    setTimeout( ()=> {if (NameInput.current) {
      NameInput.current.focus()
    }}, 600)
    setOperation(op)
    setId(id)
    if (op === 1) {
      setTitle('Crear reserva')
    } else if (op === 2) {
      setTitle('Actualizar reserva')
      setHerramienta_maquina_id(hid)
      setUsuario_id(uid)
      setCantidad(c)
    } else if (op === 3) {
      setTitle('Actualizar fecha de fin')
    } else if (op === 4) {
      setTitle('Actualizar estado de reserva')
    }
  }

  const save = async (e) => {
    e.preventDefault()
    if (operation === 1) {
      method = 'POST'
      url = '/reservas'
      body = {
        usuario_id: usuario_id,
        herramienta_maquina_id: herramienta_maquina_id,
        cantidad: cantidad,
        fecha_fin: fecha_fin,
        estado_reserva_id: estado_reserva_id
      }
    } else if (operation === 2) {
      method = 'PUT'
      url = `/reservas/${id}`
      body = {
        herramientas_maquinas_id: herramienta_maquina_id,
        usuarios_id: usuario_id,
        fecha_inicio: fecha_inicio
      }
    } else if (operation === 3) {
      method = 'PATCH'
      url = `/reservas/fecha/${id}`
      body = {
        fecha_fin: fecha_fin
      }
    } else if (operation === 4) {
      method = 'PATCH'
      url = `/reservas/estado/${id}`
      body = {
        estado: estado_reserva_id
      }
    }
    const res = await sendRequest(method, body, url, '', true)
    if ((method === 'PUT' || method === 'PATCH') && res.status === 'SUCCESS') {
      close.current.click()
    }
    if (res.status === 'SUCCESS') {
      clear()
      getReservations()
      setTimeout( ()=> {if (NameInput.current) {
        NameInput.current.focus()
      }}, 3000)
    }
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center' >RESERVAS</h1>
      <DivSearch placeholder='Buscar reserva' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <DivAdd>
        <button type='button' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalReservas' onClick={()=> openModal(1)}>
          <i className='fa-solid fa-circle-plus'/>
          Registrar Reserva
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead><tr><th>#</th><th>HERRAMIENTA</th><th>CLIENTE</th><th>CEDULA</th><th>CONTACTO</th><th>CANTIDAD</th><th>FECHA INICIO</th><th>FECHA ENTREGA</th><th>DIAS FACTURADOS</th><th>$ ALQ.</th><th>$ TOTAL</th><th>ESTADO</th><th /><th /><th /><th /></tr></thead>
          <tbody className='table-group-divider'>
            {reservas.map((row, index)=>(
              <tr key={row.id}>
                <td>{index+1}</td>
                <td>{row.nombre_articulo}</td>
                <td>{row.nombre_completo}</td>
                <td>{row.cedula}</td>
                <td>{row.telefono}</td>
                <td>{row.cantidad}</td>
                <td>{row.fecha_inicio_format}</td>
                <td>{row.fecha_fin_format}</td>
                <td>{row.dias_alquiler}</td>
                <td>{row.precio_alquiler}</td>
                <td>{row.total}</td>
                <td>{row.estado}</td>
                <td>
                  <button type='button' className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalReservasUpdate' onClick={()=> openModal(2, row.id)}>
                    <i className='fa-solid fa-pen-to-square'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalReservasFechaFin' onClick={()=> openModal(3, row.id)}>
                    <i className='fa-solid fa-calendar-day'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalReservasEstado' onClick={()=> openModal(4, row.id)}>
                    <i className='fa-solid fa-tag'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-danger' onClick={()=> deleteProvider(row.id, row.id)}>
                    <i className='fa-solid fa-trash'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
      <Modal title={title} modal='modalReservas'>
        <div className='modal-body'>
          <DivSelect icon='fa-user' value={usuario_id} required='required' className='form-select' placeholder='---Cliente---' options={usuarios} sel='nombre_completo' handleChange={(e)=>setUsuario_id(e.target.value)}/>
          <DivSelect icon='fa-hammer' value={herramienta_maquina_id} required='required' className='form-select' placeholder='---Herramienta---' options={herramientas} sel='nombre_articulo' handleChange={(e)=>setHerramienta_maquina_id(e.target.value)}/>
          <label>Fecha entrega:</label>
          <DivInput icon='fa-calendar-day' type='date' value={fecha_fin} required='required' className='form-control' placeholder='Fecha entrega' handleChange={(e)=>setFecha_fin(e.target.value)}/>
          <DivInput icon='fa-hashtag' type='number' value={cantidad} required='required' className='form-control' placeholder='Cantidad alquilada' handleChange={(e)=>setCantidad(e.target.value)}/>
          <DivSelect icon='fa-tag' value={estado_reserva_id} required='required' className='form-select' placeholder='---Estado---' options={estados_reserva} sel='estado' handleChange={(e)=>setEstado_reserva_id(e.target.value)}/>
          <div className='d-grid col-10 mx-auto'>
            <button type='button' className='btn btn-success' onClick={save}>
              <i className='fa-solid fa-save'/>Guardar
            </button>
          </div>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
        </div>
      </Modal> 
      <Modal title={title} modal='modalReservasUpdate'>
        <div className='modal-body'>
          <DivSelect icon='fa-user' value={usuario_id} required='required' className='form-select' options={usuarios} sel='nombre_completo' handleChange={(e)=>setUsuario_id(e.target.value)}/>
          <DivSelect icon='fa-hammer' value={herramienta_maquina_id} required='required' className='form-select' options={herramientas} sel='nombre_articulo' handleChange={(e)=>setHerramienta_maquina_id(e.target.value)}/>
          <DivInput icon='fa-calendar-day' type='date' value={fecha_inicio} required='required' className='form-control' handleChange={(e)=>setFecha_inicio(e.target.value)}/>
          <div className='d-grid col-10 mx-auto'>
            <button type='button' className='btn btn-success' onClick={save}>
              <i className='fa-solid fa-save'/>Guardar
            </button>
          </div>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
        </div>
      </Modal>
      <Modal title={title} modal='modalReservasFechaFin'>
        <div className='modal-body'>
          <DivInput icon='fa-calendar-day' type='date' value={fecha_fin} required='required' className='form-control' handleChange={(e)=>setFecha_fin(e.target.value)}/>
          <div className='d-grid col-10 mx-auto'>
            <button type='button' className='btn btn-success' onClick={save}>
              <i className='fa-solid fa-save'/>Guardar
            </button>
          </div>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
        </div>
      </Modal>
      <Modal title={title} modal='modalReservasEstado'>
        <div className='modal-body'>
          <DivSelect icon='fa-tag' value={estado_reserva_id} required='required' className='form-select' options={estados_reserva} sel='estado' handleChange={(e)=>setEstado_reserva_id(e.target.value)}/>
          <div className='d-grid col-10 mx-auto'>
            <button type='button' className='btn btn-success' onClick={save}>
              <i className='fa-solid fa-save'/>Guardar
            </button>
          </div>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
        </div>
      </Modal>
    </div>
  )
}

export default Reservations