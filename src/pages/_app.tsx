import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
<<<<<<< Updated upstream
=======
import { SSRProvider } from '@react-aria/ssr';
>>>>>>> Stashed changes

// Providers
import { ThemeProvider } from '@/contexts/ThemeContext';
import { QueryProvider } from '@/providers/QueryProvider';
<<<<<<< Updated upstream
import { LazyMotionProvider } from '@/components/providers/LazyMotionProvider';
import { ErrorBoundary } from '@/components/shared/error';
import { PageErrorFallback } from '@/components/shared/error';
import { createErrorReporter } from '@/lib/error-reporting';

// Typography
import { fontClasses } from '@/lib/fonts';
=======
>>>>>>> Stashed changes

// Stores
import { useChurchStore } from '@/stores/churchStore';

// Styles
import '@/styles/globals.css';

// Performance monitoring
const enablePerformanceMonitoring = process.env.NODE_ENV === 'production';

export default function App({ Component, pageProps }: AppProps) {
  // Initialize app-level effects
  useEffect(() => {
    // Sync data on app start
    const { actions } = useChurchStore.getState();
    actions.syncData();
    
    // Initialize analytics
    if (enablePerformanceMonitoring && typeof window !== 'undefined') {
      // Track page views
      const handleRouteChange = (url: string) => {
        if (window.gtag) {
          window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
            page_path: url,
          });
        }
      };
      
      // Initial page view
      if (window.gtag && window.location.pathname) {
        handleRouteChange(window.location.pathname);
      }
    }

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      const { actions } = useChurchStore.getState();
      if (e.matches) {
        actions.toggleReducedMotion();
      }
    };
    
    mediaQuery.addEventListener('change', handleMotionChange);
    
    // Set initial state
    if (mediaQuery.matches) {
      const { actions } = useChurchStore.getState();
      actions.toggleReducedMotion();
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <>
      <Head>
        {/* Meta Tags */}
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Performance & SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.facebook.com" />
        
        {/* DNS Prefetch for faster loading */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//www.facebook.com" />
        
        {/* Progressive Web App */}
        <meta name="application-name" content="St Saviour's Catholic Church" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="St Saviour's" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Icons */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        
        {/* Analytics */}
        {enablePerformanceMonitoring && process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              "name": "St Saviour's Catholic Church",
              "alternateName": "St Saviour's Lewisham",
              "description": "A vibrant Catholic community in the heart of Lewisham, welcoming all to experience God's love and grace.",
              "url": "https://www.stsaviours-lewisham.org.uk",
              "telephone": "020 8852 7411",
              "email": "parish@saintsaviours.org.uk",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Brockley Rise",
                "addressLocality": "London",
                "postalCode": "SE23 1NG",
                "addressCountry": "GB"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "51.4619",
                "longitude": "-0.0366"
              },
              "openingHours": [
                "Su 08:00-18:30",
                "Mo 07:00-12:30",
                "Tu 07:00-12:30",
                "We 07:00-12:30",
                "Th 07:00-12:30",
                "Fr 07:00-12:30",
                "Sa 09:00-18:30"
              ],
              "sameAs": [
                "https://www.facebook.com/stsaviourslewisham",
                "https://www.youtube.com/@stsaviourslewisham"
              ]
            })
          }}
        />
      </Head>
      
      {/* Provider Stack */}
<<<<<<< Updated upstream
      <ErrorBoundary
        fallback={<PageErrorFallback context="application" />}
        onError={createErrorReporter('app-level')}
      >
        <QueryProvider>
          <ThemeProvider>
            <LazyMotionProvider>
              <div className={fontClasses.all}>
                <Component {...pageProps} />
                
                {/* Performance Monitoring */}
                {enablePerformanceMonitoring && (
                  <>
                    <Analytics />
                    <SpeedInsights />
                  </>
                )}
              </div>
            </LazyMotionProvider>
          </ThemeProvider>
        </QueryProvider>
      </ErrorBoundary>
=======
      <SSRProvider>
        <QueryProvider>
          <ThemeProvider>
            <Component {...pageProps} />
            
            {/* Performance Monitoring */}
            {enablePerformanceMonitoring && (
              <>
                <Analytics />
                <SpeedInsights />
              </>
            )}
          </ThemeProvider>
        </QueryProvider>
      </SSRProvider>
>>>>>>> Stashed changes
    </>
  );
}