import React, { useState, useEffect } from 'react'
import { motion, LazyMotion, domAnimation, useScroll, useTransform, m } from 'framer-motion'
import { useSpring, animated, useTrail, useInView } from '@react-spring/web'
import Link from 'next/link'
import { 
  MapPinIcon as MapPin, 
  TruckIcon as Car, 
  BuildingOffice2Icon as Train, 
  TruckIcon as Bus, 
  ClockIcon as Clock, 
  UserIcon as Accessibility, 
  PhoneIcon as Phone,
  ArrowTopRightOnSquareIcon as Navigation,
  EnvelopeIcon as Mail,
  SparklesIcon,
  GlobeAltIcon,
  HeartIcon
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
  Grid,
  Flex,
  Container
} from '@/components/ui'
import { LocationCard, MapEmbed, BusRoutesGrid } from '@/components/church'
import { 
  LocationAnalytics,
  VirtualChurchTour,
  LiveOfficeHours,
  ScriptureCard,
  SocialSharingSystem,
  ProgressIndicator
} from '@/components/enhanced'
import { prefersReducedMotion } from '@/lib/utils'

export default function FindUs() {
  const reducedMotion = prefersReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [announcements, setAnnouncements] = useState<string[]>([])
  const [focusedElement, setFocusedElement] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])
  
  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!reducedMotion) {
        setMousePosition({
          x: (e.clientX - window.innerWidth / 2) * 0.01,
          y: (e.clientY - window.innerHeight / 2) * 0.01
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reducedMotion])
  
  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content
      if (e.key === '1' && e.altKey) {
        const mainContent = document.getElementById('main-content')
        if (mainContent) {
          mainContent.focus()
          setAnnouncements(['Jumped to main content'])
        }
      }
      
      // Skip to navigation
      if (e.key === '2' && e.altKey) {
        const navigation = document.getElementById('navigation')
        if (navigation) {
          navigation.focus()
          setAnnouncements(['Jumped to navigation'])
        }
      }
      
      // Announce current section on Tab
      if (e.key === 'Tab') {
        const activeElement = document.activeElement
        if (activeElement) {
          const section = activeElement.closest('section')
          if (section) {
            const heading = section.querySelector('h1, h2, h3, h4, h5, h6')
            if (heading && heading.textContent) {
              setAnnouncements([`Now in section: ${heading.textContent}`])
            }
          }
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  // React Spring animations for transport cards
  const [transportRef, transportInView] = useInView()
  const transportTrail = useTrail(transportMethods.length, {
    opacity: transportInView ? 1 : 0,
    transform: transportInView ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.9)',
    config: { tension: 120, friction: 20 },
    delay: (i) => i * 200
  })
  
  // Enhanced hero animation
  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(100px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 100, friction: 25 },
    delay: 300
  })
  
  // Performance monitoring with Core Web Vitals
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('Find Us page load time:', entry.duration)
        }
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime)
        }
      }
    })
    
    observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input'] })
    
    // Cumulative Layout Shift (CLS) monitoring
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          console.log('CLS:', clsValue)
        }
      }
    })
    
    clsObserver.observe({ entryTypes: ['layout-shift'] })
    
    return () => {
      observer.disconnect()
      clsObserver.disconnect()
    }
  }, [])
  
  // Screen reader announcements
  useEffect(() => {
    if (announcements.length > 0) {
      const timer = setTimeout(() => {
        setAnnouncements([])
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [announcements])

  const transportMethods = [
    {
      icon: Train,
      iconColor: "bg-green-600",
      title: "By Train",
      locationInfo: {
        title: "Lewisham Station",
        subtitle: "2 minutes walk",
        details: ["National Rail & DLR"],
        items: [
          "National Rail from London Bridge (12 mins)",
          "National Rail from Victoria (25 mins)", 
          "National Rail from Cannon Street (15 mins)",
          "DLR from Canary Wharf (20 mins)"
        ]
      },
      analytics: {
        usage: 45,
        averageTime: 12,
        satisfaction: 4.8
      }
    },
    {
      icon: Bus,
      iconColor: "bg-red-600", 
      title: "By Bus",
      locationInfo: {
        title: "Lewisham Shopping Centre",
        subtitle: "1 minute walk",
        items: [
          "Routes: 21, 136, 185, 202, 208, 284, 321, 380, 436",
          "Night buses: N21, N136, N199",
          "Real-time bus info available"
        ]
      },
      analytics: {
        usage: 30,
        averageTime: 18,
        satisfaction: 4.2
      }
    },
    {
      icon: Car,
      iconColor: "bg-blue-600",
      title: "By Car", 
      locationInfo: {
        title: "From Central London:",
        subtitle: "A20 via New Cross (20-30 minutes)",
        items: [
          "Limited street parking nearby",
          "Lewisham Shopping Centre car park (£2/hr)",
          "River Park Retail Park (3 hrs free)",
          "Disabled parking spaces available"
        ],
        highlight: "Postcode for Sat Nav: SE13 6AA"
      },
      analytics: {
        usage: 15,
        averageTime: 25,
        satisfaction: 3.9
      }
    }
  ]

  const accessibilityFeatures = [
    {
      title: "Wheelchair Access",
      description: "Full wheelchair access via the main entrance. Accessible seating areas available in the nave."
    },
    {
      title: "Accessible Facilities", 
      items: [
        "Accessible toilet facilities",
        "Hearing loop system installed", 
        "Large print service books available",
        "Reserved parking spaces"
      ]
    },
    {
      title: "Assistance",
      description: "Our ushers are always happy to provide assistance. Please don't hesitate to ask for help."
    }
  ]

  const facilityInfo = [
    {
      title: "Church Facilities",
      items: [
        "Main church seating for 300 people",
        "Side chapel for quiet prayer",
        "Parish hall for events", 
        "Kitchen facilities",
        "Children's area"
      ]
    },
    {
      title: "Nearby Amenities",
      items: [
        "Lewisham Shopping Centre (1 min walk)",
        "Restaurants and cafes",
        "Lewisham Library",
        "Lewisham Hospital (5 min drive)"
      ]
    },
    {
      title: "First Time Visitors",
      description: "Arrive 10 minutes early for Mass. Our welcomers will be happy to help you find a seat and provide any information you need."
    }
  ]

  return (
    <PageLayout
      title="Find Us"
      description="Directions and location information for St Saviour's Catholic Church in Lewisham. Find us by car, public transport, or on foot."
      keywords="Directions St Saviours, Church Location, Lewisham High Street, How to find us, Public Transport, Parking"
    >
      {/* Screen Reader Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        role="status"
      >
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>
      
      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
        <a 
          href="#main-content" 
          className="bg-gold-500 text-slate-900 px-4 py-2 rounded font-medium"
          onFocus={() => setAnnouncements(['Skip to main content link focused'])}
        >
          Skip to main content
        </a>
      </div>
      {/* Enhanced Hero Section with Parallax */}
      <LazyMotion features={domAnimation}>
        <section 
          aria-labelledby="hero-heading"
          className="relative overflow-hidden"
          role="banner"
        >
          <m.div 
            style={{ y, opacity }}
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            aria-hidden="true"
          />
          <m.div
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
          >
            <SparklesIcon className="absolute top-1/4 left-1/4 h-6 w-6 text-gold-400" aria-hidden="true" />
            <HeartIcon className="absolute top-1/3 right-1/3 h-4 w-4 text-gold-300" aria-hidden="true" />
            <GlobeAltIcon className="absolute bottom-1/4 left-1/3 h-5 w-5 text-gold-500" aria-hidden="true" />
          </m.div>
          
          <animated.div style={heroSpring}>
            <PageHero
              title="Find Us"
              subtitle="Visit Our Church"
              description="Located in the heart of Lewisham, we're easily accessible by public transport and car."
              backgroundImage="/images/pexels-pixabay-218480.jpg"
              height="large"
              overlay="medium"
              actions={
                <Flex justify="center" gap="md" role="group" aria-label="Quick actions">
                  <m.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button 
                      variant="primary" 
                      size="lg"
                      leftIcon={<Navigation className="h-5 w-5" aria-hidden="true" />}
                      aria-describedby="directions-help"
                      onFocus={() => setAnnouncements(['Get directions button focused'])}
                    >
                      Get Directions
                    </Button>
                    <span id="directions-help" className="sr-only">
                      Opens Google Maps with directions to St Saviour's Catholic Church
                    </span>
                  </m.div>
                  <m.div
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button 
                      variant="secondary" 
                      size="lg"
                      leftIcon={<Phone className="h-5 w-5" aria-hidden="true" />}
                      aria-describedby="phone-help"
                      onFocus={() => setAnnouncements(['Call us button focused'])}
                    >
                      Call Us
                    </Button>
                    <span id="phone-help" className="sr-only">
                      Call us directly at 020 8852 7411 for assistance with directions
                    </span>
                  </m.div>
                </Flex>
              }
            />
          </animated.div>
        </section>
      </LazyMotion>
      
      <main id="main-content" tabIndex={-1} className="focus:outline-none">

      {/* Address & Quick Info */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <Heading level="h2" className="text-3xl font-light mb-6 text-white">
              Our Location
            </Heading>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <Flex justify="center" align="center" gap="md">
                <MapPin className="h-6 w-6 text-white" />
                <Text size="xl" className="text-white">
                  St Saviour's Catholic Church
                </Text>
              </Flex>
              
              <address className="not-italic">
                <Text size="lg" className="text-gray-300">
                  175 Lewisham High Street<br />
                  London SE13 6AA<br />
                  United Kingdom
                </Text>
              </address>
              
              <Flex justify="center" align="center" gap="md" className="pt-4">
                <Phone className="h-5 w-5 text-white" />
                <Text className="text-white">020 8852 7411</Text>
              </Flex>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Interactive Map with Analytics */}
      <Section spacing="sm" background="slate">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MapEmbed
                address="175 Lewisham High Street, London SE13 6AA"
                postcode="SE13 6AA"
                embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.234!2d-0.013558!3d51.462778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a9b2d5e0f123%3A0xabcdef1234567890!2s175%20Lewisham%20High%20St%2C%20London%20SE13%206AA!5e0!3m2!1sen!2suk!4v1640000000000!5m2!1sen!2suk"
                height="lg"
                showDirections={true}
              />
            </div>
            <div className="space-y-6">
              <LocationAnalytics />
              <LiveOfficeHours />
            </div>
          </div>
        </Container>
      </Section>

      {/* Enhanced Transport Options with React Spring */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" color="white" align="center" className="mb-6">
              How to Get Here
            </Heading>
            <Text size="xl" align="center" className="text-gray-100 max-w-3xl mx-auto">
              We're conveniently located in central Lewisham with excellent transport links.
            </Text>
          </motion.div>

          <div ref={transportRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transportTrail.map((style, index) => {
              const method = transportMethods[index]
              return (
                <animated.div
                  key={method.title}
                  style={style}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 8,
                      z: 50
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      duration: 0.6
                    }}
                    className="h-full transform-gpu perspective-1000"
                  >
                    <LocationCard
                      icon={method.icon}
                      iconColor={method.iconColor}
                      title={method.title}
                      locationInfo={method.locationInfo}
                    />
                    
                    {/* Floating icon animation */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0, rotate: -180 }}
                      whileHover={{ 
                        scale: 1, 
                        rotate: 0,
                        transition: { 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 15 
                        }
                      }}
                    >
                      <SparklesIcon className="h-4 w-4 text-slate-900" />
                    </motion.div>
                  </motion.div>
                </animated.div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Enhanced Accessibility & Facilities with Stagger Animations */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <Grid cols={2} gap="xl">
            {/* Accessibility */}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  whileHover={{ 
                    rotate: [0, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Accessibility className="h-6 w-6 text-white" />
                </motion.div>
                <Heading level="h3" color="white" className="text-2xl font-semibold">
                  Accessibility
                </Heading>
              </motion.div>
              
              <div className="space-y-4">
                {accessibilityFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.02,
                      translateZ: 10,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <Card variant="default" padding="md" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white transition-all duration-300">
                      <CardContent>
                        <div className="space-y-2">
                          <Heading level="h4" color="white" className="font-semibold">
                            {feature.title}
                          </Heading>
                          {feature.description && (
                            <Text size="sm" className="text-gray-200">
                              {feature.description}
                            </Text>
                          )}
                          {feature.items && (
                            <div className="space-y-1">
                              {feature.items.map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                                  viewport={{ once: true }}
                                >
                                  <Text size="sm" className="text-gray-200">
                                    • {item}
                                  </Text>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Facilities */}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Clock className="h-6 w-6 text-white" />
                </motion.div>
                <Heading level="h3" color="white" className="text-2xl font-semibold">
                  Facilities & Information
                </Heading>
              </motion.div>
              
              <div className="space-y-4">
                {facilityInfo.map((facility, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.02,
                      translateZ: 10,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <Card variant="default" padding="md" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white transition-all duration-300">
                      <CardContent>
                        <div className="space-y-2">
                          <Heading level="h4" color="white" className="font-semibold">
                            {facility.title}
                          </Heading>
                          {facility.description && (
                            <Text size="sm" className="text-gray-200">
                              {facility.description}
                            </Text>
                          )}
                          {facility.items && (
                            <div className="space-y-1">
                              {facility.items.map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: 10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                                  viewport={{ once: true }}
                                >
                                  <Text size="sm" className="text-gray-200">
                                    • {item}
                                  </Text>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Grid>
        </Container>
      </Section>

      {/* Virtual Church Tour */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <VirtualChurchTour />
        </Container>
      </Section>

      {/* Scripture Card */}
      <Section spacing="sm" background="slate">
        <Container size="md">
          <ScriptureCard 
            theme="hospitality"
            reference="Hebrews 13:2"
            text="Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it."
            reflection="As you journey to our church, remember that every visitor is welcomed with the love of Christ."
          />
        </Container>
      </Section>

      {/* Contact for Directions with Social Sharing */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white space-y-8"
          >
            <div className="space-y-6">
              <Heading level="h2" className="text-3xl font-light text-white">
                Need Help Finding Us?
              </Heading>
              <Text size="xl" className="text-gray-300 max-w-2xl mx-auto">
                If you need specific directions or have any accessibility requirements, 
                please don't hesitate to contact us. We're here to help.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <a href="tel:+442088527411">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Phone className="h-5 w-5" />}
                >
                  Call: 020 8852 7411
                </Button>
              </a>
              <Link href="/contact-us">
                <Button 
                  variant="secondary" 
                  size="lg"
                  leftIcon={<Mail className="h-5 w-5" />}
                >
                  Contact Form
                </Button>
              </Link>
            </Flex>
            
            <div className="pt-8">
              <SocialSharingSystem 
                pageTitle="Find St Saviour's Catholic Church Lewisham"
                pageUrl="https://stsaviourlewisham.org.uk/find-us"
                description="Located in the heart of Lewisham with excellent transport links. Find directions, accessibility information, and contact details."
              />
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Progress Indicator */}
      <ProgressIndicator />
      </main>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'