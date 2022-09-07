import React, { useRef } from "react"

export const SearchBar = (props: { 
  inputSearch: any; 
  onClickSearch: any;
}) => {

  const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (props.inputSearch) {
      props.inputSearch.current.value = e.target.value;
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.onClickSearch();
  }

  return (
    <div className="search-bar-container">
      {
        props.inputSearch && (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input className="form-input" type={'text'} ref={props.inputSearch} onChange={(e) => onChangeInputSearch(e)}
              placeholder="Search"
            />
            <a className="btn-search" type="button"><img src="/images/searchbar-icon.png" alt="search-icon" onClick={props.onClickSearch} /></a>
          </form>
        )
      }
    </div>
  )
}
