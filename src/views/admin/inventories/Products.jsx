import React, {useEffect, useState, useRef} from 'react';
import DivSelect from '../../../components/DivSelect.jsx';
import DivInput from '../../../components/DivInput.jsx';
import DivSearch from '../../../components/DivSearch.jsx';
import Modal from '../../../components/Modal.jsx';
import {confirmation, sendRequest} from '../../../functions.jsx';
import InputImg from "../../../components/InputImg.jsx";

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Campos del formulario
  const [id, setId] = useState('');
  const [nombre_producto, setNombre_producto] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [marca, setMarca] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria_id, setCategoria_id] = useState(0);

  // Control de interfaz
  const [operation, setOperation] = useState('');
  const [title, setTitle] = useState('');
  const [classTable, setClassTable] = useState('d-none');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)

  const NameInput = useRef();
  const close = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    getProducts();
    getCategory();
  }, []);

  // --- Soporte Ctrl+V para pegar imagen ---
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
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  const getProducts = async () => {
    const apiUrl =
      searchTerm.trim() !== ''
        ? `/productos/search/${searchTerm.trim()}`
        : '/productos';
    const res = await sendRequest('GET', '', apiUrl, '');
    setProductos(res.data);
    setClassTable('');
  };

  const getCategory = async () => {
    const res = await sendRequest('GET', '', '/categorias', '');
    setCategorias(res.data);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    getProducts();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen');
      return;
    }
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);

    // Sincronizar input file
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const deleteProduct = async (id) => {
    await confirmation(id, `/productos/${id}`, '/admin/productos');
  };

  const clear = () => {
    setNombre_producto('');
    setMarca('');
    setDescripcion('');
    setPrecio('');
    setCantidad('');
    setCategoria_id('');
    setImage(null);
    setPreviewUrl(null);
  };

  const openModal = (op, id, n, m, d, p, c, ca, img) => {
    clear();
    setIsModalOpen(true)
    setTimeout(() => NameInput.current?.focus(), 600);
    setOperation(op);
    setId(id);
    if (op === 1) {
      setTitle('Agregar producto');
    } else {
      setTitle('Editar producto');
      setNombre_producto(n);
      setMarca(m);
      setDescripcion(d);
      setPrecio(p);
      setCantidad(c);
      setCategoria_id(ca);
      setPreviewUrl(img ? img : null); // mostrar imagen actual si hay
    }
  };

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const save = async (e) => {
    e.preventDefault();
    let method;
    let url;
    let body;
    let isFormData = false;

    const formData = new FormData();
    const data = {
      nombre_producto,
      marca,
      descripcion,
      precio,
      cantidad,
      categorias_id: categoria_id,
    };

    if (operation === 1) {
      method = 'POST';
      url = '/productos';
      isFormData = true;
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (image) formData.append('image', image);
      body = formData;
    } else {
      method = 'PUT';
      url = `/productos/${id}`;
      if (image) {
        isFormData = true;
        Object.entries(data).forEach(([key, value]) =>
          formData.append(key, value)
        );
        if (image) formData.append('image', image);
        body = formData;
      } else {
        body = data;
      }
    }

    const res = await sendRequest(
      method,
      body,
      url,
      '/admin/productos',
      true,
      isFormData
    );

    if (res.status === 'SUCCESS') {
      close.current.click();
      clear();
      await getProducts();
    }
  };

  const calculateTotalSales = () => {
    let total = 0
    productos.forEach((producto) => {
      total += (producto.precio * producto.cantidad)
    })
    return new Intl.NumberFormat("es-CO").format(total)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="title-h2">
          Productos
        </h1>
        <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"/>
      </div>

      {/* Búsqueda */}
      <div className="max-w-7xl mx-auto mb-6 flex">
        <DivSearch
          placeholder="Buscar productos"
          handleChange={handleSearchChange}
          value={searchTerm}
          handleSearchSubmit={handleSearchSubmit}
        >
          <button
            type="button"
            className="button-add"
            onClick={() => openModal(1)}>
            <i className="icon-[material-symbols--add-circle-outline] text-xl"/>
            <span className="hidden sm:inline">Añadir</span>
          </button>
        </DivSearch>
      </div>

      {/* Tabla */}
      <div className="max-w-8xl mx-auto mb-6">
        <div className={"bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"}>
          <div className={`overflow-x-auto ${classTable}`}>
            {Object.entries(
              productos.reduce((acc, prod) => {
                if (!acc[prod.categoria]) acc[prod.categoria] = [];
                acc[prod.categoria].push(prod);
                return acc;
              }, {})
            ).map(([categoria, items]) => (
              <React.Fragment key={categoria}>
                {/* Encabezado de Categoría */}
                <div className="bg-red-600 py-1.5 px-6">
                  <h2 className="text-center font-bold text-white text-xl uppercase">
                    {categoria}
                  </h2>
                </div>

                {/* Tabla de productos de esta categoría */}
                <table className="w-full">
                  <thead className="bg-orange-600 text-white">
                  <tr>
                    <th className="py-1.5 px-6 text-left font-bold text-sm uppercase tracking-wider">#</th>
                    <th className="py-1.5 px-6 text-center tracking-wider"/>
                    <th className="py-1.5 px-6 text-left font-bold text-sm uppercase tracking-wider">Producto</th>
                    <th className="py-1.5 px-6 text-left font-bold text-sm uppercase tracking-wider">Marca</th>
                    <th className="py-1.5 px-6 text-center font-bold text-sm uppercase tracking-wider">Cantidad</th>
                    <th className="py-1.5 px-6 text-right font-bold text-sm uppercase tracking-wider">Precio/u</th>
                    <th className="py-1.5 px-6 text-right font-bold text-sm uppercase tracking-wider">Total</th>
                    <th className="py-1.5 px-6 text-center font-bold text-sm uppercase tracking-wider w-24">Editar</th>
                    <th className="py-1.5 px-6 text-center font-bold text-sm uppercase tracking-wider w-24">Eliminar</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  {items.map((row, index) => (
                    <tr key={row.id} className="hover:bg-red-50 transition-colors">
                      <td className="py-1.5 px-6 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="h-[30px] w-[30px]">
                        <img src={row.url_imagen} alt="Imagen"/>
                      </td>
                      <td
                        className="py-1.5 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{row.nombre_producto}</td>
                      <td className="py-1.5 px-6 whitespace-nowrap text-sm text-gray-900">{row.marca}</td>
                      <td className="py-1.5 px-6 whitespace-nowrap text-sm text-gray-900">{row.cantidad}</td>
                      <td className="py-1.5 px-6 whitespace-nowrap text-sm text-gray-900 text-right">
                        ${new Intl.NumberFormat("es-CO").format(row.precio)}
                      </td>
                      <td className="py-1.5 px-6 text-right">
                        ${new Intl.NumberFormat("es-CO").format(row.precio * row.cantidad)}
                      </td>
                      <td className="py-1.5 px-3 text-center">
                        <button
                          type="button"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white w-full p-1.5 rounded-lg transition-all duration-200 shadow hover:shadow-lg transform hover:scale-105"
                          onClick={() =>
                            openModal(
                              3,
                              row.id,
                              row.nombre_producto,
                              row.marca,
                              row.descripcion,
                              row.precio,
                              row.cantidad,
                              row.categoria_id,
                              row.url_imagen
                            )
                          }>
                          <i className="fa-solid fa-pen-to-square"/>
                        </button>
                      </td>
                      <td className="py-1.5 px-3 text-center">
                        <button
                          type="button"
                          className="bg-red-600 hover:bg-red-700 text-white w-full p-1.5 rounded-lg transition-all duration-200 shadow hover:shadow-lg transform hover:scale-105"
                          onClick={() => deleteProduct(row.id)}>
                          <i className="fa-solid fa-trash"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </React.Fragment>
            ))}

            <table className="w-full">
              <tfoot className="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <th colSpan='8' className="py-4 px-4 text-right text-base font-bold text-gray-900 uppercase">
                  Total
                </th>
                <th className="py-4 px-4 text-base font-bold text-green-600 whitespace-nowrap">
                  ${calculateTotalSales()}
                </th>
                <th className="py-4 px-4"></th>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Modal único para agregar/editar */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={title}>
        <div className="flex flex-col gap-2">
          <DivInput
            label="Producto"
            id="producto"
            type="text"
            icon="icon-[fluent-mdl2--product]"
            value={nombre_producto}
            placeholder="Nombre Producto"
            required
            ref={NameInput}
            handleChange={(e) => setNombre_producto(e.target.value)}
          />
          <DivInput
            label="Marca"
            id="marca"
            type="text"
            icon="icon-[tabler--tag]"
            value={marca}
            placeholder="Marca"
            required
            handleChange={(e) => setMarca(e.target.value)}
          />
          <DivInput
            label="Descripción"
            id="descripcion"
            type="text"
            icon="icon-[material-symbols--description-outline]"
            value={descripcion}
            placeholder="Descripción"
            required
            handleChange={(e) => setDescripcion(e.target.value)}
          />
          <DivInput
            label="Precio"
            id="precio"
            type="number"
            icon="icon-[gg--dollar]"
            value={precio}
            placeholder="Precio"
            required
            handleChange={(e) => setPrecio(e.target.value)}
          />
          <DivInput
            label="Cantidad"
            id="cantidad"
            type="number"
            icon="icon-[fluent-mdl2--quantity]"
            value={cantidad}
            placeholder="Cantidad"
            required
            handleChange={(e) => setCantidad(e.target.value)}
          />
          <DivSelect
            label="Categoría"
            icon="icon-[material-symbols--category-outline]"
            name="categoria_id"
            id="categoria_id"
            value={categoria_id}
            required
            placeholder="Selecciona una categoría"
            options={categorias}
            sel="categoria"
            handleChange={(e) => setCategoria_id(e.target.value)}
          />

          {/* Imagen */}
          <InputImg
            label="Imagen del producto"
            name="imagen"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            helpText="Formatos: JPG, PNG, GIF. Max: 5MB"
          />

          <p className="text-gray-500 text-base mb-3">
            Puedes pegar una imagen con <kbd className="px-1 bg-gray-200 rounded">Ctrl</kbd>+<kbd
            className="px-1 bg-gray-200 rounded">V</kbd>
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
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold w-full py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={save}>
            <i className="icon-[material-symbols--save-outline] text-xl"/>
            Guardar
          </button>
        </div>
      </Modal>
    </div>
  )
    ;
};

export default Products;
