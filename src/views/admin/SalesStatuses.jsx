import React,{ useEffect, useState, useRef } from 'react'
import DivAdd from '../../components/DivAdd.jsx'
import DivTable from '../../components/DivTable.jsx'
import DivInput from '../../components/DivInput.jsx'
import Modal from '../../components/Modal.jsx'
import { confirmation, sendRequest } from '../../functions.jsx'

const SalesStatuses = () => {
  const [estados, setEstados] = useState([])
  const [id, setId] = useState('')
  const [estado, setEstado] = useState('')
  
  const [operation, setOperation] = useState('')
  const [title, setTitle] = useState('')
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')
  
  const NameInput = useRef(null)
  const close = useRef()

  let method = ''
  let url = ''
  let body = {}

  useEffect(()=>{
    getStatuses()
  },[])

  const getStatuses = async () => {
    const apiUrl = '/estados_venta'
    const res = await sendRequest('GET', '', apiUrl, '')
    setEstados(res.data)
    setClassTable('')
  }

  const deleteStatus = async (name , id) => {
    confirmation(name, `/estados_venta/${id}`, '/admin/estados_ventas')
  }

  const clear = () => {
    setEstado('')
  }

  const openModal = (op, id, e) => {
    clear()
    setTimeout( ()=> {if (NameInput.current) {
      NameInput.current.focus()
    }}, 600)
    setOperation(op)
    setId(id)
    if (op === 1) {
      setTitle('Añadir Estado')
    } else {
      setTitle('Actualizar Estado')
      setEstado(e)
    }
  }

  const save = async (e) => {
    body = {
      estado: estado
    }
    e.preventDefault()
    if (operation === 1) {
      method = 'POST'
      url = '/estados_venta'
    } else {
      method = 'PUT'
      url = `/estados_venta/${id}`
    }
    const res = await sendRequest(method, body, url, '', true)
    if (method === 'PUT' && res.status === 'SUCCESS') {
      close.current.click()
    }
    if (res.status === 'SUCCESS') {
      clear()
      getStatuses()
      setTimeout( ()=> {if (NameInput.current) {
        NameInput.current.focus()
      }}, 3000)
    }
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center' >ESTADOS DE VENTAS</h1>
      <DivAdd>
        <button type='button' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalEstados' onClick={()=> openModal(1)}>
          <i className='fa-solid fa-circle-plus'/>
          Añadir estado
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead><tr><th>#</th><th>ESTADO</th><th /><th /></tr></thead>
          <tbody className='table-group-divider'>
            {estados.map((row, index)=>(
              <tr key={row.id}>
                <td>{index+1}</td>
                <td>{row.estado}</td>
                <td>
                  <button type='button' className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalEstados' onClick={()=> openModal(2, row.id, row.estado)}>
                    <i className='fa-solid fa-pen-to-square'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-danger' onClick={()=> deleteStatus(row.estado, row.id)}>
                    <i className='fa-solid fa-trash'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
      <Modal title={title} modal='modalEstados'>
        <div className='modal-body'>
          <DivInput type='text' icon='fa-tag' value={estado} className='form-control' placeholder='Estado' required='required' handleChange={(e)=> setEstado(e.target.value)}/>
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

export default SalesStatuses