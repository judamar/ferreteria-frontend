import React from 'react'
import WhatsAppButton from './WhatsAppButton'

const ProductCard = ({tool}) => {
  return (
    tool.estado !== 'No Disponible' ? (
      <div
        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full group">
        <div className="relative overflow-hidden bg-gray-100">
          <img
            src={tool.url_imagen}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
            alt={`Imagen del producto ${tool.nombre_articulo}`}/>
          <div className="absolute top-2 right-2 bg-green-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ${new Intl.NumberFormat('es-CO').format(tool.precio_alquiler)} x Día
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h5 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
            {tool.nombre_articulo}
          </h5>


          <div className="space-y-2 mb-4 flex-1">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <i className="fa fa-box text-gray-600"/>
              <span><strong>Cantidad:</strong> {tool.cantidad_disponible}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <i className="fa fa-box text-gray-600"/>
              <span><strong>Estado:</strong> {tool.estado}</span>
            </p>
          </div>
          <div className="mt-auto">
            <WhatsAppButton producto={tool.nombre_articulo}/>
          </div>
        </div>
      </div>
    ) : null
  )
}

export default ProductCard