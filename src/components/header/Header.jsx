import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { getCartItemCount } from '../../services/cart/cartService';
import './Header.scss';

const Header = () => {
  const categories = [
    { id: 'kadin', name: 'Kadın' },
    { id: 'erkek', name: 'Erkek' },
    { id: 'anne-cocuk', name: 'Anne & Çocuk' },
    { id: 'ev-yasam', name: 'Ev & Yaşam' },
    { id: 'supermarket', name: 'Süpermarket' },
    { id: 'kozmetik', name: 'Kozmetik' },
    { id: 'cok-satanlar', name: 'Çok Satanlar' },
    { id: 'flas-urunler', name: 'Flaş Ürünler' }
  ];

  return (
    <header className="container">
      {/* Üst Bilgi Linkleri */}
      <div className="row">
        <div className="col d-flex justify-content-end gap-3 header-top">
          <a href="#">İndirim Kuponlarım</a>
          <a href="#">Hakkımızda</a>
          <a href="#">Yardım & Destek</a>
        </div>
      </div>

      {/* Logo - Arama - Sağ Menü */}
      <div className="row align-items-center py-3">
        <div className="col-3">
          <Link to="/" className="logo mb-0">
            Maison<span>Bloom</span>
          </Link>
        </div>

        <div className="col-6">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Aradığınız ürün, kategori veya markayı yazınız" />
            <button className="btn btn-warning"><FiSearch /></button>
          </div>
        </div>

        <div className="col-3 d-flex justify-content-end gap-4">
          <div className="text-center small d-flex flex-column align-items-center">
            <FiUser size={20} />
            <span>Giriş Yap</span>
          </div>
          <div className="text-center small d-flex flex-column align-items-center">
            <FiHeart size={20} />
            <span>Favorilerim</span>
          </div>
          <div className="text-center small d-flex flex-column align-items-center">
            <FiShoppingCart size={20} />
            <span>Sepetim</span>
          </div>
        </div>
      </div>

      {/* Menü ve Kategoriler */}
      <nav className="row py-2 border-top align-items-center">
        <div className="col-12 d-flex align-items-center gap-3">
          <FiMenu className="menu-icon" />
          <button className="all-categories text-uppercase small">
            Tüm Kategoriler
            <span className="badge bg-danger text-white ms-2">Yeni</span>
          </button>

          <div className="flex-grow-1 d-flex justify-content-between flex-wrap category-menu">
            {categories.map(category => (
              <Link key={category.id} to={`/products?category=${category.id}`}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
