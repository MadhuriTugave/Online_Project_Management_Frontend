import React from 'react'

function Inputfield({
    id,
  type,
  placeholder,
  value,
  onChange,

}) {

      // Construct the input field class string conditionally
  const inputClass = `w-full bg-white text-body-m p-4 border-b-2 text-black outline-none focus:border-b-white transition duration-300  `
    
  

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClass}
        value={value}
        onChange={onChange}
       
      />
       
    </div>
  )
}

export default Inputfield;
