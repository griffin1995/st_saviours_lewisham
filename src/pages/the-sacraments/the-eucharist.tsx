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
  CircleStackIcon as Cookie, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  UserGroupIcon as Users, 
  HeartIcon as Heart, 
  ArrowRightIcon as ArrowRight,
  SunIcon,
  SparklesIcon,
  HandRaisedIcon,
  StarIcon,
  GlobeAltIcon,
  CubeIcon,
  BeakerIcon
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
// ScriptureCard consolidated into shared component
// import { ScriptureCard } from '@/components/enhanced/ScriptureCard'
import { SacramentalScriptureSection } from '@/components/shared/content'
import { SocialSharingSystem } from '@/components/enhanced/SocialSharingSystem'
import { ProgressIndicator } from '@/components/enhanced/ProgressIndicator'
// import { SacramentalAnalytics } from '@/components/enhanced/SacramentalAnalytics'
// import { SacramentalPreparationGuide } from '@/components/enhanced/SacramentalPreparationGuide'
// import { FirstCommunionTracker } from '@/components/enhanced/FirstCommunionTracker'
// import { MassPartsExplainer } from '@/components/enhanced/MassPartsExplainer'
import { prefersReducedMotion } from '@/lib/utils'
// CMS DATA SOURCE: Import sacrament image functions
import { getSacramentImage } from '@/lib/cms-images'
// CMS DATA SOURCE: Import contact information functions
import { getContactPhone, getContactEmail } from '@/lib/cms-content'

export default function TheEucharist() {
  const reducedMotion = prefersReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // CMS DATA SOURCE: Get eucharist sacrament image
  const eucharistImage = getSacramentImage('eucharist')
  const [eucharisticParticles, setEucharisticParticles] = useState<Array<{ id: number; x: number; y: number; type: 'host' | 'chalice' }>>([])
  const [consecrationMoments, setConsecrationMoments] = useState<Array<{ id: number; visible: boolean; element: string }>>([])
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])
  
  // Mouse tracking for parallax effects with Eucharistic symbolism
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
  
  // Simulated Eucharistic particle effects (hosts and chalice symbols)
  useEffect(() => {
    const generateEucharisticParticle = () => {
      const newParticle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: Math.random() > 0.5 ? 'host' : 'chalice' as 'host' | 'chalice'
      }
      setEucharisticParticles(prev => [...prev.slice(-5), newParticle])
    }
    
    const interval = setInterval(generateEucharisticParticle, 3000)
    return () => clearInterval(interval)
  }, [])
  
  // Consecration moments animation
  useEffect(() => {
    const elements = ['bread', 'wine', 'host', 'chalice', 'communion']
    const momentStates = elements.map((element, index) => ({
      id: index,
      element,
      visible: false
    }))
    setConsecrationMoments(momentStates)
    
    // Gradually reveal consecration elements
    elements.forEach((_, index) => {
      setTimeout(() => {
        setConsecrationMoments(prev => prev.map(m => 
          m.id === index ? { ...m, visible: true } : m
        ))
      }, (index + 1) * 1500)
    })
  }, [])
  
  // Enhanced performance monitoring for Eucharistic content
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('Eucharist page load time:', entry.duration)
          if (entry.duration > 3000) {
            console.warn('Eucharist page slow load detected:', entry.duration)
          }
        }
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
          if (entry.startTime > 2500) {
            console.warn('Eucharist page LCP threshold exceeded:', entry.startTime)
          }
        }
        if (entry.entryType === 'first-input-delay') {
          console.log('FID:', entry.startTime)
        }
        if (entry.entryType === 'cumulative-layout-shift') {
          console.log('CLS:', (entry as any).value)
        }
      }
    })
    
    observer.observe({ 
      entryTypes: ['navigation', 'largest-contentful-paint', 'first-input-delay', 'layout-shift'] 
    })
    return () => observer.disconnect()
  }, [])

  // Enhanced keyboard navigation for Eucharistic sections
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Quick navigation to Mass section
      if (e.altKey && e.key === 'm') {
        e.preventDefault()
        const massSection = document.getElementById('eucharist-mass')
        if (massSection) {
          massSection.scrollIntoView({ behavior: 'smooth' })
          massSection.focus()
        }
      }
      
      // Quick navigation to communion preparation
      if (e.altKey && e.key === 'c') {
        e.preventDefault()
        const communionSection = document.getElementById('communion-preparation')
        if (communionSection) {
          communionSection.scrollIntoView({ behavior: 'smooth' })
          communionSection.focus()
        }
      }
      
      // Quick navigation to contact
      if (e.altKey && e.key === 'j') {
        e.preventDefault()
        const contactSection = document.getElementById('eucharist-contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
          contactSection.focus()
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const eucharistContent = [
    "The Eucharist is the source and summit of the Christian life. In this most blessed sacrament, Jesus Christ is truly present—body, blood, soul, and divinity—under the appearances of bread and wine.",
    "Through the Eucharist, we are intimately united with Christ and nourished for our journey of faith. It is both a sacrifice and a sacred meal, making present the one sacrifice of Christ on Calvary and feeding us with the Bread of Life."
  ]

  const eucharistEffects = [
    {
      title: "Union with Christ",
      description: "We become one with Jesus in the most intimate way possible"
    },
    {
      title: "Spiritual Nourishment",
      description: "Our souls are fed with the true food that leads to eternal life"
    },
    {
      title: "Forgiveness of Venial Sins",
      description: "Daily faults are cleansed and we are strengthened against temptation"
    },
    {
      title: "Unity with the Church",
      description: "We are bound together as one body in Christ with all believers"
    },
    {
      title: "Pledge of Glory",
      description: "We receive a foretaste of the heavenly banquet to come"
    }
  ]

  const eucharistRequirements = [
    {
      title: "First Holy Communion",
      items: [
        "Must be baptized Catholic",
        "Complete 2-year preparation program",
        "Usually received around age 7-8",
        "Understand the Real Presence of Christ",
        "Participate in practice sessions"
      ]
    },
    {
      title: "State of Grace",
      items: [
        "Free from mortal sin",
        "Receive confession if needed",
        "Proper intention and reverence",
        "Faith in the Real Presence",
        "Desire to receive Christ"
      ]
    },
    {
      title: "Eucharistic Fast",
      items: [
        "One hour fast from food and drink",
        "Water and medicine permitted",
        "Shorter fast for elderly and sick",
        "Spiritual preparation recommended",
        "Arrive early for quiet prayer"
      ]
    }
  ]

  const contactInfo = {
    title: "Join Us for Mass",
    description: "Experience the beauty and mystery of the Eucharist at St Saviour's. All are welcome to join us for Mass and encounter Christ in the Blessed Sacrament.",
    phone: getContactPhone(),
    email: getContactEmail()
  }

  const quote = {
    text: "Take this, all of you, and eat of it, for this is my body, which will be given up for you",
    source: "Jesus at the Last Supper"
  }

  // React Spring animations for Eucharistic effects
  const [effectsRef, effectsInView] = useInView()
  const effectsTrail = useTrail(eucharistEffects.length, {
    opacity: effectsInView ? 1 : 0,
    transform: effectsInView ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.95)',
    config: { tension: 200, friction: 25 }
  })
  
  // React Spring animations for Eucharistic effects (second set)
  const [eucharistEffectsRef, eucharistEffectsInView] = useInView()
  const eucharistEffectsTrail = useTrail(eucharistEffects.length, {
    opacity: eucharistEffectsInView ? 1 : 0,
    transform: eucharistEffectsInView ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.95)',
    config: { tension: 200, friction: 25 }
  })
  
  // Enhanced hero animation with Eucharistic symbolism
  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 30 },
    delay: 200
  })

  return (
    <PageLayout
      title="The Eucharist"
      description="Learn about the Eucharist, the source and summit of Christian life at St Saviour's Catholic Church. Information on Holy Communion and Mass times."
      keywords="Catholic Eucharist, Holy Communion, Mass, Real Presence, Transubstantiation, First Communion, Body of Christ"
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
      {/* Enhanced Hero Section with Eucharistic Symbolism */}
        <section 
          className="relative overflow-hidden"
          role="banner"
          aria-labelledby="eucharist-hero-heading"
        >
          <m.div 
            style={{ y, opacity }}
            className="absolute inset-0 bg-gradient-to-br from-amber-900 via-slate-900 to-gold-800"
            aria-hidden="true"
          />
          
          {/* Animated Eucharistic elements */}
          <m.div
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
          >
            <Cookie className="absolute top-1/4 left-1/4 h-8 w-8 text-amber-400" />
            <SparklesIcon className="absolute top-1/3 right-1/3 h-6 w-6 text-gold-300" />
            <HandRaisedIcon className="absolute bottom-1/4 left-1/3 h-7 w-7 text-amber-500" />
            <SunIcon className="absolute top-1/2 right-1/4 h-5 w-5 text-gold-400" />
            <BeakerIcon className="absolute bottom-1/3 right-1/3 h-6 w-6 text-amber-300" />
          </m.div>
          
          {/* Eucharistic particle effects */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {eucharisticParticles.map((particle) => (
              <m.div
                key={particle.id}
                className={`absolute w-20 h-20 border-2 rounded-full ${
                  particle.type === 'host' 
                    ? 'border-amber-400/30' 
                    : 'border-gold-400/30'
                }`}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 4, ease: "easeOut" }}
              />
            ))}
          </div>
          
          <animated.div style={heroSpring}>
            <PageHero
              title="The Holy Eucharist"
              subtitle="Source and Summit of Christian Life"
              description="The Eucharist is the Body and Blood of Christ, truly present under the appearances of bread and wine."
              backgroundImage={eucharistImage?.url}
              height="large"
              overlay="medium"
              insideLazyMotion={true}
              actions={
                <Flex justify="center" gap="md" role="group" aria-label="Eucharist actions">
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
                      aria-describedby="mass-help"
                    >
                      Join Us for Mass
                    </Button>
                    <span id="mass-help" className="sr-only">
                      View Mass times and join us for the celebration of the Eucharist
                    </span>
                  </m.div>
                </Flex>
              }
            />
          </animated.div>
        </section>
      

      {/* Sacrament Information */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <SacramentInfo
            icon={Cookie}
            title="The Bread of Life"
            subtitle="The source and summit of the Christian life"
            content={eucharistContent}
            quote={quote}
            effects={eucharistEffects}
            requirements={eucharistRequirements}
            effectsColor="amber"
            theme="dark"
          />
        </Container>
      </Section>


      {/* Section Divider */}
      <div className="flex justify-center py-16 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '0.5px' }}></div>
      </div>

      {/* Interactive Mass Parts Explorer - Phase B & D Enhancement */}
      <Section spacing="lg" background="slate" id="eucharist-mass" tabIndex={-1}>
        <Container size="lg">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* <MassPartsExplainer /> */}
          </m.div>
        </Container>
      </Section>

      {/* Enhanced Effects Display with React Spring */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <div ref={effectsRef} className="space-y-8">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Heading level="h3" color="white" className="text-2xl font-bold mb-8">
                Effects of the Eucharist
              </Heading>
            </m.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {effectsTrail.map((style, index) => {
                const effect = eucharistEffects[index]
                if (!effect) return null
                
                return (
                  <animated.div
                    key={effect.title}
                    style={style}
                    className="group"
                  >
                    <m.div
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-amber-600/30 hover:border-amber-400 transition-all duration-300 h-full">
                        <CardContent>
                          <div className="space-y-4 text-center">
                            <m.div
                              className="w-12 h-12 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center"
                              whileHover={{ 
                                rotate: [0, 10, -10, 0],
                                scale: 1.1
                              }}
                              transition={{ duration: 0.6 }}
                            >
                              <Cookie className="h-6 w-6 text-amber-400" />
                            </m.div>
                            <Heading level="h4" color="white" className="font-semibold">
                              {effect.title}
                            </Heading>
                            <Text size="sm" className="text-amber-200">
                              {effect.description}
                            </Text>
                          </div>
                        </CardContent>
                      </Card>
                    </m.div>
                  </animated.div>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="flex justify-center pt-16 pb-8">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '0.5px' }}></div>
      </div>

      {/* First Communion Preparation Programs - Enhanced */}
      <Section spacing="lg" background="slate" id="communion-preparation" tabIndex={-1}>
        <Container size="lg">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="text-center">
              <Heading level="h2" color="white" className="text-3xl font-bold mb-4">
                First Communion Preparation Programs
              </Heading>
              <Text className="text-gray-300 max-w-3xl mx-auto">
                Whether preparing a child or an adult for First Communion, we offer comprehensive 
                preparation programs to help understand and appreciate the beauty of the Eucharist.
              </Text>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* <FirstCommunionTracker participantType="child" />
              <FirstCommunionTracker participantType="adult" /> */}
            </div>
          </m.div>
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="flex justify-center py-20 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '1px', boxShadow: '0 0 1px rgba(255,255,255,0.5)' }}></div>
      </div>

      {/* Eucharistic Analytics Dashboard - Phase B Enhancement */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* <SacramentalAnalytics sacramentType="eucharist" /> */}
          </m.div>
        </Container>
      </Section>

      {/* Scripture Card - Phase D Enhancement */}
      <Section spacing="sm" background="slate">
        <Container size="md">
          <SacramentalScriptureSection
            pageTheme="eucharist"
            reducedMotion={reducedMotion}
          />
        </Container>
      </Section>

      {/* Comprehensive Preparation Guide - Phase B & D Enhancement */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <m.div
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
                  Follow our comprehensive step-by-step guide for both child and adult First Communion preparation
                </Text>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* <SacramentalPreparationGuide sacramentType="eucharist" participantType="child" />
                <SacramentalPreparationGuide sacramentType="eucharist" participantType="adult" /> */}
              </div>
            </div>
          </m.div>
        </Container>
      </Section>

      {/* Social Sharing System - Phase B Enhancement */}
      <Section spacing="md" background="slate">
        <Container size="md">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <SocialSharingSystem 
              articleId="eucharist-sacrament"
              title="The Eucharist - Source and Summit of Christian Life | St Saviour's Catholic Church"
              url="https://stsaviourlewisham.org.uk/the-sacraments/the-eucharist"
            />
          </m.div>
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="flex justify-center py-20 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '1px', boxShadow: '0 0 1px rgba(255,255,255,0.5)' }}></div>
      </div>

      {/* Call to Action */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Heading level="h2" className="text-3xl font-light text-white text-center">
                  Come to the Table of the Lord
                </Heading>
                <div className="flex justify-center">
                  <m.div
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
                  The Eucharist is the greatest gift Christ has given us. Join us for Mass 
                  and experience the profound mystery of God's love in Holy Communion.
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
            
            <Link href="/mass">
              <Button 
                variant="primary" 
                size="lg"
                leftIcon={<Calendar className="h-5 w-5" />}
                className="bg-white text-slate-900 hover:bg-gray-100"
              >
                View Mass Times
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Progress Indicator - Phase C Enhancement */}
      <ProgressIndicator 
        sections={['Overview', 'Preparation', 'Mass', 'Community']}
        activeSection={0}
      />
      </main>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'