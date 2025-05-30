import React, { useEffect } from 'react';
import HeaderWrapper from '../components/header/HeaderWrapper';
import FooterWrapper from '../components/footer/FooterWrapper';
import MiniCart from '../components/cart/MiniCart';
import { useCart } from '../context/CartContext';
import { Outlet } from 'react-router-dom';
import './MainLayout.scss';

const MainLayout = () => {
  const { isMiniCartOpen, closeMiniCart } = useCart();

  useEffect(() => {
    if (isMiniCartOpen) {
      document.body.classList.add('mini-cart-open');
    } else {
      document.body.classList.remove('mini-cart-open');
    }
    
    return () => {
      document.body.classList.remove('mini-cart-open');
    };
  }, [isMiniCartOpen]);

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

      <MiniCart isOpen={isMiniCartOpen} onClose={closeMiniCart} />
    </>
  );
};

export default MainLayout;
