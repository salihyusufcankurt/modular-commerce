import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ProductCardMobile.scss';

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

  // Format price with dot for decimals and split into main and decimal parts
  const formatPrice = (price) => {
    if (!price) return { main: "0", decimal: "00" };
    const priceStr = typeof price === 'string' ? price : price.toString();
    const [main, decimal] = priceStr.split('.');
    return {
      main: main.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      decimal: decimal || "00"
    };
  };

  // Get delivery date range (today + 1 to today + 2)
  const getDeliveryDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);
    
    return `${tomorrow.getDate()} - ${dayAfter.getDate()} May`;
  };

  const formattedPrice = formatPrice(salePrice);
  const formattedOldPrice = oldPrice ? formatPrice(oldPrice) : null;

  const handleCardClick = () => {
    window.scrollTo(0, 0);
    navigate(`/products/${id}`);
  };

  return (
    <div className="product-card-mobile" onClick={handleCardClick}>
      <div className="product-tumb-mobile">
        <img src={image} alt={title} />
      </div>
      <div className="card-header-mobile">
        <h3 className="brand-name-mobile">Maison Bloom</h3>
        <a href="#" className="custom-a-mobile">{title}</a>
      </div>
      <div className="rating-section-mobile">
        <div className="stars-mobile">
          {renderStars(rating)}
        </div>
        <span className="review-count-mobile">({reviewCount})</span>
      </div>
      <div className="card-bottom-field-mobile">
        <div className="card-price-field-mobile">
          <div className="price-row-mobile">
            <div className="product-sale-price-mobile">
              <span className="price-main-mobile">{formattedPrice.main}</span>
              <span className="price-decimal-mobile">{formattedPrice.decimal}</span>
              <span className="price-currency-mobile">TL</span>
            </div>
          </div>
          {shipping?.isFreeShipping && (
            <div className="free-shipping-mobile">
              Ücretsiz Kargo
              <span className="delivery-date-mobile">{shipping.estimatedDelivery}</span>
            </div>
          )}
        </div>
        <button className="addButton-mobile">Sepete Ekle</button>
      </div>
    </div>
  );
};

export default ProductCardMobile; 