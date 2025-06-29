import React from 'react'
import Link from 'next/link'
import { Droplets, Calendar, Phone, BookOpen, Users, Heart, ArrowRight } from 'lucide-react'

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
        backgroundImage="/images/sacraments/baptism-font.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
            >
              Schedule Baptism
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
            icon={Droplets}
            title="Born Again in Christ"
            subtitle="The first and chief sacrament of forgiveness of sins"
            content={baptismContent}
            quote={quote}
            effects={baptismEffects}
            requirements={baptismRequirements}
            contactInfo={contactInfo}
            effectsColor="blue"
          />
        </Container>
      </Section>

      {/* Baptism Schedule & Process */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Baptism at St Saviour's
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              We celebrate baptisms regularly and provide comprehensive preparation for families and adults.
            </Text>
          </div>

          <Grid cols={2} gap="lg">
            {/* Infant Baptism */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Infant Baptism
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    We welcome families who wish to have their children baptized. Our preparation 
                    process helps parents understand the significance of this sacrament and their 
                    role in raising their child in the Catholic faith.
                  </Text>
                  
                  <div className="space-y-3">
                    <Text weight="bold" className="text-gray-900">
                      Baptism Schedule:
                    </Text>
                    <div className="space-y-1">
                      <Text size="sm" color="muted">• Second Sunday of each month at 12:30 PM</Text>
                      <Text size="sm" color="muted">• Fourth Sunday of each month at 12:30 PM</Text>
                      <Text size="sm" color="muted">• Special arrangements for feast days</Text>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    leftIcon={<Calendar className="h-4 w-4" />}
                  >
                    Book Preparation Course
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Adult Baptism */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Adult Baptism (RCIA)
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    Adults seeking baptism join our RCIA (Rite of Christian Initiation of Adults) 
                    program. This journey of faith formation typically takes 6-12 months and 
                    culminates in baptism at the Easter Vigil.
                  </Text>
                  
                  <div className="space-y-3">
                    <Text weight="bold" className="text-gray-900">
                      RCIA Sessions:
                    </Text>
                    <div className="space-y-1">
                      <Text size="sm" color="muted">• Wednesday evenings at 7:00 PM</Text>
                      <Text size="sm" color="muted">• September through Easter</Text>
                      <Text size="sm" color="muted">• New participants welcome anytime</Text>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    leftIcon={<BookOpen className="h-4 w-4" />}
                  >
                    Join RCIA Program
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
                Begin Your Journey of Faith
              </Heading>
              <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                Baptism is the first step in a lifelong journey with Christ. Whether for yourself 
                or your child, we're here to support and guide you through this sacred process.
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