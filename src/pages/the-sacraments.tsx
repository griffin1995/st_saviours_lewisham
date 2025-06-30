import React from 'react'
import Link from 'next/link'
import { ArrowRight, Droplets, Cross, Cookie, Heart, Gem, HandMetal, Plus } from 'lucide-react'

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
import { SacramentCard, type Sacrament } from '@/components/church'
import { prefersReducedMotion } from '@/lib/utils'

const sacraments: Sacrament[] = [
  {
    name: "Baptism",
    icon: Droplets,
    description: "The gateway to life in the Spirit and the door which gives access to the other sacraments.",
    details: "Through Baptism we are freed from sin and reborn as children of God.",
    link: "/the-sacraments/baptism",
    color: "blue"
  },
  {
    name: "Confirmation",
    icon: Cross,
    description: "Completes Christian initiation and strengthens us with the gifts of the Holy Spirit.",
    details: "Confirmation deepens baptismal grace and roots us more deeply in divine filiation.",
    link: "/the-sacraments/confirmation",
    color: "red"
  },
  {
    name: "The Eucharist",
    icon: Cookie,
    description: "The source and summit of Christian life, the Body and Blood of Christ.",
    details: "In Holy Communion, we receive Christ himself and are united with him and each other.",
    link: "/the-sacraments/the-eucharist",
    color: "amber"
  },
  {
    name: "Confession",
    icon: Heart,
    description: "The sacrament of forgiveness and reconciliation with God and the Church.",
    details: "Through confession, we receive God's mercy and are restored to grace.",
    link: "/the-sacraments/confession",
    color: "green"
  },
  {
    name: "Anointing of the Sick",
    icon: Plus,
    description: "Brings spiritual and sometimes physical healing to those who are seriously ill.",
    details: "This sacrament provides comfort, courage, and spiritual strength in times of illness.",
    link: "/the-sacraments/anointing-of-the-sick",
    color: "purple"
  },
  {
    name: "Holy Orders",
    icon: HandMetal,
    description: "The sacrament by which bishops, priests, and deacons are ordained.",
    details: "Through Holy Orders, men are consecrated to serve God and his people.",
    link: "/the-sacraments/holy-orders",
    color: "indigo"
  },
  {
    name: "Matrimony",
    icon: Gem,
    description: "The sacred covenant between a man and woman that mirrors Christ's love for the Church.",
    details: "Marriage is a lifelong partnership ordered toward the good of the spouses and children.",
    link: "/the-sacraments/matrimony",
    color: "pink"
  }
]

const sacramentCategories = [
  {
    title: "Sacraments of Initiation",
    icon: Droplets,
    color: "bg-blue-600",
    description: "Baptism, Confirmation, and Eucharist lay the foundation of Christian life. They initiate us into the Church and establish our relationship with Christ.",
    sacraments: [
      "Baptism - Rebirth in Christ",
      "Confirmation - Strengthened by the Spirit", 
      "Eucharist - Nourished by Christ's Body"
    ]
  },
  {
    title: "Sacraments of Healing",
    icon: Heart,
    color: "bg-green-600",
    description: "Confession and Anointing of the Sick continue Jesus' work of healing and forgiveness. They restore us to spiritual health and strengthen us in times of need.",
    sacraments: [
      "Confession - Forgiveness of sins",
      "Anointing - Healing and comfort"
    ]
  },
  {
    title: "Sacraments of Service",
    icon: HandMetal,
    color: "bg-purple-600",
    description: "Holy Orders and Matrimony are directed toward the salvation of others. They consecrate people to serve God and the Church in specific ways.",
    sacraments: [
      "Holy Orders - Service to the Church",
      "Matrimony - Service to family"
    ]
  }
]

export default function TheSacraments() {
  const reducedMotion = prefersReducedMotion()

  return (
    <PageLayout
      title="The Sacraments"
      description="Learn about the seven sacraments of the Catholic Church at St Saviour's. Discover how these sacred signs bring us closer to God."
      keywords="Catholic Sacraments, Baptism, Confirmation, Eucharist, Confession, Anointing, Holy Orders, Matrimony, Catholic Church"
    >
      {/* Hero Section */}
      <PageHero
        title="The Seven Sacraments"
        subtitle="Sacred Signs of Grace"
        description="The sacraments are efficacious signs of grace, instituted by Christ and entrusted to the Church."
        backgroundImage="/images/hero/church-sanctuary.jpg"
        height="large"
        overlay="medium"
      />

      {/* Introduction */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Heading level="h2" align="center" className="text-3xl lg:text-4xl font-light">
              What Are the Sacraments?
            </Heading>
            <Text size="xl" align="center" color="muted" className="leading-relaxed">
              The sacraments are visible signs of invisible grace, instituted by Christ 
              to sanctify us, to build up the body of Christ, and to give worship to God. 
              They are seven in number and are celebrated in the Catholic Church as 
              sacred encounters with the living God.
            </Text>
            
            <Grid cols={3} gap="lg" className="text-left">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                  <Cross className="h-6 w-6 text-white" />
                </div>
                <Heading level="h3" className="text-lg font-semibold">
                  Signs of Grace
                </Heading>
                <Text color="muted">
                  Each sacrament is an outward sign that communicates inward grace, 
                  making God's love tangible in our lives.
                </Text>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <Heading level="h3" className="text-lg font-semibold">
                  Christ's Presence
                </Heading>
                <Text color="muted">
                  Through the sacraments, Christ himself acts, touching our hearts 
                  and transforming our souls.
                </Text>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                  <Gem className="h-6 w-6 text-white" />
                </div>
                <Heading level="h3" className="text-lg font-semibold">
                  Church Community
                </Heading>
                <Text color="muted">
                  The sacraments unite us as one body in Christ, building up 
                  the community of faith.
                </Text>
              </div>
            </Grid>
          </div>
        </Container>
      </Section>

      {/* The Seven Sacraments */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="space-y-12">
            <div className="text-center">
              <Heading level="h2" align="center" className="mb-6">
                The Seven Sacraments
              </Heading>
              <Text size="lg" align="center" color="muted" className="max-w-3xl mx-auto">
                Each sacrament has its own unique role in our spiritual journey, 
                from initiation to healing to service.
              </Text>
            </div>

            <Grid cols={3} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {sacraments.map((sacrament, index) => (
                <SacramentCard
                  key={sacrament.name}
                  sacrament={sacrament}
                  delay={index * 0.1}
                />
              ))}
            </Grid>
          </div>
        </Container>
      </Section>

      {/* Sacrament Categories */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <Grid cols={3} gap="lg" className="grid-cols-1 lg:grid-cols-3">
            {sacramentCategories.map((category, index) => (
              <div key={category.title} className="text-center space-y-4">
                <div className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mx-auto`}>
                  <category.icon className="h-10 w-10 text-white" />
                </div>
                <Heading level="h3" className="text-2xl font-serif font-semibold">
                  {category.title}
                </Heading>
                <Text color="muted" className="leading-relaxed">
                  {category.description}
                </Text>
                <div className="space-y-1">
                  {category.sacraments.map((sacrament, idx) => (
                    <Text key={idx} size="sm" color="muted">
                      • {sacrament}
                    </Text>
                  ))}
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <Heading level="h2" className="text-3xl font-light text-white">
                Begin Your Sacramental Journey
              </Heading>
              <Text size="lg" className="text-gray-300 max-w-3xl mx-auto">
                Whether you're seeking baptism, preparing for confirmation, or exploring 
                any of the sacraments, we're here to guide and support you on your spiritual journey.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Link href="/contact-us">
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Contact Us for Information
                </Button>
              </Link>
              <Link href="/mass">
                <Button 
                  variant="secondary" 
                  size="lg"
                >
                  See Mass Times
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