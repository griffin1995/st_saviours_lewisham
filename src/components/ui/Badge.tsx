import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Badge Component
 * 
 * A modern badge component with multiple variants and sizes
 * Built with CVA for consistent styling and excellent TypeScript support
 */

export const badgeVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        primary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        secondary: "bg-gray-100 text-gray-600 hover:bg-gray-200",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        warning: "bg-amber-100 text-amber-800 hover:bg-amber-200",
        error: "bg-red-100 text-red-800 hover:bg-red-200",
        info: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        
        // Color variations
        blue: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        green: "bg-green-100 text-green-800 hover:bg-green-200",
        red: "bg-red-100 text-red-800 hover:bg-red-200",
        amber: "bg-amber-100 text-amber-800 hover:bg-amber-200",
        purple: "bg-purple-100 text-purple-800 hover:bg-purple-200",
        pink: "bg-pink-100 text-pink-800 hover:bg-pink-200",
        indigo: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
        emerald: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
        gray: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        slate: "bg-slate-100 text-slate-800 hover:bg-slate-200",
        
        // Outline variants
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        "outline-primary": "border border-blue-300 text-blue-700 hover:bg-blue-50",
        "outline-success": "border border-green-300 text-green-700 hover:bg-green-50",
        "outline-warning": "border border-amber-300 text-amber-700 hover:bg-amber-50",
        "outline-error": "border border-red-300 text-red-700 hover:bg-red-50",
        
        // Solid variants
        solid: "bg-gray-800 text-white hover:bg-gray-700",
        "solid-primary": "bg-blue-600 text-white hover:bg-blue-700",
        "solid-success": "bg-green-600 text-white hover:bg-green-700",
        "solid-warning": "bg-amber-600 text-white hover:bg-amber-700",
        "solid-error": "bg-red-600 text-white hover:bg-red-700"
      },
      size: {
        xs: "px-2 py-0.5 text-xs",
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-3.5 py-1.5 text-sm",
        xl: "px-4 py-2 text-base"
      },
      interactive: {
        true: "cursor-pointer",
        false: "cursor-default"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false
    }
  }
)

export interface BadgeProps 
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  icon?: React.ReactNode
  onRemove?: () => void
  removable?: boolean
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    interactive, 
    children, 
    icon,
    onRemove,
    removable,
    onClick,
    ...props 
  }, ref) => {
    const isInteractive = Boolean(interactive || onClick || onRemove)

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ 
            variant, 
            size, 
            interactive: isInteractive,
            className 
          })
        )}
        onClick={onClick}
        {...props}
      >
        {icon && (
          <span className="mr-1 flex-shrink-0">
            {icon}
          </span>
        )}
        
        <span className="truncate">
          {children}
        </span>
        
        {(removable || onRemove) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            className="ml-1 flex-shrink-0 hover:bg-black/10 rounded-full p-0.5 transition-colors"
            aria-label="Remove badge"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = "Badge"

// Additional utility components
export const BadgeGroup: React.FC<{
  children: React.ReactNode
  className?: string
  gap?: 'xs' | 'sm' | 'md' | 'lg'
}> = ({ children, className, gap = 'sm' }) => {
  const gapClasses = {
    xs: 'gap-1',
    sm: 'gap-2', 
    md: 'gap-3',
    lg: 'gap-4'
  }

  return (
    <div className={cn('flex flex-wrap items-center', gapClasses[gap], className)}>
      {children}
    </div>
  )
}

export const CountBadge: React.FC<{
  count: number
  max?: number
  variant?: VariantProps<typeof badgeVariants>['variant']
  size?: VariantProps<typeof badgeVariants>['size']
  className?: string
}> = ({ count, max = 99, variant = 'primary', size = 'sm', className }) => {
  const displayCount = count > max ? `${max}+` : count.toString()
  
  return (
    <Badge
      variant={variant}
      size={size}
      className={cn('tabular-nums', className)}
    >
      {displayCount}
    </Badge>
  )
}

export const StatusBadge: React.FC<{
  status: 'online' | 'offline' | 'busy' | 'away'
  showText?: boolean
  size?: VariantProps<typeof badgeVariants>['size']
  className?: string
}> = ({ status, showText = false, size = 'sm', className }) => {
  const statusConfig = {
    online: { variant: 'success' as const, text: 'Online' },
    offline: { variant: 'gray' as const, text: 'Offline' },
    busy: { variant: 'error' as const, text: 'Busy' },
    away: { variant: 'warning' as const, text: 'Away' }
  }

  const config = statusConfig[status]

  return (
    <Badge
      variant={config.variant}
      size={size}
      className={cn('flex items-center', className)}
    >
      <span 
        className={cn(
          'w-2 h-2 rounded-full mr-1',
          {
            'bg-green-500': status === 'online',
            'bg-gray-400': status === 'offline', 
            'bg-red-500': status === 'busy',
            'bg-amber-500': status === 'away'
          }
        )}
      />
      {showText && config.text}
    </Badge>
  )
}

export default Badge