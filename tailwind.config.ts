
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom theme colors
				navy: "#0A1931",
				military: {
					DEFAULT: "#2C5530",
					light: "#3A7144",
					dark: "#1E3D20"
				},
				saffron: {
					DEFAULT: "#FF9933",
					light: "#FFBB66",
					dark: "#E67300"
				},
				alertRed: {
					DEFAULT: "#FF4C4C",
					glow: "rgba(255, 76, 76, 0.5)"
				},
				success: "#4CAF50"
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif']
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'flag-wave': {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(2deg)' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(255, 153, 51, 0.5)',
						opacity: 0.8
					},
					'50%': { 
						boxShadow: '0 0 20px rgba(255, 153, 51, 0.8)',
						opacity: 1
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'count-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flag-wave': 'flag-wave 6s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 3s infinite',
				'float': 'float 6s ease-in-out infinite',
				'count-up': 'count-up 0.5s ease-out forwards'
			},
			backgroundImage: {
				'hero-pattern': 'linear-gradient(to bottom, rgba(10, 25, 49, 0.9), rgba(10, 25, 49, 0.95)), url("/hero-bg.jpg")',
				'card-gradient': 'linear-gradient(135deg, rgba(44, 85, 48, 0.1) 0%, rgba(44, 85, 48, 0.2) 100%)',
				'saffron-gradient': 'linear-gradient(135deg, #FF9933 0%, #E67300 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
