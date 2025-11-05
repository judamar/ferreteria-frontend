import React from 'react'

const WhatsAppButton = ({producto}) => {
  const phoneNumber = import.meta.env.VITE_FERRE_PHONE_NUM
  const message = `Hola, ¿cómo estás?\nQuisiera obtener información sobre este producto:\n*${producto}*. \nGracias`

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <button type='button' className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200" onClick={handleClick}>
      <i className="fab fa-whatsapp text-bold"/>
      Preguntanos
    </button>
  );
};

export default WhatsAppButton;
