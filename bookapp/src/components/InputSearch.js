import React from 'react'

function InputSearch({searchText,handleSearch}) {
  return (
    <>
        <input type="search" value={searchText} onChange={handleSearch} className='search-input ' placeholder='search by title and description.....'/>
    </>
  )
}

export default InputSearch