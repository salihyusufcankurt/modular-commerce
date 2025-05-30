import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { getProductById } from '../../services/product/productService';
import './MiniCartItem.scss';

const MiniCartItem = ({ item, onQuantityChange, onRemove }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productId = String(item.productId);
        const productData = await getProductById(productId);
        console.log('Product data for item:', item.id, productData);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (item.productId) {
      fetchProduct();
    }
  }, [item.productId]);

  const formatPrice = (price) => {
    if (!price) return { main: "0", decimal: "00" };
    const priceStr = price.toFixed(2);
    const [main, decimal] = priceStr.split('.');
    return {
      main: main.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      decimal: decimal || "00"
    };
  };

  const handleIncrement = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="mini-cart-item loading">
        <div className="loading-placeholder">
          <div className="image-placeholder"></div>
          <div className="content-placeholder">
            <div className="text-placeholder"></div>
            <div className="text-placeholder short"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mini-cart-item error">
        <p>Ürün yüklenemedi</p>
      </div>
    );
  }

  const price = parseFloat(product.price.base);

  return (
    <div className="mini-cart-item">
      <div className="item-image">
        <img src={product.images[0]} alt={product.title} />
      </div>
      
      <div className="item-content">
        <div className="item-details">
          <h4 className="item-title">{product.title}</h4>
          <p className="item-brand">{product.brand}</p>
          <div className="item-price">
            <span className="price-main">{formatPrice(price).main}</span>
            <span className="price-decimal">{formatPrice(price).decimal}</span>
            <span className="currency">TL</span>
          </div>
        </div>
        
        <div className="item-actions">
          <button 
            onClick={() => onRemove(item.id)}
            className="remove-btn"
            title="Sepetten çıkar"
          >
            <FiTrash2 />
          </button>
          
          <div className="quantity-section">
            <span className="quantity-label">{item.quantity}</span>
            <button 
              onClick={handleIncrement}
              className="increment-btn"
              title="Arttır"
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCartItem; 