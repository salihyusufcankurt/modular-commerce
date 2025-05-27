import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../../style/card/ProductCardMobile.css';

const ProductCardMobile = ({ title, image, salePrice, oldPrice, rating = 4.5, reviewCount = 644, freeShipping = true }) => {
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
    return price.toString().replace('.', ',');
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

  return (
    <div className="product-card-mobile">
      <div className="product-tumb-mobile">
        <img src={image} alt={title} />
      </div>
      <div className="card-content-mobile">
        <div className="brand-name-mobile">Maison Bloom</div>
        <h4 className="card-header-mobile">
          <a className="custom-a-mobile" href="#">{title}</a>
        </h4>
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
                {formatPrice(salePrice)}<span className="currency-mobile">TL</span>
              </div>
              {oldPrice && <div className="product-old-price-mobile">{formatPrice(oldPrice)}TL</div>}
            </div>
            {freeShipping && (
              <div className="free-shipping-mobile">
                ÜCRETSİZ teslimat
                <span className="delivery-date-mobile">{getDeliveryDates()}</span>
              </div>
            )}
          </div>
          <button className="addButton-mobile">Sepete ekle</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardMobile; 