/**
 * Mass Statistics with Chart.js
 * Implements 2025 research recommendations for data visualization
 */
import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { m } from 'framer-motion'
import { typographyScale } from '@/lib/fonts'
import { 
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  HeartIcon
} from '@heroicons/react/24/solid'

interface StatCard {
  title: string
  value: string
  change: string
  icon: React.ComponentType<any>
  color: string
}

interface MassStatisticsProps {
  reducedMotion?: boolean
}

export function MassStatistics({ reducedMotion = false }: MassStatisticsProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const [chartInstance, setChartInstance] = useState<any>(null)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const stats: StatCard[] = [
    {
      title: "Weekly Mass Attendance",
      value: "847",
      change: "+12% from last month",
      icon: UserGroupIcon,
      color: "from-blue-600 to-blue-500"
    },
    {
      title: "Daily Mass Average",
      value: "45",
      change: "+8% from last month",
      icon: ClockIcon,
      color: "from-green-600 to-green-500"
    },
    {
      title: "Special Services",
      value: "28",
      change: "This month",
      icon: CalendarDaysIcon,
      color: "from-purple-600 to-purple-500"
    },
    {
      title: "Online Participation",
      value: "234",
      change: "+25% growth",
      icon: ArrowTrendingUpIcon,
      color: "from-gold-600 to-gold-500"
    }
  ]

  // Statistics animation
  const statsSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: reducedMotion ? config.default : config.gentle,
    delay: 200
  })

  // Initialize Chart.js
  useEffect(() => {
    if (!chartRef.current || !inView) return

    const initChart = async () => {
      try {
        const { Chart, registerables } = await import('chart.js')
        Chart.register(...registerables)

        if (chartInstance) {
          chartInstance.destroy()
        }

        const ctx = chartRef.current!.getContext('2d')
        
        const newChart = new Chart(ctx!, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Sunday Mass',
                data: [520, 535, 548, 562, 578, 595, 612, 628, 645, 662, 678, 695],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Weekday Mass',
                data: [180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235],
                borderColor: '#1a365d',
                backgroundColor: 'rgba(26, 54, 93, 0.1)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Online Viewers',
                data: [45, 52, 68, 85, 102, 120, 138, 155, 172, 189, 206, 223],
                borderColor: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                tension: 0.4,
                fill: true
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#ffffff',
                  font: {
                    size: 14
                  }
                }
              },
              title: {
                display: true,
                text: 'Mass Attendance Trends (2024)',
                color: '#ffffff',
                font: {
                  size: 18,
                  weight: 'bold'
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  color: '#ffffff'
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              },
              y: {
                ticks: {
                  color: '#ffffff'
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              }
            },
            interaction: {
              intersect: false,
              mode: 'index'
            },
            animation: {
              duration: reducedMotion ? 0 : 2000,
              easing: 'easeInOutQuart'
            }
          }
        })

        setChartInstance(newChart)
      } catch (error) {
        console.log('Chart.js not available:', error)
      }
    }

    initChart()

    return () => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    }
  }, [inView, reducedMotion])

  return (
    <animated.div ref={ref} style={statsSpring} className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <m.div
          className="w-20 h-20 bg-gold-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <ChartBarIcon className="h-10 w-10 text-gold-400" />
        </m.div>
        
        <h3 className={`${typographyScale.h2} text-white mb-4`}>
          Mass Attendance & Participation
        </h3>
        <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
          Our parish continues to grow with increased participation across all services, 
          both in-person and online, reflecting our vibrant faith community.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <m.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={reducedMotion ? {} : { y: -8, scale: 1.02 }}
            className="group"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-500 transition-all duration-500 rounded-2xl p-6 h-full">
              <div className="space-y-4">
                {/* Icon and Trend */}
                <div className="flex items-center justify-between">
                  <m.div 
                    className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon className="h-7 w-7 text-white" />
                  </m.div>
                  
                  <div className="text-right">
                    <ArrowTrendingUpIcon className="h-5 w-5 text-green-400 inline-block" />
                  </div>
                </div>

                {/* Value */}
                <div>
                  <m.h4 
                    className={`${typographyScale.h1} text-white font-bold mb-1`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </m.h4>
                  <p className={`${typographyScale.body} text-gray-200 mb-2`}>
                    {stat.title}
                  </p>
                  <p className={`${typographyScale.caption} text-green-400 font-medium`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </m.div>
        ))}
      </div>

      {/* Chart Section */}
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-8"
      >
        <div className="h-96 w-full">
          <canvas ref={chartRef} className="w-full h-full"></canvas>
        </div>
      </m.div>

      {/* Additional Insights */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-8"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {/* Peak Attendance */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="h-8 w-8 text-blue-400" />
            </div>
            <h5 className={`${typographyScale.h4} text-white mb-2`}>
              Peak Attendance
            </h5>
            <p className={`${typographyScale.h2} text-blue-400 font-bold mb-2`}>
              Christmas Eve
            </p>
            <p className={`${typographyScale.caption} text-gray-300`}>
              1,247 attendees across all services
            </p>
          </div>

          {/* Most Popular Service */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gold-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="h-8 w-8 text-gold-400" />
            </div>
            <h5 className={`${typographyScale.h4} text-white mb-2`}>
              Most Popular
            </h5>
            <p className={`${typographyScale.h2} text-gold-400 font-bold mb-2`}>
              10:00 AM Sunday
            </p>
            <p className={`${typographyScale.caption} text-gray-300`}>
              Family Mass with 280 avg. attendance
            </p>
          </div>

          {/* Growth Highlight */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="h-8 w-8 text-green-400" />
            </div>
            <h5 className={`${typographyScale.h4} text-white mb-2`}>
              Youth Engagement
            </h5>
            <p className={`${typographyScale.h2} text-green-400 font-bold mb-2`}>
              +45%
            </p>
            <p className={`${typographyScale.caption} text-gray-300`}>
              Increase in young adult participation
            </p>
          </div>
        </div>
      </m.div>
    </animated.div>
  )
}

export default MassStatistics