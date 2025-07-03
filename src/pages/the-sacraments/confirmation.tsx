import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  PlusIcon as Cross, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  UserGroupIcon as Users, 
  HeartIcon as Heart, 
  ArrowRightIcon as ArrowRight, 
  GiftIcon as Gift 
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

export default function Confirmation() {
  const reducedMotion = prefersReducedMotion()

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
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "But you will receive power when the Holy Spirit comes upon you; and you will be my witnesses",
    source: "Acts 1:8"
  }

  return (
    <PageLayout
      title="Confirmation"
      description="Learn about the sacrament of Confirmation at St Saviour's Catholic Church. Information on preparation, classes, and celebrating this important milestone in faith."
      keywords="Catholic Confirmation, Confirmation Classes, RCIA, Youth Confirmation, Adult Confirmation, Gifts of Holy Spirit"
    >
      {/* Hero Section */}
      <PageHero
        title="Confirmation"
        subtitle="Strengthened by the Spirit"
        description="Confirmation completes Christian initiation and strengthens us with the gifts of the Holy Spirit."
        backgroundImage="/images/inside-church-aisle.jpg"
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
              Join Preparation Program
            </Button>
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<BookOpen className="h-5 w-5" />}
              className="bg-white text-slate-900 hover:bg-gray-100"
            >
              Learn About RCIA
            </Button>
          </Flex>
        }
      />

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

      {/* Seven Gifts & Confirmation Process */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <Grid cols={2} gap="xl" className="items-start">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="relative">
                <motion.div
                  className="absolute -left-4 top-0 w-1 h-12 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"
                  initial={reducedMotion ? { opacity: 0 } : { height: 0 }}
                  whileInView={reducedMotion ? { opacity: 1 } : { height: 48 }}
                  transition={reducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 1, delay: 0.3 }
                  }
                  viewport={{ once: true }}
                />
                <Heading level="h2" color="white" className="text-3xl lg:text-4xl font-light">
                  The Seven Gifts of the Holy Spirit
                </Heading>
              </div>
              <Text size="xl" className="text-gray-100 leading-relaxed">
                Through Confirmation, candidates receive seven special gifts from the Holy Spirit 
                to help them live as mature Christians and witnesses to Christ in the world.
              </Text>
            </div>
            
            {/* Right Column - Gift Cards Grid */}
            <div className="grid grid-cols-2 gap-4">

              {[
                { name: "Wisdom", description: "Helps us see life from God's perspective" },
                { name: "Understanding", description: "Deepens our comprehension of faith truths" },
                { name: "Counsel", description: "Guides us to make good decisions" },
                { name: "Fortitude", description: "Gives us courage to do what is right" },
                { name: "Knowledge", description: "Helps us know God's will in our lives" },
                { name: "Piety", description: "Inspires us to worship and serve God" },
                { name: "Fear of the Lord", description: "Develops reverence and respect for God" }
              ].map((gift, index) => (
                <Card key={gift.name} variant="default" padding="sm" className="bg-white/10 backdrop-blur-sm border border-slate-600 text-center">
                  <CardContent>
                    <div className="space-y-2">
                      <div className="w-8 h-8 icon-container-white rounded-full flex items-center justify-center mx-auto">
                        <Gift className="h-4 w-4 text-black" />
                      </div>
                      <Heading level="h4" className="text-sm font-semibold text-white">
                        {gift.name}
                      </Heading>
                      <Text size="xs" className="text-gray-200 leading-relaxed">
                        {gift.description}
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Grid>

          {/* Section Divider */}
          <div className="flex justify-center pt-16 pb-8">
            <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '0.5px' }}></div>
          </div>

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

      {/* Call to Action */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Heading level="h2" className="text-3xl font-light text-white text-center">
                  Come, Holy Spirit
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
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'