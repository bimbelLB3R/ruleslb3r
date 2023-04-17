import React, { Children } from 'react';
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
