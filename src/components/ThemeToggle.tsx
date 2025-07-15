import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
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

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'auto':
        return <Monitor className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'auto':
        return `Auto (${resolvedTheme})`;
      default:
        return 'Light mode';
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: prefersReducedMotion ? {} : { 
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    },
    tap: prefersReducedMotion ? {} : { 
      scale: 0.95,
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, opacity: 1 },
    exit: prefersReducedMotion ? { opacity: 0 } : { 
      rotate: -180, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    enter: prefersReducedMotion ? { opacity: 1 } : { 
      rotate: 0, 
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center w-12 h-12 rounded-xl
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${resolvedTheme === 'dark'
          ? 'bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-600 text-cream-100 focus:ring-gold-400 focus:ring-offset-charcoal-900'
          : 'bg-cream-50 hover:bg-cream-100 border border-cream-200 text-charcoal-700 focus:ring-gold-500 focus:ring-offset-cream-50'
        }
        shadow-lg hover:shadow-xl
      `}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      aria-label={`Switch to next theme mode. Current: ${getThemeLabel()}`}
      title={getThemeLabel()}
    >
      {/* Background glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300
          ${resolvedTheme === 'dark'
            ? 'bg-gradient-to-br from-gold-400/20 to-gold-600/20'
            : 'bg-gradient-to-br from-gold-500/20 to-gold-400/20'
          }
        `}
      />

      {/* Icon container */}
      <div className="relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <m.div
            key={theme}
            variants={iconVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="flex items-center justify-center"
          >
            {getThemeIcon()}
          </m.div>
        </AnimatePresence>
      </div>

      {/* Indicator dot for auto mode */}
      {theme === 'auto' && (
        <m.div
          className={`
            absolute -top-1 -right-1 w-3 h-3 rounded-full border-2
            ${resolvedTheme === 'dark'
              ? 'bg-gold-400 border-charcoal-800'
              : 'bg-gold-500 border-cream-50'
            }
          `}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={prefersReducedMotion 
            ? { duration: 0.2 }
            : { type: 'spring', stiffness: 400, damping: 17, delay: 0.2 }
          }
        />
      )}
    </motion.button>
  );
}