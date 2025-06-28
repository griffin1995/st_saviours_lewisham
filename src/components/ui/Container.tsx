import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Container component variants for consistent layout widths
 */
const containerVariants = cva(
  'mx-auto px-4 sm:px-6 lg:px-8',
  {
    variants: {
      size: {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl', 
        xl: 'max-w-8xl',
        full: 'max-w-full'
      }
    },
    
    defaultVariants: {
      size: 'lg'
    }
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

/**
 * Container component for consistent page layout widths
 * 
 * @example
 * <Container size="lg">
 *   <h1>Page content</h1>
 * </Container>
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, className }))}
        {...props}
      />
    )
  }
)

Container.displayName = 'Container'

/**
 * Section component variants for consistent spacing
 */
const sectionVariants = cva(
  'w-full',
  {
    variants: {
      spacing: {
        none: 'py-0',
        xs: 'py-8',
        sm: 'py-12',
        md: 'py-16',
        lg: 'py-24',
        xl: 'py-32'
      },
      
      background: {
        white: 'bg-white',
        gray: 'bg-gray-50',
        slate: 'bg-slate-900',
        transparent: 'bg-transparent'
      }
    },
    
    defaultVariants: {
      spacing: 'lg',
      background: 'white'
    }
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * Container size for the section content
   */
  containerSize?: VariantProps<typeof containerVariants>['size']
}

/**
 * Section component for page sections with consistent spacing
 * 
 * @example
 * <Section spacing="lg" background="white">
 *   <Heading level="h2">Section Title</Heading>
 *   <Text>Section content</Text>
 * </Section>
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    spacing, 
    background, 
    containerSize = 'lg',
    children,
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing, background, className }))}
        {...props}
      >
        <Container size={containerSize}>
          {children}
        </Container>
      </section>
    )
  }
)

Section.displayName = 'Section'

/**
 * Grid component for layout grids
 */
const gridVariants = cva(
  'grid gap-6',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
        6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
      },
      
      gap: {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-12'
      }
    },
    
    defaultVariants: {
      cols: 3,
      gap: 'md'
    }
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

/**
 * Grid component for responsive layouts
 * 
 * @example
 * <Grid cols={3} gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap, className }))}
        {...props}
      />
    )
  }
)

Grid.displayName = 'Grid'

/**
 * Flex component for flexible layouts
 */
const flexVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        col: 'flex-col',
        'row-reverse': 'flex-row-reverse',
        'col-reverse': 'flex-col-reverse'
      },
      
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline'
      },
      
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly'
      },
      
      gap: {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8'
      },
      
      wrap: {
        true: 'flex-wrap',
        false: 'flex-nowrap'
      }
    },
    
    defaultVariants: {
      direction: 'row',
      align: 'center',
      justify: 'start',
      gap: 'md',
      wrap: false
    }
  }
)

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

/**
 * Flex component for flexible layouts
 * 
 * @example
 * <Flex direction="row" align="center" justify="between">
 *   <Text>Left content</Text>
 *   <Button>Right action</Button>
 * </Flex>
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, align, justify, gap, wrap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(flexVariants({ direction, align, justify, gap, wrap, className }))}
        {...props}
      />
    )
  }
)

Flex.displayName = 'Flex'

// Export variants for external use
export { containerVariants, sectionVariants, gridVariants, flexVariants }