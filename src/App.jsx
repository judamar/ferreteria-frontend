import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/Nav.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import Products from './views/admin/Products.jsx'
import Categories from './views/admin/Categories.jsx'
import Tools from './views/admin/Tools.jsx'
import SalesStatuses from './views/admin/SalesStatuses.jsx'
import Users from './views/admin/Users.jsx'
import Providers from './views/admin/Providers.jsx'
import Sugerencias from './views/admin/Suggestions.jsx'
import ToolsStatuses from './views/admin/ToolsStatuses.jsx'
import ReservationStatuses from './views/admin/ReservationStatuses.jsx'
import Reservations from './views/admin/Reservations.jsx'
import Sales from './views/admin/sales/index.jsx'
import CreateSale from './views/admin/sales/CreateSale.jsx'
import InvoiceTemplate from './utils/InvoiceTemplate.jsx'
import Catalog from './views/public/Catalog.jsx'
import ToolsCatalog from './views/public/ToolsCatalog.jsx'
import About from './views/public/About.jsx'
import TermsAndPrivacy from './views/public/TYC.jsx'
import PublicSuggestion from './views/public/PublicSuggestion.jsx'
import WhatsAppIn from './components/WhatsAppIn.jsx'
import InfoDev from './components/InfoDev.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComponent/>
        <WhatsAppIn/>
        <InfoDev/>
        <Routes>
          <Route path="/" element={<Catalog/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/catalogo" element={<Catalog/>}/>
          <Route path="/herramientas" element={<ToolsCatalog/>}/>
          <Route path="/acerca_de" element={<About/>}/>
          <Route path="/terminos_y_condiciones" element={<TermsAndPrivacy/>}/>
          <Route path="/sugerencias" element={<PublicSuggestion/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/admin/usuarios' element={<Users/>}/>
            <Route path='/admin/productos' element={<Products/>}/>
            <Route path='/admin/categorias' element={<Categories/>}/>
            <Route path='/admin/herramientas' element={<Tools/>}/>
            <Route path='/admin/estados_herramientas' element={<ToolsStatuses/>}/>
            <Route path='/admin/estados_reservas' element={<ReservationStatuses/>}/>
            <Route path='/admin/reservas' element={<Reservations/>}/>
            <Route path='/admin/estados_ventas' element={<SalesStatuses/>}/>
            <Route path='/admin/ventas' element={<Sales/>}/>
            <Route path='/admin/ventas/factura/:id' element={<InvoiceTemplate/>}/>
            <Route path='/admin/ventas/crear' element={<CreateSale/>}/>
            <Route path='/admin/proveedores' element={<Providers/>}/>
            <Route path='/admin/sugerencias' element={<Sugerencias/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
