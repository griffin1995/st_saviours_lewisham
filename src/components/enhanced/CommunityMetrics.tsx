import React, { useRef, useEffect, useState } from 'react'
import { m } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { 
  UserGroupIcon, 
  HeartIcon, 
  AcademicCapIcon, 
  HandRaisedIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  CalendarDaysIcon,
  GlobeAltIcon
} from '@heroicons/react/24/solid'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface CommunityMetricsProps {
  reducedMotion?: boolean
  className?: string
}

export const CommunityMetrics: React.FC<CommunityMetricsProps> = ({
  reducedMotion = false,
  className = ''
}) => {
  const [countUp, setCountUp] = useState({
    members: 0,
    volunteers: 0,
    events: 0,
    outreach: 0
  })
  
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  // Animated counter effect
  useEffect(() => {
    if (!inView) return

    const targets = {
      members: 850,
      volunteers: 120,
      events: 48,
      outreach: 15
    }

    const duration = reducedMotion ? 100 : 2000
    const steps = 60
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCountUp({
        members: Math.floor(targets.members * progress),
        volunteers: Math.floor(targets.volunteers * progress),
        events: Math.floor(targets.events * progress),
        outreach: Math.floor(targets.outreach * progress)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setCountUp(targets)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [inView, reducedMotion])

  // Chart data and options
  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sunday Mass Attendance',
        data: [420, 445, 465, 480, 495, 520],
        backgroundColor: 'rgba(212, 175, 55, 0.8)',
        borderColor: '#d4af37',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  }

  const ministryData = {
    labels: ['Youth Ministry', 'Adult Faith', 'Music Ministry', 'Social Justice', 'Pastoral Care'],
    datasets: [
      {
        data: [25, 30, 20, 15, 35],
        backgroundColor: [
          '#d4af37',
          '#1a365d',
          '#2563eb',
          '#059669',
          '#dc2626'
        ],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  }

  const growthData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'New Members',
        data: [45, 52, 68, 75, 89],
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#d4af37',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#d4af37',
        borderWidth: 1
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
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#ffffff',
          font: {
            size: 12
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#d4af37',
        borderWidth: 1
      }
    }
  }

  const lineOptions = {
    ...chartOptions,
    elements: {
      point: {
        hoverRadius: 8
      }
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.6 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: reducedMotion ? 0.2 : 0.5 }
    },
    hover: reducedMotion ? {} : {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.2 }
    }
  }

  return (
    <m.div
      ref={ref}
      className={`w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <m.div
        variants={itemVariants}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gold-700/20 rounded-2xl flex items-center justify-center">
            <ChartBarIcon className="h-8 w-8 text-gold-400" />
          </div>
        </div>
        <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
          Our Community Impact
        </h2>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
          See how our parish community continues to grow and serve others through faith, fellowship, and outreach.
        </p>
      </m.div>

      {/* Key Statistics */}
      <m.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {[
          { icon: UserGroupIcon, label: 'Parish Members', value: countUp.members, color: 'gold' },
          { icon: HandRaisedIcon, label: 'Active Volunteers', value: countUp.volunteers, color: 'blue' },
          { icon: CalendarDaysIcon, label: 'Annual Events', value: countUp.events, color: 'green' },
          { icon: HeartIcon, label: 'Outreach Programs', value: countUp.outreach, color: 'red' }
        ].map((stat, index) => (
          <m.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
          >
            <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
              stat.color === 'gold' ? 'bg-gold-700/20' :
              stat.color === 'blue' ? 'bg-blue-700/20' :
              stat.color === 'green' ? 'bg-green-700/20' :
              'bg-red-700/20'
            }`}>
              <stat.icon className={`h-6 w-6 ${
                stat.color === 'gold' ? 'text-gold-400' :
                stat.color === 'blue' ? 'text-blue-400' :
                stat.color === 'green' ? 'text-green-400' :
                'text-red-400'
              }`} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">
              {stat.label}
            </div>
          </m.div>
        ))}
      </m.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Attendance Chart */}
        <m.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center mr-4">
              <TrendingUpIcon className="h-5 w-5 text-gold-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Mass Attendance</h3>
              <p className="text-sm text-gray-300">Monthly average attendance</p>
            </div>
          </div>
          <div className="h-64">
            <Bar data={attendanceData} options={chartOptions} />
          </div>
        </m.div>

        {/* Ministry Participation */}
        <m.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center mr-4">
              <UserGroupIcon className="h-5 w-5 text-gold-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Ministry Participation</h3>
              <p className="text-sm text-gray-300">Active volunteers by ministry</p>
            </div>
          </div>
          <div className="h-64">
            <Doughnut data={ministryData} options={doughnutOptions} />
          </div>
        </m.div>
      </div>

      {/* Growth Chart */}
      <m.div
        variants={cardVariants}
        whileHover="hover"
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center mr-4">
            <GlobeAltIcon className="h-5 w-5 text-gold-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Community Growth</h3>
            <p className="text-sm text-gray-300">New members joining our parish family</p>
          </div>
        </div>
        <div className="h-64">
          <Line data={growthData} options={lineOptions} />
        </div>
      </m.div>
    </m.div>
  )
}

export default CommunityMetrics