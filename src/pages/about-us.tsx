<<<<<<< Updated upstream
import React, { useEffect, useRef, useState, useCallback } from "react";
// Dynamic GSAP imports for SSR compatibility
import { Loader } from "@googlemaps/js-api-loader";
// Enhanced Animation Libraries (2025 Standards)
import {
  useSpring,
  animated,
  useTrail,
  useChain,
  useSpringRef,
} from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { toast } from "react-hot-toast";
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
  MapPinIcon,
} from "@heroicons/react/24/solid";

// Enhanced 2025 Components
import { m } from "framer-motion";
import { typographyScale } from "@/lib/fonts";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import { InteractiveStatistics } from "@/components/enhanced/InteractiveStatistics";
import { EnhancedTimeline } from "@/components/enhanced/EnhancedTimeline";
import { MainPageScriptureSection } from '@/components/shared/content';
import { LeadershipCarousel } from "@/components/enhanced/LeadershipCarousel";
import { MainPagePhotoSwipe, type SharedGalleryImage } from '@/components/shared/gallery';
import { AnimatedTestimonials } from "@/components/enhanced/AnimatedTestimonials";
import { LiveOfficeHours } from "@/components/enhanced/LiveOfficeHours";
import { PrayerRequestWidget } from "@/components/enhanced/PrayerRequestWidget";
import { ParticleBackground } from "@/components/enhanced/ParticleBackground";
import { ProgressIndicator } from "@/components/enhanced/ProgressIndicator";
import { FloatingActionButton } from "@/components/enhanced/FloatingActionButton";

// Modern imports with Zustand integration
import { PageLayout, PageHero } from "@/components/layout";
// CMS DATA SOURCE: Import image management functions
import { getHistoryImages, getPageImage, getCMSImages } from "@/lib/cms-images";
import {
  Button,
  Card,
=======
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// Modern imports with Zustand integration
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Card, 
>>>>>>> Stashed changes
  CardContent,
  Heading,
  Text,
  Section,
  Grid,
  Flex,
<<<<<<< Updated upstream
  Container,
} from "@/components/ui";
import { useUI, useActions } from "@/stores/churchStore";
import { priestBiographies } from "@/lib/data";

// Animation variants for stagger effects
const staggerChildren = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function AboutUs() {
  const ui = useUI();
  const actions = useActions();
  const mapRef = useRef<HTMLDivElement>(null);
  
  // CMS DATA SOURCE: Get history images for timeline
  const historyImages = getHistoryImages();

  // Enhanced Animation States (2025)
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Custom hook for tracking active section using intersection observer
  function useActiveSection(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
      const visibleSections = new Map<number, number>();
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const sectionId = entry.target.id;
            const index = sectionIds.indexOf(sectionId);
            
            if (entry.isIntersecting) {
              visibleSections.set(index, entry.intersectionRatio);
            } else {
              visibleSections.delete(index);
            }
          });

          // Find the section with highest intersection ratio
          if (visibleSections.size > 0) {
            let maxRatio = 0;
            let mostVisibleIndex = 0;
            
            visibleSections.forEach((ratio, index) => {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                mostVisibleIndex = index;
              }
            });
            
            setActiveSection(mostVisibleIndex);
          }
        },
        {
          rootMargin: '-10% 0px -10% 0px',
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        }
      );

      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });

      return () => {
        observer.disconnect();
      };
    }, [sectionIds]);

    return [activeSection, setActiveSection] as const;
  }

  const [activeSection, setActiveSection] = useActiveSection([
    'welcome',
    'statistics', 
    'mission',
    'values',
    'history',
    'leadership',
    'contact'
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // React Spring Animation Refs
  const springApi = useSpringRef();
  const trailApi = useSpringRef();

  // Enhanced Intersection Observers
  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [statsRef, statsInView] = useInView({ threshold: 0.2 });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1 });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1 });

  // Mouse tracking for parallax effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  }, []);

  // Enhanced page initialization with performance monitoring
  useEffect(() => {
    const startTime = performance.now();

    // Enhanced welcome notification with animation
    setTimeout(() => {
      actions.addNotification({
        type: "success",
        message: "Welcome to our parish story",
        dismissible: true,
      });
    }, 1000);

    // Mouse tracking setup
    window.addEventListener("mousemove", handleMouseMove);

    // Page load performance tracking
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      console.log(`About Us page loaded in ${loadTime.toFixed(2)}ms`);
      setIsLoading(false);
      toast.success("Page loaded successfully", {
        duration: 2000,
        position: "bottom-right",
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("load", handleLoad);
    };
  }, [actions, handleMouseMove]);

  // Google Maps integration for CTA section
  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
        libraries: ["places"],
      });

      try {
        const google = await loader.load();

        const map = new google.maps.Map(mapRef.current!, {
          center: { lat: 51.4619, lng: -0.0366 }, // St Saviour's coordinates
          zoom: 15,
          styles: [
            // Catholic color scheme map styling
            {
              featureType: "all",
              elementType: "geometry.fill",
              stylers: [{ color: "#1a365d" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#d4af37" }],
            },
          ],
        });

        new google.maps.Marker({
          position: { lat: 51.4619, lng: -0.0366 },
          map: map,
          title: "St Saviour's Catholic Church",
          icon: {
            url: "/icons/church-marker.svg",
            scaledSize: new google.maps.Size(40, 40),
          },
        });
      } catch (error) {
        console.log("Maps API not available");
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
          `;
        }
      }
    };

    initMap();
  }, []);

  // Enhanced React Spring Animations (2025)
  const heroSpring = useSpring({
    ref: springApi,
    from: { opacity: 0, transform: "translateY(50px) scale(0.95)" },
    to: {
      opacity: heroInView ? 1 : 0,
      transform: heroInView
        ? "translateY(0px) scale(1)"
        : "translateY(50px) scale(0.95)",
    },
    config: { tension: 280, friction: 60 },
    delay: ui.reducedMotion ? 0 : 200,
  });

  const statsSpring = useSpring({
    opacity: statsInView ? 1 : 0,
    transform: statsInView ? "translateY(0px)" : "translateY(30px)",
    config: { mass: 1, tension: 120, friction: 14 },
    delay: ui.reducedMotion ? 0 : 300,
  });

  const values = [
    {
      icon: Heart,
      title: "Love & Compassion",
      description:
        "We strive to show Christ's love through our actions and care for one another.",
      gradient: "from-navy-600 to-navy-500",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We welcome all people and build meaningful relationships across generations.",
      gradient: "from-navy-500 to-navy-400",
    },
    {
      icon: Church,
      title: "Worship",
      description:
        "We gather to celebrate the Eucharist and grow in our relationship with God.",
      gradient: "from-navy-700 to-navy-600",
    },
    {
      icon: BookOpen,
      title: "Learning",
      description:
        "We are committed to ongoing formation and deepening our understanding of faith.",
      gradient: "from-navy-800 to-navy-700",
    },
  ];

  const valuesTrail = useTrail(values.length, {
    ref: trailApi,
    from: { opacity: 0, transform: "scale(0.8) translateY(40px)" },
    to: {
      opacity: valuesInView ? 1 : 0,
      transform: valuesInView
        ? "scale(1) translateY(0px)"
        : "scale(0.8) translateY(40px)",
    },
    config: { tension: 300, friction: 40 },
    delay: ui.reducedMotion ? 0 : 100,
  });

  // Chain animations for sequential reveals
  useChain(
    valuesInView ? [springApi, trailApi] : [],
    valuesInView ? [0, 0.2] : []
  );

  // Parallax effect for mouse movement
  const parallaxSpring = useSpring({
    transform: ui.reducedMotion
      ? "translate3d(0px, 0px, 0)"
      : `translate3d(${mousePosition.x * 5}px, ${mousePosition.y * 5}px, 0)`,
    config: { tension: 100, friction: 30 },
  });

  // Enhanced animation variants for Framer Motion compatibility
=======
  Container
} from '@/components/ui'
import { useUI, useActions } from '@/stores/churchStore'
import { priestBiographies } from '@/lib/data'

export default function AboutUs() {
  const ui = useUI()
  const actions = useActions()

  // Initialize page view tracking
  useEffect(() => {
    actions.addNotification({
      type: 'info',
      message: 'Welcome to our About page',
      dismissible: true
    })
  }, [])

  // Enhanced animation variants
>>>>>>> Stashed changes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: ui.reducedMotion ? 0.2 : 0.8,
<<<<<<< Updated upstream
        staggerChildren: ui.reducedMotion ? 0 : 0.1,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: ui.reducedMotion ? 0.2 : 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: ui.reducedMotion ? 0.2 : 0.5,
        ease: "backOut",
      },
    },
  };
=======
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
>>>>>>> Stashed changes

  // Data arrays for cleaner code
  const stats = [
    { number: "135+", label: "Years of Service", icon: Calendar },
    { number: "500+", label: "Families", icon: Users },
    { number: "7", label: "Weekly Masses", icon: Clock },
    { number: "15+", label: "Parish Groups", icon: Star },
  ];

  // CMS DATA SOURCE: Timeline events using CMS history images
  const timelineEvents: Array<{
    year: string;
    title: string;
    event: string;
    icon: React.ComponentType<any>;
    image: string;
    alt: string;
    side: "left" | "right";
  }> = [
    {
      year: "849-918",
      title: "Medieval Origins",
      event:
        "King Alfred the Great was Lord of the Manor of Leofshema. In 918, the Manor was given to Saint Peter's Abbey, Ghent.",
      icon: Award,
      image: historyImages[0]?.url || "/images/pexels-pixabay-218480.jpg",
      alt: historyImages[0]?.alt || "Historical image of St Saviour's foundation",
      side: "left",
    },
    {
      year: "1553-1558",
      title: "Tudor Restoration",
      event:
        "Following the English Reformation under Henry VIII, the Priory was briefly restored in the reign of Mary I under Cardinal Reginald Pole.",
      icon: Church,
      image: historyImages[1]?.url || "/images/pexels-pixabay-218480.jpg",
      alt: historyImages[1]?.alt || "Parish community gathered together",
      side: "right",
    },
    {
      year: "1894",
      title: "Parish Founded",
      event:
        "Fr McClymont was appointed as the first resident priest, establishing the modern St Saviour's parish.",
      icon: Church,
      image: historyImages[2]?.url || "/images/pexels-pixabay-218480.jpg",
      alt: historyImages[2]?.alt || "Church mission and ministry",
      side: "left",
    },
    {
      year: "1909",
      title: "Church Opens",
      event:
        "Foundation stone laid on April 24th and church officially opened by Bishop Peter Amigo on December 9th, with the Lord and Lady Mayor of London attending.",
      icon: Award,
      image: historyImages[3]?.url || "/images/pexels-pixabay-218480.jpg",
      alt: historyImages[3]?.alt || "Vision for the future",
      side: "right",
    },
    {
      year: "1910",
      title: "School Established",
      event:
        "St Saviour's Catholic School opened - the first new Catholic school in the diocese under the 1902 Education Act.",
      icon: BookOpen,
      image: historyImages[0]?.url || "/images/pexels-pixabay-218480.jpg",
      alt: historyImages[0]?.alt || "Historical image of St Saviour's foundation",
      side: "left",
    },
    {
      year: "1917",
      title: "Church Consecrated",
      event:
        "After the debt of £3,000 was paid off, the church was consecrated on October 23rd.",
      icon: Star,
      image: historyImages[1]?.url || "/images/pexels-pixabay-218480.jpg",
      alt: historyImages[1]?.alt || "Parish community gathered together",
      side: "right",
    },
    {
      year: "1928-29",
      title: "Campanile Completed",
      event:
        "The famous Campanile topped by a 12-foot statue of Christ the King was completed as a commemoration of the Centenary of Catholic Emancipation.",
      icon: Church,
      image: historyImages[2]?.url || "/images/pexels-pixabay-218480.jpg",
      alt: historyImages[2]?.alt || "Church mission and ministry",
      side: "left",
    },
    {
      year: "2025",
      title: "Jubilee Sanctuary",
      event:
        "St Saviour's was designated a special sanctuary during the Jubilee Year of Hope, serving parishioners from 80+ countries.",
      icon: Heart,
      image: historyImages[3]?.url || "/images/pexels-pixabay-218480.jpg",
      alt: historyImages[3]?.alt || "Vision for the future",
      side: "right",
    },
  ];

  // CMS DATA SOURCE: Leadership information with proper image paths
  // Note: These specific priest images should be added to cms-images.ts in future
  const leadership = [
    {
      name: "Fr Krzysztof Krzyskow",
      role: "Parish Priest",
      description:
        "Leading our parish with wisdom and compassion, Fr Krzysztof brings years of pastoral experience to guide our community in faith and service.",
      icon: Church,
      image: "/images/fr_krzysztof_krzyskow_parish_priest_st_saviours.jpeg",
      alt: "Fr Krzysztof Krzyskow - Parish Priest at St Saviour's Catholic Church"
    },
    {
      name: "Fr Kenneth Iwunna",
      role: "Assistant Priest",
      description:
        "Supporting our parish ministries and outreach programs, Fr Kenneth brings energy and dedication to serving our diverse community.",
      icon: BookOpen,
      image: "/images/fr_kenneth_iwunna_assistant_priest_st_saviours.jpeg",
      alt: "Fr Kenneth Iwunna - Assistant Priest at St Saviour's Catholic Church"
    },
  ];

  return (
    <PageLayout
      title="About Us"
      description="Learn about St Saviour's Catholic Church in Lewisham - our history, mission, and vibrant community serving South East London."
      keywords="About St Saviours, Catholic Church Lewisham, Parish History, Community, Mission, Values"
      background="white"
    >
      {/* Enhanced Particle Background */}
      <ParticleBackground
        density={ui.reducedMotion ? 0 : 50}
        color="gold"
        opacity={0.1}
        size={2}
        speed={0.5}
      />

<<<<<<< Updated upstream
      {/* Floating Action Buttons */}
      <FloatingActionButton
        position="bottom-right"
        actions={[
          {
            icon: <Heart className="h-5 w-5" />,
            label: "Prayer Request",
            onClick: () => setActiveSection(1),
            color: "gold",
          },
          {
            icon: <Church className="h-5 w-5" />,
            label: "Virtual Tour",
            onClick: () => setActiveSection(2),
            color: "navy",
          },
          {
            icon: <Phone className="h-5 w-5" />,
            label: "Contact",
            onClick: () => (window.location.href = "/contact-us"),
            color: "slate",
          },
        ]}
        reducedMotion={ui.reducedMotion}
      />

      {/* Progress Indicator */}
      <ProgressIndicator
        sections={[
          "Welcome",
          "Statistics",
          "Mission",
          "Values",
          "History",
          "Leadership",
          "Contact",
        ]}
        activeSection={activeSection}
        position="left"
        reducedMotion={ui.reducedMotion}
      />
      {/* Enhanced Hero Section with React Spring */}
      <div ref={heroRef}>
        <animated.div style={heroSpring}>
          <PageHero
            title="About St Saviour's"
            subtitle="Our Community"
            description="A vibrant Catholic community in the heart of Lewisham, welcoming all to experience God's love and grace."
            pageName="about-us"
            height="large"
            overlay="medium"
            actions={
              <animated.div
                style={parallaxSpring}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-400 rounded-full opacity-20 animate-pulse" />
                <div
                  className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <div
                  className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gold-300 rounded-full opacity-25 animate-pulse"
                  style={{ animationDelay: "2s" }}
                />
              </animated.div>
            }
          />
        </animated.div>
      </div>

      {/* Welcome Section */}
      <div id="welcome">
        {/* Live Office Hours Widget */}
        <LiveOfficeHours
        position="top-right"
        schedule={{
          monday: { open: "09:00", close: "17:00" },
          tuesday: { open: "09:00", close: "17:00" },
          wednesday: { open: "09:00", close: "17:00" },
          thursday: { open: "09:00", close: "17:00" },
          friday: { open: "09:00", close: "17:00" },
          saturday: { open: "10:00", close: "16:00" },
          sunday: { open: "08:00", close: "12:00" },
        }}
        timezone="Europe/London"
        reducedMotion={ui.reducedMotion}
      />
      </div>

      {/* Enhanced Interactive Statistics with Chart.js & React Spring */}
      <Section spacing="md" background="slate" id="statistics">
        <div ref={statsRef}>
          <animated.div style={statsSpring}>
            <ScrollRevealSection>
              <Container>
                <m.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
=======
      {/* Statistics Section */}
      <Section spacing="md" background="slate">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid cols={4} gap="lg">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleVariants}
                className="text-center group"
                whileHover={ui.reducedMotion ? {} : { y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 icon-container-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  whileHover={ui.reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="h-8 w-8 icon-theme-dark" />
                </motion.div>
                <Heading level="h3" color="white" className="text-3xl lg:text-4xl font-bold mb-2">
                  {stat.number}
                </Heading>
                <Text color="white" weight="medium">
                  {stat.label}
                </Text>
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Section>

      {/* Mission Statement */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center space-y-8"
          >
            <motion.div 
              variants={scaleVariants}
              className="w-20 h-20 icon-container-white rounded-full flex items-center justify-center mx-auto shadow-lg"
              whileHover={ui.reducedMotion ? {} : { scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.4 }}
            >
              <Church className="h-10 w-10 icon-theme-dark" />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Heading level="h2" color="white" align="center" className="mb-8">
                Our Mission
              </Heading>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Text size="xl" align="center" className="lg:text-2xl max-w-4xl mx-auto text-gray-100 leading-relaxed">
                St Saviour's Catholic Church exists to be a beacon of hope and faith in Lewisham, 
                where all people can encounter the transforming love of Jesus Christ and grow 
                together as a community of believers.
              </Text>
            </motion.div>

            {/* Mission highlights */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              {[
                { icon: Heart, text: "Welcome All" },
                { icon: Users, text: "Build Community" },
                { icon: Star, text: "Share Faith" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-3"
                  whileHover={ui.reducedMotion ? {} : { y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-gold-400" />
                  </div>
                  <Text color="white" weight="medium" className="text-lg">
                    {item.text}
                  </Text>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section spacing="lg" background="slate">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <Heading level="h2" color="white" align="center" className="mb-6">
            Our Values
          </Heading>
          <Text size="xl" align="center" color="white">
            These core values guide everything we do as a parish community.
          </Text>
        </motion.div>

        <Grid cols={4} gap="lg">
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group"
            >
              <Card variant="default" padding="lg" className="h-full border border-slate-600 hover:border-white transition-all duration-300 bg-white/10 backdrop-blur-sm">
                <CardContent>
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 icon-container-white rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <value.icon className="h-10 w-10 icon-theme-dark" />
                    </div>
                    <Heading level="h3" color="white" align="center" className="text-xl font-bold">
                      {value.title}
                    </Heading>
                    <Text color="white" align="center">
                      {value.description}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* History Section - Vertical Timeline */}
      <Section spacing="lg" background="slate">
        <Container>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16"
          >
            <Heading level="h2" color="white" align="center" className="mb-6">
              Our Rich History
            </Heading>
            <Text size="xl" align="center" color="white" className="max-w-4xl mx-auto">
              From medieval origins to modern sanctuary, discover the remarkable journey of St Saviour's Catholic Church through the centuries.
            </Text>
          </motion.div>

          {/* Vertical Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
            
            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
>>>>>>> Stashed changes
                  viewport={{ once: true }}
                >
                  <h2
                    className={`${typographyScale.h2} text-white mb-6 relative`}
                  >
                    Our Parish by the Numbers
                    {/* Gold accent underline */}
                    <m.div
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      style={{ width: "120px" }}
                    />
                  </h2>
                  <p
                    className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}
                  >
                    These numbers represent the vibrant community that makes St
                    Saviour's a beacon of faith in Lewisham.
                  </p>
                </m.div>

<<<<<<< Updated upstream
                <InteractiveStatistics
                  stats={stats}
                  reducedMotion={ui.reducedMotion}
                  showCharts={true}
                />
              </Container>
            </ScrollRevealSection>
          </animated.div>
=======
                  {/* Content Card */}
                  <div className={`${event.side === 'left' ? 'lg:pr-12' : 'lg:pl-12 lg:col-start-2'}`}>
                    <Card className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-500 transition-all duration-300 group">
                      <CardContent className="p-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="px-4 py-2 badge-gold-theme rounded-full font-bold text-lg">
                              {event.year}
                            </span>
                          </div>
                          <Heading level="h3" color="white" className="text-2xl font-bold mb-4">
                            {event.title}
                          </Heading>
                          <Text color="gray-100" size="lg" className="leading-relaxed">
                            {event.event}
                          </Text>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Event Image */}
                  <div className={`${event.side === 'left' ? 'lg:pl-12 lg:col-start-2 lg:row-start-1' : 'lg:pr-12 lg:col-start-1'}`}>
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Text size="sm" color="white" className="font-medium">
                          {event.year} - {event.title}
                        </Text>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Leadership Section */}
      <Section spacing="lg" background="slate">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <Heading level="h2" color="white" align="center" className="mb-6">
            Our Leadership
          </Heading>
          <Text size="xl" align="center" color="white">
            Meet the dedicated team who guide our parish community.
          </Text>
        </motion.div>

        <Grid cols={2} gap="lg">
          {leadership.map((leader, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group"
            >
              <Card variant="default" padding="lg" className="text-center border border-gray-700 hover:border-white transition-all duration-300 bg-white/10 backdrop-blur-sm">
                <CardContent>
                  <div className="space-y-6">
                    <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Heading level="h3" color="white" align="center" className="text-2xl font-bold mb-2">
                        {leader.name}
                      </Heading>
                      <Text color="white" weight="semibold" align="center" className="text-lg mb-6 opacity-80">
                        {leader.role}
                      </Text>
                    </div>
                    <Text color="white" align="center">
                      {leader.description}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Grid>

        {/* Detailed Priest Biographies */}
        <div className="mt-16 space-y-8">
          {priestBiographies.map((priest, index) => (
            <motion.div
              key={priest.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card variant="default" padding="lg" className="border border-slate-600 hover:border-white transition-all duration-300 bg-white/10 backdrop-blur-sm">
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="text-center md:text-left">
                      <div className="w-32 h-32 bg-gray-300 rounded-xl mx-auto md:mx-0 mb-4 overflow-hidden">
                        <img
                          src={priest.image}
                          alt={priest.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Heading level="h3" color="white" className="text-xl font-bold mb-2">
                        {priest.name}
                      </Heading>
                      <Text color="white" weight="semibold" className="text-lg mb-4 opacity-80">
                        {priest.title}
                      </Text>
                      <div className="space-y-2 text-sm">
                        <Text color="white" className="opacity-70">
                          <strong>Ordained:</strong> {priest.ordination}
                        </Text>
                        <Text color="white" className="opacity-70">
                          <strong>Diocese:</strong> {priest.diocese}
                        </Text>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Text color="white" size="base" className="leading-relaxed mb-6">
                        {priest.bio}
                      </Text>
                      <div>
                        <Text color="white" weight="semibold" className="mb-3">
                          Areas of Ministry:
                        </Text>
                        <div className="flex flex-wrap gap-2">
                          {priest.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-sm"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
>>>>>>> Stashed changes
        </div>
      </Section>

      {/* Enhanced Mission Statement with Scripture Card */}
      <Section spacing="lg" background="slate" id="mission">
        <Container size="md">
<<<<<<< Updated upstream
          <ScrollRevealSection variant="reverent">
            <div className="text-center space-y-12">
              <m.div
                className="w-20 h-20 icon-container-white rounded-full flex items-center justify-center mx-auto shadow-lg"
                whileHover={ui.reducedMotion ? {} : { scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.4 }}
              >
                <Church className="h-10 w-10 icon-theme-dark" />
              </m.div>

              <h2 className={`${typographyScale.h1} text-white mb-8 relative`}>
                Our Mission
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "80px" }}
                />
              </h2>

              <MainPageScriptureSection
                pageTheme="about-us"
                reducedMotion={ui.reducedMotion}
              />

              {/* Mission highlights with enhanced animations */}
              <m.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                variants={staggerChildren}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: Heart,
                    text: "Welcome All",
                    desc: "Every person finds a home",
                  },
                  {
                    icon: Users,
                    text: "Build Community",
                    desc: "Strengthen bonds of faith",
                  },
                  {
                    icon: Star,
                    text: "Share Faith",
                    desc: "Spread God's love",
                  },
                ].map((item, index) => (
                  <m.div
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
                  </m.div>
                ))}
              </m.div>
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Values Section with React Spring */}
      <Section spacing="lg" background="slate" id="values">
        <ScrollRevealSection>
          <m.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
              Our Core Values
              <m.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ width: "120px" }}
              />
            </h2>
            <p
              className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}
            >
              These core values guide everything we do as a parish community,
              shaping our mission and ministry.
            </p>
          </m.div>

          <Grid cols={4} gap="lg">
            {values.map((value, index) => (
              <m.div
                key={index}
                className="group h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <m.div
                  className="h-full bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-500 transition-all duration-500 rounded-2xl p-8 group-hover:bg-white/15"
                  whileHover={ui.reducedMotion ? {} : { y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center space-y-6 h-full flex flex-col justify-between">
                    <div>
                      <m.div
                        className="w-20 h-20 icon-container-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        whileHover={
                          ui.reducedMotion ? {} : { scale: 1.1, rotate: 5 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <value.icon className="h-10 w-10 icon-theme-dark" />
                      </m.div>
                      <h3
                        className={`${typographyScale.h3} text-white mb-4 group-hover:text-gold-300 transition-colors duration-300`}
                      >
                        {value.title}
                      </h3>
                    </div>
                    <p
                      className={`${typographyScale.body} text-gray-100 leading-relaxed`}
                    >
                      {value.description}
                    </p>
                  </div>
                </m.div>
              </m.div>
            ))}
          </Grid>
        </ScrollRevealSection>
      </Section>

      {/* Enhanced History Section with GSAP Timeline */}
      <Section spacing="lg" background="slate" id="history">
        <Container>
          <ScrollRevealSection variant="reverent">
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Our Sacred History
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "140px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-4xl mx-auto leading-relaxed`}
              >
                From medieval origins to modern sanctuary, discover the
                remarkable journey of St Saviour's Catholic Church through the
                centuries of faith and service.
              </p>
            </m.div>

            {/* Enhanced Timeline with PhotoSwipe Integration - CONSOLIDATED */}
            <MainPagePhotoSwipe
              pageContext="about-us"
              images={timelineEvents.map((event, index) => ({
                id: index,
                src: event.image,
                width: 800,
                height: 600,
                alt: event.title,
                title: event.title,
                description: `${event.year} - ${event.event}`,
                category: "History",
                date: event.year
              }))}
              reducedMotion={ui.reducedMotion}
            >
              <EnhancedTimeline
                events={timelineEvents}
                reducedMotion={ui.reducedMotion}
              />
            </MainPagePhotoSwipe>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Leadership Section with Embla Carousel */}
      <Section spacing="lg" background="slate" id="leadership">
        <ScrollRevealSection>
          <m.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
              Our Spiritual Leadership
              <m.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ width: "160px" }}
              />
            </h2>
            <p
              className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}
            >
              Meet the dedicated priests and pastoral team who guide our parish
              community with wisdom, compassion, and faith.
            </p>
          </m.div>

          <LeadershipCarousel
            leaders={leadership}
            priestBiographies={priestBiographies}
            autoplay={!ui.reducedMotion}
            reducedMotion={ui.reducedMotion}
          />
        </ScrollRevealSection>
      </Section>

      {/* Enhanced Call to Action with Google Maps */}
      <Section spacing="lg" background="slate" id="contact">
        <Container size="lg">
          <ScrollRevealSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - CTA Content */}
              <m.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2
                    className={`${typographyScale.h2} text-white mb-6 relative`}
                  >
                    Join Our Faith Community
                    <m.div
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      style={{ width: "120px" }}
                    />
                  </h2>
                  <p
                    className={`${typographyScale.bodyLarge} text-gray-100 leading-relaxed`}
                  >
                    Whether you're new to the area or have been part of Lewisham
                    for years, we'd love to welcome you to St Saviour's vibrant
                    Catholic community.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <m.div
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
                  </m.div>

                  <m.div
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
                  </m.div>
                </div>

                {/* Enhanced contact info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center">
                      <MapPinIcon className="h-5 w-5 text-gold-400" />
                    </div>
                    <div>
                      <p
                        className={`${typographyScale.body} text-white font-medium`}
                      >
                        Visit Us
                      </p>
                      <p className={`${typographyScale.caption} text-gray-300`}>
                        Lewisham High Street, SE13 6AA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center">
                      <Phone className="h-5 w-5 text-gold-400" />
                    </div>
                    <div>
                      <p
                        className={`${typographyScale.body} text-white font-medium`}
                      >
                        Call Us
                      </p>
                      <p className={`${typographyScale.caption} text-gray-300`}>
                        020 8852 3073
                      </p>
                    </div>
                  </div>
                </div>
              </m.div>

              {/* Right Column - Interactive Google Map */}
              <m.div
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
              </m.div>
            </div>
          </ScrollRevealSection>
=======
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center space-y-8"
          >
            <motion.div variants={itemVariants}>
              <Heading level="h2" color="white" align="center">
                Join Our Community
              </Heading>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Text size="xl" align="center" color="white" className="max-w-3xl mx-auto leading-relaxed">
                Whether you're new to the area or have been part of Lewisham for years, 
                we'd love to welcome you to St Saviour's.
              </Text>
            </motion.div>
            
            <motion.div variants={itemVariants} className="pt-4">
              <Flex justify="center" gap="md" className="flex-col sm:flex-row">
                <motion.div
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
                </motion.div>
                
                <motion.div
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
                </motion.div>
              </Flex>
            </motion.div>

            {/* Quick contact info */}
            <motion.div variants={itemVariants} className="pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <MapPinIcon className="h-4 w-4 text-gold-400" />
                  </div>
                  <span className="text-sm">Lewisham High Street, SE13 6AA</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-gold-400" />
                  </div>
                  <span className="text-sm">020 8852 3073</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
>>>>>>> Stashed changes
        </Container>
      </Section>
    </PageLayout>
  );
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from "@/lib/maintenance";
