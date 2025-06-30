import React from 'react'
import Link from 'next/link'
import { HandMetal, Calendar, Phone, BookOpen, Heart, Users, ArrowRight, Crown, Cross } from 'lucide-react'

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

export default function HolyOrders() {
  const reducedMotion = prefersReducedMotion()

  const holyOrdersContent = [
    "Holy Orders is the sacrament through which the mission entrusted by Christ to his apostles continues to be exercised in the Church. It includes three degrees: episcopate (bishops), presbyterate (priests), and diaconate (deacons).",
    "This sacrament confers a sacred power for the service of the faithful. Those who receive Holy Orders are consecrated in Christ's name to feed the Church with the Word and grace of God, becoming shepherds, teachers, and sanctifiers."
  ]

  const holyOrdersEffects = [
    {
      title: "Sacred Character",
      description: "Imprints an indelible spiritual character that configures the man to Christ the priest"
    },
    {
      title: "Sacred Power",
      description: "Confers the power to celebrate sacraments and shepherd God's people"
    },
    {
      title: "Grace of State",
      description: "Provides special graces needed to fulfill the duties of ordained ministry"
    },
    {
      title: "Configuration to Christ",
      description: "The ordained person acts in the person of Christ the head of the Church"
    },
    {
      title: "Servant Leadership",
      description: "Called to serve the Church with humility following Christ's example"
    }
  ]

  const holyOrdersRequirements = [
    {
      title: "Divine Call",
      items: [
        "Clear sense of calling from God to serve",
        "Discernment through prayer and spiritual direction",
        "Recognition by the Church community",
        "Acceptance by the bishop after thorough evaluation",
        "Internal conviction of being chosen by God"
      ]
    },
    {
      title: "Personal Qualifications",
      items: [
        "Baptized Catholic male in good standing",
        "Sound physical and mental health",
        "Good moral character and reputation",
        "Ability to relate well to people",
        "Commitment to lifelong service"
      ]
    },
    {
      title: "Formation Process",
      items: [
        "Seminary education (6-8 years for priests)",
        "Academic studies in theology and philosophy",
        "Spiritual formation and prayer life",
        "Pastoral training and experience",
        "Human development and psychological readiness"
      ]
    }
  ]

  const contactInfo = {
    title: "Exploring a Vocation?",
    description: "If you feel called to serve God and his people as a priest or deacon, we encourage you to explore this vocation. The Church needs holy men to serve.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "It was not you who chose me, but I who chose you and appointed you to go and bear fruit that will remain",
    source: "John 15:16"
  }

  const holyOrdersDegrees = [
    {
      title: "Bishops",
      subtitle: "Episcopate",
      description: "Bishops possess the fullness of the sacrament of Holy Orders. They are the successors of the apostles and have the authority to ordain priests and deacons, confirm the faithful, and govern dioceses.",
      icon: Crown,
      color: "bg-purple-600",
      responsibilities: [
        "Teaching and preaching",
        "Sanctifying through sacraments", 
        "Governing the diocese",
        "Ordaining clergy"
      ],
      symbol: "Ring, mitre, and pastoral staff representing their office"
    },
    {
      title: "Priests", 
      subtitle: "Presbyterate",
      description: "Priests are co-workers with bishops in the apostolic ministry. They celebrate Mass, hear confessions, perform baptisms and marriages, anoint the sick, and shepherd the faithful in parishes.",
      icon: Cross,
      color: "bg-blue-600",
      responsibilities: [
        "Celebrating Mass and sacraments",
        "Preaching and teaching",
        "Pastoral care of parishioners", 
        "Leading parish communities"
      ],
      symbol: "Stole and chasuble, representing the yoke of Christ"
    },
    {
      title: "Deacons",
      subtitle: "Diaconate", 
      description: "Deacons are ordained for service and assist bishops and priests. They can baptize, preach, distribute Communion, witness marriages, and have a special ministry to the poor and marginalized.",
      icon: HandMetal,
      color: "bg-green-600",
      responsibilities: [
        "Baptizing and preaching",
        "Distributing Communion",
        "Witnessing marriages",
        "Works of charity and justice"
      ],
      symbol: "Dalmatic and stole worn over the left shoulder"
    }
  ]

  return (
    <PageLayout
      title="Holy Orders"
      description="Learn about the Sacrament of Holy Orders at St Saviour's Catholic Church. Information on priesthood, diaconate, and religious vocations."
      keywords="Holy Orders, Ordination, Priest, Bishop, Deacon, Catholic Sacrament, Vocation, Ministry, Seminary"
    >
      {/* Hero Section */}
      <PageHero
        title="Holy Orders"
        subtitle="Sacrament of Service"
        description="Through Holy Orders, men are consecrated to serve God and his people as bishops, priests, and deacons."
        backgroundImage="/images/sacraments/holy-orders-ordination.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Phone className="h-5 w-5" />}
            >
              Explore Your Vocation
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<BookOpen className="h-5 w-5" />}
            >
              Vocations Information
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <SacramentInfo
            icon={HandMetal}
            title="Called to Serve"
            subtitle="Sacrament that consecrates men to serve the Church"
            content={holyOrdersContent}
            quote={quote}
            effects={holyOrdersEffects}
            requirements={holyOrdersRequirements}
            contactInfo={contactInfo}
            effectsColor="indigo"
          />
        </Container>
      </Section>

      {/* The Three Degrees of Holy Orders */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              The Three Degrees of Holy Orders
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Each degree of Holy Orders has its own unique role and responsibilities in the Church's mission.
            </Text>
          </div>

          <div className="space-y-8">
            {holyOrdersDegrees.map((order, index) => (
              <Card key={order.title} variant="default" padding="lg" className="bg-white">
                <CardContent>
                  <Grid cols={3} gap="lg" className="items-center">
                    <div className="text-center">
                      <div className={`w-20 h-20 ${order.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <order.icon className="h-10 w-10 text-white" />
                      </div>
                      <Heading level="h3" className="text-2xl font-semibold">
                        {order.title}
                      </Heading>
                      <Text className={`${order.color.replace('bg-', 'text-')} font-semibold`}>
                        {order.subtitle}
                      </Text>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <Text color="muted" className="leading-relaxed">
                        {order.description}
                      </Text>
                      <Grid cols={2} gap="md">
                        <div>
                          <Heading level="h4" className="font-semibold text-gray-900 mb-2">
                            Responsibilities:
                          </Heading>
                          <div className="space-y-1">
                            {order.responsibilities.map((responsibility, idx) => (
                              <Text key={idx} size="sm" color="muted">• {responsibility}</Text>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Heading level="h4" className="font-semibold text-gray-900 mb-2">
                            Symbol:
                          </Heading>
                          <Text size="sm" color="muted">{order.symbol}</Text>
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* The Rite of Ordination */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              The Rite of Ordination
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Ordination is a solemn liturgical celebration that confers the sacrament of Holy Orders.
            </Text>
          </div>

          <Grid cols={2} gap="lg" className="max-w-4xl mx-auto">
            {/* Key Elements */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-2xl font-semibold text-indigo-600">
                    Key Elements
                  </Heading>
                  <div className="space-y-4">
                    {[
                      {
                        step: 1,
                        title: "Presentation of Candidates",
                        description: "The bishop calls the candidates forward and they express their willingness to serve"
                      },
                      {
                        step: 2,
                        title: "Homily",
                        description: "The bishop explains the dignity and duties of the priestly office"
                      },
                      {
                        step: 3,
                        title: "Examination",
                        description: "Candidates publicly promise obedience and commit to their duties"
                      },
                      {
                        step: 4,
                        title: "Laying on of Hands",
                        description: "The essential element - the bishop and all priests present lay hands on the candidates"
                      }
                    ].map((element) => (
                      <Flex key={element.step} align="start" gap="md">
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {element.step}
                        </div>
                        <div>
                          <Text weight="bold" className="text-gray-900">{element.title}</Text>
                          <Text size="sm" color="muted">{element.description}</Text>
                        </div>
                      </Flex>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sacred Symbols */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-2xl font-semibold text-indigo-600">
                    Sacred Symbols
                  </Heading>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Investiture with Vestments",
                        description: "The newly ordained are clothed with the stole and chasuble, symbols of their priestly office"
                      },
                      {
                        title: "Anointing of Hands", 
                        description: "The bishop anoints the palms of the new priests with sacred chrism"
                      },
                      {
                        title: "Presentation of Gifts",
                        description: "The chalice and paten are given as symbols of the power to offer sacrifice"
                      }
                    ].map((symbol, index) => (
                      <Card key={index} variant="outlined" padding="md" className="bg-indigo-50 border-indigo-200">
                        <CardContent>
                          <Text weight="bold" className="text-indigo-800 mb-2">{symbol.title}</Text>
                          <Text size="sm" className="text-indigo-700">{symbol.description}</Text>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Vocations Discernment */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Considering a Vocation?
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              If you feel called to serve God and his people as a priest or deacon, we encourage you to explore this vocation.
            </Text>
          </div>

          <Grid cols={2} gap="lg" className="max-w-4xl mx-auto">
            {/* Signs of a Vocation */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-xl font-semibold text-gray-900">
                    Signs of a Vocation
                  </Heading>
                  <div className="space-y-3">
                    {[
                      "Deep prayer life and love for the Eucharist",
                      "Desire to serve God and his people",
                      "Others recognizing priestly qualities in you",
                      "Peace and joy when considering priesthood",
                      "Ability to relate well to people of all ages"
                    ].map((sign, index) => (
                      <Flex key={index} align="start" gap="sm">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                        <Text size="sm" color="muted">{sign}</Text>
                      </Flex>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-xl font-semibold text-gray-900">
                    Next Steps
                  </Heading>
                  <div className="space-y-3">
                    {[
                      "Speak with one of our priests",
                      "Contact the diocesan vocations director",
                      "Attend vocation events and retreats",
                      "Increase prayer and spiritual reading",
                      "Consider visiting a seminary"
                    ].map((step, index) => (
                      <Flex key={index} align="start" gap="sm">
                        <div className="w-2 h-2 bg-gold-600 rounded-full mt-2 flex-shrink-0"></div>
                        <Text size="sm" color="muted">{step}</Text>
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
                Pray for Vocations
              </Heading>
              <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                Please pray for vocations to the priesthood and diaconate. The Church needs holy men 
                to serve God's people and continue Christ's mission in the world.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Link href="/contact-us">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Phone className="h-5 w-5" />}
                >
                  Explore Your Vocation
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