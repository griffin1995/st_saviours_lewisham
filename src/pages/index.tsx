import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/solid";

// Enhanced Motion with LazyMotion optimization
import {
  Motion,
  fadeInUp,
  fadeInDown,
  staggerChildren,
  reverentReveal,
  goldAccent,
} from "@/lib/motion";

import {
  motion,
  m,
  LazyMotion,
  domAnimation,
  useScroll,
  useTransform,
} from "framer-motion";

// Professional Typography
import { typographyScale } from "@/lib/fonts";

// Import our new components
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import NewsSection from "@/components/NewsSection";
import HistorySection from "@/components/HistorySection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ScrollRevealSection from "@/components/ScrollRevealSection";

// Import modern components
import { NewsletterForm } from "@/components/modern/NewsletterForm";

// Import enhanced 2025 components
import { TestimonialsCarousel } from "@/components/enhanced/TestimonialsCarousel";
import { EmblaHeroCarousel } from "@/components/enhanced/EmblaHeroCarousel";
import { CommunityMetrics } from "@/components/enhanced/CommunityMetrics";
// PhotoSwipe import removed - not used in homepage

// Import store and hooks
import { useChurchStore, useUI, useActions } from "@/stores/churchStore";
import { useEventsQuery } from "@/hooks/useData";

export default function HomePage() {
  // Zustand store state
  const navigation = useChurchStore((state: any) => state.navigation);
  const ui = useUI();
  const actions = useActions();

  // Local state (keeping some for component-specific needs)
  const [imagesLoaded, setImagesLoaded] = useState(new Set<string>());
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Data fetching
  const { data: events, isLoading: eventsLoading } = useEventsQuery();

  // Scroll timeout ref for cleanup
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Scroll to section utility
  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64; // Navigation height
      const elementPosition = element.offsetTop - navHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }, []);

  // Image loading handler
  const handleImageLoad = useCallback((imageId: string) => {
    setImagesLoaded((prev) => new Set(prev).add(imageId));
  }, []);

  // Enhanced scroll tracking (now handled by Zustand store in _app.tsx)
  // The scroll position is automatically tracked by the store

  // Initial loading and device detection are now handled by the store
  // Motion preferences are automatically detected in _app.tsx

  // Close search on escape key
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  return (
    <>
      {/* Navigation - MUST BE FIRST */}
      <Navigation setSearchOpen={setSearchOpen} />

      {/* Additional overlay for homepage styling (if needed) */}
      {/* Note: Navigation component now handles its own backdrop overlay */}

      {/* Enhanced Scroll Progress Indicator with Catholic Gold */}
      <m.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-900 via-gold-700 to-navy-900 z-[9998] origin-left"
        style={{
          scaleX:
            typeof window !== "undefined"
              ? navigation.scrollPosition /
                (document.documentElement.scrollHeight - window.innerHeight)
              : 0,
        }}
        transition={{ duration: 0.1 }}
      />

      <Head>
        <title>
          St Saviour's Catholic Church, Lewisham | Mass Times, Events &
          Community
        </title>
        <meta
          name="description"
          content="Welcome to St Saviour's Catholic Church in Lewisham. A vibrant parish community offering daily Mass, sacraments, spiritual formation, and fellowship. All are welcome in God's house."
        />
        <meta
          name="keywords"
          content="Catholic Church, Lewisham, Mass times, sacraments, parish, community, faith, prayer, worship"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#1e293b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://saintsaviours-lewisham.org.uk/"
        />
        <meta
          property="og:title"
          content="St Saviour's Catholic Church, Lewisham"
        />
        <meta
          property="og:description"
          content="Welcome to St Saviour's Catholic Church in Lewisham. Join our vibrant parish community for Mass, sacraments, and fellowship."
        />
        <meta property="og:image" content="/images/church-og-image.jpg" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://saintsaviours-lewisham.org.uk/"
        />
        <meta
          property="twitter:title"
          content="St Saviour's Catholic Church, Lewisham"
        />
        <meta
          property="twitter:description"
          content="Welcome to St Saviour's Catholic Church in Lewisham. Join our vibrant parish community for Mass, sacraments, and fellowship."
        />
        <meta property="twitter:image" content="/images/church-og-image.jpg" />

        {/* Preload critical images */}
        <link
          rel="preload"
          as="image"
          href="/images/outside-church-flowers-foreground.jpg"
        />
        <link
          rel="preload"
          as="image"
          href="/images/inside-church-aisle.jpg"
        />
      </Head>

      {/* Enhanced Hero Section with Embla Carousel */}
      <EmblaHeroCarousel
        autoPlay={true}
        autoPlayDelay={6000}
        reducedMotion={ui.reducedMotion}
        slides={[
          {
            id: "1",
            image: "/images/outside-church-flowers-foreground.jpg",
            title: "Welcome to St Saviour's",
            subtitle: "A Place of Faith, Hope & Community",
            description:
              "Join our vibrant Catholic community where faith meets fellowship. All are welcome in God's house.",
            overlay: "medium",
            cta: {
              text: "Explore Our Community",
              action: () => scrollToSection("welcome"),
            },
          },
          {
            id: "2",
            image: "/images/inside-church-aisle.jpg",
            title: "Sunday Mass",
            subtitle: "Worship with Us",
            description:
              "Experience the beauty of the Mass in our historic church. Multiple service times available.",
            overlay: "medium",
            cta: {
              text: "View Mass Times",
              action: () => (window.location.href = "/mass"),
            },
          },
          {
            id: "3",
            image: "/images/st_saviours_interior_1939_archive_photo.jpeg",
            title: "Rich History",
            subtitle: "Over 150 Years of Faith",
            description:
              "Discover the heritage and traditions that make St Saviour's a cornerstone of our community.",
            overlay: "dark",
            cta: {
              text: "Learn Our History",
              action: () => scrollToSection("history"),
            },
          },
        ]}
        onSlideChange={(index) => {
          // Optional: Track slide changes for analytics
          console.log("Slide changed to:", index);
        }}
      />

      {/* Enhanced Welcome Section with Scroll-Triggered Animation */}
      <ScrollRevealSection>
        <WelcomeSection />
      </ScrollRevealSection>

      {/* Community Testimonials Section */}
      <ScrollRevealSection className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={ui.reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={
              ui.reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
            transition={{ duration: ui.reducedMotion ? 0.2 : 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`${typographyScale.h1} text-white mb-6 relative`}>
              Voices from Our Community
              {/* Gold accent underline */}
              <m.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                variants={goldAccent}
                style={{ width: "140px" }}
              />
            </h2>
            <p
              className={`${typographyScale.bodyLarge} text-gray-100 mb-8 max-w-4xl mx-auto`}
            >
              Hear from our parish family about their experiences of faith,
              fellowship, and spiritual growth at St Saviour's.
            </p>
          </m.div>

          <TestimonialsCarousel
            autoPlay={true}
            interval={7000}
            reducedMotion={ui.reducedMotion}
            className="max-w-5xl mx-auto"
          />
        </div>
      </ScrollRevealSection>

      {/* Enhanced News Section with Professional Media Presentation */}
      <ScrollRevealSection className="-mt-16">
        <NewsSection
          isLoading={ui.isLoading}
          imagesLoaded={imagesLoaded}
          handleImageLoad={handleImageLoad}
          isMobile={false}
        />
      </ScrollRevealSection>

      {/* Enhanced History Section with Reverent Animation */}
      <ScrollRevealSection className="-mt-16" variant="reverent">
        <HistorySection />
      </ScrollRevealSection>

      {/* Enhanced Events Section with Interactive Elements */}
      <ScrollRevealSection className="-mt-16">
        <EventsSection />
      </ScrollRevealSection>

      {/* Community Metrics Dashboard */}
      <ScrollRevealSection className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommunityMetrics
            reducedMotion={ui.reducedMotion}
            className="w-full"
          />
        </div>
      </ScrollRevealSection>

      {/* Enhanced Newsletter Section with Catholic Color Psychology */}
      <ScrollRevealSection className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section with Professional Typography */}
          <m.div
            initial={ui.reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={
              ui.reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
            transition={{ duration: ui.reducedMotion ? 0.2 : 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`${typographyScale.h1} text-white mb-6 relative`}>
              Stay Connected with Our Community
              {/* Gold accent underline */}
              <m.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                variants={goldAccent}
                style={{ width: "120px" }}
              />
            </h2>
            <p
              className={`${typographyScale.bodyLarge} text-gray-100 mb-8 max-w-4xl mx-auto`}
            >
              Join our newsletter to receive weekly updates about parish life,
              spiritual reflections, upcoming events, and important
              announcements from St Saviour's Catholic Church.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-300">
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gold-700 rounded-full"></span>
                <span className={typographyScale.body}>Weekly updates</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gold-700 rounded-full"></span>
                <span className={typographyScale.body}>
                  Event announcements
                </span>
              </span>
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gold-700 rounded-full"></span>
                <span className={typographyScale.body}>
                  Spiritual reflections
                </span>
              </span>
            </div>
          </m.div>

          {/* Enhanced Form Container */}
          <m.div
            initial={ui.reducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={
              ui.reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
            transition={{ duration: ui.reducedMotion ? 0.2 : 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 lg:p-12 hover:bg-white/15 transition-all duration-300">
              <NewsletterForm
                variant="default"
                showInterests={true}
                className="w-full max-w-none"
              />
            </div>
          </m.div>
        </div>
      </ScrollRevealSection>

      {/* Enhanced CTA Section */}
      <ScrollRevealSection>
        <CTASection />
      </ScrollRevealSection>

      {/* Footer */}
      <Footer />
    </>
  );
}

// Check for maintenance mode before rendering the page
export { defaultMaintenanceCheck as getServerSideProps } from "@/lib/maintenance";
