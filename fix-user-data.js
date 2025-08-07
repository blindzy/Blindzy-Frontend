// Script to fix user data issues
console.log('🔧 Fixing user data...');

// Check current localStorage state
console.log('\n📋 Current localStorage state:');
console.log('user:', localStorage.getItem('user'));
console.log('userEmail:', localStorage.getItem('userEmail'));

// Check if current user data is sample data
const currentUser = localStorage.getItem('user');
if (currentUser) {
  try {
    const parsed = JSON.parse(currentUser);
    if (parsed.first_name === 'Sample' && parsed.last_name === 'User') {
      console.log('⚠️  Found sample user data - clearing it...');
      localStorage.removeItem('user');
      localStorage.removeItem('userEmail');
      console.log('✅ Sample user data cleared');
    } else {
      console.log('✅ Real user data found:', parsed.first_name, parsed.last_name);
    }
  } catch (e) {
    console.error('Error parsing user data:', e);
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
  }
} else {
  console.log('ℹ️  No user data in localStorage');
}

// Set real test user data for testing
const testUser = {
  id: 'user_' + Date.now(),
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Doe',
  phone: '+1234567890'
};

console.log('\n🧪 Setting test user for debugging:');
localStorage.setItem('user', JSON.stringify(testUser));
localStorage.setItem('userEmail', testUser.email);
console.log('✅ Test user set:', testUser.first_name, testUser.last_name);

console.log('\n🔄 Please refresh the page to see the changes');
