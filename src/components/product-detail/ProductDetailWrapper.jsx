import React, { useState, useEffect } from 'react';
import ProductDetailView from './ProductDetail';
import ProductDetailMobileView from './ProductDetailMobile';

const ProductDetailWrapper = ({ product }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    <ProductDetailMobileView product={product} />
  ) : (
    <ProductDetailView product={product} />
  );
};

export default ProductDetailWrapper; 