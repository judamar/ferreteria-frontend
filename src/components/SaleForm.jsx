import React, { useEffect, useState } from 'react'
import DivInput from './DivInput.jsx'
import DivSelect from './DivSelect.jsx'
import { sendRequest } from '../functions.jsx'

const styles = {
  container: 'container mx-auto px-4 py-6',
  title: 'text-3xl font-bold text-gray-900 mb-8 text-center',
  card: 'bg-white rounded-xl shadow-lg border-2 border-red-600 overflow-hidden',
  cardHeader: 'bg-red-600 text-white px-6 py-4 font-bold text-lg',
  cardBody: 'p-6',
  radioContainer: 'flex items-center gap-2 mb-4',
  radioInput: 'w-4 h-4 text-red-600 focus:ring-red-500',
  radioLabel: 'text-gray-700 font-medium',
  button: 'font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow hover:shadow-lg',
  buttonSuccess: 'bg-green-600 hover:bg-green-700 text-white w-full',
  buttonDanger: 'bg-red-600 hover:bg-red-700 text-white p-2',
  table: 'w-full border border-gray-300 rounded-lg overflow-hidden',
  tableHeader: 'bg-gray-100 border-b-2 border-gray-300',
  tableHeaderCell: 'py-3 px-4 text-left font-bold text-sm text-gray-700 uppercase',
  tableCell: 'py-3 px-4 text-sm text-gray-900 border-b border-gray-200',
  tableRow: 'hover:bg-gray-50 transition-colors',
  sectionDivider: 'border-t-2 border-gray-300 my-6',
  infoText: 'text-center text-gray-600 font-medium py-2',
  totalText: 'font-bold text-lg text-green-600',
}

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
      total += product.product_price * product.quantity
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
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Orden</h1>

      <div className="max-w-4xl mx-auto">
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            {params.title}
          </div>

          <div className={styles.cardBody}>
            <form onSubmit={save}>
              {/* Tipo de orden */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">Tipo de Orden</label>
                <div className="space-y-2">
                  <div className={styles.radioContainer}>
                    <input
                      className={styles.radioInput}
                      type="radio"
                      name="tipo_orden"
                      id="factura"
                      value='FACTURA DE VENTA'
                      onChange={handleChangeType}
                    />
                    <label className={styles.radioLabel} htmlFor="factura">
                      Factura de Venta
                    </label>
                  </div>
                  <div className={styles.radioContainer}>
                    <input
                      className={styles.radioInput}
                      type="radio"
                      name="tipo_orden"
                      id="cotizacion"
                      value='COTIZACIÓN'
                      onChange={handleChangeType}
                    />
                    <label className={styles.radioLabel} htmlFor="cotizacion">
                      Cotización
                    </label>
                  </div>
                </div>
              </div>

              {/* Selects */}
              <DivSelect
                icon='fa-user'
                label='Cliente'
                value={usuario_id}
                placeholder='Selecciona un cliente'
                required={required}
                options={usuarios}
                sel='nombre_completo'
                handleChange={(e) => setUsuario_id(e.target.value)}
              />

              <DivSelect
                icon='fa-tag'
                label='Estado'
                value={estado_id}
                placeholder='Selecciona un estado'
                required={required}
                options={estados}
                sel='estado'
                handleChange={(e) => setEstado_id(e.target.value)}
              />

              {/* Card para añadir producto */}
              <div className={`${styles.card} mt-6`}>
                <div className={styles.cardHeader}>
                  <i className="fa-solid fa-plus-circle mr-2"></i>
                  Añadir Producto
                </div>
                <div className={styles.cardBody}>
                  <DivSelect
                    icon='fa-hammer'
                    label='Producto'
                    value={producto_id}
                    placeholder='Selecciona un producto'
                    required=''
                    options={productos}
                    sel='nombre_producto'
                    sel2='precio'
                    separator=' - $'
                    handleChange={(e) => setProducto_id(e.target.value)}
                  />

                  <DivInput
                    icon='fa-boxes'
                    label='Cantidad'
                    type='number'
                    value={cantidad}
                    required=''
                    placeholder='Cantidad'
                    handleChange={(e) => setCantidad(e.target.value)}
                  />

                  <button
                    className={`${styles.button} ${styles.buttonSuccess} mt-4`}
                    type='button'
                    onClick={saveDetail}
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    Añadir Producto
                  </button>
                </div>
              </div>

              {/* Tabla de productos */}
              {products_List.length > 0 && (
                <div className="mt-6">
                  <div className="overflow-x-auto">
                    <table className={styles.table}>
                      <thead className={styles.tableHeader}>
                      <tr>
                        <th className={styles.tableHeaderCell}>Cantidad</th>
                        <th className={styles.tableHeaderCell}>Producto</th>
                        <th className={styles.tableHeaderCell}>Precio Unitario</th>
                        <th className={styles.tableHeaderCell}>Precio Total</th>
                        <th className={`${styles.tableHeaderCell} text-center`}>Eliminar</th>
                      </tr>
                      </thead>
                      <tbody>
                      {products_List.map((row, index) => (
                        <tr key={index + 1} className={styles.tableRow}>
                          <td className={styles.tableCell}>{row.quantity}</td>
                          <td className={styles.tableCell}>{row.product_name}</td>
                          <td className={`${styles.tableCell} text-right`}>$ {new Intl.NumberFormat("es-CO").format(row.product_price)}</td>
                          <td className={`${styles.tableCell} text-right font-semibold text-green-600`}>
                            $ {new Intl.NumberFormat("es-CO").format(row.product_price * row.quantity)}
                          </td>
                          <td className={`${styles.tableCell} text-center`}>
                            <button
                              className={`${styles.button} ${styles.buttonDanger}`}
                              type='button'
                              onClick={() => deleteFromLists(index)}
                              title="Eliminar producto"
                            >
                              <i className='fa-solid fa-trash'/>
                            </button>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                      <tr>
                        <th colSpan='3' className="py-4 px-4 text-right text-sm font-bold text-gray-900 uppercase">
                          Total
                        </th>
                        <th className={`py-4 px-4 text-right ${styles.totalText}`}>
                          $ {new Intl.NumberFormat("es-CO").format(calculateTotal())}
                        </th>
                        <th></th>
                      </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className={styles.sectionDivider}></div>
                  <div className={styles.infoText}>
                    <i className="fa-solid fa-box mr-2"></i>
                    Total de items: <span className="font-bold text-red-600">{detalle_venta.length}</span>
                  </div>
                </div>
              )}

              {/* Botón de submit */}
              <button
                className={`${styles.button} ${styles.buttonSuccess} mt-6`}
                type='submit'
                disabled={detalle_venta.length === 0}
              >
                <i className="fa-solid fa-check-circle mr-2"></i>
                Crear Orden
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaleForm