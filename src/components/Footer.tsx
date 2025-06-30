import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { getLogo } from "@/lib/cms-images";
import { 
  getParishName, 
  getParishDiocese, 
  getContactPhone, 
  getContactEmail,
  getSocialLinks 
} from "@/lib/cms-content";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row 1: Church Logos */}
        <div className="pt-8 pb-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="text-center flex-1 flex items-center justify-center">
              <div className="relative w-16 h-16 mr-3">
                <Image
                  src={getLogo()}
                  alt="St Saviour's Catholic Church Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-serif font-semibold text-white">
                {getParishName()}
              </h3>
            </div>
            <div className="w-16 h-px bg-white/40 mx-8"></div>
            <div className="text-center flex-1">
              <h4 className="text-lg font-serif font-semibold text-white">
                Roman Catholic Archdiocese of {getParishDiocese()}
              </h4>
            </div>
          </div>
        </div>

        {/* Divider Line 1 */}
        <div className="border-t border-white/30"></div>

        {/* Row 2: Navigation */}
        <div className="py-6">
          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
            <Link 
              href="/about-us" 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              About Us
            </Link>
            <Link 
              href="/mass" 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Mass Times
            </Link>
            <Link 
              href="/the-sacraments" 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Sacraments
            </Link>
            <Link 
              href="/news" 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              News
            </Link>
            <Link 
              href="/parish-groups" 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Groups
            </Link>
            <Link 
              href="/contact-us" 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Contact
            </Link>
            <Link 
              href="/donate" 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Donate
            </Link>
          </nav>
        </div>

        {/* Divider Line 2 */}
        <div className="border-t border-white/30"></div>

        {/* Row 3: Contact Information */}
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Phone */}
            <div className="text-center">
              <h5 className="text-white font-semibold text-sm mb-2">Call Us</h5>
              <p className="text-gray-300 text-sm">{getContactPhone()}</p>
            </div>
            
            {/* Email */}
            <div className="text-center">
              <h5 className="text-white font-semibold text-sm mb-2">Email Us</h5>
              <p className="text-gray-300 text-sm">{getContactEmail()}</p>
            </div>
            
            {/* Social Media */}
            <div className="text-center">
              <h5 className="text-white font-semibold text-sm mb-2">Follow Us</h5>
              <div className="flex justify-center space-x-4">
                {getSocialLinks().map((social) => (
                  <Link 
                    key={social.name}
                    href={social.url} 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name === 'Facebook' && <Facebook className="h-5 w-5" />}
                    {social.name === 'Twitter' && <Twitter className="h-5 w-5" />}
                    {social.name === 'Instagram' && <Instagram className="h-5 w-5" />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line 3 */}
        <div className="border-t border-white/20"></div>

        {/* Row 4: Legal & Credits */}
        <div className="py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p>© 2025 {getParishName()}</p>
              <p>Reg. Charity No. 1234567</p>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Link 
                href="/privacy-policy" 
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                href="/cookie-policy" 
                className="hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                href="/accessibility-statement" 
                className="hover:text-white transition-colors duration-200"
              >
                Accessibility
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                href="/safeguarding" 
                className="hover:text-white transition-colors duration-200"
              >
                Safeguarding
              </Link>
            </div>
            
            {/* Designer Credit */}
            <div className="text-center md:text-right">
              <p>Designed by Jack Griffin</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}