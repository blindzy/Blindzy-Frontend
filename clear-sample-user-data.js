// Clear Sample User Data Script
// Run this to remove any sample user data and force proper registration

console.log('🧹 Clearing sample user data...');

// Check if running in browser
if (typeof window !== 'undefined') {
  const userData = localStorage.getItem('user');
  
  if (userData) {
    try {
      const user = JSON.parse(userData);
      console.log('Current user data:', user);
      
      // Check if it's sample data
      if (user.first_name === 'Sample' && user.last_name === 'User') {
        console.log('⚠️  Found sample user data! Clearing...');
        localStorage.removeItem('user');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('dynamicCart');
        localStorage.removeItem('completedOrders');
        console.log('✅ Sample user data cleared! Users will need to register again with real data.');
        alert('Sample user data has been cleared. Please register again with your real information.');
        window.location.href = '/signUp';
      } else {
        console.log('✅ User data appears to be real, keeping it.');
      }
    } catch (parseError) {
      console.error('Error parsing user data:', parseError);
      console.log('Clearing invalid user data...');
      localStorage.removeItem('user');
      localStorage.removeItem('userEmail');
    }
  } else {
    console.log('No user data found in localStorage');
  }
} else {
  console.log('This script should be run in a browser environment');
}
