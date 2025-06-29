import React from 'react'
import Link from 'next/link'
import { Cross, Calendar, Phone, BookOpen, Users, Heart, ArrowRight, Gift } from 'lucide-react'

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
        backgroundImage="/images/sacraments/confirmation-ceremony.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
            >
              Join Preparation Program
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<BookOpen className="h-5 w-5" />}
            >
              Learn About RCIA
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <SacramentInfo
            icon={Cross}
            title="Sealed with the Holy Spirit"
            subtitle="A sacrament of initiation that completes Baptism"
            content={confirmationContent}
            quote={quote}
            effects={confirmationEffects}
            requirements={confirmationRequirements}
            contactInfo={contactInfo}
            effectsColor="red"
          />
        </Container>
      </Section>

      {/* Seven Gifts & Confirmation Process */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              The Seven Gifts of the Holy Spirit
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Through Confirmation, candidates receive seven special gifts from the Holy Spirit to help them live as mature Christians.
            </Text>
          </div>

          <Grid cols={4} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              { name: "Wisdom", description: "Helps us see life from God's perspective" },
              { name: "Understanding", description: "Deepens our comprehension of faith truths" },
              { name: "Counsel", description: "Guides us to make good decisions" },
              { name: "Fortitude", description: "Gives us courage to do what is right" },
              { name: "Knowledge", description: "Helps us know God's will in our lives" },
              { name: "Piety", description: "Inspires us to worship and serve God" },
              { name: "Fear of the Lord", description: "Develops reverence and respect for God" }
            ].map((gift, index) => (
              <Card key={gift.name} variant="default" padding="md" className="bg-white text-center">
                <CardContent>
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                      <Gift className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h4" className="text-lg font-semibold">
                      {gift.name}
                    </Heading>
                    <Text size="sm" color="muted" className="leading-relaxed">
                      {gift.description}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid cols={2} gap="lg">
            {/* Youth Program */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Youth Confirmation Program
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    Our comprehensive 2-year program prepares young people (Year 9 and above) 
                    for Confirmation through weekly classes, retreats, and service opportunities.
                  </Text>
                  
                  <div className="space-y-3">
                    <Text weight="bold" className="text-gray-900">
                      Program Schedule:
                    </Text>
                    <div className="space-y-1">
                      <Text size="sm" color="muted">• Sunday mornings at 10:00 AM</Text>
                      <Text size="sm" color="muted">• September through May</Text>
                      <Text size="sm" color="muted">• Confirmation ceremony in June</Text>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    leftIcon={<Calendar className="h-4 w-4" />}
                  >
                    Enroll in Program
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Adult Confirmation */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Adult Confirmation (RCIA)
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    Adults who have been baptized but not confirmed join our RCIA process 
                    to complete their Christian initiation and receive the fullness of the Spirit.
                  </Text>
                  
                  <div className="space-y-3">
                    <Text weight="bold" className="text-gray-900">
                      RCIA Sessions:
                    </Text>
                    <div className="space-y-1">
                      <Text size="sm" color="muted">• Wednesday evenings at 7:00 PM</Text>
                      <Text size="sm" color="muted">• September through Easter</Text>
                      <Text size="sm" color="muted">• Confirmation at Easter Vigil</Text>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    leftIcon={<BookOpen className="h-4 w-4" />}
                  >
                    Join RCIA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <Heading level="h2" className="text-3xl font-light text-white">
                Come, Holy Spirit
              </Heading>
              <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                Confirmation is a beautiful milestone in your faith journey. Whether you're a young person 
                or an adult, we invite you to discover the power of the Holy Spirit in your life.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Link href="/contact-us">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Phone className="h-5 w-5" />}
                >
                  Contact Us Today
                </Button>
              </Link>
              <Link href="/the-sacraments">
                <Button 
                  variant="secondary" 
                  size="lg"
                  leftIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Explore Other Sacraments
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