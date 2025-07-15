/**
 * Interactive Staff Directory Component
 * Implements 2025 research recommendations for staff presentation
 */
import React, { useState } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { Motion } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import { 
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  CalendarDaysIcon,
  ClockIcon,
  LanguageIcon,
  AcademicCapIcon,
  HeartIcon,
  BookOpenIcon,
  SparklesIcon
} from '@heroicons/react/24/solid'

interface StaffMember {
  id: string
  name: string
  title: string
  role: string
  image: string
  bio: string
  email: string
  phone?: string
  languages: string[]
  specialties: string[]
  officeHours: string[]
  availability: 'available' | 'busy' | 'unavailable'
  education: string[]
  ordination?: string
  previousAssignments?: string[]
}

interface InteractiveStaffDirectoryProps {
  reducedMotion?: boolean
}

export function InteractiveStaffDirectory({ reducedMotion = false }: InteractiveStaffDirectoryProps) {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)
  const [filterRole, setFilterRole] = useState<string>('all')
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Enhanced staff data
  const staffMembers: StaffMember[] = [
    {
      id: 'fr-krzysztof',
      name: 'Fr. Krzysztof Krzyskow',
      title: 'Parish Priest',
      role: 'clergy',
      image: '/images/fr_krzysztof_krzyskow_parish_priest_st_saviours.jpeg',
      bio: 'Fr. Krzysztof has been serving the Catholic Church for over 15 years, bringing deep pastoral experience and a heart for community building. He is passionate about youth ministry and interfaith dialogue.',
      email: 'fr.krzysztof@saintsaviours.org.uk',
      phone: '020 8852 7411 ext. 101',
      languages: ['English', 'Polish', 'Spanish'],
      specialties: ['Pastoral Care', 'Youth Ministry', 'Interfaith Dialogue', 'Marriage Preparation'],
      officeHours: ['Monday: 9:00 AM - 5:00 PM', 'Tuesday: 9:00 AM - 5:00 PM', 'Wednesday: 9:00 AM - 12:00 PM', 'Thursday: 9:00 AM - 5:00 PM', 'Friday: 9:00 AM - 3:00 PM'],
      availability: 'available',
      education: ['Master of Divinity - St. Mary\'s Seminary', 'Bachelor of Philosophy - Catholic University'],
      ordination: 'Ordained to the priesthood in 2009',
      previousAssignments: ['St. Michael\'s Parish, Birmingham (2009-2015)', 'St. Joseph\'s Parish, Manchester (2015-2020)']
    },
    {
      id: 'fr-kenneth',
      name: 'Fr. Kenneth Iwunna',
      title: 'Assistant Priest',
      role: 'clergy',
      image: '/images/fr_kenneth_iwunna_assistant_priest_st_saviours.jpeg',
      bio: 'Fr. Kenneth brings energy and dedication to our parish ministries, with particular expertise in community outreach and sacramental preparation. He is fluent in multiple languages and passionate about serving our diverse community.',
      email: 'fr.kenneth@saintsaviours.org.uk',
      phone: '020 8852 7411 ext. 102',
      languages: ['English', 'Portuguese', 'French', 'Igbo'],
      specialties: ['Community Outreach', 'Sacramental Preparation', 'Hospital Ministry', 'Adult Education'],
      officeHours: ['Monday: 10:00 AM - 4:00 PM', 'Tuesday: 9:00 AM - 5:00 PM', 'Wednesday: 2:00 PM - 7:00 PM', 'Thursday: 9:00 AM - 5:00 PM', 'Friday: 9:00 AM - 2:00 PM'],
      availability: 'available',
      education: ['Master of Theology - Pontifical University', 'Bachelor of Sacred Scripture - Vatican Seminary'],
      ordination: 'Ordained to the priesthood in 2018',
      previousAssignments: ['Seminary Formation (2018-2021)', 'St. Peter\'s Parish, London (2021-2023)']
    },
    {
      id: 'mary-rodriguez',
      name: 'Mary Rodriguez',
      title: 'Parish Administrator',
      role: 'staff',
      image: '/images/placeholder-staff-female.jpg',
      bio: 'Mary coordinates all parish operations with exceptional organizational skills and a warm, welcoming approach. She has been serving our parish community for over 8 years.',
      email: 'mary.rodriguez@saintsaviours.org.uk',
      phone: '020 8852 7411 ext. 103',
      languages: ['English', 'Spanish'],
      specialties: ['Parish Administration', 'Event Coordination', 'Financial Management', 'Volunteer Coordination'],
      officeHours: ['Monday-Friday: 9:00 AM - 5:00 PM'],
      availability: 'available',
      education: ['Bachelor of Business Administration', 'Certificate in Non-Profit Management']
    },
    {
      id: 'david-thompson',
      name: 'David Thompson',
      title: 'Director of Music & Liturgy',
      role: 'staff',
      image: '/images/placeholder-staff-male.jpg',
      bio: 'David leads our music ministry with professional expertise and deep liturgical knowledge. He coordinates all musical aspects of our worship and special celebrations.',
      email: 'david.thompson@saintsaviours.org.uk',
      languages: ['English'],
      specialties: ['Liturgical Music', 'Choir Direction', 'Organ Performance', 'Wedding Music'],
      officeHours: ['Tuesday: 10:00 AM - 6:00 PM', 'Wednesday: 10:00 AM - 6:00 PM', 'Thursday: 10:00 AM - 6:00 PM', 'Sunday: 7:00 AM - 1:00 PM'],
      availability: 'busy',
      education: ['Master of Music - Royal College of Music', 'Certificate in Sacred Music']
    },
    {
      id: 'sarah-williams',
      name: 'Sarah Williams',
      title: 'Youth Ministry Coordinator',
      role: 'staff',
      image: '/images/placeholder-staff-female.jpg',
      bio: 'Sarah coordinates all youth programs and activities, bringing creativity and enthusiasm to engage young people in their faith journey.',
      email: 'sarah.williams@saintsaviours.org.uk',
      languages: ['English'],
      specialties: ['Youth Ministry', 'Confirmation Preparation', 'Young Adult Programs', 'Retreats'],
      officeHours: ['Wednesday: 2:00 PM - 8:00 PM', 'Thursday: 2:00 PM - 8:00 PM', 'Friday: 2:00 PM - 6:00 PM', 'Sunday: 9:00 AM - 2:00 PM'],
      availability: 'available',
      education: ['Bachelor of Theology', 'Certificate in Youth Ministry']
    }
  ]

  const filteredStaff = filterRole === 'all' 
    ? staffMembers 
    : staffMembers.filter(member => member.role === filterRole)

  // Directory animation
  const directorySpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: reducedMotion ? config.default : config.gentle,
    delay: 200
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-yellow-100 text-yellow-800'
      case 'unavailable': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available'
      case 'busy': return 'Busy'
      case 'unavailable': return 'Unavailable'
      default: return 'Unknown'
    }
  }

  return (
    <animated.div ref={ref} style={directorySpring} className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className={`${typographyScale.h2} text-slate-900 mb-4`}>
          Our Parish Team
        </h3>
        <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
          Meet the dedicated clergy and staff who serve our parish community with love, 
          expertise, and pastoral care. Each team member brings unique gifts and experience.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4">
        {[
          { key: 'all', label: 'All Staff', icon: UserIcon },
          { key: 'clergy', label: 'Clergy', icon: BookOpenIcon },
          { key: 'staff', label: 'Parish Staff', icon: HeartIcon }
        ].map((filter) => (
          <Motion.button
            key={filter.key}
            onClick={() => setFilterRole(filter.key)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
              ${filterRole === filter.key 
                ? 'bg-gold-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gold-300'
              }
            `}
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.95 }}
          >
            <filter.icon className="h-5 w-5" />
            {filter.label}
          </Motion.button>
        ))}
      </div>

      {/* Staff Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member, index) => (
          <m.div
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={reducedMotion ? {} : { y: -8, scale: 1.02 }}
            className="group cursor-pointer"
            onClick={() => setSelectedStaff(member)}
          >
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gold-300 hover:shadow-xl transition-all duration-300">
              {/* Photo and Availability */}
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gray-300 rounded-2xl mx-auto overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-staff.jpg'
                    }}
                  />
                </div>
                {member.availability && (
                  <div className={`
                    absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium
                    ${getAvailabilityColor(member.availability)}
                  `}>
                    {getAvailabilityText(member.availability)}
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="text-center mb-4">
                <h4 className={`${typographyScale.h4} text-slate-900 mb-1 group-hover:text-gold-600 transition-colors duration-300`}>
                  {member.name}
                </h4>
                <p className={`${typographyScale.body} text-gold-600 font-medium mb-2`}>
                  {member.title}
                </p>
                <p className={`${typographyScale.caption} text-gray-600 line-clamp-2`}>
                  {member.bio}
                </p>
              </div>

              {/* Quick Contact */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                  <span className={`${typographyScale.caption} text-gray-600 truncate`}>
                    {member.email}
                  </span>
                </div>
                {member.phone && (
                  <div className="flex items-center justify-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                    <span className={`${typographyScale.caption} text-gray-600`}>
                      {member.phone}
                    </span>
                  </div>
                )}
              </div>

              {/* Languages */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <LanguageIcon className="h-4 w-4 text-gray-400" />
                  <span className={`${typographyScale.caption} text-gray-500 font-medium`}>
                    Languages
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.languages.slice(0, 3).map((language) => (
                    <span
                      key={language}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                    >
                      {language}
                    </span>
                  ))}
                  {member.languages.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      +{member.languages.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Click to View More */}
              <div className="mt-4 text-center">
                <span className={`${typographyScale.caption} text-gold-600 font-medium group-hover:underline`}>
                  Click to view full profile →
                </span>
              </div>
            </div>
          </m.div>
        ))}
      </div>

      {/* Detailed Staff Modal */}
      {selectedStaff && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedStaff(null)}
        >
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column - Photo and Basic Info */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-2xl mx-auto mb-4 overflow-hidden">
                  <img
                    src={selectedStaff.image}
                    alt={selectedStaff.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-staff.jpg'
                    }}
                  />
                </div>
                <h3 className={`${typographyScale.h3} text-slate-900 mb-2`}>
                  {selectedStaff.name}
                </h3>
                <p className={`${typographyScale.body} text-gold-600 font-medium mb-4`}>
                  {selectedStaff.title}
                </p>
                
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-6 ${getAvailabilityColor(selectedStaff.availability)}`}>
                  {getAvailabilityText(selectedStaff.availability)}
                </div>

                {/* Contact Information */}
                <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                  <h4 className={`${typographyScale.h5} text-slate-900 mb-3`}>Contact</h4>
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <a 
                      href={`mailto:${selectedStaff.email}`}
                      className={`${typographyScale.caption} text-gray-600 hover:text-gold-600 transition-colors`}
                    >
                      {selectedStaff.email}
                    </a>
                  </div>
                  {selectedStaff.phone && (
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <a 
                        href={`tel:${selectedStaff.phone.replace(/\s/g, '')}`}
                        className={`${typographyScale.caption} text-gray-600 hover:text-gold-600 transition-colors`}
                      >
                        {selectedStaff.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Detailed Information */}
              <div className="md:col-span-2 space-y-6">
                {/* Biography */}
                <div>
                  <h4 className={`${typographyScale.h4} text-slate-900 mb-3`}>About</h4>
                  <p className={`${typographyScale.body} text-gray-700 leading-relaxed`}>
                    {selectedStaff.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <SparklesIcon className="h-5 w-5 text-gold-600" />
                    <h4 className={`${typographyScale.h5} text-slate-900`}>Specialties</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedStaff.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <LanguageIcon className="h-5 w-5 text-blue-600" />
                    <h4 className={`${typographyScale.h5} text-slate-900`}>Languages</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedStaff.languages.map((language) => (
                      <span
                        key={language}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Office Hours */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ClockIcon className="h-5 w-5 text-green-600" />
                    <h4 className={`${typographyScale.h5} text-slate-900`}>Office Hours</h4>
                  </div>
                  <div className="space-y-1">
                    {selectedStaff.officeHours.map((hours, index) => (
                      <p key={index} className={`${typographyScale.caption} text-gray-700`}>
                        {hours}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Education (for clergy) */}
                {selectedStaff.education && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AcademicCapIcon className="h-5 w-5 text-purple-600" />
                      <h4 className={`${typographyScale.h5} text-slate-900`}>Education</h4>
                    </div>
                    <div className="space-y-1">
                      {selectedStaff.education.map((edu, index) => (
                        <p key={index} className={`${typographyScale.caption} text-gray-700`}>
                          {edu}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ordination (for priests) */}
                {selectedStaff.ordination && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarDaysIcon className="h-5 w-5 text-gold-600" />
                      <h4 className={`${typographyScale.h5} text-slate-900`}>Ordination</h4>
                    </div>
                    <p className={`${typographyScale.caption} text-gray-700`}>
                      {selectedStaff.ordination}
                    </p>
                  </div>
                )}

                {/* Previous Assignments (for clergy) */}
                {selectedStaff.previousAssignments && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpenIcon className="h-5 w-5 text-indigo-600" />
                      <h4 className={`${typographyScale.h5} text-slate-900`}>Previous Assignments</h4>
                    </div>
                    <div className="space-y-1">
                      {selectedStaff.previousAssignments.map((assignment, index) => (
                        <p key={index} className={`${typographyScale.caption} text-gray-700`}>
                          {assignment}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedStaff(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              ×
            </button>
          </m.div>
        </m.div>
      )}
    </animated.div>
  )
}

export default InteractiveStaffDirectory