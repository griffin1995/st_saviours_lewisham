/**
 * Motion configuration with LazyMotion optimization
 * Reduces bundle size from 34KB to 6KB while maintaining full functionality
 */
import React from 'react'
import { domAnimation, LazyMotion, m } from 'framer-motion'

// Motion component with LazyMotion optimization
export const Motion = m

// LazyMotion wrapper for optimized bundle size
export const MotionProvider = ({ children }: { children: React.ReactNode }) => 
  React.createElement(LazyMotion, { features: domAnimation, strict: true }, children)

// Common animation variants for Catholic church website
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 }
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Reverent animation for religious content
export const reverentReveal = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
}

// Gold accent animation for Catholic aesthetics
export const goldAccent = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 }
}

// Hover effects for interactive elements
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
}

export const hoverLift = {
  whileHover: { y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
  transition: { duration: 0.3 }
}

// Reduced motion support
export const respectMotion = (animation: any) => ({
  ...animation,
  transition: {
    ...animation.transition,
    duration: 0.1,
    ease: 'linear'
  }
})