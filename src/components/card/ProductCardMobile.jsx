import React from 'react';
import '../../style/card/ProductCardMobile.css';

const ProductCardMobile = ({ title, image, salePrice, oldPrice }) => {
  return (
    <div className="product-card-mobile">
      <div className="product-tumb-mobile">
        <img src={image} alt={title} />
      </div>
      <div className="card-content-mobile">
        <h4 className="card-header-mobile">
          <a className="custom-a-mobile" href="#">{title}</a>
        </h4>
        <div className="card-bottom-field-mobile">
          <div className="card-price-field-mobile">
            <div className="product-sale-price-mobile">{salePrice}TL</div>
            <div className="product-old-price-mobile">{oldPrice}TL</div>
          </div>
          <button className="addButton-mobile">
            Sepete ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardMobile; 