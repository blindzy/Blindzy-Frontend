// Test API configuration
import { API_CONFIG } from '../config/api';

// Function to test actual API call
export async function SignupApiCall() {
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
