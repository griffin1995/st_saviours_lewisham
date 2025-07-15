/**
 * Interactive Statistics Component with Chart.js and React Spring
 * Implements 2025 research recommendations for engaging data visualization
 */
import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement,
  Tooltip, 
  Legend 
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Motion } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

interface StatisticProps {
  number: string
  label: string
  icon: React.ComponentType<any>
  index: number
  reducedMotion?: boolean
}

interface InteractiveStatisticsProps {
  stats: Array<{
    number: string
    label: string
    icon: React.ComponentType<any>
  }>
  reducedMotion?: boolean
  showCharts?: boolean
}

function AnimatedStatistic({ number, label, icon: Icon, index, reducedMotion }: StatisticProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  // Extract numeric value for animation
  const numericValue = parseInt(number.replace(/\D/g, '')) || 0
  const suffix = number.replace(/\d/g, '')

  // Animated counter with React Spring
  const { value } = useSpring({
    from: { value: 0 },
    to: { value: inView ? numericValue : 0 },
    delay: index * 200,
    config: reducedMotion ? config.default : config.molasses
  })

  // Hover animation
  const [isHovered, setIsHovered] = useState(false)
  const hoverSpring = useSpring({
    transform: isHovered && !reducedMotion ? 'scale(1.05) translateY(-8px)' : 'scale(1) translateY(0px)',
    boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.2)' : '0 10px 20px rgba(0,0,0,0.1)',
    config: config.wobbly
  })

  return (
    <animated.div
      ref={ref}
      style={hoverSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-center group cursor-pointer"
    >
      <m.div 
        className="w-16 h-16 icon-container-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
        whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="h-8 w-8 icon-theme-dark" />
      </m.div>
      
      <div className={`${typographyScale.h3} text-white mb-2`}>
        <animated.span>
          {value.to(v => Math.floor(v).toLocaleString())}
        </animated.span>
        {suffix}
      </div>
      
      <div className={`${typographyScale.body} text-gray-100 font-medium`}>
        {label}
      </div>
    </animated.div>
  )
}

function StatisticsChart({ stats }: { stats: Array<{ number: string, label: string }> }) {
  const chartData = {
    labels: stats.map(stat => stat.label),
    datasets: [
      {
        data: stats.map(stat => parseInt(stat.number.replace(/\D/g, '')) || 0),
        backgroundColor: [
          '#d4af37', // Gold
          '#1a365d', // Navy
          '#d4af37', // Gold
          '#1a365d', // Navy
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBackgroundColor: [
          '#f1c40f',
          '#2d4a87',
          '#f1c40f', 
          '#2d4a87',
        ]
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
            family: 'Source Sans 3'
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 54, 93, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#d4af37',
        borderWidth: 1
      }
    }
  }

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="mt-12"
    >
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <h3 className={`${typographyScale.h3} text-white text-center mb-6`}>
          Parish Statistics Overview
        </h3>
        <div className="h-64">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </m.div>
  )
}

export function InteractiveStatistics({ stats, reducedMotion = false, showCharts = true }: InteractiveStatisticsProps) {
  return (
    <div className="space-y-8">
      {/* Animated Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <AnimatedStatistic
            key={index}
            {...stat}
            index={index}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {/* Optional Chart Visualization */}
      {showCharts && <StatisticsChart stats={stats} />}
    </div>
  )
}

export default InteractiveStatistics