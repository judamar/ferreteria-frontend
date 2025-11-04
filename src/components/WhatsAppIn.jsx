import React from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const WhatsAppIn = () => {
  return (
    <FloatingWhatsApp phoneNumber={import.meta.env.VITE_FERRE_PHONE_NUM} accountName='Construmanta P' avatar='./logo.ico' statusMessage='Responde aproximadamente en 1 hora.' chatMessage='Hola, ¿en qué puedo ayudarte?' placeholder='Escribe un mensaje.'/>
  )
}

export default WhatsAppIn