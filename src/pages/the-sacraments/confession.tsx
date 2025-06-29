import React from 'react'
import Link from 'next/link'
import { Heart, Calendar, Phone, BookOpen, Clock, Shield, ArrowRight, CheckCircle } from 'lucide-react'

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

export default function Confession() {
  const reducedMotion = prefersReducedMotion()

  const confessionContent = [
    "The Sacrament of Confession, also known as Reconciliation or Penance, is God's gift of forgiveness and healing. Through this sacrament, we receive absolution from our sins and are restored to full communion with God and the Church.",
    "Christ gave the apostles the power to forgive sins, and this authority continues in the Church today through ordained priests. No sin is too great for God's infinite mercy and love."
  ]

  const confessionEffects = [
    {
      title: "Forgiveness of Sins",
      description: "All sins confessed with true contrition are completely forgiven"
    },
    {
      title: "Grace and Strength",
      description: "Receive actual grace to resist temptation and live virtuously"
    },
    {
      title: "Peace of Conscience",
      description: "Experience the peace that comes from knowing you are forgiven"
    },
    {
      title: "Spiritual Direction",
      description: "Receive guidance and advice for your spiritual journey"
    },
    {
      title: "Reconciliation",
      description: "Restore your relationship with God and the Church community"
    }
  ]

  const confessionRequirements = [
    {
      title: "Examination of Conscience",
      items: [
        "Reflect on your actions since last confession",
        "Consider how you have fallen short of God's love",
        "Review the Ten Commandments and Church teachings",
        "Ask the Holy Spirit for guidance",
        "Examine thoughts, words, and actions"
      ]
    },
    {
      title: "Contrition",
      items: [
        "Feel genuine sorrow for your sins",
        "Resolve to avoid sin in the future",
        "Trust in God's mercy and forgiveness",
        "Desire to make amends where possible",
        "Commit to change with God's grace"
      ]
    },
    {
      title: "Confession Process",
      items: [
        "Confess sins honestly and completely",
        "Start with time since last confession",
        "Listen to the priest's counsel",
        "Receive absolution gratefully",
        "Complete assigned penance"
      ]
    }
  ]

  const contactInfo = {
    title: "Ready to Experience God's Mercy?",
    description: "Don't let fear or shame keep you from God's infinite mercy. Take the first step toward reconciliation and peace.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "Receive the Holy Spirit. Whose sins you forgive are forgiven them, and whose sins you retain are retained",
    source: "John 20:22-23"
  }

  const confessionTimes = [
    { day: "Saturday", time: "5:00 PM - 5:45 PM", note: "Before Vigil Mass" },
    { day: "Sunday", time: "After 9:00 AM Mass", note: "Approximately 10:00 AM" },
    { day: "Wednesday", time: "7:00 PM - 7:30 PM", note: "After weekday Mass" }
  ]

  const confessionSteps = [
    {
      step: 1,
      title: "Examination of Conscience",
      description: "Reflect on your actions, thoughts, and omissions since your last confession",
      icon: Shield,
      color: "bg-green-600"
    },
    {
      step: 2,
      title: "Contrition",
      description: "Feel genuine sorrow for your sins and resolve to avoid sin in the future",
      icon: Heart,
      color: "bg-red-600"
    },
    {
      step: 3,
      title: "Confession",
      description: "Confess your sins honestly and completely to the priest",
      icon: BookOpen,
      color: "bg-blue-600"
    },
    {
      step: 4,
      title: "Absolution",
      description: "The priest grants absolution in the name of the Father, Son, and Holy Spirit",
      icon: CheckCircle,
      color: "bg-purple-600"
    }
  ]

  return (
    <PageLayout
      title="Confession"
      description="Learn about the Sacrament of Confession at St Saviour's Catholic Church. Information on confession times, how to confess, and God's mercy."
      keywords="Catholic Confession, Reconciliation, Penance, Forgiveness, Absolution, Confession Times, Sacrament"
    >
      {/* Hero Section */}
      <PageHero
        title="Sacrament of Confession"
        subtitle="God's Gift of Forgiveness"
        description="Experience God's infinite mercy and forgiveness through the sacrament of confession and reconciliation."
        backgroundImage="/images/sacraments/confession-reconciliation.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
            >
              Schedule Confession
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Clock className="h-5 w-5" />}
            >
              View Confession Times
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <SacramentInfo
            icon={Heart}
            title="Reconciliation and Peace"
            subtitle="The sacrament of forgiveness and healing"
            content={confessionContent}
            quote={quote}
            effects={confessionEffects}
            requirements={confessionRequirements}
            contactInfo={contactInfo}
            effectsColor="green"
          />
        </Container>
      </Section>

      {/* How to Go to Confession */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              How to Go to Confession
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Follow these simple steps to receive the sacrament of confession with confidence and peace.
            </Text>
          </div>

          <Grid cols={4} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {confessionSteps.map((step, index) => (
              <Card key={step.step} variant="default" padding="md" className="bg-white text-center">
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                      <div className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center text-white font-bold`}>
                        {step.step}
                      </div>
                      <step.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <Heading level="h4" className="text-lg font-semibold">
                      {step.title}
                    </Heading>
                    <Text size="sm" color="muted" className="leading-relaxed">
                      {step.description}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Confession Times */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Confession Times at St Saviour's
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Regular times for the sacrament of confession are available throughout the week.
            </Text>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {confessionTimes.map((time, index) => (
              <Card key={index} variant="outlined" padding="lg" className="bg-white">
                <CardContent>
                  <Flex align="center" justify="between">
                    <Flex align="center" gap="md">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Heading level="h3" className="text-lg font-semibold">
                          {time.day}
                        </Heading>
                        <Text color="muted">{time.time}</Text>
                      </div>
                    </Flex>
                  </Flex>
                  {time.note && (
                    <Text size="sm" color="muted" className="mt-4 ml-16">
                      {time.note}
                    </Text>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card variant="outlined" padding="lg" className="bg-blue-50 border-blue-200 max-w-2xl mx-auto mt-8">
            <CardContent>
              <Heading level="h3" className="text-lg font-semibold text-blue-900 mb-2">
                By Appointment
              </Heading>
              <Text className="text-blue-800">
                Confession is also available by appointment. Please contact the parish office 
                at <span className="font-semibold">020 8852 7411</span> to arrange a time that works for you.
              </Text>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Examination of Conscience */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Examination of Conscience
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Use these questions to help examine your conscience before confession.
            </Text>
          </div>

          <Grid cols={2} gap="lg">
            {/* Our Relationship with God */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-xl font-semibold text-gray-900">
                    Our Relationship with God
                  </Heading>
                  <div className="space-y-3">
                    {[
                      "Have I made time for prayer each day?",
                      "Have I attended Mass on Sundays and holy days?",
                      "Have I used God's name respectfully?",
                      "Have I kept the Sabbath holy?",
                      "Have I trusted in God's providence?"
                    ].map((question, index) => (
                      <Flex key={index} align="start" gap="sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <Text size="sm" color="muted">{question}</Text>
                      </Flex>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Our Relationships with Others */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-xl font-semibold text-gray-900">
                    Our Relationships with Others
                  </Heading>
                  <div className="space-y-3">
                    {[
                      "Have I honored my parents and those in authority?",
                      "Have I been patient and kind to others?",
                      "Have I forgiven those who have hurt me?",
                      "Have I been honest and truthful?",
                      "Have I cared for those in need?"
                    ].map((question, index) => (
                      <Flex key={index} align="start" gap="sm">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <Text size="sm" color="muted">{question}</Text>
                      </Flex>
                    ))}
                  </div>
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
                Experience God's Infinite Mercy
              </Heading>
              <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                No sin is too great for God's mercy. Come and experience the peace 
                and joy that comes from knowing you are completely forgiven and loved.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Link href="/contact-us">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Phone className="h-5 w-5" />}
                >
                  Schedule Confession
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