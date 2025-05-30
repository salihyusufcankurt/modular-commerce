import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getCartItems, updateCartItem, removeFromCart } from '../../services/cart/cartService';
import { getProductById } from '../../services/product/productService';
import MiniCartItem from './MiniCartItem';
import './MiniCart.scss';

const MiniCart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const { fetchCartItems, cartItemCount, openMiniCart } = useCart();
  const navigate = useNavigate();

  // Cart açıldığında veya cart count değiştiğinde data fetch et
  useEffect(() => {
    if (isOpen) {
      console.log('MiniCart opened or cart count changed, fetching data...');
      fetchCartData();
    }
  }, [isOpen, cartItemCount]); // cartItemCount dependency eklendi

  // Responsive ve otomatik kapanma kontrolü
  useEffect(() => {
    const checkShouldShow = () => {
      const hasItems = cartItems.length > 0;
      const isMobile = window.innerWidth < 650; // 650px altında mobil
      
      // Mobil görünümde gösterme, masaüstünde ürün varsa her zaman göster
      setShouldShow(hasItems && !isMobile);
      
      // Mobil görünüme geçildiğinde kapat
      if (isMobile && isOpen) {
        onClose();
      }
    };

    checkShouldShow();
    window.addEventListener('resize', checkShouldShow);
    
    return () => window.removeEventListener('resize', checkShouldShow);
  }, [isOpen, cartItems, onClose]);

  // Mini cart masaüstünde ürün varsa otomatik açılsın
  useEffect(() => {
    if (cartItems.length > 0 && window.innerWidth >= 650 && !isOpen) {
      console.log('MiniCart: Auto-opening because items exist and desktop view');
      openMiniCart();
    }
  }, [cartItems, isOpen, openMiniCart]);

  const fetchCartData = async () => {
    setLoading(true);
    try {
      const items = await getCartItems();
      const validItems = items.filter(item => item.productId);
      console.log('Valid cart items:', validItems);
      setCartItems(validItems);

      // Toplam hesaplama için ürün bilgilerini de fetch et
      if (validItems.length > 0) {
        const productPromises = validItems.map(item => {
          const productId = String(item.productId);
          return getProductById(productId);
        });
        const products = await Promise.all(productPromises);
        console.log('Products for total calculation:', products);
        setCartProducts(products);
      } else {
        setCartProducts([]);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(itemId);
      return;
    }

    try {
      await updateCartItem(itemId, newQuantity);
      // Mini cart verilerini güncelle
      await fetchCartData();
      // Header'daki cart count'u güncelle
      await fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      // Mini cart verilerini güncelle
      await fetchCartData();
      // Header'daki cart count'u güncelle
      await fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = cartProducts.find(p => p.id == item.productId);
      if (product) {
        const price = parseFloat(product.price.base || 0);
        const itemTotal = price * item.quantity;
        return total + itemTotal;
      }
      return total;
    }, 0);
  };

  const formatPrice = (price) => {
    if (!price) return { main: "0", decimal: "00" };
    const priceStr = price.toFixed(2);
    const [main, decimal] = priceStr.split('.');
    return {
      main: main.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      decimal: decimal || "00"
    };
  };

  const handleGoToCart = () => {
    onClose();
    navigate('/cart');
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  // Gösterilmemesi gereken durumlar
  if (!shouldShow) return null;

  const totalAmount = calculateTotal();

  return (
    <div className={`mini-cart ${isOpen ? 'open' : ''}`}>
      <div className="mini-cart-content">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Yükleniyor...</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <MiniCartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            <div className="mini-cart-footer">
              <div className="total-section">
                <div className="subtotal-row">
                  <div className="total-price">
                    <span className="price-main">{formatPrice(totalAmount).main}</span>
                    <span className="price-decimal">{formatPrice(totalAmount).decimal}</span>
                    <span className="price-currency">TL</span>
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <button onClick={handleCheckout} className="checkout-btn">
                  Sepete git
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniCart; 