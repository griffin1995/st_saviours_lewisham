import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, m } from 'framer-motion'
import { Heading, Text } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'
import { getPageImage } from '@/lib/cms-images'

interface PageHeroProps {
  /**
   * Main heading text
   */
  title: string
  
  /**
   * Optional subtitle/category text
   */
  subtitle?: string
  
  /**
   * Optional description text
   */
  description?: string
  
  /**
   * Background image URL (optional - will use CMS if not provided)
   */
  backgroundImage?: string
  
  /**
   * CMS page identifier for automatic image selection
   * If not provided, will try to auto-detect from window.location
   */
  pageName?: string
  
  /**
   * Hero section height
   */
  height?: 'small' | 'medium' | 'large' | 'full'
  
  /**
   * Overlay darkness level
   */
  overlay?: 'light' | 'medium' | 'dark'
  
  /**
   * Text alignment
   */
  textAlign?: 'left' | 'center' | 'right'
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Optional action buttons/content
   */
  actions?: React.ReactNode
  
  /**
   * Whether component is rendered inside LazyMotion (uses m instead of motion)
   */
  insideLazyMotion?: boolean
}

/**
 * Modern page hero component with consistent styling across all pages
 * 
 * @example
 * <PageHero
 *   title="About St Saviour's"
 *   subtitle="Our Community"
 *   description="A vibrant Catholic community in the heart of Lewisham"
 *   backgroundImage="/images/hero/church-interior.jpg"
 *   height="medium"
 * />
 */
export default function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
  pageName,
  height = 'medium',
  overlay = 'medium',
  textAlign = 'center',
  className,
  actions,
  insideLazyMotion = false
}: PageHeroProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [autoPageName, setAutoPageName] = useState<string | null>(null)
  
  // Select motion component type based on LazyMotion context
  const MotionDiv = insideLazyMotion ? m.div : m.div
  
  // Auto-detect page name from URL if not provided
  useEffect(() => {
    if (typeof window !== 'undefined' && !pageName && !backgroundImage) {
      const pathname = window.location.pathname
      const detected = pathname === '/' ? 'home' : pathname.slice(1).replace(/\//g, '-')
      setAutoPageName(detected)
    }
  }, [pageName, backgroundImage])
  
  // Get CMS page image using provided pageName or auto-detected name
  const effectivePageName = pageName || autoPageName
  const cmsPageImage = effectivePageName ? getPageImage(effectivePageName) : null
  
  // Determine final image and alt text
  // Priority: explicit backgroundImage > CMS image > fallback image
  const heroImage = backgroundImage || cmsPageImage?.url || '/images/pexels-pixabay-248199.jpg'
  const heroAlt = cmsPageImage?.alt || `${title} - St Saviour's Catholic Church`

  useEffect(() => {
    setReducedMotion(prefersReducedMotion())
  }, [])

  // Height classes
  const heightClasses = {
    small: 'h-64 lg:h-80',
    medium: 'h-80 lg:h-96', 
    large: 'h-96 lg:h-[32rem]',
    full: 'h-screen'
  }

  // Overlay classes with slate-900 to match design system
  const overlayClasses = {
    light: 'bg-slate-900/40',
    medium: 'bg-slate-900/60',
    dark: 'bg-slate-900/80'
  }

  // Text alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <section className={cn(
      'relative overflow-hidden',
      heightClasses[height],
      className
    )}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          priority
        />
      </div>

      {/* Overlay with consistent slate-900 color */}
      <div className={cn('absolute inset-0', overlayClasses[overlay])} />

      {/* Subtle texture overlay (matching homepage) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(248,245,242,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className={cn(
          'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
          alignmentClasses[textAlign]
        )}>
          <MotionDiv
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }
            className="space-y-6"
          >
            {/* Subtitle with gold accent lines */}
            {subtitle && (
              <MotionDiv
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion 
                  ? { duration: 0.3 }
                  : { duration: 0.6, delay: 0.2 }
                }
                className="inline-flex items-center space-x-3"
              >
                <div className="w-12 h-px bg-gold-500" />
                <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">
                  {subtitle}
                </span>
                <div className="w-12 h-px bg-gold-500" />
              </MotionDiv>
            )}

            {/* Main title */}
            <MotionDiv
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reducedMotion 
                ? { duration: 0.3 }
                : { duration: 0.8, delay: 0.3 }
              }
            >
              <Heading 
                level="h1" 
                color="white"
                align={textAlign}
                className="text-4xl lg:text-6xl leading-tight"
              >
                {title}
              </Heading>
            </MotionDiv>

            {/* Description */}
            {description && (
              <MotionDiv
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion 
                  ? { duration: 0.3 }
                  : { duration: 0.8, delay: 0.5 }
                }
              >
                <Text 
                  size="xl"
                  color="white"
                  align={textAlign}
                  className="lg:text-2xl max-w-4xl mx-auto opacity-90"
                >
                  {description}
                </Text>
              </MotionDiv>
            )}

            {/* Action buttons */}
            {actions && (
              <MotionDiv
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion 
                  ? { duration: 0.3 }
                  : { duration: 0.8, delay: 0.7 }
                }
                className={cn(
                  'pt-4',
                  textAlign === 'center' && 'flex justify-center',
                  textAlign === 'right' && 'flex justify-end'
                )}
              >
                {actions}
              </MotionDiv>
            )}
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}