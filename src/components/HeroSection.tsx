import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { getHeroImages } from "@/lib/cms-images";
import { getHeroContent } from "@/lib/cms-content";

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
  scrollY: number;
  navbarHovered: boolean;
  dropdownOpen: string | null;
  mobileMenuOpen: boolean;
}

export default function HeroSection({
  scrollToSection,
  scrollY,
  navbarHovered,
  dropdownOpen,
  mobileMenuOpen,
}: HeroSectionProps) {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroImages = getHeroImages();
  const heroContent = getHeroContent();

  // Check for reduced motion preference
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

  // Auto-scroll hero images with enhanced timing (respects motion preferences)
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Slower transition for better viewing
    return () => clearInterval(timer);
  }, [prefersReducedMotion, heroContent.length]);

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-primary-900">
      {heroImages.map((hero, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 ${
            index === currentHeroImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ willChange: 'opacity' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentHeroImage ? 1 : 0 }}
          transition={prefersReducedMotion 
            ? { duration: 0.3, ease: "easeInOut" }
            : { duration: 0.8, ease: "easeInOut" }
          }
        >
          {/* Optimized background image with Next.js Image */}
          <Image
            src={hero.url}
            alt={hero.alt}
            fill
            priority={hero.priority}
            className="object-cover"
            sizes="100vw"
            quality={85}
          />

          {/* Simplified overlay system for better performance */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-800/40 to-charcoal-900/70 z-10" />
        </motion.div>
      ))}

      {/* Modern navbar hover overlay */}
      {(navbarHovered || dropdownOpen || mobileMenuOpen) && (
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 to-charcoal-800/40 z-30 pointer-events-none transition-opacity duration-500 backdrop-blur-sm" />
      )}

      {/* Content container with premium typography and modern spacing */}
      <div className="relative z-50 h-full flex items-center justify-center text-center text-cream-50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            key={currentHeroImage}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.95 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : {
                  duration: 1,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
                }}
            className="space-y-8"
          >
            {/* Enhanced typography with better hierarchy */}
            <div className="space-y-6">
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-8xl font-serif font-light leading-tight tracking-tight drop-shadow-xl"
                style={{ 
                  textShadow: '3px 3px 8px rgba(26,26,26,0.8), 1px 1px 3px rgba(26,26,26,0.9)',
                  letterSpacing: '-0.02em'
                }}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion 
                  ? { duration: 0.3 }
                  : { duration: 0.8, delay: 0.5 }
                }
              >
                <span className="block">
                  {heroContent[currentHeroImage]?.title
                    .split(" ")
                    .slice(0, 2)
                    .join(" ") || heroImages[currentHeroImage].title
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}
                </span>
                <span className="block font-medium text-gold-400 mt-2 filter drop-shadow-lg">
                  {heroContent[currentHeroImage]?.title
                    .split(" ")
                    .slice(2)
                    .join(" ") || heroImages[currentHeroImage].title
                    .split(" ")
                    .slice(2)
                    .join(" ")}
                </span>
              </motion.h1>

              <motion.p
                className="text-xl sm:text-2xl lg:text-3xl font-light max-w-3xl mx-auto leading-relaxed text-cream-100 drop-shadow-lg"
                style={{ 
                  textShadow: '2px 2px 6px rgba(26,26,26,0.7), 1px 1px 3px rgba(26,26,26,0.8)',
                  letterSpacing: '0.01em'
                }}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion 
                  ? { duration: 0.3 }
                  : { duration: 0.8, delay: 0.7 }
                }
              >
                {heroContent[currentHeroImage]?.subtitle || heroImages[currentHeroImage].subtitle}
              </motion.p>
            </div>

            {/* Enhanced CTA buttons with modern design */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion 
                ? { duration: 0.3 }
                : { duration: 0.8, delay: 0.9 }
              }
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 400, damping: 17 }}
              >
                <button
                  onClick={() => scrollToSection('welcome')}
                  className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-cream-50 font-semibold rounded-2xl shadow-2xl hover:shadow-gold-500/30 hover:from-gold-500 hover:to-gold-400 focus:from-gold-500 focus:to-gold-400 transition-all duration-500 text-lg border border-gold-400/60 focus:outline-none focus:ring-4 focus:ring-gold-400/80 focus:ring-offset-4 focus:ring-offset-charcoal-900/50 backdrop-blur-sm"
                  aria-label="Join us for Sunday service"
                >
                  <Clock className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  Join Us This Sunday
                </button>
              </motion.div>

              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 400, damping: 17 }}
              >
                <button
                  onClick={() => scrollToSection('events')}
                  className="group inline-flex items-center px-12 py-6 bg-cream-50/15 backdrop-blur-md border-2 border-cream-50/40 text-cream-50 font-semibold rounded-2xl hover:bg-cream-50 hover:text-charcoal-800 focus:bg-cream-50 focus:text-charcoal-800 transition-all duration-500 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-cream-50/60 focus:ring-offset-4 focus:ring-offset-charcoal-900/50"
                  aria-label="Explore our parish community"
                >
                  <MapPin className="mr-3 h-6 w-6 group-hover:bounce transition-transform duration-300" />
                  Our Community
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator with refined animation */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          animate={prefersReducedMotion ? {} : {
            y: [0, 12, 0],
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 3,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
          className="flex flex-col items-center text-cream-50 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-cream-50/60 focus:ring-offset-4 focus:ring-offset-charcoal-900/50 rounded-xl p-4 hover:bg-cream-50/10 hover:scale-110 transition-all duration-300"
          onClick={() => scrollToSection('welcome')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToSection('welcome');
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Scroll to welcome section"
          style={{
            opacity: scrollY > 100 ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
          }}
          whileHover={prefersReducedMotion ? {} : { 
            scale: 1.1,
            y: -2,
            transition: { type: "spring", stiffness: 400, damping: 17 }
          }}
        >
          <span className="text-base font-medium mb-3 group-hover:text-gold-300 transition-colors duration-300 drop-shadow-md">
            Scroll for more
          </span>
          <div className="relative w-1 h-16 overflow-hidden">
            <motion.div
              animate={prefersReducedMotion ? {} : { 
                y: [-20, 64],
                opacity: [0, 1, 1, 0]
              }}
              transition={prefersReducedMotion ? {} : {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.2, 0.8, 1]
              }}
              className="absolute w-1 bg-cream-50"
              style={{
                height: '20px',
                background: 'repeating-linear-gradient(to bottom, #fefefe 0px, #fefefe 4px, transparent 4px, transparent 8px)',
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))'
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Image progress indicators */}
      <div className="absolute bottom-8 right-8 z-50 flex space-x-2">
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cream-50/60 focus:ring-offset-2 focus:ring-offset-charcoal-900/50 ${
              index === currentHeroImage
                ? "bg-cream-50 shadow-lg"
                : "bg-cream-50/50 hover:bg-cream-50/70"
            }`}
            onClick={() => setCurrentHeroImage(index)}
            whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            aria-label={`View hero image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}