/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contexts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Catholic color scheme - Navy, White, Gold
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5b9fc',
          400: '#8b95f8',
          500: '#7371f0',
          600: '#5d4de6',
          700: '#4c3dd3',
          800: '#3f34a8',
          900: '#1e1b4b',
        },
        // Catholic Navy - Deep, reverent blues
        navy: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d6fe',
          300: '#a5b9fc',
          400: '#8691f8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#1e3a8a',
          900: '#1e2a5e',
        },
        // Pure whites for sacred spaces
        white: {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fdfdfd',
          300: '#fcfcfc',
          400: '#fafafa',
          500: '#f9f9f9',
          600: '#f5f5f5',
          700: '#f0f0f0',
          800: '#e8e8e8',
          900: '#e0e0e0',
        },
        // Catholic Gold - Warm, sacred metallics
        gold: {
          50: '#fffef7',
          100: '#fffce8',
          200: '#fff6c5',
          300: '#ffeb97',
          400: '#ffda58',
          500: '#ffc832',
          600: '#f1a82a',
          700: '#d18225',
          800: '#b5621f',
          900: '#8b4513',
        },
        // Liturgical burgundy for accents
        burgundy: {
          50: '#fdf2f2',
          100: '#fce7e7',
          200: '#f8d1d1',
          300: '#f1a8a8',
          400: '#e87171',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#701a1a',
        },
        // Soft grays for subtle elements
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Premium cream colors for modern design
        cream: {
          50: '#fefefe',
          100: '#fdfcfb',
          200: '#fbf9f6',
          300: '#f7f4f0',
          400: '#f3efea',
          500: '#f1ede8',
          600: '#e8e2da',
          700: '#ded6cc',
          800: '#d2c8bb',
          900: '#c4b8a9',
        },
        // Modern charcoal colors
        charcoal: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#404040',
          800: '#2d2d2d',
          900: '#1a1a1a',
        },
        // Sage accent colors
        sage: {
          50: '#f6f7f6',
          100: '#e3e5e3',
          200: '#c7cbc7',
          300: '#a5aba5',
          400: '#848a84',
          500: '#6b716b',
          600: '#4a5d4b',
          700: '#3d4a3e',
          800: '#333d34',
          900: '#2d342e',
        },
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      keyframes: {
        slideDown: {
          '0%': { 
            transform: 'translateY(-20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      },
      animation: {
        slideDown: 'slideDown 0.4s ease-out forwards'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}