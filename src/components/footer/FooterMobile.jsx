import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaChevronDown } from 'react-icons/fa';
import '../../style/footer/FooterMobile.css';

const FooterMobile = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  const sections = [
    {
      title: 'Kategoriler',
      links: ['Kadın', 'Erkek', 'Çocuk', 'Ev & Yaşam', 'Süpermarket']
    },
    {
      title: 'Kurumsal',
      links: ['Hakkımızda', 'Kariyer', 'İletişim', 'Blog']
    },
    {
      title: 'Yardım',
      links: ['Sıkça Sorulan Sorular', 'İade ve Değişim', 'Kargo Takip', 'Kullanım Koşulları']
    },
    {
      title: 'Kampanyalar',
      links: ['Aktif Kampanyalar', 'Elite Üyelik', 'Hediye Fırsatları', 'Fırsat Ürünleri']
    }
  ];

  return (
    <footer className="footer-mobile">
      <div className="footer-mobile-container">
        {/* Akordiyon Menü */}
        {sections.map((section, index) => (
          <div key={index} className="accordion-section">
            <button
              className="accordion-button"
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              <FaChevronDown
                className={`accordion-icon ${openSection === section.title ? 'open' : ''}`}
              />
            </button>
            {openSection === section.title && (
              <div className="accordion-content">
                <ul className="mobile-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to="/" className="mobile-link">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* Sosyal Medya */}
        <div className="social-section">
          <h3 className="social-title">Bizi Takip Edin</h3>
          <div className="social-icons-mobile">
            <a href="#" className="social-icon-mobile"><FaFacebook size={20} /></a>
            <a href="#" className="social-icon-mobile"><FaTwitter size={20} /></a>
            <a href="#" className="social-icon-mobile"><FaInstagram size={20} /></a>
            <a href="#" className="social-icon-mobile"><FaYoutube size={20} /></a>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="footer-mobile-bottom">
          <p className="mobile-copyright">
            © 2024 Modular Commerce. Tüm hakları saklıdır.
          </p>
          <div className="mobile-legal-links">
            <Link to="/" className="mobile-legal-link">Gizlilik Politikası</Link>
            <Link to="/" className="mobile-legal-link">Kullanım Koşulları</Link>
            <Link to="/" className="mobile-legal-link">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMobile; 