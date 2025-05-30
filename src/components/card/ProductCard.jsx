import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.scss';

const ProductCard = ({ 
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
  const { addItemToCart } = useCart();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
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

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const success = await addItemToCart(id);
    if (success) {
      // Başarılı bir şekilde sepete eklendi
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-tumb">
        <img src={image} alt={title} />
      </div>
      <div className="card-header">
        <h3 className="brand-name">Maison Bloom</h3>
        <a href="#" className="custom-a">{title}</a>
      </div>
      <div className="rating-section">
        <div className="stars">
          {renderStars(rating)}
        </div>
        <span className="review-count">({reviewCount})</span>
      </div>
      <div className="card-bottom-field">
        <div className="card-price-field">
          <div className="price-row">
            <div className="product-sale-price">
              <span className="price-main">{formattedPrice.main}</span>
              <span className="price-decimal">{formattedPrice.decimal}</span>
              <span className="price-currency">TL</span>
            </div>
          </div>
          {shipping?.isFreeShipping && (
            <div className="free-shipping">
              Ücretsiz Kargo
              <span className="delivery-date">{shipping.estimatedDelivery}</span>
            </div>
          )}
        </div>
        <button className="addButton" onClick={handleAddToCart}>Sepete Ekle</button>
      </div>
    </div>
  );
};

export default ProductCard; 