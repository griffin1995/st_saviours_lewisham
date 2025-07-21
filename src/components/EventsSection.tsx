import React from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

// Modern imports
import EventCard from "@/components/modern/EventCard";
import { useEventsQuery } from "@/hooks/useData";
import { useUI } from "@/stores/churchStore";

// Fallback data
import { upcomingEvents } from "@/lib/data";

export default function EventsSection() {
  const ui = useUI();
  const { data: events, isLoading, error } = useEventsQuery();

  // Use fetched data or fallback to static data
  const displayEvents = (Array.isArray(events) ? events.slice(0, 3) : null) || upcomingEvents.slice(0, 3);

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 relative z-10">
        {/* Enhanced Header */}
        <div className="flex justify-between items-end mb-16">
          <m.div
            className="space-y-4"
            initial={ui.reducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            whileInView={ui.reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={ui.reducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }
            viewport={{ once: true }}
          >
            <m.div
              className="flex items-center space-x-3"
              initial={ui.reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={ui.reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={ui.reducedMotion 
                ? { duration: 0.3 }
                : { duration: 0.6, delay: 0.2 }
              }
              viewport={{ once: true }}
            >
              <Calendar className="h-5 w-5 text-gold-500" />
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">
                Parish Events
              </span>
            </m.div>
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-white">
              <span className="block">Upcoming</span>
              <span className="block text-3xl lg:text-4xl text-gold-400 font-medium">
                Events & Activities
              </span>
            </h2>
          </m.div>

          <m.div
            initial={ui.reducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
            whileInView={ui.reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={ui.reducedMotion 
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
          </m.div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/10 rounded-xl h-96 border border-white/10"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-white/60 mb-4">
              Unable to load latest events. Showing upcoming events:
            </div>
          </m.div>
        )}

        {/* Events Grid */}
        {!isLoading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayEvents.map((event: any, index: number) => {
              // Transform data to match EventCard interface
              const eventData = {
                id: (event as any).id || `event-${index}`,
                title: event.title,
                description: event.description,
                date: event.date,
                time: event.time,
                endTime: (event as any).duration || undefined,
                location: event.location,
                category: (event as any).category || 'Parish Event',
                registrationRequired: (event as any).registrationRequired || false,
                attendees: (event as any).attendees,
                maxAttendees: (event as any).maxAttendees,
                image: (event as any).image,
                organizer: 'St Saviour\'s Catholic Church',
                tags: (event as any).tags || []
              };

              return (
                <m.div
                  key={(event as any).id || `event-${index}`}
                  initial={ui.reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                  whileInView={ui.reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={ui.reducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 0.6, delay: 0.1 * index }
                  }
                  viewport={{ once: true }}
                >
                  <EventCard
                    event={eventData}
                    variant="default"
                    showActions={true}
                    showRegistration={true}
                    onRegister={async (eventId) => {
                      // Handle registration - could integrate with TanStack mutation
                      console.log('Register for event:', eventId);
                    }}
                    className="h-full"
                  />
                </m.div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <m.div
          initial={ui.reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={ui.reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={ui.reducedMotion 
            ? { duration: 0.3 }
            : { duration: 0.8, delay: 0.5 }
          }
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Join Our Community Events
            </h3>
            <p className="text-gray-300 mb-8">
              Experience the joy of fellowship and spiritual growth through our diverse 
              range of parish activities and special celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
              >
                <Calendar className="mr-2 h-5 w-5" />
                View All Events
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}