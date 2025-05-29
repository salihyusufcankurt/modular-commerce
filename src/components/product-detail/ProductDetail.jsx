import React, { useState, useEffect } from 'react';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import './ProductDetail.scss';

const ProductDetailView = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPreferences, setSelectedPreferences] = useState({});

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }

    if (product?.productPreferences?.length > 0) {
      const initialPreferences = product.productPreferences.reduce((acc, pref) => ({
        ...acc,
        [pref.name]: pref.options[0]?.name || ''
      }), {});
      setSelectedPreferences(initialPreferences);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail">
        <div className="loading">Ürün yükleniyor...</div>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    const basePrice = parseFloat(product.price?.base || 0);
    const oldPrice = parseFloat(product.price?.old || 0);
    const totalModifier = product.productPreferences?.reduce((total, pref) => {
      const selectedOption = pref.options?.find(opt => opt.name === selectedPreferences[pref.name]);
      return total + (selectedOption?.priceModifier || 0);
    }, 0) || 0;
    
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
        <div className="main-image">
          <img src={selectedImage} alt={product.title} />
        </div>
        <div className="thumbnail-images">
          {product.images?.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`${product.title} - ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Sağ Taraf - Ürün Bilgileri */}
      <div className="product-info">
        <div className="product-header">
          <h1 className="product-title">{product.title}</h1>
          {product.brand && <div className="product-brand">{product.brand}</div>}
          
          <div className="product-rating">
            <div className="rating-stars">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < Math.floor(product.rating || 0) ? 'star-filled' : 'star-empty'}
                />
              ))}
              <span className="rating-value">{product.rating || 0}</span>
            </div>
            <div className="review-count">{product.reviewCount || 0} Değerlendirme</div>
          </div>
        </div>

        {product.seller && (
          <div className="product-seller">
            <div className="seller-info">
              <span className="seller-name">Satıcı: {product.seller.name}</span>
              {product.seller.isOfficial && <span className="seller-badge">Resmi Satıcı</span>}
              <span className="seller-rating">{product.seller.rating}</span>
            </div>
          </div>
        )}

        <div className="product-price">
          <div className="current-price">{calculateTotalPrice().current}TL</div>
          {calculateTotalPrice().old !== "0.00" && (
            <div className="old-price">{calculateTotalPrice().old}TL</div>
          )}
        </div>

        {product.productPreferences?.length > 0 && (
          <div className="product-variants">
            {product.productPreferences.map((preference) => (
              <div key={preference.name} className="variant-section">
                <h3>{preference.name}</h3>
                <div className="preference-options">
                  {preference.options?.map(option => (
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
        )}

        <div className="product-actions">
          <button className="add-to-cart">Sepete Ekle</button>
          <button className="wishlist-button">
            <FiHeart />
          </button>
          <button className="share-button">
            <FiShare2 />
          </button>
        </div>

        {product.shipping && (
          <div className="product-shipping">
            <div className="shipping-info">
              {product.shipping.isFreeShipping && (
                <span className="free-shipping">Ücretsiz Kargo</span>
              )}
              <span className="delivery-date">
                Tahmini Teslimat: {product.shipping.estimatedDelivery}
              </span>
            </div>
          </div>
        )}

        {product.description && (
          <div className="product-description">
            <h3>Ürün Açıklaması</h3>
            <p>{product.description}</p>
          </div>
        )}

        {product.specifications?.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default ProductDetailView; 