import React, {useState, useEffect} from 'react'
import ProductCard from '../../components/ProductCard'
import DivSelect from '../../components/DivSelect'
import DivSearch from '../../components/DivSearch'
import { sendRequest } from '../../functions'

const Catalog = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoria_id, setCategoria_id] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getProducts()
    getCategories()
  }, [])

  const getProducts = async (categoryId = '') => {
    let apiUrl = '/productos';
    if (searchTerm.trim() !== '') {
      apiUrl = `/productos/search/${searchTerm.trim()}`;
      if (categoryId) {
        apiUrl += `?categoria_id=${categoryId}`;
      }
    } else if (categoryId) {
      apiUrl = `/productos/category/${categoryId}`;
    }
    const res = await sendRequest('GET', '', apiUrl, '');
    setProducts(res.data);
  };
  

  const getCategories = async () => {
    const res = await sendRequest('GET', '', '/categorias', '')
    setCategories(res.data)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getProducts();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="container">
      <h1 className="text-center">CATALOGO DE PRODUCTOS</h1>
      <DivSearch placeholder='Buscar productos' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <h5 className="text-left">Buscar por categoria</h5>
      <DivSelect icon='fa-tag' value={categoria_id} required='' className='form-select' options={categories} sel='categoria' placeholder='Mostrar todo' disabled='' handleChange={(e) => {
        setCategoria_id(e.target.value)
        getProducts(e.target.value)
      }}/>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        
        {products.map((product) => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog