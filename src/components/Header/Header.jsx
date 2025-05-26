import React from 'react';
import { FiMenu, FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import '../../Style/Header/Header.css';

const Header = () => {
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
          <h1 className="logo mb-0">Masion<span>Bloom</span></h1>
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
      <nav className="row py-2 border-top border-bottom align-items-center">
        <div className="col-12 d-flex align-items-center gap-3">
          <FiMenu className="menu-icon" />
          <button className="btn btn-link p-0 text-uppercase small all-categories">
            Tüm Kategoriler
            <span className="badge bg-danger text-white ms-2">Yeni</span>
          </button>

          <div className="flex-grow-1 d-flex justify-content-between flex-wrap category-menu">
            <a href="#">Kadın</a>
            <a href="#">Erkek</a>
            <a href="#">Anne & Çocuk</a>
            <a href="#">Ev & Yaşam</a>
            <a href="#">Süpermarket</a>
            <a href="#">Kozmetik</a>
            <a href="#">Çok Satanlar </a>
            <a href="#">Flaş Ürünler </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
