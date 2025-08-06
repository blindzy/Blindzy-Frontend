// Debug utility to test backend API responses
import { API_CONFIG } from '../config/api';

const headers = {
  'Content-Type': 'application/json',
  'x-publishable-api-key': API_CONFIG.MEDUSA_PUBLISHABLE_KEY,
};

export const debugApi = {
  // Test customer profile endpoint
  async testCustomerProfile(email: string) {
    console.log('=== Testing Customer Profile ===');
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/customers/get-customer?email=${encodeURIComponent(email)}`, {
        headers
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const text = await response.text();
      console.log('Raw response:', text);
      
      try {
        const json = JSON.parse(text);
        console.log('Parsed response:', json);
        return json;
      } catch (e) {
        console.log('Response is not valid JSON');
        return text;
      }
    } catch (error) {
      console.error('Customer profile test failed:', error);
      return null;
    }
  },

  // Test cart endpoint
  async testCart(email: string) {
    console.log('=== Testing Cart ===');
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/customers/cart?email=${encodeURIComponent(email)}`, {
        headers
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const text = await response.text();
      console.log('Raw response:', text);
      
      try {
        const json = JSON.parse(text);
        console.log('Parsed response:', json);
        return json;
      } catch (e) {
        console.log('Response is not valid JSON');
        return text;
      }
    } catch (error) {
      console.error('Cart test failed:', error);
      return null;
    }
  },

  // Test orders endpoint
  async testOrders(email: string) {
    console.log('=== Testing Orders ===');
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/customers/order?email=${encodeURIComponent(email)}`, {
        headers
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const text = await response.text();
      console.log('Raw response:', text);
      
      try {
        const json = JSON.parse(text);
        console.log('Parsed response:', json);
        return json;
      } catch (e) {
        console.log('Response is not valid JSON');
        return text;
      }
    } catch (error) {
      console.error('Orders test failed:', error);
      return null;
    }
  },

  // Test addresses endpoint
  async testAddresses(email: string) {
    console.log('=== Testing Addresses ===');
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/customers/addresses?email=${encodeURIComponent(email)}`, {
        headers
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const text = await response.text();
      console.log('Raw response:', text);
      
      try {
        const json = JSON.parse(text);
        console.log('Parsed response:', json);
        return json;
      } catch (e) {
        console.log('Response is not valid JSON');
        return text;
      }
    } catch (error) {
      console.error('Addresses test failed:', error);
      return null;
    }
  },

  // Run all tests
  async runAllTests(email: string) {
    console.log('=== Running All API Tests ===');
    console.log('Email:', email);
    console.log('Base URL:', API_CONFIG.BASE_URL);
    console.log('API Key:', API_CONFIG.MEDUSA_PUBLISHABLE_KEY);
    
    await this.testCustomerProfile(email);
    await this.testCart(email);
    await this.testOrders(email);
    await this.testAddresses(email);
    
    console.log('=== All Tests Complete ===');
  }
};

// Make it available globally for console debugging (only in browser)
if (typeof window !== 'undefined') {
  (window as any).debugApi = debugApi;
}
