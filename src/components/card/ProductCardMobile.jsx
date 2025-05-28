import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../style/card/ProductCardMobile.css';

const ProductCardMobile = ({ 
  title, 
  image, 
  salePrice, 
  oldPrice, 
  rating = 4.5, 
  reviewCount = 644, 
  shipping,
  id 
}) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star-mobile" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star-mobile" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-mobile" />);
      }
    }
    return stars;
  };

  // Format price with comma for decimals
  const formatPrice = (price) => {
    if (!price) return "0,00";
    const priceStr = typeof price === 'string' ? price : price.toString();
    return priceStr.replace('.', ',');
  };

  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="product-card-mobile" onClick={handleCardClick}>
      <div className="product-image-mobile">
        <img src={image} alt={title} />
      </div>
      <div className="product-info-mobile">
        <h3 className="brand-name-mobile">Maison Bloom</h3>
        <a href="#" className="product-title-mobile">{title}</a>
        <div className="rating-section-mobile">
          <div className="stars-mobile">
            {renderStars(rating)}
          </div>
          <span className="review-count-mobile">({reviewCount})</span>
        </div>
        <div className="price-section-mobile">
          <div className="current-price-mobile">{formatPrice(salePrice)}TL</div>
          {oldPrice && <div className="old-price-mobile">{formatPrice(oldPrice)}TL</div>}
        </div>
        {shipping?.isFreeShipping && (
          <div className="shipping-info-mobile">
            <span className="free-shipping-mobile">Ücretsiz Kargo</span>
            <span className="delivery-date-mobile">{shipping.estimatedDelivery}</span>
          </div>
        )}
        <button className="add-to-cart-mobile">Sepete Ekle</button>
      </div>
    </div>
  );
};

export default ProductCardMobile; 