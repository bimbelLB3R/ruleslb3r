import React from "react";
// import Medsos from './medsos';
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="font-roboto">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
