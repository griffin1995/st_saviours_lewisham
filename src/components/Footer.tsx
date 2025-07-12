import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m } from 'framer-motion'
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  HeartIcon,
  CalendarDaysIcon,
  HomeIcon,
  ChevronUpIcon,
  GlobeAltIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/solid'
// Social media icons no longer needed since Stay Connected section removed

// Modern imports
import { useUI, useActions } from '@/stores/churchStore'
import { getLogo } from '@/lib/cms-images'
import { 
  getParishName, 
  getParishDiocese, 
  getContactPhone, 
  getContactEmail
} from '@/lib/cms-content'

interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  const ui = useUI()
  const actions = useActions()

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ui.reducedMotion ? 0.2 : 0.8,
        staggerChildren: ui.reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ui.reducedMotion ? 0.1 : 0.5 }
    }
  }

  const footerSections = [
    {
      title: 'Visit Us',
      icon: MapPinIcon,
      items: [
        { label: 'Mass Times', href: '/mass', icon: CalendarDaysIcon },
        { label: 'Find Us', href: '/find-us', icon: MapPinIcon },
        { label: 'Streaming', href: '/streaming', icon: GlobeAltIcon },
        { label: 'Venue Hire', href: '/venue-hire', icon: BuildingLibraryIcon }
      ]
    },
    {
      title: 'Parish Life',
      icon: HomeIcon,
      items: [
        { label: 'About Us', href: '/about-us', icon: HomeIcon },
        { label: 'The Sacraments', href: '/the-sacraments', icon: HeartIcon },
        { label: 'Parish Groups', href: '/parish-groups', icon: HomeIcon },
        { label: 'News & Events', href: '/news', icon: CalendarDaysIcon }
      ]
    },
    {
      title: 'Support Us',
      icon: HeartIcon,
      items: [
        { label: 'Donate', href: '/donate', icon: HeartIcon },
        { label: 'Gallery', href: '/gallery', icon: HomeIcon },
        { label: 'Podcasts', href: '/podcasts', icon: HomeIcon },
        { label: 'Newsletter', href: '#newsletter', icon: EnvelopeIcon }
      ]
    }
  ]
  return (
    <m.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`relative bg-slate-900 text-white overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Church Information */}
            <m.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-start space-x-4 mb-6">
                <m.div 
                  className="relative w-20 h-20 flex-shrink-0"
                  whileHover={ui.reducedMotion ? {} : { scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={getLogo()}
                    alt="St Saviour's Catholic Church Logo"
                    fill
                    className="object-contain"
                  />
                </m.div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    {getParishName()}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    A vibrant Catholic community in Lewisham, welcoming all to worship, grow, and serve together.
                  </p>
                </div>
              </div>
              
              {/* Contact Quick Access */}
              <div className="space-y-3">
                <m.a
                  href={`tel:${getContactPhone()}`}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                  whileHover={ui.reducedMotion ? {} : { x: 4 }}
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-gold-500/20 transition-colors duration-200">
                    <PhoneIcon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{getContactPhone()}</span>
                </m.a>
                
                <m.a
                  href={`mailto:${getContactEmail()}`}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                  whileHover={ui.reducedMotion ? {} : { x: 4 }}
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-gold-500/20 transition-colors duration-200">
                    <EnvelopeIcon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{getContactEmail()}</span>
                </m.a>
              </div>
            </m.div>

            {/* Footer Navigation Sections */}
            {footerSections.map((section, sectionIndex) => (
              <m.div 
                key={section.title}
                variants={itemVariants}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-gold-500/20 rounded-lg flex items-center justify-center">
                    <section.icon className="h-4 w-4 text-gold-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {section.title}
                  </h4>
                </div>
                
                <nav className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <m.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: ui.reducedMotion ? 0.1 : 0.3,
                        delay: ui.reducedMotion ? 0 : (sectionIndex * 0.1) + (itemIndex * 0.05)
                      }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-200 group"
                      >
                        <m.div 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          whileHover={ui.reducedMotion ? {} : { x: 2 }}
                        >
                          <item.icon className="h-4 w-4 text-gold-400" />
                        </m.div>
                        <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                          {item.label}
                        </span>
                      </Link>
                    </m.div>
                  ))}
                </nav>
              </m.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <m.div 
          variants={itemVariants}
          className="border-t border-white/20"
        />

        {/* Legal & Credits */}
        <m.div variants={itemVariants} className="py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-sm text-gray-400">
            
            {/* Copyright & Charity Info */}
            <div className="text-center lg:text-left">
              <p className="font-medium text-white mb-1">© 2025 {getParishName()}</p>
              <p>Registered Charity No. 233699 | Roman Catholic Archdiocese of {getParishDiocese()}</p>
            </div>
            
            {/* Legal Links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Cookie Policy', href: '/cookie-policy' },
                { label: 'Accessibility', href: '/accessibility-statement' },
                { label: 'Safeguarding', href: '/safeguarding' }
              ].map((link, index) => (
                <React.Fragment key={link.label}>
                  <Link 
                    href={link.href}
                    className="hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </Link>
                  {index < 3 && <span className="text-gray-600 hidden sm:inline">•</span>}
                </React.Fragment>
              ))}
            </nav>
            
            {/* Back to Top Button & Design Credit */}
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* Scroll to Top Button */}
              <m.button
                onClick={scrollToTop}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -1 }}
                whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
              >
                <ChevronUpIcon className="h-4 w-4" />
                <span className="text-xs">Back to Top</span>
              </m.button>
              
              {/* Design Credit */}
              <div className="text-center lg:text-right">
                <p>
                  <span className="text-gray-400">Designed by</span>{' '}
                  <span className="text-white font-medium">Jack Griffin</span>
                </p>
              </div>
            </div>
          </div>
        </m.div>

      </div>
    </m.footer>
  )
}