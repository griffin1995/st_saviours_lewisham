import React from 'react'
import Link from 'next/link'
import { Plus, Calendar, Phone, BookOpen, Heart, Shield, ArrowRight, Users } from 'lucide-react'

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

export default function AnointingOfTheSick() {
  const reducedMotion = prefersReducedMotion()

  const anointingContent = [
    "The Anointing of the Sick is a sacrament of healing that provides spiritual comfort, courage, and strength to those facing serious illness, surgery, or the frailty of old age. It continues Christ's healing ministry in the Church.",
    "This sacrament is not only for those at the point of death, but for anyone experiencing serious illness or preparing for major surgery. It can be received multiple times during different illnesses, bringing God's grace and peace."
  ]

  const anointingEffects = [
    {
      title: "Spiritual Comfort",
      description: "Brings peace, courage, and strength to face illness with faith and hope"
    },
    {
      title: "Forgiveness of Sins",
      description: "Forgives sins if the person is unable to receive confession due to their condition"
    },
    {
      title: "Union with Christ",
      description: "Unites the sick person's suffering with Christ's passion for salvation"
    },
    {
      title: "Ecclesiastical Grace",
      description: "Strengthens connection with the Church community and their prayers"
    },
    {
      title: "Preparation for Heaven",
      description: "If it is God's will, prepares the soul for the journey to eternal life"
    }
  ]

  const anointingRequirements = [
    {
      title: "Who Can Receive",
      items: [
        "Any baptized Catholic who is seriously ill",
        "Those preparing for major surgery",
        "Elderly persons weakened by age",
        "Children who have reached the age of reason",
        "Anyone with chronic conditions during worsening periods"
      ]
    },
    {
      title: "When to Request",
      items: [
        "As soon as serious illness begins",
        "Before major surgery or procedures",
        "During times of great physical weakness",
        "When facing life-threatening conditions",
        "For repeated reception during new illnesses"
      ]
    },
    {
      title: "How to Request",
      items: [
        "Call parish office: 020 8852 7411",
        "Contact available 24/7 for emergencies",
        "Speak with priest after Mass",
        "Hospital chaplain services available",
        "Family members may request on behalf of patient"
      ]
    }
  ]

  const contactInfo = {
    title: "Need Anointing of the Sick?",
    description: "Don't face illness alone. The Church is here to provide spiritual comfort and healing through this beautiful sacrament. Call us day or night.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "Is anyone among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord",
    source: "James 5:14"
  }

  const anointingSteps = [
    {
      step: 1,
      title: "Liturgy of the Word",
      description: "Scripture readings and prayers appropriate for the sick person's situation",
      icon: BookOpen,
      color: "bg-purple-600"
    },
    {
      step: 2,
      title: "Laying on of Hands",
      description: "The priest silently lays hands on the sick person's head in prayer",
      icon: Heart,
      color: "bg-blue-600"
    },
    {
      step: 3,
      title: "Prayer over the Oil",
      description: "The priest blesses the oil of the sick if not already blessed by the bishop",
      icon: Plus,
      color: "bg-green-600"
    },
    {
      step: 4,
      title: "Anointing",
      description: "The forehead and hands are anointed with oil while prayers are said",
      icon: Shield,
      color: "bg-amber-600"
    }
  ]

  return (
    <PageLayout
      title="Anointing of the Sick"
      description="Learn about the Sacrament of Anointing of the Sick at St Saviour's Catholic Church. Information on spiritual healing, comfort, and last rites."
      keywords="Anointing of the Sick, Last Rites, Extreme Unction, Catholic Sacrament, Healing, Spiritual Comfort, Emergency"
    >
      {/* Hero Section */}
      <PageHero
        title="Anointing of the Sick"
        subtitle="Sacrament of Healing and Comfort"
        description="Christ's healing touch continues through this sacrament of spiritual and physical restoration."
        backgroundImage="/images/sacraments/anointing-healing.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Phone className="h-5 w-5" />}
            >
              Call for Emergency
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
            >
              Schedule Visit
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <SacramentInfo
            icon={Plus}
            title="Christ's Healing Touch"
            subtitle="Sacrament of healing for the seriously ill"
            content={anointingContent}
            quote={quote}
            effects={anointingEffects}
            requirements={anointingRequirements}
            contactInfo={contactInfo}
            effectsColor="purple"
          />
        </Container>
      </Section>

      {/* The Rite of Anointing */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              The Rite of Anointing
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              The sacrament follows a beautiful ritual that brings peace and comfort to the sick person and their loved ones.
            </Text>
          </div>

          <Grid cols={4} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {anointingSteps.map((step, index) => (
              <Card key={step.step} variant="default" padding="md" className="bg-white text-center">
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                      <div className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center text-white font-bold`}>
                        {step.step}
                      </div>
                      <step.icon className="h-6 w-6 text-purple-600" />
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

          <Card variant="default" padding="lg" className="bg-purple-50 border-purple-200 max-w-4xl mx-auto">
            <CardContent>
              <Heading level="h3" className="text-xl font-semibold text-purple-900 mb-6 text-center">
                Prayer of Anointing
              </Heading>
              <Grid cols={2} gap="lg">
                <div className="space-y-3">
                  <Text weight="bold" className="text-purple-800">
                    On the forehead:
                  </Text>
                  <Text className="italic text-purple-700 leading-relaxed">
                    "Through this holy anointing may the Lord in his love and mercy help you 
                    with the grace of the Holy Spirit."
                  </Text>
                </div>
                <div className="space-y-3">
                  <Text weight="bold" className="text-purple-800">
                    On the hands:
                  </Text>
                  <Text className="italic text-purple-700 leading-relaxed">
                    "May the Lord who frees you from sin save you and raise you up."
                  </Text>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Emergency Contact Information */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              How to Request Anointing
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              If you or a loved one needs this sacrament, please contact us immediately. We are available 24/7 for emergencies.
            </Text>
          </div>

          <Grid cols={2} gap="lg" className="max-w-4xl mx-auto">
            {/* Emergency Call */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Emergency Call
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    For urgent situations or when someone is dying, call the parish immediately.
                    Our priests are available day and night.
                  </Text>
                  
                  <Card variant="outlined" padding="md" className="bg-red-50 border-red-200">
                    <CardContent>
                      <Text className="text-red-800 font-semibold text-lg">020 8852 7411</Text>
                      <Text size="sm" className="text-red-600">Available 24/7 for emergencies</Text>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Planned Visit */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Planned Visit
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    For non-emergency situations, you can schedule a visit during office hours 
                    or speak with a priest after Mass.
                  </Text>
                  
                  <div className="space-y-2">
                    {[
                      "Call during office hours: Monday-Friday, 9 AM - 5 PM",
                      "Speak with a priest after Mass",
                      "Contact the parish office for arrangements",
                      "Hospital chaplain services available"
                    ].map((item, index) => (
                      <Flex key={index} align="start" gap="sm">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <Text size="sm" color="muted">{item}</Text>
                      </Flex>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Card variant="outlined" padding="lg" className="bg-blue-50 border-blue-200 max-w-2xl mx-auto mt-8">
            <CardContent>
              <Heading level="h3" className="text-lg font-semibold text-blue-900 mb-3">
                Important Note
              </Heading>
              <Text className="text-blue-800 leading-relaxed">
                Please don't hesitate to call, even if you're unsure whether the situation qualifies. 
                Our priests are always willing to visit and provide spiritual comfort to those in need. 
                Family members may request anointing on behalf of a patient who cannot ask for themselves.
              </Text>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Who Can Receive */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Who Can Receive This Sacrament?
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              The Anointing of the Sick is available to any baptized Catholic who is seriously ill or facing significant health challenges.
            </Text>
          </div>

          <Grid cols={3} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Serious Illness",
                description: "Those suffering from serious physical or mental illness that significantly affects their health",
                icon: Heart,
                color: "bg-red-600"
              },
              {
                title: "Before Surgery",
                description: "Anyone preparing for major surgery or medical procedures that carry significant risk",
                icon: Plus,
                color: "bg-blue-600"
              },
              {
                title: "Elderly Frail",
                description: "Elderly persons who are weakened by age, even without a specific serious illness",
                icon: Shield,
                color: "bg-green-600"
              },
              {
                title: "Chronic Conditions",
                description: "Those with chronic illnesses during periods when the condition worsens significantly",
                icon: Users,
                color: "bg-purple-600"
              },
              {
                title: "Children",
                description: "Sick children who have reached the age of reason (usually around 7 years old)",
                icon: Heart,
                color: "bg-amber-600"
              },
              {
                title: "Repeated Reception",
                description: "The sacrament can be received again if the person recovers and becomes seriously ill again",
                icon: Plus,
                color: "bg-indigo-600"
              }
            ].map((recipient, index) => (
              <Card key={recipient.title} variant="default" padding="md" className="bg-white">
                <CardContent>
                  <div className="space-y-4">
                    <Flex align="center" gap="sm">
                      <div className={`w-10 h-10 ${recipient.color} rounded-lg flex items-center justify-center`}>
                        <recipient.icon className="h-5 w-5 text-white" />
                      </div>
                      <Heading level="h4" className="text-lg font-semibold">
                        {recipient.title}
                      </Heading>
                    </Flex>
                    <Text size="sm" color="muted" className="leading-relaxed">
                      {recipient.description}
                    </Text>
                  </div>
                </CardContent>
              </Card>
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
                Comfort in Times of Illness
              </Heading>
              <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                You don't have to face illness alone. The Church is here to provide spiritual 
                comfort and healing through this beautiful sacrament of God's love and mercy.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Link href="/contact-us">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Phone className="h-5 w-5" />}
                >
                  Request Anointing
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