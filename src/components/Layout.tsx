import React, { ReactNode } from "react";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {

  return (
    <div>
      <Navbar />
      <div className="layout">{props.children}</div>
    </div>
  )
}

export default Layout;
