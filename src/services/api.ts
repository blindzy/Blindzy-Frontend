import { API_CONFIG } from '../config/api';

// API Configuration
const API_BASE_URL = API_CONFIG.BASE_URL;

// Configuration for different API endpoints
const USE_SAMPLE_DATA_FOR_PRODUCTS = true; // Only use sample data for products
const USE_SAMPLE_DATA_FOR_USER_AUTH = false; // Use real localStorage/backend for user data
const USE_FALLBACK_ON_ERROR = true; // Use sample data when API fails

// Auto-detect if backend is available
let BACKEND_AVAILABLE = false; // Set to false to force fallback mode initially

// Dynamic cart storage for both sample data mode and fallback mode
const getDynamicCart = (): Cart => {
  // Always try to get cart from localStorage first
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('dynamicCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('Retrieved cart from localStorage:', parsedCart);
        return parsedCart;
      } catch (parseError) {
        console.error('Error parsing localStorage cart:', parseError);
      }
    }
  }
  
  // Return empty cart structure
  const emptyCart = {
    id: 'cart_' + Date.now(),
    items: [],
    total: 0,
    subtotal: 0,
    tax_total: 0,
    shipping_total: 0
  };
  
  console.log('Returning new empty cart:', emptyCart);
  return emptyCart;
};

const saveDynamicCart = (cart: Cart): void => {
  // Always save to localStorage for persistence and fallback
  if (typeof window !== 'undefined') {
    localStorage.setItem('dynamicCart', JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);
  }
};

// Clear old cart data when switching to backend mode
const clearOldCartData = (): void => {
  if (!USE_SAMPLE_DATA_FOR_PRODUCTS && typeof window !== 'undefined') {
    localStorage.removeItem('dynamicCart');
    console.log('Cleared old localStorage cart data - now using backend cart');
  }
};

// Debug utilities for development
const debugUtils = {
  // Clear all localStorage data (useful for testing)
  clearAllLocalStorage: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      console.log('🧹 All localStorage data cleared');
    }
  },

  // Clear sample user data only
  clearSampleUserData: (): void => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (user.first_name === 'Sample' && user.last_name === 'User') {
            localStorage.removeItem('user');
            localStorage.removeItem('userEmail');
            console.log('🧹 Sample user data cleared');
          } else {
            console.log('Real user data found - not clearing:', user.first_name, user.last_name);
          }
        } catch (e) {
          console.error('Error checking user data:', e);
        }
      } else {
        console.log('No user data found in localStorage');
      }
    }
  },

  // Debug localStorage contents
  debugLocalStorage: (): void => {
    if (typeof window === 'undefined') {
      console.log('localStorage not available (server-side)');
      return;
    }

    console.log('=== LocalStorage Debug ===');
    console.log('User data:', localStorage.getItem('user'));
    console.log('User email:', localStorage.getItem('userEmail'));
    console.log('Cart data:', localStorage.getItem('dynamicCart'));
    console.log('Completed orders:', localStorage.getItem('completedOrders'));
    console.log('=========================');

    // Parse and display user data nicely
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('Parsed user data:');
        console.log('- ID:', user.id);
        console.log('- Email:', user.email);
        console.log('- First Name:', user.first_name);
        console.log('- Last Name:', user.last_name);
        console.log('- Phone:', user.phone);
        
        if (user.first_name === 'Sample' && user.last_name === 'User') {
          console.log('⚠️  This is sample data, not real user data');
        } else {
          console.log('✅ This appears to be real user data');
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    } else {
      console.log('No user data found in localStorage');
    }
  },

  // Set real user data for testing (helpful for debugging)
  setRealUserData: (firstName: string, lastName: string, email: string): void => {
    if (typeof window !== 'undefined') {
      const realUser = {
        id: 'user_' + Date.now(),
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: '+123456789',
      };
      
      localStorage.setItem('user', JSON.stringify(realUser));
      localStorage.setItem('userEmail', email);
      console.log('🔧 Real user data set:', realUser);
    }
  }
};

let dynamicCart: Cart = (() => {
  // Always initialize cart from localStorage for better persistence
  const cart = getDynamicCart();
  console.log('Initialized dynamic cart:', cart);
  return cart;
})();

// --- SAMPLE DATA ---
const sampleProducts = [
  // Shutters
  {
    id: '1',
    title: 'Premium Plantation Shutters',
    handle: 'premium-plantation-shutters',
    description: 'High-quality plantation shutters with adjustable louvers for perfect light control.',
    status: 'published',
    thumbnail: '/images/categories/1.png',
    images: [{ id: 'img1', url: '/images/categories/1.png' }],
    categories: [{ id: 'cat1', name: 'Shutters', handle: 'shutters' }],
    variants: [
      {
        id: 'v1',
        title: 'Default',
        sku: 'SHU-001',
        prices: [{ amount: 25000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 10,
      },
    ],
    options: [],
    tags: ['blockout', 'premium', 'adjustable'],
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    title: 'Classic Timber Shutters',
    handle: 'classic-timber-shutters',
    description: 'Traditional timber shutters for timeless elegance and superior insulation.',
    status: 'published',
    thumbnail: '/images/categories/2.png',
    images: [{ id: 'img2', url: '/images/categories/2.png' }],
    categories: [{ id: 'cat1', name: 'Shutters', handle: 'shutters' }],
    variants: [
      {
        id: 'v2',
        title: 'Default',
        sku: 'SHU-002',
        prices: [{ amount: 28000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 8,
      },
    ],
    options: [],
    tags: ['blockout', 'timber', 'classic'],
    created_at: '',
    updated_at: '',
  },
  // Curtains
  {
    id: '3',
    title: 'Luxury Blackout Curtains',
    handle: 'luxury-blackout-curtains',
    description: 'Premium blackout curtains for complete darkness and privacy.',
    status: 'published',
    thumbnail: '/images/categories/3.png',
    images: [{ id: 'img3', url: '/images/categories/3.png' }],
    categories: [{ id: 'cat2', name: 'Curtains', handle: 'curtains' }],
    variants: [
      {
        id: 'v3',
        title: 'Default',
        sku: 'CUR-001',
        prices: [{ amount: 15000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 12,
      },
    ],
    options: [],
    tags: ['blockout', 'luxury', 'privacy'],
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    title: 'Sheer Elegance Curtains',
    handle: 'sheer-elegance-curtains',
    description: 'Light filtering sheer curtains for soft natural light.',
    status: 'published',
    thumbnail: '/images/categories/1.png',
    images: [{ id: 'img4', url: '/images/categories/1.png' }],
    categories: [{ id: 'cat2', name: 'Curtains', handle: 'curtains' }],
    variants: [
      {
        id: 'v4',
        title: 'Default',
        sku: 'CUR-002',
        prices: [{ amount: 12000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 7,
      },
    ],
    options: [],
    tags: ['light-filtering', 'sheer', 'elegant'],
    created_at: '',
    updated_at: '',
  },
  // Double Curtains
  {
    id: '5',
    title: 'Day & Night Double Curtains',
    handle: 'day-night-double-curtains',
    description: 'Dual layer curtains with blackout and sheer panels for versatile light control.',
    status: 'published',
    thumbnail: '/images/categories/2.png',
    images: [{ id: 'img5', url: '/images/categories/2.png' }],
    categories: [{ id: 'cat3', name: 'Double Curtains', handle: 'double-curtains' }],
    variants: [
      {
        id: 'v5',
        title: 'Default',
        sku: 'DCU-001',
        prices: [{ amount: 18000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 9,
      },
    ],
    options: [],
    tags: ['blockout', 'light-filtering', 'dual-layer'],
    created_at: '',
    updated_at: '',
  },
  {
    id: '6',
    title: 'Premium Layered Curtains',
    handle: 'premium-layered-curtains',
    description: 'High-end double curtains with motorized operation for ultimate convenience.',
    status: 'published',
    thumbnail: '/images/categories/3.png',
    images: [{ id: 'img6', url: '/images/categories/3.png' }],
    categories: [{ id: 'cat3', name: 'Double Curtains', handle: 'double-curtains' }],
    variants: [
      {
        id: 'v6',
        title: 'Default',
        sku: 'DCU-002',
        prices: [{ amount: 22000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 6,
      },
    ],
    options: [],
    tags: ['blockout', 'motorized', 'premium'],
    created_at: '',
    updated_at: '',
  },
  // Blinds
  {
    id: '7',
    title: 'Venetian Roller Blinds',
    handle: 'venetian-roller-blinds',
    description: 'Classic venetian blinds with adjustable slats for precise light control.',
    status: 'published',
    thumbnail: '/images/categories/1.png',
    images: [{ id: 'img7', url: '/images/categories/1.png' }],
    categories: [{ id: 'cat4', name: 'Blinds', handle: 'blinds' }],
    variants: [
      {
        id: 'v7',
        title: 'Default',
        sku: 'BLI-001',
        prices: [{ amount: 13500, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 15,
      },
    ],
    options: [],
    tags: ['light-filtering', 'adjustable', 'venetian'],
    created_at: '',
    updated_at: '',
  },
  {
    id: '8',
    title: 'Sunscreen Roller Blinds',
    handle: 'sunscreen-roller-blinds',
    description: 'Modern sunscreen blinds that filter UV rays while maintaining visibility.',
    status: 'published',
    thumbnail: '/images/categories/2.png',
    images: [{ id: 'img8', url: '/images/categories/2.png' }],
    categories: [{ id: 'cat4', name: 'Blinds', handle: 'blinds' }],
    variants: [
      {
        id: 'v8',
        title: 'Default',
        sku: 'BLI-002',
        prices: [{ amount: 11000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 20,
      },
    ],
    options: [],
    tags: ['sunscreen', 'uv-protection', 'modern'],
    created_at: '',
    updated_at: '',
  },
  // Double Blinds
  {
    id: '9',
    title: 'Zebra Double Blinds',
    handle: 'zebra-double-blinds',
    description: 'Innovative zebra blinds with alternating transparent and opaque stripes.',
    status: 'published',
    thumbnail: '/images/categories/3.png',
    images: [{ id: 'img9', url: '/images/categories/3.png' }],
    categories: [{ id: 'cat5', name: 'Double Blinds', handle: 'double-blinds' }],
    variants: [
      {
        id: 'v9',
        title: 'Default',
        sku: 'DBL-001',
        prices: [{ amount: 16500, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 11,
      },
    ],
    options: [],
    tags: ['light-filtering', 'zebra', 'innovative'],
    created_at: '',
    updated_at: '',
  },
  {
    id: '10',
    title: 'Duo Shade Double Blinds',
    handle: 'duo-shade-double-blinds',
    description: 'Elegant duo shade blinds offering both privacy and light filtering options.',
    status: 'published',
    thumbnail: '/images/categories/1.png',
    images: [{ id: 'img10', url: '/images/categories/1.png' }],
    categories: [{ id: 'cat5', name: 'Double Blinds', handle: 'double-blinds' }],
    variants: [
      {
        id: 'v10',
        title: 'Default',
        sku: 'DBL-002',
        prices: [{ amount: 17800, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 8,
      },
    ],
    options: [],
    tags: ['light-filtering', 'privacy', 'duo-shade'],
    created_at: '',
    updated_at: '',
  },
  // Vertical Blinds
  {
    id: '11',
    title: 'Commercial Vertical Blinds',
    handle: 'commercial-vertical-blinds',
    description: 'Durable vertical blinds perfect for large windows and commercial spaces.',
    status: 'published',
    thumbnail: '/images/categories/2.png',
    images: [{ id: 'img11', url: '/images/categories/2.png' }],
    categories: [{ id: 'cat6', name: 'Vertical Blinds', handle: 'vertical-blinds' }],
    variants: [
      {
        id: 'v11',
        title: 'Default',
        sku: 'VBL-001',
        prices: [{ amount: 14000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 13,
      },
    ],
    options: [],
    tags: ['sunscreen', 'commercial', 'durable'],
    created_at: '',
    updated_at: '',
  },
  {
    id: '12',
    title: 'Designer Vertical Blinds',
    handle: 'designer-vertical-blinds',
    description: 'Stylish vertical blinds with premium fabrics for modern interiors.',
    status: 'published',
    thumbnail: '/images/categories/3.png',
    images: [{ id: 'img12', url: '/images/categories/3.png' }],
    categories: [{ id: 'cat6', name: 'Vertical Blinds', handle: 'vertical-blinds' }],
    variants: [
      {
        id: 'v12',
        title: 'Default',
        sku: 'VBL-002',
        prices: [{ amount: 16000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 10,
      },
    ],
    options: [],
    tags: ['blockout', 'designer', 'premium'],
    created_at: '',
    updated_at: '',
  },
];

const sampleCategories = [
  { id: 'cat1', name: 'Shutters', handle: 'shutters' },
  { id: 'cat2', name: 'Curtains', handle: 'curtains' },
  { id: 'cat3', name: 'Double Curtains', handle: 'double-curtains' },
  { id: 'cat4', name: 'Blinds', handle: 'blinds' },
  { id: 'cat5', name: 'Double Blinds', handle: 'double-blinds' },
  { id: 'cat6', name: 'Vertical Blinds', handle: 'vertical-blinds' },
];
const sampleCart = {
  id: 'cart1',
  items: [
    {
      id: 'item1',
      title: 'Premium Plantation Shutters',
      quantity: 1,
      unit_price: 25000,
      variant: {
        id: 'v1',
        title: 'Default',
        sku: 'SHU-001',
        prices: [{ amount: 25000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 10,
      },
      customizations: [
        { name: 'Room Name', value: 'Living Room' },
        { name: 'Width', value: '1.5m' },
        { name: 'Height', value: '1.8m' },
        { name: 'Color', value: 'White' },
        { name: 'Material', value: 'Premium Timber' },
        { name: 'Louver Size', value: '89mm' },
        { name: 'Installation', value: 'Professional Installation' }
      ],
    },
    {
      id: 'item2',
      title: 'Luxury Blackout Curtains',
      quantity: 2,
      unit_price: 15000,
      variant: {
        id: 'v3',
        title: 'Default',
        sku: 'CUR-001',
        prices: [{ amount: 15000, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 12,
      },
      customizations: [
        { name: 'Room Name', value: 'Bedroom' },
        { name: 'Width', value: '1.2m' },
        { name: 'Height', value: '2.2m' },
        { name: 'Fabric', value: 'Luxury Velvet' },
        { name: 'Color', value: 'Deep Navy' },
        { name: 'Lining', value: 'Thermal Blackout' },
        { name: 'Header Style', value: 'Eyelet' }
      ],
    },
    {
      id: 'item3',
      title: 'Zebra Double Blinds',
      quantity: 1,
      unit_price: 16500,
      variant: {
        id: 'v9',
        title: 'Default',
        sku: 'DBL-001',
        prices: [{ amount: 16500, currency_code: 'usd' }],
        options: {},
        inventory_quantity: 11,
      },
      customizations: [
        { name: 'Room Name', value: 'Office' },
        { name: 'Width', value: '1.0m' },
        { name: 'Height', value: '1.6m' },
        { name: 'Fabric Pattern', value: 'Zebra Stripe' },
        { name: 'Color', value: 'Light Grey' },
        { name: 'Operation', value: 'Chain Control' },
        { name: 'Mounting', value: 'Inside Mount' }
      ],
    },
  ],
  total: 71500,
  subtotal: 71500,
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
    total: 71500,
    items: [
      { 
        id: 'item1', 
        title: 'Premium Plantation Shutters', 
        quantity: 1, 
        unit_price: 25000,
        customizations: [
          { name: 'Room Name', value: 'Living Room' },
          { name: 'Width', value: '1.5m' },
          { name: 'Height', value: '1.8m' },
          { name: 'Color', value: 'White' },
          { name: 'Material', value: 'Premium Timber' }
        ],
      },
      { 
        id: 'item2', 
        title: 'Luxury Blackout Curtains', 
        quantity: 2, 
        unit_price: 15000,
        customizations: [
          { name: 'Room Name', value: 'Bedroom' },
          { name: 'Width', value: '1.2m' },
          { name: 'Height', value: '2.2m' },
          { name: 'Fabric', value: 'Luxury Velvet' },
          { name: 'Color', value: 'Deep Navy' }
        ],
      },
      { 
        id: 'item3', 
        title: 'Zebra Double Blinds', 
        quantity: 1, 
        unit_price: 16500,
        customizations: [
          { name: 'Room Name', value: 'Office' },
          { name: 'Width', value: '1.0m' },
          { name: 'Height', value: '1.6m' },
          { name: 'Fabric Pattern', value: 'Zebra Stripe' }
        ],
      },
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
  {
    id: 'order2',
    status: 'processing',
    total: 41000,
    items: [
      { 
        id: 'item4', 
        title: 'Classic Timber Shutters', 
        quantity: 1, 
        unit_price: 28000,
        customizations: [
          { name: 'Room Name', value: 'Master Bedroom' },
          { name: 'Width', value: '1.8m' },
          { name: 'Height', value: '2.0m' },
          { name: 'Color', value: 'Natural Wood' },
          { name: 'Material', value: 'Premium Basswood' },
          { name: 'Finish', value: 'Matte' }
        ],
      },
      { 
        id: 'item5', 
        title: 'Commercial Vertical Blinds', 
        quantity: 1, 
        unit_price: 14000,
        customizations: [
          { name: 'Room Name', value: 'Home Office' },
          { name: 'Width', value: '1.4m' },
          { name: 'Height', value: '1.9m' },
          { name: 'Fabric', value: 'Sunscreen Mesh' },
          { name: 'Color', value: 'Charcoal Grey' }
        ],
      },
    ],
    shipping_address: {
      first_name: 'Sample',
      last_name: 'User',
      address_1: '456 Oak Avenue',
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

const sampleCards = [
  {
    id: 'card1',
    card_type: 'Visa',
    card_name: 'John Doe',
    card_number: '**** **** **** 1234',
    expiry_date: '12/25',
    security_code: '***',
  },
  {
    id: 'card2',
    card_type: 'Mastercard',
    card_name: 'Jane Smith',
    card_number: '**** **** **** 5678',
    expiry_date: '03/26',
    security_code: '***',
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
    // Remove leading slash from endpoint to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const url = `${this.baseUrl}/${cleanEndpoint}`;

    // Get customer ID from localStorage if present
    const customerId = typeof window !== 'undefined' ? localStorage.getItem('customer_id') : null;
    const config: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(customerId ? { 'x-customer-id': customerId } : {}),
        'x-publishable-api-key': API_CONFIG.MEDUSA_PUBLISHABLE_KEY,
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
    // Remove leading slash from endpoint to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const url = `${API_CONFIG.MEDUSA_BASE_URL}/${cleanEndpoint}`;
    
    console.log('Making Medusa API request to:', url);
    console.log('Using publishable key:', API_CONFIG.MEDUSA_PUBLISHABLE_KEY);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': API_CONFIG.MEDUSA_PUBLISHABLE_KEY,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
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
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
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
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleProducts[0]);
    }
    return this.request(`/store/products/${id}`);
  }

  async getProductCategories(): Promise<Category[]> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleCategories);
    }
    return this.request('/store/products/categories');
  }

  async getFeaturedProducts(): Promise<Product[]> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleProducts);
    }
    return this.request('/store/products/featured');
  }

  // Cart APIs
  // async getCart(): Promise<Cart> {
  //   if (USE_SAMPLE_DATA) {
  //     return Promise.resolve(sampleCart);
  //   }
  //   return this.request('/store/cart');
  // }

  // async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
  //   if (USE_SAMPLE_DATA) {
  //     return Promise.resolve(sampleCart);
  //   }
  //   return this.request('/store/cart/add', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       product_id: productId,
  //       quantity,
  //     }),
  //   });
  // }

  // async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
  //   if (USE_SAMPLE_DATA) {
  //     return Promise.resolve(sampleCart);
  //   }
  //   return this.request('/store/cart/update', {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       item_id: itemId,
  //       quantity,
  //     }),
  //   });
  // }

  // async removeFromCart(itemId: string): Promise<Cart> {
  //   if (USE_SAMPLE_DATA) {
  //     return Promise.resolve(sampleCart);
  //   }
  //   return this.request('/store/cart/remove', {
  //     method: 'DELETE',
  //     body: JSON.stringify({
  //       item_id: itemId,
  //     }),
  //   });
  // }

  // Checkout APIs
  async processCheckout(checkoutData: CheckoutData): Promise<Order> {
    console.log('Processing checkout with data:', checkoutData);
    
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      // Create a realistic order from current cart and checkout data
      const cart = getDynamicCart();
      
      const newOrder: Order = {
        id: 'order_' + Date.now(),
        status: 'processing',
        total: cart.total || 0,
        items: cart.items.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          customizations: item.customizations || []
        })),
        shipping_address: checkoutData.shipping_address,
        created_at: new Date().toISOString(),
      };
      
      console.log('Created new order:', newOrder);
      
      // Save to localStorage as completed order
      if (typeof window !== 'undefined') {
        const existingOrders = localStorage.getItem('completedOrders');
        const orders = existingOrders ? JSON.parse(existingOrders) : [];
        orders.push(newOrder);
        localStorage.setItem('completedOrders', JSON.stringify(orders));
        console.log('Order saved to localStorage:', newOrder);
      }
      
      return Promise.resolve(newOrder);
    }
    
    // Try backend processing
    return this.request('/store/checkout/process', {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    });
  }

  async getShippingMethods(): Promise<ShippingMethod[]> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve([
        { id: 'ship1', name: 'Standard Shipping', price: 500 },
      ]);
    }
    return this.request('/store/checkout/shipping-methods');
  }

  async calculateShipping(address: Address): Promise<ShippingRate[]> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
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
    // Always try to use real authentication, not sample data
    console.log('Login attempt for:', email);
    
    // Check if we already have user data in localStorage for this email
    let existingUserData: any = null;
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.email === email) {
            existingUserData = parsed;
            console.log('Found existing user data for this email:', existingUserData);
          }
        } catch (e) {
          console.error('Error parsing existing user data:', e);
        }
      }
    }
    
    // If we have existing real user data, use it for login
    if (existingUserData && 
        existingUserData.first_name && existingUserData.last_name &&
        existingUserData.first_name !== 'Sample' && existingUserData.last_name !== 'User') {
      
      console.log('Using existing real user data for login');
      const userResponse = {
        customer: existingUserData,
        session: { 
          id: 'sess_' + Date.now(), 
          token: 'localtoken_' + Date.now() 
        },
      };
      
      // Update localStorage with fresh session
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userResponse.customer));
        localStorage.setItem('userEmail', email);
        console.log('Real user login successful');
      }
      
      return Promise.resolve(userResponse);
    }
    
    // Use Medusa API for login
    try {
      const medusaResponse = await this.medusaRequest<any>('/store/customers/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      const authResponse = {
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
      
      // Save to localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(authResponse.customer));
        localStorage.setItem('userEmail', email);
        console.log('Backend user data saved to localStorage');
      }
      
      return authResponse;
    } catch (error) {
      console.error('Backend login failed:', error);
      
      // Fallback to sample mode if backend fails
      if (USE_FALLBACK_ON_ERROR) {
        console.log('Falling back to sample login mode');
        BACKEND_AVAILABLE = false;
        
        // Check if we already have user data in localStorage for this email
        let existingUserData: any = null;
        if (typeof window !== 'undefined') {
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            try {
              const parsed = JSON.parse(savedUser);
              if (parsed.email === email) {
                existingUserData = parsed;
              }
            } catch (e) {
              console.error('Error parsing existing user data in fallback:', e);
            }
          }
        }
        
        const fallbackUserResponse = {
          customer: {
            id: existingUserData?.id || 'user_' + Date.now(),
            email: email,
            first_name: existingUserData?.first_name || 'Sample',
            last_name: existingUserData?.last_name || 'User',
            phone: existingUserData?.phone || '+123456789',
          },
          session: { 
            id: 'sess_' + Date.now(), 
            token: 'fallbacktoken_' + Date.now() 
          },
        };
        
        // Save to localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(fallbackUserResponse.customer));
          localStorage.setItem('userEmail', email);
          console.log('Fallback user data saved to localStorage');
        }
        
        return fallbackUserResponse;
      }
      
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    // Always save real user data from registration
    console.log('Registration attempt for:', userData.email);
    
    // Create user data from registration input
    const registeredUser = {
      id: 'user_' + Date.now(),
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone: userData.phone || '+123456789',
    };
    
    const userResponse = {
      customer: registeredUser,
      session: { 
        id: 'sess_' + Date.now(), 
        token: 'localtoken_' + Date.now() 
      },
    };
    
    console.log('Registration successful, saving real user data:', registeredUser);
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userResponse.customer));
      localStorage.setItem('userEmail', userData.email);
      console.log('Real user registration saved to localStorage');
    }
    
    return Promise.resolve(userResponse);
    
    // NOTE: Backend registration code below is currently unreachable due to early return above
    // Use Medusa API for registration
    try {
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
      const authResponse = {
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
      
      // Save to localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(authResponse.customer));
        localStorage.setItem('userEmail', userData.email);
        console.log('Backend user registration saved to localStorage');
      }
      
      return authResponse;
    } catch (error) {
      console.error('Backend registration failed:', error);
      
      // Fallback to sample mode if backend fails
      if (USE_FALLBACK_ON_ERROR) {
        console.log('Falling back to sample registration mode');
        BACKEND_AVAILABLE = false;
        
        const fallbackUserResponse = {
          customer: {
            id: 'user_' + Date.now(),
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.phone || '+123456789',
          },
          session: { 
            id: 'sess_' + Date.now(), 
            token: 'fallbacktoken_' + Date.now() 
          },
        };
        
        // Save to localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(fallbackUserResponse.customer));
          localStorage.setItem('userEmail', userData.email);
          console.log('Fallback user registration saved to localStorage');
        }
        
        return fallbackUserResponse;
      }
      
      throw error;
    }
  }

  async logout(): Promise<void> {
    // Just clear localStorage for now, no sample data mode
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('userEmail');
      console.log('User logged out, localStorage cleared');
    }
    return Promise.resolve();
  }

  // User APIs
  async getUserProfile(email?: string): Promise<User> {
    console.log('=== getUserProfile called with email:', email);
    
    // Always try localStorage first for better reliability
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      console.log('localStorage user data found:', userData);
      
      if (userData) {
        try {
          const user = JSON.parse(userData);
          console.log('Parsed localStorage user data:', user);
          
          // Always return real user data from localStorage if it exists
          console.log('✅ Returning user data from localStorage:', user);
          return {
            id: user.id || '',
            email: user.email || email || '',
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            phone: user.phone || '',
          };
          
        } catch (parseError) {
          console.error('Error parsing localStorage user data:', parseError);
        }
      }
    }

    // Try to get real user email from localStorage
    let userEmail = email;
    if (!userEmail && typeof window !== 'undefined') {
      userEmail = localStorage.getItem('userEmail') || undefined;
      console.log('Got userEmail from localStorage:', userEmail);
    }

    // If no user data at all, return a basic structure
    if (!userEmail) {
      console.log('⚠️  No user data found anywhere');
      throw new Error('No user data found. Please log in.');
    }
    
    if (!email) throw new Error('Email required for getUserProfile');
    
    try {
      const medusaResponse = await this.medusaRequest<any>(`/store/customers/get-customer?email=${encodeURIComponent(email)}`);
      console.log('getUserProfile response:', medusaResponse);
      
      // Check if response has customer data
      if (!medusaResponse || !medusaResponse.customer) {
        throw new Error('Invalid response format: customer data not found');
      }
      
      const customer = medusaResponse.customer;
      return {
        id: customer.id || '',
        email: customer.email || email,
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        phone: customer.phone || '',
      };
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      // Return sample data as ultimate fallback
      if (USE_FALLBACK_ON_ERROR) {
        console.log('Using sample user as fallback');
        return {
          id: 'user_' + Date.now(),
          email: email || 'sample@example.com',
          first_name: 'Sample',
          last_name: 'User',
          phone: '+123456789',
        };
      }
      throw error;
    }
  }

  async updateUserProfile(id: string, userData: Partial<User>): Promise<User> {
    // Always work with real user data from localStorage
    let existingUser: any = null;
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          existingUser = JSON.parse(storedUser);
        } catch (parseError) {
          console.error('Error parsing stored user data:', parseError);
        }
      }
    }

    // Merge existing user data with updates
    const updatedUser = { ...existingUser, ...userData };
    
    // Save updated user data to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('Updated user data saved to localStorage:', updatedUser);
    }
    
    return Promise.resolve(updatedUser);
    const medusaResponse = await this.medusaRequest<any>('/store/customers/update-customer', {
      method: 'PATCH',
      body: JSON.stringify({ id, ...userData }),
    });
    return {
      id: medusaResponse.customer.id,
      email: medusaResponse.customer.email,
      first_name: medusaResponse.customer.first_name,
      last_name: medusaResponse.customer.last_name,
      phone: medusaResponse.customer.phone,
    };
  }

  async getUserOrders(email?: string): Promise<Order[]> {
    console.log('getUserOrders called with email:', email);
    
    // Check if there are actual completed orders from backend/localStorage
    if (typeof window !== 'undefined') {
      const completedOrders = localStorage.getItem('completedOrders');
      if (completedOrders) {
        try {
          const orders = JSON.parse(completedOrders);
          console.log('Found completed orders in localStorage:', orders);
          return orders;
        } catch (parseError) {
          console.error('Error parsing completed orders:', parseError);
        }
      }
    }
    
    // Try backend if available and not in sample mode
    if (!USE_SAMPLE_DATA_FOR_PRODUCTS && email) {
      try {
        const medusaResponse = await this.medusaRequest<any>(`/store/customers/order?email=${encodeURIComponent(email)}`);
        console.log('getUserOrders backend response:', medusaResponse);
        return medusaResponse.orders || [];
      } catch (error) {
        console.error('Error in getUserOrders backend call:', error);
        // Fall through to return empty array
      }
    }
    
    // Return empty array - no orders until user actually completes a purchase
    console.log('No orders found - returning empty array');
    return [];
  }

  // User Address APIs
  async getUserAddresses(email?: string): Promise<Address[]> {
    // For now, return sample addresses
    return Promise.resolve(sampleAddresses);
  }

  async createUserAddress(addressData: Omit<Address, 'id'>): Promise<Address> {
    // For now, return the address data with a mock ID
    return Promise.resolve({ ...addressData, id: 'new-address-id' } as Address);
  }

  async updateUserAddress(addressId: string, addressData: Partial<Address>): Promise<Address> {
    // For now, return the updated address data
    return Promise.resolve({ ...addressData, id: addressId } as Address);
  }

  // Cart APIs
  async getCart(email?: string): Promise<Cart> {
    console.log('getCart called with email:', email);
    
    // Always check localStorage first for better reliability
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('dynamicCart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          console.log('Found cart in localStorage:', parsedCart);
          dynamicCart = parsedCart; // Update the in-memory cart
          return Promise.resolve({ ...parsedCart });
        } catch (parseError) {
          console.error('Error parsing localStorage cart:', parseError);
        }
      }
    }

    // Try backend only if not in sample data mode and backend is available
    if (!USE_SAMPLE_DATA_FOR_PRODUCTS && BACKEND_AVAILABLE) {
      if (!email) {
        // Try to get email from localStorage
        const userData = localStorage.getItem('user');
        const user = userData ? JSON.parse(userData) : null;
        email = user?.email;
      }
      
      if (email) {
        try {
          console.log('Attempting to get cart via Medusa backend...');
          const medusaResponse = await this.medusaRequest<any>(`/store/customers/cart?email=${encodeURIComponent(email)}`);
          console.log('Successfully retrieved cart from backend:', medusaResponse);
          return medusaResponse.cart || medusaResponse;
        } catch (error: any) {
          console.warn('Backend unavailable for cart retrieval, falling back to local cart:', error);
          BACKEND_AVAILABLE = false; // Mark backend as unavailable
          // Fall through to sample data logic
        }
      }
    }
    
    // Sample data mode or fallback
    console.log('Using local cart (sample data mode or fallback)');
    // Refresh from localStorage to get latest cart state
    dynamicCart = getDynamicCart();
    console.log('Returning local dynamic cart:', dynamicCart);
    return Promise.resolve({ ...dynamicCart });
  }

  async addToCart(data: {
    email: string;
    product_id: string;
    quantity: number;
    customizations?: any;
    calculatedPrice?: number; // Allow override price
  }): Promise<Cart> {
    console.log('addToCart called with data:', data);

    // Try backend only if not in sample data mode and backend is available
    if (!USE_SAMPLE_DATA_FOR_PRODUCTS && BACKEND_AVAILABLE) {
      try {
        console.log('Attempting to add to cart via Medusa backend...');
        const medusaResponse = await this.medusaRequest<any>('/store/customers/cart', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        console.log('Successfully added to cart via backend');
        return medusaResponse.cart || medusaResponse;
      } catch (error) {
        console.warn('Backend unavailable, falling back to local cart:', error);
        BACKEND_AVAILABLE = false; // Mark backend as unavailable
        // Fall through to sample data logic
      }
    }
    
    // Sample data mode or fallback
    console.log('Adding to local cart (sample data mode or fallback):', data);
    
    // Refresh cart from localStorage first
    dynamicCart = getDynamicCart();
    
    // Find the product from sample products
    const product = sampleProducts.find(p => p.id === data.product_id);
    if (!product) {
      console.error('Product not found:', data.product_id);
      throw new Error('Product not found');
    }
    
    // Determine the price to use
    let unit_price: number;
    
    if (data.calculatedPrice) {
      // Use calculated price (convert from dollars to cents)
      unit_price = Math.round(data.calculatedPrice * 100);
      console.log('Using calculated price:', data.calculatedPrice, '-> unit_price:', unit_price);
    } else {
      // Check if customizations contain dimensions for price calculation
      const widthCustomization = data.customizations?.find((c: any) => c.name.toLowerCase().includes('width'));
      const heightCustomization = data.customizations?.find((c: any) => c.name.toLowerCase().includes('height'));
      
      if (widthCustomization && heightCustomization) {
        // Extract dimensions and calculate price
        const width = parseFloat(widthCustomization.value.replace(/[^\d.]/g, ''));
        const height = parseFloat(heightCustomization.value.replace(/[^\d.]/g, ''));
        
        if (width > 0 && height > 0) {
          // Calculate: area in m² * $4 per m²
          const areaInSquareMeters = (width * height) / 10000;
          const priceInDollars = areaInSquareMeters * 4;
          unit_price = Math.round(priceInDollars * 100); // Convert to cents
          console.log(`Calculated price from dimensions: ${width}×${height}cm = $${priceInDollars.toFixed(2)}`);
        } else {
          // Fall back to default product price
          unit_price = product.variants[0].prices[0].amount;
        }
      } else {
        // Fall back to default product price
        unit_price = product.variants[0].prices[0].amount;
      }
    }
    
    // Create new cart item
    const newItemId = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const variant = product.variants[0];
    
    const newItem = {
      id: newItemId,
      title: product.title,
      quantity: data.quantity,
      unit_price: unit_price,
      variant: {
        ...variant,
        prices: [{ ...variant.prices[0], amount: unit_price }] // Update variant price
      },
      customizations: data.customizations || []
    };
    
    // Check if item with same product_id and customizations already exists
    const existingItemIndex = dynamicCart.items.findIndex(item => 
      item.variant.sku === variant.sku && 
      JSON.stringify(item.customizations) === JSON.stringify(data.customizations)
    );
    
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      dynamicCart.items[existingItemIndex].quantity += data.quantity;
      console.log('Updated existing cart item quantity');
    } else {
      // Add new item to cart
      dynamicCart.items.push(newItem);
      console.log('Added new item to cart');
    }
    
    // Recalculate totals efficiently
    this.recalculateCartTotals();
    
    // Save cart to localStorage
    saveDynamicCart(dynamicCart);

    console.log('Local cart updated successfully:', dynamicCart);
    return Promise.resolve({ ...dynamicCart });
  }

  // Helper method to recalculate cart totals efficiently
  private recalculateCartTotals(): void {
    const subtotal = dynamicCart.items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    const tax_total = Math.round(subtotal * 0.1); // 10% tax
    const shipping_total = subtotal > 50000 ? 0 : 1000; // Free shipping over $500
    const total = subtotal + tax_total + shipping_total;
    
    dynamicCart.subtotal = subtotal;
    dynamicCart.tax_total = tax_total;
    dynamicCart.shipping_total = shipping_total;
    dynamicCart.total = total;
  }

  async updateCartItem(cartItemId: string, quantity: number): Promise<Cart> {
    console.log('updateCartItem called:', cartItemId, quantity);
    
    // Try backend only if not in sample data mode and backend is available
    if (!USE_SAMPLE_DATA_FOR_PRODUCTS && BACKEND_AVAILABLE) {
      try {
        console.log('Attempting to update cart item via Medusa backend...');
        const medusaResponse = await this.medusaRequest<any>(`/store/customers/cart/${cartItemId}`, {
          method: 'PUT',
          body: JSON.stringify({ quantity }),
        });
        console.log('Successfully updated cart item via backend');
        return medusaResponse.cart || medusaResponse;
      } catch (error) {
        console.warn('Backend unavailable for cart update, falling back to local cart:', error);
        BACKEND_AVAILABLE = false; // Mark backend as unavailable
        // Fall through to sample data logic
      }
    }
    
    // Sample data mode or fallback
    console.log('Updating local cart item (sample data mode or fallback)');
    
    // Refresh cart from localStorage first
    dynamicCart = getDynamicCart();
    console.log('Current cart before update:', dynamicCart);
    console.log('Looking for item with ID:', cartItemId);
    console.log('Available item IDs:', dynamicCart.items.map(item => item.id));
    
    const itemIndex = dynamicCart.items.findIndex(item => item.id === cartItemId);
    if (itemIndex !== -1) {
      dynamicCart.items[itemIndex].quantity = quantity;
      console.log('Updated item quantity in local cart');
      
      // Recalculate totals efficiently
      this.recalculateCartTotals();
      
      // Save cart to localStorage
      saveDynamicCart(dynamicCart);
      console.log('Local cart item updated successfully');
    } else {
      console.error('Cart item not found:', cartItemId);
      console.error('Available items:', dynamicCart.items);
      // Don't return empty cart, return current cart as is
      console.log('Returning current cart unchanged due to item not found');
    }
    
    return Promise.resolve({ ...dynamicCart });
  }

  async removeFromCart(cartItemId: string): Promise<Cart> {
    console.log('removeFromCart called:', cartItemId);
    
    // Try backend only if not in sample data mode and backend is available
    if (!USE_SAMPLE_DATA_FOR_PRODUCTS && BACKEND_AVAILABLE) {
      try {
        console.log('Attempting to remove cart item via Medusa backend...');
        const medusaResponse = await this.medusaRequest<any>(`/store/customers/cart/${cartItemId}`, {
          method: 'DELETE',
        });
        console.log('Successfully removed cart item via backend');
        return medusaResponse.cart || medusaResponse;
      } catch (error) {
        console.warn('Backend unavailable for cart removal, falling back to local cart:', error);
        BACKEND_AVAILABLE = false; // Mark backend as unavailable
        // Fall through to sample data logic
      }
    }
    
    // Sample data mode or fallback
    console.log('Removing local cart item (sample data mode or fallback)');
    
    // Refresh cart from localStorage first
    dynamicCart = getDynamicCart();
    console.log('Current cart before removal:', dynamicCart);
    console.log('Looking for item with ID to remove:', cartItemId);
    console.log('Available item IDs:', dynamicCart.items.map(item => item.id));
    
    const initialLength = dynamicCart.items.length;
    dynamicCart.items = dynamicCart.items.filter(item => item.id !== cartItemId);
    
    if (dynamicCart.items.length < initialLength) {
      console.log('Item removed from local cart');
      
      // Recalculate totals efficiently
      this.recalculateCartTotals();
      
      // Save cart to localStorage
      saveDynamicCart(dynamicCart);
      console.log('Local cart item removed successfully');
    } else {
      console.error('Cart item not found for removal:', cartItemId);
      console.error('Available items:', dynamicCart.items);
    }
    
    return Promise.resolve({ ...dynamicCart });
  }

  async clearCart(email?: string): Promise<void> {
    // Try backend first if available, fallback to sample data on error
    if (!USE_SAMPLE_DATA_FOR_PRODUCTS && BACKEND_AVAILABLE) {
      try {
        if (!email) {
          // Try to get email from localStorage
          const userData = localStorage.getItem('user');
          const user = userData ? JSON.parse(userData) : null;
          email = user?.email;
        }
        if (!email) {
          throw new Error('Email required for clearCart');
        }
        
        console.log('Attempting to clear cart via Medusa backend...');
        await this.medusaRequest<any>(`/store/customers/cart/clear?email=${encodeURIComponent(email)}`, {
          method: 'DELETE',
        });
        console.log('Successfully cleared cart via backend');
        return;
      } catch (error) {
        console.warn('Backend unavailable for cart clear, falling back to local cart:', error);
        BACKEND_AVAILABLE = false; // Mark backend as unavailable
        // Fall through to sample data logic
      }
    }
    
    // Sample data mode or fallback
    console.log('Clearing local cart (sample data mode or fallback)');
    
    // Clear the in-memory cart
    dynamicCart = {
      id: 'cart_' + Date.now(),
      items: [],
      total: 0,
      subtotal: 0,
      tax_total: 0,
      shipping_total: 0
    };
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dynamicCart');
      console.log('Local cart cleared successfully');
    }
    
    return Promise.resolve();
  }

  // Sample APIs
  async getSamples(): Promise<Sample[]> {
    // Always return sample data for samples
    return Promise.resolve(sampleSamples);
  }

  async requestSample(sampleData: SampleRequest): Promise<void> {
    // For now, just resolve - could be enhanced to use real backend
    console.log('Sample request:', sampleData);
    return Promise.resolve();
  }

  // Blog APIs
  async getBlogPosts(params?: {
    limit?: number;
    offset?: number;
    category?: string;
  }): Promise<{ posts: BlogPost[]; count: number }> {
    // Always return sample blog data
    return Promise.resolve({ posts: sampleBlogPosts, count: sampleBlogPosts.length });
  }

  async getBlogPost(id: string): Promise<BlogPost> {
    // Always return sample blog data
    return Promise.resolve(sampleBlogPosts[0]);
  }

  async getBlogCategories(): Promise<BlogCategory[]> {
    // Always return sample blog categories
    return Promise.resolve(sampleBlogCategories);
  }

  // Medusa Customer APIs
  async medusaLogin(email: string, password: string): Promise<any> {
    return this.medusaRequest<any>('/store/customers/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async medusaSendResetEmail(email: string): Promise<{ message: string }> {
    const medusaResponse = await this.medusaRequest<any>('/store/customers/send-reset-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    return { message: medusaResponse.message };
  }

  async medusaVerifyOtp(email: string, otp: string): Promise<{ success: boolean }> {
    const medusaResponse = await this.medusaRequest<any>('/store/customers/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
    return { success: medusaResponse.success };
  }

  async medusaResetPassword(email: string, newPassword: string): Promise<{ message: string }> {
    const medusaResponse = await this.medusaRequest<any>('/store/customers/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, newPassword }),
    });
    return { message: medusaResponse.message };
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
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleProductCustomisations);
    }
    // Replace with real API call when backend is ready
    // return this.request(`/store/products/${productId}/customisations`);
  }

  // =================== Additional API Methods ===================

  // Alternative Authentication APIs
  async authLogin(email: string, password: string): Promise<AuthResponse> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleAuthResponse);
    }
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async authRegister(userData: RegisterData): Promise<AuthResponse> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleAuthResponse);
    }
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async authLogout(): Promise<void> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve();
    }
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve({ message: 'Password reset email sent' });
    }
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOTP(email: string, otp: string): Promise<{ message: string }> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve({ message: 'OTP verified successfully' });
    }
    return this.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve({ message: 'Password reset successfully' });
    }
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }

  // User Profile APIs
  async updateUserProfilePicture(picture: File): Promise<User> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleUser);
    }
    const formData = new FormData();
    formData.append('picture', picture);
    
    return this.request('/user/pfp', {
      method: 'PUT',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  // Alternative User Address APIs (for /user/addresses endpoints)
  async getUserAddressesAlt(): Promise<Address[]> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleAddresses);
    }
    return this.request('/user/addresses');
  }

  async createUserAddressAlt(addressData: Omit<Address, 'id'>): Promise<Address> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve({ ...addressData, id: 'new-address-id' } as Address);
    }
    return this.request('/user/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  }

  async updateUserAddressAlt(addressId: string, addressData: Partial<Address>): Promise<Address> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve({ ...addressData, id: addressId } as Address);
    }
    return this.request(`/user/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
  }

  async deleteUserAddress(addressId: string): Promise<void> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve();
    }
    return this.request(`/user/addresses/${addressId}`, {
      method: 'DELETE',
    });
  }

  async getSingleAddress(addressId: string): Promise<Address> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleAddresses[0]);
    }
    return this.request(`/store/customers/addresses?id=${addressId}`);
  }

  // User Card APIs
  async getUserCards(): Promise<Card[]> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleCards);
    }
    return this.request('/user/card');
  }

  async createUserCard(cardData: Omit<Card, 'id'>): Promise<Card> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve({ ...cardData, id: 'new-card-id' } as Card);
    }
    return this.request('/user/card', {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  }

  async getSingleCard(cardId: string): Promise<Card> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleCards[0]);
    }
    return this.request(`/user/card/${cardId}`);
  }

  async updateUserCard(cardId: string, cardData: Partial<Card>): Promise<Card> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve({ ...cardData, id: cardId } as Card);
    }
    return this.request(`/user/card/${cardId}`, {
      method: 'PUT',
      body: JSON.stringify(cardData),
    });
  }

  async deleteUserCard(cardId: string): Promise<void> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve();
    }
    return this.request(`/user/card/${cardId}`, {
      method: 'DELETE',
    });
  }

  // User Order APIs (Alternative endpoints)
  async getUserOrdersAlt(): Promise<Order[]> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleOrders);
    }
    return this.request('/user/orders');
  }

  async createUserOrder(orderData: any): Promise<Order> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleOrders[0]);
    }
    return this.request('/user/order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getSingleOrder(orderId: string): Promise<Order> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleOrders[0]);
    }
    return this.request(`/user/order/${orderId}`);
  }

  async updateUserOrder(orderId: string, orderData: Partial<Order>): Promise<Order> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve({ ...orderData, id: orderId } as Order);
    }
    return this.request(`/user/order/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  }

  async deleteUserOrder(orderId: string): Promise<void> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve();
    }
    return this.request(`/user/order/${orderId}`, {
      method: 'DELETE',
    });
  }

  // Contact API
  async submitContact(contactData: { name: string; email: string; message: string; phone?: string }): Promise<{ message: string }> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve({ message: 'Contact form submitted successfully' });
    }
    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Alternative Cart APIs (for /cart endpoints)
  async getCartAlt(): Promise<Cart> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleCart);
    }
    return this.request('/cart');
  }

  async addToCartAlt(productData: {
    product_id: string;
    quantity: number;
    customizations?: any;
  }): Promise<Cart> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleCart);
    }
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateCartItemAlt(cartItemId: string, quantity: number): Promise<Cart> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleCart);
    }
    return this.request(`/cart/${cartItemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCartAlt(cartItemId: string): Promise<Cart> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleCart);
    }
    return this.request(`/cart/${cartItemId}`, {
      method: 'DELETE',
    });
  }

  async clearCartAlt(): Promise<void> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve();
    }
    return this.request('/cart/clear', {
      method: 'POST',
    });
  }

  // Sample APIs (Alternative endpoints)
  async getSamplesAlt(): Promise<Sample[]> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleSamples);
    }
    return this.request('/samples');
  }

  async getSingleSample(sampleId: string): Promise<Sample> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleSamples[0]);
    }
    return this.request(`/sample?sampleid=${sampleId}`);
  }

  // Checkout APIs
  async processCheckoutAlt(checkoutData: CheckoutData): Promise<Order> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve(sampleOrders[0]);
    }
    return this.request('/user/checkout', {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    });
  }

  async calculateShippingAlt(cartItems: any[], address: Address): Promise<ShippingRate[]> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve([
        { id: 'rate1', name: 'Standard Shipping', price: 500, delivery_days: 3 },
        { id: 'rate2', name: 'Express Shipping', price: 1000, delivery_days: 1 },
      ]);
    }
    return this.request('/checkout/calculate-shipping', {
      method: 'POST',
      body: JSON.stringify({ cartItems, address }),
    });
  }

  async createShipment(orderData: any): Promise<{ awb: string; tracking_url: string }> {
    if (USE_SAMPLE_DATA_FOR_USER_AUTH) {
      return Promise.resolve({ awb: 'AWB123456789', tracking_url: 'https://track.example.com/AWB123456789' });
    }
    return this.request('/checkout/ship', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Product APIs (Alternative endpoints)
  async getProductsAlt(params?: {
    limit?: number;
    offset?: number;
    category_id?: string;
    search?: string;
  }): Promise<{ products: Product[]; count: number }> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
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

    const endpoint = `/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getProductAlt(id: string): Promise<Product> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleProducts.find(p => p.id === id) || sampleProducts[0]);
    }
    return this.request(`/products/${id}`);
  }

  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve({ ...productData, id: 'new-product-id', created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Product);
    }
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  // Customization API
  async addCustomizedProductToCart(productData: {
    product_id: string;
    quantity: number;
    customizations: any;
  }): Promise<Cart> {
    if (USE_SAMPLE_DATA_FOR_PRODUCTS) {
      return Promise.resolve(sampleCart);
    }
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }
}

// Create and export API instance
export const api = new ApiService();

// Export debug utilities for development use
export const debug = debugUtils;

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
  tags?: string[];
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
  customizations?: Array<{
    name: string;
    value: string;
  }>;
}

export interface CheckoutData {
  email: string;
  shipping_address: Address;
  billing_address?: Address;
  payment_method: string;
  shipping_method: string;
}

export interface Address {
  id?: string;
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
  customizations?: Array<{
    name: string;
    value: string;
  }>;
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

export interface Card {
  id: string;
  card_type: string;
  card_name: string;
  card_number: string;
  expiry_date: string;
  security_code: string;
}

export { ApiService }; 