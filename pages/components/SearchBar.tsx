import React, { useRef } from "react"

export const SearchBar = () => {

  const inputSearch = useRef() as React.MutableRefObject<HTMLInputElement>;

  const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputSearch.current.value = e.target.value;
  }

  return (
    <div className="search-bar-container">
      <form autoComplete="off">
        <input className="form-input" type={'text'} ref={inputSearch} onChange={(e) => onChangeInputSearch(e)}
          placeholder="Search"
        />
      </form>
    </div>
  )
}
