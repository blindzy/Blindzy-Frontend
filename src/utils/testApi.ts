// Test API configuration
import { API_CONFIG } from '../config/api';

export function testApiConfig() {
  console.log('Testing API Configuration...');
  console.log('MEDUSA_BASE_URL:', API_CONFIG.MEDUSA_BASE_URL);
  console.log('MEDUSA_PUBLISHABLE_KEY:', API_CONFIG.MEDUSA_PUBLISHABLE_KEY);
  console.log('Environment variables:');
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('VITE_MEDUSA_PUBLISHABLE_KEY:', import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY);
  
  // Test if the publishable key is the correct one
  const expectedKey = 'pk_c5c3a7c4c2f5e1c991a5feec30098bdaad87511c48b8f8a99cac999d528295aa';
  const actualKey = API_CONFIG.MEDUSA_PUBLISHABLE_KEY;
  
  console.log('Expected key:', expectedKey);
  console.log('Actual key:', actualKey);
  console.log('Keys match:', expectedKey === actualKey);
  
  return {
    baseUrl: API_CONFIG.MEDUSA_BASE_URL,
    publishableKey: API_CONFIG.MEDUSA_PUBLISHABLE_KEY,
    keysMatch: expectedKey === actualKey
  };
}

// Function to test actual API call
export async function testApiCall() {
  try {
    const url = `${API_CONFIG.MEDUSA_BASE_URL}/store/customers/register`;
    console.log('Testing API call to:', url);
    console.log('With headers:', {
      'Content-Type': 'application/json',
      'x-publishable-api-key': API_CONFIG.MEDUSA_PUBLISHABLE_KEY,
    });
    
    // Just test with OPTIONS request to avoid creating actual user
    const response = await fetch(url, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': API_CONFIG.MEDUSA_PUBLISHABLE_KEY,
      },
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    return {
      status: response.status,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    console.error('Test API call failed:', error);
    return { error: error.message };
  }
}
