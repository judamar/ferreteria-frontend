import React from 'react'
import WhatsAppButton from './WhatsAppButton'

const ProductCard = ({product}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full group">
      {/* Imagen */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.url_imagen}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
          alt={`Imagen del producto ${product.nombre_producto}`}
        />
        <div className="absolute top-2 right-2 bg-green-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${new Intl.NumberFormat('es-CO').format(product.precio)}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 flex-1 flex flex-col">
        <h5 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.nombre_producto}
        </h5>

        <div className="space-y-2 mb-4 flex-1">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <i className="fa fa-box text-gray-600"></i>
            <span><strong>Cantidad:</strong> {product.cantidad}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <i className="fa fa-tag text-gray-600"></i>
            <span><strong>Categoría:</strong> {product.categoria}</span>
          </p>
        </div>

        {/* Botón WhatsApp */}
        <div className="mt-auto">
          <WhatsAppButton producto={product.nombre_producto}/>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
