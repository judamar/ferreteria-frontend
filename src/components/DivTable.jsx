import React from 'react'

const DivTable = ({ children, col, off, classLoad, classTable }) => {
  return (
    <div className='row mt-3'>
      <div className={`col-md-${col} offset-md-${off}`}>
        <div className={`card border border-dark text-center ${classLoad}`}>
          <div className={`table-responsive ${classTable}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DivTable