/**
 * Enhanced Timeline Component with GSAP and ScrollTrigger
 * Implements 2025 research recommendations for church history presentation
 */
import React, { useEffect, useRef } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
// Dynamic GSAP import for SSR compatibility
//
import { m } from 'framer-motion'
import { typographyScale } from '@/lib/fonts'
// PhotoSwipe dependency removed - handled by parent wrapper component

// GSAP will be loaded dynamically in useEffect

interface TimelineEvent {
  year: string
  title: string
  event: string
  icon: React.ComponentType<any>
  image: string
  side: 'left' | 'right'
}

interface EnhancedTimelineProps {
  events: TimelineEvent[]
  reducedMotion?: boolean
}

function TimelineNode({ event, index, reducedMotion }: { 
  event: TimelineEvent
  index: number
  reducedMotion?: boolean 
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  // Node animation with React Spring
  const nodeSpring = useSpring({
    from: { 
      scale: 0,
      rotate: -180,
      opacity: 0 
    },
    to: { 
      scale: inView ? 1 : 0,
      rotate: inView ? 0 : -180,
      opacity: inView ? 1 : 0 
    },
    delay: index * 100,
    config: reducedMotion ? config.default : config.wobbly
  })

  // GSAP religious symbol morphing effect
  useEffect(() => {
    if (!nodeRef.current || reducedMotion) return

    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        
        const tl = gsap.timeline({ paused: true })
        tl.to(nodeRef.current, {
          rotationY: 360,
          scale: 1.2,
          duration: 0.6,
          ease: "power2.out"
        })
        .to(nodeRef.current, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        })

        const handleHover = () => tl.restart()
        nodeRef.current?.addEventListener('mouseenter', handleHover)

        return () => {
          nodeRef.current?.removeEventListener('mouseenter', handleHover)
          tl.kill()
        }
      } catch (error) {
        console.log('GSAP not available')
      }
    }

    loadGSAP()
  }, [reducedMotion])

  return (
    <animated.div
      ref={ref}
      style={nodeSpring}
      className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-navy-900 rounded-full border-4 border-gold-700 flex items-center justify-center z-10 shadow-2xl cursor-pointer"
    >
      <div ref={nodeRef}>
        <event.icon className="h-8 w-8 text-gold-700" />
      </div>
    </animated.div>
  )
}

function TimelineContent({ event, index, reducedMotion }: {
  event: TimelineEvent
  index: number
  reducedMotion?: boolean
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  // Content slide animation
  const contentSpring = useSpring({
    from: { 
      opacity: 0,
      transform: event.side === 'left' ? 'translateX(-100px)' : 'translateX(100px)'
    },
    to: { 
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateX(0px)' : (event.side === 'left' ? 'translateX(-100px)' : 'translateX(100px)')
    },
    delay: index * 150,
    config: reducedMotion ? config.default : config.gentle
  })

  // GSAP scroll-triggered parallax effect
  useEffect(() => {
    if (!contentRef.current || reducedMotion) return

    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)
        
        gsap.fromTo(contentRef.current, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      } catch (error) {
        console.log('GSAP ScrollTrigger not available')
      }
    }

    loadGSAP()
  }, [reducedMotion])

  return (
    <animated.div
      ref={ref}
      style={contentSpring}
      className={`${event.side === 'left' ? 'lg:pr-12' : 'lg:pl-12 lg:col-start-2'}`}
    >
      <m.div
        ref={contentRef}
        className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-700 transition-all duration-500 group rounded-2xl overflow-hidden"
        whileHover={reducedMotion ? {} : { scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-8 space-y-6">
          {/* Year Badge with Gold Theme */}
          <m.div
            className="inline-flex items-center gap-4 mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="px-6 py-3 bg-gold-700 text-black rounded-full font-bold text-lg shadow-lg">
              {event.year}
            </span>
          </m.div>

          {/* Title with Professional Typography */}
          <h3 className={`${typographyScale.h3} text-white mb-4 group-hover:text-gold-300 transition-colors duration-300`}>
            {event.title}
          </h3>

          {/* Event Description */}
          <p className={`${typographyScale.body} text-gray-100 leading-relaxed`}>
            {event.event}
          </p>
        </div>
      </m.div>
    </animated.div>
  )
}

function TimelineImage({ event, index, reducedMotion }: {
  event: TimelineEvent
  index: number
  reducedMotion?: boolean
}) {
  const imageRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  // Image reveal animation
  const imageSpring = useSpring({
    from: { 
      opacity: 0,
      scale: 0.8,
      transform: event.side === 'left' ? 'translateX(100px)' : 'translateX(-100px)'
    },
    to: { 
      opacity: inView ? 1 : 0,
      scale: inView ? 1 : 0.8,
      transform: inView ? 'translateX(0px)' : (event.side === 'left' ? 'translateX(100px)' : 'translateX(-100px)')
    },
    delay: index * 200,
    config: reducedMotion ? config.default : config.gentle
  })

  return (
    <animated.div
      ref={ref}
      style={imageSpring}
      className={`${event.side === 'left' ? 'lg:pl-12 lg:col-start-2 lg:row-start-1' : 'lg:pr-12 lg:col-start-1'}`}
    >
      <m.div
        ref={imageRef}
        className="relative h-64 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
        whileHover={reducedMotion ? {} : { scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className={`${typographyScale.caption} text-white font-medium bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm`}>
            {event.year} - {event.title}
          </span>
        </div>
      </m.div>
    </animated.div>
  )
}

export function EnhancedTimeline({ events, reducedMotion = false }: EnhancedTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)

  // GSAP timeline line animation
  useEffect(() => {
    if (!timelineRef.current || reducedMotion) return

    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)
        
        const timelineLine = timelineRef.current?.querySelector('.timeline-line')
        if (!timelineLine) return

        gsap.fromTo(timelineLine,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1
            }
          }
        )
      } catch (error) {
        console.log('GSAP timeline animation not available')
      }
    }

    loadGSAP()
  }, [reducedMotion])

  return (
    <div ref={timelineRef} className="relative max-w-6xl mx-auto">
      {/* Enhanced Timeline Line with Gradient */}
      <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-gold-700 via-gold-600 to-gold-700 rounded-full shadow-lg"></div>
      
      {/* Timeline Events */}
      <div className="space-y-12">
        {events.map((event, index) => (
          <m.div
            key={index}
            className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
              event.side === 'left' ? 'lg:text-right' : 'lg:text-left'
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Timeline Node */}
            <TimelineNode event={event} index={index} reducedMotion={reducedMotion} />

            {/* Content Card */}
            <TimelineContent event={event} index={index} reducedMotion={reducedMotion} />

            {/* Event Image */}
            <TimelineImage event={event} index={index} reducedMotion={reducedMotion} />
          </m.div>
        ))}
      </div>
    </div>
  )
}

export default EnhancedTimeline