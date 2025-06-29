import React from 'react'
import Link from 'next/link'
import { Gem, Calendar, Phone, BookOpen, Heart, Users, ArrowRight, Church } from 'lucide-react'

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

export default function Matrimony() {
  const reducedMotion = prefersReducedMotion()

  const matrimonyContent = [
    "In the Catholic understanding, marriage is not just a legal contract but a sacred covenant between a man and woman, blessed by God and witnessed by the Church community. This sacrament reflects the unconditional love between Christ and the Church.",
    "Through marriage, couples receive the grace they need to love each other faithfully, support each other through life's challenges, and welcome children as a gift from God. Marriage is a lifelong partnership that mirrors Christ's love for the Church."
  ]

  const matrimonyEffects = [
    {
      title: "Sacramental Grace",
      description: "Special graces to love faithfully and support each other through life's challenges"
    },
    {
      title: "Unity in Christ",
      description: "Two become one flesh, united in love and purpose under God"
    },
    {
      title: "Mutual Sanctification",
      description: "Husband and wife help each other grow in holiness and virtue"
    },
    {
      title: "Partnership in Mission",
      description: "Called together to serve God, the Church, and the broader community"
    },
    {
      title: "Openness to Life",
      description: "Blessed to welcome and raise children in the Catholic faith"
    }
  ]

  const matrimonyRequirements = [
    {
      title: "Catholic Couples",
      items: [
        "Both parties baptized Catholic",
        "Free to marry (no previous valid marriage)",
        "Complete marriage preparation program", 
        "Six months advance notice preferred",
        "Recent baptismal and confirmation certificates"
      ]
    },
    {
      title: "Mixed Marriages",
      items: [
        "One party must be Catholic",
        "Dispensation required from the Bishop",
        "Catholic party promises to raise children Catholic",
        "Non-Catholic party informed of promises",
        "Additional preparation may be required"
      ]
    },
    {
      title: "Documentation Needed",
      items: [
        "Recent baptismal certificates",
        "Confirmation certificates",
        "Civil marriage license",
        "Proof of freedom to marry",
        "Pre-nuptial investigation forms"
      ]
    }
  ]

  const contactInfo = {
    title: "Ready to Plan Your Wedding?",
    description: "We're honored to help you begin this sacred journey together. Contact us to start planning your beautiful Catholic wedding celebration.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "What God has joined together, let no one separate",
    source: "Mark 10:9"
  }

  const weddingFees = [
    { item: "Church usage donation", cost: "£400" },
    { item: "Organist (if required)", cost: "£150" },
    { item: "Cantor (if required)", cost: "£100" },
    { item: "Additional musicians", cost: "By arrangement" }
  ]

  const essentialElements = [
    {
      title: "Free Consent",
      description: "Both parties freely choose to marry",
      icon: Heart
    },
    {
      title: "Fidelity", 
      description: "Exclusive love and faithfulness",
      icon: Gem
    },
    {
      title: "Permanence",
      description: "Until death do us part",
      icon: Church
    },
    {
      title: "Openness to Life",
      description: "Welcoming children as God's gift",
      icon: Users
    },
    {
      title: "Unity",
      description: "Two become one in Christ",
      icon: Heart
    }
  ]

  return (
    <PageLayout
      title="Matrimony"
      description="Plan your Catholic wedding at St Saviour's Catholic Church. Information on marriage preparation, requirements, and celebrating your sacred covenant."
      keywords="Catholic Wedding, Church Wedding, Marriage Preparation, Wedding Ceremony, Catholic Marriage, Matrimony, Sacrament"
    >
      {/* Hero Section */}
      <PageHero
        title="Holy Matrimony"
        subtitle="A Sacred Covenant of Love"
        description="Marriage is a lifelong partnership that mirrors Christ's love for the Church, blessed by God and witnessed by the community."
        backgroundImage="/images/sacraments/wedding-ceremony.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Heart className="h-5 w-5" />}
            >
              Plan Your Wedding
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
            >
              Marriage Preparation
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <SacramentInfo
            icon={Gem}
            title="A Covenant of Love"
            subtitle="The sacred bond between husband and wife"
            content={matrimonyContent}
            quote={quote}
            effects={matrimonyEffects}
            requirements={matrimonyRequirements}
            contactInfo={contactInfo}
            effectsColor="pink"
          />
        </Container>
      </Section>

      {/* Essential Elements */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Essential Elements of Catholic Marriage
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Catholic marriage is built on these fundamental principles that ensure a strong and lasting union.
            </Text>
          </div>

          <Grid cols={5} gap="lg" className="grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
            {essentialElements.map((element, index) => (
              <Card key={element.title} variant="default" padding="md" className="bg-white text-center">
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto">
                      <element.icon className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h4" className="text-lg font-semibold">
                      {element.title}
                    </Heading>
                    <Text size="sm" color="muted" className="leading-relaxed">
                      {element.description}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Marriage Preparation */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Marriage Preparation at St Saviour's
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Our comprehensive marriage preparation helps couples build a strong foundation for their life together, rooted in faith and mutual understanding.
            </Text>
          </div>

          <Grid cols={2} gap="lg">
            {/* Pre-Cana Program */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Pre-Cana Program
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    Our six-session preparation course covers all essential aspects of Catholic marriage,
                    helping couples build a strong foundation for their life together.
                  </Text>
                  
                  <div className="space-y-3">
                    <Text weight="bold" className="text-gray-900">
                      Course Topics:
                    </Text>
                    <div className="space-y-1">
                      {[
                        "Communication and conflict resolution",
                        "Financial planning and responsibility", 
                        "Catholic teaching on marriage",
                        "Natural family planning",
                        "Spirituality in marriage",
                        "Building lasting intimacy"
                      ].map((topic, index) => (
                        <Flex key={index} align="start" gap="sm">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <Text size="sm" color="muted">{topic}</Text>
                        </Flex>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Preparation */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Flex align="center" gap="md">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <Heading level="h3" className="text-xl font-semibold">
                      Additional Preparation
                    </Heading>
                  </Flex>
                  
                  <Text color="muted" className="leading-relaxed">
                    Beyond the Pre-Cana program, we provide personalized support through individual
                    meetings and practical preparation for your wedding day.
                  </Text>
                  
                  <div className="space-y-3">
                    <Text weight="bold" className="text-gray-900">
                      Includes:
                    </Text>
                    <div className="space-y-1">
                      {[
                        "Pre-marital inventory assessment",
                        "Individual meetings with priest",
                        "Liturgy planning sessions",
                        "Pre-nuptial investigation",
                        "Wedding rehearsal",
                        "Ongoing pastoral support"
                      ].map((item, index) => (
                        <Flex key={index} align="start" gap="sm">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <Text size="sm" color="muted">{item}</Text>
                        </Flex>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Wedding Planning */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Planning Your Wedding Ceremony
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Work with our team to create a beautiful and meaningful liturgy that reflects your love and commitment.
            </Text>
          </div>

          <Grid cols={2} gap="lg">
            {/* Liturgy Options */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-2xl font-semibold text-gray-900">
                    Liturgy Options
                  </Heading>
                  
                  <div className="space-y-4">
                    <Card variant="outlined" padding="md" className="bg-gray-50">
                      <CardContent>
                        <Text weight="bold" className="text-gray-900 mb-2">Nuptial Mass</Text>
                        <Text size="sm" color="muted">
                          Full Mass with Eucharist - recommended when both parties are Catholic 
                          and the majority of guests can participate in Communion.
                        </Text>
                      </CardContent>
                    </Card>
                    
                    <Card variant="outlined" padding="md" className="bg-gray-50">
                      <CardContent>
                        <Text weight="bold" className="text-gray-900 mb-2">Ceremony Outside Mass</Text>
                        <Text size="sm" color="muted">
                          Wedding ceremony with Scripture readings, prayers, and vows - 
                          often used for mixed marriages or when many guests are not Catholic.
                        </Text>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Church Features */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-2xl font-semibold text-gray-900">
                    Our Beautiful Church
                  </Heading>
                  
                  <Card variant="outlined" padding="md" className="bg-slate-900 text-white">
                    <CardContent>
                      <Text weight="bold" className="text-gold-400 mb-3">Church Features</Text>
                      <div className="space-y-2">
                        {[
                          "Seating capacity for 300 guests",
                          "Beautiful Victorian architecture", 
                          "Sacred Heart side chapel for intimate ceremonies",
                          "Professional sound system",
                          "Wheelchair accessible",
                          "Stunning stained glass windows",
                          "Pipe organ and piano",
                          "Photography-friendly lighting"
                        ].map((feature, index) => (
                          <Text key={index} size="sm" className="text-gray-300">• {feature}</Text>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Fees and Contact */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <Grid cols={2} gap="lg">
            {/* Wedding Fees */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-2xl font-semibold text-gray-900">
                    Wedding Fees & Donations
                  </Heading>
                  
                  <Text color="muted" className="leading-relaxed">
                    We ask for a donation to help cover the costs of using the church 
                    and supporting our ministry. Fees are kept modest to ensure all 
                    couples can afford a church wedding.
                  </Text>
                  
                  <div className="space-y-3">
                    {weddingFees.map((fee, index) => (
                      <Flex key={index} justify="between" align="center">
                        <Text color="muted">{fee.item}:</Text>
                        <Text weight="bold">{fee.cost}</Text>
                      </Flex>
                    ))}
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <Flex justify="between" align="center">
                        <Text weight="bold">Typical total:</Text>
                        <Text weight="bold">£650</Text>
                      </Flex>
                    </div>
                  </div>
                  
                  <Text size="sm" color="muted">
                    Additional donations for flowers, special arrangements, or parish support are always welcome but not required.
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Getting Started */}
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-2xl font-semibold text-gray-900">
                    Getting Started
                  </Heading>
                  
                  <Text color="muted" className="leading-relaxed">
                    Ready to begin planning your Catholic wedding? Contact our parish 
                    office to schedule your initial meeting and start the preparation process.
                  </Text>
                  
                  <div className="space-y-3">
                    <Flex align="center" gap="md">
                      <Phone className="h-5 w-5 text-gold-600" />
                      <div>
                        <Text weight="bold" className="text-gray-900">Parish Office</Text>
                        <Text size="sm" color="muted">020 8852 7411</Text>
                      </div>
                    </Flex>
                    <Flex align="center" gap="md">
                      <Calendar className="h-5 w-5 text-gold-600" />
                      <div>
                        <Text weight="bold" className="text-gray-900">Office Hours</Text>
                        <Text size="sm" color="muted">Monday - Friday: 9:00 AM - 5:00 PM</Text>
                      </div>
                    </Flex>
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Button variant="primary" size="md" className="w-full">
                      Contact Us
                    </Button>
                    <Button variant="outline" size="md" className="w-full">
                      Venue Information
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Card variant="outlined" padding="lg" className="bg-pink-50 border-pink-200 max-w-2xl mx-auto mt-8">
            <CardContent>
              <Text weight="bold" className="text-pink-900 mb-2">Planning Timeline</Text>
              <Text size="sm" className="text-pink-800">
                We recommend contacting us at least 6 months before your desired 
                wedding date to ensure adequate time for preparation and to secure 
                your preferred date.
              </Text>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <Heading level="h2" className="text-3xl font-light text-white">
                Begin Your Journey Together
              </Heading>
              <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                Marriage is a beautiful sacrament that deserves careful preparation and 
                joyful celebration. We're honored to help you begin this sacred journey together.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Link href="/contact-us">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Heart className="h-5 w-5" />}
                >
                  Plan Your Wedding
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