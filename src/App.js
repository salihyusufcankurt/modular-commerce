import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProductList from './pages/ProductList';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<div>Sepet Sayfası (daha sonra)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
