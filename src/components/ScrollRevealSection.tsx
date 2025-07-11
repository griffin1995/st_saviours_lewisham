/**
 * ScrollRevealSection Component
 * Provides scroll-triggered animations for professional Catholic church website
 * Implements 2025 design standards with accessibility support
 */
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { Motion, fadeInUp, reverentReveal, staggerChildren } from '@/lib/motion'

interface ScrollRevealSectionProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'reverent' | 'stagger'
  threshold?: number
  triggerOnce?: boolean
  delay?: number
}

export function ScrollRevealSection({
  children,
  className = '',
  variant = 'default',
  threshold = 0.1,
  triggerOnce = true,
  delay = 0
}: ScrollRevealSectionProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin: '-50px 0px'
  })

  // Animation variants based on Catholic design principles
  const getAnimationVariants = () => {
    switch (variant) {
      case 'reverent':
        return {
          initial: reverentReveal.initial,
          animate: inView ? reverentReveal.animate : reverentReveal.initial,
          transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 }
        }
      case 'stagger':
        return {
          initial: 'initial',
          animate: inView ? 'animate' : 'initial',
          variants: staggerChildren
        }
      default:
        return {
          initial: fadeInUp.initial,
          animate: inView ? fadeInUp.animate : fadeInUp.initial,
          transition: { duration: 0.6, ease: 'easeOut', delay: delay }
        }
    }
  }

  const animationProps = getAnimationVariants()

  return (
    <Motion.div
      ref={ref}
      className={`relative ${className}`}
      {...animationProps}
    >
      {children}
    </Motion.div>
  )
}

export default ScrollRevealSection