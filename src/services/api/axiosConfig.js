import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      throw new Error('İstek zaman aşımına uğradı. Lütfen daha sonra tekrar deneyin.');
    }
    
    if (!error.response) {
      console.error('Network error:', error);
      throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
    }

    const { status } = error.response;
    if (status === 404) {
      throw new Error('İstek yapılan kaynak bulunamadı.');
    }

    throw error;
  }
);

export default api; 