export const ENDPOINTS = {
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id) => `/products/${id}`,
    SEARCH: '/products/search'
  },
  CART: {
    LIST: '/cart',
    ADD: '/cart/add',
    REMOVE: (id) => `/cart/${id}`,
    UPDATE: (id) => `/cart/${id}`
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile'
  },
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id) => `/orders/${id}`,
    CREATE: '/orders/create'
  }
}; 