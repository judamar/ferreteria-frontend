import React,{ useEffect, useState, useRef } from 'react'
import DivAdd from '../../components/DivAdd.jsx'
import DivTable from '../../components/DivTable.jsx'
import DivInput from '../../components/DivInput.jsx'
import DivSearch from '../../components/DivSearch.jsx'
import Modal from '../../components/Modal.jsx'
import { confirmation, sendRequest } from '../../functions.jsx'

const Users = () => {
  const [usuarios, setUsuarios] = useState([])
  const [id, setId] = useState('')
  const [cedula, setCedula] = useState('')
  const [nombre_completo, setNombre_completo] = useState('')
  const [correo_electronico, setCorreo_electronico] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [password, setPassword] = useState('')
  
  const [operation, setOperation] = useState('')
  const [title, setTitle] = useState('')
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')
  
  const NameInput = useRef(null)
  const close = useRef()

  let method = ''
  let url = ''
  let body = {}

  useEffect(()=>{
    getUsers()
  },[])

  const getUsers = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/usuarios/cedula/${searchTerm.trim()}` : '/usuarios'
    const res = await sendRequest('GET', '', apiUrl, '')
    setUsuarios(res.data)
    setClassTable('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getUsers();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const deleteUser = async (name , id) => {
    confirmation(name, `/usuarios/${id}`, '/admin/usuarios')
  }

  const clear = () => {
    setCedula('')
    setNombre_completo('')
    setCorreo_electronico('')
    setTelefono('')
    setDireccion('')
    setPassword('')
  }

  const openModal = (op, u, c, nc, ce, t, d, p) => {
    clear()
    setTimeout( ()=> {if (NameInput.current) {
      NameInput.current.focus()
    }}, 600)
    setOperation(op)
    setId(u)
    if (op === 1) {
      setTitle('Registrar usuario')
    } else if (op === 2) {
      setTitle('Cambiar contraseña')
    } else {
      setTitle('Actualizar usuario')
      setCedula(c)
      setNombre_completo(nc)
      setCorreo_electronico(ce)
      setTelefono(t)
      setDireccion(d)
      setPassword(p)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    if (operation === 1) {
      method = 'POST'
      url = '/usuarios/signup'
      body = {
        cedula: cedula,
        nombre_completo: nombre_completo,
        correo_electronico: correo_electronico,
        telefono: telefono,
        direccion: direccion,
        password: password
      }
    } else if (operation === 2) {
      method = 'PATCH'
      url = `/usuarios/${id}`
      body = {
        password: password
      }
      console.log(body)
    } else if (operation === 3){
      method = 'PUT'
      url = `/usuarios/${id}`
      body = {
        cedula: cedula,
        nombre_completo: nombre_completo,
        correo_electronico: correo_electronico,
        telefono: telefono,
        direccion: direccion
      }
    }
    const res = await sendRequest(method, body, url, '', true)
    if ((method === 'PUT' || method === 'PATCH') && res.status === 'SUCCESS') {
      close.current.click()
    }
    if (res.status === 'SUCCESS') {
      clear()
      getUsers()
      setTimeout( ()=> {if (NameInput.current) {
        NameInput.current.focus()
      }}, 3000)
    }
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center' >USUARIOS</h1>
      <DivSearch placeholder='Buscar usuario por cedula' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <DivAdd>
        <button type='button' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalUsuarios' onClick={()=> openModal(1)}>
          <i className='fa-solid fa-circle-plus'/>
          Registrar usuario
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead><tr><th>#</th><th>CEDULA</th><th>NOMBRE</th><th>E-MAIL</th><th>TELEFONO</th><th>DIRECCION</th><th /><th /><th /></tr></thead>
          <tbody className='table-group-divider'>
            {usuarios.map((row, index)=>(
              <tr key={row.id}>
                <td>{index+1}</td>
                <td>{row.cedula}</td>
                <td>{row.nombre_completo}</td>
                <td>{row.correo_electronico}</td>
                <td>{row.telefono}</td>
                <td>{row.direccion}</td>
                <td>
                  <button type='button' className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalUsuariosUpdate' onClick={()=> openModal(3, row.id, row.cedula, row.nombre_completo, row.correo_electronico, row.telefono, row.direccion)}>
                    <i className='fa-solid fa-pen-to-square'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-info' data-bs-toggle='modal' data-bs-target='#modalUpdatePassword' onClick={()=> openModal(2, row.id)}>
                    <i className='fa-solid fa-key'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-danger' onClick={()=> deleteUser(row.nombre_completo, row.id)}>
                    <i className='fa-solid fa-trash'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
      <Modal title={title} modal='modalUsuarios'>
        <div className='modal-body'>
          <DivInput type='number' icon='fa-at' value={cedula} className='form-control' placeholder='Cédula' required='required' handleChange={(e)=> setCedula(e.target.value)}/>
          <DivInput type='text' icon='fa-user' value={nombre_completo} className='form-control' placeholder='Nombre Completo' required='required' handleChange={(e)=> setNombre_completo(e.target.value)}/>
          <DivInput type='email' icon='fa-envelope' value={correo_electronico} className='form-control' placeholder='Correo Electrónico' handleChange={(e)=> setCorreo_electronico(e.target.value)}/>
          <DivInput type='text' icon='fa-phone' value={telefono} className='form-control' placeholder='Teléfono' required='required' handleChange={(e)=> setTelefono(e.target.value)}/>
          <DivInput type='text' icon='fa-location-dot' value={direccion} className='form-control' placeholder='Dirección' handleChange={(e)=> setDireccion(e.target.value)}/>
          <DivInput type='password' icon='fa-key' value={password} className='form-control' placeholder='Contraseña' required='required' handleChange={(e)=> setPassword(e.target.value)}/>
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
      <Modal title={title} modal='modalUsuariosUpdate'>
        <div className='modal-body'>
          <DivInput type='number' icon='fa-at' value={cedula} className='form-control' placeholder='Cédula' required='required' handleChange={(e)=> setCedula(e.target.value)}/>
          <DivInput type='text' icon='fa-user' value={nombre_completo} className='form-control' placeholder='Nombre Completo' required='required' handleChange={(e)=> setNombre_completo(e.target.value)}/>
          <DivInput type='email' icon='fa-envelope' value={correo_electronico} className='form-control' placeholder='Correo Electrónico' handleChange={(e)=> setCorreo_electronico(e.target.value)}/>
          <DivInput type='text' icon='fa-phone' value={telefono} className='form-control' placeholder='Teléfono' required='required' handleChange={(e)=> setTelefono(e.target.value)}/>
          <DivInput type='text' icon='fa-location-dot' value={direccion} className='form-control' placeholder='Dirección' handleChange={(e)=> setDireccion(e.target.value)}/>
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
      <Modal title={title} modal='modalUpdatePassword'>
        <div className='modal-body'>
          <DivInput type='password' icon='fa-key' value={password} className='form-control' placeholder='Nueva contraseña' required='required' handleChange={(e)=> setPassword(e.target.value)}/>
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

export default Users