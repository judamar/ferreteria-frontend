import React from 'react'
import WhatsAppButton from './WhatsAppButton'

const ProductCard = ({product}) => {
  return (
    <div className="card m-2 p-1 " style={{ width: '15rem', height: '28rem' }}>
      <img src={product.url_imagen} className="card-img-top rounded-2" alt={`Imagen del producto ${product.nombre_producto}`} style={{'height':'200px', 'width': '230px'}}/>
      <div className="card-body">
        <h5 className="card-title"><strong>{product.nombre_producto}</strong></h5>
        <p className="card-text"><strong>Cantidad:</strong> {product.cantidad}</p>
        <p className="card-text"><strong>Precio: </strong>${product.precio.toFixed(2)}</p>
        <p className="card-text"><strong>Categoria: </strong>{product.categoria}</p>
      </div>
      <WhatsAppButton producto={product.nombre_producto}/>
    </div>
  )
}

export default ProductCard
