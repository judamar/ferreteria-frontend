import React, {useState, useEffect} from 'react'
import ToolCard from '../../components/ToolCard'
import DivSearch from '../../components/DivSearch'
import {sendRequest} from '../../functions'

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
    <div className="container mx-auto px-4 mt-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <h1 className="title-h1">Herramientas para alquiler</h1>
        <DivSearch placeholder='Buscar herramientas' handleChange={handleSearchChange} value={searchTerm}
                   handleSearchSubmit={handleSearchSubmit}/>
      </div>
      <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 flex justify-items-center">
        {tools.map((tool) => (
          <div key={tool.id} className="col">
            <ToolCard tool={tool}/>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ToolsCatalog