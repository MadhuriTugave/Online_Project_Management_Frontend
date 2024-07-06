import React from 'react'

function Inputfield({
    id,
  type,
  placeholder,
  value,
  onChange,

}) {

      // Construct the input field class string conditionally
  const inputClass = `w-full bg-white text-body-m p-3 border border-1 border-black rounded-md text-black  focus:border-b-black transition duration-300  `
    
  

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
