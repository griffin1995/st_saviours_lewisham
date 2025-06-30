import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
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
import { prefersReducedMotion } from '@/lib/utils'

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

export default function VenueHire() {
  const reducedMotion = prefersReducedMotion()
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleVenueBooking = (venueId: string) => {
    setSelectedVenue(venueId)
    // Scroll to enquiry form
    document.getElementById('enquiry-form')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }

  const handleEnquirySubmit = async (data: VenueEnquiryData) => {
    // Handle enquiry submission
    console.log('Venue enquiry submitted:', data)
    // In a real implementation, this would send the enquiry via email or API
    alert('Thank you for your enquiry! We will get back to you within 24 hours.')
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

      {/* Introduction */}
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
              Welcome to Our Community Spaces
            </Heading>
            <Text size="xl" align="center" color="muted" className="leading-relaxed">
              St Saviour's parish offers beautiful, well-maintained venues in the heart of Lewisham. 
              Whether you're planning a wedding reception, birthday celebration, community meeting, or 
              corporate event, our flexible spaces provide the perfect setting for your special occasion.
            </Text>
          </motion.div>

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
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Venues */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <motion.div
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
          </motion.div>

          <div className="space-y-12">
            {venues.map((venue, index) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                variant="default"
                imagePosition={index % 2 === 1 ? 'right' : 'left'}
                onBookClick={handleVenueBooking}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Booking Process */}
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
              How to Book
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Simple steps to secure your venue
            </Text>
          </motion.div>

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
              <motion.div
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
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Contact & Enquiry Form */}
      <Section spacing="lg" background="slate" id="enquiry-form">
        <Container size="lg">
          <Grid cols={2} gap="xl" className="items-start">
            {/* Contact Information */}
            <motion.div
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
            </motion.div>

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

      {/* FAQ Section */}
      <Section spacing="lg" background="gray">
        <Container size="md">
          <motion.div
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
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'