import React from 'react'

function Dropdown({
    id,
  type,
  placeholder,
  value,
  onChange,
  child
}) {

    const inputClass = `w-full bg-white text-body-m p-3   text-black outline-none focus:border-b-white transition duration-300  `
  return (
    <div>
        <select
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClass}
        value={value}
        onChange={onChange}
       
      >
      
     {child}
        </select>
    </div>
  )
}

export default Dropdown
