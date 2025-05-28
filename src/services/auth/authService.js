import api from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const login = async (email, password) => {
  try {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error.message || 'Giriş yapılırken bir hata oluştu.';
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post(ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error.message || 'Kayıt olurken bir hata oluştu.';
  }
};

export const logout = async () => {
  try {
    await api.post(ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    console.error('Error during logout:', error);
    throw error.message || 'Çıkış yapılırken bir hata oluştu.';
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get(ENDPOINTS.AUTH.PROFILE);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error.message || 'Profil bilgileri yüklenirken bir hata oluştu.';
  }
}; 