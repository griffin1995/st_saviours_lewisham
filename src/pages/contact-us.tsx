import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

// New modern component system
import { PageLayout, PageHero } from '@/components/layout'
import { getContactPhone, getContactEmail, getContactAddress } from '@/lib/cms-content'
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
import { ContactForm, ContactInfo, type ContactFormData } from '@/components/church'
import { prefersReducedMotion } from '@/lib/utils'

export default function ContactUs() {
  const reducedMotion = prefersReducedMotion()

  // Handle form submission
  const handleFormSubmit = async (formData: ContactFormData) => {
    // TODO: Implement actual form submission logic
    // For now, simulate submission
    console.log('Form submission:', formData)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Contact methods for quick contact section
  const quickContactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      value: getContactPhone(),
      type: 'phone' as const,
      link: `tel:${getContactPhone().replace(/\s/g, '')}`
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: getContactEmail(),
      type: 'email' as const,
      link: `mailto:${getContactEmail()}`
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: [getContactAddress()],
      type: 'address' as const
    }
  ]

  // Detailed contact information
  const detailedContacts = [
    {
      icon: MapPin,
      title: 'Address',
      value: [
        'St Saviour\'s Catholic Church',
        'Lewisham High Street', 
        'London SE13 6EE',
        'United Kingdom'
      ],
      type: 'address' as const
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '020 8852 7411',
      type: 'phone' as const,
      link: 'tel:02088527411'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'parish@saintsaviours.org.uk',
      type: 'email' as const,
      link: 'mailto:parish@saintsaviours.org.uk'
    }
  ]

  // Office hours
  const officeHours = [
    'Monday - Friday: 9:00 AM - 5:00 PM',
    'Saturday: 10:00 AM - 2:00 PM',
    'Sunday: Closed (except for emergencies)'
  ]

  // Staff information
  const staff = [
    {
      name: 'Fr. Krzysztof Krzyskow',
      title: 'Parish Priest',
      directEmailPath: '/email-fr-krzysztof-krzyskow'
    },
    {
      name: 'Revd. Carlos Lozano',
      title: 'Associate Priest',
      directEmailPath: '/email-revd-carlos-lozano'
    }
  ]

  // Emergency contact
  const emergencyContact = {
    title: 'Emergency Contact',
    description: 'For urgent pastoral care outside office hours (serious illness, death, emergency baptism):',
    phone: '020 8852 7411',
    additionalInfo: 'Please leave a clear message and we will respond as soon as possible.'
  }

  return (
    <PageLayout
      title="Contact Us"
      description="Get in touch with St Saviour's Catholic Church in Lewisham. Find our contact information, office hours, and send us a message."
      keywords="Contact St Saviours, Parish Office, Church Contact, Lewisham Catholic Church, Get in Touch"
    >
      {/* Hero Section */}
      <PageHero
        title="Contact Us"
        subtitle="Get in Touch"
        description="We'd love to hear from you. Reach out with any questions or to learn more about our community."
        pageName="contact-us"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Phone className="h-5 w-5" />}
            >
              Call Parish
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Mail className="h-5 w-5" />}
            >
              Send Email
            </Button>
          </Flex>
        }
      />

      {/* Quick Contact Info */}
      <Section spacing="md" background="white">
        <Container size="lg">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Get In Touch Today
            </Heading>
            <Text size="xl" align="center" color="muted">
              Multiple ways to reach our parish community
            </Text>
          </motion.div>

          <ContactInfo 
            primaryContacts={quickContactMethods}
            layout="grid"
          />
        </Container>
      </Section>

      {/* Contact Form & Detailed Info */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <Grid cols={2} gap="xl" className="lg:grid-cols-2">
            {/* Contact Form */}
            <ContactForm 
              title="Send Us a Message"
              description="Fill out the form below and we'll get back to you as soon as possible."
              onSubmit={handleFormSubmit}
              successMessage="Thank you for your message. We'll get back to you soon!"
            />

            {/* Contact Information */}
            <div className="space-y-8">
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card variant="default" padding="lg" className="bg-white">
                  <CardContent>
                    <div className="space-y-6">
                      <Heading level="h2" className="text-3xl font-light mb-6">
                        Contact Information
                      </Heading>
                      
                      <ContactInfo 
                        primaryContacts={detailedContacts}
                        layout="vertical"
                      />
                      
                      {/* Office Hours */}
                      <div className="pt-6 border-t border-gray-200">
                        <Heading level="h3" className="font-semibold mb-3">
                          Office Hours
                        </Heading>
                        <div className="space-y-1">
                          {officeHours.map((hours, index) => (
                            <Text key={index} color="muted">
                              {hours}
                            </Text>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Emergency & Staff Contact */}
              <ContactInfo 
                emergencyContact={emergencyContact}
                staff={staff}
              />
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Map Section */}
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
              Find Us
            </Heading>
            <Text size="xl" align="center" color="muted">
              Located in the heart of Lewisham
            </Text>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card variant="default" padding="none" className="overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-12 w-12 text-gold-600 mx-auto" />
                  <div>
                    <Text weight="medium" className="text-gray-700">
                      Interactive Map Coming Soon
                    </Text>
                    <Text size="sm" color="muted">
                      St Saviour's Catholic Church, Lewisham High Street, SE13 6EE
                    </Text>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    leftIcon={<MapPin className="h-4 w-4" />}
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" background="white">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <Heading level="h2" align="center">
              We're Here to Help
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Whether you're a longtime parishioner or considering joining our community, 
              we're here to support you on your spiritual journey.
            </Text>
            
            <Flex justify="center" gap="md" className="pt-4">
              <Button 
                variant="primary" 
                size="lg" 
                leftIcon={<Phone className="h-5 w-5" />}
              >
                Call Us Today
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                leftIcon={<MapPin className="h-5 w-5" />}
              >
                Visit Our Church
              </Button>
            </Flex>
          </motion.div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'