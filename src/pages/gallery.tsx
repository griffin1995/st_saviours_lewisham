import React, { useState, useEffect, useCallback } from "react";
import { motion, m } from "framer-motion";
import { useSpring, animated, config } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  Camera,
  Heart,
  Mail,
  Phone,
  Share2,
  BarChart3,
  Eye,
  MousePointer2,
  Zap,
  Calendar,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// New modern component system
import { PageLayout, PageHero } from "@/components/layout";
import {
  Button,
  Card,
  CardContent,
  Heading,
  Text,
  Section,
  Flex,
  Container,
} from "@/components/ui";
import {
  GalleryGrid,
  ImageLightbox,
  type GalleryImage,
} from "@/components/church";
// PhotoSwipe consolidated into shared component
// import {
//   EnhancedGalleryGrid,
//   EnhancedPhotoSwipeLightbox,
// } from "@/components/enhanced";
import { GalleryPagePhotoSwipe, type SharedGalleryImage } from '@/components/shared/gallery';
// ScriptureCard consolidated into shared component
// import { ScriptureCard } from "@/components/enhanced/ScriptureCard";
import { MainPageScriptureSection } from '@/components/shared/content';
import { SocialSharingSystem } from "@/components/enhanced/SocialSharingSystem";
// import { GalleryAnalyticsDashboard } from '@/components/enhanced/GalleryAnalyticsDashboard'
// import { VirtualTourIntegration } from '@/components/enhanced/VirtualTourIntegration'
// import { LivePhotoUpload } from '@/components/enhanced/LivePhotoUpload'
// import { PrayerfulReflectionCard } from '@/components/enhanced/PrayerfulReflectionCard'
// import { AccessibilityEnhancer } from '@/components/enhanced/AccessibilityEnhancer'
// import { PerformanceMonitor } from '@/components/enhanced/PerformanceMonitor'
import { typographyScale } from "@/lib/fonts";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import { prefersReducedMotion } from "@/lib/utils";
import { useUI, useActions } from "@/stores/churchStore";

// Gallery data
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/outside-church-flowers-foreground.jpg",
    alt: "St Saviour's Church exterior",
    title: "Our Beautiful Church",
    category: "Church Building",
    date: "2024-12-15",
    description:
      "The magnificent Victorian architecture of St Saviour's Catholic Church",
  },
  {
    id: 2,
    src: "/images/inside-church-aisle.jpg",
    alt: "Church interior nave",
    title: "Sacred Interior",
    category: "Church Building",
    date: "2024-12-10",
    description:
      "The nave of our church, where our community gathers for worship",
  },
  {
    id: 3,
    src: "/images/outside-church-flowers-foreground.jpg",
    alt: "Christmas Mass celebration",
    title: "Christmas Celebration",
    category: "Liturgical Celebrations",
    date: "2024-12-25",
    description: "Our parish family celebrating the birth of Christ",
  },
  {
    id: 4,
    src: "/images/chapel_st_patrick_st_saviours.jpeg",
    alt: "First Holy Communion ceremony",
    title: "First Holy Communion",
    category: "Sacraments",
    date: "2024-05-12",
    description: "Children receiving Jesus in the Eucharist for the first time",
  },
  {
    id: 5,
    src: "/images/stained_glass_st_margaret_clitherow_st_saviours.jpeg",
    alt: "Confirmation ceremony",
    title: "Confirmation Service",
    category: "Sacraments",
    date: "2024-06-08",
    description: "Young people being sealed with the Holy Spirit",
  },
  {
    id: 6,
    src: "/images/st_saviours_frontage_war_memorial.jpeg",
    alt: "Parish picnic gathering",
    title: "Parish Picnic",
    category: "Community Events",
    date: "2024-07-20",
    description: "Our annual parish picnic bringing families together",
  },
  {
    id: 7,
    src: "/images/st_saviours_interior_1939_archive_photo.jpeg",
    alt: "Church altar detail",
    title: "Sacred Altar",
    category: "Church Building",
    date: "2024-11-30",
    description: "The beautiful altar where the Eucharist is celebrated",
  },
  {
    id: 8,
    src: "/images/inside-church-jesus-painting.jpg",
    alt: "Easter Vigil service",
    title: "Easter Vigil",
    category: "Liturgical Celebrations",
    date: "2024-03-30",
    description: "The most sacred night of the year - the Easter Vigil",
  },
  {
    id: 9,
    src: "/images/painted-glass-jesus.jpg",
    alt: "Volunteer fair",
    title: "Volunteer Fair",
    category: "Community Events",
    date: "2024-09-15",
    description: "Parishioners learning about ways to serve our community",
  },
  {
    id: 10,
    src: "/images/upward-shot-roof-inside-circular.jpg",
    alt: "Beautiful stained glass windows",
    title: "Stained Glass Windows",
    category: "Church Building",
    date: "2024-10-05",
    description: "Our historic stained glass windows telling stories of faith",
  },
  {
    id: 11,
    src: "/images/inside-church-3-glass-windows.jpg",
    alt: "Wedding ceremony",
    title: "Wedding Blessing",
    category: "Sacraments",
    date: "2024-08-18",
    description: "A beautiful Catholic wedding ceremony",
  },
  {
    id: 12,
    src: "/images/outside-church-tower.jpg",
    alt: "Youth group gathering",
    title: "Youth Ministry",
    category: "Community Events",
    date: "2024-11-10",
    description: "Our vibrant youth group in action",
  },
];

const categories = [
  "All",
  "Church Building",
  "Liturgical Celebrations",
  "Sacraments",
  "Community Events",
];

// Chart.js registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Gallery() {
  const ui = useUI();
  const actions = useActions();
  const reducedMotion = prefersReducedMotion();
  // Lightbox state now handled by shared PhotoSwipe component
  // const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  // const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageStats, setImageStats] = useState<{
    [key: string]: { views: number; likes: number; shares: number };
  }>({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareImageData, setShareImageData] = useState<GalleryImage | null>(
    null
  );
  const { ref: analyticsRef, inView: analyticsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Enhanced page initialization
  useEffect(() => {
    actions.addNotification({
      type: "info",
      message:
        "Welcome to our Photo Gallery - discover our community in pictures",
      dismissible: true,
    });

    // Load image statistics from localStorage
    const savedStats = localStorage.getItem("gallery-image-stats");
    if (savedStats) {
      setImageStats(JSON.parse(savedStats));
    }
  }, []);

  // Mouse tracking for interactive effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Image interaction tracking
  const handleImageView = useCallback((imageId: string) => {
    setImageStats((prev) => {
      const updated = {
        ...prev,
        [imageId]: {
          views: (prev[imageId]?.views || 0) + 1,
          likes: prev[imageId]?.likes || 0,
          shares: prev[imageId]?.shares || 0,
        },
      };
      localStorage.setItem("gallery-image-stats", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleImageLike = useCallback((imageId: string) => {
    setImageStats((prev) => {
      const updated = {
        ...prev,
        [imageId]: {
          views: prev[imageId]?.views || 0,
          likes: (prev[imageId]?.likes || 0) + 1,
          shares: prev[imageId]?.shares || 0,
        },
      };
      localStorage.setItem("gallery-image-stats", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleImageShare = useCallback((image: GalleryImage) => {
    setShareImageData(image);
    setIsShareModalOpen(true);

    setImageStats((prev) => {
      const updated = {
        ...prev,
        [image.id]: {
          views: prev[image.id]?.views || 0,
          likes: prev[image.id]?.likes || 0,
          shares: (prev[image.id]?.shares || 0) + 1,
        },
      };
      localStorage.setItem("gallery-image-stats", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Lightbox handlers now handled by shared PhotoSwipe component
  // Custom image view tracking can be added to shared component if needed
  // const handleImageClick = (image: GalleryImage, index: number) => {
  //   handleImageView(String(image.id));
  //   setSelectedImage(image);
  //   setLightboxIndex(index);
  // };

  // React Spring animations
  const heroSpring = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(30px)" },
    config: ui.reducedMotion ? config.default : config.gentle,
  });

  const analyticsSpring = useSpring({
    opacity: analyticsInView ? 1 : 0,
    transform: analyticsInView ? "translateY(0px)" : "translateY(50px)",
    config: ui.reducedMotion ? config.default : config.gentle,
    delay: 300,
  });

  // Gallery analytics data for Chart.js
  const imageEngagementData = {
    labels: galleryImages
      .slice(0, 8)
      .map((img) => img.title.substring(0, 15) + ".."),
    datasets: [
      {
        label: "Views",
        data: galleryImages
          .slice(0, 8)
          .map((img) => imageStats[img.id]?.views || 0),
        backgroundColor: "rgba(212, 175, 55, 0.6)",
        borderColor: "#d4af37",
        borderWidth: 1,
      },
      {
        label: "Likes",
        data: galleryImages
          .slice(0, 8)
          .map((img) => imageStats[img.id]?.likes || 0),
        backgroundColor: "rgba(26, 54, 93, 0.6)",
        borderColor: "#1a365d",
        borderWidth: 1,
      },
    ],
  };

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
        backgroundImage="/images/inside-upward-shot-church.jpg"
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

      {/* Scripture Inspiration Section */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Witnessing God's Love
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "140px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}
              >
                Every image tells a story of faith, community, and God's
                presence among us
              </p>
            </m.div>

            <div className="max-w-4xl mx-auto">
              <MainPageScriptureSection
                pageTheme="gallery"
                reducedMotion={ui.reducedMotion}
              />
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Introduction */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <animated.div
            style={heroSpring}
            className="text-center space-y-8 max-w-4xl mx-auto mb-16"
          >
            <Heading level="h2" align="center" className="mb-6">
              Our Parish Life in Pictures
            </Heading>
            <Text
              size="xl"
              align="center"
              color="muted"
              className="leading-relaxed"
            >
              From sacred liturgical celebrations to joyful community
              gatherings, these photos capture the essence of our faith
              community. Browse through memories of sacraments, events, and the
              beautiful spaces where we worship.
            </Text>
          </animated.div>
        </Container>
      </Section>

      {/* Gallery Analytics Dashboard */}
      {analyticsInView && (
        <Section spacing="lg" background="white">
          <Container size="lg">
            <animated.div ref={analyticsRef} style={analyticsSpring}>
              <div className="text-center mb-12">
                <h2
                  className={`${typographyScale.h2} text-slate-900 mb-6 relative`}
                >
                  Community Engagement
                  <m.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ width: "120px" }}
                  />
                </h2>
                <p
                  className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}
                >
                  See how our community engages with our visual memories
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <Card
                  variant="default"
                  padding="lg"
                  className="bg-white text-center shadow-lg"
                >
                  <CardContent>
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-2`}>
                      {galleryImages.length}
                    </h3>
                    <p className={`${typographyScale.body} text-gray-600`}>
                      Total Photos
                    </p>
                  </CardContent>
                </Card>

                <Card
                  variant="default"
                  padding="lg"
                  className="bg-white text-center shadow-lg"
                >
                  <CardContent>
                    <div className="w-16 h-16 bg-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-2`}>
                      {Object.values(imageStats).reduce(
                        (sum, stats) => sum + stats.views,
                        0
                      )}
                    </h3>
                    <p className={`${typographyScale.body} text-gray-600`}>
                      Total Views
                    </p>
                  </CardContent>
                </Card>

                <Card
                  variant="default"
                  padding="lg"
                  className="bg-white text-center shadow-lg"
                >
                  <CardContent>
                    <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-2`}>
                      {Object.values(imageStats).reduce(
                        (sum, stats) => sum + stats.likes,
                        0
                      )}
                    </h3>
                    <p className={`${typographyScale.body} text-gray-600`}>
                      Community Likes
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card
                variant="default"
                padding="lg"
                className="bg-white shadow-lg"
              >
                <CardContent>
                  <h3
                    className={`${typographyScale.h3} text-slate-900 mb-6 text-center`}
                  >
                    Most Popular Photos
                  </h3>
                  <div className="h-64">
                    <Bar
                      data={imageEngagementData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            labels: { color: "#374151" },
                          },
                        },
                        scales: {
                          x: {
                            ticks: { color: "#374151" },
                            grid: { color: "rgba(55, 65, 81, 0.1)" },
                          },
                          y: {
                            ticks: { color: "#374151" },
                            grid: { color: "rgba(55, 65, 81, 0.1)" },
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </animated.div>
          </Container>
        </Section>
      )}

      {/* Enhanced Gallery Grid with Mouse Tracking */}
      <Section spacing="lg" background="white" onMouseMove={handleMouseMove}>
        <Container size="xl">
          <div className="relative">
            {/* Mouse tracking parallax background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.1), transparent)`,
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                transition: ui.reducedMotion
                  ? "none"
                  : "transform 0.1s ease-out",
              }}
            />

            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className={`${typographyScale.h2} text-slate-900 mb-6 relative`}
              >
                Parish Photo Gallery
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "140px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}
              >
                Explore our community through these cherished moments and sacred
                celebrations
              </p>
            </m.div>

            {/* Enhanced Gallery with interactive features - CONSOLIDATED */}
            <div className="relative">
              <GalleryPagePhotoSwipe
                images={galleryImages as SharedGalleryImage[]}
                categories={categories}
                reducedMotion={reducedMotion}
                className="mb-16"
              />

              {/* Interactive stats overlay */}
              <m.div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <MousePointer2 className="h-4 w-4 text-gold-600" />
                    <span className="text-gray-700">Interactive Gallery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">Live Stats</span>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Share Your Photos CTA */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <m.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <Heart className="h-12 w-12 text-gold-400 mx-auto mb-6" />

            <Heading
              level="h2"
              className="text-3xl lg:text-4xl font-light mb-6 text-white"
            >
              Share Your Moments
            </Heading>

            <Text
              size="xl"
              className="text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Have photos from parish events you'd like to share? We'd love to
              include them in our gallery to celebrate our community together
              and preserve these precious memories.
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
          </m.div>
        </Container>
      </Section>

      {/* Photography Guidelines */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <m.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Photography Guidelines
            </Heading>
            <Text
              size="xl"
              align="center"
              color="muted"
              className="max-w-3xl mx-auto"
            >
              When taking photos at parish events, please follow these simple
              guidelines
            </Text>
          </m.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Respectful Photography",
                description:
                  "Please be mindful during liturgical celebrations and ask permission before photographing individuals.",
              },
              {
                icon: Heart,
                title: "Share the Joy",
                description:
                  "We love seeing community events, celebrations, and fellowship moments that show our parish spirit.",
              },
              {
                icon: Mail,
                title: "High Quality Images",
                description:
                  "Please submit high-resolution photos with a brief description of the event and date taken.",
              },
            ].map((guideline, index) => (
              <m.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={
                  reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                }
                transition={
                  reducedMotion
                    ? { duration: 0.3 }
                    : { duration: 0.6, delay: index * 0.2 }
                }
                viewport={{ once: true }}
              >
                <Card
                  variant="default"
                  padding="lg"
                  className="text-center h-full bg-white"
                >
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center mx-auto">
                        <guideline.icon className="h-6 w-6 text-white" />
                      </div>
                      <Heading
                        level="h3"
                        align="center"
                        className="font-semibold"
                      >
                        {guideline.title}
                      </Heading>
                      <Text color="muted" align="center">
                        {guideline.description}
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Virtual Tour Integration */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Explore Our Sacred Spaces
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "180px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}
              >
                Take a virtual journey through our beautiful church and discover
                the sacred artistry
              </p>
            </m.div>

            {/* <VirtualTourIntegration
              galleryImages={galleryImages}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Live Photo Upload Section */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className={`${typographyScale.h2} text-slate-900 mb-6 relative`}
              >
                Share Your Parish Moments
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "160px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}
              >
                Contribute to our community gallery by sharing your photos from
                parish events
              </p>
            </m.div>

            {/* <LivePhotoUpload
              onPhotoUploaded={(photo) => {
                actions.addNotification({
                  type: 'success',
                  message: 'Photo uploaded successfully! Thank you for sharing.',
                  dismissible: true
                })
              }}
              acceptedFormats={['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']}
              maxFileSize={10 * 1024 * 1024} // 10MB
              supportVideo={true}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Prayerful Reflection Section */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Sacred Reflections
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "140px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}
              >
                Pause and reflect on the sacred beauty captured in our parish
                life
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* {galleryImages.filter(img => img.category === 'Church Building' || img.category === 'Liturgical Celebrations').slice(0, 3).map((image, index) => (
                <PrayerfulReflectionCard
                  key={image.id}
                  image={image}
                  reflectionTheme={index === 0 ? 'architecture' : index === 1 ? 'liturgy' : 'community'}
                  reducedMotion={ui.reducedMotion}
                />
              ))} */}
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced PhotoSwipe Lightbox - CONSOLIDATED INTO GALLERY COMPONENT */}

      {/* Social Sharing Modal */}
      <SocialSharingSystem
        articleId="gallery-image"
        title="St Saviour's Gallery"
        url="https://stsaviourlewisham.org.uk/gallery"
      />

      {/* Performance Monitor */}
      {/* <PerformanceMonitor
        pageName="Gallery"
        trackLoadTimes={true}
        trackInteractions={true}
        trackEngagement={true}
        onPerformanceData={(data) => {
          // Track gallery performance metrics
          console.log('Gallery performance:', data)
        }}
      /> */}

      {/* Accessibility Enhancer */}
      {/* <AccessibilityEnhancer
        keyboardNavigation={{
          enableArrowKeys: true,
          enableSpaceBar: true,
          enableEnterKey: true,
          onKeyPress: (key, target) => {
            if (key === 'ArrowLeft' && selectedImage) {
              navigateLightbox('prev')
            } else if (key === 'ArrowRight' && selectedImage) {
              navigateLightbox('next')
            } else if (key === 'Escape' && selectedImage) {
              closeLightbox()
            }
          }
        }}
        screenReaderSupport={{
          announcePageChanges: true,
          announceImageLoading: true,
          provideFocusIndicators: true
        }}
        contrastEnhancement={{
          enableHighContrast: ui.highContrast,
          enableFocusVisible: true
        }}
      /> */}
    </PageLayout>
  );
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from "@/lib/maintenance";
