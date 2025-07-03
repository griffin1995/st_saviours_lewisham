import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  BeakerIcon as Droplets, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  UserGroupIcon as Users, 
  HeartIcon as Heart, 
  ArrowRightIcon as ArrowRight 
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
import { prefersReducedMotion } from '@/lib/utils'

export default function Baptism() {
  const reducedMotion = prefersReducedMotion()

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
      {/* Hero Section */}
      <PageHero
        title="Baptism"
        subtitle="The Sacrament of New Life"
        description="The gateway to life in the Spirit and the door which gives access to the other sacraments."
        backgroundImage="/images/candles.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
              className="bg-white text-slate-900 hover:bg-gray-100"
            >
              Start Your Baptism Journey
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
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
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'