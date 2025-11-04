import React,{ useEffect, useState, useRef } from 'react'
import DivAdd from '../../components/DivAdd.jsx'
import DivTable from '../../components/DivTable.jsx'
import DivSelect from '../../components/DivSelect.jsx'
import DivInput from '../../components/DivInput.jsx'
import DivSearch from '../../components/DivSearch.jsx'
import Modal from '../../components/Modal.jsx'
import { confirmation, sendRequest } from '../../functions.jsx'

const Tools = () => {
  const [herramientas, setHerramientas] = useState([])
  const [id, setId] = useState('')
  const [nombre_articulo, setNombre_articulo] = useState('')
  const [image, setImage] = useState(null)
  const [descripcion, setDescripcion] = useState('')
  const [precio_alquiler, setPrecio_alquiler] = useState('')
  const [cantidad_disponible, setCantidad] = useState('')
  const [estados_id, setEstados_id] = useState('')

  const [estados, setEstados] = useState([])
  
  const [operation, setOperation] = useState('')
  const [title, setTitle] = useState('')
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')
  
  const NameInput = useRef()
  const close = useRef()

  let method = ''
  let url = ''
  let body = null
  let bodyform = {}
  let isFormData = false

  useEffect(()=>{
    getHerramientas()
    getStates()
  },[])

  const getHerramientas = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/herramientas_maquinas/search/${searchTerm.trim()}` : '/herramientas_maquinas'
    const res = await sendRequest('GET', '', apiUrl, '')
    setHerramientas(res.data)
    setClassTable('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getHerramientas();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file)
  }

  const deleteProduct = async (id) => {
    confirmation(id, `/herramientas_maquinas/${id}`, '/admin/herramientas')
  }

  const clear = () => {
    setImage(null)
    setNombre_articulo('')
    setDescripcion('')
    setPrecio_alquiler('')
    setCantidad('')
    setEstados_id('')
  }

  const getStates = async () => {
    const res = await sendRequest('GET', '', '/estados_herramienta_maquina', '')
    setEstados(res.data)
  }

  const openModal = (op, id, n, d, p, c, e) => {
    clear()
    setTimeout( ()=> NameInput.current.focus(), 600)
    setOperation(op)
    setId(id)
    if (op === 1) {
      setTitle('Agregar Herramienta')
    } else if (op === 2) {
      setTitle('Actualizar imagen')
    } else if (op === 3) {
      setTitle('Actualizar Herramienta')
      setNombre_articulo(n)
      setDescripcion(d)
      setPrecio_alquiler(p)
      setCantidad(c)
    } else if (op === 4) {
      setTitle('Cambiar estado')
      setEstados_id(e)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (operation === 1) {
      method = 'POST'
      url = '/herramientas_maquinas'
      isFormData = true
      formData.append('nombre_articulo', nombre_articulo)
      formData.append('descripcion', descripcion)
      formData.append('precio_alquiler', precio_alquiler)
      formData.append('cantidad_disponible', cantidad_disponible)
      formData.append('estados_herramientas_maquinas_id', estados_id)
      formData.append('image', image)
    } else if (operation === 2) {
      method = 'PATCH'
      url = `/herramientas_maquinas/${id}`
      isFormData = true
      formData.append('image', image)
    } else if (operation === 3){
      method = 'PUT'
      url = `/herramientas_maquinas/${id}`
      bodyform = {
        nombre_articulo: nombre_articulo,
        descripcion: descripcion,
        precio_alquiler: precio_alquiler,
        cantidad_disponible: cantidad_disponible
      }
    } else if (operation === 4) {
      method = 'PATCH'
      url = `/herramientas_maquinas/state/${id}`
      bodyform = {
        estado: estados_id
      }
    }
    if (operation === 3 || operation === 4) {
      body = bodyform
    } else {
      body = formData
    }
    console.log(body)
    const res = await sendRequest(method, body, url, '', true, isFormData)
    if ((method === 'PUT' || method === 'PATCH') && res.status === 'SUCCESS') {
      close.current.click()
    }
    if (res.status === 'SUCCESS') {
      clear()
      getHerramientas()
      setTimeout(() => NameInput.current.focus(), 3000)
    }
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center' >HERRAMIENTAS</h1>
      <DivSearch placeholder='Buscar herramientas' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <DivAdd>
        {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
        <button className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalHerramientas' onClick={()=> openModal(1)}>
          <i className='fa-solid fa-circle-plus'/>
          Añadir Herramienta - Maquina
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead><tr><th>#</th><th>HERRAMIENTA</th><th>PRECIO/DIA</th><th>CANTIDAD</th><th>ESTADO</th><th /><th /><th /></tr><tr/></thead>
          <tbody className='table-group-divider'>
            {herramientas.map((row, index)=>(
              <tr key={row.id}>
                <td>{index+1}</td>
                <td>{row.nombre_articulo}</td>
                <td>{`$${row.precio_alquiler}`}</td>
                <td>{row.cantidad_disponible}</td>
                <td>{row.estado}</td>
                <td>
                  <button type='button' className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalHerramientasUpdate' onClick={()=> openModal(3, row.id, row.nombre_articulo, row.descripcion, row.precio_alquiler, row.cantidad_disponible)}>
                    <i className='fa-solid fa-pen-to-square'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-info' data-bs-toggle='modal' data-bs-target='#modalHerramientasImg' onClick={()=> openModal(2, row.id)}>
                    <i className='fa-solid fa-image'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalHerramientasState' onClick={()=> openModal(4, row.id, row.nombre_articulo, row.descripcion, row.precio_alquiler, row.cantidad_disponible, row.estado_id)}>
                    <i className='fa-solid fa-tag'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-danger' onClick={()=> deleteProduct(row.id)}>
                    <i className='fa-solid fa-trash'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
      <Modal title={title} modal='modalHerramientas'>
        <div className='modal-body'>
          <DivInput type='text' icon='fa-wrench' value={nombre_articulo} className='form-control' placeholder='Nombre Herramienta - Maquina' required='required' ref={NameInput} handleChange={(e)=>setNombre_articulo(e.target.value)}/>
          <DivInput type='text' icon='fa-file-lines' value={descripcion} className='form-control' placeholder='Descripcion' required='required' handleChange={(e)=>setDescripcion(e.target.value)}/>
          <DivInput type='number' icon='fa-dollar-sign' value={precio_alquiler} className='form-control' placeholder='Precio alquiler en dias' required='required' handleChange={(e)=>setPrecio_alquiler(e.target.value)}/>
          <DivInput type='number' icon='fa-box' value={cantidad_disponible} className='form-control' placeholder='Cantidad disponible' required='required' handleChange={(e)=>setCantidad(e.target.value)}/>
          <DivSelect icon='fa-tag' value={estados_id} required='required' className='form-select' options={estados} sel='estado' handleChange={(e)=>setEstados_id(e.target.value)}/>
          <form encType='multipart/form-data' className='input-group mb-3'>
            <span className='input-group-text'>
              <i className='fa-solid fa-image'/>
            </span>
            <input type="file" name="imagen" onChange={handleFileChange} required='required' className='form-control' placeholder='Imagen'/>
          </form>
          <div className='d-grid col-10 mx-auto'>
            {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className='btn btn-success' onClick={save}>
              <i className='fa-solid fa-save'/>Guardar
            </button>
          </div>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
        </div>
      </Modal>
      <Modal title={title} modal='modalHerramientasUpdate'>
        <div className='modal-body'>
        <DivInput type='text' icon='fa-wrench' value={nombre_articulo} className='form-control' placeholder='Nombre Herramienta - Maquina' required='required' ref={NameInput} handleChange={(e)=>setNombre_articulo(e.target.value)}/>
          <DivInput type='text' icon='fa-file-lines' value={descripcion} className='form-control' placeholder='Descripcion' required='required' handleChange={(e)=>setDescripcion(e.target.value)}/>
          <DivInput type='number' icon='fa-dollar-sign' value={precio_alquiler} className='form-control' placeholder='Precio alquiler en dias' required='required' handleChange={(e)=>setPrecio_alquiler(e.target.value)}/>
          <DivInput type='number' icon='fa-box' value={cantidad_disponible} className='form-control' placeholder='Cantidad disponible' required='required' handleChange={(e)=>setCantidad(e.target.value)}/>
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
      <Modal title={title} modal='modalHerramientasImg'>
        <div className='modal-body'>
          <form encType='multipart/form-data' className='input-group mb-3'>
            <span className='input-group-text'>
              <i className='fa-solid fa-image'/>
            </span>
            <input type="file" name="imagen" onChange={handleFileChange} required='required' className='form-control' placeholder='Imagen'/>
          </form>
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
      <Modal title={title} modal='modalHerramientasState'>
        <div className='modal-body'>
          <DivSelect icon='fa-tag' value={estados_id} required='required' className='form-select' options={estados} sel='estado' handleChange={(e)=>setEstados_id(e.target.value)}/>
          <div className='d-grid col-10 mx-auto'>
            <button type='button' className='btn btn-success' onClick={save}>
              <i className='fa-solid fa-save'/>Guardar
            </button>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Tools