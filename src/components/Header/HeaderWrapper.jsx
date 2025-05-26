import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeaderMobile from './HeaderMobile';

const HeaderWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <HeaderMobile /> : <Header />;
};

export default HeaderWrapper;
