import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import storage from '../storage/storage.jsx'

const ProtectedRoutes = ({ children }) => {
  const authUser = storage.get('authUser')
  if (!authUser || authUser.esAdmin !== 1) {
    return <Navigate to="/catalogo" />
  }
  return <Outlet/>
}

export default ProtectedRoutes