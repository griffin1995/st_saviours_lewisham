import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Church, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { historyCards } from "@/lib/data";
import { getHistoryImages } from "@/lib/cms-images";

export default function HistorySection() {
  const [isHistoryHovered, setIsHistoryHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const historyImages = getHistoryImages();

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

  // Autoplay plugin
  const autoplayPlugin = useCallback(
    () => Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true }),
    []
  );

  // Embla Carousel for history section with autoplay plugin
  const [historyEmblaRef, historyEmblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: false,
      containScroll: false,
      startIndex: 0,
      skipSnaps: false,
    },
    [autoplayPlugin()]
  );

  // Track selected slide for scaling effect
  const onSelect = useCallback(() => {
    if (!historyEmblaApi) return;
    setSelectedIndex(historyEmblaApi.selectedScrollSnap());
  }, [historyEmblaApi]);

  useEffect(() => {
    if (!historyEmblaApi) return;
    onSelect();
    historyEmblaApi.on('select', onSelect);
    return () => {
      historyEmblaApi.off('select', onSelect);
    };
  }, [historyEmblaApi, onSelect]);

  const scrollHistoryPrev = useCallback(() => {
    if (historyEmblaApi) historyEmblaApi.scrollPrev();
  }, [historyEmblaApi]);

  const scrollHistoryNext = useCallback(() => {
    if (historyEmblaApi) historyEmblaApi.scrollNext();
  }, [historyEmblaApi]);

  // Manual autoplay control for enhanced hover behavior
  const handleHistoryMouseEnter = useCallback(() => {
    setIsHistoryHovered(true);
    if (historyEmblaApi) {
      const autoplay = historyEmblaApi.plugins().autoplay;
      if (autoplay) autoplay.stop();
    }
  }, [historyEmblaApi]);

  const handleHistoryMouseLeave = useCallback(() => {
    setIsHistoryHovered(false);
    if (historyEmblaApi) {
      const autoplay = historyEmblaApi.plugins().autoplay;
      if (autoplay) autoplay.play();
    }
  }, [historyEmblaApi]);

  return (
    <section className="py-24 bg-slate-800 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pt-6 pb-12 relative z-10">
        {/* Enhanced section header */}
        <m.div
          className="text-center space-y-6"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion 
            ? { duration: 0.3 }
            : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
          }
          viewport={{ once: true }}
        >
          <m.div
            className="flex items-center justify-center space-x-3"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.6, delay: 0.2 }
            }
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">
              Our Heritage
            </span>
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
          </m.div>
          
          <h2 className="text-5xl lg:text-6xl font-serif font-light text-white leading-tight">
            <span className="block">Our Story &</span>
            <span className="block text-4xl lg:text-5xl text-gold-400 font-medium">
              Community
            </span>
          </h2>
          
          <m.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8, delay: 0.4 }
            }
            viewport={{ once: true }}
          >
            Discover the rich history and vibrant community that makes St Saviour's 
            a spiritual home for hundreds of families in Lewisham.
          </m.p>
        </m.div>
      </div>

      {/* Full-width carousel container */}
      <div className="w-full">
        <div
          className="overflow-visible py-8"
          ref={historyEmblaRef}
          onMouseEnter={handleHistoryMouseEnter}
          onMouseLeave={handleHistoryMouseLeave}
        >
          <div className="flex">
            {historyCards.map((card, index) => (
              <div
                key={card.id}
                className="flex-[0_0_85%] sm:flex-[0_0_80%] lg:flex-[0_0_70%] xl:flex-[0_0_60%] px-3"
              >
                <m.div
                  className="history-card mx-auto max-w-3xl"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 50 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  animate={prefersReducedMotion ? {} : {
                    scale: selectedIndex === index ? 1.1 : 1,
                    transition: { duration: 0.5, ease: "easeInOut" }
                  }}
                  transition={prefersReducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 0.8, delay: 0.1 * index }
                  }
                  viewport={{ once: true }}
                >
                  <m.div
                    className="group rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 relative"
                    style={{
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                    }}
                    whileHover={prefersReducedMotion ? {} : { 
                      y: -12, 
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300, damping: 25 }
                    }}
                  >
                    {/* Full height image container with all content overlaid */}
                    <div className="relative h-[480px] overflow-hidden">
                      <m.div
                        className="relative w-full h-full"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                        transition={prefersReducedMotion ? {} : { duration: 0.7, ease: "easeOut" }}
                      >
                        <Image
                          src={historyImages[index]?.url || card.image}
                          alt={historyImages[index]?.alt || `${card.title} - ${card.category} section about St Saviour's parish history and community heritage`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 85vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, (max-width: 1280px) 60vw, 60vw"
                          quality={85}
                        />
                      </m.div>
                      
                      {/* Enhanced colorful overlay based on card index */}
                      <div className={`absolute inset-0 ${
                        index === 0 ? 'bg-gradient-to-br from-purple-600/50 via-violet-500/40 to-indigo-700/60' :
                        index === 1 ? 'bg-gradient-to-br from-emerald-600/50 via-green-500/40 to-teal-700/60' :
                        index === 2 ? 'bg-gradient-to-br from-amber-600/50 via-orange-500/40 to-red-600/60' :
                        index === 3 ? 'bg-gradient-to-br from-rose-600/50 via-pink-500/40 to-fuchsia-700/60' :
                        'bg-gradient-to-br from-blue-600/50 via-cyan-500/40 to-sky-700/60'
                      } mix-blend-overlay`} />
                      
                      {/* Strong dark gradient for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                      
                      {/* Enhanced floating badge - text only */}
                      <div className="absolute top-6 left-6">
                        <m.div
                          className="inline-flex items-center text-sm font-semibold text-white drop-shadow-lg"
                          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                          transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <Church className="w-4 h-4 mr-2" />
                          {card.category}
                        </m.div>
                      </div>

                      {/* Year badge in top right */}
                      {card.year && (
                        <div className="absolute top-6 right-6">
                          <m.div
                            className="text-right bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2"
                            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                            transition={prefersReducedMotion 
                              ? { duration: 0.3 }
                              : { duration: 0.6, delay: 0.2 }
                            }
                            viewport={{ once: true }}
                          >
                            <div className="text-2xl font-bold text-white">
                              {card.year}
                            </div>
                            <div className="text-sm text-white/80">
                              Est.
                            </div>
                          </m.div>
                        </div>
                      )}

                      {/* All content overlaid at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <m.h3
                          className="text-3xl font-serif font-bold text-white mb-4"
                          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          transition={prefersReducedMotion 
                            ? { duration: 0.3 }
                            : { duration: 0.6, delay: 0.3 }
                          }
                          viewport={{ once: true }}
                        >
                          {card.title}
                        </m.h3>

                        <m.p
                          className="text-white/90 leading-relaxed text-lg mb-6 line-clamp-3"
                          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          transition={prefersReducedMotion 
                            ? { duration: 0.3 }
                            : { duration: 0.6, delay: 0.4 }
                          }
                          viewport={{ once: true }}
                        >
                          {card.description}
                        </m.p>

                        {/* Action link */}
                        <m.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={prefersReducedMotion 
                            ? { duration: 0.3 }
                            : { duration: 0.6, delay: 0.5 }
                          }
                          viewport={{ once: true }}
                        >
                          <m.a
                            href={card.link}
                            className="group/link inline-flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                            transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 30 }}
                          >
                            {card.linkText}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-1 transition-transform duration-300" />
                          </m.a>
                        </m.div>
                      </div>
                    </div>
                  </m.div>
                </m.div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop navigation controls with enhanced positioning */}
        <div className="hidden lg:flex justify-center mt-16 mb-12 space-x-6">
          <m.button
            onClick={scrollHistoryPrev}
            className="group flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm shadow-xl rounded-full border border-white/20 hover:border-gold-400 hover:shadow-2xl focus:border-gold-400 focus:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            aria-label="Previous history card"
            type="button"
          >
            <ChevronLeft className="h-7 w-7 text-white group-hover:text-gold-400 transition-colors duration-300" />
          </m.button>
          <m.button
            onClick={scrollHistoryNext}
            className="group flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm shadow-xl rounded-full border border-white/20 hover:border-gold-400 hover:shadow-2xl focus:border-gold-400 focus:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            aria-label="Next history card"
            type="button"
          >
            <ChevronRight className="h-7 w-7 text-white group-hover:text-gold-400 transition-colors duration-300" />
          </m.button>
        </div>

        {/* Mobile navigation */}
        <div className="flex lg:hidden justify-center mt-8 mb-10 space-x-4">
          <m.button
            onClick={scrollHistoryPrev}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm shadow-lg rounded-full border border-white/20 hover:bg-white/20 focus:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            aria-label="Previous history card"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </m.button>
          <m.button
            onClick={scrollHistoryNext}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm shadow-lg rounded-full border border-white/20 hover:bg-white/20 focus:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            aria-label="Next history card"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </m.button>
        </div>
      </div>
    </section>
  );
}