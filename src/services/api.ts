import { API_CONFIG } from '../config/api';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';

// Toggle to use sample data instead of real API
const USE_SAMPLE_DATA = true;

// --- SAMPLE DATA ---
const sampleProducts = [
  // Sunscreen
  {
    id: '1',
    title: 'Sunscreen Roller Blind',
    handle: 'sunscreen-roller-blind',
    description: 'A modern sunscreen roller blind.',
    status: 'published',
    thumbnail: '/images/categories/1.png',
    images: [{ id: 'img1', url: '/images/categories/1.png' }],
    categories: [{ id: 'cat1', name: 'Sunscreen', handle: 'sunscreen' }],
    variants: [
      {
        id: 'v1',
        title: 'Default',
        sku: 'SUN-001',
        prices: [{ amount: 11000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 10,
      },
    ],
    options: [],
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    title: 'Sunscreen Vertical Blind',
    handle: 'sunscreen-vertical-blind',
    description: 'A vertical sunscreen blind.',
    status: 'published',
    thumbnail: '/images/categories/2.png',
    images: [{ id: 'img2', url: '/images/categories/2.png' }],
    categories: [{ id: 'cat1', name: 'Sunscreen', handle: 'sunscreen' }],
    variants: [
      {
        id: 'v2',
        title: 'Default',
        sku: 'SUN-002',
        prices: [{ amount: 11500, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 8,
      },
    ],
    options: [],
    created_at: '',
    updated_at: '',
  },
  // Blackout
  {
    id: '3',
    title: 'Blackout Roller Blind',
    handle: 'blackout-roller-blind',
    description: 'A blackout roller blind for full privacy.',
    status: 'published',
    thumbnail: '/images/categories/3.png',
    images: [{ id: 'img3', url: '/images/categories/3.png' }],
    categories: [{ id: 'cat2', name: 'Blackout', handle: 'blackout' }],
    variants: [
      {
        id: 'v3',
        title: 'Default',
        sku: 'BLK-001',
        prices: [{ amount: 12000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 12,
      },
    ],
    options: [],
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    title: 'Blackout Roman Blind',
    handle: 'blackout-roman-blind',
    description: 'A stylish blackout roman blind.',
    status: 'published',
    thumbnail: '/images/categories/1.png',
    images: [{ id: 'img4', url: '/images/categories/1.png' }],
    categories: [{ id: 'cat2', name: 'Blackout', handle: 'blackout' }],
    variants: [
      {
        id: 'v4',
        title: 'Default',
        sku: 'BLK-002',
        prices: [{ amount: 12500, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 7,
      },
    ],
    options: [],
    created_at: '',
    updated_at: '',
  },
  // Light Filtering
  {
    id: '5',
    title: 'Light Filtering Roller Blind',
    handle: 'light-filtering-roller-blind',
    description: 'A roller blind for soft light.',
    status: 'published',
    thumbnail: '/images/categories/2.png',
    images: [{ id: 'img5', url: '/images/categories/2.png' }],
    categories: [{ id: 'cat3', name: 'Light Filtering', handle: 'light-filtering' }],
    variants: [
      {
        id: 'v5',
        title: 'Default',
        sku: 'LF-001',
        prices: [{ amount: 10500, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 9,
      },
    ],
    options: [],
    created_at: '',
    updated_at: '',
  },
  {
    id: '6',
    title: 'Light Filtering Roman Blind',
    handle: 'light-filtering-roman-blind',
    description: 'A roman blind for gentle light.',
    status: 'published',
    thumbnail: '/images/categories/3.png',
    images: [{ id: 'img6', url: '/images/categories/3.png' }],
    categories: [{ id: 'cat3', name: 'Light Filtering', handle: 'light-filtering' }],
    variants: [
      {
        id: 'v6',
        title: 'Default',
        sku: 'LF-002',
        prices: [{ amount: 10800, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 6,
      },
    ],
    options: [],
    created_at: '',
    updated_at: '',
  },
];
const sampleCategories = [
  { id: 'cat1', name: 'Sunscreen', handle: 'sunscreen' },
  { id: 'cat2', name: 'Blackout', handle: 'blackout' },
  { id: 'cat3', name: 'Light Filtering', handle: 'light-filtering' },
];
const sampleCart = {
  id: 'cart1',
  items: [
    {
      id: 'item1',
      title: 'Sample Curtain',
      quantity: 1,
      unit_price: 10000,
      variant: {
        id: 'v1',
        title: 'Default',
        sku: 'CURT-001',
        prices: [{ amount: 10000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 10,
      },
    },
  ],
  total: 10000,
  subtotal: 10000,
  tax_total: 0,
  shipping_total: 0,
};
const sampleUser = {
  id: 'user1',
  email: 'sample@user.com',
  first_name: 'Sample',
  last_name: 'User',
  phone: '+123456789',
};
const sampleOrders = [
  {
    id: 'order1',
    status: 'completed',
    total: 10000,
    items: [
      { id: 'item1', title: 'Sample Curtain', quantity: 1, unit_price: 10000 },
    ],
    shipping_address: {
      first_name: 'Sample',
      last_name: 'User',
      address_1: '123 Main St',
      city: 'Sample City',
      country_code: 'US',
      postal_code: '12345',
    },
    created_at: '',
  },
];
const sampleAddresses = [
  {
    first_name: 'Sample',
    last_name: 'User',
    address_1: '123 Main St',
    city: 'Sample City',
    country_code: 'US',
    postal_code: '12345',
  },
];
const sampleAuthResponse = {
  customer: sampleUser,
  session: { id: 'sess1', token: 'sampletoken' },
};
const sampleSamples = [
  {
    id: 'sample1',
    name: 'Ash Grey Fabric',
    description: 'A soft ash grey fabric.',
    image_url: '/images/product/01.png',
    material: 'Ash Grey',
    weight: '200g',
    available: true,
    price: 0,
  },
  {
    id: 'sample2',
    name: 'Ivory Cotton',
    description: 'Premium ivory cotton.',
    image_url: '/images/product/02.png',
    material: 'Ivory',
    weight: '180g',
    available: true,
    price: 0,
  },
  {
    id: 'sample3',
    name: 'Ocean Blue Linen',
    description: 'Cool blue linen fabric.',
    image_url: '/images/product/03.png',
    material: 'Ocean Blue',
    weight: '210g',
    available: true,
    price: 0,
  },
  {
    id: 'sample4',
    name: 'Sandstone Blend',
    description: 'A blend with a sandy hue.',
    image_url: '/images/product/04.png',
    material: 'Sandstone',
    weight: '190g',
    available: true,
    price: 0,
  },
  {
    id: 'sample5',
    name: 'Charcoal Blackout',
    description: 'Blackout fabric in charcoal.',
    image_url: '/images/product/05.png',
    material: 'Charcoal',
    weight: '220g',
    available: true,
    price: 0,
  },
  {
    id: 'sample6',
    name: 'Pearl White Sheer',
    description: 'Sheer fabric in pearl white.',
    image_url: '/images/product/06.png',
    material: 'Pearl White',
    weight: '160g',
    available: true,
    price: 0,
  },
];
const sampleBlogPosts = [
  {
    id: 'blog1',
    title: 'Sample Blog Post',
    content: 'This is a sample blog post.',
    excerpt: 'Sample excerpt.',
    published_at: '',
    author: 'Sample Author',
    categories: [{ id: 'cat1', name: 'Curtains', slug: 'curtains' }],
    featured_image: '/images/blog/1.png',
  },
];
const sampleBlogCategories = [
  { id: 'cat1', name: 'Curtains', slug: 'curtains' },
];
// Sample data for product customisations
const sampleProductCustomisations = {
  color: 'Ash',
  size: '24cm x 56cm',
  fitType: 'Recess Fit',
  rollDirection: 'Front Roll',
  chainColour: 'Silver',
  bracketColour: 'Sandstone',
  baseRailShape: 'Oval',
  baseRailColour: 'Bone',
  price: 450.00,
};
// --- END SAMPLE DATA ---

// API Service Class
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Generic request method
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // Get customer ID from localStorage if present
    const customerId = typeof window !== 'undefined' ? localStorage.getItem('customer_id') : null;
    const config: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(customerId ? { 'x-customer-id': customerId } : {}),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Medusa API request method
  private async medusaRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_CONFIG.MEDUSA_BASE_URL}${endpoint}`;
    const medusaApiKey = API_CONFIG.MEDUSA_PUBLISHABLE_KEY;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': medusaApiKey,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Medusa API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Medusa API Request failed:', error);
      throw error;
    }
  }

  // Product APIs
  async getProducts(params?: {
    limit?: number;
    offset?: number;
    category_id?: string;
    status?: string;
    price_min?: number;
    price_max?: number;
    sort_by?: string;
    sort_order?: string;
  }): Promise<{ products: Product[]; count: number }> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve({ products: sampleProducts, count: sampleProducts.length });
    }
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/store/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getProduct(id: string): Promise<Product> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleProducts[0]);
    }
    return this.request(`/store/products/${id}`);
  }

  async getProductCategories(): Promise<Category[]> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleCategories);
    }
    return this.request('/store/products/categories');
  }

  async getFeaturedProducts(): Promise<Product[]> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleProducts);
    }
    return this.request('/store/products/featured');
  }

  // Cart APIs
  async getCart(): Promise<Cart> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleCart);
    }
    return this.request('/store/cart');
  }

  async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleCart);
    }
    return this.request('/store/cart/add', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        quantity,
      }),
    });
  }

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleCart);
    }
    return this.request('/store/cart/update', {
      method: 'PUT',
      body: JSON.stringify({
        item_id: itemId,
        quantity,
      }),
    });
  }

  async removeFromCart(itemId: string): Promise<Cart> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleCart);
    }
    return this.request('/store/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify({
        item_id: itemId,
      }),
    });
  }

  // Checkout APIs
  async processCheckout(checkoutData: CheckoutData): Promise<Order> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleOrders[0]);
    }
    return this.request('/store/checkout/process', {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    });
  }

  async getShippingMethods(): Promise<ShippingMethod[]> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve([
        { id: 'ship1', name: 'Standard Shipping', price: 500 },
      ]);
    }
    return this.request('/store/checkout/shipping-methods');
  }

  async calculateShipping(address: Address): Promise<ShippingRate[]> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve([
        { id: 'ship1', name: 'Standard Shipping', price: 500, delivery_days: 5 },
      ]);
    }
    return this.request('/store/checkout/calculate-shipping', {
      method: 'POST',
      body: JSON.stringify({ address }),
    });
  }

  // Authentication APIs
  async login(email: string, password: string): Promise<AuthResponse> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleAuthResponse);
    }
    return this.request('/store/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleAuthResponse);
    }
    
    // Use Medusa API for registration
    const medusaResponse = await this.medusaRequest<any>('/store/customers/register', {
      method: 'POST',
      body: JSON.stringify({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone || '',
        username: userData.username || userData.email,
        password: userData.password,
      }),
    });

    // Transform Medusa response to match our AuthResponse interface
    return {
      customer: {
        id: medusaResponse.customer.id,
        email: medusaResponse.customer.email,
        first_name: medusaResponse.customer.first_name,
        last_name: medusaResponse.customer.last_name,
        phone: medusaResponse.customer.phone,
      },
      session: {
        id: medusaResponse.session?.id || '',
        token: medusaResponse.session?.access_token || '',
      },
    };
  }

  async logout(): Promise<void> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve();
    }
    return this.request('/store/auth/logout', {
      method: 'POST',
    });
  }

  // User APIs
  async getUserProfile(): Promise<User> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleUser);
    }
    return this.request('/store/user/profile');
  }

  async updateUserProfile(userData: Partial<User>): Promise<User> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve({ ...sampleUser, ...userData });
    }
    return this.request('/store/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUserOrders(): Promise<Order[]> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleOrders);
    }
    return this.request('/store/user/orders');
  }

  async getUserAddresses(): Promise<Address[]> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleAddresses);
    }
    return this.request('/store/user/addresses');
  }

  // Sample APIs
  async getSamples(): Promise<Sample[]> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleSamples);
    }
    return this.request('/store/samples');
  }

  async requestSample(sampleData: SampleRequest): Promise<void> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve();
    }
    return this.request('/store/samples/request', {
      method: 'POST',
      body: JSON.stringify(sampleData),
    });
  }

  // Blog APIs
  async getBlogPosts(params?: {
    limit?: number;
    offset?: number;
    category?: string;
  }): Promise<{ posts: BlogPost[]; count: number }> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve({ posts: sampleBlogPosts, count: sampleBlogPosts.length });
    }
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/store/blog${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getBlogPost(id: string): Promise<BlogPost> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleBlogPosts[0]);
    }
    return this.request(`/store/blog/${id}`);
  }

  async getBlogCategories(): Promise<BlogCategory[]> {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleBlogCategories);
    }
    return this.request('/store/blog/categories');
  }

  // Medusa Customer APIs
  async medusaLogin(email: string, password: string): Promise<any> {
    return this.medusaRequest<any>('/store/customers/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async medusaSendResetEmail(email: string): Promise<any> {
    return this.medusaRequest<any>('/store/customers/send-reset-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async medusaVerifyOtp(email: string, otp: string): Promise<any> {
    return this.medusaRequest<any>('/store/customers/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  async medusaResetPassword(email: string, newPassword: string): Promise<any> {
    return this.medusaRequest<any>('/store/customers/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, newPassword }),
    });
  }

  async medusaGetCustomer(email: string): Promise<any> {
    return this.medusaRequest<any>(`/store/customers/get-customer?email=${encodeURIComponent(email)}`);
  }

  async medusaUpdateCustomer(id: string, update: Partial<User>): Promise<any> {
    return this.medusaRequest<any>('/store/customers/update-customer', {
      method: 'PATCH',
      body: JSON.stringify({ id, ...update }),
    });
  }

  // Helper to store customer ID after login/register
  static storeCustomerId(customerId: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('customer_id', customerId);
    }
  }

  async getProductCustomisations(productId: string) {
    if (USE_SAMPLE_DATA) {
      return Promise.resolve(sampleProductCustomisations);
    }
    // Replace with real API call when backend is ready
    // return this.request(`/store/products/${productId}/customisations`);
  }
}

// Create and export API instance
export const api = new ApiService();

// Type definitions
export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  status: string;
  thumbnail: string;
  images?: Array<{
    id: string;
    url: string;
    alt_text?: string;
  }>;
  categories?: Category[];
  variants?: ProductVariant[];
  options?: ProductOption[];
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  prices: Array<{
    amount: number;
    currency_code: string;
  }>;
  options: any;
  inventory_quantity: number;
}

export interface ProductOption {
  id: string;
  title: string;
  values: string[];
}

export interface Category {
  id: string;
  name: string;
  handle: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax_total: number;
  shipping_total: number;
}

export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  variant: ProductVariant;
}

export interface CheckoutData {
  email: string;
  shipping_address: Address;
  billing_address?: Address;
  payment_method: string;
  shipping_method: string;
}

export interface Address {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  country_code: string;
  postal_code: string;
  phone?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
}

export interface ShippingRate {
  id: string;
  name: string;
  price: number;
  delivery_days?: number;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  items: OrderItem[];
  shipping_address: Address;
  created_at: string;
}

export interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

export interface AuthResponse {
  customer: User;
  session: {
    id: string;
    token: string;
  };
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  username?: string;
}

export interface Sample {
  id: string;
  name: string;
  description: string;
  image_url: string;
  material: string;
  weight: string;
  available: boolean;
  price: number;
}

export interface SampleRequest {
  customer_id: string;
  sample_ids: string[];
  shipping_address: Address;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  published_at: string;
  author: string;
  categories: BlogCategory[];
  featured_image?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export { ApiService }; 