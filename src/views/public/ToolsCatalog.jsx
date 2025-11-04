import React, {useState, useEffect} from 'react'
import ToolCard from '../../components/ToolCard'
import DivSearch from '../../components/DivSearch'
import { sendRequest } from '../../functions'

const ToolsCatalog = () => {
  const [tools, setTools] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getTools()
  }, [])

  const getTools = async () => {
    let apiUrl = '/herramientas_maquinas'
    if (searchTerm.trim() !== '') {
      apiUrl = `/herramientas_maquinas/search/${searchTerm.trim()}`
    }
    const res = await sendRequest('GET', '', apiUrl, '')
    setTools(res.data)
    console.log(res.data)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getTools();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="container">
      <h1 className="text-center">CATALOGO DE HERRAMIENTAS</h1>
      <DivSearch placeholder='Buscar herramientas' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {tools.map((tool) => (
          <div key={tool.id} className="col">
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ToolsCatalog