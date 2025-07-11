import React from 'react'
import { motion } from 'framer-motion'
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
  EnvelopeIcon as Mail
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
import { prefersReducedMotion } from '@/lib/utils'

export default function FindUs() {
  const reducedMotion = prefersReducedMotion()

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
          "National Rail from London Bridge",
          "National Rail from Victoria", 
          "National Rail from Cannon Street",
          "DLR from Canary Wharf"
        ]
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
          "Night buses: N21, N136, N199"
        ]
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
          "Lewisham Shopping Centre car park",
          "River Park Retail Park"
        ],
        highlight: "Postcode for Sat Nav: SE13 6AA"
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
      {/* Hero Section */}
      <PageHero
        title="Find Us"
        subtitle="Visit Our Church"
        description="Located in the heart of Lewisham, we're easily accessible by public transport and car."
        backgroundImage="/images/pexels-pixabay-218480.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Navigation className="h-5 w-5" />}
            >
              Get Directions
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

      {/* Interactive Map */}
      <Section spacing="sm" background="slate">
        <Container size="lg">
          <MapEmbed
            address="175 Lewisham High Street, London SE13 6AA"
            postcode="SE13 6AA"
            embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.234!2d-0.013558!3d51.462778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a9b2d5e0f123%3A0xabcdef1234567890!2s175%20Lewisham%20High%20St%2C%20London%20SE13%206AA!5e0!3m2!1sen!2suk!4v1640000000000!5m2!1sen!2suk"
            height="lg"
            showDirections={true}
          />
        </Container>
      </Section>

      {/* Transport Options */}
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

          <Grid cols={3} gap="lg">
            {transportMethods.map((method, index) => (
              <LocationCard
                key={method.title}
                icon={method.icon}
                iconColor={method.iconColor}
                title={method.title}
                locationInfo={method.locationInfo}
              />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Accessibility & Facilities */}
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
              <Flex align="center" gap="md">
                <Accessibility className="h-6 w-6 text-white" />
                <Heading level="h3" color="white" className="text-2xl font-semibold">
                  Accessibility
                </Heading>
              </Flex>
              
              <div className="space-y-4">
                {accessibilityFeatures.map((feature, index) => (
                  <Card key={index} variant="default" padding="md" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white transition-all duration-300">
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
                              <Text key={idx} size="sm" className="text-gray-200">
                                • {item}
                              </Text>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
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
              <Flex align="center" gap="md">
                <Clock className="h-6 w-6 text-white" />
                <Heading level="h3" color="white" className="text-2xl font-semibold">
                  Facilities & Information
                </Heading>
              </Flex>
              
              <div className="space-y-4">
                {facilityInfo.map((facility, index) => (
                  <Card key={index} variant="default" padding="md" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white transition-all duration-300">
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
                              <Text key={idx} size="sm" className="text-gray-200">
                                • {item}
                              </Text>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </Grid>
        </Container>
      </Section>

      {/* Contact for Directions */}
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
          </motion.div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'