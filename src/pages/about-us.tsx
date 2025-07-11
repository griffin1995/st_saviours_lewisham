import React, { useEffect, useRef } from 'react'
// Dynamic GSAP imports for SSR compatibility
import { Loader } from '@googlemaps/js-api-loader'
import { 
  HomeModernIcon as Church, 
  HeartIcon as Heart, 
  UserGroupIcon as Users, 
  AcademicCapIcon as BookOpen, 
  CalendarDaysIcon as Calendar, 
  SparklesIcon as Star, 
  TrophyIcon as Award, 
  ClockIcon as Clock, 
  EnvelopeIcon as Mail, 
  PhoneIcon as Phone,
  ArrowRightIcon,
  MapPinIcon
} from '@heroicons/react/24/solid'

// Enhanced 2025 Components
import { Motion, fadeInUp, reverentReveal, staggerChildren } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import { InteractiveStatistics } from '@/components/enhanced/InteractiveStatistics'
import { EnhancedTimeline } from '@/components/enhanced/EnhancedTimeline'
import { ScriptureCard } from '@/components/enhanced/ScriptureCard'
import { LeadershipCarousel } from '@/components/enhanced/LeadershipCarousel'
import { PhotoSwipeLightbox, EnhancedImage } from '@/components/enhanced/PhotoSwipeLightbox'

// Modern imports with Zustand integration
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Card, 
  CardContent,
  Heading, 
  Text, 
  Section,
  Grid,
  Flex,
  Container
} from '@/components/ui'
import { useUI, useActions } from '@/stores/churchStore'
import { priestBiographies } from '@/lib/data'

export default function AboutUs() {
  const ui = useUI()
  const actions = useActions()
  const mapRef = useRef<HTMLDivElement>(null)

  // Enhanced page initialization
  useEffect(() => {
    actions.addNotification({
      type: 'info',
      message: 'Welcome to our About page',
      dismissible: true
    })
  }, [])

  // Google Maps integration for CTA section
  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places']
      })

      try {
        const google = await loader.load()
        
        const map = new google.maps.Map(mapRef.current!, {
          center: { lat: 51.4619, lng: -0.0366 }, // St Saviour's coordinates
          zoom: 15,
          styles: [
            // Catholic color scheme map styling
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ color: '#1a365d' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#d4af37' }]
            }
          ]
        })

        new google.maps.Marker({
          position: { lat: 51.4619, lng: -0.0366 },
          map: map,
          title: "St Saviour's Catholic Church",
          icon: {
            url: '/icons/church-marker.svg',
            scaledSize: new google.maps.Size(40, 40)
          }
        })
      } catch (error) {
        console.log('Maps API not available')
        // Show fallback content
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="w-full h-full bg-navy-900 rounded-xl flex items-center justify-center">
              <div class="text-center text-white">
                <div class="w-16 h-16 bg-gold-700/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg class="h-8 w-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <p class="text-lg font-medium">St Saviour's Catholic Church</p>
                <p class="text-gray-300">Lewisham High Street, SE13 6AA</p>
              </div>
            </div>
          `
        }
      }
    }

    initMap()
  }, [])

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: ui.reducedMotion ? 0.2 : 0.8,
        staggerChildren: ui.reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ui.reducedMotion ? 0.2 : 0.6 }
    }
  }

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: ui.reducedMotion ? 0.2 : 0.5 }
    }
  }

  // Data arrays for cleaner code
  const stats = [
    { number: "135+", label: "Years of Service", icon: Calendar },
    { number: "500+", label: "Families", icon: Users },
    { number: "7", label: "Weekly Masses", icon: Clock },
    { number: "15+", label: "Parish Groups", icon: Star }
  ]

  const values = [
    {
      icon: Heart,
      title: "Love & Compassion",
      description: "We strive to show Christ's love through our actions and care for one another.",
      gradient: "from-navy-600 to-navy-500"
    },
    {
      icon: Users,
      title: "Community", 
      description: "We welcome all people and build meaningful relationships across generations.",
      gradient: "from-navy-500 to-navy-400"
    },
    {
      icon: Church,
      title: "Worship",
      description: "We gather to celebrate the Eucharist and grow in our relationship with God.",
      gradient: "from-navy-700 to-navy-600"
    },
    {
      icon: BookOpen,
      title: "Learning",
      description: "We are committed to ongoing formation and deepening our understanding of faith.",
      gradient: "from-navy-800 to-navy-700"
    }
  ]

  const timelineEvents: Array<{
    year: string
    title: string
    event: string
    icon: React.ComponentType<any>
    image: string
    side: 'left' | 'right'
  }> = [
    { 
      year: "849-918", 
      title: "Medieval Origins", 
      event: "King Alfred the Great was Lord of the Manor of Leofshema. In 918, the Manor was given to Saint Peter's Abbey, Ghent.", 
      icon: Award,
      image: "/images/chapel_st_patrick_st_saviours.jpeg",
      side: "left"
    },
    { 
      year: "1553-1558", 
      title: "Tudor Restoration", 
      event: "Following the English Reformation under Henry VIII, the Priory was briefly restored in the reign of Mary I under Cardinal Reginald Pole.", 
      icon: Church,
      image: "/images/stained_glass_st_margaret_clitherow_st_saviours.jpeg",
      side: "right"
    },
    { 
      year: "1894", 
      title: "Parish Founded", 
      event: "Fr McClymont was appointed as the first resident priest, establishing the modern St Saviour's parish.", 
      icon: Church,
      image: "/images/st_saviours_frontage_war_memorial.jpeg",
      side: "left"
    },
    { 
      year: "1909", 
      title: "Church Opens", 
      event: "Foundation stone laid on April 24th and church officially opened by Bishop Peter Amigo on December 9th, with the Lord and Lady Mayor of London attending.", 
      icon: Award,
      image: "/images/st_saviours_frontage_war_memorial.jpeg",
      side: "right"
    },
    { 
      year: "1910", 
      title: "School Established", 
      event: "St Saviour's Catholic School opened - the first new Catholic school in the diocese under the 1902 Education Act.", 
      icon: BookOpen,
      image: "/images/chapel_st_patrick_st_saviours.jpeg",
      side: "left"
    },
    { 
      year: "1917", 
      title: "Church Consecrated", 
      event: "After the debt of £3,000 was paid off, the church was consecrated on October 23rd.", 
      icon: Star,
      image: "/images/stained_glass_st_margaret_clitherow_st_saviours.jpeg",
      side: "right"
    },
    { 
      year: "1928-29", 
      title: "Campanile Completed", 
      event: "The famous Campanile topped by a 12-foot statue of Christ the King was completed as a commemoration of the Centenary of Catholic Emancipation.", 
      icon: Church,
      image: "/images/st_saviours_frontage_war_memorial.jpeg",
      side: "left"
    },
    { 
      year: "2025", 
      title: "Jubilee Sanctuary", 
      event: "St Saviour's was designated a special sanctuary during the Jubilee Year of Hope, serving parishioners from 80+ countries.", 
      icon: Heart,
      image: "/images/st_saviours_interior_1939_archive_photo.jpeg",
      side: "right"
    }
  ]

  const leadership = [
    {
      name: "Fr Krzysztof Krzyskow",
      role: "Parish Priest",
      description: "Leading our parish with wisdom and compassion, Fr Krzysztof brings years of pastoral experience to guide our community in faith and service.",
      icon: Church,
      image: "/images/fr_krzysztof_krzyskow_parish_priest_st_saviours.jpeg"
    },
    {
      name: "Fr Kenneth Iwunna", 
      role: "Assistant Priest",
      description: "Supporting our parish ministries and outreach programs, Fr Kenneth brings energy and dedication to serving our diverse community.",
      icon: BookOpen,
      image: "/images/fr_kenneth_iwunna_assistant_priest_st_saviours.jpeg"
    }
  ]

  return (
    <PageLayout
      title="About Us"
      description="Learn about St Saviour's Catholic Church in Lewisham - our history, mission, and vibrant community serving South East London."
      keywords="About St Saviours, Catholic Church Lewisham, Parish History, Community, Mission, Values"
      background="white"
    >
      {/* Hero Section */}
      <PageHero
        title="About St Saviour's"
        subtitle="Our Community"
        description="A vibrant Catholic community in the heart of Lewisham, welcoming all to experience God's love and grace."
        pageName="about-us"
        height="large"
        overlay="medium"
      />

      {/* Enhanced Interactive Statistics with Chart.js */}
      <Section spacing="md" background="slate">
        <ScrollRevealSection>
          <Container>
            <Motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Our Parish by the Numbers
                {/* Gold accent underline */}
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '120px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                These numbers represent the vibrant community that makes St Saviour's a beacon of faith in Lewisham.
              </p>
            </Motion.div>
            
            <InteractiveStatistics 
              stats={stats} 
              reducedMotion={ui.reducedMotion}
              showCharts={true}
            />
          </Container>
        </ScrollRevealSection>
      </Section>

      {/* Enhanced Mission Statement with Scripture Card */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <ScrollRevealSection variant="reverent">
            <div className="text-center space-y-12">
              <Motion.div
                className="w-20 h-20 icon-container-white rounded-full flex items-center justify-center mx-auto shadow-lg"
                whileHover={ui.reducedMotion ? {} : { scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.4 }}
              >
                <Church className="h-10 w-10 icon-theme-dark" />
              </Motion.div>
              
              <h2 className={`${typographyScale.h1} text-white mb-8 relative`}>
                Our Mission
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '80px' }}
                />
              </h2>
              
              <ScriptureCard
                title=""
                content="St Saviour's Catholic Church exists to be a beacon of hope and faith in Lewisham, where all people can encounter the transforming love of Jesus Christ and grow together as a community of believers."
                verse="Matthew 5:14 - 'You are the light of the world'"
                variant="mission"
                reducedMotion={ui.reducedMotion}
              />

              {/* Mission highlights with enhanced animations */}
              <Motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                variants={staggerChildren}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  { icon: Heart, text: "Welcome All", desc: "Every person finds a home" },
                  { icon: Users, text: "Build Community", desc: "Strengthen bonds of faith" },
                  { icon: Star, text: "Share Faith", desc: "Spread God's love" }
                ].map((item, index) => (
                  <Motion.div
                    key={index}
                    className="flex flex-col items-center space-y-4 group"
                    variants={fadeInUp}
                    whileHover={ui.reducedMotion ? {} : { y: -8, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 bg-gold-700/20 rounded-2xl flex items-center justify-center group-hover:bg-gold-700/30 transition-all duration-300">
                      <item.icon className="h-8 w-8 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                    </div>
                    <div className="text-center">
                      <h3 className={`${typographyScale.h4} text-white mb-2`}>
                        {item.text}
                      </h3>
                      <p className={`${typographyScale.caption} text-gray-300`}>
                        {item.desc}
                      </p>
                    </div>
                  </Motion.div>
                ))}
              </Motion.div>
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Values Section with React Spring */}
      <Section spacing="lg" background="slate">
        <ScrollRevealSection>
          <Motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
              Our Core Values
              <Motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ width: '120px' }}
              />
            </h2>
            <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
              These core values guide everything we do as a parish community, shaping our mission and ministry.
            </p>
          </Motion.div>

          <Grid cols={4} gap="lg">
            {values.map((value, index) => (
              <Motion.div
                key={index}
                className="group h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Motion.div
                  className="h-full bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-500 transition-all duration-500 rounded-2xl p-8 group-hover:bg-white/15"
                  whileHover={ui.reducedMotion ? {} : { y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center space-y-6 h-full flex flex-col justify-between">
                    <div>
                      <Motion.div 
                        className="w-20 h-20 icon-container-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        whileHover={ui.reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <value.icon className="h-10 w-10 icon-theme-dark" />
                      </Motion.div>
                      <h3 className={`${typographyScale.h3} text-white mb-4 group-hover:text-gold-300 transition-colors duration-300`}>
                        {value.title}
                      </h3>
                    </div>
                    <p className={`${typographyScale.body} text-gray-100 leading-relaxed`}>
                      {value.description}
                    </p>
                  </div>
                </Motion.div>
              </Motion.div>
            ))}
          </Grid>
        </ScrollRevealSection>
      </Section>

      {/* Enhanced History Section with GSAP Timeline */}
      <Section spacing="lg" background="slate">
        <Container>
          <ScrollRevealSection variant="reverent">
            <Motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Our Sacred History
                <Motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-4xl mx-auto leading-relaxed`}>
                From medieval origins to modern sanctuary, discover the remarkable journey of St Saviour's Catholic Church through the centuries of faith and service.
              </p>
            </Motion.div>

            {/* Enhanced Timeline with PhotoSwipe Integration */}
            <PhotoSwipeLightbox 
              galleryId="history-gallery" 
              images={timelineEvents.map(event => ({
                src: event.image,
                width: 800,
                height: 600,
                alt: event.title,
                caption: `${event.year} - ${event.title}: ${event.event}`
              }))}
            >
              <EnhancedTimeline 
                events={timelineEvents} 
                reducedMotion={ui.reducedMotion}
              />
            </PhotoSwipeLightbox>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Leadership Section with Embla Carousel */}
      <Section spacing="lg" background="slate">
        <ScrollRevealSection>
          <Motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
              Our Spiritual Leadership
              <Motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ width: '160px' }}
              />
            </h2>
            <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
              Meet the dedicated priests and pastoral team who guide our parish community with wisdom, compassion, and faith.
            </p>
          </Motion.div>

          <LeadershipCarousel
            leaders={leadership}
            priestBiographies={priestBiographies}
            autoplay={!ui.reducedMotion}
            reducedMotion={ui.reducedMotion}
          />
        </ScrollRevealSection>
      </Section>

      {/* Enhanced Call to Action with Google Maps */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - CTA Content */}
              <Motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                    Join Our Faith Community
                    <Motion.div
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      style={{ width: '120px' }}
                    />
                  </h2>
                  <p className={`${typographyScale.bodyLarge} text-gray-100 leading-relaxed`}>
                    Whether you're new to the area or have been part of Lewisham for years, 
                    we'd love to welcome you to St Saviour's vibrant Catholic community.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Motion.div
                    whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                  >
                    <Button 
                      variant="primary" 
                      size="lg" 
                      leftIcon={<Mail className="h-5 w-5" />}
                      rightIcon={<ArrowRightIcon className="h-4 w-4" />}
                      className="bg-white text-slate-900 hover:bg-gray-100 shadow-xl"
                    >
                      Get in Touch
                    </Button>
                  </Motion.div>
                  
                  <Motion.div
                    whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                  >
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      leftIcon={<Clock className="h-5 w-5" />}
                      className="border-white/30 text-white hover:bg-white/10 hover:border-white"
                    >
                      Mass Times
                    </Button>
                  </Motion.div>
                </div>

                {/* Enhanced contact info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center">
                      <MapPinIcon className="h-5 w-5 text-gold-400" />
                    </div>
                    <div>
                      <p className={`${typographyScale.body} text-white font-medium`}>Visit Us</p>
                      <p className={`${typographyScale.caption} text-gray-300`}>Lewisham High Street, SE13 6AA</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center">
                      <Phone className="h-5 w-5 text-gold-400" />
                    </div>
                    <div>
                      <p className={`${typographyScale.body} text-white font-medium`}>Call Us</p>
                      <p className={`${typographyScale.caption} text-gray-300`}>020 8852 3073</p>
                    </div>
                  </div>
                </div>
              </Motion.div>

              {/* Right Column - Interactive Google Map */}
              <Motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 group hover:border-gold-500/50 transition-all duration-500">
                  <div className="relative h-80 w-full rounded-xl overflow-hidden">
                    <div ref={mapRef} className="w-full h-full" />
                    {/* Fallback image if Maps API not available */}
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                      <MapPinIcon className="h-16 w-16 text-gold-500" />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`${typographyScale.caption} text-gray-300`}>
                      Click and drag to explore the area around our church
                    </p>
                  </div>
                </div>
              </Motion.div>
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'