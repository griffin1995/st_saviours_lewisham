import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Camera, Heart, Mail, Phone } from 'lucide-react'

// New modern component system
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Card, 
  CardContent,
  Heading, 
  Text, 
  Section,
  Flex,
  Container
} from '@/components/ui'
import { GalleryGrid, ImageLightbox, type GalleryImage } from '@/components/church'
import { prefersReducedMotion } from '@/lib/utils'

// Gallery data
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/pexels-pixabay-208216.jpg",
    alt: "St Saviour's Church exterior",
    title: "Our Beautiful Church",
    category: "Church Building",
    date: "2024-12-15",
    description: "The magnificent Victorian architecture of St Saviour's Catholic Church"
  },
  {
    id: 2,
    src: "/images/church/interior-nave.jpg",
    alt: "Church interior nave",
    title: "Sacred Interior",
    category: "Church Building",
    date: "2024-12-10",
    description: "The nave of our church, where our community gathers for worship"
  },
  {
    id: 3,
    src: "/images/pexels-pixabay-208216.jpg",
    alt: "Christmas Mass celebration",
    title: "Christmas Celebration",
    category: "Liturgical Celebrations",
    date: "2024-12-25",
    description: "Our parish family celebrating the birth of Christ"
  },
  {
    id: 4,
    src: "/images/events/first-communion.jpg",
    alt: "First Holy Communion ceremony",
    title: "First Holy Communion",
    category: "Sacraments",
    date: "2024-05-12",
    description: "Children receiving Jesus in the Eucharist for the first time"
  },
  {
    id: 5,
    src: "/images/events/confirmation.jpg",
    alt: "Confirmation ceremony",
    title: "Confirmation Service",
    category: "Sacraments",
    date: "2024-06-08",
    description: "Young people being sealed with the Holy Spirit"
  },
  {
    id: 6,
    src: "/images/community/parish-picnic.jpg",
    alt: "Parish picnic gathering",
    title: "Parish Picnic",
    category: "Community Events",
    date: "2024-07-20",
    description: "Our annual parish picnic bringing families together"
  },
  {
    id: 7,
    src: "/images/church/altar-close.jpg",
    alt: "Church altar detail",
    title: "Sacred Altar",
    category: "Church Building",
    date: "2024-11-30",
    description: "The beautiful altar where the Eucharist is celebrated"
  },
  {
    id: 8,
    src: "/images/events/easter-vigil.jpg",
    alt: "Easter Vigil service",
    title: "Easter Vigil",
    category: "Liturgical Celebrations",
    date: "2024-03-30",
    description: "The most sacred night of the year - the Easter Vigil"
  },
  {
    id: 9,
    src: "/images/community/volunteer-fair.jpg",
    alt: "Volunteer fair",
    title: "Volunteer Fair",
    category: "Community Events",
    date: "2024-09-15",
    description: "Parishioners learning about ways to serve our community"
  },
  {
    id: 10,
    src: "/images/church/stained-glass.jpg",
    alt: "Beautiful stained glass windows",
    title: "Stained Glass Windows",
    category: "Church Building",
    date: "2024-10-05",
    description: "Our historic stained glass windows telling stories of faith"
  },
  {
    id: 11,
    src: "/images/events/wedding-ceremony.jpg",
    alt: "Wedding ceremony",
    title: "Wedding Blessing",
    category: "Sacraments",
    date: "2024-08-18",
    description: "A beautiful Catholic wedding ceremony"
  },
  {
    id: 12,
    src: "/images/community/youth-group.jpg",
    alt: "Youth group gathering",
    title: "Youth Ministry",
    category: "Community Events",
    date: "2024-11-10",
    description: "Our vibrant youth group in action"
  }
]

const categories = ["All", "Church Building", "Liturgical Celebrations", "Sacraments", "Community Events"]

export default function Gallery() {
  const reducedMotion = prefersReducedMotion()
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [currentCategory, setCurrentCategory] = useState('All')

  // Calculate filtered images based on current category
  const filteredImages = galleryImages.filter(image => 
    currentCategory === 'All' || image.category === currentCategory
  )

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
      : (lightboxIndex + 1) % filteredImages.length
    
    setLightboxIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <PageLayout
      title="Gallery"
      description="Explore photos of our beautiful church, celebrations, sacraments, and community life at St Saviour's Catholic Church in Lewisham."
      keywords="Photo Gallery, Church Photos, Community Events, Sacraments, Catholic Church Lewisham, Parish Life"
    >
      {/* Hero Section */}
      <PageHero
        title="Photo Gallery"
        subtitle="Capturing Our Faith Journey"
        description="Explore the beauty of our church, celebrations, and vibrant community life through these cherished moments."
        backgroundImage="/images/hero/church-gathering.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Camera className="h-5 w-5" />}
            >
              View Gallery
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Mail className="h-5 w-5" />}
            >
              Submit Photos
            </Button>
          </Flex>
        }
      />

      {/* Introduction */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8 max-w-4xl mx-auto mb-16"
          >
            <Heading level="h2" align="center" className="mb-6">
              Our Parish Life in Pictures
            </Heading>
            <Text size="xl" align="center" color="muted" className="leading-relaxed">
              From sacred liturgical celebrations to joyful community gatherings, 
              these photos capture the essence of our faith community. Browse through 
              memories of sacraments, events, and the beautiful spaces where we worship.
            </Text>
          </motion.div>
        </Container>
      </Section>

      {/* Gallery Grid */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <GalleryGrid
            images={galleryImages}
            categories={categories}
            columns={4}
            showFilter={true}
            onImageClick={handleImageClick}
            initialCategory={currentCategory}
            className="mb-16"
          />
        </Container>
      </Section>

      {/* Share Your Photos CTA */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <Heart className="h-12 w-12 text-gold-400 mx-auto mb-6" />
            
            <Heading level="h2" className="text-3xl lg:text-4xl font-light mb-6 text-white">
              Share Your Moments
            </Heading>
            
            <Text size="xl" className="text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Have photos from parish events you'd like to share? We'd love to include them 
              in our gallery to celebrate our community together and preserve these precious memories.
            </Text>
            
            <Flex justify="center" gap="md" wrap>
              <a href="mailto:photos@saintsaviours.org.uk">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Camera className="h-5 w-5" />}
                >
                  Submit Photos
                </Button>
              </a>
              <Link href="/contact-us">
                <Button 
                  variant="secondary" 
                  size="lg"
                  leftIcon={<Phone className="h-5 w-5" />}
                >
                  Contact Us
                </Button>
              </Link>
            </Flex>
          </motion.div>
        </Container>
      </Section>

      {/* Photography Guidelines */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Photography Guidelines
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              When taking photos at parish events, please follow these simple guidelines
            </Text>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Respectful Photography",
                description: "Please be mindful during liturgical celebrations and ask permission before photographing individuals."
              },
              {
                icon: Heart,
                title: "Share the Joy",
                description: "We love seeing community events, celebrations, and fellowship moments that show our parish spirit."
              },
              {
                icon: Mail,
                title: "High Quality Images",
                description: "Please submit high-resolution photos with a brief description of the event and date taken."
              }
            ].map((guideline, index) => (
              <motion.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card variant="default" padding="lg" className="text-center h-full bg-white">
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center mx-auto">
                        <guideline.icon className="h-6 w-6 text-white" />
                      </div>
                      <Heading level="h3" align="center" className="font-semibold">
                        {guideline.title}
                      </Heading>
                      <Text color="muted" align="center">
                        {guideline.description}
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Image Lightbox */}
      <ImageLightbox
        image={selectedImage}
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
        showNavigation={true}
      />
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'