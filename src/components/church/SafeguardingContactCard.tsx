import React from 'react'
import Link from 'next/link'
import { AlertTriangle, Phone, Mail, Clock } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const safeguardingContactCardVariants = cva(
  'rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border',
  {
    variants: {
      variant: {
        emergency: 'bg-red-600 border-red-700 text-white hover:bg-red-700',
        urgent: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
        parish: 'bg-white border-gray-200 hover:bg-gray-50',
        diocesan: 'bg-slate-50 border-slate-200 hover:bg-slate-100'
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      }
    },
    defaultVariants: {
      variant: 'parish',
      size: 'md'
    }
  }
)

interface SafeguardingContact {
  situation?: string
  role?: string
  name?: string
  contact: string
  description: string
  available?: string
  icon: React.ComponentType<{ className?: string }>
  urgent?: boolean
  email?: string
  office?: string
}

interface SafeguardingContactCardProps extends VariantProps<typeof safeguardingContactCardVariants> {
  contact: SafeguardingContact
  className?: string
}

export function SafeguardingContactCard({ 
  contact, 
  variant, 
  size, 
  className 
}: SafeguardingContactCardProps) {
  const Icon = contact.icon
  const isEmergency = variant === 'emergency'
  const isUrgent = contact.urgent || variant === 'urgent'

  return (
    <div className={cn(safeguardingContactCardVariants({ variant, size }), className)}>
      <div className="flex items-start space-x-4">
        <div className={cn(
          'flex items-center justify-center rounded-full flex-shrink-0',
          isEmergency 
            ? 'w-12 h-12 bg-white/20' 
            : isUrgent 
            ? 'w-12 h-12 bg-amber-100' 
            : 'w-12 h-12 bg-slate-100'
        )}>
          <Icon className={cn(
            'h-6 w-6',
            isEmergency 
              ? 'text-white' 
              : isUrgent 
              ? 'text-amber-600' 
              : 'text-slate-600'
          )} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            {contact.situation && (
              <h3 className={cn(
                'text-lg font-semibold mb-1',
                isEmergency ? 'text-white' : 'text-gray-900'
              )}>
                {contact.situation}
              </h3>
            )}
            {contact.role && (
              <h3 className={cn(
                'text-lg font-semibold mb-1',
                isEmergency ? 'text-white' : 'text-gray-900'
              )}>
                {contact.role}
              </h3>
            )}
            {contact.name && (
              <p className={cn(
                'text-base font-medium',
                isEmergency ? 'text-red-100' : 'text-gray-700'
              )}>
                {contact.name}
              </p>
            )}
          </div>
          
          <p className={cn(
            'text-sm mb-3',
            isEmergency ? 'text-red-100' : 'text-gray-600'
          )}>
            {contact.description}
          </p>
          
          <div className="space-y-2">
            <Link
              href={`tel:${contact.contact.replace(/\s/g, '')}`}
              className={cn(
                'inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200',
                isEmergency 
                  ? 'bg-white text-red-600 hover:bg-red-50' 
                  : isUrgent
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-slate-600 text-white hover:bg-slate-700'
              )}
            >
              <Phone className="h-4 w-4 mr-2" />
              {contact.contact}
            </Link>
            
            {contact.email && (
              <Link
                href={`mailto:${contact.email}`}
                className={cn(
                  'inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ml-2',
                  isEmergency 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                <Mail className="h-3 w-3 mr-1" />
                Email
              </Link>
            )}
          </div>
          
          {contact.available && (
            <div className={cn(
              'flex items-center mt-3 text-xs',
              isEmergency ? 'text-red-200' : 'text-gray-500'
            )}>
              <Clock className="h-3 w-3 mr-1" />
              {contact.available}
            </div>
          )}
          
          {contact.office && (
            <p className={cn(
              'text-xs mt-2',
              isEmergency ? 'text-red-200' : 'text-gray-500'
            )}>
              {contact.office}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}