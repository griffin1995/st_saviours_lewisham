import React, { useState, useEffect, useCallback } from 'react'
import { m } from 'framer-motion'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { 
  Building, 
  Heart, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  PartyPopper,
  CheckCircle,
  Calendar
} from 'lucide-react'

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
import { VenueCard, VenueEnquiryForm, type Venue, type VenueEnquiryData } from '@/components/church'
import { EnhancedVenueCard, AnimatedTestimonials } from '@/components/enhanced'
import { ScriptureCard } from '@/components/enhanced/ScriptureCard'
import { InteractiveBookingCalendar } from '@/components/enhanced/InteractiveBookingCalendar'
import { VirtualVenueTour } from '@/components/enhanced/VirtualVenueTour'
import { RealTimeAvailabilityChecker } from '@/components/enhanced/RealTimeAvailabilityChecker'
import { VenueComparisonTool } from '@/components/enhanced/VenueComparisonTool'
import { PaymentIntegrationPreview } from '@/components/enhanced/PaymentIntegrationPreview'
import { SocialSharingSystem } from '@/components/enhanced/SocialSharingSystem'
import { PerformanceMonitor } from '@/components/enhanced/PerformanceMonitor'
import { AccessibilityEnhancer } from '@/components/enhanced/AccessibilityEnhancer'
import { Motion, fadeInUp, reverentReveal, staggerChildren } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import { prefersReducedMotion } from '@/lib/utils'
import { useUI, useActions } from '@/stores/churchStore'

// Venue data
const venues: Venue[] = [
  {
    id: "parish-hall",
    name: "Parish Hall",
    description: "Our spacious main hall is perfect for large gatherings, celebrations, and community events. With a stage area and excellent acoustics, it's ideal for both formal and informal occasions.",
    capacity: "Up to 150 people",
    area: "120 square meters",
    image: "/images/venues/parish-hall.jpg",
    features: [
      "Stage area with lighting",
      "Sound system available",
      "Kitchen facilities adjacent",
      "Tables and chairs included",
      "Disabled access",
      "Parking available"
    ],
    hourlyRate: "£35",
    halfDayRate: "£120",
    fullDayRate: "£200",
    suitableFor: ["Weddings", "Birthday parties", "Community meetings", "Concerts", "Fundraising events", "Corporate events"]
  },
  {
    id: "community-room",
    name: "Community Room",
    description: "A comfortable, intimate space perfect for smaller gatherings, meetings, and family celebrations. Features beautiful stained glass windows and a warm, welcoming atmosphere.",
    capacity: "Up to 50 people",
    area: "40 square meters",
    image: "/images/venues/community-room.jpg",
    features: [
      "Stained glass windows",
      "Natural lighting",
      "Kitchenette access",
      "Flexible seating arrangements",
      "Heating included",
      "Audio/visual equipment"
    ],
    hourlyRate: "£20",
    halfDayRate: "£70",
    fullDayRate: "£120",
    suitableFor: ["Small meetings", "Baby showers", "Book clubs", "Training sessions", "Family gatherings", "Prayer groups"]
  },
  {
    id: "garden-space",
    name: "Church Garden",
    description: "Our beautiful, peaceful garden provides a unique outdoor venue surrounded by mature trees and well-maintained grounds. Perfect for outdoor ceremonies and summer events.",
    capacity: "Up to 80 people",
    area: "200 square meters",
    image: "/images/venues/church-garden.jpg",
    features: [
      "Beautiful mature trees",
      "Well-maintained lawns",
      "Gazebo available",
      "Access to hall facilities",
      "Photography friendly",
      "Peaceful atmosphere"
    ],
    hourlyRate: "£25",
    halfDayRate: "£85",
    fullDayRate: "£150",
    suitableFor: ["Garden parties", "Wedding photos", "Outdoor ceremonies", "Summer fairs", "Memorial services", "Children's events"]
  }
]

const faqs = [
  {
    question: "What's included in the hire fee?",
    answer: "All venue hire includes basic furniture (tables and chairs), lighting, heating, and access to basic kitchen facilities. Additional equipment like sound systems or decorative items may incur extra charges."
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 6-8 weeks in advance for popular dates, especially weekends. Some dates may be available with shorter notice."
  },
  {
    question: "Are there any restrictions on what I can hold?",
    answer: "As a Catholic parish, we ask that all events align with our Christian values. We welcome community celebrations, educational events, and charitable fundraisers. Please discuss your event with us."
  },
  {
    question: "Is parking available?",
    answer: "Yes, we have an on-site car park with 25 spaces. Additional street parking is available nearby."
  },
  {
    question: "Can I bring my own catering?",
    answer: "Yes, you can bring your own catering or use our approved caterers list. Our kitchen facilities are available for food preparation and service."
  },
  {
    question: "What about decorations?",
    answer: "You're welcome to decorate the venues appropriately. We ask that no fixtures are damaged and all decorations are removed after your event."
  }
]

// Chart.js registration
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function VenueHire() {
  const ui = useUI()
  const actions = useActions()
  const reducedMotion = prefersReducedMotion()
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [bookingStats, setBookingStats] = useState<{[key: string]: {bookings: number, revenue: number, rating: number}}>({})
  const [availabilityData, setAvailabilityData] = useState<{[key: string]: boolean}>({})
  const [comparisonMode, setComparisonMode] = useState(false)
  const [selectedVenues, setSelectedVenues] = useState<string[]>([])
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [shareVenueData, setShareVenueData] = useState<Venue | null>(null)
  const { ref: analyticsRef, inView: analyticsInView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Enhanced page initialization
  useEffect(() => {
    actions.addNotification({
      type: 'info',
      message: 'Welcome to Venue Hire - discover our beautiful spaces for your special events',
      dismissible: true
    })
    
    // Load booking statistics from localStorage
    const savedStats = localStorage.getItem('venue-booking-stats')
    if (savedStats) {
      setBookingStats(JSON.parse(savedStats))
    }
    
    // Load availability data
    const savedAvailability = localStorage.getItem('venue-availability')
    if (savedAvailability) {
      setAvailabilityData(JSON.parse(savedAvailability))
    }
  }, [])

  const handleVenueBooking = (venueId: string) => {
    setSelectedVenue(venueId)
    // Scroll to enquiry form
    document.getElementById('enquiry-form')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }

  const handleVenueShare = useCallback((venue: Venue) => {
    setShareVenueData(venue)
    setIsShareModalOpen(true)
  }, [])

  const handleVenueComparison = useCallback((venueId: string) => {
    if (selectedVenues.includes(venueId)) {
      setSelectedVenues(prev => prev.filter(id => id !== venueId))
    } else if (selectedVenues.length < 3) {
      setSelectedVenues(prev => [...prev, venueId])
    }
  }, [selectedVenues])

  const handleEnquirySubmit = async (data: VenueEnquiryData) => {
    // Handle enquiry submission
    console.log('Venue enquiry submitted:', data)
    
    actions.addNotification({
      type: 'success',
      message: 'Thank you for your enquiry! We will get back to you within 24 hours.',
      dismissible: true
    })
    
    // Update booking statistics
    setBookingStats(prev => {
      const updated = {
        ...prev,
        [data.venueId || 'general']: {
          bookings: (prev[data.venueId || 'general']?.bookings || 0) + 1,
          revenue: prev[data.venueId || 'general']?.revenue || 0,
          rating: prev[data.venueId || 'general']?.rating || 4.8
        }
      }
      localStorage.setItem('venue-booking-stats', JSON.stringify(updated))
      return updated
    })
  }

  // React Spring animations
  const heroSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(30px)' },
    config: ui.reducedMotion ? config.default : config.gentle
  })

  const analyticsSpring = useSpring({
    opacity: analyticsInView ? 1 : 0,
    transform: analyticsInView ? 'translateY(0px)' : 'translateY(50px)',
    config: ui.reducedMotion ? config.default : config.gentle,
    delay: 300
  })

  // Venue booking analytics data
  const venuePopularityData = {
    labels: venues.map(venue => venue.name),
    datasets: [
      {
        label: 'Bookings This Year',
        data: venues.map(venue => bookingStats[venue.id]?.bookings || 0),
        backgroundColor: [
          'rgba(212, 175, 55, 0.6)',
          'rgba(26, 54, 93, 0.6)',
          'rgba(34, 197, 94, 0.6)'
        ],
        borderColor: [
          '#d4af37',
          '#1a365d',
          '#16a34a'
        ],
        borderWidth: 1
      }
    ]
  }

  const venueRevenueData = {
    labels: venues.map(venue => venue.name),
    datasets: [
      {
        data: venues.map(venue => bookingStats[venue.id]?.revenue || 0),
        backgroundColor: [
          '#d4af37',
          '#1a365d',
          '#16a34a'
        ],
        borderWidth: 2
      }
    ]
  }

  return (
    <PageLayout
      title="Venue Hire"
      description="Hire beautiful spaces at St Saviour's Catholic Church in Lewisham for your special events, meetings, and celebrations."
      keywords="Venue Hire Lewisham, Church Hall Hire, Event Space, Wedding Venue, Community Hall, Parish Hall Rental"
    >
      {/* Hero Section */}
      <PageHero
        title="Venue Hire"
        subtitle="Beautiful Spaces for Your Special Events"
        description="Discover our welcoming venues perfect for celebrations, meetings, and community gatherings in the heart of Lewisham."
        backgroundImage="/images/venues/hall-setup.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
            >
              Book Now
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Phone className="h-5 w-5" />}
            >
              Call Us
            </Button>
          </Flex>
        }
      />

      {/* Scripture Inspiration Section */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <Motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Sacred Hospitality
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                Welcoming all into spaces where community flourishes and memories are made
              </p>
            </Motion.div>
            
            <div className="max-w-4xl mx-auto">
              <ScriptureCard
                displayMode="themed"
                theme="hospitality"
                showReflection={true}
                reducedMotion={ui.reducedMotion}
              />
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Introduction */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <animated.div style={heroSpring} className="text-center space-y-8 max-w-4xl mx-auto mb-16">
            <Heading level="h2" align="center" className="mb-6">
              Welcome to Our Community Spaces
            </Heading>
            <Text size="xl" align="center" color="muted" className="leading-relaxed">
              St Saviour's parish offers beautiful, well-maintained venues in the heart of Lewisham. 
              Whether you're planning a wedding reception, birthday celebration, community meeting, or 
              corporate event, our flexible spaces provide the perfect setting for your special occasion.
            </Text>
          </animated.div>

          <Grid cols={3} gap="lg">
            {[
              {
                icon: Building,
                title: "Historic Setting",
                description: "Beautiful Victorian buildings with character and charm"
              },
              {
                icon: Heart,
                title: "Community Spirit", 
                description: "Supporting local families and community organizations"
              },
              {
                icon: Star,
                title: "Excellent Value",
                description: "Competitive rates with all proceeds supporting parish work"
              }
            ].map((benefit, index) => (
              <m.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card variant="default" padding="lg" className="text-center h-full bg-white">
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto">
                        <benefit.icon className="h-8 w-8 text-gold-600" />
                      </div>
                      <Heading level="h3" align="center" className="font-semibold">
                        {benefit.title}
                      </Heading>
                      <Text color="muted" align="center">
                        {benefit.description}
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Venue Analytics Dashboard */}
      {analyticsInView && (
        <Section spacing="lg" background="white">
          <Container size="lg">
            <animated.div ref={analyticsRef} style={analyticsSpring}>
              <div className="text-center mb-12">
                <h2 className={`${typographyScale.h2} text-slate-900 mb-6 relative`}>
                  Venue Popularity & Insights
                  <Motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ width: '180px' }}
                  />
                </h2>
                <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
                  See how our community uses our beautiful spaces
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <Card variant="default" padding="lg" className="bg-white shadow-lg">
                  <CardContent>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-6 text-center`}>
                      Booking Popularity
                    </h3>
                    <div className="h-64">
                      <Bar
                        data={venuePopularityData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              labels: { color: '#374151' }
                            }
                          },
                          scales: {
                            x: {
                              ticks: { color: '#374151' },
                              grid: { color: 'rgba(55, 65, 81, 0.1)' }
                            },
                            y: {
                              ticks: { color: '#374151' },
                              grid: { color: 'rgba(55, 65, 81, 0.1)' }
                            }
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card variant="default" padding="lg" className="bg-white shadow-lg">
                  <CardContent>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-6 text-center`}>
                      Revenue Distribution
                    </h3>
                    <div className="h-64">
                      <Pie
                        data={venueRevenueData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: { color: '#374151' }
                            }
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </animated.div>
          </ScrollRevealSection>
        </Container>
      </Section>
      )}

      {/* Real-Time Availability */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <Motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Live Availability Checker
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '160px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                Check real-time availability and find the perfect date for your event
              </p>
            </Motion.div>
            
            <RealTimeAvailabilityChecker
              venues={venues}
              availabilityData={availabilityData}
              onDateSelect={(venue, date) => {
                setSelectedVenue(venue.id)
                actions.addNotification({
                  type: 'success',
                  message: `${venue.name} is available on ${date}! Ready to book?`,
                  dismissible: true
                })
              }}
              reducedMotion={ui.reducedMotion}
            />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Interactive Booking Calendar */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <ScrollRevealSection>
            <Motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-slate-900 mb-6 relative`}>
                Interactive Booking Calendar
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '200px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
                Explore available dates and plan your perfect event
              </p>
            </Motion.div>
            
            <InteractiveBookingCalendar
              venues={venues}
              onBookingSelect={(booking) => {
                setSelectedVenue(booking.venueId)
                document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })
              }}
              reducedMotion={ui.reducedMotion}
            />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Venue Comparison Tool */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <ScrollRevealSection>
            <Motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-slate-900 mb-6 relative`}>
                Compare Our Venues
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
                Side-by-side comparison to help you choose the perfect space
              </p>
            </Motion.div>
            
            <VenueComparisonTool
              venues={venues}
              selectedVenues={selectedVenues}
              onVenueSelect={handleVenueComparison}
              onBookVenue={handleVenueBooking}
              reducedMotion={ui.reducedMotion}
            />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Virtual Venue Tours */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <Motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Virtual Venue Tours
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                Take a virtual walk through our beautiful venues before booking
              </p>
            </Motion.div>
            
            <VirtualVenueTour
              venues={venues}
              onShareVenue={handleVenueShare}
              reducedMotion={ui.reducedMotion}
            />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Venues */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <m.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Our Venues
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Choose from our range of flexible spaces to suit events of all sizes
            </Text>
          </m.div>

          <div className="space-y-12">
            {venues.map((venue, index) => (
              <EnhancedVenueCard
                key={venue.id}
                venue={venue}
                imagePosition={index % 2 === 1 ? 'right' : 'left'}
                onBookClick={handleVenueBooking}
                onShareClick={() => handleVenueShare(venue)}
                onCompareClick={() => handleVenueComparison(venue.id)}
                isSelected={selectedVenues.includes(venue.id)}
                bookingStats={bookingStats[venue.id]}
                reducedMotion={reducedMotion}
                featured={index === 0} // Make first venue featured
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Booking Process */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <m.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              How to Book
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Simple steps to secure your venue
            </Text>
          </m.div>

          <Grid cols={4} gap="lg">
            {[
              {
                step: "1",
                title: "Contact Us",
                description: "Call or email to check availability and discuss your requirements",
                icon: Phone
              },
              {
                step: "2", 
                title: "Visit & View",
                description: "Arrange a viewing to see the venue and discuss your specific needs",
                icon: Building
              },
              {
                step: "3",
                title: "Confirm Booking",
                description: "Complete our booking form and pay the deposit to secure your date",
                icon: CheckCircle
              },
              {
                step: "4",
                title: "Your Event",
                description: "Enjoy your special day with our support and beautiful venue",
                icon: PartyPopper
              }
            ].map((step, index) => (
              <m.div
                key={step.step}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-8 w-8 text-gold-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <Heading level="h3" className="font-semibold mb-3">
                  {step.title}
                </Heading>
                <Text color="muted" align="center">
                  {step.description}
                </Text>
              </m.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Contact & Enquiry Form */}
      <Section spacing="lg" background="slate" id="enquiry-form">
        <Container size="lg">
          <Grid cols={2} gap="xl" className="items-start">
            {/* Contact Information */}
            <m.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <Heading level="h2" className="text-3xl lg:text-4xl font-light mb-6 text-white">
                Get in Touch
              </Heading>
              <Text size="xl" className="text-gray-200 mb-8 leading-relaxed">
                Ready to book your venue or have questions? Our friendly team is here to help 
                make your event a success.
              </Text>
              
              <div className="space-y-6">
                <Flex align="start" gap="md">
                  <Phone className="h-6 w-6 text-gold-400 mt-1 flex-shrink-0" />
                  <div>
                    <Text weight="bold" className="text-lg text-white">Phone</Text>
                    <Text className="text-gray-200">020 8852 7411</Text>
                    <Text size="sm" className="text-gray-300">Monday - Friday, 9:00 AM - 5:00 PM</Text>
                  </div>
                </Flex>
                
                <Flex align="start" gap="md">
                  <Mail className="h-6 w-6 text-gold-400 mt-1 flex-shrink-0" />
                  <div>
                    <Text weight="bold" className="text-lg text-white">Email</Text>
                    <Text className="text-gray-200">venues@saintsaviours.org.uk</Text>
                    <Text size="sm" className="text-gray-300">We typically respond within 24 hours</Text>
                  </div>
                </Flex>
                
                <Flex align="start" gap="md">
                  <MapPin className="h-6 w-6 text-gold-400 mt-1 flex-shrink-0" />
                  <div>
                    <Text weight="bold" className="text-lg text-white">Address</Text>
                    <div className="text-gray-200">
                      St Saviour's Catholic Church<br />
                      123 Church Lane<br />
                      Lewisham, London SE13 7XX
                    </div>
                  </div>
                </Flex>
              </div>
            </m.div>

            {/* Enquiry Form */}
            <VenueEnquiryForm
              venues={venues}
              selectedVenueId={selectedVenue || undefined}
              onSubmit={handleEnquirySubmit}
              title="Quick Enquiry"
            />
          </Grid>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <AnimatedTestimonials reducedMotion={reducedMotion} />
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section spacing="lg" background="white">
        <Container size="md">
          <m.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Frequently Asked Questions
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Everything you need to know about hiring our venues
            </Text>
          </m.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <m.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="default" padding="none" className="bg-white overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <Text weight="bold" className="text-lg">
                      {faq.question}
                    </Text>
                    <div className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                      <CheckCircle className="h-5 w-5 text-gold-600" />
                    </div>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <Text color="muted" className="leading-relaxed">
                        {faq.answer}
                      </Text>
                    </div>
                  )}
                </Card>
              </m.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Payment Integration Preview */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <ScrollRevealSection>
            <Motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-slate-900 mb-6 relative`}>
                Secure Online Booking
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
                Simple, secure booking process with flexible payment options
              </p>
            </Motion.div>
            
            <PaymentIntegrationPreview
              venues={venues}
              selectedVenue={selectedVenue}
              onPaymentComplete={(details) => {
                actions.addNotification({
                  type: 'success',
                  message: 'Booking confirmed! Check your email for details.',
                  dismissible: true
                })
              }}
              reducedMotion={ui.reducedMotion}
            />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Social Sharing Modal */}
      <SocialSharingSystem
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareData={shareVenueData}
        type="venue"
        analytics={true}
        customMessage="Check out this beautiful venue at St Saviour's Catholic Church!"
      />

      {/* Performance Monitor */}
      <PerformanceMonitor
        pageName="Venue Hire"
        trackLoadTimes={true}
        trackInteractions={true}
        trackEngagement={true}
        onPerformanceData={(data) => {
          console.log('Venue Hire performance:', data)
        }}
      />

      {/* Accessibility Enhancer */}
      <AccessibilityEnhancer
        keyboardNavigation={{
          enableArrowKeys: true,
          enableTabNavigation: true,
          enableEnterKey: true,
          onKeyPress: (key, target) => {
            if (key === 'Enter' && target?.dataset.venueId) {
              handleVenueBooking(target.dataset.venueId)
            }
          }
        }}
        screenReaderSupport={{
          announcePageChanges: true,
          announceFormValidation: true,
          provideFocusIndicators: true
        }}
        contrastEnhancement={{
          enableHighContrast: ui.highContrast,
          enableFocusVisible: true
        }}
      />
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'