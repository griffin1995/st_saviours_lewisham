import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10" style={{ maxWidth: '88rem' }}>
        <div className="grid md:grid-cols-2 gap-14">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8 }
            }
            viewport={{ once: true }}
            className="group"
          >
            <motion.div
              className="relative h-[28rem] rounded-2xl overflow-hidden cursor-pointer"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -4 }}
              transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute inset-0">
                <Image
                  src="/images/pexels-brett-sayles-3633711.jpg"
                  alt="Meet Father Krisz - Our parish priest ready to guide and support our faith community"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 group-hover:from-black/80 transition-all duration-500"
                whileHover={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), rgba(0,0,0,0.5))" }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                  <motion.h3
                    className="text-3xl lg:text-4xl font-serif font-semibold"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 20 }}
                  >
                    Meet Our Parish Priest
                  </motion.h3>
                  <motion.p
                    className="text-lg lg:text-xl leading-relaxed max-w-md mx-auto"
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={prefersReducedMotion 
                      ? { duration: 0.3 }
                      : { duration: 0.6, delay: 0.3 }
                    }
                    viewport={{ once: true }}
                  >
                    Learn about Father Krisz and his journey of faith serving our community
                  </motion.p>
                  <motion.div
                    className="pt-4"
                    whileHover={prefersReducedMotion ? {} : { y: -2 }}
                    transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <a
                      href="/about/priest"
                      className="inline-flex items-center px-6 py-3 bg-gold-600 text-navy-900 rounded-lg font-semibold hover:bg-gold-500 focus:bg-gold-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8 }
            }
            viewport={{ once: true }}
            className="group"
          >
            <motion.div
              className="relative h-[28rem] rounded-2xl overflow-hidden cursor-pointer"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -4 }}
              transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute inset-0">
                <Image
                  src="/images/pexels-shelaghmurphy-1666816.jpg"
                  alt="Beautiful church interior available for weddings and special celebrations"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 group-hover:from-black/80 transition-all duration-500"
                whileHover={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), rgba(0,0,0,0.5))" }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                  <motion.h3
                    className="text-3xl lg:text-4xl font-serif font-semibold"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 20 }}
                  >
                    Church Venue Hire
                  </motion.h3>
                  <motion.p
                    className="text-lg lg:text-xl leading-relaxed max-w-md mx-auto"
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={prefersReducedMotion 
                      ? { duration: 0.3 }
                      : { duration: 0.6, delay: 0.3 }
                    }
                    viewport={{ once: true }}
                  >
                    Beautiful sacred space available for weddings and special celebrations
                  </motion.p>
                  <motion.div
                    className="pt-4"
                    whileHover={prefersReducedMotion ? {} : { y: -2 }}
                    transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <a
                      href="/venue-hire"
                      className="inline-flex items-center px-6 py-3 bg-gold-600 text-navy-900 rounded-lg font-semibold hover:bg-gold-500 focus:bg-gold-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      Enquire Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}