import React, {forwardRef, useEffect, useRef} from 'react'

export default forwardRef(({
                             options = [],
                             sel,
                             sel2 = '',
                             separator = '',
                             icon = 'user',
                             label,
                             name,
                             id,
                             value,
                             placeholder = 'Seleccionar',
                             required,
                             disabled = 'disabled',
                             isFocused,
                             handleChange
                           }, ref) => {
  const input = ref ? ref : useRef()
  useEffect(() => {
    if (isFocused) {
      input.current.focus()
    }
  }, [input, isFocused])
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-medium text-gray-900">
        {label}
      </label>
      <div
        className="mt-2 flex items-center bg-white rounded-md px-3 py-1.5 outline -outline-offset-1 outline-gray-700 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-700 gap-2"
      >
        <i className={`${icon} text-gray-900 text-2xl`}/>
        <select
          name={name}
          id={id}
          value={value}
          required={required}
          onChange={handleChange}
          className="flex-1 bg-transparent outline-none text-gray-900 text-lg py-1 px-2"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((op) => (
            <option key={op.id} value={op.id}>
              {op[sel]}
              {separator}
              {sel2 ? op[sel2] : ''}
            </option>
          ))}
        </select>
      </div>
    </div>


  )
})