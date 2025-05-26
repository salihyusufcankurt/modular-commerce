import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import FooterMobile from './FooterMobile';

const FooterWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <FooterMobile /> : <Footer />;
};

export default FooterWrapper; 