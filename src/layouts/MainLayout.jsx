import React from 'react';
import HeaderWrapper from '../components/header/HeaderWrapper';
import FooterWrapper from '../components/footer/FooterWrapper';
import { Outlet } from 'react-router-dom';
import '../style/layouts/MainLayout.css';

const MainLayout = () => {
  return (
    <>
      <header className="header">
        <HeaderWrapper />
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <FooterWrapper />
      </footer>
    </>
  );
};

export default MainLayout;
