/**
 * Design tokens for St Saviour's Catholic Church website
 * Centralized design system values for consistent styling
 */

export const designTokens = {
  colors: {
    // Primary colors - consistent throughout site
    primary: {
      50: '#f8fafc',
      100: '#f1f5f9', 
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a', // Main brand blue (slate-900)
    },
    
    // Gold accent colors
    gold: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a', 
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#eab308', // Primary gold
      600: '#d97706', // Hover gold
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
    },
    
    // Neutral colors for text and backgrounds
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252', // Body text
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Semantic colors
    success: {
      500: '#22c55e',
      600: '#16a34a',
    },
    warning: {
      500: '#eab308',
      600: '#d97706',
    },
    error: {
      500: '#ef4444',
      600: '#dc2626',
    },
    
    // Special backgrounds
    white: '#ffffff',
    transparent: 'transparent',
  },
  
  spacing: {
    // Section spacing
    section: {
      xs: '2rem',    // py-8
      sm: '3rem',    // py-12
      md: '4rem',    // py-16  
      lg: '6rem',    // py-24
      xl: '8rem',    // py-32
    },
    
    // Component spacing
    component: {
      xs: '0.5rem',  // p-2
      sm: '1rem',    // p-4
      md: '1.5rem',  // p-6
      lg: '2rem',    // p-8
      xl: '3rem',    // p-12
    },
  },
  
  typography: {
    // Font families
    fontFamily: {
      serif: ['Georgia', 'Times New Roman', 'serif'],
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
    },
    
    // Font sizes and styles for headings
    heading: {
      h1: {
        mobile: 'text-3xl font-serif font-light',
        desktop: 'text-6xl font-serif font-light',
        color: 'text-slate-900',
      },
      h2: {
        mobile: 'text-2xl font-serif font-light', 
        desktop: 'text-4xl font-serif font-light',
        color: 'text-slate-900',
      },
      h3: {
        mobile: 'text-xl font-serif font-medium',
        desktop: 'text-3xl font-serif font-medium', 
        color: 'text-slate-900',
      },
      h4: {
        mobile: 'text-lg font-serif font-medium',
        desktop: 'text-2xl font-serif font-medium',
        color: 'text-slate-900',
      },
    },
    
    // Body text styles
    body: {
      large: {
        size: 'text-xl',
        color: 'text-gray-600',
        lineHeight: 'leading-relaxed',
      },
      regular: {
        size: 'text-lg', 
        color: 'text-gray-600',
        lineHeight: 'leading-relaxed',
      },
      small: {
        size: 'text-base',
        color: 'text-gray-600',
        lineHeight: 'leading-normal',
      },
      caption: {
        size: 'text-sm',
        color: 'text-gray-500', 
        lineHeight: 'leading-normal',
      },
    },
  },
  
  layout: {
    // Container max widths
    container: {
      sm: 'max-w-3xl',
      md: 'max-w-5xl', 
      lg: 'max-w-7xl',
      xl: 'max-w-8xl',
      full: 'max-w-full',
    },
    
    // Common padding classes
    padding: {
      container: 'px-4 sm:px-6 lg:px-8',
      section: 'py-24',
      component: 'p-8',
    },
    
    // Border radius values
    borderRadius: {
      sm: 'rounded-lg',
      md: 'rounded-xl', 
      lg: 'rounded-2xl',
      full: 'rounded-full',
    },
    
    // Shadow values
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-lg',
      lg: 'shadow-xl',
      xl: 'shadow-2xl',
    },
  },
  
  animation: {
    // Duration values
    duration: {
      fast: '0.2s',
      normal: '0.3s', 
      slow: '0.5s',
      slower: '0.8s',
    },
    
    // Easing functions
    easing: {
      linear: 'linear',
      easeIn: 'ease-in',
      easeOut: 'ease-out', 
      easeInOut: 'ease-in-out',
      spring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    
    // Common transitions
    transition: {
      all: 'transition-all duration-300 ease-in-out',
      colors: 'transition-colors duration-300',
      transform: 'transition-transform duration-300',
      opacity: 'transition-opacity duration-300',
    },
  },
  
  // Breakpoints (matches Tailwind defaults)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px', 
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

// Type exports for TypeScript
export type DesignTokens = typeof designTokens
export type ColorScale = keyof typeof designTokens.colors.primary
export type SpacingScale = keyof typeof designTokens.spacing.section