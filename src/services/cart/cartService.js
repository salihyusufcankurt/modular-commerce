import api from '../api/axiosConfig';

export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error.message || 'Sepet bilgileri yüklenirken bir hata oluştu.';
  }
};

export const getCartItems = async () => {
  try {
    const response = await api.get('/cartItems');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error.message || 'Sepet ürünleri yüklenirken bir hata oluştu.';
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    // Önce mevcut sepet ürününü kontrol et
    const cartItems = await getCartItems();
    const normalizedProductId = parseInt(productId);
    const existingItem = cartItems.find(item => parseInt(item.productId) === normalizedProductId);
    
    if (existingItem) {
      // Var olan ürünün miktarını artır
      return await updateCartItem(existingItem.id, existingItem.quantity + quantity);
    } else {
      // Yeni ürün ekle
      const newItem = {
        productId: normalizedProductId,
        quantity,
        addedAt: new Date().toISOString()
      };
      const response = await api.post('/cartItems', newItem);
      return response.data;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error.message || 'Ürün sepete eklenirken bir hata oluştu.';
  }
};

export const removeFromCart = async (cartItemId) => {
  try {
    await api.delete(`/cartItems/${cartItemId}`);
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error.message || 'Ürün sepetten çıkarılırken bir hata oluştu.';
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    // Önce mevcut item'ı al ki productId'yi koruyalım
    const cartItems = await getCartItems();
    const existingItem = cartItems.find(item => item.id === cartItemId);
    
    const response = await api.put(`/cartItems/${cartItemId}`, {
      productId: existingItem?.productId,
      quantity,
      addedAt: existingItem?.addedAt,
      updatedAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error.message || 'Sepet güncellenirken bir hata oluştu.';
  }
};

export const clearCart = async () => {
  try {
    const cartItems = await getCartItems();
    await Promise.all(cartItems.map(item => removeFromCart(item.id)));
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error.message || 'Sepet temizlenirken bir hata oluştu.';
  }
};

export const mergeDuplicateCartItems = async () => {
  try {
    const cartItems = await getCartItems();
    const validItems = cartItems.filter(item => item.productId);
    
    // ProductId'ye göre gruplayalım
    const groupedItems = validItems.reduce((acc, item) => {
      const productId = parseInt(item.productId);
      if (!acc[productId]) {
        acc[productId] = [];
      }
      acc[productId].push(item);
      return acc;
    }, {});

    // Her grup için sadece bir item bırak, quantity'leri topla
    for (const [productId, items] of Object.entries(groupedItems)) {
      if (items.length > 1) {
        // En eski item'ı tut
        const keepItem = items.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt))[0];
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Diğerlerini sil
        const itemsToDelete = items.filter(item => item.id !== keepItem.id);
        await Promise.all(itemsToDelete.map(item => removeFromCart(item.id)));
        
        // Ana item'ın quantity'sini güncelle
        await updateCartItem(keepItem.id, totalQuantity);
      }
    }
  } catch (error) {
    console.error('Error merging duplicate cart items:', error);
    throw error.message || 'Duplicate itemlar temizlenirken bir hata oluştu.';
  }
}; 