import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  HomeIcon
} from '@heroicons/react/24/solid'

// Modern imports
import { useChurchStore, useNavigation, useUI, useActions } from '@/stores/churchStore'
import { navigationMenu } from '@/lib/data'
import { getLogo } from '@/lib/cms-images'
import { getParishName, getParishLocation } from '@/lib/cms-content'

interface NavigationProps {
  className?: string
}

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const navigation = useNavigation()
  const ui = useUI()
  const actions = useActions()

  // Handle escape key for closing dropdowns
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        actions.setActiveDropdown(null)
        actions.setNavigationOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [actions])

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Element
      if (!target.closest('[data-navigation]')) {
        actions.setActiveDropdown(null)
      }
    }

    if (navigation.activeDropdown) {
      document.addEventListener('mousedown', handleOutsideClick)
      return () => document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [navigation.activeDropdown, actions])

  const handleDropdownToggle = (itemName: string) => {
    actions.setActiveDropdown(
      navigation.activeDropdown === itemName ? null : itemName
    )
  }

  const handleMobileMenuToggle = () => {
    actions.setNavigationOpen(!navigation.isOpen)
    // Close dropdown when opening mobile menu
    if (!navigation.isOpen) {
      actions.setActiveDropdown(null)
    }
  }

  const handleLinkClick = () => {
    actions.setNavigationOpen(false)
    actions.setActiveDropdown(null)
  }

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: ui.reducedMotion ? 0.2 : 0.6,
        ease: 'easeOut'
      }
    }
  }

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: ui.reducedMotion ? 0.1 : 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: { 
        duration: ui.reducedMotion ? 0.1 : 0.2
      }
    }
  }

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: ui.reducedMotion ? 0.1 : 0.3
      }
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: ui.reducedMotion ? 0.2 : 0.4,
        ease: 'easeOut'
      }
    }
  }

  const isScrolled = navigation.scrollPosition > 20

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        data-navigation
        className={`
          fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-500
          ${isScrolled || navigation.activeDropdown || navigation.isOpen
            ? 'bg-slate-900/95 backdrop-blur-xl shadow-xl'
            : 'bg-transparent'
          }
          ${className}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 group"
              onClick={handleLinkClick}
            >
              <motion.div 
                className="relative w-16 h-16 flex-shrink-0"
                whileHover={ui.reducedMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={getLogo()}
                  alt="St Saviour's Catholic Church Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-semibold font-serif text-white transition-colors duration-200 group-hover:text-gold-300">
                  {getParishName().replace(' Catholic Church', '')}
                </span>
                <span className="text-xs text-white/90 -mt-1 transition-colors duration-200 group-hover:text-gold-200">
                  Catholic Church, {getParishLocation()}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationMenu.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => actions.setActiveDropdown(item.name)}
                  onMouseLeave={() => actions.setActiveDropdown(null)}
                >
                  <motion.button
                    className={`
                      flex items-center px-4 py-2 text-base font-medium rounded-lg transition-all duration-200
                      ${navigation.activeDropdown === item.name
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white hover:text-white hover:bg-white/10'
                      }
                    `}
                    whileHover={ui.reducedMotion ? {} : { scale: 1.02 }}
                    whileTap={ui.reducedMotion ? {} : { scale: 0.98 }}
                  >
                    {item.name}
                    <motion.div
                      animate={{ 
                        rotate: navigation.activeDropdown === item.name ? 180 : 0 
                      }}
                      transition={{ duration: ui.reducedMotion ? 0.1 : 0.2 }}
                    >
                      <ChevronDownIcon className="ml-1 h-4 w-4" />
                    </motion.div>
                  </motion.button>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 ml-6">
                <motion.button
                  className="p-2 rounded-lg transition-colors duration-200 text-white hover:text-white hover:bg-white/10"
                  whileHover={ui.reducedMotion ? {} : { scale: 1.05 }}
                  whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                  onClick={() => {/* Handle search */}}
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </motion.button>
                
                <Link href="/donate" onClick={handleLinkClick}>
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-900 hover:bg-gray-100 font-semibold rounded-lg transition-colors duration-200 shadow-lg"
                    whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -1 }}
                    whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                  >
                    <HeartIcon className="h-4 w-4" />
                    <span className="hidden xl:inline">Donate</span>
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 text-white hover:bg-white/10"
              whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {navigation.isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: ui.reducedMotion ? 0.1 : 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: ui.reducedMotion ? 0.1 : 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {navigation.isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 shadow-lg overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {navigationMenu.map((item) => (
                  <div key={item.name}>
                    <motion.button
                      onClick={() => handleDropdownToggle(item.name)}
                      className="flex items-center justify-between w-full px-3 py-3 text-white hover:text-white hover:bg-white/10 rounded-lg font-medium text-base transition-colors duration-200"
                      whileTap={ui.reducedMotion ? {} : { scale: 0.98 }}
                    >
                      {item.name}
                      <motion.div
                        animate={{ 
                          rotate: navigation.activeDropdown === item.name ? 180 : 0 
                        }}
                        transition={{ duration: ui.reducedMotion ? 0.1 : 0.2 }}
                      >
                        <ChevronDownIcon className="h-4 w-4" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {navigation.activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: ui.reducedMotion ? 0.1 : 0.3 }}
                          className="ml-4 mt-2 space-y-1 overflow-hidden"
                        >
                          {item.dropdown.map((subItem, index) => (
                            <motion.div
                              key={subItem.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                duration: ui.reducedMotion ? 0.1 : 0.3,
                                delay: ui.reducedMotion ? 0 : index * 0.05
                              }}
                            >
                              <Link
                                href={subItem.href}
                                className="block px-3 py-2 text-base text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                                onClick={handleLinkClick}
                              >
                                {subItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                {/* Mobile Action Buttons */}
                <div className="pt-6 mt-6 border-t border-slate-700/50 space-y-3">
                  <Link
                    href="/donate"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-slate-900 hover:bg-gray-100 font-semibold rounded-lg transition-colors duration-200"
                    onClick={handleLinkClick}
                  >
                    <HeartIcon className="h-5 w-5" />
                    Donate
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Desktop Dropdown Menu */}
      <AnimatePresence>
        {navigation.activeDropdown && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 right-0 bg-slate-900/95 backdrop-blur-xl shadow-xl border-b border-slate-700/50 z-[9998]"
            style={{ top: '80px' }}
            data-navigation
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {navigationMenu
                  .find(item => item.name === navigation.activeDropdown)
                  ?.dropdown.map((subItem, index) => (
                    <motion.div
                      key={subItem.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: ui.reducedMotion ? 0.1 : 0.3,
                        delay: ui.reducedMotion ? 0 : index * 0.05
                      }}
                    >
                      <Link
                        href={subItem.href}
                        className="group relative block rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg border border-transparent hover:border-white/20"
                        onClick={handleLinkClick}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white group-hover:text-gold-300 transition-colors duration-300 relative">
                              {subItem.name}
                              <span className="absolute bottom-0 left-0 h-0.5 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full"></span>
                            </h3>
                            <p className="mt-2 text-base text-white/70 group-hover:text-white/90 transition-colors duration-300">
                              Learn more about {subItem.name.toLowerCase()}
                            </p>
                          </div>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{ x: 0 }}
                            whileHover={{ x: 4 }}
                          >
                            <ChevronDownIcon className="h-5 w-5 text-gold-300 -rotate-90" />
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
              
              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: ui.reducedMotion ? 0.1 : 0.4, delay: 0.2 }}
                className="mt-8 pt-6 border-t border-slate-700/50"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                  <p className="text-sm text-white/70 mb-4">
                    Our parish team is here to support you
                  </p>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-gold-600 to-gold-700 px-6 py-3 text-sm font-medium text-white shadow-lg hover:from-gold-700 hover:to-gold-800 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 transition-all duration-200"
                    onClick={handleLinkClick}
                  >
                    Contact Us
                    <ChevronDownIcon className="ml-2 h-4 w-4 -rotate-90" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop Overlay */}
      <AnimatePresence>
        {(navigation.activeDropdown || navigation.isOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ui.reducedMotion ? 0.1 : 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997]"
            style={{ 
              top: navigation.activeDropdown ? '320px' : '80px'
            }}
            onClick={() => {
              actions.setActiveDropdown(null)
              actions.setNavigationOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation