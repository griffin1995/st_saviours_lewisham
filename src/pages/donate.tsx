import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Heart, 
  Building, 
  Users, 
  Clock, 
  Banknote,
  QrCode,
  ArrowRight,
  Phone,
  Gift
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
import { DonationForm, DonationStats, type DonationFormData } from '@/components/church'
import { prefersReducedMotion } from '@/lib/utils'

export default function Donate() {
  const reducedMotion = prefersReducedMotion()

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
      color: "bg-green-600"
    },
    {
      icon: Building,
      title: "Bank Transfer",
      description: "Set up a standing order directly to our parish account. Contact the office for details.",
      color: "bg-blue-600"
    },
    {
      icon: QrCode,
      title: "QR Code",
      description: "Scan the QR code in the church to make a quick donation using your mobile device.",
      color: "bg-purple-600"
    },
    {
      icon: Gift,
      title: "Legacy Giving",
      description: "Remember the parish in your will. Contact us to discuss legacy giving options.",
      color: "bg-amber-600"
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
        backgroundImage="/images/hero/church-community.jpg"
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

      {/* Why Give Section */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8 max-w-4xl mx-auto mb-16"
          >
            <Heading level="h2" align="center" className="mb-6">
              Why Your Support Matters
            </Heading>
            <Text size="xl" align="center" color="muted" className="leading-relaxed">
              Your generous donations help us maintain our beautiful church, support 
              our community programs, and reach out to those in need. Every gift, 
              large or small, makes a meaningful difference.
            </Text>
          </motion.div>

          <Grid cols={3} gap="lg">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card variant="default" padding="lg" className="text-center h-full bg-white">
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center mx-auto">
                        <benefit.icon className="h-6 w-6 text-white" />
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
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Online Donation Form */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <Grid cols={2} gap="xl" className="items-start">
            {/* Donation Form */}
            <DonationForm
              title="Make a Donation Online"
              causes={donationCauses}
              onSubmit={handleDonationSubmit}
            />

            {/* What Your Donation Supports */}
            <motion.div
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
                  <motion.div
                    key={cause.value}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={reducedMotion ? { duration: 0.3 } : { duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
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
                  </motion.div>
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
            </motion.div>
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
              <motion.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="default" padding="lg" className="text-center space-y-4 bg-gray-50 h-full">
                  <CardContent>
                    <div className="space-y-4">
                      <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto`}>
                        <method.icon className="h-8 w-8 text-white" />
                      </div>
                      <Heading level="h3" align="center" className="font-semibold">
                        {method.title}
                      </Heading>
                      <Text size="sm" color="muted" align="center">
                        {method.description}
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Impact & Transparency */}
      <DonationStats onDownloadReport={handleReportDownload} />

      {/* Contact for Questions */}
      <Section spacing="lg" background="gray">
        <Container size="md">
          <motion.div
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
          </motion.div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'