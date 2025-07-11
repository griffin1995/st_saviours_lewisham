import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface ScrollRevealSectionProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  reducedMotion?: boolean
  threshold?: number
  triggerOnce?: boolean
}

export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = '',
  reducedMotion = false,
  threshold = 0.1,
  triggerOnce = true
}) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    threshold, 
    once: triggerOnce,
    margin: "-100px 0px -100px 0px"
  })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!triggerOnce) {
      controls.start('hidden')
    }
  }, [isInView, controls, triggerOnce])

  // Variants for different directions
  const getVariants = () => {
    if (reducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2, delay }
        }
      }
    }

    const baseVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration, delay, ease: "easeOut" }
      }
    }

    switch (direction) {
      case 'up':
        return {
          hidden: { ...baseVariants.hidden, y: distance },
          visible: { ...baseVariants.visible, y: 0 }
        }
      case 'down':
        return {
          hidden: { ...baseVariants.hidden, y: -distance },
          visible: { ...baseVariants.visible, y: 0 }
        }
      case 'left':
        return {
          hidden: { ...baseVariants.hidden, x: distance },
          visible: { ...baseVariants.visible, x: 0 }
        }
      case 'right':
        return {
          hidden: { ...baseVariants.hidden, x: -distance },
          visible: { ...baseVariants.visible, x: 0 }
        }
      case 'fade':
      default:
        return baseVariants
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  )
}

// Specialized components for common use cases
export const ScrollRevealCard: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection
    {...props}
    className={`${props.className || ''} bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6`}
  />
)

export const ScrollRevealHeading: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection
    {...props}
    direction="down"
    delay={0.2}
    className={`${props.className || ''} text-center mb-8`}
  />
)

export const ScrollRevealText: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection
    {...props}
    direction="up"
    delay={0.4}
    className={`${props.className || ''} text-gray-100 leading-relaxed`}
  />
)

export const ScrollRevealImage: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection
    {...props}
    direction="fade"
    delay={0.3}
    className={`${props.className || ''} overflow-hidden rounded-2xl`}
  />
)

export const ScrollRevealButton: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection
    {...props}
    direction="up"
    delay={0.6}
    className={`${props.className || ''} text-center`}
  />
)

// Staggered children animation
interface ScrollRevealStaggerProps {
  children: React.ReactNode
  stagger?: number
  className?: string
  reducedMotion?: boolean
}

export const ScrollRevealStagger: React.FC<ScrollRevealStaggerProps> = ({
  children,
  stagger = 0.1,
  className = '',
  reducedMotion = false
}) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { threshold: 0.1, once: true })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : stagger,
        delayChildren: reducedMotion ? 0 : 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.4 }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Advanced scroll reveal with custom animations
interface ScrollRevealAdvancedProps extends ScrollRevealSectionProps {
  scale?: number
  rotate?: number
  blur?: number
  skew?: number
}

export const ScrollRevealAdvanced: React.FC<ScrollRevealAdvancedProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  scale = 1,
  rotate = 0,
  blur = 0,
  skew = 0,
  className = '',
  reducedMotion = false,
  threshold = 0.1,
  triggerOnce = true
}) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { threshold, once: triggerOnce })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!triggerOnce) {
      controls.start('hidden')
    }
  }, [isInView, controls, triggerOnce])

  const getAdvancedVariants = () => {
    if (reducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2, delay }
        }
      }
    }

    const baseHidden = {
      opacity: 0,
      scale: scale !== 1 ? scale * 0.8 : 1,
      rotate: rotate !== 0 ? rotate * 0.5 : 0,
      filter: blur > 0 ? `blur(${blur}px)` : 'blur(0px)',
      skew: skew !== 0 ? skew * 0.5 : 0
    }

    const baseVisible = {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      skew: 0,
      transition: { duration, delay, ease: "easeOut" }
    }

    switch (direction) {
      case 'up':
        return {
          hidden: { ...baseHidden, y: distance },
          visible: { ...baseVisible, y: 0 }
        }
      case 'down':
        return {
          hidden: { ...baseHidden, y: -distance },
          visible: { ...baseVisible, y: 0 }
        }
      case 'left':
        return {
          hidden: { ...baseHidden, x: distance },
          visible: { ...baseVisible, x: 0 }
        }
      case 'right':
        return {
          hidden: { ...baseHidden, x: -distance },
          visible: { ...baseVisible, x: 0 }
        }
      case 'fade':
      default:
        return {
          hidden: baseHidden,
          visible: baseVisible
        }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={getAdvancedVariants()}
    >
      {children}
    </motion.div>
  )
}

// Utility hook for scroll reveal
export const useScrollReveal = (
  threshold: number = 0.1,
  triggerOnce: boolean = true
) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { threshold, once: triggerOnce })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!triggerOnce) {
      controls.start('hidden')
    }
  }, [isInView, controls, triggerOnce])

  return { ref, isInView, controls }
}

export default ScrollRevealSection