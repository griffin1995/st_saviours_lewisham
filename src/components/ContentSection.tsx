import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "navy" | "slate" | "red";
  padding?: "small" | "medium" | "large";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function ContentSection({
  children,
  className = "",
  background = "white",
  padding = "large",
  maxWidth = "lg"
}: ContentSectionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  // Background classes
  // NOTE: Uses 'bg-white-fixed' instead of 'bg-white' due to Tailwind CSS compilation issue
  // where 'bg-white' was not rendering properly (showed transparent instead of white)
  // See CLAUDE.md "Critical Bug Fixes" section for full details
  const backgroundClasses = {
    white: "bg-white-fixed", // Custom class in globals.css - ensures reliable white background
    gray: "bg-white-fixed",  // Also uses fixed class for consistency
    navy: "bg-navy-900 text-white",
    slate: "bg-slate-800 text-white",
    red: "bg-red-600 text-white"
  };

  const paddingClasses = {
    small: "py-12",
    medium: "py-16", 
    large: "py-24"
  };

  const maxWidthClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl", 
    lg: "max-w-7xl",
    xl: "max-w-8xl",
    full: "max-w-full"
  };

  return (
    <section 
      data-content-section
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion 
            ? { duration: 0.3 }
            : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
          }
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}