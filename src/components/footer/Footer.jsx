import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../../style/footer/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Kategoriler */}
          <div className="footer-section">
            <h3>Kategoriler</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Kadın</Link></li>
              <li><Link to="/" className="footer-link">Erkek</Link></li>
              <li><Link to="/" className="footer-link">Çocuk</Link></li>
              <li><Link to="/" className="footer-link">Ev & Yaşam</Link></li>
              <li><Link to="/" className="footer-link">Süpermarket</Link></li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div className="footer-section">
            <h3>Kurumsal</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Hakkımızda</Link></li>
              <li><Link to="/" className="footer-link">Kariyer</Link></li>
              <li><Link to="/" className="footer-link">İletişim</Link></li>
              <li><Link to="/" className="footer-link">Blog</Link></li>
            </ul>
          </div>

          {/* Yardım */}
          <div className="footer-section">
            <h3>Yardım</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Sıkça Sorulan Sorular</Link></li>
              <li><Link to="/" className="footer-link">İade ve Değişim</Link></li>
              <li><Link to="/" className="footer-link">Kargo Takip</Link></li>
              <li><Link to="/" className="footer-link">Kullanım Koşulları</Link></li>
            </ul>
          </div>

          {/* Kampanyalar */}
          <div className="footer-section">
            <h3>Kampanyalar</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Aktif Kampanyalar</Link></li>
              <li><Link to="/" className="footer-link">Elite Üyelik</Link></li>
              <li><Link to="/" className="footer-link">Hediye Fırsatları</Link></li>
              <li><Link to="/" className="footer-link">Fırsat Ürünleri</Link></li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div className="footer-section">
            <h3>Bizi Takip Edin</h3>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaFacebook size={24} /></a>
              <a href="#" className="social-icon"><FaTwitter size={24} /></a>
              <a href="#" className="social-icon"><FaInstagram size={24} /></a>
              <a href="#" className="social-icon"><FaYoutube size={24} /></a>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 Modular Commerce. Tüm hakları saklıdır.
          </p>
          <div className="footer-legal">
            <Link to="/" className="legal-link">Gizlilik Politikası</Link>
            <Link to="/" className="legal-link">Kullanım Koşulları</Link>
            <Link to="/" className="legal-link">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 