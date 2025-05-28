import api from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const getOrders = async () => {
  try {
    const response = await api.get(ENDPOINTS.ORDERS.LIST);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error.message || 'Siparişler yüklenirken bir hata oluştu.';
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(ENDPOINTS.ORDERS.DETAIL(orderId));
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error.message || 'Sipariş detayları yüklenirken bir hata oluştu.';
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post(ENDPOINTS.ORDERS.CREATE, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error.message || 'Sipariş oluşturulurken bir hata oluştu.';
  }
}; 