// Comprehensive test to debug the user data issue
console.log('=== COMPREHENSIVE USER DATA DEBUG ===');

// 1. Check current localStorage state
console.log('\n1. CURRENT LOCALSTORAGE STATE:');
const currentUser = localStorage.getItem('user');
const currentEmail = localStorage.getItem('userEmail');
console.log('user:', currentUser);
console.log('userEmail:', currentEmail);

if (currentUser) {
  try {
    const parsed = JSON.parse(currentUser);
    console.log('Parsed user:', parsed);
    
    if (parsed.first_name === 'Sample' && parsed.last_name === 'User') {
      console.log('❌ Current localStorage has SAMPLE DATA');
      
      // Let's set some real data for testing
      console.log('\n2. SETTING REAL TEST DATA:');
      const realTestData = {
        id: 'user_test_' + Date.now(),
        email: 'real.user@test.com',
        first_name: 'Real',
        last_name: 'User',
        phone: '+61400123456'
      };
      
      localStorage.setItem('user', JSON.stringify(realTestData));
      localStorage.setItem('userEmail', realTestData.email);
      console.log('✅ Set real test data:', realTestData);
      
    } else {
      console.log('✅ Current localStorage has REAL DATA');
    }
    
  } catch (e) {
    console.error('Error parsing localStorage user:', e);
  }
}

// 3. Test the API function directly
console.log('\n3. TESTING API FUNCTION DIRECTLY:');
if (window.api && window.api.getUserProfile) {
  // Try to call getUserProfile if available
  console.log('API is available, testing getUserProfile...');
} else {
  console.log('API not available in window, this is normal for module-based imports');
}

console.log('\n=== Please refresh the page to see changes ===');
