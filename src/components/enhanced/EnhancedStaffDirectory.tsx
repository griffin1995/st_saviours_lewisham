import React, { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarDaysIcon,
  UserCircleIcon,
  ClockIcon,
  LanguageIcon,
  HeartIcon,
  BookOpenIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid'

interface StaffMember {
  id: string
  name: string
  title: string
  email: string
  phone?: string
  image?: string
  bio: string
  languages: string[]
  specialties: string[]
  availability: string
  directContact: boolean
  emergencyContact: boolean
}

interface EnhancedStaffDirectoryProps {
  reducedMotion?: boolean
  className?: string
}

const staffData: StaffMember[] = [
  {
    id: '1',
    name: 'Fr. Krzysztof Krzyskow',
    title: 'Parish Priest',
    email: 'fr.krzysztof@saintsaviours.org.uk',
    phone: '020 8852 7411',
    image: '/images/staff/fr-krzysztof.jpg',
    bio: 'Fr. Krzysztof has been serving our parish community for over 8 years. He is passionate about pastoral care, youth ministry, and building bridges between different cultural communities within our parish.',
    languages: ['English', 'Polish', 'Spanish'],
    specialties: ['Pastoral Care', 'Youth Ministry', 'Sacramental Preparation', 'Interfaith Dialogue'],
    availability: 'Monday-Friday: 9:00 AM - 5:00 PM, Saturday: 10:00 AM - 2:00 PM',
    directContact: true,
    emergencyContact: true
  },
  {
    id: '2',
    name: 'Revd. Carlos Lozano',
    title: 'Associate Priest',
    email: 'revd.carlos@saintsaviours.org.uk',
    phone: '020 8852 7411',
    image: '/images/staff/revd-carlos.jpg',
    bio: 'Revd. Carlos brings a wealth of experience in community outreach and social justice ministry. He leads our charitable initiatives and works closely with local organizations to serve those in need.',
    languages: ['English', 'Spanish', 'Portuguese'],
    specialties: ['Community Outreach', 'Social Justice', 'Marriage Preparation', 'Bereavement Support'],
    availability: 'Tuesday-Saturday: 9:00 AM - 4:00 PM',
    directContact: true,
    emergencyContact: true
  },
  {
    id: '3',
    name: 'Mrs. Margaret Thompson',
    title: 'Parish Secretary',
    email: 'office@saintsaviours.org.uk',
    phone: '020 8852 7411',
    image: '/images/staff/margaret-thompson.jpg',
    bio: 'Margaret has been the heart of our parish office for over 15 years. She coordinates all administrative matters and is often the first friendly face visitors encounter.',
    languages: ['English'],
    specialties: ['Administrative Support', 'Event Coordination', 'Visitor Welcome', 'Record Keeping'],
    availability: 'Monday-Friday: 9:00 AM - 5:00 PM',
    directContact: true,
    emergencyContact: false
  },
  {
    id: '4',
    name: 'Mr. James Wilson',
    title: 'Music Director',
    email: 'music@saintsaviours.org.uk',
    phone: '020 8852 7411',
    image: '/images/staff/james-wilson.jpg',
    bio: 'James leads our music ministry and choir, bringing beautiful liturgical music to our celebrations. He also coordinates special musical events and concerts.',
    languages: ['English', 'Latin'],
    specialties: ['Liturgical Music', 'Choir Direction', 'Organ Performance', 'Music Education'],
    availability: 'Wednesday-Sunday: Flexible hours',
    directContact: true,
    emergencyContact: false
  },
  {
    id: '5',
    name: 'Mrs. Sarah O\'Brien',
    title: 'Youth Ministry Coordinator',
    email: 'youth@saintsaviours.org.uk',
    image: '/images/staff/sarah-obrien.jpg',
    bio: 'Sarah coordinates our youth programs and helps young people grow in faith. She organizes retreats, youth groups, and confirmation preparation.',
    languages: ['English', 'Irish'],
    specialties: ['Youth Ministry', 'Confirmation Preparation', 'Retreat Leadership', 'Family Ministry'],
    availability: 'Monday, Wednesday, Friday: 2:00 PM - 8:00 PM',
    directContact: true,
    emergencyContact: false
  }
]

export const EnhancedStaffDirectory: React.FC<EnhancedStaffDirectoryProps> = ({
  reducedMotion = false,
  className = ''
}) => {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleContactClick = (staffMember: StaffMember, method: 'email' | 'phone') => {
    if (method === 'email') {
      window.location.href = `mailto:${staffMember.email}?subject=Inquiry from Parish Website`
    } else {
      window.location.href = `tel:${staffMember.phone?.replace(/\s/g, '')}`
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.5 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: reducedMotion ? 0.2 : 0.4 }
    },
    hover: reducedMotion ? {} : {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  }

  return (
    <m.div
      className={`w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <m.div
        className="text-center mb-12"
        variants={itemVariants}
      >
        <div className="w-16 h-16 bg-gold-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <UserCircleIcon className="h-8 w-8 text-gold-400" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
          Meet Our Parish Team
        </h2>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
          Our dedicated staff are here to serve you and support your spiritual journey. 
          Click on any team member to learn more about their ministry and how to contact them.
        </p>
      </m.div>

      {/* View Mode Toggle */}
      <m.div
        className="flex justify-center mb-8"
        variants={itemVariants}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-gold-500 text-black'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-gold-500 text-black'
                : 'text-white hover:bg-white/10'
            }`}
          >
            List View
          </button>
        </div>
      </m.div>

      {/* Staff Directory */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
        {staffData.map((staff, index) => (
          <m.div
            key={staff.id}
            className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all duration-300 ${
              viewMode === 'list' ? 'flex items-center' : ''
            }`}
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Staff Image */}
            <div className={`${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full h-48'} relative overflow-hidden ${viewMode === 'grid' ? 'rounded-t-2xl' : 'rounded-l-2xl'}`}>
              {staff.image ? (
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gold-700/20 to-gold-800/20 flex items-center justify-center">
                  <UserCircleIcon className="h-16 w-16 text-gold-400" />
                </div>
              )}
              
              {/* Status Indicators */}
              <div className="absolute top-3 right-3 flex gap-2">
                {staff.emergencyContact && (
                  <div className="w-3 h-3 bg-red-500 rounded-full" title="Emergency Contact" />
                )}
                {staff.directContact && (
                  <div className="w-3 h-3 bg-green-500 rounded-full" title="Direct Contact Available" />
                )}
              </div>
            </div>

            {/* Staff Info */}
            <div className="p-6 flex-1">
              <div className="space-y-4">
                {/* Name and Title */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {staff.name}
                  </h3>
                  <p className="text-gold-300 font-medium">
                    {staff.title}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-gray-100 text-sm leading-relaxed">
                  {staff.bio}
                </p>

                {/* Languages */}
                <div className="flex items-center gap-2 flex-wrap">
                  <LanguageIcon className="h-4 w-4 text-blue-400" />
                  <div className="flex gap-1 flex-wrap">
                    {staff.languages.map((lang, langIndex) => (
                      <span
                        key={langIndex}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex items-center gap-2 flex-wrap">
                  <HeartIcon className="h-4 w-4 text-purple-400" />
                  <div className="flex gap-1 flex-wrap">
                    {staff.specialties.slice(0, 2).map((specialty, specIndex) => (
                      <span
                        key={specIndex}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {staff.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        +{staff.specialties.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <ClockIcon className="h-4 w-4 text-green-400" />
                  <span>{staff.availability}</span>
                </div>

                {/* Contact Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleContactClick(staff, 'email')}
                    className="flex-1 bg-gold-600 text-black px-4 py-2 rounded-xl font-medium hover:bg-gold-500 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <EnvelopeIcon className="h-4 w-4" />
                    Email
                  </button>
                  {staff.phone && (
                    <button
                      onClick={() => handleContactClick(staff, 'phone')}
                      className="flex-1 bg-white/10 text-white px-4 py-2 rounded-xl font-medium hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2 border border-white/20"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      Call
                    </button>
                  )}
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => setSelectedStaff(selectedStaff === staff.id ? null : staff.id)}
                  className="w-full bg-white/5 text-white px-4 py-2 rounded-xl font-medium hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {selectedStaff === staff.id ? 'Show Less' : 'Show More'}
                  <m.div
                    animate={{ rotate: selectedStaff === staff.id ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </m.div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedStaff === staff.id && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-white/20 pt-4 space-y-3"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">All Specialties:</h4>
                        <div className="flex gap-1 flex-wrap">
                          {staff.specialties.map((specialty, specIndex) => (
                            <span
                              key={specIndex}
                              className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Contact Information:</h4>
                        <div className="space-y-1 text-sm text-gray-300">
                          <p>📧 {staff.email}</p>
                          {staff.phone && <p>📞 {staff.phone}</p>}
                          <p>🕒 {staff.availability}</p>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </m.div>
        ))}
      </div>

      {/* Emergency Contact Info */}
      <m.div
        className="mt-12 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center"
        variants={itemVariants}
      >
        <h3 className="text-lg font-semibold text-red-300 mb-2">
          Emergency Pastoral Care
        </h3>
        <p className="text-gray-300 mb-4">
          For urgent pastoral care outside office hours (serious illness, death, emergency sacraments):
        </p>
        <a
          href="tel:+442088527411"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-500 transition-colors duration-300"
        >
          Call Emergency Line: 020 8852 7411
        </a>
      </m.div>
    </m.div>
  )
}

export default EnhancedStaffDirectory