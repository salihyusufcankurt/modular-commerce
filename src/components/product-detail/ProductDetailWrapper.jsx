import React, { useState, useEffect } from 'react';
import ProductDetail from './ProductDetail';
import ProductDetailMobile from './ProductDetailMobile';

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
    <ProductDetailMobile product={product} />
  ) : (
    <ProductDetail product={product} />
  );
};

export default ProductDetailWrapper; 