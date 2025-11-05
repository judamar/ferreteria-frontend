import React, {useState, useEffect} from 'react'
import ProductCard from '../../components/ProductCard'
import DivSelect from '../../components/DivSelect'
import DivSearch from '../../components/DivSearch'
import {sendRequest} from '../../functions'

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
    <div className="container mx-auto px-4 mt-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <h1 className="title-h1">CATALOGO DE PRODUCTOS</h1>
        <DivSearch placeholder='Buscar productos' handleChange={handleSearchChange} value={searchTerm}
                   handleSearchSubmit={handleSearchSubmit}/>
        <DivSelect
          icon=''
          value={categoria_id}
          className='form-select w-full py-2 px-4 border-2 border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 hover:border-red-800 transition-colors'
          options={categories}
          sel='categoria'
          placeholder='Mostrar todo'
          disabled=''
          handleChange={(e) => {
            setCategoria_id(e.target.value)
            getProducts(e.target.value)
          }}
        />
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 flex justify-items-center">

        {products.map((product) => (
          <div key={product.id} className="col w-full">
            <ProductCard product={product}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog