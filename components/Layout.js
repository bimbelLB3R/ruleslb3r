import React, { Children } from 'react';
// import Medsos from './medsos';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
