import React from 'react'

// eslint-disable-next-line react/prop-types
const InfoDev = ({ href = '../public/HV-Juan_David_Martin_Moreno.pdf' }) => {
  const btnStyle = {
    position: 'fixed',
    left: '25px',
    bottom: '25px',
    zIndex: 2000,
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Hoja de vida"
      style={btnStyle}
      className="btn btn-success btn-lg shadow"
    > HV-
      <i className="fa-solid fa-file-pdf" />
    </a>
  )
}

export default InfoDev