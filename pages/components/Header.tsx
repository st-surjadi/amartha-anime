import { SearchBar } from "./SearchBar"

export const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-container">
        <h1 className="logo">ANIMELIST</h1>
      </div>
      <div className="search-container">
        <SearchBar></SearchBar>
      </div>
    </header>
  )
}
