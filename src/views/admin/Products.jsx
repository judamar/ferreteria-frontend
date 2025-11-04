import React,{ useEffect, useState, useRef } from 'react'
import DivAdd from '../../components/DivAdd.jsx'
import DivTable from '../../components/DivTable.jsx'
import DivSelect from '../../components/DivSelect.jsx'
import DivInput from '../../components/DivInput.jsx'
import DivSearch from '../../components/DivSearch.jsx'
import Modal from '../../components/Modal.jsx'
import { confirmation, sendRequest } from '../../functions.jsx'

const Products = () => {
  const [productos, setProductos] = useState([])
  const [id, setId] = useState('')
  const [nombre_producto, setNombre_producto] = useState('')
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [marca, setMarca] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria_id, setCategoria_id] = useState(0)

  const [categorias, setCategorias] = useState([])

  const [operation, setOperation] = useState('')
  const [title, setTitle] = useState('')
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')

  const NameInput = useRef()
  const close = useRef()
  const fileInputRef = useRef()

  let method = ''
  let url = ''
  let body = null
  let bodyform = {}
  let isFormData = false

  useEffect(()=>{
    getProducts()
    getCategory()
  },[])

  // Agregar event listener para paste
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            handleFile(file);
            break;
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  const getProducts = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/productos/search/${searchTerm.trim()}` : '/productos'
    const res = await sendRequest('GET', '', apiUrl, '')
    setProductos(res.data)
    setClassTable('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getProducts();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  }

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen');
      return;
    }

    setImage(file);

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    // Actualizar el input file
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const deleteProduct = async (id) => {
    confirmation(id, `/productos/${id}`, '/admin/productos')
  }

  const clear = () => {
    setNombre_producto('')
    setMarca('')
    setDescripcion('')
    setPrecio('')
    setCantidad('')
    setCategoria_id('')
    setImage(null)
    setPreviewUrl(null)
  }

  const getCategory = async () => {
    const res = await sendRequest('GET', '', '/categorias', '')
    setCategorias(res.data)
  }

  const openModal = (op, pr, n, m, d, p, c, ca) => {
    clear()
    setTimeout( ()=> {if (NameInput.current) {
      NameInput.current.focus()
    }}, 600)
    setOperation(op)
    setId(pr)
    if (op === 1) {
      setTitle('Agregar producto')
    } else if (op === 2) {
      setTitle('Actualizar imagen')
    } else {
      setTitle('Actualizar producto')
      setNombre_producto(n)
      setMarca(m)
      setDescripcion(d)
      setPrecio(p)
      setCantidad(c)
      setCategoria_id(ca)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (operation === 1) {
      method = 'POST'
      url = '/productos'
      isFormData = true
      formData.append('nombre_producto', nombre_producto)
      formData.append('marca', marca)
      formData.append('descripcion', descripcion)
      formData.append('precio', precio)
      formData.append('cantidad', cantidad)
      formData.append('categorias_id', categoria_id)
      formData.append('image', image)
    } else if (operation === 2) {
      method = 'PATCH'
      url = `/productos/${id}`
      isFormData = true
      formData.append('image', image)
    } else if (operation === 3){
      method = 'PUT'
      url = `/productos/${id}`
      bodyform = {
        nombre_producto: nombre_producto,
        marca: marca,
        descripcion: descripcion,
        precio: precio,
        cantidad: cantidad,
        categorias_id: categoria_id
      }
    }
    if (operation === 3) {
      body = bodyform
    } else {
      body = formData
    }
    const res = await sendRequest(method, body, url, '/admin/productos', true, isFormData)
    if ((method === 'PUT' || method === 'PATCH') && res.status === 'SUCCESS') {
      close.current.click()
    }
    if (res.status === 'SUCCESS') {
      clear()
      getProducts()
      setTimeout( ()=> {if (NameInput.current) {
        NameInput.current.focus()
      }}, 3000)
    }
  }

  return (
      <div className='container-fluid'>
        <h1 className='text-center' >PRODUCTOS</h1>
        <DivSearch placeholder='Buscar productos' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
        <DivAdd>
          <button type='button' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalProductos' onClick={()=> openModal(1)}>
            <i className='fa-solid fa-circle-plus'/>
            Añadir producto
          </button>
        </DivAdd>
        <DivAdd>

        </DivAdd>
        <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
          <table className='table table-bordered'>
            <thead><tr><th>#</th><th>PRODUCTO</th><th>CLAVE</th><th>MARCA</th><th>CATEGORIA</th><th>CANTIDAD</th><th>PRECIO/U</th><th>TOTAL</th><th /><th /><th /></tr></thead>
            <tbody className='table-group-divider'>
            {productos.map((row, index)=>(
                <tr key={row.id}>
                  <td>{index+1}</td>
                  <td>{row.nombre_producto}</td>
                  <td>{row.clave_producto}</td>
                  <td>{row.marca}</td>
                  <td>{row.categoria}</td>
                  <td>{row.cantidad}</td>
                  <td>{`$${row.precio}`}</td>
                  <td>{`$${row.precio * row.cantidad}`}</td>
                  <td>
                    <button type='button' className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProductosUpdate' onClick={()=> openModal(3, row.id, row.nombre_producto, row.marca, row.descripcion, row.precio, row.cantidad, row.categoria_id)}>
                      <i className='fa-solid fa-pen-to-square'/>
                    </button>
                  </td>
                  <td>
                    <button type='button' className='btn btn-info' data-bs-toggle='modal' data-bs-target='#modalProductosImg' onClick={()=> openModal(2, row.id)}>
                      <i className='fa-solid fa-image'/>
                    </button>
                  </td>
                  <td>
                    <button type='button' className='btn btn-danger' onClick={()=> deleteProduct(row.id)}>
                      <i className='fa-solid fa-trash'/>
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </DivTable>
        <Modal title={title} modal='modalProductos'>
          <div className='modal-body'>
            <DivInput type='text' icon='fa-hammer' value={nombre_producto} className='form-control' placeholder='Nombre Producto' required='required' ref={NameInput} handleChange={(e)=>setNombre_producto(e.target.value)}/>
            <DivInput type='text' icon='fa-trademark' value={marca} className='form-control' placeholder='Marca' required='required' handleChange={(e)=>setMarca(e.target.value)}/>
            <DivInput type='text' icon='fa-file-lines' value={descripcion} className='form-control' placeholder='Descripcion' required='required' handleChange={(e)=>setDescripcion(e.target.value)}/>
            <DivInput type='number' icon='fa-dollar-sign' value={precio} className='form-control' placeholder='Precio' required='required' handleChange={(e)=>setPrecio(e.target.value)}/>
            <DivInput type='number' icon='fa-box' value={cantidad} className='form-control' placeholder='Cantidad' required='required' handleChange={(e)=>setCantidad(e.target.value)}/>
            <DivSelect icon='fa-tag' value={categoria_id} required='required' placeholder='Seleccionar categoría' className='form-select' options={categorias} sel='categoria' handleChange={(e)=>setCategoria_id(e.target.value)}/>
            <form encType='multipart/form-data' className='input-group mb-3'>
            <span className='input-group-text'>
              <i className='fa-solid fa-image'/>
            </span>
              <input type="file" name="imagen" ref={fileInputRef} onChange={handleFileChange} accept="image/*" required='required' className='form-control' placeholder='Imagen'/>
            </form>
            <p className='text-muted small'>Puedes pegar una imagen con Ctrl+V</p>
            {previewUrl && (
                <div className='mb-3'>
                  <p className='small mb-2'>Vista previa:</p>
                  <img src={previewUrl} alt='Preview' style={{maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', border: '1px solid #dee2e6', borderRadius: '0.25rem'}} />
                </div>
            )}
            <div className='d-grid col-10 mx-auto'>
              <button type='button' className='btn btn-success' onClick={save}>
                <i className='fa-solid fa-save'/>Guardar
              </button>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
          </div>
        </Modal>
        <Modal title={title} modal='modalProductosUpdate'>
          <div className='modal-body'>
            <DivInput type='text' icon='fa-hammer' value={nombre_producto} className='form-control' placeholder='Nombre Producto' required='required' ref={NameInput} handleChange={(e)=>setNombre_producto(e.target.value)}/>
            <DivInput type='text' icon='fa-trademark' value={marca} className='form-control' placeholder='Marca' required='required' handleChange={(e)=>setMarca(e.target.value)}/>
            <DivInput type='text' icon='fa-file-lines' value={descripcion} className='form-control' placeholder='Descripcion' required='required' handleChange={(e)=>setDescripcion(e.target.value)}/>
            <DivInput type='number' icon='fa-dollar-sign' value={precio} className='form-control' placeholder='Precio' required='required' handleChange={(e)=>setPrecio(e.target.value)}/>
            <DivInput type='number' icon='fa-box' value={cantidad} className='form-control' placeholder='Cantidad' required='required' handleChange={(e)=>setCantidad(e.target.value)}/>
            <DivSelect icon='fa-tag' value={categoria_id} required='required' placeholder='Seleccionar categoría' className='form-select' options={categorias} sel='categoria' handleChange={(e)=>setCategoria_id(e.target.value)}/>
            <div className='d-grid col-10 mx-auto'>
              {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className='btn btn-success' onClick={save}>
                <i className='fa-solid fa-save'/>Guardar
              </button>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
          </div>
        </Modal>
        <Modal title={title} modal='modalProductosImg'>
          <div className='modal-body'>
            <form encType='multipart/form-data' className='input-group mb-3'>
            <span className='input-group-text'>
              <i className='fa-solid fa-image'/>
            </span>
              <input type="file" name="imagen" ref={fileInputRef} onChange={handleFileChange} accept="image/*" required='required' className='form-control' placeholder='Imagen'/>
            </form>
            <p className='text-muted small'>Puedes pegar una imagen con Ctrl+V</p>
            {previewUrl && (
                <div className='mb-3'>
                  <p className='small mb-2'>Vista previa:</p>
                  <img src={previewUrl} alt='Preview' style={{maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', border: '1px solid #dee2e6', borderRadius: '0.25rem'}} />
                </div>
            )}
            <div className='d-grid col-10 mx-auto'>
              <button type='button' className='btn btn-success' onClick={save}>
                <i className='fa-solid fa-save'/>Guardar
              </button>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
          </div>
        </Modal>
      </div>
  )
}

export default Products