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

  const handleDownloadPDF = () => {
    // Seleccionar el elemento contenedor del contenido de la factura
    const element = document.querySelector('.invoice-container')
    // Opciones para la generación del PDF
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
    <div className="container mt-4 border">
      <div className="invoice-container">
        <div className="row">
          <div className="col-xs-12">
            <div className="invoice-title">
              <h2>{venta.tipo}</h2>
              <h3>Orden # {venta.venta_id}</h3>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <address>
                  <strong>FERRETERÍA CONSTRUMANTA P</strong><br />
                  <strong>NIT: </strong> {import.meta.env.VITE_FERRE_NIT}<br />
                  <strong>Dirección: </strong> {import.meta.env.VITE_FERRE_DIR}<br />
                  <strong>Ciudad:</strong> {import.meta.env.VITE_FERRE_CIUDAD}<br />
                  <strong>Teléfono:</strong> {import.meta.env.VITE_FERRE_TEL}<br />
                  <strong>Correo electrónico:</strong> {import.meta.env.VITE_FERRE_EMAIL}<br />
                </address>
              </div>
              <div className="col-6 text-right">
                <address>
                  <strong>FACTURADO A:</strong><br />
                  <strong>Cliente:</strong> {venta.nombre_cliente}<br />
                  <strong>Cédula:</strong> {venta.cedula} <br />
                  <strong>Dirección:</strong> {venta.direccion}<br />
                  <strong>Teléfono:</strong> {venta.telefono}<br />
                  <strong>Correo electrónico:</strong> {venta.correo_electronico}
                </address>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <address>
                  <strong>Estado de la Orden: </strong><br />
                  <div className='btn btn-info btn-sm'>{venta.estado_venta}</div><br />
                </address>
              </div>
              <div className="col-6 text-right">
                <address>
                  <strong>Fecha de orden:</strong><br />
                  {venta.fecha_emision_format}<br /><br />
                </address>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><strong>Resumen de la orden</strong></h3>
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <table className="table table-condensed">
                    <thead>
                      <tr key='a'>
                        <td className="text-center"><strong>#</strong></td>
                        <td className='text-center'><strong>Artículo</strong></td>
                        <td className="text-center"><strong>Precio sin iva</strong></td>
                        <td className="text-center"><strong>Precio</strong></td>
                        <td className="text-center"><strong>Cantidad</strong></td>
                        <td className="text-end"><strong>Total</strong></td>
                      </tr>
                    </thead>
                    <tbody>
                      {venta.productos?.map((producto, index) => (
                        <tr key={producto.id}>
                          <td className="text-center">{index + 1}</td>
                          <td className='text-center'>{producto.producto}</td>
                          <td className="text-end">${producto.valor_sin_iva.toLocaleString('es-ES')}</td>
                          <td className="text-end">${producto.valor_unitario.toLocaleString('es-ES')}</td>
                          <td className="text-center">{producto.cantidad}</td>
                          <td className="text-end">${producto.valor_total.toLocaleString('es-ES')}</td>
                        </tr>
                      ))}
                      <tr key='b'>
                        <td className="thick-line" />
                        <td className="thick-line" />
                        <td className="thick-line" />
                        <td className="thick-line" />
                        <td className="thick-line text-center"><strong>Subtotal</strong></td>
                        <td className="thick-line text-end">${venta.subototal ? venta.subototal.toLocaleString('es-ES') : '0'}</td>
                      </tr>
                      <tr key='c'>
                        <td className="no-line" />
                        <td className="no-line" />
                        <td className="no-line" />
                        <td className="no-line" />
                        <td className="no-line text-center"><strong>IVA ({venta.IVA})</strong></td>
                        <td className="no-line text-end">${(venta.total_venta - venta.subototal) ? (venta.total_venta - venta.subototal).toLocaleString('es-ES') : '0'}</td>
                      </tr>
                      <tr key='d'>
                        <td className="no-line" />
                        <td className="no-line" />
                        <td className="no-line" />
                        <td className="no-line" />
                        <td className="no-line text-center"><strong>Total:</strong></td>
                        <td className="no-line text-end">${venta.total_venta ? venta.total_venta.toLocaleString('es-ES') : '0'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type='button' className="btn btn-success m-1" onClick={handleDownloadPDF}>Descargar factura</button>
    </div>
  )
}

export default InvoiceTemplate
