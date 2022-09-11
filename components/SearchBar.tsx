import React, { useRef } from "react"

export const SearchBar = (props: { 
  inputSearch: any; 
  onClickSearch: any;
  isLoading: boolean;
}) => {

  const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (props.inputSearch) {
      props.inputSearch.current.value = e.target.value;
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!props.isLoading) {
      props.onClickSearch();
    }
  }

  return (
    <div className="search-bar-container">
      {
        props.inputSearch && (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input className="form-input" type={'text'} ref={props.inputSearch} onChange={(e) => onChangeInputSearch(e)}
              placeholder="Search" disabled={props.isLoading} data-testid="input-search"
            />
            <a className="btn-search" type="submit" data-testid="button-search"><img src="/images/searchbar-icon.png" alt="search-icon" onClick={props.onClickSearch} /></a>
          </form>
        )
      }
    </div>
  )
}
