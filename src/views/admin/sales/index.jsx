import React, {useEffect, useState} from 'react'
import DivAdd from '../../../components/DivAdd.jsx'
import DivTable from '../../../components/DivTable.jsx'
import DivSearch from '../../../components/DivSearch.jsx'
import { Link } from 'react-router-dom'
import { confirmation, sendRequest } from '../../../functions.jsx'

const Sales = () => {
  const [ventas, setVentas] = useState([])
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getSales()
  }, [])

  const getSales = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/ventas/nombre/${searchTerm.trim()}` : '/ventas'
    const res = await sendRequest('GET', '', apiUrl, '')
    setVentas(res.data)
    setClassTable('')
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getSales();
  }

  const deleteSale = async (name, id) => {
    confirmation(name, `/ventas/${id}`, '/admin/ventas')
  }

  const calculateTotalSales = () => {
    let total = 0
    ventas.forEach((venta) => {
      total += venta.total_venta
    });
    return total.toFixed(2)
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center' >VENTAS Y COTIZACIONES</h1>
      <DivSearch placeholder='Buscar venta por cliente' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <DivAdd>
        <Link to='crear' className='btn btn-success'>
          <i className="fa-solid fa-circle-plus">
            Crear Orden
          </i>
        </Link>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Orden #</th>
              <th>Tipo</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Cedula</th>
              <th>Direccion</th>
              <th>Estado</th>
              <th>Total</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            {ventas.map((row, index)=>(
              <tr key={row.venta_id}>
                <td>{index+1}</td>
                <td>#{row.venta_id}</td>
                <td>{row.tipo}</td>
                <td>{row.fecha_emision_format}</td>
                <td>{row.nombre_cliente}</td>
                <td>{row.cedula}</td>
                <td>{row.direccion}</td>
                <td>{row.estado_venta}</td>
                <td>$ {row.total_venta.toFixed(2)}</td>
                <td>
                  <Link to={`/admin/ventas/factura/${row.venta_id}` } className='btn btn-primary' target='_blank' rel='noreferrer noopener'>
                    <i className="fa-solid fa-eye"/>
                  </Link>
                </td>
                <td>
                  <button type='button' onClick={()=>deleteSale(row.nombre_cliente, row.venta_id)} className='btn btn-danger'>
                    <i className="fa-solid fa-trash"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan='8'>Total</th>
              <th>$ {calculateTotalSales()}</th>
              <th colSpan='3' /> 
            </tr>
          </tfoot>
        </table>
      </DivTable>
    </div>
  )
}

export default Sales