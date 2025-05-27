import React from 'react';
import '../../style/card/ProductCard.css';

const ProductCard = ({ title, image, salePrice, oldPrice }) => {
  return (
    <div className="product-card">
      <h4 className="card-header">
        <a className="custom-a" href="#">{title}</a>
      </h4>
      <div className="product-tumb">
        <img src={image} alt={title} />
      </div>
      <div className="card-bottom-field">
        <div className="card-price-field">
          <div className="product-sale-price">{salePrice}TL</div>
          <div className="product-old-price">{oldPrice}TL</div>
        </div>
        <div className="card-add-to-cart-field">
          <button className="addButton">Sepete ekle</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 