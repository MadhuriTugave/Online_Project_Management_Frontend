import React from 'react'
import { FaSearch } from 'react-icons/fa'

function search() {
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by projectname..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="p-2 border-b-2  rounded-l"
        />
        <div className="p-2  rounded-r">
          <FaSearch/>
        </div>
      </div>
    </>
  )
}

export default search
