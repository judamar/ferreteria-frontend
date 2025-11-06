import React, {forwardRef, useEffect, useRef} from 'react'

export default forwardRef(({
                             label,
                             type = 'text',
                             icon = 'user',
                             placeholder = '',
                             name,
                             id,
                             value,
                             className,
                             required,
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
        className='mt-2 flex justify-items-center items-center bg-white rounded-md px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-600 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600 gap-2'>
        <i className={`${icon} text-gray-900 text-2xl`}/>
        <input type={type}
               placeholder={placeholder}
               name={name}
               id={id}
               value={value || ''}
               className={className || "block w-full bg-transparent text-black placeholder-gray-600 focus:outline-none text-lg"}
               ref={input}
               required={required}
               onChange={(e) => handleChange(e)}/>
      </div>
    </div>
  )
})