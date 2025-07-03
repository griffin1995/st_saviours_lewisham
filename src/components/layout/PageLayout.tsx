import React from 'react'
import Head from 'next/head'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  keywords?: string
  className?: string
  /**
   * Override the default white background
   */
  background?: 'white' | 'gray' | 'slate'
  /**
   * Whether to include the site navigation
   */
  includeNavigation?: boolean
  /**
   * Whether to include the site footer
   */
  includeFooter?: boolean
}

/**
 * Modern page layout component with proper SEO and consistent structure
 * 
 * @example
 * <PageLayout 
 *   title="About Us"
 *   description="Learn about our church community"
 * >
 *   <Section>
 *     <Heading>Page content</Heading>
 *   </Section>
 * </PageLayout>
 */
export default function PageLayout({
  children,
  title,
  description = "St Saviour's Catholic Church in Lewisham - A welcoming community of faith serving South East London.",
  keywords = "Catholic Church, Lewisham, Mass Times, Sacraments, Community, Faith, South East London",
  className = "",
  background = 'white',
  includeNavigation = true,
  includeFooter = true
}: PageLayoutProps) {
  // Generate proper page title
  const fullTitle = title === "Home" 
    ? "St Saviour's Catholic Church, Lewisham" 
    : `${title} | St Saviour's Catholic Church`

  // Background classes
  // NOTE: Uses 'bg-white-fixed' instead of 'bg-white' due to Tailwind CSS compilation issue
  // where 'bg-white' was not rendering properly (showed transparent instead of white)
  // See CLAUDE.md "Critical Bug Fixes" section for full details
  const backgroundClasses = {
    white: 'bg-white-fixed', // Custom class in globals.css - ensures reliable white background
    gray: 'bg-gray-50', 
    slate: 'bg-slate-900'
  }


  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="title" content={fullTitle} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="St Saviour's Catholic Church" />
        
        {/* Viewport and responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://saintsaviourslewisham.co.uk${title === "Home" ? "/" : `/${title.toLowerCase().replace(/\s+/g, "-")}`}`} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="St Saviour's Catholic Church" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="https://saintsaviourslewisham.co.uk/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="St Saviour's Catholic Church, Lewisham" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://saintsaviourslewisham.co.uk/images/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://saintsaviourslewisham.co.uk${title === "Home" ? "/" : `/${title.toLowerCase().replace(/\s+/g, "-")}`}`} />
        
        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        
        {/* Structured Data for Church */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ReligiousOrganization",
              "@id": "https://saintsaviourslewisham.co.uk",
              "name": "St Saviour's Catholic Church",
              "alternateName": "St Saviour's Lewisham",
              "description": description,
              "url": "https://saintsaviourslewisham.co.uk",
              "logo": "https://saintsaviourslewisham.co.uk/images/logo.png",
              "image": "https://saintsaviourslewisham.co.uk/images/church-exterior.jpg",
              "telephone": "020 8852 7411",
              "email": "parish@saintsaviours.org.uk",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Brockley Rise",
                "addressLocality": "London",
                "addressRegion": "Greater London",
                "postalCode": "SE23 1NG",
                "addressCountry": "GB"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "51.4558",
                "longitude": "-0.0408"
              },
              "openingHours": [
                "Su 08:00-19:00",
                "Mo 09:00-17:00", 
                "Tu 09:00-17:00",
                "We 09:00-17:00",
                "Th 09:00-17:00",
                "Fr 09:00-17:00",
                "Sa 09:00-18:00"
              ],
              "sameAs": [
                "https://www.facebook.com/stsaviourslewisham",
                "https://www.youtube.com/@stsaviourslewisham"
              ],
              "denomination": "Catholic",
              "parentOrganization": {
                "@type": "ReligiousOrganization",
                "name": "Roman Catholic Archdiocese of Southwark"
              }
            })
          }}
        />
      </Head>
      
      <div 
        data-page-layout 
        className={cn(
          'min-h-screen flex flex-col',
          backgroundClasses[background]
        )}
      >
        {includeNavigation && <Navigation />}
        
        <main className={cn('flex-grow', className)}>
          {children}
        </main>
        
        {includeFooter && <Footer />}
      </div>
    </>
  )
}