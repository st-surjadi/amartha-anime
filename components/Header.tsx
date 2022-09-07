import Link from "next/link"
import { SearchBar } from "./SearchBar"

export const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-container">
        <h1 className="logo"><Link href={'/'}>ANIMELIST</Link></h1>
      </div>
    </header>
  )
}
