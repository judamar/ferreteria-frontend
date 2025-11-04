import React, {forwardRef, useEffect, useRef} from 'react'

export default forwardRef(({ options=[], sel, sel2='', separator='', icon='user', name, id, value, className, placeholder='Seleccionar', required, disabled='disabled', isFocused, handleChange}, ref) => {
  const input = ref ? ref: useRef()
  useEffect(()=>{
    if(isFocused){
      input.current.focus()
    }
  },[input, isFocused])
  return (
    <div className='input-group mb-3'>
      <span className='input-group-text'>
        <i className={`fa-solid ${icon}`}/>
      </span>
      <select name={name} id={id} value={value} className={className} href={input} required={required} onChange={(e) => handleChange(e)}>
        <option value="" disabled={disabled}>{placeholder}</option>
        { options.map((op) => (
          <option value={op.id} key={op.id}>
            {op[sel]}{separator}{op[sel2]}
          </option>
        ))}
      </select>
    </div>
  )
})