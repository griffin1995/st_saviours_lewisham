import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Lock, Check, User, MessageCircle, Calendar } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface PrayerRequest {
  id: string;
  name: string;
  intention: string;
  category: 'healing' | 'thanksgiving' | 'guidance' | 'family' | 'other';
  isAnonymous: boolean;
  date: string;
  isPublic: boolean;
}

// Mock prayer requests for display
const recentRequests: PrayerRequest[] = [
  {
    id: '1',
    name: 'Anonymous',
    intention: 'For healing and recovery of my father',
    category: 'healing',
    isAnonymous: true,
    date: '2025-01-26',
    isPublic: true
  },
  {
    id: '2',
    name: 'Maria S.',
    intention: 'Thanksgiving for successful surgery',
    category: 'thanksgiving',
    isAnonymous: false,
    date: '2025-01-25',
    isPublic: true
  },
  {
    id: '3',
    name: 'Anonymous',
    intention: 'For guidance in difficult decisions',
    category: 'guidance',
    isAnonymous: true,
    date: '2025-01-24',
    isPublic: true
  }
];

const prayerCategories = [
  { id: 'healing', label: 'Healing & Health', icon: Heart, color: 'red' },
  { id: 'thanksgiving', label: 'Thanksgiving', icon: Check, color: 'green' },
  { id: 'guidance', label: 'Guidance', icon: MessageCircle, color: 'blue' },
  { id: 'family', label: 'Family', icon: User, color: 'purple' },
  { id: 'other', label: 'Other', icon: Calendar, color: 'gray' }
];

export default function PrayerRequestSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    intention: '',
    category: 'other',
    isAnonymous: false,
    isPublic: true,
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        intention: '',
        category: 'other',
        isAnonymous: false,
        isPublic: true,
        agreeToTerms: false
      });
    }, 3000);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = prayerCategories.find(cat => cat.id === categoryId);
    if (!category) return Calendar;
    return category.icon;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = prayerCategories.find(cat => cat.id === categoryId);
    return category?.color || 'gray';
  };

  return (
    <section className={`py-32 relative overflow-hidden ${
      resolvedTheme === 'dark'
        ? 'bg-gradient-to-br from-charcoal-900 via-primary-900 to-charcoal-800'
        : 'bg-gradient-to-br from-cream-100 via-sage-50/40 to-cream-50'
    } rounded-t-3xl shadow-2xl`}>
      
      {/* Background texture */}
      <div className={`absolute inset-0 ${
        resolvedTheme === 'dark'
          ? 'bg-[radial-gradient(circle_at_40%_60%,rgba(248,245,242,0.02)_1px,transparent_1px)]'
          : 'bg-[radial-gradient(circle_at_40%_60%,rgba(161,181,162,0.06)_1px,transparent_1px)]'
      } bg-[length:36px_36px]`} />

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
              Prayer Community
            </span>
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
          </div>
          
          <h2 className={`text-4xl lg:text-5xl font-serif font-light leading-tight ${
            resolvedTheme === 'dark' ? 'text-cream-50' : 'text-charcoal-900'
          }`}>
            <span className="block">Prayer</span>
            <span className={`block text-3xl lg:text-4xl font-medium ${
              resolvedTheme === 'dark' ? 'text-gold-400' : 'text-primary-800'
            }`}>
              Requests
            </span>
          </h2>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed mt-6 ${
            resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-600'
          }`}>
            Share your intentions with our parish family. Together we lift each other up in prayer and faith.
          </p>
        </m.div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Prayer Request Form */}
          <m.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8, delay: 0.2 }
            }
            viewport={{ once: true }}
          >
            <div className={`rounded-3xl p-8 border shadow-xl ${
              resolvedTheme === 'dark'
                ? 'bg-charcoal-800 border-charcoal-700'
                : 'bg-cream-50 border-cream-200'
            }`}>
              <h3 className={`text-2xl font-serif font-semibold mb-6 ${
                resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
              }`}>
                Submit Prayer Request
              </h3>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <m.div
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <m.div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                        resolvedTheme === 'dark' ? 'bg-green-600' : 'bg-green-500'
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
                      <Check className="h-8 w-8 text-white" />
                    </m.div>
                    <h4 className={`text-xl font-semibold mb-4 ${
                      resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
                    }`}>
                      Prayer Request Submitted
                    </h4>
                    <p className={`${
                      resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                    }`}>
                      Thank you for sharing your intention. Our parish community will pray for you.
                    </p>
                  </m.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                  >
                    
                    {/* Name Field */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-700'
                      }`}>
                        Name {!formData.isAnonymous && '*'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={formData.isAnonymous}
                        required={!formData.isAnonymous}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          formData.isAnonymous
                            ? resolvedTheme === 'dark'
                              ? 'bg-charcoal-700 border-charcoal-600 text-cream-400'
                              : 'bg-cream-200 border-cream-300 text-charcoal-500'
                            : resolvedTheme === 'dark'
                              ? 'bg-charcoal-700 border-charcoal-600 text-cream-100 focus:border-gold-500'
                              : 'bg-cream-100 border-cream-300 text-charcoal-800 focus:border-gold-500'
                        } focus:outline-none focus:ring-2 focus:ring-gold-400/50`}
                        placeholder={formData.isAnonymous ? "Anonymous" : "Your name"}
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-700'
                      }`}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          resolvedTheme === 'dark'
                            ? 'bg-charcoal-700 border-charcoal-600 text-cream-100 focus:border-gold-500'
                            : 'bg-cream-100 border-cream-300 text-charcoal-800 focus:border-gold-500'
                        } focus:outline-none focus:ring-2 focus:ring-gold-400/50`}
                        placeholder="your.email@example.com"
                      />
                      <p className={`text-xs mt-2 ${
                        resolvedTheme === 'dark' ? 'text-cream-400' : 'text-charcoal-500'
                      }`}>
                        For confirmation only. Not shared publicly.
                      </p>
                    </div>

                    {/* Category Field */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-700'
                      }`}>
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          resolvedTheme === 'dark'
                            ? 'bg-charcoal-700 border-charcoal-600 text-cream-100 focus:border-gold-500'
                            : 'bg-cream-100 border-cream-300 text-charcoal-800 focus:border-gold-500'
                        } focus:outline-none focus:ring-2 focus:ring-gold-400/50`}
                      >
                        {prayerCategories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Prayer Intention */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-700'
                      }`}>
                        Prayer Intention *
                      </label>
                      <textarea
                        name="intention"
                        value={formData.intention}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none ${
                          resolvedTheme === 'dark'
                            ? 'bg-charcoal-700 border-charcoal-600 text-cream-100 focus:border-gold-500'
                            : 'bg-cream-100 border-cream-300 text-charcoal-800 focus:border-gold-500'
                        } focus:outline-none focus:ring-2 focus:ring-gold-400/50`}
                        placeholder="Please share your prayer intention..."
                      />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isAnonymous"
                          checked={formData.isAnonymous}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded border-2 border-gold-500 text-gold-500 focus:ring-gold-400"
                        />
                        <span className={`${
                          resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-700'
                        }`}>
                          Submit anonymously
                        </span>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isPublic"
                          checked={formData.isPublic}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded border-2 border-gold-500 text-gold-500 focus:ring-gold-400"
                        />
                        <span className={`${
                          resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-700'
                        }`}>
                          Share with parish community
                        </span>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          required
                          className="w-5 h-5 rounded border-2 border-gold-500 text-gold-500 focus:ring-gold-400 mt-0.5"
                        />
                        <span className={`text-sm ${
                          resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                        }`}>
                          I agree to the terms and understand that prayer requests may be shared with our parish community for prayer purposes.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !formData.agreeToTerms}
                      className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                        isSubmitting || !formData.agreeToTerms
                          ? resolvedTheme === 'dark'
                            ? 'bg-charcoal-600 text-cream-400 cursor-not-allowed'
                            : 'bg-cream-300 text-charcoal-500 cursor-not-allowed'
                          : resolvedTheme === 'dark'
                            ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-charcoal-900 hover:from-gold-500 hover:to-gold-400'
                            : 'bg-gradient-to-r from-gold-600 to-gold-500 text-cream-50 hover:from-gold-500 hover:to-gold-400'
                      } shadow-lg hover:shadow-xl`}
                      whileHover={prefersReducedMotion || isSubmitting ? {} : { scale: 1.02 }}
                      whileTap={prefersReducedMotion || isSubmitting ? {} : { scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Send className="h-5 w-5" />
                          <span>Submit Prayer Request</span>
                        </div>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </m.div>

          {/* Recent Prayer Requests */}
          <m.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion 
              ? { duration: 0.3 }
              : { duration: 0.8, delay: 0.4 }
            }
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-serif font-semibold mb-8 ${
              resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
            }`}>
              Recent Prayer Requests
            </h3>

            <div className="space-y-6">
              {recentRequests.map((request, index) => {
                const IconComponent = getCategoryIcon(request.category);
                const categoryColor = getCategoryColor(request.category);
                
                return (
                  <m.div
                    key={request.id}
                    className={`rounded-2xl p-6 border ${
                      resolvedTheme === 'dark'
                        ? 'bg-charcoal-800 border-charcoal-700'
                        : 'bg-cream-50 border-cream-200'
                    } hover:shadow-lg transition-all duration-300`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={prefersReducedMotion 
                      ? { duration: 0.3 }
                      : { duration: 0.5, delay: 0.1 * index }
                    }
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg bg-${categoryColor}-100`}>
                        <IconComponent className={`h-5 w-5 text-${categoryColor}-600`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`font-semibold ${
                              resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
                            }`}>
                              {request.name}
                            </span>
                            {request.isAnonymous && (
                              <Lock className={`h-4 w-4 ${
                                resolvedTheme === 'dark' ? 'text-cream-400' : 'text-charcoal-500'
                              }`} />
                            )}
                          </div>
                          <span className={`text-xs ${
                            resolvedTheme === 'dark' ? 'text-cream-400' : 'text-charcoal-500'
                          }`}>
                            {request.date}
                          </span>
                        </div>
                        <p className={`${
                          resolvedTheme === 'dark' ? 'text-cream-200' : 'text-charcoal-600'
                        }`}>
                          {request.intention}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <span className={`text-xs px-2 py-1 rounded-full bg-${categoryColor}-100 text-${categoryColor}-700`}>
                            {prayerCategories.find(cat => cat.id === request.category)?.label}
                          </span>
                          <button className={`text-sm font-semibold transition-colors duration-300 ${
                            resolvedTheme === 'dark'
                              ? 'text-gold-400 hover:text-gold-300'
                              : 'text-gold-600 hover:text-gold-700'
                          }`}>
                            <Heart className="h-4 w-4 inline mr-1" />
                            Pray
                          </button>
                        </div>
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>

            {/* Privacy Notice */}
            <m.div
              className={`mt-8 p-6 rounded-2xl border ${
                resolvedTheme === 'dark'
                  ? 'bg-charcoal-800/50 border-charcoal-700'
                  : 'bg-cream-100/50 border-cream-200'
              }`}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion 
                ? { duration: 0.3 }
                : { duration: 0.6, delay: 0.8 }
              }
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-3">
                <Lock className={`h-5 w-5 mt-1 ${
                  resolvedTheme === 'dark' ? 'text-cream-400' : 'text-charcoal-500'
                }`} />
                <div>
                  <h4 className={`font-semibold mb-2 ${
                    resolvedTheme === 'dark' ? 'text-cream-100' : 'text-charcoal-800'
                  }`}>
                    Privacy & Confidentiality
                  </h4>
                  <p className={`text-sm ${
                    resolvedTheme === 'dark' ? 'text-cream-300' : 'text-charcoal-600'
                  }`}>
                    All prayer requests are handled with care and respect. Email addresses are never shared. 
                    Public requests are moderated by our pastoral team.
                  </p>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}