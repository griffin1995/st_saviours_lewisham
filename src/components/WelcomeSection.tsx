import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Calendar, Clock } from "lucide-react";
import { getTodaysServices } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function WelcomeSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [todaysServices, setTodaysServices] = useState<Array<{time: string, type: string, description: string}>>([]);
  const [currentDay, setCurrentDay] = useState('');

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

  // Get today's services dynamically
  useEffect(() => {
    const services = getTodaysServices();
    setTodaysServices(services);
    
    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setCurrentDay(dayNames[today.getDay()]);
  }, []);

  return (
    <section id="welcome" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Left 2/3 - Welcome content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion 
                ? { duration: 0.3 }
                : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
              }
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Section heading */}
              <div className="relative">
                <motion.div
                  className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"
                  initial={prefersReducedMotion ? { opacity: 0 } : { height: 0 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { height: 64 }}
                  transition={prefersReducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 1, delay: 0.3 }
                  }
                  viewport={{ once: true }}
                />
                <h2 className="text-5xl lg:text-6xl font-serif font-light text-white leading-tight">
                  <span className="block">Welcome to</span>
                  <span className="block text-4xl lg:text-5xl text-gold-400 font-medium mt-2">
                    St Saviour's, Lewisham
                  </span>
                </h2>
              </div>

              {/* Content */}
              <div className="prose prose-xl text-gray-100 space-y-8 leading-relaxed">
                <motion.p
                  className="text-xl lg:text-2xl font-light text-gray-100 leading-relaxed"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={prefersReducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 0.8, delay: 0.2 }
                  }
                  viewport={{ once: true }}
                >
                  For over 150 years, St Saviour's Catholic Church has been at
                  the heart of the Lewisham community, serving as a beacon of
                  faith, hope, and love. Our beautiful Victorian church
                  building houses a vibrant parish family that welcomes all
                  who seek to grow in their relationship with God.
                </motion.p>
                
                <motion.p
                  className="text-lg leading-relaxed text-gray-200"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={prefersReducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 0.8, delay: 0.4 }
                  }
                  viewport={{ once: true }}
                >
                  Whether you are a lifelong Catholic, someone exploring faith
                  for the first time, or simply looking for a community where
                  you can belong, we invite you to join us. Our parish offers
                  regular worship, sacramental preparation, pastoral care, and
                  numerous opportunities for fellowship and service to others.
                </motion.p>
                
                <motion.p
                  className="text-lg leading-relaxed text-gray-200"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={prefersReducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 0.8, delay: 0.6 }
                  }
                  viewport={{ once: true }}
                >
                  Led by our dedicated parish priest and supported by
                  committed lay ministers, we strive to live out Christ's call
                  to love one another as He has loved us. Through our
                  liturgies, educational programs, and community outreach, we
                  seek to be the hands and feet of Jesus in South East London.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion 
                  ? { duration: 0.3 }
                  : { duration: 0.8, delay: 0.8 }
                }
                viewport={{ once: true }}
              >
                {/* Learn More Button - WHITE BACKGROUND */}
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href="/about"
                    className="group inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 welcome-learn-more-button"
                  >
                    Learn More About Us
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
                
                {/* Get in Touch Button - WHITE BORDER */}
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                  >
                    Get in Touch
                    <Phone className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right 1/3 - Today's Services - WHITE CARDS */}
          <div className="lg:col-span-1">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={prefersReducedMotion 
                ? { duration: 0.3 }
                : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
              }
              viewport={{ once: true }}
              className="space-y-6"
            >
              
              {/* Services Card - WHITE BACKGROUND */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg welcome-sidebar-card">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-gray-900">
                        {currentDay}'s Services
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        All are welcome
                      </p>
                    </div>
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                </div>

                {/* Service List */}
                <div className="p-6 bg-white">
                  <div className="space-y-4">
                    {todaysServices.map((service, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        transition={prefersReducedMotion 
                          ? { duration: 0.3 }
                          : { duration: 0.4, delay: index * 0.1 }
                        }
                        viewport={{ once: true }}
                      >
                        <div>
                          <div className="font-semibold text-gray-900">
                            {service.time}
                          </div>
                          <div className="text-sm text-gray-600">
                            {service.type}
                          </div>
                          {service.description && (
                            <div className="text-xs text-gray-500 mt-1">
                              {service.description}
                            </div>
                          )}
                        </div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* View All Services Button */}
                <div className="p-6 pt-0 bg-white">
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  >
                    <button className="w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm welcome-schedule-button">
                      <Calendar className="h-4 w-4" />
                      <span>View Complete Schedule</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Quick Info Card - WHITE BACKGROUND */}
              <div className="bg-white rounded-xl p-6 shadow-lg welcome-sidebar-card">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Quick Info
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Church Open:</span>
                    <span className="font-medium text-gray-900">8:30am daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Live Streaming:</span>
                    <span className="font-medium text-gray-900">All services</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confessions:</span>
                    <span className="font-medium text-gray-900">Before evening Mass</span>
                  </div>
                </div>
              </div>

              {/* Contact Card - WHITE BACKGROUND */}
              <div className="bg-white rounded-xl p-6 shadow-lg welcome-sidebar-card">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Need Assistance?
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Our parish office is here to help with any questions about services or parish life.
                </p>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 text-gray-800 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Contact Parish Office</span>
                  </Link>
                </motion.div>
              </div>
              
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}