import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProductList from './pages/ProductList/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { CartProvider } from './context/CartContext';
import './App.scss';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app-grid">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<div>Sepet Sayfası (daha sonra)</div>} />
            </Route>
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
