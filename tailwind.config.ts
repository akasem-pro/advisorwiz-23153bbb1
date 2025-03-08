
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
				// AdvisorWiz custom colors
				navy: {
					50: '#f0f5fa',
					100: '#dce6f2',
					200: '#bdd0e9',
					300: '#92b2db',
					400: '#6490ca',
					500: '#4072b7',
					600: '#345b99',
					700: '#2d487b',
					800: '#293d67',
					900: '#253556',
					950: '#17213c',
				},
				teal: {
					50: '#effefb',
					100: '#c7fff6',
					200: '#8ffded',
					300: '#5af4e4',
					400: '#2ee6d6',
					500: '#17cac3',
					600: '#10a3a1',
					700: '#138282',
					800: '#146667',
					900: '#155556',
					950: '#063638',
				},
				gold: {
					50: '#fefbe8',
					100: '#fef6c2',
					200: '#fded88',
					300: '#fce25b',
					400: '#fad035',
					500: '#f2b918',
					600: '#dc9a0e',
					700: '#b6750e',
					800: '#945c13',
					900: '#7a4a15',
					950: '#432908',
				},
				slate: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a',
					950: '#020617',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'slide-up': {
					'0%': { 
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateY(0)', 
						opacity: '1'
					},
				},
				'slide-down': {
					'0%': { 
						transform: 'translateY(-20px)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateY(0)',
						opacity: '1'
					},
				},
				'slide-in-right': {
					'0%': { 
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateX(0)',
						opacity: '1'
					},
				},
				'slide-in-left': {
					'0%': { 
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateX(0)',
						opacity: '1'
					},
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'pulse-scale': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
				},
				'swipe-right': {
					'0%': { transform: 'translateX(0) rotate(0)' },
					'100%': { transform: 'translateX(200%) rotate(20deg)' },
				},
				'swipe-left': {
					'0%': { transform: 'translateX(0) rotate(0)' },
					'100%': { transform: 'translateX(-200%) rotate(-20deg)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'slide-down': 'slide-down 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.4s ease-out',
				'slide-in-left': 'slide-in-left 0.4s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
				'swipe-right': 'swipe-right 0.5s forwards ease-out',
				'swipe-left': 'swipe-left 0.5s forwards ease-out'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
