/**
 * UI Component Library - Index
 * 
 * Centralized exports for all base UI components
 * Built with modern 2025 best practices using CVA and design tokens
 */

// Base components
export { Button, buttonVariants, type ButtonProps } from './Button'
export { 
  Badge, 
  BadgeGroup, 
  CountBadge, 
  StatusBadge,
  badgeVariants,
  type BadgeProps 
} from './Badge'
export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  cardVariants,
  type CardProps 
} from './Card'

// Typography components
export { 
  Heading, 
  Text, 
  Label, 
  Caption, 
  Lead,
  headingVariants,
  textVariants,
  labelVariants,
  type HeadingProps,
  type TextProps,
  type LabelProps
} from './Typography'

// Layout components
export {
  Container,
  Section, 
  Grid,
  Flex,
  containerVariants,
  sectionVariants,
  gridVariants,
  flexVariants,
  type ContainerProps,
  type SectionProps,
  type GridProps,
  type FlexProps
} from './Container'

// Design tokens and utilities
export { designTokens } from '@/lib/design-tokens'
export { cn, prefersReducedMotion, createAnimationProps } from '@/lib/utils'