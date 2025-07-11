/**
 * Scripture Card Component with Magic UI styling
 * Implements 2025 research recommendations for spiritual content presentation
 */
import React from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { Motion } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'

interface ScriptureCardProps {
  title: string
  content: string
  verse?: string
  icon?: React.ComponentType<any>
  delay?: number
  reducedMotion?: boolean
  variant?: 'default' | 'mission' | 'blessing'
}

export function ScriptureCard({ 
  title, 
  content, 
  verse,
  icon: Icon,
  delay = 0,
  reducedMotion = false,
  variant = 'default'
}: ScriptureCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  // Reverent reveal animation with React Spring
  const cardSpring = useSpring({
    from: { 
      opacity: 0, 
      transform: 'translateY(40px) scale(0.95)' 
    },
    to: { 
      opacity: inView ? 1 : 0, 
      transform: inView ? 'translateY(0px) scale(1)' : 'translateY(40px) scale(0.95)' 
    },
    delay: delay,
    config: reducedMotion ? config.default : config.gentle
  })

  // Floating animation for mission variant
  const floatSpring = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      if (reducedMotion || variant !== 'mission') return
      
      while (true) {
        await next({ transform: 'translateY(-10px)' })
        await next({ transform: 'translateY(0px)' })
      }
    },
    config: { tension: 120, friction: 14, duration: 4000 }
  })

  // Gold accent animation
  const accentSpring = useSpring({
    from: { scaleX: 0 },
    to: { scaleX: inView ? 1 : 0 },
    delay: delay + 400,
    config: reducedMotion ? config.default : config.molasses
  })

  const getVariantStyles = () => {
    switch (variant) {
      case 'mission':
        return {
          background: 'bg-gradient-to-br from-navy-900/90 via-navy-800/90 to-navy-900/90',
          border: 'border-2 border-gold-700/30',
          textStyle: typographyScale.quote,
          iconSize: 'w-12 h-12',
          padding: 'p-8 lg:p-12'
        }
      case 'blessing':
        return {
          background: 'bg-white/5',
          border: 'border border-white/20',
          textStyle: typographyScale.blessing,
          iconSize: 'w-10 h-10',
          padding: 'p-6 lg:p-8'
        }
      default:
        return {
          background: 'bg-white/10',
          border: 'border border-slate-600',
          textStyle: typographyScale.body,
          iconSize: 'w-8 h-8',
          padding: 'p-6'
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <animated.div ref={ref} style={cardSpring}>
      <animated.div style={variant === 'mission' ? floatSpring : {}}>
        <Motion.div
          className={`
            ${styles.background} 
            ${styles.border} 
            ${styles.padding}
            backdrop-blur-sm rounded-2xl 
            hover:border-gold-500/50 
            transition-all duration-500 
            group relative overflow-hidden
            shadow-2xl hover:shadow-gold-500/20
          `}
          whileHover={reducedMotion ? {} : { y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Golden glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 space-y-6">
            {/* Icon and Title */}
            {(Icon || title) && (
              <div className="flex items-center gap-4 mb-6">
                {Icon && (
                  <Motion.div 
                    className={`${styles.iconSize} bg-gold-700/20 rounded-xl flex items-center justify-center flex-shrink-0`}
                    whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-6 w-6 text-gold-400" />
                  </Motion.div>
                )}
                
                {title && (
                  <h3 className={`${typographyScale.h3} text-white flex-1 relative`}>
                    {title}
                    {/* Gold accent line */}
                    <animated.div
                      style={{ ...accentSpring, width: '60px' }}
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                    />
                  </h3>
                )}
              </div>
            )}

            {/* Main Content */}
            <div className={`${styles.textStyle} text-gray-100 leading-relaxed`}>
              {content}
            </div>

            {/* Scripture Reference */}
            {verse && (
              <Motion.div
                className="pt-4 border-t border-gold-700/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className={`${typographyScale.caption} text-gold-300 italic text-center`}>
                  — {verse}
                </p>
              </Motion.div>
            )}
          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold-700/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gold-700/10 to-transparent rounded-tr-full" />
        </Motion.div>
      </animated.div>
    </animated.div>
  )
}

export default ScriptureCard