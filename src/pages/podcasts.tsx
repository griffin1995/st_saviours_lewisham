import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, LazyMotion, domAnimation, useScroll, useTransform, m } from 'framer-motion'
import { useSpring, animated, useTrail, useInView } from '@react-spring/web'
import { 
  MicrophoneIcon as Mic, 
  RssIcon as Rss,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  MusicalNoteIcon,
  SparklesIcon,
  HeartIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid'

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
import {
  ScriptureCard,
  SocialSharingSystem,
  ProgressIndicator
} from '@/components/enhanced'
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [audioWaveform, setAudioWaveform] = useState<number[]>([])
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])
  
  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!reducedMotion) {
        setMousePosition({
          x: (e.clientX - window.innerWidth / 2) * 0.008,
          y: (e.clientY - window.innerHeight / 2) * 0.008
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reducedMotion])
  
  // Simulated audio waveform for visual effect
  useEffect(() => {
    const generateWaveform = () => {
      const waveform = Array.from({ length: 50 }, () => 
        Math.random() * 100 + (currentlyPlaying ? 20 : 5)
      )
      setAudioWaveform(waveform)
    }
    
    generateWaveform()
    const interval = setInterval(generateWaveform, currentlyPlaying ? 100 : 2000)
    return () => clearInterval(interval)
  }, [currentlyPlaying])
  
  // React Spring animations for episode cards
  const [episodesRef, episodesInView] = useInView()
  const episodeTrail = useTrail(filteredEpisodes.length, {
    opacity: episodesInView ? 1 : 0,
    transform: episodesInView ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.95)',
    config: { tension: 180, friction: 25 },
    delay: (i) => i * 100
  })
  
  // Enhanced hero animation with audio visualization
  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 30 },
    delay: 200
  })
  
  // Performance monitoring for audio content
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('Podcasts page load time:', entry.duration)
        }
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
        }
      }
    })
    
    observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint'] })
    return () => observer.disconnect()
  }, [])
  
  // Enhanced keyboard navigation for audio controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space to play/pause current episode
      if (e.code === 'Space' && currentlyPlaying && (!e.target || (e.target as HTMLElement).tagName !== 'INPUT')) {
        e.preventDefault()
        togglePlay(currentlyPlaying)
      }
      
      // Arrow keys for episode navigation
      if (e.code === 'ArrowRight' && currentlyPlaying) {
        const currentIndex = filteredEpisodes.findIndex(ep => ep.id === currentlyPlaying)
        const nextEpisode = filteredEpisodes[currentIndex + 1]
        if (nextEpisode) {
          togglePlay(nextEpisode.id)
        }
      }
      
      if (e.code === 'ArrowLeft' && currentlyPlaying) {
        const currentIndex = filteredEpisodes.findIndex(ep => ep.id === currentlyPlaying)
        const prevEpisode = filteredEpisodes[currentIndex - 1]
        if (prevEpisode) {
          togglePlay(prevEpisode.id)
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentlyPlaying, filteredEpisodes])

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
    
    // Announce episode changes for screen readers
    const episode = podcastEpisodes.find(ep => ep.id === episodeId)
    if (episode) {
      const announcement = currentlyPlaying === episodeId ? 
        `Stopped playing ${episode.title}` : 
        `Now playing ${episode.title} by ${episode.host}`
      
      // Create temporary announcement element
      const announcer = document.createElement('div')
      announcer.setAttribute('aria-live', 'polite')
      announcer.setAttribute('aria-atomic', 'true')
      announcer.className = 'sr-only'
      announcer.textContent = announcement
      document.body.appendChild(announcer)
      
      setTimeout(() => {
        document.body.removeChild(announcer)
      }, 1000)
    }
  }

  return (
    <PageLayout
      title="Podcasts"
      description="Listen to inspiring talks, homilies, and discussions from St Saviour's Catholic Church covering faith, spirituality, and Catholic teaching."
      keywords="Catholic Podcast, Faith Podcast, Spiritual Formation, Catholic Teaching, Parish Podcast, Religious Audio"
    >
      {/* Screen Reader Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        role="status"
      >
        {currentlyPlaying && (
          <div>Now playing episode {currentlyPlaying}</div>
        )}
      </div>
      
      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
        <a 
          href="#main-content" 
          className="bg-gold-500 text-slate-900 px-4 py-2 rounded font-medium"
        >
          Skip to main content
        </a>
      </div>
      
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
      {/* Enhanced Hero Section with Audio Visualization */}
      <LazyMotion features={domAnimation}>
        <section 
          className="relative overflow-hidden"
          role="banner"
          aria-labelledby="podcast-hero-heading"
        >
          <m.div 
            style={{ y, opacity }}
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
            aria-hidden="true"
          />
          
          {/* Animated background elements */}
          <m.div
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
          >
            <MusicalNoteIcon className="absolute top-1/4 left-1/4 h-8 w-8 text-gold-400" />
            <Mic className="absolute top-1/3 right-1/3 h-6 w-6 text-purple-300" />
            <SpeakerWaveIcon className="absolute bottom-1/4 left-1/3 h-7 w-7 text-gold-500" />
            <SparklesIcon className="absolute top-1/2 right-1/4 h-5 w-5 text-purple-400" />
          </m.div>
          
          {/* Audio waveform visualization */}
          <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 opacity-30" aria-hidden="true">
            {audioWaveform.map((height, index) => (
              <m.div
                key={index}
                className="bg-gradient-to-t from-gold-500 to-purple-500 w-1"
                animate={{ height: `${height}%` }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.02,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2
                }}
              />
            ))}
          </div>
          
          <animated.div style={heroSpring}>
            <PageHero
              title="St Saviour's Podcasts"
              subtitle="Faith On-the-Go"
              description="Listen to inspiring conversations about faith, spirituality, and Catholic living wherever you are."
              backgroundImage="/images/hero/podcast-studio.jpg"
              height="large"
              overlay="medium"
              actions={
                <Flex justify="center" gap="md" role="group" aria-label="Podcast actions">
                  <m.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button 
                      variant="primary" 
                      size="lg"
                      leftIcon={<Rss className="h-5 w-5" aria-hidden="true" />}
                      aria-describedby="subscribe-help"
                    >
                      Subscribe Now
                    </Button>
                    <span id="subscribe-help" className="sr-only">
                      Subscribe to our podcast on your favourite platform
                    </span>
                  </m.div>
                  <Link href="/weekly-newsletter">
                    <m.div
                      whileHover={{ scale: 1.05, rotateY: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        variant="secondary" 
                        size="lg"
                        aria-describedby="newsletter-help"
                      >
                        Get Newsletter
                      </Button>
                      <span id="newsletter-help" className="sr-only">
                        Subscribe to our weekly newsletter for updates
                      </span>
                    </m.div>
                  </Link>
                </Flex>
              }
            />
          </animated.div>
        </section>
      </LazyMotion>

      {/* Enhanced Podcast Info with Animations */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full"
              whileHover={{ 
                scale: 1.1,
                rotate: [0, 5, -5, 0],
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.6 }}
            >
              <Mic className="h-10 w-10 text-gold-600" />
            </motion.div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Heading level="h2" align="center" className="text-3xl lg:text-4xl font-light">
                  Faith Conversations
                </Heading>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
                  Our weekly podcast features discussions on Catholic teaching, spiritual formation, and practical faith living. 
                  Each episode offers insights to help you grow closer to God and live out your Catholic faith with joy and purpose.
                </Text>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Flex justify="center" gap="md" wrap>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="primary" 
                    size="lg"
                    leftIcon={<Rss className="h-5 w-5" />}
                  >
                    Subscribe
                  </Button>
                </motion.div>
                <Link href="/weekly-newsletter">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      size="lg"
                    >
                      Get Newsletter
                    </Button>
                  </motion.div>
                </Link>
              </Flex>
            </motion.div>
          </motion.div>
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

      {/* Enhanced All Episodes with React Spring */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              All Episodes
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Browse our complete collection of faith conversations and spiritual content
            </Text>
          </motion.div>

          {filteredEpisodes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <Text size="xl" color="muted">
                No episodes found matching your search criteria.
              </Text>
            </motion.div>
          ) : (
            <div ref={episodesRef} className="space-y-6">
              {episodeTrail.map((style, index) => {
                const episode = filteredEpisodes[index]
                if (!episode) return null
                
                return (
                  <animated.div
                    key={episode.id}
                    style={style}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <PodcastEpisodeCard
                        episode={episode}
                        variant="horizontal"
                        isPlaying={currentlyPlaying === episode.id}
                        onTogglePlay={togglePlay}
                        delay={index * 0.1}
                      />
                    </motion.div>
                  </animated.div>
                )
              })}
            </div>
          )}
        </Container>
      </Section>

      {/* Podcast Analytics Dashboard */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <PodcastAnalytics />
        </Container>
      </Section>

      {/* Scripture Card */}
      <Section spacing="sm" background="slate">
        <Container size="md">
          <ScriptureCard 
            theme="wisdom"
            reference="Proverbs 27:17"
            text="As iron sharpens iron, so one person sharpens another."
            reflection="Through our podcast discussions and community conversations, we grow together in faith and understanding."
          />
        </Container>
      </Section>

      {/* Community Discussion */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <PodcastCommunityDiscussion 
            episodeId={featuredEpisodes[0]?.id || 1}
            episodeTitle={featuredEpisodes[0]?.title || "Latest Episode"}
          />
        </Container>
      </Section>

      {/* Enhanced Subscribe Section with Social Sharing */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <div className="space-y-8">
            <PodcastSubscribe
              platforms={platforms}
              contactUrl="/contact-us"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <SocialSharingSystem 
                pageTitle="St Saviour's Podcasts - Faith On-the-Go"
                pageUrl="https://stsaviourlewisham.org.uk/podcasts"
                description="Listen to inspiring conversations about faith, spirituality, and Catholic living. New episodes weekly."
              />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Progress Indicator */}
      <ProgressIndicator />
      </main>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'