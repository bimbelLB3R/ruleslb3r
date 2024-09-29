import React from "react";
// import Medsos from './medsos';
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="font-roboto flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
