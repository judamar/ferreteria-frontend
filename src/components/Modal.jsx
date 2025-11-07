import React from 'react'

const Modal = ({ isOpen, onClose, title, children, showFooter = true }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/40 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-red-700 text-white py-4 px-6 rounded-t-2xl flex justify-between items-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <i className="icon-[material-symbols--close] text-2xl" />
          </button>
        </div>

        {/* Body con scroll */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-center rounded-b-2xl">
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold w-full py-2 px-6 rounded-lg transition-colors duration-200"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>

  )
}

export default Modal