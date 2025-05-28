import React, { useState, useEffect } from 'react';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import '../../style/product-detail/ProductDetailMobile.css';

const ProductDetailMobile = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPreferences, setSelectedPreferences] = useState({});

  useEffect(() => {
    if (product?.productPreferences?.length > 0) {
      const initialPreferences = {};
      product.productPreferences.forEach(pref => {
        if (pref.options && pref.options.length > 0) {
          initialPreferences[pref.name] = pref.options[0].name;
        }
      });
      setSelectedPreferences(initialPreferences);
    }
    
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const calculateTotalPrice = () => {
    if (!product?.price) return { current: "0.00", old: null };
    
    const basePrice = parseFloat(product.price.base || 0);
    const oldPrice = parseFloat(product.price.old || 0);
    const totalModifier = product.productPreferences?.reduce((total, pref) => {
      const selectedOption = pref.options?.find(opt => opt.name === selectedPreferences[pref.name]);
      return total + (selectedOption?.priceModifier || 0);
    }, 0) || 0;

    return {
      current: (basePrice + totalModifier).toFixed(2),
      old: oldPrice ? (oldPrice + totalModifier).toFixed(2) : null
    };
  };

  const handlePreferenceChange = (preferenceName, optionName) => {
    setSelectedPreferences(prev => ({
      ...prev,
      [preferenceName]: optionName
    }));
  };

  if (!product) {
    return (
      <div className="product-detail-mobile">
        <div className="loading">Ürün yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="product-detail-mobile">
      {/* Ürün Görselleri */}
      <div className="product-images-mobile">
        <div className="main-image-mobile">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="product-image-mobile"
            />
          )}
        </div>
        <div className="thumbnail-list-mobile">
          {product.images?.map((image, index) => (
            <div
              key={index}
              className={`thumbnail-mobile ${selectedImage === image ? 'active' : ''}`}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`${product.title} - ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Ürün Bilgileri */}
      <div className="product-info-mobile">
        <div className="product-header-mobile">
          <h1 className="product-title-mobile">{product.title}</h1>
          {product.brand && <div className="product-brand-mobile">{product.brand}</div>}
          
          <div className="product-rating-mobile">
            <div className="rating-stars-mobile">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < Math.floor(product.rating || 0) ? 'star-filled-mobile' : 'star-empty-mobile'}
                />
              ))}
              <span className="rating-value-mobile">{product.rating || 0}</span>
            </div>
            <div className="review-count-mobile">{product.reviewCount || 0} Değerlendirme</div>
          </div>
        </div>

        {product.seller && (
          <div className="product-seller-mobile">
            <div className="seller-info-mobile">
              <span className="seller-name-mobile">Satıcı: {product.seller.name}</span>
              {product.seller.isOfficial && (
                <span className="seller-badge-mobile">Resmi Satıcı</span>
              )}
              <span className="seller-rating-mobile">{product.seller.rating}</span>
            </div>
          </div>
        )}

        <div className="product-price-mobile">
          <div className="current-price-mobile">{calculateTotalPrice().current}TL</div>
          {calculateTotalPrice().old && (
            <div className="old-price-mobile">{calculateTotalPrice().old}TL</div>
          )}
        </div>

        {product.productPreferences?.length > 0 && (
          <div className="product-variants-mobile">
            {product.productPreferences.map((preference) => (
              <div key={preference.name} className="variant-section-mobile">
                <h3>{preference.name}</h3>
                <div className="preference-options-mobile">
                  {preference.options?.map(option => (
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
        )}

        {product.shipping && (
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
        )}

        <div className="product-description-mobile">
          <h3>Ürün Açıklaması</h3>
          <p>{product.description}</p>
        </div>

        {product.specifications && product.specifications.length > 0 && (
          <div className="product-specifications-mobile">
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
        )}
      </div>

      {/* Sabit Alt Bar */}
      <div className="bottom-bar-mobile">
        <div className="bottom-bar-actions-mobile">
          <button className="wishlist-button-mobile">
            <FiHeart />
          </button>
          <button className="share-button-mobile">
            <FiShare2 />
          </button>
          <button className="add-to-cart-mobile">Sepete Ekle</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailMobile; 