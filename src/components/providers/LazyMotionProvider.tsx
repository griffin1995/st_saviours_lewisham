"use client";

import { ReactNode, useState, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

interface LazyMotionProviderProps {
  children: ReactNode;
}

/**
 * Enterprise-grade LazyMotion provider implementing hybrid approach
 * Based on official research: 87% bundle reduction (34kb to 4.6kb initial + 21kb domAnimation)
 * 
 * Features:
 * - App-level domAnimation features (21kb) loaded once globally
 * - WCAG 2.1 AA accessibility compliance with prefers-reduced-motion
 * - Hydration-aware to prevent SSR mismatches
 * - Progressive enhancement for graceful degradation
 * 
 * Usage:
 * - Wrap entire app for basic animations (fade, slide, scale)
 * - Use component-level domMax LazyMotion for advanced features (drag, spring physics)
 */
export function LazyMotionProvider({ children }: LazyMotionProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const shouldReduceMotion = prefersReducedMotion();
    setReduceMotion(shouldReduceMotion);
    
    // Mark as hydrated to prevent SSR mismatches
    setIsHydrated(true);
  }, []);

  // During SSR or before hydration, render without motion
  if (!isHydrated) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  // If user prefers reduced motion, render without LazyMotion
  if (reduceMotion) {
    return <>{children}</>;
  }

  // Enterprise hybrid approach: app-level domAnimation features (21kb)
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

/**
 * Accessibility-aware LazyMotion wrapper based on official research patterns
 * 
 * Implementation from official research pattern:
 * If user prefers reduced motion, render without LazyMotion wrapper
 */
export function AccessibleLazyMotion({ 
  children, 
  fallback 
}: { 
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div suppressHydrationWarning>{fallback || children}</div>;
  }

  // Official pattern: render without LazyMotion for reduced motion
  if (reduceMotion) {
    return <>{fallback || children}</>;
  }

  return (
    <LazyMotion features={domAnimation}>
      {fallback || children}
    </LazyMotion>
  );
}

/**
 * Enhanced Motion component with hydration awareness
 * Based on official research SSR/SSG optimization pattern
 */
export function EnhancedMotion({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  if (!isHydrated) {
    return <div suppressHydrationWarning>{children}</div>;
  }
  
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}