export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		fontFamily: {
		  roboto: ['Roboto', 'sans-serif'],
		  poppins: ['Poppins', 'sans-serif'],
		},
	  },
	  screens: {
		'mbl': {'min': '0px', 'max': '768px'},
		// => @media (min-width: 480px) { ... }

		'mn': '430px',
		// => @media (min-width: 480px) { ... }
  
		'sm': '640px',
		// => @media (min-width: 640px) { ... }
  
		'md': '768px',
		// => @media (min-width: 768px) { ... }
  
		'lg': '1024px',
		// => @media (min-width: 1024px) { ... }
  
		// 'xl': '1280px',
		'xl': '1150px',
		// => @media (min-width: 1150px) { ... }
		
		'mini': '1300px',
		// => @media (min-width: 1270px) { ... }
  
		'1xl': '1400px',
		// => @media (min-width: 1400px) { ... }
  
		'middle': '1600px',
		// => @media (min-width: 1500px) { ... }
  
		'2xl': '1536px',
		// => @media (min-width: 1536px) { ... }
		
		'3xl': '1921px',
		// => @media (min-width: 1921px) { ... }
		
		'4xl': '2561px',
		// => @media (min-width: 2560px) { ... }
	  }
	},
	plugins: [],
  }
  