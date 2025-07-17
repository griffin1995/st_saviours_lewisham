import React from 'react'
import { motion, m } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  User, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, Heading, Text, Button, Flex, Grid } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'
import { 
  getContactPhone, 
  getContactEmail, 
  getContactAddress,
  getEmergencyPhone,
  getSafeguardingPhone 
} from '@/lib/cms-content'

interface ContactMethod {
  icon: typeof Phone
  title: string
  value: string | string[]
  type?: 'phone' | 'email' | 'address' | 'hours'
  link?: string
}

interface StaffMember {
  name: string
  title: string
  email?: string
  phone?: string
  directEmailPath?: string
}

interface ContactInfoProps {
  /**
   * Primary contact methods (phone, email, address, hours)
   */
  primaryContacts?: ContactMethod[]
  
  /**
   * Emergency contact information
   */
  emergencyContact?: {
    title?: string
    description: string
    phone: string
    additionalInfo?: string
  }
  
  /**
   * Staff contact information
   */
  staff?: StaffMember[]
  
  /**
   * Additional sections
   */
  additionalSections?: Array<{
    title: string
    content: React.ReactNode
    variant?: 'default' | 'info' | 'warning' | 'success'
  }>
  
  /**
   * Layout variant
   */
  layout?: 'vertical' | 'grid'
  
  /**
   * Additional CSS classes
   */
  className?: string
}

const defaultPrimaryContacts: ContactMethod[] = [
  {
    icon: Phone,
    title: 'Call Us',
    value: getContactPhone(),
    type: 'phone',
    link: `tel:${getContactPhone().replace(/\s/g, '')}`
  },
  {
    icon: Mail,
    title: 'Email Us', 
    value: getContactEmail(),
    type: 'email',
    link: `mailto:${getContactEmail()}`
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: [getContactAddress()],
    type: 'address'
  },
  {
    icon: Clock,
    title: 'Office Hours',
    value: ['Mon-Fri', '9:00 AM - 5:00 PM'],
    type: 'hours'
  }
]

/**
 * ContactInfo component for displaying parish contact information
 * 
 * @example
 * <ContactInfo
 *   layout="grid"
 *   emergencyContact={{
 *     description: "For urgent pastoral care outside office hours",
 *     phone: "020 8852 7411"
 *   }}
 * />
 */
export default function ContactInfo({
  primaryContacts = defaultPrimaryContacts,
  emergencyContact,
  staff,
  additionalSections,
  layout = 'vertical',
  className
}: ContactInfoProps) {
  const reducedMotion = prefersReducedMotion()

  const renderContactMethod = (contact: ContactMethod, index: number) => {
    const value = Array.isArray(contact.value) ? contact.value : [contact.value]
    
    return (
      <m.div
        key={index}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0.3 } : { duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="text-center space-y-3"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
          <contact.icon className="h-8 w-8 text-white" />
        </div>
        <Heading level="h3" align="center" className="font-semibold">
          {contact.title}
        </Heading>
        <div className="space-y-1">
          {value.map((line, lineIndex) => (
            <Text 
              key={lineIndex} 
              color="muted" 
              align="center"
              className={contact.link ? 'hover:text-gold-600 transition-colors' : ''}
            >
              {contact.link && lineIndex === 0 ? (
                <a href={contact.link} className="hover:underline">
                  {line}
                </a>
              ) : (
                line
              )}
            </Text>
          ))}
        </div>
      </m.div>
    )
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Primary Contact Methods */}
      {primaryContacts.length > 0 && (
        <m.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
          viewport={{ once: true }}
        >
          {layout === 'grid' ? (
            <Grid cols={4} gap="lg" className="md:grid-cols-2 lg:grid-cols-4">
              {primaryContacts.map((contact, index) => renderContactMethod(contact, index))}
            </Grid>
          ) : (
            <div className="space-y-6">
              {primaryContacts.map((contact, index) => (
                <m.div
                  key={index}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={reducedMotion ? { duration: 0.3 } : { duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <contact.icon className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <Heading level="h3" className="font-semibold mb-1">
                      {contact.title}
                    </Heading>
                    <div className="space-y-1">
                      {(Array.isArray(contact.value) ? contact.value : [contact.value]).map((line, lineIndex) => (
                        <Text key={lineIndex} color="muted">
                          {contact.link && lineIndex === 0 ? (
                            <a href={contact.link} className="hover:text-gold-600 hover:underline transition-colors">
                              {line}
                            </a>
                          ) : (
                            line
                          )}
                        </Text>
                      ))}
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          )}
        </m.div>
      )}

      {/* Emergency Contact */}
      {emergencyContact && (
        <m.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card variant="outlined" padding="lg" className="border-2 border-red-200 bg-red-50">
            <CardContent>
              <div className="space-y-4">
                <Flex align="center" gap="sm">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <Heading level="h3" className="text-red-800 font-semibold">
                    {emergencyContact.title || 'Emergency Contact'}
                  </Heading>
                </Flex>
                
                <Text className="text-red-700">
                  {emergencyContact.description}
                </Text>
                
                <Text weight="bold" className="text-red-800">
                  <a href={`tel:${emergencyContact.phone.replace(/\s/g, '')}`} className="hover:underline">
                    {emergencyContact.phone}
                  </a>
                </Text>
                
                {emergencyContact.additionalInfo && (
                  <Text size="sm" className="text-red-600">
                    {emergencyContact.additionalInfo}
                  </Text>
                )}
              </div>
            </CardContent>
          </Card>
        </m.div>
      )}

      {/* Staff Contact */}
      {staff && staff.length > 0 && (
        <m.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card variant="default" padding="lg" className="bg-slate-900 text-white">
            <CardContent>
              <div className="space-y-6">
                <Heading level="h3" className="text-gold-400 font-semibold">
                  Direct Contact
                </Heading>
                
                <div className="space-y-4">
                  {staff.map((member, index) => (
                    <m.div
                      key={index}
                      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <Text weight="bold" className="text-white">
                        {member.name}
                      </Text>
                      <Text size="sm" className="text-gray-300">
                        {member.title}
                      </Text>
                      
                      <div className="space-y-1">
                        {member.phone && (
                          <Flex align="center" gap="sm">
                            <Phone className="h-3 w-3 text-gold-400" />
                            <Text size="sm" className="text-gray-300">
                              <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="hover:text-gold-300 transition-colors">
                                {member.phone}
                              </a>
                            </Text>
                          </Flex>
                        )}
                        
                        {member.email && (
                          <Flex align="center" gap="sm">
                            <Mail className="h-3 w-3 text-gold-400" />
                            <Text size="sm" className="text-gray-300">
                              <a href={`mailto:${member.email}`} className="hover:text-gold-300 transition-colors">
                                {member.email}
                              </a>
                            </Text>
                          </Flex>
                        )}
                        
                        {member.directEmailPath && (
                          <Text size="sm">
                            <a href={member.directEmailPath} className="text-gold-400 hover:text-gold-300 transition-colors inline-flex items-center gap-1">
                              Send Direct Email
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Text>
                        )}
                      </div>
                    </m.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </m.div>
      )}

      {/* Additional Sections */}
      {additionalSections && additionalSections.map((section, index) => {
        const variantStyles = {
          default: 'bg-white border-gray-200',
          info: 'bg-blue-50 border-blue-200',
          warning: 'bg-yellow-50 border-yellow-200',
          success: 'bg-green-50 border-green-200'
        }
        
        return (
          <m.div
            key={index}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card 
              variant="outlined" 
              padding="lg" 
              className={cn(
                'border',
                variantStyles[section.variant || 'default']
              )}
            >
              <CardContent>
                <div className="space-y-4">
                  <Heading level="h3" className="font-semibold">
                    {section.title}
                  </Heading>
                  {section.content}
                </div>
              </CardContent>
            </Card>
          </m.div>
        )
      })}
    </div>
  )
}