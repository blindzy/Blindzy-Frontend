export default {
    darkMode: ['class'],
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    	extend: {
    		fontFamily: {
    			roboto: [
    				'Roboto',
    				'sans-serif'
    			],
    			plus: [
    				'M PLUS Rounded 1c',
    				'sans-serif'
    			],
    			nunito: [
    				'Nunito',
    				'sans-serif'
    			],
    			poppins: [
    				'Poppins',
    				'sans-serif'
    			],
    			inter: [
    				'Inter',
    				'sans-serif'
    			]
    		},
			boxShadow: {
				shadow01 : '34px 38px 14px 0 rgba(0, 14, 117, 0.00), 22px 24px 13px 0 rgba(0, 14, 117, 0.01), 12px 14px 11px 0 rgba(0, 14, 117, 0.04), 5px 6px 8px 0 rgba(0, 14, 117, 0.07), 1px 2px 5px 0 rgba(0, 14, 117, 0.08)'
			},
    		borderRadius: {
    			'48': '48px',
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		}
    	},
    	screens: {
    		mbl: {
    			min: '0px',
    			max: '768px'
    		},
    		mn: '430px',
    		sm: '640px',
    		md: '768px',
    		lg: '1024px',
    		xl: '1150px',
    		mini: '1300px',
    		'1xl': '1400px',
    		middle: '1600px',
    		'2xl': '1536px',
    		'3xl': '1921px',
    		'4xl': '2561px'
    	}
    },
	plugins: [require("tailwindcss-animate")],
  }
  