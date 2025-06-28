import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram } from "lucide-react";

// Import our new components
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import NewsSection from "@/components/NewsSection";
import HistorySection from "@/components/HistorySection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  // Navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [navbarHovered, setNavbarHovered] = useState(false);
  
  // Global state for components
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(new Set<string>());
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Scroll timeout ref for cleanup
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Scroll to section utility
  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof window === 'undefined') return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64; // Navigation height
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Image loading handler
  const handleImageLoad = useCallback((imageId: string) => {
    setImagesLoaded(prev => new Set(prev).add(imageId));
  }, []);

  // Enhanced scroll tracking
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      
      // Clear the scrolling state after a delay
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Motion preference detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Mobile detection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close search on escape key
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  return (
    <>
      {/* Navigation - MUST BE FIRST */}
      <Navigation
        navbarHovered={navbarHovered}
        setNavbarHovered={setNavbarHovered}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setSearchOpen={setSearchOpen}
      />

      {/* Blue Overlay when navbar is hovered or dropdown is active */}
      {(navbarHovered || dropdownOpen) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 bg-navy-900/40 backdrop-blur-md z-[9997] pointer-events-none"
          style={{ 
            top: navbarHovered || dropdownOpen ? '80px' : '64px',
            backdropFilter: 'blur(8px) saturate(1.2)'
          }}
        />
      )}

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-gold-500 to-primary-500 z-[9998] origin-left"
        style={{
          scaleX: typeof window !== 'undefined' 
            ? scrollY / (document.documentElement.scrollHeight - window.innerHeight)
            : 0
        }}
      />

      <Head>
        <title>St Saviour's Catholic Church, Lewisham | Mass Times, Events & Community</title>
        <meta
          name="description"
          content="Welcome to St Saviour's Catholic Church in Lewisham. A vibrant parish community offering daily Mass, sacraments, spiritual formation, and fellowship. All are welcome in God's house."
        />
        <meta name="keywords" content="Catholic Church, Lewisham, Mass times, sacraments, parish, community, faith, prayer, worship" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1e293b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://saintsaviours-lewisham.org.uk/" />
        <meta property="og:title" content="St Saviour's Catholic Church, Lewisham" />
        <meta property="og:description" content="Welcome to St Saviour's Catholic Church in Lewisham. Join our vibrant parish community for Mass, sacraments, and fellowship." />
        <meta property="og:image" content="/images/church-og-image.jpg" />
        <meta property="og:locale" content="en_GB" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://saintsaviours-lewisham.org.uk/" />
        <meta property="twitter:title" content="St Saviour's Catholic Church, Lewisham" />
        <meta property="twitter:description" content="Welcome to St Saviour's Catholic Church in Lewisham. Join our vibrant parish community for Mass, sacraments, and fellowship." />
        <meta property="twitter:image" content="/images/church-og-image.jpg" />
        
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/pexels-pixabay-208216.jpg" />
        <link rel="preload" as="image" href="/images/pexels-jibarofoto-2014775.jpg" />
      </Head>

      {/* Hero Section */}
      <HeroSection
        scrollToSection={scrollToSection}
        scrollY={scrollY}
        navbarHovered={navbarHovered}
        dropdownOpen={dropdownOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Welcome Section */}
      <div className="relative z-20">
        <WelcomeSection />
      </div>

      {/* News Section with subtle overlap */}
      <div className="relative z-30 -mt-16">
        <NewsSection
          isLoading={isLoading}
          imagesLoaded={imagesLoaded}
          handleImageLoad={handleImageLoad}
          isMobile={isMobile}
        />
      </div>

      {/* History Section with subtle overlap */}
      <div className="relative z-40 -mt-16">
        <HistorySection />
      </div>

      {/* Events Section with subtle overlap */}
      <div className="relative z-50 -mt-16">
        <EventsSection />
      </div>

      {/* CTA Section with subtle overlap */}
      <div className="relative z-60">
        <CTASection />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

// Check for maintenance mode before rendering the page
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance';