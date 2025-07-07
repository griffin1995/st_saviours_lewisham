import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cross, Menu, ChevronDown, X, Search, Heart } from "lucide-react";
import { navigationMenu } from "@/lib/data";
import { getLogo } from "@/lib/cms-images";
import { getParishName, getParishLocation } from "@/lib/cms-content";
import ThemeToggle from "./ThemeToggle";

interface NavigationProps {
  navbarHovered?: boolean;
  setNavbarHovered?: (hovered: boolean) => void;
  dropdownOpen?: string | null;
  setDropdownOpen?: (item: string | null) => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
  setSearchOpen?: (open: boolean) => void;
}

export default function Navigation({
  navbarHovered: externalNavbarHovered,
  setNavbarHovered: externalSetNavbarHovered,
  dropdownOpen: externalDropdownOpen,
  setDropdownOpen: externalSetDropdownOpen,
  mobileMenuOpen: externalMobileMenuOpen,
  setMobileMenuOpen: externalSetMobileMenuOpen,
  setSearchOpen: externalSetSearchOpen,
}: NavigationProps = {}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Internal state when no external state is provided
  const [internalNavbarHovered, setInternalNavbarHovered] = useState(false);
  const [internalDropdownOpen, setInternalDropdownOpen] = useState<string | null>(null);
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const navbarHovered = externalNavbarHovered ?? internalNavbarHovered;
  const setNavbarHovered = externalSetNavbarHovered ?? setInternalNavbarHovered;
  const dropdownOpen = externalDropdownOpen ?? internalDropdownOpen;
  const setDropdownOpen = externalSetDropdownOpen ?? setInternalDropdownOpen;
  const mobileMenuOpen = externalMobileMenuOpen ?? internalMobileMenuOpen;
  const setMobileMenuOpen = externalSetMobileMenuOpen ?? setInternalMobileMenuOpen;
  const setSearchOpen = externalSetSearchOpen ?? (() => {});

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

  const handleMouseLeave = () => {
    setNavbarHovered(false);
    setDropdownOpen(null);
  };


  return (
    <>
    <div
      onMouseLeave={handleMouseLeave}
    >
      {/* Professional Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-[9999] ${
          navbarHovered || dropdownOpen || mobileMenuOpen
            ? "bg-slate-900/95 backdrop-blur-xl shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="navbar-container px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 py-2">
            {/* Logo with SVG and Text */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={getLogo()}
                  alt="St Saviour's Catholic Church Logo"
                  fill
                  className="object-contain transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold font-serif text-white transition-colors duration-200 group-hover:text-gold-300">
                  {getParishName().replace(' Catholic Church', '')}
                </span>
                <span className="text-xs text-white/90 -mt-1 transition-colors duration-200 group-hover:text-gold-200">
                  Catholic Church, {getParishLocation()}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigationMenu.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    setDropdownOpen(item.name);
                    setNavbarHovered(true);
                  }}
                >
                  <button
                    className={`flex items-center px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                      dropdownOpen === item.name
                        ? 'bg-white/20 text-white'
                        : 'text-white hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        dropdownOpen === item.name ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                </div>
              ))}

              {/* Search and Donate buttons */}
              <div className="flex items-center space-x-3 ml-4">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-lg transition-colors duration-200 text-white hover:text-white hover:bg-white/10"
                >
                  <Search className="h-5 w-5" />
                </button>
                
                {/* Donate Button */}
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 px-4 py-2 btn-white hover:bg-gray-100 font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <Heart className="h-4 w-4" />
                  <span className="hidden xl:inline">Donate</span>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navigationMenu.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
                    className="flex items-center justify-between w-full px-3 py-2 text-white hover:text-white hover:bg-white/10 rounded-lg font-medium text-base transition-colors duration-200"
                  >
                    {item.name}
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        dropdownOpen === item.name ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {dropdownOpen === item.name && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 text-base text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Donate Button */}
              <div className="pt-4 mt-4 border-t border-slate-700/50">
                <Link
                  href="/donate"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 btn-white hover:bg-gray-100 font-semibold rounded-lg transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  Donate
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Professional Mega Menu Dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed left-0 right-0 bg-slate-900/95 backdrop-blur-xl shadow-xl border-b border-slate-700/50 z-[9998] overflow-hidden"
          style={{ 
            top: '80px',
            animation: 'slideDown 0.3s ease-out forwards',
            transformOrigin: 'top'
          }}
        >
          <div className="navbar-container px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {navigationMenu
                .find(item => item.name === dropdownOpen)
                ?.dropdown.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className="group relative rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-md border border-transparent hover:border-white/20 hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-gold-300 transition-colors duration-300 relative">
                          {subItem.name}
                          <span className="absolute bottom-0 left-0 h-0.5 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </h3>
                        <p className="mt-2 text-base text-white/70 group-hover:text-white/90 transition-colors duration-300">
                          Learn more about {subItem.name.toLowerCase()}
                        </p>
                      </div>
                      <ChevronDown className="h-5 w-5 text-white/50 rotate-[-90deg] group-hover:text-gold-300 group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    </div>
                  </Link>
                ))}
            </div>
            
            {/* Call to action */}
            <div className="mt-8 pt-6 border-t border-navy-700/50">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                <p className="text-sm text-white/70 mb-4">
                  Our parish team is here to support you
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-gold-600 to-gold-700 px-6 py-2 text-sm font-medium text-white shadow-sm hover:from-gold-700 hover:to-gold-800 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Contact Us
                  <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
    
    {/* Backdrop Overlay - Outside hover container */}
    {(navbarHovered || dropdownOpen) && (
      <div 
        className="fixed inset-0 bg-blue-500/30 backdrop-blur-sm z-[9997]"
        style={{ top: dropdownOpen ? '240px' : '80px' }}
      />
    )}
    </>
  );
}