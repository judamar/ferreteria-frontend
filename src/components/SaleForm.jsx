import React, { useEffect, useState } from 'react'
import DivInput from './DivInput.jsx'
import DivSelect from './DivSelect.jsx'
import DivTable from './DivTable.jsx'
import { sendRequest } from '../functions.jsx'

const SaleForm = (params) => {
  const [usuarios, setUsuarios] = useState([])
  const [estados, setEstados] = useState([])
  const [productos, setProductos] = useState([])

  const [detalle_venta, setDetalle_venta] = useState([])
  const [products_List, setProducts_List] = useState([])

  const [usuario_id, setUsuario_id] = useState('')
  const [estado_id, setEstado_id] = useState('')
  const [tipo, setTipo] = useState('')
  const [producto_id, setProducto_id] = useState('')
  const [cantidad, setCantidad] = useState('')

  const [required, setRequired] = useState('required')

  let ventaId = 0

  useEffect(() => {
    getUsuarios()
    getEstados()
    getProductos()
  }, [])

  const getUsuarios = async () => {
    const res = await sendRequest('GET', '', '/usuarios', '')
    setUsuarios(res.data)
  }
  const getEstados = async () => {
    const res = await sendRequest('GET', '', '/estados_venta', '')
    setEstados(res.data)
  }
  const getProductos = async () => {
    const res = await sendRequest('GET', '', '/productos', '')
    setProductos(res.data)
  }

  const handleChangeType = (e) => {
    setTipo(e.target.value)
  }

  const calculateTotal = () => {
    let total = 0
    products_List.forEach((product) => {
      total += product.product_price * product.quantity;
    })
    return total
  }

  const deleteFromLists = (index) => {
    const newList = [...products_List]
    newList.splice(index, 1)
    setProducts_List(newList)
    const newDetail = [...detalle_venta]
    newDetail.splice(index, 1)
    setDetalle_venta(newDetail)
  }

  const saveSale = async (e) => {
    e.preventDefault()
    const bodySale = {
      usuarios_id: usuario_id,
      estados_ventas_id: estado_id,
      tipo: tipo
    }
    const res = await sendRequest('POST', bodySale, '/ventas', '')
    ventaId = res.data.insertId
  }

  const saveDetail = async (e) => {
    e.preventDefault()
    const bodyDetail = {
      ventas_id: ventaId,
      productos_id: producto_id,
      cantidad_vendida: cantidad
    }

    const res = await sendRequest('GET', '', `/productos/id/${producto_id}`, '')
    if (res.status === 'SUCCESS') {
      const producto = res.data
      const productsList = {
        product_name: producto[0].nombre_producto,
        product_price: producto[0].precio,
        quantity: cantidad
      }
      setProducts_List([...products_List, productsList])
    }

    setDetalle_venta([...detalle_venta, bodyDetail])
    setProducto_id('')
    setCantidad('')
  }

  const save = async (e) => {
    e.preventDefault()
    await saveSale(e)
    setTimeout(5000)
    Promise.all(detalle_venta.map(async (item) => {
      item.ventas_id = ventaId
      await sendRequest('POST', item, '/detalles_ventas', '/admin/ventas')
    }))
    clear()
  }

  const clear = () => {
    setDetalle_venta([])
    setProducts_List([])
    setProducto_id('')
    setCantidad('')
    setUsuario_id('')
    setEstado_id('')
    setTipo('')
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center' >CREAR ORDEN</h1>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <div className="card border border-danger">
            <div className="card-header bg-danger text-white border border-danger">
              {params.title}
            </div>
            <div className="card-body">
              <form onSubmit={save}>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value='FACTURA DE VENTA' onChange={handleChangeType}/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      FACTURA DE VENTA
                    </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value='COTIZACIÓN' onChange={handleChangeType}/>
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    COTIZACIÓN
                  </label>
                </div>
                <DivSelect icon='fa-user' value={usuario_id} placeholder='Cliente' required={required} className='form-select' options={usuarios} sel='nombre_completo' handleChange={(e)=>setUsuario_id(e.target.value)}/>
                <DivSelect icon='fa-tag' value={estado_id} placeholder='Estado' required={required} className='form-select' options={estados} sel='estado' handleChange={(e)=>setEstado_id(e.target.value)}/>
                <div className="card border border-danger">
                  <div className="card-header bg-danger text-white border border-danger">
                    AÑADIR PRODUCTO
                  </div>
                  <div className="card-body">
                    <DivSelect icon='fa-hammer' value={producto_id} placeholder='Producto' required='' className='form-select' options={productos} sel='nombre_producto' sel2='precio' separator=' - $' handleChange={(e)=>setProducto_id(e.target.value)}/>
                    <DivInput icon='fa-boxes' type='number' value={cantidad} required='' className='form-control' placeholder='Cantidad' handleChange={(e)=>setCantidad(e.target.value)}/>
                    <button className='btn btn-success' type='button' onClick={saveDetail}>------ Añadir Producto ------</button>
                  </div>
                </div>
                <DivTable col='10' off='1' classLoad='' classTable='m-4'>
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th>Cantidad</th>
                        <th>Producto</th>
                        <th>Precio unitario</th>
                        <th>Precio total</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                      {products_List.map((row, index) => (
                        <tr key={index+1}>
                          <td>{row.quantity}</td>
                          <td>{row.product_name}</td>
                          <td>{row.product_price}</td>
                          <td>{row.product_price * row.quantity}</td>
                          <td>
                            <button className='btn btn-danger' type='button' onClick={()=>deleteFromLists(index)}>
                              <i className='fa-solid fa-trash'/>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan='3'>Total</th>
                        <th>$ {calculateTotal()}</th>
                      </tr>
                    </tfoot>
                  </table>
                  <div className='text-center'>--------------------------------------------------------------</div>
                  <div className='text-center'>Total items: {detalle_venta.length}</div>
                </DivTable>
                <button className='btn btn-success mt-3' type='submit'>Crear Orden</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaleForm