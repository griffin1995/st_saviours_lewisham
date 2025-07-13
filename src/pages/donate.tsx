import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PieElement, ArcElement } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { 
  HeartIcon as Heart, 
  BuildingOfficeIcon as Building, 
  UsersIcon as Users, 
  ClockIcon as Clock, 
  BanknotesIcon as Banknote,
  QrCodeIcon as QrCode,
  ArrowRightIcon as ArrowRight,
  PhoneIcon as Phone,
  GiftIcon as Gift,
  ChartBarIcon,
  CurrencyDollarIcon,
  HandRaisedIcon,
  SparklesIcon,
  CheckCircleIcon
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
import { DonationForm, DonationStats, type DonationFormData } from '@/components/church'
import { ScriptureCard } from '@/components/enhanced/ScriptureCard'
import { EnhancedDonationTracker } from '@/components/enhanced/EnhancedDonationTracker'
import { PaymentIntegrationPreview } from '@/components/enhanced/PaymentIntegrationPreview'
import { DonationImpactCalculator } from '@/components/enhanced/DonationImpactCalculator'
import { RecurringDonationManager } from '@/components/enhanced/RecurringDonationManager'
import { DonationTestimonials } from '@/components/enhanced/DonationTestimonials'
import { SocialSharingSystem } from '@/components/enhanced/SocialSharingSystem'
import { PerformanceMonitor } from '@/components/enhanced/PerformanceMonitor'
import { AccessibilityEnhancer } from '@/components/enhanced/AccessibilityEnhancer'
import { Motion, fadeInUp, reverentReveal, staggerChildren } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import { prefersReducedMotion } from '@/lib/utils'
import { useUI, useActions } from '@/stores/churchStore'

// Chart.js registration
ChartJS.register(CategoryScale, LinearScale, BarElement, PieElement, ArcElement, Title, Tooltip, Legend)

export default function Donate() {
  const ui = useUI()
  const actions = useActions()
  const reducedMotion = prefersReducedMotion()
  const [donationStats, setDonationStats] = useState<{[key: string]: {amount: number, donors: number, impact: number}}>({})
  const [selectedCause, setSelectedCause] = useState<string | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [shareDonationData, setShareDonationData] = useState<any>(null)
  const [totalRaised, setTotalRaised] = useState(125000)
  const [donorCount, setDonorCount] = useState(287)
  const { ref: analyticsRef, inView: analyticsInView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Enhanced page initialization
  useEffect(() => {
    actions.addNotification({
      type: 'info',
      message: 'Welcome to our Donation page - your generosity makes a difference',
      dismissible: true
    })
    
    // Load donation statistics from localStorage
    const savedStats = localStorage.getItem('donation-stats')
    if (savedStats) {
      setDonationStats(JSON.parse(savedStats))
    }
  }, [])

  const handleDonationShare = useCallback((cause: any) => {
    setShareDonationData(cause)
    setIsShareModalOpen(true)
  }, [])

  const handleImpactCalculation = useCallback((amount: number, cause: string) => {
    actions.addNotification({
      type: 'success',
      message: `£${amount} donation to ${cause} will make a significant impact!`,
      dismissible: true
    })
  }, [])

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

  // Donation analytics data for Chart.js
  const donationByMethodData = {
    labels: ['Online', 'Collection', 'Bank Transfer', 'Legacy'],
    datasets: [
      {
        data: [45, 30, 20, 5],
        backgroundColor: ['#d4af37', '#1a365d', '#16a34a', '#dc2626'],
        borderColor: '#ffffff',
        borderWidth: 2
      }
    ]
  }

  const causeFundingData = {
    labels: donationCauses.map(cause => cause.label.substring(0, 12) + '..'),
    datasets: [
      {
        label: 'Amount Raised (£)',
        data: donationCauses.map(cause => donationStats[cause.value]?.amount || 0),
        backgroundColor: 'rgba(212, 175, 55, 0.6)',
        borderColor: '#d4af37',
        borderWidth: 1
      },
      {
        label: 'Number of Donors',
        data: donationCauses.map(cause => donationStats[cause.value]?.donors || 0),
        backgroundColor: 'rgba(26, 54, 93, 0.6)',
        borderColor: '#1a365d',
        borderWidth: 1
      }
    ]
  }

  const handleDonationSubmit = async (data: DonationFormData) => {
    // Handle donation submission
    console.log('Donation submitted:', data)
    // In a real implementation, this would integrate with Stripe or another payment processor
  }

  const handleReportDownload = () => {
    // Handle annual report download
    console.log('Downloading annual report...')
    // In a real implementation, this would download the PDF
  }

  const benefits = [
    {
      icon: Building,
      title: "Maintain Our Church",
      description: "Keep our sacred space beautiful and welcoming for worship, prayer, and community gatherings."
    },
    {
      icon: Users,
      title: "Support Programs", 
      description: "Fund youth activities, adult education, community outreach, and pastoral care programs."
    },
    {
      icon: Heart,
      title: "Serve Others",
      description: "Enable our outreach to those in need through food banks, visiting programs, and emergency assistance."
    }
  ]

  const givingMethods = [
    {
      icon: Banknote,
      title: "Collection Basket",
      description: "Place your donation in the collection basket during Mass on Sundays.",
      color: "bg-navy-600"
    },
    {
      icon: Building,
      title: "Bank Transfer",
      description: "Set up a standing order directly to our parish account. Contact the office for details.",
      color: "bg-navy-700"
    },
    {
      icon: QrCode,
      title: "QR Code",
      description: "Scan the QR code in the church to make a quick donation using your mobile device.",
      color: "bg-navy-800"
    },
    {
      icon: Gift,
      title: "Legacy Giving",
      description: "Remember the parish in your will. Contact us to discuss legacy giving options.",
      color: "bg-navy-500"
    }
  ]

  const donationCauses = [
    { value: 'general', label: 'General Parish Fund', description: 'Support our daily operations, utilities, and general parish needs.' },
    { value: 'building', label: 'Building Maintenance', description: 'Help preserve our beautiful church building for future generations.' },
    { value: 'outreach', label: 'Community Outreach', description: 'Support our work with those in need in the local community.' },
    { value: 'youth', label: 'Youth Programs', description: 'Fund activities and resources for our children and young people.' },
    { value: 'music', label: 'Music Ministry', description: 'Support our choir and liturgical music programs.' }
  ]

  return (
    <PageLayout
      title="Donate"
      description="Support St Saviour's Catholic Church through online donations. Help us continue our mission of faith, community, and service."
      keywords="Church Donations, Online Giving, Support Parish, Catholic Church Funding, Tithe, Offering, Gift Aid"
    >
      {/* Hero Section */}
      <PageHero
        title="Support Our Mission"
        subtitle="Your Generosity Makes a Difference"
        description="Help us continue our work of faith, community, and service through your generous donations."
        backgroundImage="/images/hero/donation-support.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Heart className="h-5 w-5" />}
            >
              Donate Now
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Phone className="h-5 w-5" />}
            >
              Contact Us
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
                Called to Generous Giving
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '160px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                Discover the joy of giving as Christ taught us - generous hearts building God's kingdom
              </p>
            </Motion.div>
            
            <div className="max-w-4xl mx-auto">
              <ScriptureCard
                displayMode="themed"
                theme="generosity"
                showReflection={true}
                reducedMotion={ui.reducedMotion}
              />
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Donation Analytics Dashboard */}
      {analyticsInView && (
        <Section spacing="lg" background="white">
          <Container size="lg">
            <animated.div ref={analyticsRef} style={analyticsSpring}>
              <div className="text-center mb-12">
                <h2 className={`${typographyScale.h2} text-slate-900 mb-6 relative`}>
                  Donation Impact & Transparency
                  <Motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ width: '200px' }}
                  />
                </h2>
                <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
                  See how your generous donations are making a real difference in our community
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <Card variant="default" padding="lg" className="bg-white text-center shadow-lg">
                  <CardContent>
                    <div className="w-16 h-16 bg-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <CurrencyDollarIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-2`}>
                      £{totalRaised.toLocaleString()}
                    </h3>
                    <p className={`${typographyScale.body} text-gray-600`}>Total Raised This Year</p>
                  </CardContent>
                </Card>
                
                <Card variant="default" padding="lg" className="bg-white text-center shadow-lg">
                  <CardContent>
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-2`}>
                      {donorCount}
                    </h3>
                    <p className={`${typographyScale.body} text-gray-600`}>Generous Donors</p>
                  </CardContent>
                </Card>
                
                <Card variant="default" padding="lg" className="bg-white text-center shadow-lg">
                  <CardContent>
                    <div className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-2`}>
                      5
                    </h3>
                    <p className={`${typographyScale.body} text-gray-600`}>Active Causes</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <Card variant="default" padding="lg" className="bg-white shadow-lg">
                  <CardContent>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-6 text-center`}>
                      Donation Methods
                    </h3>
                    <div className="h-64">
                      <Pie
                        data={donationByMethodData}
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
                
                <Card variant="default" padding="lg" className="bg-white shadow-lg">
                  <CardContent>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-6 text-center`}>
                      Funding by Cause
                    </h3>
                    <div className="h-64">
                      <Bar
                        data={causeFundingData}
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
              </div>
            </animated.div>
          </ScrollRevealSection>
        </Container>
      </Section>
      )}

      {/* Why Give Section */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <animated.div style={heroSpring} className="text-center space-y-8 max-w-4xl mx-auto mb-16">
            <Heading level="h2" align="center" className="mb-6">
              Why Your Support Matters
            </Heading>
            <Text size="xl" align="center" color="muted" className="leading-relaxed">
              Your generous donations help us maintain our beautiful church, support 
              our community programs, and reach out to those in need. Every gift, 
              large or small, makes a meaningful difference.
            </Text>
          </animated.div>

          <Grid cols={3} gap="lg">
            {benefits.map((benefit, index) => (
              <Motion.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={!reducedMotion ? { y: -8, transition: { duration: 0.2 } } : {}}
              >
                <Card variant="default" padding="lg" className="text-center h-full bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent>
                    <div className="space-y-4">
                      <Motion.div 
                        className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center mx-auto"
                        whileHover={!reducedMotion ? { scale: 1.1, rotate: 5 } : {}}
                      >
                        <benefit.icon className="h-6 w-6 text-white" />
                      </Motion.div>
                      <Heading level="h3" align="center" className="font-semibold">
                        {benefit.title}
                      </Heading>
                      <Text color="muted" align="center">
                        {benefit.description}
                      </Text>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDonationShare(benefit)}
                        className="mt-4"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Enhanced Donation Tracking */}
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
                Smart Donation Tracking
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '160px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                Track your giving history and see the real-time impact of your donations
              </p>
            </Motion.div>
            
            <EnhancedDonationTracker
              totalDonated={totalRaised}
              donorCount={donorCount}
              onTrackDonation={(amount, cause) => {
                actions.addNotification({
                  type: 'success',
                  message: `£${amount} donation to ${cause} has been tracked!`,
                  dismissible: true
                })
              }}
              reducedMotion={ui.reducedMotion}
            />
          </ScrollRevealSection>
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
                Secure Payment Options
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
                Choose from multiple secure payment methods including cards, bank transfer, and digital wallets
              </p>
            </Motion.div>
            
            <PaymentIntegrationPreview
              donationCauses={donationCauses}
              onPaymentMethodSelect={(method) => {
                actions.addNotification({
                  type: 'info',
                  message: `${method} payment method selected. Proceed to secure checkout.`,
                  dismissible: true
                })
              }}
              reducedMotion={ui.reducedMotion}
            />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Donation Impact Calculator */}
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
                Calculate Your Impact
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                See exactly how your donation will be used and the difference it will make
              </p>
            </Motion.div>
            
            <DonationImpactCalculator
              donationCauses={donationCauses}
              onCalculateImpact={handleImpactCalculation}
              reducedMotion={ui.reducedMotion}
            />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Recurring Donation Manager */}
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
                Set Up Regular Giving
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
                Create and manage recurring donations to support our mission consistently
              </p>
            </Motion.div>
            
            <RecurringDonationManager
              donationCauses={donationCauses}
              onSetupRecurring={(amount, frequency, cause) => {
                actions.addNotification({
                  type: 'success',
                  message: `Recurring £${amount} ${frequency} donation to ${cause} has been set up!`,
                  dismissible: true
                })
              }}
              reducedMotion={ui.reducedMotion}
            />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Online Donation Form */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <Grid cols={2} gap="xl" className="items-start">
            {/* Donation Form */}
            <DonationForm
              title="Make a Donation Online"
              causes={donationCauses}
              onSubmit={handleDonationSubmit}
            />

            {/* What Your Donation Supports */}
            <Motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Heading level="h3" className="text-xl font-semibold">
                What Your Donation Supports
              </Heading>
              
              <div className="space-y-4">
                {donationCauses.map((cause, index) => (
                  <Motion.div
                    key={cause.value}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={reducedMotion ? { duration: 0.3 } : { duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={!reducedMotion ? { x: 4 } : {}}
                  >
                    <Card variant="outlined" padding="md" className="bg-white">
                      <CardContent>
                        <Flex align="start" gap="md">
                          <div className="w-10 h-10 bg-gold-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Heart className="h-5 w-5 text-white" />
                          </div>
                          <div className="space-y-1">
                            <Heading level="h4" className="font-semibold">
                              {cause.label}
                            </Heading>
                            <Text size="sm" color="muted">
                              {cause.description}
                            </Text>
                          </div>
                        </Flex>
                      </CardContent>
                    </Card>
                  </Motion.div>
                ))}
              </div>

              {/* Gift Aid Information */}
              <Card variant="outlined" padding="md" className="bg-blue-50 border-blue-200">
                <CardContent>
                  <div className="space-y-2">
                    <Heading level="h4" className="font-semibold text-blue-900">
                      Gift Aid
                    </Heading>
                    <Text size="sm" className="text-blue-800">
                      UK taxpayers can increase their donation by 25% at no extra cost 
                      through Gift Aid. We'll provide the necessary forms after your donation.
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </Motion.div>
          </Grid>
        </Container>
      </Section>

      {/* Other Ways to Give */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Other Ways to Give
            </Heading>
            <Text size="xl" align="center" color="muted">
              Choose the giving method that works best for you
            </Text>
          </motion.div>

          <Grid cols={4} gap="lg">
            {givingMethods.map((method, index) => (
              <Motion.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={!reducedMotion ? { y: -8, transition: { duration: 0.2 } } : {}}
              >
                <Card variant="default" padding="lg" className="text-center space-y-4 bg-gray-50 h-full shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent>
                    <div className="space-y-4">
                      <Motion.div 
                        className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto`}
                        whileHover={!reducedMotion ? { scale: 1.1, rotate: 5 } : {}}
                      >
                        <method.icon className="h-8 w-8 text-white" />
                      </Motion.div>
                      <Heading level="h3" align="center" className="font-semibold">
                        {method.title}
                      </Heading>
                      <Text size="sm" color="muted" align="center">
                        {method.description}
                      </Text>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDonationShare(method)}
                        className="mt-4"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Donation Testimonials */}
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
                Stories of Generosity
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                Hear from fellow parishioners about the joy and impact of giving
              </p>
            </Motion.div>
            
            <DonationTestimonials
              testimonials={[
                {
                  name: "Sarah Collins",
                  quote: "Giving to St Saviour's has become a beautiful part of my spiritual journey. Seeing the difference it makes in our community fills my heart with joy.",
                  cause: "General Parish Fund",
                  amount: "£50/month"
                },
                {
                  name: "Michael Thompson", 
                  quote: "Supporting the youth programs means investing in the future of our faith community. These young people are remarkable.",
                  cause: "Youth Programs",
                  amount: "£25/month"
                },
                {
                  name: "Mary Johnson",
                  quote: "The building maintenance fund helps preserve this sacred space for future generations. It's our heritage and our responsibility.",
                  cause: "Building Maintenance", 
                  amount: "£100/quarter"
                }
              ]}
              reducedMotion={ui.reducedMotion}
            />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Impact & Transparency */}
      <DonationStats onDownloadReport={handleReportDownload} />

      {/* Contact for Questions */}
      <Section spacing="lg" background="white">
        <Container size="md">
          <Motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="space-y-6">
              <Heading level="h2" align="center">
                Questions About Giving?
              </Heading>
              <Text size="xl" align="center" color="muted" className="max-w-2xl mx-auto">
                We're happy to discuss donation options, Gift Aid, legacy giving, 
                or answer any questions about supporting our parish.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Link href="/contact-us">
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                  className="bg-white text-slate-900 hover:bg-gray-100"
                >
                  Contact Us
                </Button>
              </Link>
              <a href="tel:+442088527411">
                <Button 
                  variant="outline" 
                  size="lg"
                  leftIcon={<Phone className="h-5 w-5" />}
                >
                  Call: 020 8852 7411
                </Button>
              </a>
            </Flex>
          </Motion.div>
        </Container>
      </Section>

      {/* Social Sharing Modal */}
      <SocialSharingSystem
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareData={shareDonationData}
        type="donation-cause"
        analytics={true}
        customMessage="Support this important cause at St Saviour's Catholic Church!"
      />

      {/* Performance Monitor */}
      <PerformanceMonitor
        pageName="Donations"
        trackLoadTimes={true}
        trackInteractions={true}
        trackEngagement={true}
        trackDonationBehavior={true}
        onPerformanceData={(data) => {
          console.log('Donation performance:', data)
        }}
      />

      {/* Accessibility Enhancer */}
      <AccessibilityEnhancer
        keyboardNavigation={{
          enableArrowKeys: true,
          enableTabNavigation: true,
          enableEnterKey: true,
          onKeyPress: (key, target) => {
            if (key === 'Enter' && target?.dataset.causeValue) {
              setSelectedCause(target.dataset.causeValue)
            } else if (key === 'd' && target?.dataset.donationAmount) {
              handleImpactCalculation(parseInt(target.dataset.donationAmount), 'General Fund')
            }
          }
        }}
        screenReaderSupport={{
          announcePageChanges: true,
          announceDonationUpdates: true,
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