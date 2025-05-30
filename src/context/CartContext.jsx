import React, { createContext, useState, useContext, useEffect } from 'react';
import { addToCart, getCartItems, mergeDuplicateCartItems } from '../services/cart/cartService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  useEffect(() => {
    initializeCart();
    
    // Window resize listener - masaüstüne geçildiğinde mini cart'ı aç
    const handleResize = () => {
      if (cartItemCount > 0 && window.innerWidth >= 650 && !isMiniCartOpen) {
        console.log('Window resized to desktop, auto-opening mini cart');
        setIsMiniCartOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cartItemCount, isMiniCartOpen]);

  const initializeCart = async () => {
    try {
      // Önce duplicate'ları temizle
      await mergeDuplicateCartItems();
      // Sonra sepet sayısını yükle
      await fetchCartItems();
    } catch (error) {
      console.error('Error initializing cart:', error);
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    try {
      const cartItems = await getCartItems();
      // Sadece productId'si olan itemları say ve quantity toplamını hesapla
      const validItems = cartItems.filter(item => item.productId);
      const totalQuantity = validItems.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(totalQuantity);
      
      // Eğer sepette ürün varsa ve masaüstündeyse mini cart'ı otomatik aç
      if (totalQuantity > 0 && window.innerWidth >= 650) {
        setIsMiniCartOpen(true);
        console.log('Auto-opening mini cart: items found and desktop view');
      }
      
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (productId, quantity = 1) => {
    try {
      await addToCart(productId, quantity);
      // Sepet sayısını yeniden fetch et (bu MiniCart'ın useEffect'ini tetikleyecek)
      await fetchCartItems();
      
      // Mini sepeti aç (zaten açıksa açık kalır)
      setIsMiniCartOpen(true);
      
      console.log('Item added to cart, mini cart should update');
      return true;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return false;
    }
  };

  const openMiniCart = () => setIsMiniCartOpen(true);
  const closeMiniCart = () => setIsMiniCartOpen(false);

  return (
    <CartContext.Provider value={{ 
      cartItemCount, 
      addItemToCart, 
      loading, 
      fetchCartItems,
      isMiniCartOpen,
      openMiniCart,
      closeMiniCart
    }}>
      {children}
    </CartContext.Provider>
  );
}; 