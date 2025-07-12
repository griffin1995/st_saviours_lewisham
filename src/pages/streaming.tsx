import React, { useState } from 'react'
import Link from 'next/link'
import { Play, Calendar, ExternalLink } from 'lucide-react'

// New modern component system
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Heading, 
  Text, 
  Section,
  Container,
  Flex
} from '@/components/ui'
import { 
  StreamingStatus, 
  StreamingSchedule, 
  WatchingOptions, 
  TechnicalRequirements, 
  OnlineCommunity 
} from '@/components/church'
import { LiveStreamingDashboard, StreamingAnalytics } from '@/components/enhanced'
import { prefersReducedMotion } from '@/lib/utils'

export default function Streaming() {
  const reducedMotion = prefersReducedMotion()
  const [reminderEmail, setReminderEmail] = useState("")
  const [reminderSet, setReminderSet] = useState(false)

  const upcomingStreams = [
    {
      id: "sunday-mass",
      title: "Sunday Mass",
      time: "11:30 AM",
      date: "Every Sunday",
      description: "Join us for our principal Sunday Mass with full participation from our community.",
      isLive: false,
      nextStream: "2025-01-26T11:30:00",
      featured: true
    },
    {
      id: "weekday-mass",
      title: "Weekday Mass",
      time: "12:15 PM", 
      date: "Monday - Friday",
      description: "Daily Mass for those who cannot attend in person.",
      isLive: false,
      nextStream: "2025-01-27T12:15:00",
      featured: false
    },
    {
      id: "evening-prayer",
      title: "Evening Prayer",
      time: "6:00 PM",
      date: "Wednesdays",
      description: "Midweek prayer and reflection to center our hearts on God.",
      isLive: false,
      nextStream: "2025-01-29T18:00:00",
      featured: false
    },
    {
      id: "special-celebrations",
      title: "Special Celebrations",
      time: "Various",
      date: "Holy Days & Seasons",
      description: "Christmas, Easter, Ash Wednesday, and other important liturgical celebrations.",
      isLive: false,
      nextStream: null,
      featured: false
    }
  ]

  const handleReminderSignup = (streamId: string) => {
    console.log(`Setting reminder for stream: ${streamId}`)
    setReminderSet(true)
  }

  const handleWatchStream = (streamId: string) => {
    console.log(`Watching stream: ${streamId}`)
  }

  const handleViewSchedule = () => {
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <PageLayout
      title="Live Streaming"
      description="Join St Saviour's Catholic Church online through our live streaming services. Attend Mass and prayer services from anywhere in the world."
      keywords="Live Stream Mass, Online Mass, Virtual Church, Live Streaming, Catholic Mass Online, Remote Worship"
    >
      {/* Hero Section */}
      <PageHero
        title="Live Streaming"
        subtitle="Worship with Us Online"
        description="Can't join us in person? Participate in our liturgies through live streaming from anywhere in the world."
        backgroundImage="/images/hero/church-streaming.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Play className="h-5 w-5" />}
            >
              Watch Live
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
              onClick={handleViewSchedule}
            >
              View Schedule
            </Button>
          </Flex>
        }
      />

      {/* Enhanced Live Stream Dashboard */}
      <Section spacing="lg" background="slate">
        <Container size="xl">
          <LiveStreamingDashboard
            isLive={false}
            viewerCount={247}
            streamTitle="Sunday Mass - 11:30 AM"
            streamDescription="Join our parish community for the celebration of the Eucharist with hymns, prayers, and fellowship."
            nextStreamTime="Tomorrow at 11:30 AM"
            reducedMotion={reducedMotion}
          />
        </Container>
      </Section>

      {/* Streaming Schedule */}
      <Section spacing="lg" background="white" id="schedule">
        <Container size="lg">
          <StreamingSchedule
            streams={upcomingStreams}
            onSetReminder={handleReminderSignup}
            onWatchStream={handleWatchStream}
          />
        </Container>
      </Section>

      {/* How to Watch */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <WatchingOptions />
        </Container>
      </Section>

      {/* Technical Requirements */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <TechnicalRequirements />
        </Container>
      </Section>

      {/* Streaming Analytics Dashboard */}
      <Section spacing="lg" background="slate">
        <Container size="xl">
          <StreamingAnalytics reducedMotion={reducedMotion} />
        </Container>
      </Section>

      {/* Online Community */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <OnlineCommunity />
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" background="white">
        <Container size="md">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <Heading level="h2" className="text-3xl font-light">
                Can't Attend in Person?
              </Heading>
              <Text size="xl" color="muted" className="max-w-2xl mx-auto">
                Whether you're traveling, unwell, or unable to visit our church, 
                you're always welcome to join our worship online. We're here to 
                serve our extended parish community wherever you are.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Button 
                variant="primary" 
                size="lg"
                leftIcon={<Play className="h-5 w-5" />}
              >
                Join Next Stream
              </Button>
              <Link href="/mass">
                <Button 
                  variant="outline" 
                  size="lg"
                  leftIcon={<Calendar className="h-5 w-5" />}
                >
                  View Mass Times
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