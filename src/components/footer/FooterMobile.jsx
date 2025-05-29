import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaChevronDown } from 'react-icons/fa';
import './FooterMobile.scss';

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
      <div className="container">
        <div className="accordion-wrapper">
          {sections.map((section, index) => (
            <div key={index} className="accordion-section">
              <button
                className="accordion-button"
                onClick={() => toggleSection(index)}
              >
                <span>{section.title}</span>
                <FaChevronDown
                  className={`accordion-icon ${openSection === index ? 'open' : ''}`}
                />
              </button>
              {openSection === index && (
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
          <div className="social-section">
            <h6 className="social-title">Bizi Takip Edin</h6>
            <div className="social-icons-mobile">
              <Link to="/"><FaFacebook size={24} /></Link>
              <Link to="/"><FaTwitter size={24} /></Link>
              <Link to="/"><FaInstagram size={24} /></Link>
              <Link to="/"><FaYoutube size={24} /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMobile; 