import React, { useState } from 'react'
import Link from 'next/link'
import { Mic, Rss } from 'lucide-react'

// New modern component system
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Heading, 
  Text, 
  Section,
  Container,
  Grid,
  Flex
} from '@/components/ui'
import { 
  PodcastEpisodeCard, 
  PodcastSearch, 
  PodcastSubscribe,
  type PodcastEpisode 
} from '@/components/church'
import { prefersReducedMotion } from '@/lib/utils'

const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    title: "Walking in Faith: A Journey Through Lent",
    description: "Join Fr Krisz as he explores the spiritual disciplines of Lent and how we can use this holy season to draw closer to God through prayer, fasting, and almsgiving.",
    host: "Fr Krisz",
    date: "2025-02-15",
    duration: "32 minutes",
    category: "Spiritual Formation",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/lent-journey.jpg",
    featured: true,
    season: 2,
    episode: 8
  },
  {
    id: 2,
    title: "The Saints Among Us: Stories of Modern Holiness",
    description: "Deacon Michael shares inspiring stories of contemporary saints and how their examples can guide our daily Christian living in the 21st century.",
    host: "Deacon Michael",
    date: "2025-02-01",
    duration: "28 minutes",
    category: "Saints & Spirituality",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/modern-saints.jpg",
    featured: true,
    season: 2,
    episode: 7
  },
  {
    id: 3,
    title: "Understanding the Liturgy: The Mass Explained",
    description: "A deep dive into the structure and meaning of the Catholic Mass, helping parishioners participate more fully in our Sunday worship.",
    host: "Fr Krisz",
    guest: "Dr Sarah Thompson",
    date: "2025-01-18",
    duration: "35 minutes",
    category: "Liturgy & Worship",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/mass-explained.jpg",
    season: 2,
    episode: 6
  },
  {
    id: 4,
    title: "Youth Ministry: Engaging the Next Generation",
    description: "Youth leader Maria discusses innovative approaches to engaging young people in faith formation and community service.",
    host: "Deacon Michael",
    guest: "Maria Rodriguez",
    date: "2025-01-04",
    duration: "25 minutes",
    category: "Youth & Family",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/youth-ministry.jpg",
    season: 2,
    episode: 5
  },
  {
    id: 5,
    title: "Building Community: Parish Life in Action",
    description: "Exploring how our various parish groups and ministries work together to create a vibrant, welcoming community for all.",
    host: "Fr Krisz",
    date: "2024-12-21",
    duration: "30 minutes",
    category: "Parish Life",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/parish-community.jpg",
    season: 2,
    episode: 4
  },
  {
    id: 6,
    title: "Prayer Life: Finding God in Daily Routine",
    description: "Sr Catherine from the local convent shares practical advice on developing a meaningful prayer life that fits into our busy modern schedules.",
    host: "Deacon Michael",
    guest: "Sr Catherine",
    date: "2024-12-06",
    duration: "30 minutes",
    category: "Prayer & Devotion",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/daily-prayer.jpg",
    season: 2,
    episode: 3
  }
]

const categories = ["All", "Spiritual Formation", "Liturgy & Worship", "Saints & Spirituality", "Youth & Family", "Parish Life", "Prayer & Devotion"]

const platforms = [
  { name: 'Apple Podcasts', url: 'https://podcasts.apple.com' },
  { name: 'Spotify', url: 'https://spotify.com' },
  { name: 'Google Podcasts', url: 'https://podcasts.google.com' },
  { name: 'RSS Feed', url: '#rss-feed' }
]

export default function Podcasts() {
  const reducedMotion = prefersReducedMotion()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)

  const filteredEpisodes = podcastEpisodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.host.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || episode.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredEpisodes = podcastEpisodes.filter(episode => episode.featured)

  const togglePlay = (episodeId: number) => {
    if (currentlyPlaying === episodeId) {
      setCurrentlyPlaying(null)
    } else {
      setCurrentlyPlaying(episodeId)
    }
  }

  return (
    <PageLayout
      title="Podcasts"
      description="Listen to inspiring talks, homilies, and discussions from St Saviour's Catholic Church covering faith, spirituality, and Catholic teaching."
      keywords="Catholic Podcast, Faith Podcast, Spiritual Formation, Catholic Teaching, Parish Podcast, Religious Audio"
    >
      {/* Hero Section */}
      <PageHero
        title="St Saviour's Podcasts"
        subtitle="Faith On-the-Go"
        description="Listen to inspiring conversations about faith, spirituality, and Catholic living wherever you are."
        backgroundImage="/images/hero/podcast-studio.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Rss className="h-5 w-5" />}
            >
              Subscribe Now
            </Button>
            <Link href="/weekly-newsletter">
              <Button 
                variant="secondary" 
                size="lg"
              >
                Get Newsletter
              </Button>
            </Link>
          </Flex>
        }
      />

      {/* Podcast Info */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full">
              <Mic className="h-10 w-10 text-gold-600" />
            </div>
            
            <div className="space-y-6">
              <Heading level="h2" align="center" className="text-3xl lg:text-4xl font-light">
                Faith Conversations
              </Heading>
              <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
                Our weekly podcast features discussions on Catholic teaching, spiritual formation, and practical faith living. 
                Each episode offers insights to help you grow closer to God and live out your Catholic faith with joy and purpose.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Button 
                variant="primary" 
                size="lg"
                leftIcon={<Rss className="h-5 w-5" />}
              >
                Subscribe
              </Button>
              <Link href="/weekly-newsletter">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Get Newsletter
                </Button>
              </Link>
            </Flex>
          </div>
        </Container>
      </Section>

      {/* Featured Episodes */}
      {featuredEpisodes.length > 0 && (
        <Section spacing="lg" background="white">
          <Container size="lg">
            <div className="text-center mb-12">
              <Heading level="h2" align="center" className="mb-6">
                Featured Episodes
              </Heading>
              <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
                Our most popular and impactful podcast episodes
              </Text>
            </div>

            <Grid cols={2} gap="lg">
              {featuredEpisodes.map((episode, index) => (
                <PodcastEpisodeCard
                  key={episode.id}
                  episode={episode}
                  variant="featured"
                  isPlaying={currentlyPlaying === episode.id}
                  onTogglePlay={togglePlay}
                  delay={index * 0.1}
                />
              ))}
            </Grid>
          </Container>
        </Section>
      )}

      {/* Search and Filter */}
      <Section spacing="md" background="white">
        <Container size="lg">
          <PodcastSearch
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            categories={categories}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            resultsCount={filteredEpisodes.length}
          />
        </Container>
      </Section>

      {/* All Episodes */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              All Episodes
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Browse our complete collection of faith conversations and spiritual content
            </Text>
          </div>

          {filteredEpisodes.length === 0 ? (
            <div className="text-center py-12">
              <Text size="xl" color="muted">
                No episodes found matching your search criteria.
              </Text>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredEpisodes.map((episode, index) => (
                <PodcastEpisodeCard
                  key={episode.id}
                  episode={episode}
                  variant="horizontal"
                  isPlaying={currentlyPlaying === episode.id}
                  onTogglePlay={togglePlay}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Subscribe Section */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <PodcastSubscribe
            platforms={platforms}
            contactUrl="/contact-us"
          />
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'