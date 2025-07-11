/**
 * Professional Catholic Church Typography Configuration
 * Based on 2025 design research recommendations
 */
import { Merriweather, Source_Sans_3, Noto_Sans } from 'next/font/google'

// Merriweather serif fonts for excellent religious content readability
export const merriweather = Merriweather({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
  variable: '--font-merriweather'
})

// Source Sans 3 for clean, professional body text
export const sourceSansPro = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
  variable: '--font-source-sans-pro'
})

// Noto Sans for harmonious multilingual support
export const notoSans = Noto_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false, // Load on demand for multilingual content
  variable: '--font-noto-sans'
})

// Font class combinations for consistent usage
export const fontClasses = {
  // Main heading font with spiritual warmth
  heading: `${merriweather.variable} font-serif`,
  
  // Body text font for professional readability
  body: `${sourceSansPro.variable} font-body`,
  
  // Display font for hero sections
  display: `${merriweather.variable} font-display`,
  
  // Multilingual content support
  multilingual: `${notoSans.variable} font-multilingual`,
  
  // Combined classes for full typography system
  all: `${merriweather.variable} ${sourceSansPro.variable} ${notoSans.variable}`
}

// Typography scale for Catholic church hierarchy
export const typographyScale = {
  // H1 headers at 2.5rem with high contrast for spiritual emphasis
  h1: 'text-4xl font-serif font-light tracking-tight',
  
  // Supporting headers with professional hierarchy
  h2: 'text-3xl font-serif font-light',
  h3: 'text-2xl font-serif font-normal',
  h4: 'text-xl font-body font-semibold',
  h5: 'text-lg font-body font-semibold',
  h6: 'text-base font-body font-semibold',
  
  // Body text optimized for readability
  body: 'text-base font-body leading-relaxed',
  bodyLarge: 'text-lg font-body leading-relaxed',
  bodySmall: 'text-sm font-body leading-normal',
  
  // Special text styles
  caption: 'text-sm font-body font-medium',
  quote: 'text-lg font-serif italic leading-relaxed',
  
  // Interactive elements
  button: 'text-base font-body font-semibold',
  link: 'text-base font-body font-medium underline-offset-2',
  
  // Catholic-specific styles
  verse: 'text-lg font-serif italic text-center leading-relaxed',
  prayer: 'text-base font-serif leading-relaxed',
  blessing: 'text-lg font-serif font-light italic text-center'
}