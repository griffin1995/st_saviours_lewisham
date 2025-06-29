import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { newsArticles } from "@/lib/data";
import { buttonVariants, cardVariants } from "@/lib/animations";
import LoadingSkeleton from "./LoadingSkeleton";
import { getNewsImages } from "@/lib/cms-images";

interface NewsSectionProps {
  isLoading: boolean;
  imagesLoaded: Set<string>;
  handleImageLoad: (imageId: string) => void;
  isMobile: boolean;
}

export default function NewsSection({
  isLoading,
  imagesLoaded,
  handleImageLoad,
  isMobile,
}: NewsSectionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const newsImages = getNewsImages();

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

  // Embla Carousel for news section
  const [newsEmblaRef, newsEmblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
    containScroll: false,
    slidesToScroll: 1,
  });

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const scrollNewsPrev = useCallback(() => {
    if (newsEmblaApi) newsEmblaApi.scrollPrev();
  }, [newsEmblaApi]);

  const scrollNewsNext = useCallback(() => {
    if (newsEmblaApi) newsEmblaApi.scrollNext();
  }, [newsEmblaApi]);

  // Enhanced touch gesture handling for mobile navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && newsEmblaApi) {
      newsEmblaApi.scrollNext();
    }
    if (isRightSwipe && newsEmblaApi) {
      newsEmblaApi.scrollPrev();
    }
  }, [touchStart, touchEnd, newsEmblaApi]);

  return (
    <section 
      className="py-24 bg-navy-900 relative overflow-hidden"
      aria-labelledby="news-heading"
      role="region"
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 relative z-10">
        {/* Enhanced section header with refined animation */}
        <motion.div
          className="flex justify-between items-end mb-16"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion 
            ? { duration: 0.3 }
            : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
          }
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <motion.div
              className="flex items-center space-x-3"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={prefersReducedMotion 
                ? { duration: 0.3 }
                : { duration: 0.6, delay: 0.2 }
              }
              viewport={{ once: true }}
            >
              <div className="w-2 h-2 bg-gold-500 rounded-full" />
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">
                Parish News
              </span>
            </motion.div>
            <h2 
              id="news-heading"
              className="text-4xl lg:text-5xl font-serif font-light text-white"
            >
              <span className="block">Latest</span>
              <span className="block text-3xl lg:text-4xl text-gold-400 font-medium">
                Community News
              </span>
            </h2>
          </div>

          {/* Desktop navigation controls with enhanced design */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              onClick={scrollNewsPrev}
              className="group flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm shadow-lg rounded-full border border-white/20 hover:border-gold-400 hover:shadow-xl hover:shadow-gold-500/10 focus:border-gold-400 focus:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
              variants={buttonVariants}
              whileHover={prefersReducedMotion ? {} : "hover"}
              whileTap={prefersReducedMotion ? {} : "tap"}
              aria-label="Previous news article"
              type="button"
            >
              <ChevronLeft className="h-6 w-6 text-white group-hover:text-gold-400 transition-colors duration-300" aria-hidden="true" />
            </motion.button>
            <motion.button
              onClick={scrollNewsNext}
              className="group flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm shadow-lg rounded-full border border-white/20 hover:border-gold-400 hover:shadow-xl hover:shadow-gold-500/10 focus:border-gold-400 focus:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
              variants={buttonVariants}
              whileHover={prefersReducedMotion ? {} : "hover"}
              whileTap={prefersReducedMotion ? {} : "tap"}
              aria-label="Next news article"
              type="button"
            >
              <ChevronRight className="h-6 w-6 text-white group-hover:text-gold-400 transition-colors duration-300" aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>

        {/* News Cards with Events-style grid layout but with scrolling */}
        <div 
          className="overflow-hidden pb-8" 
          ref={newsEmblaRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex pb-4">
            {newsArticles.map((article, index) => (
              <div
                key={article.id}
                className={`flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pb-4 ${
                  index === 0 ? 'pl-0 pr-4' : 'px-4'
                }`}
              >
                <motion.article
                  className="h-full"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="group rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 h-full flex flex-col news-card-container" style={{ backgroundColor: '#ffffff' }}>
                    {/* Loading state overlay */}
                    {isLoading && (
                      <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-400"></div>
                      </div>
                    )}
                    {/* Enhanced image container with Next.js Image optimization */}
                    <div className="relative h-56 overflow-hidden">
                      {!imagesLoaded.has(`news-${article.id}`) && (
                        <LoadingSkeleton className="absolute inset-0 w-full h-full" />
                      )}
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                        transition={prefersReducedMotion ? {} : { duration: 0.6, ease: "easeOut" }}
                      >
                        <Image
                          src={newsImages[index]?.url || article.image}
                          alt={newsImages[index]?.alt || `${article.title} - ${article.category} article about parish life`}
                          fill
                          className={`object-cover transition-opacity duration-500 ${
                            imagesLoaded.has(`news-${article.id}`) ? 'opacity-100' : 'opacity-0'
                          }`}
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 85vw, (max-width: 1024px) 70vw, (max-width: 1280px) 45vw, 33vw"
                          quality={85}
                          onLoad={() => handleImageLoad(`news-${article.id}`)}
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      
                      {/* Enhanced category badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="inline-flex items-center text-xs font-semibold text-white drop-shadow-lg news-category-badge">
                          {article.category}
                        </span>
                      </div>

                      {/* Enhanced date badge with semi-transparent blur */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg border border-white/30">
                          <div className="text-center">
                            <div className="text-lg font-bold text-white drop-shadow-sm">
                              {new Date(article.date).getDate()}
                            </div>
                            <div className="text-xs font-semibold text-white/90 uppercase drop-shadow-sm">
                              {new Date(article.date).toLocaleDateString('en-GB', { month: 'short' })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced content with improved typography and spacing */}
                    <div className="p-8 flex-1 flex flex-col news-card-content" style={{ backgroundColor: '#ffffff' }}>
                      <motion.h3
                        className="text-xl font-serif font-semibold text-gray-900 mb-4 line-clamp-2 relative cursor-pointer"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={prefersReducedMotion 
                          ? { duration: 0.3 }
                          : { duration: 0.6, delay: 0.2 }
                        }
                        viewport={{ once: true }}
                      >
                        {article.title}
                        <span className="absolute bottom-0 left-0 h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                      </motion.h3>
                      
                      <motion.p
                        className="text-gray-600 leading-relaxed mb-6 flex-1 line-clamp-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={prefersReducedMotion 
                          ? { duration: 0.3 }
                          : { duration: 0.6, delay: 0.3 }
                        }
                        viewport={{ once: true }}
                      >
                        {article.excerpt}
                      </motion.p>

                      {/* Enhanced read more link with animation */}
                      <motion.div
                        className="flex items-center justify-between pt-4 border-t border-gray-200"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={prefersReducedMotion 
                          ? { duration: 0.3 }
                          : { duration: 0.6, delay: 0.4 }
                        }
                        viewport={{ once: true }}
                      >
                        <motion.a
                          href={`/news/${article.id}`}
                          className="group/link inline-flex items-center text-gray-900 hover:text-gray-700 focus:text-gray-700 font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
                          whileHover={prefersReducedMotion ? {} : { x: 4 }}
                          transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 30 }}
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                        </motion.a>
                        
                        <div className="text-sm text-gray-500 font-medium">
                          {article.readTime} min read
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile navigation controls - Enhanced for touch */}
        <div className="flex lg:hidden justify-center mt-8 space-x-6">
          <motion.button
            onClick={scrollNewsPrev}
            className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm shadow-lg rounded-full border border-white/20 hover:bg-white/20 hover:shadow-xl focus:bg-white/20 transition-all duration-300 touch-manipulation focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            aria-label="Previous news article"
          >
            <ChevronLeft className="h-7 w-7 text-white" />
          </motion.button>
          <motion.button
            onClick={scrollNewsNext}
            className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm shadow-lg rounded-full border border-white/20 hover:bg-white/20 hover:shadow-xl focus:bg-white/20 transition-all duration-300 touch-manipulation focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            aria-label="Next news article"
          >
            <ChevronRight className="h-7 w-7 text-white" />
          </motion.button>
        </div>
        
        {/* Mobile swipe indicator */}
        {isMobile && (
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 text-sm text-gray-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/20">
              <span>←</span>
              <span>Swipe to browse</span>
              <span>→</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}