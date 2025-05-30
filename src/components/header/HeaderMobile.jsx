import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './HeaderMobile.scss';

const HeaderMobile = () => {
  const { cartItemCount, openMiniCart } = useCart();

  const handleCartClick = (e) => {
    e.preventDefault();
    openMiniCart();
  };

  return (
    <header className="container p-2">
      {/* Üst Alan: Menü + Logo + Sağ İkonlar */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <FiMenu size={24} />
          <Link to="/" className="logo m-0">
            Maison<span>Bloom</span>
          </Link>
        </div>
        <div className="d-flex gap-3">
          <Link to="/account">
            <FiUser size={20} />
          </Link>
          <Link to="/favorites">
            <FiHeart size={20} />
          </Link>
          <div 
            className="cart-icon-wrapper"
            onClick={handleCartClick}
            style={{ cursor: 'pointer' }}
          >
            <FiShoppingCart size={20} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </div>
        </div>
      </div>

      {/* Arama Çubuğu */}
      <div className="input-group mb-2">
        <span className="input-group-text"><FiSearch /></span>
        <input type="text" className="form-control" placeholder="Kategori, ürün veya marka ara" />
      </div>

      {/* Kategoriler: Yana Kaydırılabilir */}
      <nav className="category-scroll-wrapper">
        <div className="category-scroll d-flex gap-3">
          <a href="#">Kadın</a>
          <a href="#">Erkek</a>
          <a href="#">Anne & Çocuk</a>
          <a href="#">Ev & Yaşam</a>
          <a href="#">Süpermarket</a>
          <a href="#">Kozmetik</a>
          <a href="#">Çok Satanlar</a>
          <a href="#">Flaş Ürünler</a>
        </div>
      </nav>
    </header>
  );
};

export default HeaderMobile;
