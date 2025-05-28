import React, { useState } from 'react';
import { FiHeart, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import '../../style/product-detail/ProductDetailMobile.css';

const ProductDetailMobile = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handlePreferenceChange = (preferenceName, optionName) => {
    setSelectedPreferences(prev => ({
      ...prev,
      [preferenceName]: optionName
    }));
  };

  return (
    <div className="product-detail-mobile">
      {/* Görsel Slider */}
      <div className="image-slider">
        <button className="slider-button prev" onClick={prevImage}>
          <FiChevronLeft />
        </button>
        <img 
          src={product.images[currentImageIndex]} 
          alt={product.title} 
          className="product-image"
        />
        <button className="slider-button next" onClick={nextImage}>
          <FiChevronRight />
        </button>
        <div className="image-dots">
          {product.images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentImageIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Ürün Bilgileri */}
      <div className="product-info-mobile">
        <div className="product-header-mobile">
          <h1 className="product-title-mobile">{product.title}</h1>
          <div className="product-brand-mobile">{product.brand}</div>
        </div>

        <div className="product-rating-mobile">
          <div className="rating-stars-mobile">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
            <span className="rating-value-mobile">{product.rating}</span>
          </div>
          <div className="review-count-mobile">{product.reviewCount} Değerlendirme</div>
        </div>

        <div className="product-seller-mobile">
          <div className="seller-info-mobile">
            <span className="seller-name-mobile">Satıcı: {product.seller.name}</span>
            {product.seller.isOfficial && (
              <span className="seller-badge-mobile">Resmi Satıcı</span>
            )}
            <span className="seller-rating-mobile">{product.seller.rating}</span>
          </div>
        </div>

        <div className="product-price-mobile">
          <div className="current-price-mobile">{calculateTotalPrice().current}TL</div>
          <div className="old-price-mobile">{calculateTotalPrice().old}TL</div>
        </div>

        <div className="product-variants-mobile">
          {product.productPreferences.map((preference) => (
            <div key={preference.name} className="variant-section-mobile">
              <h3>{preference.name}</h3>
              <div className="preference-options-mobile">
                {preference.options.map(option => (
                  <button
                    key={option.name}
                    className={`preference-option-mobile ${selectedPreferences[preference.name] === option.name ? 'selected' : ''}`}
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

        <div className="product-shipping-mobile">
          <div className="shipping-info-mobile">
            <span className="delivery-time-mobile">
              Tahmini Teslimat: {product.shipping.estimatedDelivery}
            </span>
            {product.shipping.isFreeShipping && (
              <span className="free-shipping-mobile">Ücretsiz Kargo</span>
            )}
          </div>
        </div>

        {/* Sabit Alt Bar */}
        <div className="bottom-bar-mobile">
          <div className="bottom-bar-actions">
            <button className="wishlist-button-mobile">
              <FiHeart />
            </button>
            <button className="share-button-mobile">
              <FiShare2 />
            </button>
            <button className="add-to-cart-mobile">Sepete Ekle</button>
          </div>
        </div>

        {/* Ürün Detayları Accordion */}
        <div className="product-details-accordion">
          <div className="accordion-item">
            <h3>Ürün Açıklaması</h3>
            <p>{product.description}</p>
          </div>
          <div className="accordion-item">
            <h3>Ürün Özellikleri</h3>
            <div className="specifications-list-mobile">
              {product.specifications.map((spec, index) => (
                <div key={index} className="specification-item-mobile">
                  <span className="spec-label-mobile">{spec.label}:</span>
                  <span className="spec-value-mobile">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailMobile; 