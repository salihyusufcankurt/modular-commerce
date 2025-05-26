import React from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
