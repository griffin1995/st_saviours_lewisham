import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Card component variants for consistent container styling
 */
const cardVariants = cva(
  // Base styles for all cards
  'bg-white transition-all duration-300',
  {
    variants: {
      // Different visual styles
      variant: {
        // Default: Clean white card with border
        default: [
          'border border-gray-200 shadow-lg',
          'hover:shadow-xl hover:border-gray-300'
        ],
        
        // Elevated: More prominent shadow
        elevated: [
          'shadow-xl border-0',
          'hover:shadow-2xl hover:-translate-y-1'
        ],
        
        // Outlined: Subtle border only
        outlined: [
          'border-2 border-gray-200 shadow-none',
          'hover:border-gray-300 hover:shadow-sm'
        ],
        
        // Glass: Semi-transparent with backdrop blur
        glass: [
          'bg-white/80 backdrop-blur-sm border border-white/20',
          'hover:bg-white/90'
        ]
      },
      
      // Padding options
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6', 
        lg: 'p-8',
        xl: 'p-12'
      },
      
      // Border radius options
      radius: {
        none: 'rounded-none',
        sm: 'rounded-lg',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        full: 'rounded-3xl'
      },
      
      // Interactive states
      interactive: {
        true: 'cursor-pointer',
        false: ''
      }
    },
    
    defaultVariants: {
      variant: 'default',
      padding: 'lg', 
      radius: 'lg',
      interactive: false
    }
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Optional header content
   */
  header?: React.ReactNode
  
  /**
   * Optional footer content
   */
  footer?: React.ReactNode
}

/**
 * Card component for containing content with consistent styling
 * 
 * @example
 * <Card variant="elevated" padding="lg">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    padding, 
    radius, 
    interactive,
    header,
    footer,
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, radius, interactive, className }))}
        {...props}
      >
        {header && (
          <div className="border-b border-gray-200 pb-4 mb-6">
            {header}
          </div>
        )}
        
        <div className={header || footer ? (padding === 'none' ? 'p-0' : '') : ''}>
          {children}
        </div>
        
        {footer && (
          <div className="border-t border-gray-200 pt-4 mt-6">
            {footer}
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'

/**
 * CardHeader component for consistent card header styling
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('space-y-1.5', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

/**
 * CardTitle component for card titles
 */
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-serif font-semibold text-slate-900', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

/**
 * CardDescription component for card descriptions
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-gray-600 leading-relaxed', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

/**
 * CardContent component for main card content
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('space-y-4', className)}
    {...props}
  />
))
CardContent.displayName = 'CardContent'

/**
 * CardFooter component for card actions/footer
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-3', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

// Export variants for external use
export { cardVariants }