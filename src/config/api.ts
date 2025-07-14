// API Configuration
export const API_CONFIG = {
  // Development - Using proxy server to avoid CORS issues
  BASE_URL: 'http://localhost:3001/api',
  
  // Production (update this when deploying)
  // BASE_URL: 'https://your-backend-domain.com',
  
  // API Endpoints
  ENDPOINTS: {
    // Store APIs
    PRODUCTS: '/store/products',
    PRODUCT: (id: string) => `/store/products/${id}`,
    CATEGORIES: '/store/products/categories',
    FEATURED_PRODUCTS: '/store/products/featured',
    
    // Cart APIs
    CART: '/store/cart',
    ADD_TO_CART: '/store/cart/add',
    UPDATE_CART: '/store/cart/update',
    REMOVE_FROM_CART: '/store/cart/remove',
    
    // Checkout APIs
    CHECKOUT: '/store/checkout/process',
    SHIPPING_METHODS: '/store/checkout/shipping-methods',
    CALCULATE_SHIPPING: '/store/checkout/calculate-shipping',
    
    // Auth APIs
    LOGIN: '/store/auth/login',
    REGISTER: '/store/auth/register',
    LOGOUT: '/store/auth/logout',
    
    // User APIs
    USER_PROFILE: '/store/user/profile',
    USER_ORDERS: '/store/user/orders',
    
    // Sample APIs
    SAMPLES: '/store/samples',
    REQUEST_SAMPLE: '/store/samples/request',
    
    // Blog APIs
    BLOG_POSTS: '/store/blog',
    BLOG_POST: (id: string) => `/store/blog/${id}`,
    BLOG_CATEGORIES: '/store/blog/categories',
    
    // Admin APIs
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_PRODUCT: (id: string) => `/admin/products/${id}`,
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 