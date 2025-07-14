import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, LazyMotion, domAnimation, useScroll, useTransform, m } from 'framer-motion'
import { useSpring, animated, useTrail, useInView } from '@react-spring/web'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)
import { 
  BeakerIcon as Droplets, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  UserGroupIcon as Users, 
  HeartIcon as Heart, 
  ArrowRightIcon as ArrowRight,
  SparklesIcon,
  HandRaisedIcon,
  SunIcon,
  StarIcon 
} from '@heroicons/react/24/solid'

// New modern component system
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Card,
  CardContent,
  Heading, 
  Text, 
  Section,
  Container,
  Grid,
  Flex
} from '@/components/ui'
import { SacramentInfo } from '@/components/church'
import {
  ScriptureCard,
  SocialSharingSystem,
  ProgressIndicator,
  BaptismPreparationTracker,
  SacramentalAnalytics,
  SacramentalPreparationGuide
} from '@/components/enhanced'
import { prefersReducedMotion } from '@/lib/utils'

export default function Baptism() {
  const reducedMotion = prefersReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [waterRipples, setWaterRipples] = useState<Array<{ id: number; x: number; y: number }>>([]) 
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])
  
  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!reducedMotion) {
        setMousePosition({
          x: (e.clientX - window.innerWidth / 2) * 0.005,
          y: (e.clientY - window.innerHeight / 2) * 0.005
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reducedMotion])
  
  // Simulated water ripple effects
  useEffect(() => {
    const generateRipple = () => {
      const newRipple = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100
      }
      setWaterRipples(prev => [...prev.slice(-4), newRipple])
    }
    
    const interval = setInterval(generateRipple, 3000)
    return () => clearInterval(interval)
  }, [])
  
  // React Spring animations for baptism effects
  const [effectsRef, effectsInView] = useInView()
  const effectsTrail = useTrail(baptismEffects.length, {
    opacity: effectsInView ? 1 : 0,
    transform: effectsInView ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.95)',
    config: { tension: 200, friction: 25 },
    delay: (i) => i * 150
  })
  
  // Enhanced hero animation with baptismal symbolism
  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 30 },
    delay: 200
  })
  
  // Enhanced performance monitoring for sacramental content - Phase C
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('Baptism page load time:', entry.duration)
          // Track sacramental page performance
          if (entry.duration > 3000) {
            console.warn('Baptism page slow load detected:', entry.duration)
          }
        }
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
          // Enhanced LCP tracking for baptismal content
          if (entry.startTime > 2500) {
            console.warn('Baptism page LCP threshold exceeded:', entry.startTime)
          }
        }
        if (entry.entryType === 'first-input-delay') {
          console.log('FID:', entry.processingStart - entry.startTime)
        }
        if (entry.entryType === 'cumulative-layout-shift') {
          console.log('CLS:', entry.value)
        }
      }
    })
    
    observer.observe({ 
      entryTypes: ['navigation', 'largest-contentful-paint', 'first-input-delay', 'layout-shift'] 
    })
    return () => observer.disconnect()
  }, [])

  // Enhanced keyboard navigation for baptism preparation - Phase C
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Quick navigation to preparation sections
      if (e.altKey && e.key === 'p') {
        e.preventDefault()
        const preparationSection = document.getElementById('baptism-preparation')
        if (preparationSection) {
          preparationSection.scrollIntoView({ behavior: 'smooth' })
          preparationSection.focus()
        }
      }
      
      // Quick navigation to analytics
      if (e.altKey && e.key === 'a') {
        e.preventDefault()
        const analyticsSection = document.getElementById('baptism-analytics')
        if (analyticsSection) {
          analyticsSection.scrollIntoView({ behavior: 'smooth' })
          analyticsSection.focus()
        }
      }
      
      // Quick navigation to contact
      if (e.altKey && e.key === 'c') {
        e.preventDefault()
        const contactSection = document.getElementById('baptism-contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
          contactSection.focus()
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const baptismContent = [
    "Baptism is the first and chief sacrament of forgiveness of sins because it unites us with Christ, who died for our sins and rose for our justification. Through Baptism we are freed from sin and reborn as children of God.",
    "In this sacrament, we are cleansed of original sin, become members of the Church, and are called to live as disciples of Jesus Christ. Baptism is necessary for salvation and is the foundation of our Christian life."
  ]

  const baptismEffects = [
    {
      title: "Forgiveness of Sin",
      description: "Original sin and all personal sins are completely washed away"
    },
    {
      title: "Becomes Child of God",
      description: "We are adopted as children of God and heirs to eternal life"
    },
    {
      title: "Member of the Church",
      description: "Incorporated into the Body of Christ and the Catholic Church"
    },
    {
      title: "Receives Grace",
      description: "Sanctifying grace fills the soul and makes us temples of the Holy Spirit"
    },
    {
      title: "Marked Forever",
      description: "An indelible spiritual mark is placed on the soul that lasts for eternity"
    }
  ]

  const baptismRequirements = [
    {
      title: "Infant Baptism",
      items: [
        "Parents must be registered parishioners",
        "Complete baptism preparation course",
        "Provide birth certificate",
        "Choose suitable godparents",
        "Schedule baptism appointment"
      ]
    },
    {
      title: "Adult Baptism",
      items: [
        "Complete RCIA program",
        "Attend weekly sessions for 6-12 months",
        "Choose a sponsor/godparent",
        "Participate in scrutinies during Lent",
        "Receive at Easter Vigil"
      ]
    },
    {
      title: "Godparent Requirements",
      items: [
        "Must be a practicing Catholic",
        "At least 16 years of age",
        "Have received Confirmation",
        "Not the parent of the child",
        "Live an exemplary Catholic life"
      ]
    }
  ]

  const contactInfo = {
    title: "Ready to Begin?",
    description: "Contact us to start your baptism preparation or to schedule an infant baptism. We're here to guide you through this sacred journey.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit",
    source: "Matthew 28:19"
  }

  return (
    <PageLayout
      title="Baptism"
      description="Learn about the sacrament of Baptism at St Saviour's Catholic Church. Information on infant baptism, adult baptism, and preparation classes."
      keywords="Catholic Baptism, Infant Baptism, Adult Baptism, Christening, RCIA, Baptism Preparation, Lewisham"
    >
      {/* Screen Reader Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        role="status"
      />
      
      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
        <a 
          href="#main-content" 
          className="bg-gold-500 text-slate-900 px-4 py-2 rounded font-medium"
        >
          Skip to main content
        </a>
      </div>
      
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
      {/* Enhanced Hero Section with Water Symbolism */}
      <LazyMotion features={domAnimation}>
        <section 
          className="relative overflow-hidden"
          role="banner"
          aria-labelledby="baptism-hero-heading"
        >
          <m.div 
            style={{ y, opacity }}
            className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800"
            aria-hidden="true"
          />
          
          {/* Animated baptismal elements */}
          <m.div
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
          >
            <Droplets className="absolute top-1/4 left-1/4 h-8 w-8 text-blue-400" />
            <SparklesIcon className="absolute top-1/3 right-1/3 h-6 w-6 text-gold-300" />
            <HandRaisedIcon className="absolute bottom-1/4 left-1/3 h-7 w-7 text-blue-500" />
            <SunIcon className="absolute top-1/2 right-1/4 h-5 w-5 text-gold-400" />
          </m.div>
          
          {/* Water ripple effects */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {waterRipples.map((ripple) => (
              <m.div
                key={ripple.id}
                className="absolute w-32 h-32 border-2 border-blue-400/30 rounded-full"
                style={{
                  left: `${ripple.x}%`,
                  top: `${ripple.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
              />
            ))}
          </div>
          
          <animated.div style={heroSpring}>
            <PageHero
              title="Baptism"
              subtitle="The Sacrament of New Life"
              description="The gateway to life in the Spirit and the door which gives access to the other sacraments."
              backgroundImage="/images/candles.jpg"
              height="large"
              overlay="medium"
              insideLazyMotion={true}
              actions={
                <Flex justify="center" gap="md" role="group" aria-label="Baptism actions">
                  <m.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button 
                      variant="primary" 
                      size="lg"
                      leftIcon={<Calendar className="h-5 w-5" aria-hidden="true" />}
                      className="bg-white text-slate-900 hover:bg-gray-100"
                      aria-describedby="baptism-journey-help"
                    >
                      Start Your Baptism Journey
                    </Button>
                    <span id="baptism-journey-help" className="sr-only">
                      Begin the process of baptism preparation and scheduling
                    </span>
                  </m.div>
                </Flex>
              }
            />
          </animated.div>
        </section>
      </LazyMotion>

      {/* Enhanced Sacrament Information with Animations */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SacramentInfo
              icon={Droplets}
              title="Born Again in Christ"
              subtitle="The first and chief sacrament of forgiveness of sins"
              content={baptismContent}
              quote={quote}
              effects={baptismEffects}
              requirements={baptismRequirements}
              effectsColor="blue"
              theme="dark"
            />
          </motion.div>
          
          {/* Enhanced Effects Display with React Spring */}
          <div ref={effectsRef} className="mt-16 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Heading level="h3" color="white" className="text-2xl font-bold mb-8">
                Effects of Baptism
              </Heading>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {effectsTrail.map((style, index) => {
                const effect = baptismEffects[index]
                if (!effect) return null
                
                return (
                  <animated.div
                    key={effect.title}
                    style={style}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-blue-600/30 hover:border-blue-400 transition-all duration-300 h-full">
                        <CardContent>
                          <div className="space-y-4 text-center">
                            <motion.div
                              className="w-12 h-12 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center"
                              whileHover={{ 
                                rotate: [0, 10, -10, 0],
                                scale: 1.1
                              }}
                              transition={{ duration: 0.6 }}
                            >
                              <Droplets className="h-6 w-6 text-blue-400" />
                            </motion.div>
                            <Heading level="h4" color="white" className="font-semibold">
                              {effect.title}
                            </Heading>
                            <Text size="sm" className="text-blue-200">
                              {effect.description}
                            </Text>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </animated.div>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="flex justify-center py-20 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '1px', boxShadow: '0 0 1px rgba(255,255,255,0.5)' }}></div>
      </div>

      {/* Baptism Preparation Tracker - Phase B & D Enhancement */}
      <Section spacing="lg" background="slate" id="baptism-preparation" tabIndex={-1}>
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <BaptismPreparationTracker baptismType="infant" />
              <BaptismPreparationTracker baptismType="adult" />
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Sacramental Analytics Dashboard - Phase B Enhancement */}
      <Section spacing="lg" background="slate" id="baptism-analytics" tabIndex={-1}>
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SacramentalAnalytics sacramentType="baptism" />
          </motion.div>
        </Container>
      </Section>

      {/* Scripture Card - Phase D Enhancement */}
      <Section spacing="sm" background="slate">
        <Container size="md">
          <ScriptureCard 
            theme="baptism"
            reference="Romans 6:3-4"
            text="Do you not know that all of us who have been baptised into Christ Jesus were baptised into his death? We were buried therefore with him by baptism into death, in order that, just as Christ was raised from the dead by the glory of the Father, we too might walk in newness of life."
            reflection="Through baptism, we die to sin and are raised to new life in Christ, becoming children of God and members of his Church."
          />
        </Container>
      </Section>

      {/* Comprehensive Preparation Guide - Phase B & D Enhancement */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-12">
              <div className="text-center">
                <Heading level="h2" color="white" className="text-3xl font-bold mb-4">
                  Complete Preparation Guide
                </Heading>
                <Text className="text-gray-300 max-w-3xl mx-auto">
                  Follow our comprehensive step-by-step guide for both infant and adult baptism preparation
                </Text>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SacramentalPreparationGuide sacramentType="baptism" participantType="infant" />
                <SacramentalPreparationGuide sacramentType="baptism" participantType="adult" />
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Social Sharing System - Phase B Enhancement */}
      <Section spacing="md" background="slate">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <SocialSharingSystem 
              pageTitle="Baptism - The Sacrament of New Life | St Saviour's Catholic Church"
              pageUrl="https://stsaviourlewisham.org.uk/the-sacraments/baptism"
              description="Learn about the sacrament of Baptism at St Saviour's Catholic Church. Complete preparation guides for infant and adult baptism."
            />
          </motion.div>
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="flex justify-center py-20 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '1px', boxShadow: '0 0 1px rgba(255,255,255,0.5)' }}></div>
      </div>

      {/* Call to Action */}
      <Section spacing="lg" background="slate" id="baptism-contact" tabIndex={-1}>
        <Container size="md">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Heading level="h2" className="text-3xl font-light text-white text-center">
                  Begin Your Journey of Faith
                </Heading>
                <div className="flex justify-center">
                  <motion.div
                    className="w-32 h-1 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                    initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                    whileInView={reducedMotion ? { opacity: 1 } : { width: 128 }}
                    transition={reducedMotion 
                      ? { duration: 0.3 }
                      : { duration: 1, delay: 0.3 }
                    }
                    viewport={{ once: true }}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                  Ready to take the next step? Contact us to begin your baptism preparation 
                  or learn more about this sacred sacrament.
                </Text>
                <Flex justify="center" gap="lg" wrap>
                  <a href="tel:020 8852 7411">
                    <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                      📞 020 8852 7411
                    </Text>
                  </a>
                  <a href="mailto:info@stsaviourslewisham.org.uk">
                    <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                      ✉️ info@stsaviourslewisham.org.uk
                    </Text>
                  </a>
                </Flex>
              </div>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Link href="/contact-us">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Phone className="h-5 w-5" />}
                  className="bg-white text-slate-900 hover:bg-gray-100"
                >
                  Contact Us to Begin
                </Button>
              </Link>
            </Flex>
          </div>
        </Container>
      </Section>

      {/* Progress Indicator - Phase C Enhancement */}
      <ProgressIndicator />
      </main>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'