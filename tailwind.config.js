/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Atlantic Anvil Brand Colors
      colors: {
        // Primary Atlantic Anvil palette
        'atlantic-navy': '#1a365d',
        'anvil-red': '#c53030', 
        'torch-gold': '#d69e2e',
        'lightning-blue': '#2b6cb0',
        'cream-bg': '#faf5f0',
        
        // Extended palette for components
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#1a365d', // atlantic-navy
        },
        destructive: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca', 
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626', // anvil-red
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d', 
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706', // torch-gold
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        }
      },
      
      // Typography
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // Spacing for consistent layout
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Border radius
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      
      // Box shadows for depth
      boxShadow: {
        'atlantic': '0 4px 6px -1px rgba(26, 54, 93, 0.1), 0 2px 4px -1px rgba(26, 54, 93, 0.06)',
        'anvil': '0 10px 15px -3px rgba(197, 48, 48, 0.1), 0 4px 6px -2px rgba(197, 48, 48, 0.05)',
        'torch': '0 20px 25px -5px rgba(214, 158, 46, 0.1), 0 10px 10px -5px rgba(214, 158, 46, 0.04)',
      },
      
      // Animation
      animation: {
        'eagle-soar': 'soar 3s ease-in-out infinite',
        'torch-flicker': 'flicker 2s ease-in-out infinite',
        'anvil-strike': 'strike 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-patriotic': 'pulsePatriotic 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        soar: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        strike: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulsePatriotic: {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(197, 48, 48, 0.7)'
          },
          '70%': { 
            opacity: '.9',
            boxShadow: '0 0 0 10px rgba(197, 48, 48, 0)'
          },
        },
      },
      
      // Screens for responsive design
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px', 
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
        '3xl': '1600px',
      },
      
      // Container max-widths
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
  
  // Dark mode configuration
  darkMode: 'media', // Follows system preference
  
  // Safelist important classes that might be used dynamically
  safelist: [
    'text-atlantic-navy',
    'text-anvil-red', 
    'text-torch-gold',
    'text-lightning-blue',
    'bg-atlantic-navy',
    'bg-anvil-red',
    'bg-torch-gold', 
    'bg-lightning-blue',
    'border-atlantic-navy',
    'border-anvil-red',
    'border-torch-gold',
    'border-lightning-blue',
  ],
}
