import { ReactNode } from "react"
import { Footer } from "./Footer";
import { Header } from "./Header";

export interface LayoutProps {
  children: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div className="wrapper">
      <div className="layout-container">
        <Header></Header>
          <div className="page-container">
            { children }
          </div>
        <Footer></Footer>
      </div>
    </div>
  )
}
