import React from 'react';
import HeaderWrapper from '../components/header/HeaderWrapper';
import FooterWrapper from '../components/footer/FooterWrapper';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <HeaderWrapper />
      <main style={{ padding: '1rem', minHeight: 'calc(100vh - 300px)' }}>
        <Outlet />
      </main>
      <FooterWrapper />
    </>
  );
};

export default MainLayout;
