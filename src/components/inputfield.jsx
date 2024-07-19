import React from 'react'

function Inputfield({
    id,
  type,
  placeholder,
  value,
  onChange,

}) {

      // Construct the input field class string conditionally
  const inputClass = `w-full bg-white p-3 rounded-md text-black border border-1 border-slate-500   `
    
  

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
