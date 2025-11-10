import React, {useEffect, useState} from 'react'
import DivAdd from '../../../components/DivAdd.jsx'
import DivSearch from '../../../components/DivSearch.jsx'
import { Link } from 'react-router-dom'
import { confirmation, sendRequest } from '../../../functions.jsx'

const Sales = () => {
  const [ventas, setVentas] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getSales()
  }, [])

  const getSales = async () => {
    setLoading(true)
    const apiUrl = searchTerm.trim() !== '' ? `/ventas/nombre/${searchTerm.trim()}` : '/ventas'
    const res = await sendRequest('GET', '', apiUrl, '')
    setVentas(res.data)
    setLoading(false)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    getSales()
  }

  const deleteSale = async (name, id) => {
    confirmation(name, `/ventas/${id}`, '/admin/ventas')
  }

  const calculateTotalSales = () => {
    let total = 0
    ventas.forEach((venta) => {
      total += venta.total_venta
    })
    return new Intl.NumberFormat("es-CO").format(total)
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className="mb-8 text-center">
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Ventas y Cotizaciones
        </h1>
        <div className="w-48 h-1 bg-red-600 mx-auto rounded-full"></div>
      </div>

      <div className="mb-6">
        <DivSearch
          placeholder='Buscar venta por cliente'
          handleChange={handleSearchChange}
          value={searchTerm}
          handleSearchSubmit={handleSearchSubmit}
        >
          <Link
            to='crear'
            className='bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 shadow hover:shadow-lg'>
            <i className="fa-solid fa-circle-plus"/>
            <span className="hidden sm:inline">Crear Orden</span>
          </Link>
        </DivSearch>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : ventas.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-inbox text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">No se encontraron ventas</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className='w-full min-w-full'>
              <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left font-bold text-sm uppercase tracking-wider">#</th>
                <th className="py-3 px-4 text-left font-bold text-sm uppercase tracking-wider">Orden #</th>
                <th className="py-3 px-4 text-left font-bold text-sm uppercase tracking-wider">Tipo</th>
                <th className="py-3 px-4 text-left font-bold text-sm uppercase tracking-wider">Fecha</th>
                <th className="py-3 px-4 text-left font-bold text-sm uppercase tracking-wider">Cliente</th>
                <th className="py-3 px-4 text-left font-bold text-sm uppercase tracking-wider">Cédula</th>
                <th className="py-3 px-4 text-left font-bold text-sm uppercase tracking-wider">Dirección</th>
                <th className="py-3 px-4 text-left font-bold text-sm uppercase tracking-wider">Estado</th>
                <th className="py-3 px-4 text-left font-bold text-sm uppercase tracking-wider">Total</th>
                <th className="py-3 px-4 text-center font-bold text-sm uppercase tracking-wider">Acciones</th>
              </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
              {ventas.map((row, index) => (
                <tr key={row.venta_id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm font-semibold text-gray-900">#{row.venta_id}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{row.tipo}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{row.fecha_emision_format}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{row.nombre_cliente}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{row.cedula}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{row.direccion}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{row.estado_venta}</td>
                  <td className="py-3 px-4 text-right whitespace-nowrap text-sm font-bold text-green-600">
                    ${new Intl.NumberFormat("es-CO").format(row.total_venta)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/admin/ventas/factura/${row.venta_id}`}
                        className='bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md'
                        target='_blank'
                        rel='noreferrer noopener'
                        title="Ver factura">
                        <i className="fa-solid fa-eye"/>
                      </Link>
                      <button
                        type='button'
                        onClick={() => deleteSale(row.nombre_cliente, row.venta_id)}
                        className='bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md'
                        title="Eliminar venta">
                        <i className="fa-solid fa-trash"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <th colSpan='8' className="py-4 px-4 text-right text-base font-bold text-gray-900 uppercase">
                  Total
                </th>
                <th className="py-4 px-4 text-base font-bold text-green-600 whitespace-nowrap">
                  ${calculateTotalSales()}
                </th>
                <th className="py-4 px-4"></th>
              </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sales