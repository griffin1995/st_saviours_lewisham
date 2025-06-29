import React from 'react'
import Link from 'next/link'
import { Cookie, Calendar, Phone, BookOpen, Users, Heart, ArrowRight, Utensils } from 'lucide-react'

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

export default function TheEucharist() {
  const reducedMotion = prefersReducedMotion()

  const eucharistContent = [
    "The Eucharist is the source and summit of the Christian life. In this most blessed sacrament, Jesus Christ is truly present—body, blood, soul, and divinity—under the appearances of bread and wine.",
    "Through the Eucharist, we are intimately united with Christ and nourished for our journey of faith. It is both a sacrifice and a sacred meal, making present the one sacrifice of Christ on Calvary and feeding us with the Bread of Life."
  ]

  const eucharistEffects = [
    {
      title: "Union with Christ",
      description: "We become one with Jesus in the most intimate way possible"
    },
    {
      title: "Spiritual Nourishment",
      description: "Our souls are fed with the true food that leads to eternal life"
    },
    {
      title: "Forgiveness of Venial Sins",
      description: "Daily faults are cleansed and we are strengthened against temptation"
    },
    {
      title: "Unity with the Church",
      description: "We are bound together as one body in Christ with all believers"
    },
    {
      title: "Pledge of Glory",
      description: "We receive a foretaste of the heavenly banquet to come"
    }
  ]

  const eucharistRequirements = [
    {
      title: "First Holy Communion",
      items: [
        "Must be baptized Catholic",
        "Complete 2-year preparation program",
        "Usually received around age 7-8",
        "Understand the Real Presence of Christ",
        "Participate in practice sessions"
      ]
    },
    {
      title: "State of Grace",
      items: [
        "Free from mortal sin",
        "Receive confession if needed",
        "Proper intention and reverence",
        "Faith in the Real Presence",
        "Desire to receive Christ"
      ]
    },
    {
      title: "Eucharistic Fast",
      items: [
        "One hour fast from food and drink",
        "Water and medicine permitted",
        "Shorter fast for elderly and sick",
        "Spiritual preparation recommended",
        "Arrive early for quiet prayer"
      ]
    }
  ]

  const contactInfo = {
    title: "Join Us for Mass",
    description: "Experience the beauty and mystery of the Eucharist at St Saviour's. All are welcome to join us for Mass and encounter Christ in the Blessed Sacrament.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "Take this, all of you, and eat of it, for this is my body, which will be given up for you",
    source: "Jesus at the Last Supper"
  }

  return (
    <PageLayout
      title="The Eucharist"
      description="Learn about the Eucharist, the source and summit of Christian life at St Saviour's Catholic Church. Information on Holy Communion and Mass times."
      keywords="Catholic Eucharist, Holy Communion, Mass, Real Presence, Transubstantiation, First Communion, Body of Christ"
    >
      {/* Hero Section */}
      <PageHero
        title="The Holy Eucharist"
        subtitle="Source and Summit of Christian Life"
        description="The Eucharist is the Body and Blood of Christ, truly present under the appearances of bread and wine."
        backgroundImage="/images/sacraments/eucharist-altar.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
            >
              See Mass Times
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<BookOpen className="h-5 w-5" />}
            >
              First Communion Classes
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <SacramentInfo
            icon={Cookie}
            title="The Bread of Life"
            subtitle="The source and summit of the Christian life"
            content={eucharistContent}
            quote={quote}
            effects={eucharistEffects}
            requirements={eucharistRequirements}
            contactInfo={contactInfo}
            effectsColor="amber"
          />
        </Container>
      </Section>

      {/* The Holy Mass */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              The Celebration of the Eucharist
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              The Mass is the celebration of the Eucharist, where the sacrifice of Calvary is made present and we receive Christ himself.
            </Text>
          </div>

          <Grid cols={2} gap="lg">
            {/* Liturgy of the Word */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Liturgy of the Word
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    In the first part of Mass, we listen to God's word through readings 
                    from Scripture and the priest's homily, preparing our hearts to receive Christ.
                  </Text>
                  
                  <div className="space-y-2">
                    {[
                      "First Reading (Old Testament)",
                      "Responsorial Psalm", 
                      "Second Reading (New Testament)",
                      "Gospel Acclamation",
                      "Gospel Reading",
                      "Homily and Creed"
                    ].map((item, index) => (
                      <Flex key={index} align="center" gap="sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <Text size="sm" color="muted">{item}</Text>
                      </Flex>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liturgy of the Eucharist */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                      <Cookie className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Liturgy of the Eucharist
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    In the second part of Mass, bread and wine are transformed into the Body 
                    and Blood of Christ through the power of the Holy Spirit and the priest's consecration.
                  </Text>
                  
                  <div className="space-y-2">
                    {[
                      "Preparation of the Gifts",
                      "Eucharistic Prayer",
                      "Consecration",
                      "Lord's Prayer",
                      "Sign of Peace",
                      "Holy Communion"
                    ].map((item, index) => (
                      <Flex key={index} align="center" gap="sm">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        <Text size="sm" color="muted">{item}</Text>
                      </Flex>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* First Holy Communion */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              First Holy Communion at St Saviour's
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              We prepare children and adults to receive their First Holy Communion with comprehensive formation programs.
            </Text>
          </div>

          <Grid cols={2} gap="lg">
            {/* Children's Program */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Children's First Communion
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    Our 2-year preparation program helps children understand the significance 
                    of the Eucharist and prepares them to receive Jesus with faith and reverence.
                  </Text>
                  
                  <div className="space-y-3">
                    <Text weight="bold" className="text-gray-900">
                      Program Details:
                    </Text>
                    <div className="space-y-1">
                      <Text size="sm" color="muted">• Usually begins in Year 2 (age 6-7)</Text>
                      <Text size="sm" color="muted">• Saturday morning classes 10:00 AM</Text>
                      <Text size="sm" color="muted">• First Communion in May/June</Text>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    leftIcon={<Calendar className="h-4 w-4" />}
                  >
                    Enroll Your Child
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Adult Preparation */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Adult First Communion
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    Adults who have been baptized but have not received First Communion 
                    can join our RCIA program or special adult preparation sessions.
                  </Text>
                  
                  <div className="space-y-3">
                    <Text weight="bold" className="text-gray-900">
                      Preparation Options:
                    </Text>
                    <div className="space-y-1">
                      <Text size="sm" color="muted">• RCIA program (September-Easter)</Text>
                      <Text size="sm" color="muted">• Individual preparation available</Text>
                      <Text size="sm" color="muted">• Reception at Easter Vigil or Sunday Mass</Text>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    leftIcon={<BookOpen className="h-4 w-4" />}
                  >
                    Start Preparation
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
                Come to the Table of the Lord
              </Heading>
              <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                The Eucharist is the greatest gift Christ has given us. Join us for Mass 
                and experience the profound mystery of God's love in Holy Communion.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Link href="/mass">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Utensils className="h-5 w-5" />}
                >
                  View Mass Times
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