import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Calendar, Bell, Users, Languages, Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface MassTime {
  id: string;
  time: string;
  type: string;
  language?: string;
  description: string;
  isSpecial?: boolean;
  capacity?: string;
  celebrant?: string;
  isToday?: boolean;
  isNext?: boolean;
}

interface DaySchedule {
  day: string;
  date: string;
  masses: MassTime[];
  specialEvents?: string[];
}

// Enhanced Mass schedule data
const weeklySchedule: DaySchedule[] = [
  {
    day: 'Sunday',
    date: '2025-01-26',
    masses: [
      {
        id: 'sun-1',
        time: '8:30 AM',
        type: 'Mass',
        description: 'Quiet Mass with traditional hymns',
        capacity: 'Good availability',
        celebrant: 'Fr. Krisz',
        isToday: true
      },
      {
        id: 'sun-2', 
        time: '10:00 AM',
        type: 'Principal Mass',
        description: 'Family Mass with children\'s choir',
        capacity: 'Nearly full',
        celebrant: 'Fr. Krisz',
        isNext: true,
        isToday: true
      },
      {
        id: 'sun-3',
        time: '11:30 AM',
        type: 'Mass',
        description: 'Traditional Latin Mass',
        capacity: 'Good availability',
        celebrant: 'Fr. Krisz',
        isToday: true
      },
      {
        id: 'sun-4',
        time: '2:00 PM',
        type: 'Spanish Mass',
        language: 'Spanish',
        description: 'Misa en Español para la comunidad hispana',
        capacity: 'Good availability',
        celebrant: 'Fr. Rodriguez',
        isSpecial: true,
        isToday: true
      },
      {
        id: 'sun-5',
        time: '5:30 PM',
        type: 'Evening Mass',
        description: 'Contemporary worship with modern music',
        capacity: 'Good availability',
        celebrant: 'Fr. Krisz',
        isToday: true
      }
    ],
    specialEvents: ['First Sunday Collection for Parish Maintenance']
  },
  {
    day: 'Monday',
    date: '2025-01-27',
    masses: [
      {
        id: 'mon-1',
        time: '10:00 AM',
        type: 'Mass',
        description: 'Weekday Mass',
        capacity: 'Good availability',
        celebrant: 'Fr. Krisz'
      },
      {
        id: 'mon-2',
        time: '6:30 PM',
        type: 'Mass',
        description: 'Evening Mass',
        capacity: 'Good availability',
        celebrant: 'Fr. Krisz'
      }
    ]
  },
  {
    day: 'Tuesday',
    date: '2025-01-28',
    masses: [
      {
        id: 'tue-1',
        time: '10:00 AM',
        type: 'Mass',
        description: 'Weekday Mass',
        capacity: 'Good availability',
        celebrant: 'Fr. Krisz'
      },
      {
        id: 'tue-2',
        time: '7:00 PM',
        type: 'Pilgrim Mass',
        description: 'Special intention Mass for pilgrims',
        capacity: 'Good availability',
        celebrant: 'Fr. Krisz',
        isSpecial: true
      }
    ]
  }
];

export default function EnhancedMassTimesSection() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [nextMass, setNextMass] = useState<MassTime | null>(null);
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

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Find next Mass
  useEffect(() => {
    const today = weeklySchedule.find(day => day.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }));
    if (today) {
      const upcoming = today.masses.find(mass => mass.isNext);
      setNextMass(upcoming || null);
    }
  }, []);

  // Auto-select today
  useEffect(() => {
    const todayIndex = weeklySchedule.findIndex(day => 
      day.day === new Date().toLocaleDateString('en-US', { weekday: 'long' })
    );
    if (todayIndex !== -1) {
      setSelectedDay(todayIndex);
    }
  }, []);

  const getTimeUntilMass = (time: string): string => {
    const [timeStr, period] = time.split(' ');
    const [hours, minutes] = timeStr.split(':').map(Number);
    const massTime = new Date();
    massTime.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours);
    massTime.setMinutes(minutes);
    
    const diff = massTime.getTime() - currentTime.getTime();
    if (diff > 0) {
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hoursLeft}h ${minutesLeft}m`;
    }
    return 'In progress';
  };

  const currentSchedule = weeklySchedule[selectedDay];

  return (
    <section className={`py-32 relative overflow-hidden ${
      resolvedTheme === 'dark'
        ? 'bg-gradient-to-br from-primary-900 via-charcoal-800 to-charcoal-900'
        : 'bg-gradient-to-br from-sage-50 via-cream-50 to-cream-100'
    } rounded-t-3xl shadow-2xl`}>
      
      {/* Background texture */}
      <div className={`absolute inset-0 ${
        resolvedTheme === 'dark'
          ? 'bg-[radial-gradient(circle_at_60%_40%,rgba(248,245,242,0.02)_1px,transparent_1px)]'
          : 'bg-[radial-gradient(circle_at_60%_40%,rgba(78,95,72,0.06)_1px,transparent_1px)]'
      } bg-[length:28px_28px]`} />

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
              Worship Schedule
            </span>
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
          </div>
          
          <h2 className={`text-4xl lg:text-5xl font-serif font-light leading-tight ${
            resolvedTheme === 'dark' ? 'text-cream-50' : 'text-charcoal-900'
          }`}>
            <span className="block">Mass Times &</span>
            <span className={`block text-3xl lg:text-4xl font-medium ${
              resolvedTheme === 'dark' ? 'text-gold-400' : 'text-primary-800'
            }`}>
              Sacred Services
            </span>
          </h2>
        </m.div>

        {/* Next Mass Alert */}
        {nextMass && (
          <m.div
            className={`mb-12 rounded-2xl p-6 border-2 ${
              resolvedTheme === 'dark'
                ? 'bg-gradient-to-r from-gold-900/30 to-gold-800/30 border-gold-600/50'
                : 'bg-gradient-to-r from-gold-50 to-gold-100/50 border-gold-300'
            } shadow-lg`}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.6, delay: 0.2 }
            }
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <m.div
                  className={`p-3 rounded-xl ${
                    resolvedTheme === 'dark' ? 'bg-gold-600' : 'bg-gold-500'
                  }`}
                  animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.1, 1],
                  }}
                  transition={prefersReducedMotion ? {} : {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Bell className="h-6 w-6 text-white" />
                </m.div>
                <div>
                  <h3 className={`text-xl font-semibold ${
                    resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
                  }`}>
                    Next Mass: {nextMass.time}
                  </h3>
                  <p className={`${
                    resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-600'
                  }`}>
                    {nextMass.type} • {nextMass.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${
                  resolvedTheme === 'dark' ? 'text-gold-400' : 'text-gold-600'
                }`}>
                  {getTimeUntilMass(nextMass.time)}
                </div>
                <div className={`text-sm ${
                  resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                }`}>
                  until Mass
                </div>
              </div>
            </div>
          </m.div>
        )}

        {/* Day Selector */}
        <m.div
          className="mb-12"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion 
            ? { duration: 0.3 }
            : { duration: 0.6, delay: 0.3 }
          }
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {weeklySchedule.map((day, index) => (
              <m.button
                key={day.day}
                onClick={() => setSelectedDay(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedDay === index
                    ? resolvedTheme === 'dark'
                      ? 'bg-gold-600 text-charcoal-900 shadow-lg'
                      : 'bg-gold-500 text-cream-50 shadow-lg'
                    : resolvedTheme === 'dark'
                      ? 'bg-charcoal-800 text-cream-200 hover:bg-charcoal-700 border border-charcoal-700'
                      : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200 border border-cream-200'
                }`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="font-medium">{day.day}</div>
                  <div className="text-xs opacity-80">{day.date.split('-').slice(1).join('/')}</div>
                </div>
              </m.button>
            ))}
          </div>
        </m.div>

        {/* Mass Schedule */}
        <AnimatePresence mode="wait">
          <m.div
            key={selectedDay}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.5 }
            }
          >
            <div className="grid gap-6">
              {currentSchedule.masses.map((mass, index) => (
                <m.div
                  key={mass.id}
                  className={`rounded-2xl p-6 border transition-all duration-300 ${
                    mass.isNext
                      ? resolvedTheme === 'dark'
                        ? 'bg-gold-900/20 border-gold-600/50 shadow-lg shadow-gold-500/10'
                        : 'bg-gold-50 border-gold-300 shadow-lg shadow-gold-500/10'
                      : resolvedTheme === 'dark'
                        ? 'bg-charcoal-800 border-charcoal-700 hover:border-charcoal-600'
                        : 'bg-cream-50 border-cream-200 hover:border-cream-300'
                  } hover:shadow-xl`}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={prefersReducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 0.5, delay: 0.1 * index }
                  }
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${
                        mass.isSpecial
                          ? resolvedTheme === 'dark' ? 'bg-gold-600' : 'bg-gold-500'
                          : resolvedTheme === 'dark' ? 'bg-charcoal-700' : 'bg-cream-200'
                      }`}>
                        {mass.language ? 
                          <Languages className="h-6 w-6 text-white" /> :
                          mass.isSpecial ? 
                            <Heart className="h-6 w-6 text-white" /> :
                            <Clock className="h-6 w-6" />
                        }
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className={`text-2xl font-bold ${
                            resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
                          }`}>
                            {mass.time}
                          </h3>
                          {mass.isNext && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              resolvedTheme === 'dark'
                                ? 'bg-gold-600 text-charcoal-900'
                                : 'bg-gold-500 text-cream-50'
                            }`}>
                              Next
                            </span>
                          )}
                          {mass.language && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              resolvedTheme === 'dark'
                                ? 'bg-primary-600 text-cream-100'
                                : 'bg-primary-500 text-cream-50'
                            }`}>
                              {mass.language}
                            </span>
                          )}
                        </div>
                        <h4 className={`text-lg font-semibold ${
                          resolvedTheme === 'dark' ? 'text-gold-400' : 'text-primary-700'
                        }`}>
                          {mass.type}
                        </h4>
                      </div>
                    </div>
                    
                    {mass.isToday && (
                      <div className={`text-right ${
                        resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                      }`}>
                        <div className="text-lg font-semibold">
                          {getTimeUntilMass(mass.time)}
                        </div>
                        <div className="text-sm">remaining</div>
                      </div>
                    )}
                  </div>
                  
                  <p className={`mb-4 ${
                    resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-600'
                  }`}>
                    {mass.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      {mass.celebrant && (
                        <div className="flex items-center space-x-2">
                          <Users className={`h-4 w-4 ${
                            resolvedTheme === 'dark' ? 'text-cream-400' : 'text-charcoal-500'
                          }`} />
                          <span className={`text-sm ${
                            resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                          }`}>
                            {mass.celebrant}
                          </span>
                        </div>
                      )}
                      
                      {mass.capacity && (
                        <div className="flex items-center space-x-2">
                          <MapPin className={`h-4 w-4 ${
                            resolvedTheme === 'dark' ? 'text-cream-400' : 'text-charcoal-500'
                          }`} />
                          <span className={`text-sm ${
                            resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                          }`}>
                            {mass.capacity}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <button className={`text-sm font-semibold transition-colors duration-300 ${
                      resolvedTheme === 'dark'
                        ? 'text-gold-400 hover:text-gold-300'
                        : 'text-gold-600 hover:text-gold-700'
                    }`}>
                      Add to Calendar
                    </button>
                  </div>
                </m.div>
              ))}
            </div>
            
            {/* Special Events */}
            {currentSchedule.specialEvents && currentSchedule.specialEvents.length > 0 && (
              <m.div
                className={`mt-8 rounded-2xl p-6 border ${
                  resolvedTheme === 'dark'
                    ? 'bg-primary-900/30 border-primary-700'
                    : 'bg-primary-50 border-primary-200'
                }`}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion 
                  ? { duration: 0.3 }
                  : { duration: 0.6, delay: 0.5 }
                }
              >
                <h4 className={`font-semibold mb-3 ${
                  resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
                }`}>
                  Special Events
                </h4>
                <ul className="space-y-2">
                  {currentSchedule.specialEvents.map((event, index) => (
                    <li key={index} className={`flex items-center space-x-2 ${
                      resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-600'
                    }`}>
                      <Calendar className="h-4 w-4" />
                      <span>{event}</span>
                    </li>
                  ))}
                </ul>
              </m.div>
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}