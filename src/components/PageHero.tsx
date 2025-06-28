import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  height?: "small" | "medium" | "large";
  overlay?: "light" | "medium" | "dark";
}

export default function PageHero({
  title,
  subtitle,
  description,
  backgroundImage = "/images/hero/church-exterior.jpg",
  height = "medium",
  overlay = "medium"
}: PageHeroProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  const heightClasses = {
    small: "h-64 lg:h-80",
    medium: "h-80 lg:h-96",
    large: "h-96 lg:h-[32rem]"
  };

  const overlayClasses = {
    light: "bg-black/30",
    medium: "bg-black/50", 
    dark: "bg-black/70"
  };

  return (
    <section className={`relative ${heightClasses[height]} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={`${title} - St Saviour's Catholic Church`}
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          priority
        />
      </div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }
            className="space-y-6"
          >
            {subtitle && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion 
                  ? { duration: 0.3 }
                  : { duration: 0.6, delay: 0.2 }
                }
                className="inline-flex items-center space-x-2"
              >
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">
                  {subtitle}
                </span>
                <div className="w-8 h-px bg-gold-500" />
              </motion.div>
            )}

            <motion.h1
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion 
                ? { duration: 0.3 }
                : { duration: 0.8, delay: 0.3 }
              }
              className="text-4xl lg:text-6xl font-serif font-light text-white leading-tight"
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion 
                  ? { duration: 0.3 }
                  : { duration: 0.8, delay: 0.5 }
                }
                className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}