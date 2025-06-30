import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { Card, CardContent, Heading, Text, Button, Grid, Section, Container } from '@/components/ui'
import { prefersReducedMotion } from '@/lib/utils'

interface DonationStatsProps {
  /**
   * Annual statistics data
   */
  stats?: Array<{
    amount: string
    title: string
    description: string
  }>
  
  /**
   * Report download handler
   */
  onDownloadReport?: () => void
  
  /**
   * Additional CSS classes
   */
  className?: string
}

const defaultStats = [
  {
    amount: '£45,000',
    title: 'Building Maintenance',
    description: 'Roof repairs, heating system upgrades, and general upkeep'
  },
  {
    amount: '£12,000',
    title: 'Community Programs',
    description: 'Youth activities, adult education, and outreach initiatives'
  },
  {
    amount: '£8,500',
    title: 'Charitable Giving',
    description: 'Food bank support, emergency assistance, and local charities'
  }
]

/**
 * DonationStats component for displaying annual impact
 * 
 * @example
 * <DonationStats 
 *   stats={annualStats}
 *   onDownloadReport={handleDownload}
 * />
 */
export default function DonationStats({
  stats = defaultStats,
  onDownloadReport,
  className
}: DonationStatsProps) {
  const reducedMotion = prefersReducedMotion()

  return (
    <Section spacing="lg" background="slate" className={className}>
      <Container size="lg">
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <Heading level="h2" className="text-3xl font-light mb-6 text-white">
            Your Impact
          </Heading>
          <Text size="xl" className="text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            We are committed to being transparent about how your donations are used. 
            Here's how your generosity made a difference last year:
          </Text>
          
          <Grid cols={3} gap="lg" className="mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="text-4xl font-bold text-gold-400">
                  {stat.amount}
                </div>
                <Heading level="h3" className="text-lg font-semibold text-white">
                  {stat.title}
                </Heading>
                <Text size="sm" className="text-gray-300">
                  {stat.description}
                </Text>
              </motion.div>
            ))}
          </Grid>

          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
              <CardContent>
                <div className="text-center space-y-4">
                  <Heading level="h3" className="text-xl font-semibold text-gold-400">
                    Annual Financial Report
                  </Heading>
                  <Text className="text-gray-300">
                    For full transparency, our annual financial report is available to all parishioners. 
                    See exactly how donations are used and our financial health.
                  </Text>
                  <Button
                    variant="ghost"
                    onClick={onDownloadReport}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="text-gold-400 hover:text-gold-300 hover:bg-white/10"
                  >
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}