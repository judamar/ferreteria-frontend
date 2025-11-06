import React from 'react'

const DivTable = ({children, col, off, classLoad, classTable}) => {
  return (
    <div className='container mx-auto px-4 mt-3'>
      <div className={`
    ${col === '12' ? 'w-full' : ''}
    ${col === '10' ? 'w-10/12 mx-auto' : ''}
    ${col === '8' ? 'w-8/12 mx-auto' : ''}
    ${col === '6' ? 'w-6/12 mx-auto' : ''}
    ${col === '4' ? 'w-4/12 mx-auto' : ''}
  `}>
        <div className={`bg-white border-2 border-gray-900 rounded-lg shadow-md text-center ${classLoad}`}>
          <div className={`overflow-x-auto ${classTable}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DivTable