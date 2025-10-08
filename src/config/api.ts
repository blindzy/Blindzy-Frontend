// API Configuration
export const API_CONFIG = {
  // Medusa Backend Configuration
  MEDUSA_BASE_URL: import.meta.env.VITE_API_URL || 'http://api.blindzy.com/',
  // MEDUSA_PUBLISHABLE_KEY: import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || 'pk_c5c3a7c4c2f5e1c991a5feec30098bdaad87511c48b8f8a99cac999d528295aa',
  MEDUSA_PUBLISHABLE_KEY: import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || 'pk_95b2adccfec57ae2083140f482fa7a76cf887678d50352e3a89b7d0629a0b7a8',
  
  // Development - Using proxy server to avoid CORS issues
  BASE_URL: '/api',
  
  // Production (update this when deploying)
  // BASE_URL: 'https://your-backend-domain.com',
  
  // API Endpoints
  ENDPOINTS: {
    // Authentication APIs
    AUTH_REGISTER: '/auth/register',
    AUTH_LOGIN: '/auth/login',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
    AUTH_VERIFY_OTP: '/auth/verify-otp',
    AUTH_RESET_PASSWORD: '/auth/reset-password',
    
    // Medusa Customer APIs (keeping for compatibility)
    MEDUSA_REGISTER: '/store/customers/register',
    MEDUSA_LOGIN: '/store/customers/login',
    MEDUSA_GET_CUSTOMER: '/store/customers/get-customer',
    MEDUSA_UPDATE_CUSTOMER: '/store/customers/update-customer',
    MEDUSA_SEND_RESET_EMAIL: '/store/customers/send-reset-email',
    MEDUSA_VERIFY_OTP: '/store/customers/verify-otp',
    MEDUSA_RESET_PASSWORD: '/store/customers/reset-password',
    MEDUSA_CONTACT: '/store/customers/contact',
    MEDUSA_UPLOAD_PFP: '/store/customers/user-pfp',
    
    // User Profile APIs
    USER_PROFILE: '/user/profile',
    USER_PROFILE_PFP: '/user/pfp',
    
    // User Address APIs
    USER_ADDRESSES: '/user/addresses',
    USER_ADDRESS: (id: string) => `/user/addresses/${id}`,
    CUSTOMER_ADDRESSES: '/store/customers/addresses',
    CUSTOMER_ADDRESS: (id: string) => `/store/customers/addresses/${id}`,
    
    // User Card APIs
    USER_CARDS: '/user/card',
    USER_CARD: (id: string) => `/user/card/${id}`,
    
    // User Order APIs
    USER_ORDERS: '/user/orders',
    USER_ORDER: '/user/order',
    USER_ORDER_BY_ID: (id: string) => `/user/order/${id}`,
    
    // Contact API
    CONTACT: '/api/contact',
    
    // Cart APIs
    CART: '/cart',
    CART_ITEM: (id: string) => `/cart/${id}`,
    CART_CLEAR: '/cart/clear',
    CUSTOMER_CART: '/store/customers/cart',
    CUSTOMER_CART_ITEM: (id: string) => `/store/customers/cart/${id}`,
    CUSTOMER_CART_CLEAR: '/store/customers/cart/clear',
    
    // Checkout APIs
    USER_CHECKOUT: '/user/checkout',
    CHECKOUT_CALCULATE_SHIPPING: '/checkout/calculate-shipping',
    CHECKOUT_SHIP: '/checkout/ship',
    CUSTOMER_CHECKOUT: '/store/customers/checkout',
    CUSTOMER_CHECKOUT_SHIPPING: '/store/customers/checkout/calculate-shipping',
    CUSTOMER_CHECKOUT_COMPLETE: '/store/customers/checkout/ship',
    
    // Product APIs
    PRODUCTS: '/products',
    PRODUCT: (id: string) => `/products/${id}`,
    STORE_PRODUCTS: '/store/products',
    STORE_PRODUCT: (id: string) => `/store/products/${id}`,
    CUSTOM_PRODUCTS: '/store/products/custom',
    CUSTOM_PRODUCT: (id: string) => `/store/products/custom/${id}`,
    CATEGORIES: '/store/products/categories',
    FEATURED_PRODUCTS: '/store/products/featured',
    
    // Customization APIs
    CART_ADD_CUSTOM: '/cart/add',
    
    // Sample APIs
    SAMPLES: '/samples',
    SAMPLE: '/sample',
    SAMPLES_GET_ALL: '/store/customers/samples/get-all',
    SAMPLES_GET_ONE: '/store/customers/samples/get-one',
    
    // Order APIs (Customer specific)
    CUSTOMER_ORDERS: '/store/customers/order',
    CUSTOMER_ORDER: (id: string) => `/store/customers/order/${id}`,
    
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

// Helper function to get full Medusa API URL
export const getMedusaApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.MEDUSA_BASE_URL}${endpoint}`;
}; 