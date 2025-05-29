import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Footer content */}
          <div className="row">
            <div className="col-md-3">
              <h5>Kategoriler</h5>
              <ul>
                <li><Link to="/">Kadın</Link></li>
                <li><Link to="/">Erkek</Link></li>
                <li><Link to="/">Çocuk</Link></li>
                <li><Link to="/">Ev & Yaşam</Link></li>
                <li><Link to="/">Süpermarket</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Kurumsal</h5>
              <ul>
                <li><Link to="/">Hakkımızda</Link></li>
                <li><Link to="/">Kariyer</Link></li>
                <li><Link to="/">İletişim</Link></li>
                <li><Link to="/">Blog</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Yardım</h5>
              <ul>
                <li><Link to="/">Sıkça Sorulan Sorular</Link></li>
                <li><Link to="/">İade ve Değişim</Link></li>
                <li><Link to="/">Kargo Takip</Link></li>
                <li><Link to="/">Kullanım Koşulları</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Bizi Takip Edin</h5>
              <div className="social-icons">
                <Link to="/"><FaFacebook /></Link>
                <Link to="/"><FaTwitter /></Link>
                <Link to="/"><FaInstagram /></Link>
                <Link to="/"><FaYoutube /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 