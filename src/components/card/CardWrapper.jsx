import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductCardMobile from './ProductCardMobile';

const CardWrapper = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <ProductCardMobile {...props} /> : <ProductCard {...props} />;
};

export default CardWrapper; 