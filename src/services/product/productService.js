import api from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const getProducts = async () => {
  try {
    const response = await api.get(ENDPOINTS.PRODUCTS.LIST);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error.message || 'Ürünler yüklenirken bir hata oluştu.';
  }
};

export const getProductById = async (id) => {
  if (!id) {
    throw new Error('Ürün ID\'si gerekli');
  }

  try {
    const response = await api.get(ENDPOINTS.PRODUCTS.DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error.message || `${id} ID'li ürün yüklenirken bir hata oluştu.`;
  }
};

export const searchProducts = async (searchTerm) => {
  try {
    const response = await api.get(ENDPOINTS.PRODUCTS.SEARCH, {
      params: { q: searchTerm }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error.message || 'Ürün araması yapılırken bir hata oluştu.';
  }
}; 