import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { upcomingEvents } from "@/lib/data";

export default function EventsSection() {
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
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 relative z-10">
        {/* Enhanced Header with visual elements */}
        <div className="flex justify-between items-end mb-16">
          <motion.div
            className="space-y-4"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center space-x-3"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion 
                ? { duration: 0.3 }
                : { duration: 0.6, delay: 0.2 }
              }
              viewport={{ once: true }}
            >
              <Calendar className="h-5 w-5 text-gold-500" />
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">
                Parish Events
              </span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-white">
              <span className="block">Upcoming</span>
              <span className="block text-3xl lg:text-4xl text-gold-400 font-medium">
                Events & Activities
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8, delay: 0.3 }
            }
            viewport={{ once: true }}
          >
            <Link
              href="/events"
              className="group inline-flex items-center text-gold-400 hover:text-gold-300 focus:text-gold-300 font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 rounded"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Redesigned Events Cards with Dark Theme and Gold Accents */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event, index) => (
            <motion.article
              key={event.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion 
                ? { duration: 0.3 }
                : { duration: 0.6, delay: 0.1 * index }
              }
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                className="btn-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:border-gold-300 transition-all duration-300 h-full flex flex-col"
                whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
                transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Enhanced event card header with gold accents */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      className="flex items-center space-x-3"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="w-14 h-14 btn-white rounded-xl flex items-center justify-center shadow-lg border border-gray-200 group-hover:shadow-xl transition-all duration-300">
                        <Calendar className="h-7 w-7 text-slate-900" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900 group-hover:text-gold-600 transition-colors duration-300">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-sm font-semibold text-gray-600 uppercase">
                          {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="text-right">
                      <div className="text-lg font-semibold text-slate-900">
                        {event.time}
                      </div>
                      <div className="text-sm text-gray-600">
                        {event.duration}
                      </div>
                    </div>
                  </div>

                  {/* Growing content area */}
                  <div className="flex-1">
                    <motion.h3
                      className="text-xl font-serif font-semibold text-slate-900 mb-4 group-hover:text-gold-600 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={prefersReducedMotion 
                        ? { duration: 0.3 }
                        : { duration: 0.6, delay: 0.2 }
                      }
                      viewport={{ once: true }}
                    >
                      {event.title}
                    </motion.h3>

                    <motion.div
                      className="flex items-center text-gray-700 mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={prefersReducedMotion 
                        ? { duration: 0.3 }
                        : { duration: 0.6, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    >
                      <MapPin className="h-4 w-4 mr-2 text-gold-600" />
                      <span className="text-sm font-medium">{event.location}</span>
                    </motion.div>

                    <motion.p
                      className="text-gray-700 leading-relaxed mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={prefersReducedMotion 
                        ? { duration: 0.3 }
                        : { duration: 0.6, delay: 0.4 }
                      }
                      viewport={{ once: true }}
                    >
                      {event.description}
                    </motion.p>
                  </div>

                  {/* Enhanced action area with gold accents */}
                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={prefersReducedMotion 
                      ? { duration: 0.3 }
                      : { duration: 0.6, delay: 0.5 }
                    }
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gold-100 border border-gold-200 text-gold-800">
                        {event.category}
                      </span>
                      
                      <motion.a
                        href={`/events/${event.id}`}
                        className="group/link inline-flex items-center text-gold-600 hover:text-gold-700 focus:text-gold-700 font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-white rounded"
                        whileHover={prefersReducedMotion ? {} : { x: 4 }}
                        transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 30 }}
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}