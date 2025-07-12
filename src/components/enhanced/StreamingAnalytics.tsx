import React, { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { 
  EyeIcon,
  ClockIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TvIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/solid'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface StreamingAnalyticsProps {
  reducedMotion?: boolean
  className?: string
}

interface StreamingStats {
  totalViewers: number
  averageViewTime: number
  peakViewers: number
  totalStreams: number
  growth: number
}

export const StreamingAnalytics: React.FC<StreamingAnalyticsProps> = ({
  reducedMotion = false,
  className = ''
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month')
  const [stats, setStats] = useState<StreamingStats>({
    totalViewers: 1247,
    averageViewTime: 42,
    peakViewers: 89,
    totalStreams: 16,
    growth: 23
  })

  // Sample data for charts
  const viewershipData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Viewers',
        data: [850, 920, 1050, 980, 1150, 1200, 1100, 1280, 1350, 1180, 1320, 1247],
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const streamTypeData = {
    labels: ['Sunday Mass', 'Weekday Mass', 'Evening Prayer', 'Special Events'],
    datasets: [
      {
        data: [45, 25, 15, 15],
        backgroundColor: [
          '#1a365d',
          '#2c5282',
          '#3182ce',
          '#4299e1'
        ],
        borderWidth: 0,
      },
    ],
  }

  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV'],
    datasets: [
      {
        label: 'Viewers by Device',
        data: [420, 380, 180, 267],
        backgroundColor: [
          'rgba(26, 54, 93, 0.8)',
          'rgba(212, 175, 55, 0.8)',
          'rgba(44, 82, 130, 0.8)',
          'rgba(49, 130, 206, 0.8)'
        ],
        borderRadius: 8,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        beginAtZero: true,
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
    cutout: '60%',
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.4 }
    }
  }

  const StatCard: React.FC<{
    icon: React.ElementType
    title: string
    value: string | number
    subtitle: string
    trend?: number
    color: string
  }> = ({ icon: Icon, title, value, subtitle, trend, color }) => (
    <m.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      variants={itemVariants}
      whileHover={!reducedMotion ? { y: -4 } : {}}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <ArrowTrendingUpIcon className="h-4 w-4" />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
    </m.div>
  )

  return (
    <m.div
      className={`space-y-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <m.div
        className="text-center"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-light text-white mb-4">
          Streaming Analytics
        </h2>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
          Insights into our online community engagement and streaming performance
        </p>
      </m.div>

      {/* Period Selector */}
      <m.div
        className="flex justify-center"
        variants={itemVariants}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
          {(['week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedPeriod === period
                  ? 'bg-gold-500 text-black'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </m.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={EyeIcon}
          title="Total Viewers"
          value={stats.totalViewers.toLocaleString()}
          subtitle="This month"
          trend={stats.growth}
          color="bg-blue-600"
        />
        <StatCard
          icon={ClockIcon}
          title="Avg. Watch Time"
          value={`${stats.averageViewTime}m`}
          subtitle="Per session"
          color="bg-green-600"
        />
        <StatCard
          icon={GlobeAltIcon}
          title="Peak Viewers"
          value={stats.peakViewers}
          subtitle="Sunday Mass"
          color="bg-purple-600"
        />
        <StatCard
          icon={CalendarDaysIcon}
          title="Streams This Month"
          value={stats.totalStreams}
          subtitle="Mass & prayer services"
          color="bg-gold-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Viewership Trend */}
        <m.div
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold text-white mb-6">
            Viewership Trend
          </h3>
          <div className="h-64">
            <Line data={viewershipData} options={chartOptions} />
          </div>
        </m.div>

        {/* Stream Types */}
        <m.div
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold text-white mb-6">
            Stream Types
          </h3>
          <div className="h-64">
            <Doughnut data={streamTypeData} options={doughnutOptions} />
          </div>
        </m.div>

        {/* Device Usage */}
        <m.div
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold text-white mb-6">
            Viewing Devices
          </h3>
          <div className="h-64">
            <Bar data={deviceData} options={chartOptions} />
          </div>
        </m.div>

        {/* Community Engagement */}
        <m.div
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold text-white mb-6">
            Community Engagement
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-100">Prayer Requests</span>
              <span className="text-white font-semibold">47</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-100">Chat Messages</span>
              <span className="text-white font-semibold">1,203</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-100">Live Reactions</span>
              <span className="text-white font-semibold">856</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-100">Share Count</span>
              <span className="text-white font-semibold">234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-100">Follow-up Contacts</span>
              <span className="text-white font-semibold">29</span>
            </div>
          </div>
        </m.div>
      </div>

      {/* Quick Actions */}
      <m.div
        className="text-center"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gold-600 text-black px-6 py-3 rounded-xl font-medium hover:bg-gold-500 transition-colors">
            Download Report
          </button>
          <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors border border-white/20">
            View Detailed Analytics
          </button>
        </div>
      </m.div>
    </m.div>
  )
}

export default StreamingAnalytics