import React, {useEffect, useState, useRef} from 'react'
import DivAdd from '../../components/DivAdd.jsx'
import DivTable from '../../components/TableBase.jsx'
import DivSelect from '../../components/DivSelect.jsx'
import DivInput from '../../components/DivInput.jsx'
import DivSearch from '../../components/DivSearch.jsx'
import Modal from '../../components/Modal.jsx'
import {confirmation, sendRequest} from '../../functions.jsx'

const Tools = () => {
  const [herramientas, setHerramientas] = useState([])
  const [id, setId] = useState('')
  const [nombre_articulo, setNombre_articulo] = useState('')
  const [image, setImage] = useState(null)
  const [descripcion, setDescripcion] = useState('')
  const [precio_alquiler, setPrecio_alquiler] = useState('')
  const [cantidad_disponible, setCantidad] = useState('')
  const [estados_id, setEstados_id] = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)

  const [estados, setEstados] = useState([])

  const [operation, setOperation] = useState(1) // 1: Agregar, 2: Editar
  const [title, setTitle] = useState('')
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const NameInput = useRef()
  const fileInputRef = useRef()

  useEffect(() => {
    getHerramientas()
    getStates()
  }, [])

  // Listener para paste de imágenes
  useEffect(() => {
    const handlePaste = (e) => {
      if (!isModalOpen) return

      const items = e.clipboardData?.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile()
          if (file) handleFile(file)
          e.preventDefault()
          break
        }
      }
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [isModalOpen])

  const getHerramientas = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/herramientas_maquinas/search/${searchTerm.trim()}` : '/herramientas_maquinas'
    const res = await sendRequest('GET', '', apiUrl, '')
    setHerramientas(res.data)
    setClassTable('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    getHerramientas()
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) handleFile(file)
  }

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen')
      return
    }
    setImage(file)

    const reader = new FileReader()
    reader.onloadend = () => setPreviewUrl(reader.result)
    reader.readAsDataURL(file)

    // Sincronizar input file
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      fileInputRef.current.files = dataTransfer.files
    }
  }

  const deleteProduct = async (id) => {
    confirmation(id, `/herramientas_maquinas/${id}`, '/admin/herramientas')
  }

  const clear = () => {
    setImage(null)
    setPreviewUrl(null)
    setNombre_articulo('')
    setDescripcion('')
    setPrecio_alquiler('')
    setCantidad('')
    setEstados_id('')

    // Limpiar input file
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getStates = async () => {
    const res = await sendRequest('GET', '', '/estados_herramienta_maquina', '')
    setEstados(res.data)
  }

  const openModal = (op, herramienta = null) => {
    clear()
    setOperation(op)

    if (op === 1) {
      // Agregar nueva herramienta
      setTitle('Agregar Herramienta')
      setId('')
    } else if (op === 2) {
      // Editar herramienta existente
      setTitle('Editar Herramienta')
      setId(herramienta.id)
      setNombre_articulo(herramienta.nombre_articulo)
      setDescripcion(herramienta.descripcion)
      setPrecio_alquiler(herramienta.precio_alquiler)
      setCantidad(herramienta.cantidad_disponible)
      setEstados_id(herramienta.estado_id)
    }

    setIsModalOpen(true)
    setTimeout(() => NameInput.current?.focus(), 600)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    clear()
  }

  const save = async (e) => {
    e.preventDefault()

    let method = ''
    let url = ''
    let body = null
    let isFormData = false

    if (operation === 1) {
      // Crear nueva herramienta
      method = 'POST'
      url = '/herramientas_maquinas'
      isFormData = true

      const formData = new FormData()
      formData.append('nombre_articulo', nombre_articulo)
      formData.append('descripcion', descripcion)
      formData.append('precio_alquiler', precio_alquiler)
      formData.append('cantidad_disponible', cantidad_disponible)
      formData.append('estados_herramientas_maquinas_id', estados_id)
      if (image) formData.append('image', image)

      body = formData
    } else if (operation === 2) {
      // Actualizar herramienta existente
      method = 'PUT'
      url = `/herramientas_maquinas/${id}`
      isFormData = true

      const formData = new FormData()
      formData.append('nombre_articulo', nombre_articulo)
      formData.append('descripcion', descripcion)
      formData.append('precio_alquiler', precio_alquiler)
      formData.append('cantidad_disponible', cantidad_disponible)
      formData.append('estados_herramientas_maquinas_id', estados_id)
      if (image) formData.append('image', image)

      body = formData
    }

    const res = await sendRequest(method, body, url, '', true, isFormData)

    if (res.status === 'SUCCESS') {
      closeModal()
      getHerramientas()
    }
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className="mb-8 text-center">
        <h1 className='title-h2'>
          Herramientas
        </h1>
        <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto mb-6 flex">
        <DivSearch
          placeholder='Buscar herramientas'
          handleChange={handleSearchChange}
          value={searchTerm}
          handleSearchSubmit={handleSearchSubmit}
        >
          <button
            type="button"
            className="button-add"
            onClick={() => openModal(1)}>
            <i className='icon-[material-symbols--add-circle-outline] text-xl'/>
            <span className="hidden sm:inline">Añadir</span>
          </button>
        </DivSearch>
      </div>

      <div className="max-w-8xl mx-auto mb-6">
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${classLoad}`}>
          <div className={`overflow-auto ${classTable}`}>
            <table className='w-full'>
              <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">#</th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">HERRAMIENTA</th>
                <th className="py-4 px-6 text-right font-bold text-sm uppercase tracking-wider">PRECIO/DIA</th>
                <th className="py-4 px-6 text-right font-bold text-sm uppercase tracking-wider">CANTIDAD</th>
                <th className="py-4 px-6 text-right font-bold text-sm uppercase tracking-wider">ESTADO</th>
                <th className="py-4 px-6 text-center font-bold text-sm uppercase tracking-wider">ACCIONES</th>
              </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
              {herramientas.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-1.5 px-6 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.nombre_articulo}</td>
                  <td className="py-1.5 px-6 text-right whitespace-nowrap text-sm text-gray-900">{`$${new Intl.NumberFormat("es-CO").format(row.precio_alquiler)}`}</td>
                  <td className="py-1.5 px-6 text-right whitespace-nowrap text-sm text-gray-900">{row.cantidad_disponible}</td>
                  <td className="py-1.5 px-6 text-right whitespace-nowrap text-sm text-gray-900">{row.estado}</td>
                  <td className="py-1.5 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type='button'
                        className='bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 rounded-lg transition-all duration-200 shadow hover:shadow-lg transform hover:scale-105'
                        onClick={() => openModal(2, row)}
                        title="Editar">
                        <i className='fa-solid fa-pen-to-square'/>
                      </button>
                      <button
                        type='button'
                        className='bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg transition-all duration-200 shadow hover:shadow-lg transform hover:scale-105'
                        onClick={() => deleteProduct(row.id)}
                        title="Eliminar">
                        <i className='fa-solid fa-trash'/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={title}>
        <form onSubmit={save} className='flex flex-col gap-2'>
          <DivInput
            label="Herramienta"
            id="herramienta"
            type='text'
            icon='fa-wrench'
            value={nombre_articulo}
            placeholder='Nombre Herramienta - Maquina'
            required
            ref={NameInput}
            handleChange={(e) => setNombre_articulo(e.target.value)}
          />

          <DivInput
            label="Descripción"
            id="descripcion"
            type='text'
            icon='fa-file-lines'
            value={descripcion}
            placeholder='Descripción'
            required
            handleChange={(e) => setDescripcion(e.target.value)}
          />

          <DivInput
            label="Precio x Día"
            id="precio"
            type='number'
            icon='fa-dollar-sign'
            value={precio_alquiler}
            placeholder='Precio alquiler en dias'
            required
            handleChange={(e) => setPrecio_alquiler(e.target.value)}
          />

          <DivInput
            label="Cantidad"
            id="cantidad"
            type='number'
            icon='fa-box'
            value={cantidad_disponible}
            placeholder='Cantidad disponible'
            required
            handleChange={(e) => setCantidad(e.target.value)}
          />

          <DivSelect
            label="Estado"
            icon='icon-[material-symbols--category-outline]'
            name="estado_id"
            id="estado_id"
            value={estados_id}
            required
            placeholder='Selecciona un estado'
            options={estados}
            sel='estado'
            handleChange={(e) => setEstados_id(e.target.value)}
          />

          <div className='flex items-center bg-white rounded-md shadow-sm overflow-hidden mb-3'>
            <span className='px-3 py-2 flex items-center justify-center text-gray-600'>
              <i className='icon-[lucide--image] text-lg font-bold'/>
            </span>
            <input
              ref={fileInputRef}
              type="file"
              name="imagen"
              onChange={handleFileChange}
              accept="image/*"
              className="flex-1 outline-1 -outline-offset-2 outline-gray-700 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-700 text-gray-900 text-lg font-medium px-3 py-2 placeholder-gray-400"
              placeholder='Imagen'
            />
          </div>

          <p className="text-gray-500 text-base mb-3">
            Puedes pegar una imagen con <kbd className="px-1 bg-gray-200 rounded">Ctrl</kbd>+<kbd className="px-1 bg-gray-200 rounded">V</kbd>
          </p>

          {previewUrl && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-[200px] object-contain border border-gray-300 rounded-md"
              />
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold w-full py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <i className="icon-[material-symbols--save-outline] text-xl"/>
              {operation === 1 ? 'Guardar' : 'Actualizar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Tools