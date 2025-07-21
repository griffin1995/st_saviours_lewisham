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
  PlusIcon as Cross, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  UserGroupIcon as Users, 
  HeartIcon as Heart, 
  ArrowRightIcon as ArrowRight, 
  GiftIcon as Gift,
  FireIcon,
  SparklesIcon,
  SunIcon,
  StarIcon,
  HandRaisedIcon,
  ShieldCheckIcon,
  AcademicCapIcon
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
// import { ConfirmationPreparationTracker } from '@/components/enhanced/ConfirmationPreparationTracker'
// import { SevenGiftsInteractive } from '@/components/enhanced/SevenGiftsInteractive'
import { prefersReducedMotion } from '@/lib/utils'
// CMS DATA SOURCE: Import sacrament image functions
import { getSacramentImage } from '@/lib/cms-images'
// CMS DATA SOURCE: Import contact information functions
import { getContactPhone, getContactEmail } from '@/lib/cms-content'

export default function Confirmation() {
  const reducedMotion = prefersReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // CMS DATA SOURCE: Get confirmation sacrament image
  const confirmationImage = getSacramentImage('confirmation')
  const [fireParticles, setFireParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [spiritualGifts, setSpiritualGifts] = useState<Array<{ id: number; gift: string; visible: boolean }>>([])
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])
  
  // Mouse tracking for parallax effects with confirmation symbolism
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!reducedMotion) {
        setMousePosition({
          x: (e.clientX - window.innerWidth / 2) * 0.006,
          y: (e.clientY - window.innerHeight / 2) * 0.006
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reducedMotion])
  
  // Simulated fire/spirit effects for confirmation symbolism
  useEffect(() => {
    const generateFireParticle = () => {
      const newParticle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100
      }
      setFireParticles(prev => [...prev.slice(-6), newParticle])
    }
    
    const interval = setInterval(generateFireParticle, 2500)
    return () => clearInterval(interval)
  }, [])
  
  // Spiritual gifts revelation animation
  useEffect(() => {
    const gifts = ['Wisdom', 'Understanding', 'Counsel', 'Fortitude', 'Knowledge', 'Piety', 'Fear of the Lord']
    const giftStates = gifts.map((gift, index) => ({
      id: index,
      gift,
      visible: false
    }))
    setSpiritualGifts(giftStates)
    
    // Gradually reveal gifts
    gifts.forEach((_, index) => {
      setTimeout(() => {
        setSpiritualGifts(prev => prev.map(g => 
          g.id === index ? { ...g, visible: true } : g
        ))
      }, (index + 1) * 1000)
    })
  }, [])
  
  // Enhanced performance monitoring for confirmation content
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('Confirmation page load time:', entry.duration)
          if (entry.duration > 3000) {
            console.warn('Confirmation page slow load detected:', entry.duration)
          }
        }
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
          if (entry.startTime > 2500) {
            console.warn('Confirmation page LCP threshold exceeded:', entry.startTime)
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

  // Enhanced keyboard navigation for confirmation sections
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Quick navigation to gifts section
      if (e.altKey && e.key === 'g') {
        e.preventDefault()
        const giftsSection = document.getElementById('confirmation-gifts')
        if (giftsSection) {
          giftsSection.scrollIntoView({ behavior: 'smooth' })
          giftsSection.focus()
        }
      }
      
      // Quick navigation to preparation programs
      if (e.altKey && e.key === 'p') {
        e.preventDefault()
        const programSection = document.getElementById('confirmation-programs')
        if (programSection) {
          programSection.scrollIntoView({ behavior: 'smooth' })
          programSection.focus()
        }
      }
      
      // Quick navigation to contact
      if (e.altKey && e.key === 'c') {
        e.preventDefault()
        const contactSection = document.getElementById('confirmation-contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
          contactSection.focus()
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const confirmationContent = [
    "Confirmation is a sacrament of initiation that completes what was begun in Baptism. It strengthens us with the gifts of the Holy Spirit and deepens our relationship with Christ and the Church.",
    "Through Confirmation, we receive the fullness of the Holy Spirit and are called to be witnesses to Christ in the world. This sacrament gives us the grace and strength we need to live as mature Christians."
  ]

  const confirmationEffects = [
    {
      title: "Increase in Grace",
      description: "Sanctifying grace is increased and strengthened within the soul"
    },
    {
      title: "Seven Gifts of the Holy Spirit",
      description: "Wisdom, Understanding, Counsel, Fortitude, Knowledge, Piety, and Fear of the Lord"
    },
    {
      title: "Spiritual Maturity",
      description: "Called to take on the responsibilities of adult Christian living"
    },
    {
      title: "Indelible Mark",
      description: "Receives a permanent spiritual seal that can never be removed"
    },
    {
      title: "Missionary Spirit",
      description: "Empowered to spread and defend the faith as a witness to Christ"
    }
  ]

  const confirmationRequirements = [
    {
      title: "Youth Confirmation",
      items: [
        "Must be baptized Catholic",
        "Complete 2-year preparation program",
        "Attend weekly classes from Year 9",
        "Choose a Confirmation name and sponsor",
        "Participate in retreat and service hours"
      ]
    },
    {
      title: "Adult Confirmation",
      items: [
        "Complete RCIA program",
        "Have received Baptism and First Communion",
        "Attend preparation sessions",
        "Choose a suitable sponsor",
        "Receive at Easter Vigil or special ceremony"
      ]
    },
    {
      title: "Sponsor Requirements",
      items: [
        "Must be a confirmed Catholic",
        "At least 16 years of age",
        "Live an exemplary Catholic life",
        "Not the parent of the candidate",
        "Willing to support the candidate's faith journey"
      ]
    }
  ]

  const contactInfo = {
    title: "Ready to be Confirmed?",
    description: "Contact us to begin Confirmation preparation or learn more about this beautiful sacrament. We're here to guide you on your journey of faith.",
    phone: getContactPhone(),
    email: getContactEmail()
  }

  const quote = {
    text: "But you will receive power when the Holy Spirit comes upon you; and you will be my witnesses",
    source: "Acts 1:8"
  }

  // React Spring animations for confirmation effects
  const [giftsRef, giftsInView] = useInView()
  const giftsTrail = useTrail(confirmationEffects.length, {
    opacity: giftsInView ? 1 : 0,
    transform: giftsInView ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.95)',
    config: { tension: 200, friction: 25 }
  })
  
  // Enhanced hero animation with confirmation symbolism
  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 30 },
    delay: 200
  })

  return (
    <PageLayout
      title="Confirmation"
      description="Learn about the sacrament of Confirmation at St Saviour's Catholic Church. Information on preparation, classes, and celebrating this important milestone in faith."
      keywords="Catholic Confirmation, Confirmation Classes, RCIA, Youth Confirmation, Adult Confirmation, Gifts of Holy Spirit"
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
      {/* Enhanced Hero Section with Confirmation Symbolism */}
      
        <section 
          className="relative overflow-hidden"
          role="banner"
          aria-labelledby="confirmation-hero-heading"
        >
          <m.div 
            style={{ y, opacity }}
            className="absolute inset-0 bg-gradient-to-br from-red-900 via-slate-900 to-orange-800"
            aria-hidden="true"
          />
          
          {/* Animated confirmation elements */}
          <m.div
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
          >
            <FireIcon className="absolute top-1/4 left-1/4 h-8 w-8 text-red-400" />
            <SparklesIcon className="absolute top-1/3 right-1/3 h-6 w-6 text-gold-300" />
            <HandRaisedIcon className="absolute bottom-1/4 left-1/3 h-7 w-7 text-red-500" />
            <SunIcon className="absolute top-1/2 right-1/4 h-5 w-5 text-gold-400" />
            <ShieldCheckIcon className="absolute bottom-1/3 right-1/3 h-6 w-6 text-red-300" />
          </m.div>
          
          {/* Fire/Spirit particle effects */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {fireParticles.map((particle) => (
              <m.div
                key={particle.id}
                className="absolute w-16 h-16 border-2 border-red-400/30 rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
            ))}
          </div>
          
          <animated.div style={heroSpring}>
            <PageHero
              title="Confirmation"
              subtitle="Strengthened by the Spirit"
              description="Confirmation completes Christian initiation and strengthens us with the gifts of the Holy Spirit."
              backgroundImage={confirmationImage?.url}
              height="large"
              overlay="medium"
              insideLazyMotion={true}
              actions={
                <Flex justify="center" gap="md" role="group" aria-label="Confirmation actions">
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
                      aria-describedby="preparation-help"
                    >
                      Join Preparation Program
                    </Button>
                    <span id="preparation-help" className="sr-only">
                      Begin the process of confirmation preparation and enrolment
                    </span>
                  </m.div>
                  <m.div
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button 
                      variant="primary" 
                      size="lg"
                      leftIcon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
                      className="bg-white text-slate-900 hover:bg-gray-100"
                      aria-describedby="rcia-help"
                    >
                      Learn About RCIA
                    </Button>
                    <span id="rcia-help" className="sr-only">
                      Learn about the Rite of Christian Initiation for Adults
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
            icon={Cross}
            title="Sealed with the Holy Spirit"
            subtitle="A sacrament of initiation that completes Baptism"
            content={confirmationContent}
            quote={quote}
            effects={confirmationEffects}
            requirements={confirmationRequirements}
            effectsColor="red"
            theme="dark"
          />
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="flex justify-center py-16 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '0.5px' }}></div>
      </div>

      {/* Enhanced Seven Gifts Interactive Experience - Phase B & D */}
      <Section spacing="lg" background="slate" id="confirmation-gifts" tabIndex={-1}>
        <Container size="lg">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* <SevenGiftsInteractive /> */}
          </m.div>
        </Container>
      </Section>

      {/* Enhanced Effects Display with React Spring */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <div ref={giftsRef} className="space-y-8">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Heading level="h3" color="white" className="text-2xl font-bold mb-8">
                Effects of Confirmation
              </Heading>
            </m.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {giftsTrail.map((style, index) => {
                const effect = confirmationEffects[index]
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
                      <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-red-600/30 hover:border-red-400 transition-all duration-300 h-full">
                        <CardContent>
                          <div className="space-y-4 text-center">
                            <m.div
                              className="w-12 h-12 mx-auto bg-red-500/20 rounded-full flex items-center justify-center"
                              whileHover={{ 
                                rotate: [0, 10, -10, 0],
                                scale: 1.1
                              }}
                              transition={{ duration: 0.6 }}
                            >
                              <FireIcon className="h-6 w-6 text-red-400" />
                            </m.div>
                            <Heading level="h4" color="white" className="font-semibold">
                              {effect.title}
                            </Heading>
                            <Text size="sm" className="text-red-200">
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

      {/* Confirmation Preparation Programs - Enhanced */}
      <Section spacing="lg" background="slate" id="confirmation-programs" tabIndex={-1}>
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
                Confirmation Preparation Programs
              </Heading>
              <Text className="text-gray-300 max-w-3xl mx-auto">
                Whether you're a young person or an adult, we offer comprehensive preparation programs 
                to help you receive the gifts of the Holy Spirit through confirmation.
              </Text>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* <ConfirmationPreparationTracker confirmationType="youth" />
              <ConfirmationPreparationTracker confirmationType="adult" /> */}
            </div>
          </m.div>
        </Container>
      </Section>

      {/* Traditional Program Information for Reference */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <Grid cols={2} gap="xl" className="items-start">
            {/* Left Column - Youth Program */}
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 icon-container-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <div className="space-y-3">
                  <Heading level="h3" color="white" className="text-xl font-serif font-semibold">
                    Youth Confirmation Program
                  </Heading>
                  <Text className="text-gray-100 leading-relaxed">
                    Our comprehensive 2-year program prepares young people (Year 9 and above) 
                    for Confirmation through weekly classes, retreats, and service opportunities.
                  </Text>
                  <div className="space-y-2">
                    <Text weight="bold" className="text-white">
                      Program Schedule:
                    </Text>
                    <div className="space-y-1">
                      <Text size="sm" className="text-gray-200">• Sunday mornings at 10:00 AM</Text>
                      <Text size="sm" className="text-gray-200">• September through May</Text>
                      <Text size="sm" className="text-gray-200">• Confirmation ceremony in June</Text>
                    </div>
                  </div>
                  <Button 
                    variant="primary" 
                    size="sm"
                    leftIcon={<Calendar className="h-4 w-4" />}
                    className="bg-white text-slate-900 hover:bg-gray-100"
                  >
                    Enroll in Program
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Adult Confirmation */}
            <div className="space-y-8 text-right">
              <div className="flex items-start gap-6 flex-row-reverse">
                <div className="w-16 h-16 icon-container-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <Heart className="h-8 w-8 text-black" />
                </div>
                <div className="space-y-3">
                  <Heading level="h3" color="white" className="text-xl font-serif font-semibold">
                    Adult Confirmation (RCIA)
                  </Heading>
                  <Text className="text-gray-100 leading-relaxed text-right">
                    Adults who have been baptized but not confirmed join our RCIA process 
                    to complete their Christian initiation and receive the fullness of the Spirit.
                  </Text>
                  <div className="space-y-2">
                    <Text weight="bold" className="text-white text-right">
                      RCIA Sessions:
                    </Text>
                    <div className="space-y-1">
                      <Text size="sm" className="text-gray-200 text-right">• Wednesday evenings at 7:00 PM</Text>
                      <Text size="sm" className="text-gray-200 text-right">• September through Easter</Text>
                      <Text size="sm" className="text-gray-200 text-right">• Confirmation at Easter Vigil</Text>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="primary" 
                      size="sm"
                      leftIcon={<BookOpen className="h-4 w-4" />}
                      className="bg-white text-slate-900 hover:bg-gray-100"
                    >
                      Join RCIA
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="flex justify-center py-20 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '1px', boxShadow: '0 0 1px rgba(255,255,255,0.5)' }}></div>
      </div>

      {/* Confirmation Analytics Dashboard - Phase B Enhancement */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* <SacramentalAnalytics sacramentType="confirmation" /> */}
          </m.div>
        </Container>
      </Section>

      {/* Scripture Card - Phase D Enhancement */}
      <Section spacing="sm" background="slate">
        <Container size="md">
          <SacramentalScriptureSection
            pageTheme="confirmation"
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
                  Follow our comprehensive step-by-step guide for both youth and adult confirmation preparation
                </Text>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* <SacramentalPreparationGuide sacramentType="confirmation" participantType="child" />
                <SacramentalPreparationGuide sacramentType="confirmation" participantType="adult" /> */}
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
              articleId="confirmation-sacrament"
              title="Confirmation - Strengthened by the Spirit | St Saviour's Catholic Church"
              url="https://stsaviourlewisham.org.uk/the-sacraments/confirmation"
            />
          </m.div>
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="flex justify-center py-20 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '1px', boxShadow: '0 0 1px rgba(255,255,255,0.5)' }}></div>
      </div>

      {/* Call to Action */}
      <Section spacing="lg" background="slate" id="confirmation-contact" tabIndex={-1}>
        <Container size="md">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Heading level="h2" className="text-3xl font-light text-white text-center">
                  Come, Holy Spirit
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
                  Confirmation is a beautiful milestone in your faith journey. Whether you're a young person 
                  or an adult, we invite you to discover the power of the Holy Spirit in your life.
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
            
            <Link href="/contact-us">
              <Button 
                variant="primary" 
                size="lg"
                leftIcon={<Phone className="h-5 w-5" />}
                className="bg-white text-slate-900 hover:bg-gray-100"
              >
                Contact Us Today
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Progress Indicator - Phase C Enhancement */}
      <ProgressIndicator 
        sections={['Overview', 'Preparation', 'Gifts', 'Community']}
        activeSection={0}
      />
      </main>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'