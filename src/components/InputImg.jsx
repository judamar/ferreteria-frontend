import React, {forwardRef} from 'react'

const InputImg = forwardRef(({
                              label = 'Imagen',
                              name = 'imagen',
                              accept = 'image/*',
                              onChange,
                              icon = 'icon-[lucide--image]',
                              helpText = 'Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB',
                              required = false
                            }, ref) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>

      <div className="flex items-center bg-white border border-gray-600 rounded-lg shadow-sm overflow-hidden hover:border-gray-400 transition-colors">
        <span className="px-4 py-3 flex items-center justify-center text-gray-900">
          <i className={`${icon} text-xl`}/>
        </span>
        <input
          type="file"
          name={name}
          ref={ref}
          onChange={onChange}
          accept={accept}
          required={required}
          className="flex-1 px-4 py-3 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-gray-500 focus:ring-inset file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold cursor-pointer"
        />
      </div>

      {helpText && (
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <i className="fa-solid fa-info-circle"></i>
          {helpText}
        </p>
      )}
    </div>
  )
})

InputImg.displayName = 'InputImg'

export default InputImg