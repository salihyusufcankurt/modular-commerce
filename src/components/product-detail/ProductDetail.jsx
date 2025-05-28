import React, { useState, useEffect } from 'react';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import '../../style/product-detail/ProductDetail.css';

const ProductDetail = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedPreferences, setSelectedPreferences] = useState(
    product.productPreferences.reduce((acc, pref) => ({
      ...acc,
      [pref.name]: pref.options[0].name
    }), {})
  );

  const calculateTotalPrice = () => {
    const basePrice = parseFloat(product.price.base);
    const oldPrice = parseFloat(product.price.old);
    const totalModifier = product.productPreferences.reduce((total, pref) => {
      const selectedOption = pref.options.find(opt => opt.name === selectedPreferences[pref.name]);
      return total + (selectedOption ? selectedOption.priceModifier : 0);
    }, 0);
    return {
      current: (basePrice + totalModifier).toFixed(2),
      old: (oldPrice + totalModifier).toFixed(2)
    };
  };

  const handlePreferenceChange = (preferenceName, optionName) => {
    setSelectedPreferences(prev => ({
      ...prev,
      [preferenceName]: optionName
    }));
  };

  return (
    <div className="product-detail">
      {/* Sol Taraf - Ürün Görselleri */}
      <div className="product-images">
        <div className="thumbnail-list">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`${product.title} - ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="main-image">
          <img src={selectedImage} alt={product.title} />
        </div>
      </div>

      {/* Sağ Taraf - Ürün Bilgileri */}
      <div className="product-info">
        <div className="product-header">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-brand">{product.brand}</div>
          
          <div className="product-rating">
            <div className="rating-stars">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                />
              ))}
              <span className="rating-value">{product.rating}</span>
            </div>
            <div className="review-count">{product.reviewCount} Değerlendirme</div>
          </div>
        </div>

        <div className="product-seller">
          <div className="seller-info">
            <span className="seller-name">Satıcı: {product.seller.name}</span>
            {product.seller.isOfficial && <span className="seller-badge">Resmi Satıcı</span>}
            <span className="seller-rating">{product.seller.rating}</span>
          </div>
        </div>

        <div className="product-price">
          <div className="current-price">{calculateTotalPrice().current}TL</div>
          <div className="old-price">{calculateTotalPrice().old}TL</div>
        </div>

        <div className="product-variants">
          {product.productPreferences.map((preference) => (
            <div key={preference.name} className="variant-section">
              <h3>{preference.name}</h3>
              <div className="preference-options">
                {preference.options.map(option => (
                  <button
                    key={option.name}
                    className={`preference-option ${selectedPreferences[preference.name] === option.name ? 'selected' : ''}`}
                    onClick={() => handlePreferenceChange(preference.name, option.name)}
                  >
                    {option.name}
                    {option.priceModifier > 0 && ` (+${option.priceModifier}TL)`}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="product-actions">
          <button className="add-to-cart">Sepete Ekle</button>
          <button className="wishlist-button">
            <FiHeart />
          </button>
          <button className="share-button">
            <FiShare2 />
          </button>
        </div>

        <div className="product-description">
          <h3>Ürün Açıklaması</h3>
          <p>{product.description}</p>
        </div>

        <div className="product-specifications">
          <h3>Ürün Özellikleri</h3>
          <div className="specifications-list">
            {product.specifications.map((spec, index) => (
              <div key={index} className="specification-item">
                <span className="spec-label">{spec.label}:</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 