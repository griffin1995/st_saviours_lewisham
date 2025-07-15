import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Calendar, Clock, Radio, Video } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface LiveStream {
  id: string;
  title: string;
  isLive: boolean;
  startTime: string;
  endTime: string;
  viewerCount: number;
  streamUrl: string;
  description: string;
  type: 'mass' | 'prayer' | 'event';
}

// Mock live stream data - in production this would come from your streaming service
const mockStreams: LiveStream[] = [
  {
    id: '1',
    title: 'Sunday Mass - 10:00 AM',
    isLive: true,
    startTime: '10:00',
    endTime: '11:15',
    viewerCount: 127,
    streamUrl: 'https://youtube.com/embed/live_stream_id',
    description: 'Join us for our principal Sunday Mass with hymns and full liturgy',
    type: 'mass'
  },
  {
    id: '2', 
    title: 'Evening Prayer & Adoration',
    isLive: false,
    startTime: '18:00',
    endTime: '19:00',
    viewerCount: 0,
    streamUrl: 'https://youtube.com/embed/stream_id_2',
    description: 'Peaceful evening prayer and Eucharistic adoration',
    type: 'prayer'
  }
];

export default function LiveStreamSection() {
  const [currentStream, setCurrentStream] = useState<LiveStream | null>(null);
  const [upcomingStreams, setUpcomingStreams] = useState<LiveStream[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { resolvedTheme } = useTheme();

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

  // Simulate live stream data
  useEffect(() => {
    const liveStream = mockStreams.find(stream => stream.isLive);
    const upcoming = mockStreams.filter(stream => !stream.isLive);
    
    setCurrentStream(liveStream || null);
    setUpcomingStreams(upcoming);
  }, []);

  const getStreamIcon = (type: string) => {
    switch (type) {
      case 'mass':
        return <Radio className="h-5 w-5" />;
      case 'prayer':
        return <Clock className="h-5 w-5" />;
      default:
        return <Video className="h-5 w-5" />;
    }
  };

  return (
    <section className={`py-32 relative overflow-hidden ${
      resolvedTheme === 'dark'
        ? 'bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-primary-900'
        : 'bg-gradient-to-br from-cream-50 via-sage-50/30 to-cream-100'
    } rounded-t-3xl shadow-2xl`}>
      
      {/* Background texture */}
      <div className={`absolute inset-0 ${
        resolvedTheme === 'dark'
          ? 'bg-[radial-gradient(circle_at_30%_70%,rgba(248,245,242,0.03)_1px,transparent_1px)]'
          : 'bg-[radial-gradient(circle_at_30%_70%,rgba(78,95,72,0.04)_1px,transparent_1px)]'
      } bg-[length:32px_32px]`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        
        {/* Section Header */}
        <m.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion 
            ? { duration: 0.3 }
            : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
          }
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
            <span className={`font-semibold text-sm uppercase tracking-wider ${
              resolvedTheme === 'dark' ? 'text-gold-400' : 'text-gold-700'
            }`}>
              Live Worship
            </span>
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
          </div>
          
          <h2 className={`text-4xl lg:text-5xl font-serif font-light leading-tight ${
            resolvedTheme === 'dark' ? 'text-cream-50' : 'text-charcoal-900'
          }`}>
            <span className="block">Join Us</span>
            <span className={`block text-3xl lg:text-4xl font-medium ${
              resolvedTheme === 'dark' ? 'text-gold-400' : 'text-primary-800'
            }`}>
              Live Online
            </span>
          </h2>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed mt-6 ${
            resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-600'
          }`}>
            Experience our liturgies and prayer services from anywhere. 
            Join our parish family in worship, even when you can't be with us in person.
          </p>
        </m.div>

        {/* Live Stream */}
        {currentStream ? (
          <m.div
            className="mb-16"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8, delay: 0.2 }
            }
            viewport={{ once: true }}
          >
            <div className={`rounded-3xl overflow-hidden shadow-2xl border ${
              resolvedTheme === 'dark'
                ? 'bg-charcoal-800 border-charcoal-700'
                : 'bg-cream-50 border-cream-200'
            }`}>
              
              {/* Live indicator */}
              <div className={`px-8 py-4 border-b ${
                resolvedTheme === 'dark' 
                  ? 'border-charcoal-700 bg-charcoal-900/50'
                  : 'border-cream-200 bg-cream-100/50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <m.div
                      className="flex items-center space-x-2"
                      animate={prefersReducedMotion ? {} : {
                        scale: [1, 1.05, 1],
                      }}
                      transition={prefersReducedMotion ? {} : {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className={`font-semibold text-sm uppercase tracking-wider ${
                        resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`}>
                        Live Now
                      </span>
                    </m.div>
                    
                    <div className="flex items-center space-x-2">
                      {getStreamIcon(currentStream.type)}
                      <span className={`font-medium ${
                        resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
                      }`}>
                        {currentStream.title}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Users className={`h-4 w-4 ${
                        resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                      }`} />
                      <span className={`text-sm font-medium ${
                        resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                      }`}>
                        {currentStream.viewerCount} watching
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className={`h-4 w-4 ${
                        resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                      }`} />
                      <span className={`text-sm font-medium ${
                        resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                      }`}>
                        {currentStream.startTime} - {currentStream.endTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video player placeholder */}
              <div className={`aspect-video relative ${
                resolvedTheme === 'dark' ? 'bg-charcoal-900' : 'bg-charcoal-100'
              }`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    className={`group flex items-center justify-center w-20 h-20 rounded-full shadow-2xl transition-all duration-300 ${
                      resolvedTheme === 'dark'
                        ? 'bg-cream-50 hover:bg-cream-100 text-charcoal-800'
                        : 'bg-charcoal-800 hover:bg-charcoal-900 text-cream-50'
                    }`}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  >
                    <Play className="h-8 w-8 ml-1" />
                  </motion.button>
                </div>
                
                {/* Video overlay info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className={`rounded-xl px-4 py-3 backdrop-blur-md ${
                    resolvedTheme === 'dark'
                      ? 'bg-charcoal-900/70 border border-charcoal-700/50'
                      : 'bg-cream-50/70 border border-cream-200/50'
                  }`}>
                    <p className={`text-sm ${
                      resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-700'
                    }`}>
                      {currentStream.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        ) : (
          /* No live stream */
          <m.div
            className="mb-16 text-center"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.6, delay: 0.2 }
            }
            viewport={{ once: true }}
          >
            <div className={`rounded-3xl p-12 border-2 border-dashed ${
              resolvedTheme === 'dark'
                ? 'border-charcoal-600 bg-charcoal-800/50'
                : 'border-cream-300 bg-cream-100/50'
            }`}>
              <Video className={`h-16 w-16 mx-auto mb-6 ${
                resolvedTheme === 'dark' ? 'text-charcoal-500' : 'text-charcoal-400'
              }`} />
              <h3 className={`text-2xl font-serif font-semibold mb-4 ${
                resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
              }`}>
                No Live Stream
              </h3>
              <p className={`text-lg ${
                resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
              }`}>
                We're not currently streaming. Check our upcoming services below or visit our YouTube channel for recorded Masses.
              </p>
            </div>
          </m.div>
        )}

        {/* Upcoming Streams */}
        {upcomingStreams.length > 0 && (
          <m.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8, delay: 0.4 }
            }
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-serif font-semibold mb-8 ${
              resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
            }`}>
              Upcoming Services
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingStreams.map((stream, index) => (
                <m.div
                  key={stream.id}
                  className={`rounded-2xl p-6 border transition-all duration-300 ${
                    resolvedTheme === 'dark'
                      ? 'bg-charcoal-800 border-charcoal-700 hover:border-gold-500'
                      : 'bg-cream-50 border-cream-200 hover:border-gold-400'
                  } hover:shadow-xl`}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={prefersReducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 0.6, delay: 0.1 * index }
                  }
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        resolvedTheme === 'dark' ? 'bg-charcoal-700' : 'bg-cream-200'
                      }`}>
                        {getStreamIcon(stream.type)}
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
                        }`}>
                          {stream.title}
                        </h4>
                        <p className={`text-sm ${
                          resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                        }`}>
                          {stream.startTime} - {stream.endTime}
                        </p>
                      </div>
                    </div>
                    
                    <Calendar className={`h-5 w-5 ${
                      resolvedTheme === 'dark' ? 'text-cream-400' : 'text-charcoal-500'
                    }`} />
                  </div>
                  
                  <p className={`text-sm mb-4 ${
                    resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                  }`}>
                    {stream.description}
                  </p>
                  
                  <button className={`text-sm font-semibold transition-colors duration-300 ${
                    resolvedTheme === 'dark'
                      ? 'text-gold-400 hover:text-gold-300'
                      : 'text-gold-600 hover:text-gold-700'
                  }`}>
                    Set Reminder
                  </button>
                </m.div>
              ))}
            </div>
          </m.div>
        )}

        {/* Call to Action */}
        <m.div
          className="text-center mt-16"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion 
            ? { duration: 0.3 }
            : { duration: 0.6, delay: 0.6 }
          }
          viewport={{ once: true }}
        >
          <motion.button
            className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
              resolvedTheme === 'dark'
                ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-charcoal-900 hover:from-gold-500 hover:to-gold-400'
                : 'bg-gradient-to-r from-gold-600 to-gold-500 text-cream-50 hover:from-gold-500 hover:to-gold-400'
            }`}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          >
            <Video className="h-5 w-5 mr-3" />
            Visit Our YouTube Channel
          </motion.button>
        </m.div>
      </div>
    </section>
  );
}