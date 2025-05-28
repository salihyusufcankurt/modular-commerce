import api from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const getCart = async () => {
  try {
    const response = await api.get(ENDPOINTS.CART.LIST);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error.message || 'Sepet bilgileri yüklenirken bir hata oluştu.';
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post(ENDPOINTS.CART.ADD, {
      productId,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error.message || 'Ürün sepete eklenirken bir hata oluştu.';
  }
};

export const removeFromCart = async (cartItemId) => {
  try {
    await api.delete(ENDPOINTS.CART.REMOVE(cartItemId));
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error.message || 'Ürün sepetten çıkarılırken bir hata oluştu.';
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await api.put(ENDPOINTS.CART.UPDATE(cartItemId), {
      quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error.message || 'Sepet güncellenirken bir hata oluştu.';
  }
}; 