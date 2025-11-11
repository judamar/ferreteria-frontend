import React, { useState, useEffect } from 'react'
import html2pdf from 'html2pdf.js'
import { useParams } from 'react-router-dom'
import { sendRequest } from '../functions'

const InvoiceTemplate = () => {
  const { id } = useParams()
  const [venta, setVenta] = useState({})

  useEffect(() => {
    getVenta(id)
  }, [id])

  const getVenta = async (id) => {
    const data = await sendRequest('GET', '', `/ventas/${id}`, '')
    setVenta(data.data[0])
  }

  // TODO: ARREGLAR DESCARGA (html2pdf no funciona con tailwind por oklch)
  const handleDownloadPDF = () => {
    const element = document.querySelector('.invoice-container')
    const options = {
      margin: 0.5,
      filename: `factura_${id}_${Date.now()}`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    html2pdf().from(element).set(options).save()
  }

  return (
    <div className="container mx-auto mt-6 border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
      <div className="invoice-container">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{venta.tipo}</h2>
            <h3 className="text-lg text-gray-600">Orden #{venta.venta_id}</h3>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />

        {/* Información de la empresa y cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-800 mb-1">FERRETERÍA CONSTRUMANTA P</h4>
            <p><strong>NIT:</strong> {import.meta.env.VITE_FERRE_NIT}</p>
            <p><strong>Dirección:</strong> {import.meta.env.VITE_FERRE_DIR}</p>
            <p><strong>Ciudad:</strong> {import.meta.env.VITE_FERRE_CIUDAD}</p>
            <p><strong>Teléfono:</strong> {import.meta.env.VITE_FERRE_TEL}</p>
            <p><strong>Correo:</strong> {import.meta.env.VITE_FERRE_EMAIL}</p>
          </div>
          <div className="text-left md:text-right">
            <h4 className="font-bold text-gray-800 mb-1">FACTURADO A:</h4>
            <p><strong>Cliente:</strong> {venta.nombre_cliente}</p>
            <p><strong>Cédula:</strong> {venta.cedula}</p>
            <p><strong>Dirección:</strong> {venta.direccion}</p>
            <p><strong>Teléfono:</strong> {venta.telefono}</p>
            <p><strong>Correo:</strong> {venta.correo_electronico}</p>
          </div>
        </div>

        {/* Estado y fecha */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-4">
          <div>
            <p className="font-semibold text-gray-700">Estado de la Orden:</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-md mt-1">
              {venta.estado_venta}
            </span>
          </div>
          <div className="text-left md:text-right">
            <p className="font-semibold text-gray-700">Fecha de orden:</p>
            <p>{venta.fecha_emision_format}</p>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Resumen de la orden</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md text-sm">
              <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2 text-center font-semibold border-b">#</th>
                <th className="px-3 py-2 text-center font-semibold border-b">Artículo</th>
                <th className="px-3 py-2 text-center font-semibold border-b">Precio sin IVA</th>
                <th className="px-3 py-2 text-center font-semibold border-b">Precio</th>
                <th className="px-3 py-2 text-center font-semibold border-b">Cantidad</th>
                <th className="px-3 py-2 text-center font-semibold border-b">Total</th>
              </tr>
              </thead>
              <tbody>
              {venta.productos?.map((producto, index) => (
                <tr key={producto.id || index} className="border-b">
                  <td className="px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-3 py-2 text-center">{producto.producto}</td>
                  <td className="px-3 py-2 text-right">${producto.valor_sin_iva.toLocaleString('es-ES')}</td>
                  <td className="px-3 py-2 text-right">${producto.valor_unitario.toLocaleString('es-ES')}</td>
                  <td className="px-3 py-2 text-center">{producto.cantidad}</td>
                  <td className="px-3 py-2 text-right">${producto.valor_total.toLocaleString('es-ES')}</td>
                </tr>
              ))}

              {/* Subtotal */}
              <tr className="font-semibold text-gray-700">
                <td colSpan="4" />
                <td className="text-center border-t py-2">Subtotal</td>
                <td className="text-right border-t py-2">
                  ${venta.subototal ? venta.subototal.toLocaleString('es-ES') : '0'}
                </td>
              </tr>

              {/* IVA */}
              <tr className="text-gray-700">
                <td colSpan="4" />
                <td className="text-center border-t py-2">IVA ({venta.IVA})</td>
                <td className="text-right border-t py-2">
                  ${(venta.total_venta - venta.subototal)
                  ? (venta.total_venta - venta.subototal).toLocaleString('es-ES')
                  : '0'}
                </td>
              </tr>

              {/* Total */}
              <tr className="font-bold text-gray-900">
                <td colSpan="4" />
                <td className="text-center border-t py-2">Total</td>
                <td className="text-right border-t py-2">
                  ${venta.total_venta ? venta.total_venta.toLocaleString('es-ES') : '0'}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Botón de descarga */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Descargar factura
        </button>
      </div>
    </div>
  )
}

export default InvoiceTemplate
