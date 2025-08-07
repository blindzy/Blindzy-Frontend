// Health check test for the backend
export async function testBackendHealth() {
  const baseUrl = 'http://208.87.135.120:9000';
  const publishableKey = 'pk_c5c3a7c4c2f5e1c991a5feec30098bdaad87511c48b8f8a99cac999d528295aa';
  
  console.log('Testing backend connectivity...');
  
  try {
    // Test 1: Health check endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    console.log('Health check response:', {
      status: healthResponse.status,
      ok: healthResponse.ok,
      statusText: healthResponse.statusText
    });
    
    // Test 2: Try the registration endpoint with OPTIONS to check CORS
    console.log('2. Testing CORS on registration endpoint...');
    const corsResponse = await fetch(`${baseUrl}/store/customers/register`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:4321',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type,x-publishable-api-key'
      }
    });
    console.log('CORS check response:', {
      status: corsResponse.status,
      ok: corsResponse.ok,
      headers: Object.fromEntries(corsResponse.headers.entries())
    });
    
    // Test 3: Test with minimal POST to see what error we get
    console.log('3. Testing minimal POST request...');
    const testResponse = await fetch(`${baseUrl}/store/customers/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey,
      },
      body: JSON.stringify({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        password: 'testpassword123'
      })
    });
    
    const responseText = await testResponse.text();
    console.log('Test POST response:', {
      status: testResponse.status,
      ok: testResponse.ok,
      statusText: testResponse.statusText,
      body: responseText
    });
    
    return {
      healthCheck: healthResponse.ok,
      corsCheck: corsResponse.ok,
      registrationTest: testResponse.ok
    };
  } catch (error) {
    console.error('Backend test failed:', error);
    return { error: error.message };
  }
}
