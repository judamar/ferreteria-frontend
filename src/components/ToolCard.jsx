import React from 'react'
import WhatsAppButton from './WhatsAppButton'

const ProductCard = ({tool}) => {
  return (
    tool.estado !== 'No Disponible' ? (
    <div className="card m-2 p-1 " style={{ width: '15rem', height: '28rem' }}>
      <img src={tool.url_imagen} className="card-img-top rounded-2" alt={`Imagen del producto ${tool.nombre_articulo}`} style={{'height':'200px', 'width': '230px'}}/>
      <div className="card-body">
        <h5 className="card-title"><strong>{tool.nombre_articulo}</strong></h5>
        <p className="card-text"><strong>Cantidad:</strong> {tool.cantidad_disponible}</p>
        <p className="card-text"><strong>Precio/Día: </strong>${tool.precio_alquiler}</p>
        <p className="card-text"><strong>Estado: </strong>{tool.estado}</p>
      </div>
      <WhatsAppButton producto={tool.nombre_articulo}/>
    </div>
    ):(null)
  )
}

export default ProductCard