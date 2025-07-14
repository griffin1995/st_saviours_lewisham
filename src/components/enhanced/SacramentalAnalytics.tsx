import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  BeakerIcon,
  CalendarDaysIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  HeartIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text } from '@/components/ui'

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

interface SacramentalAnalyticsProps {
  sacramentType: 'baptism' | 'confirmation' | 'eucharist' | 'all'
  className?: string
}

export default function SacramentalAnalytics({ 
  sacramentType = 'baptism', 
  className = '' 
}: SacramentalAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'trends' | 'demographics' | 'preparation'>('trends')
  const [isVisible, setIsVisible] = useState(false)
  const [activeCandidates, setActiveCandidates] = useState(23)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Simulate real-time candidate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCandidates(prev => {
        const change = Math.floor(Math.random() * 4) - 1
        return Math.max(0, prev + change)
      })
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  // Baptism trends over time
  const trendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Infant Baptisms',
        data: [12, 15, 8, 18, 14, 16],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Adult Baptisms',
        data: [3, 5, 4, 2, 6, 4],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        tension: 0.4,
      },
    ],
  }

  // Age demographics for baptisms
  const demographicsData = {
    labels: ['0-1 year', '1-5 years', '6-12 years', '13-17 years', '18-30 years', '30+ years'],
    datasets: [
      {
        label: 'Number of Baptisms',
        data: [45, 12, 8, 15, 18, 12],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Preparation progress data
  const preparationData = {
    labels: ['Registered', 'Course Complete', 'Documents Ready', 'Scheduled', 'Completed'],
    datasets: [
      {
        data: [15, 12, 8, 6, 23],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.2)',
        },
      },
      y: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.2)',
        },
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
          color: '#e2e8f0',
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
      },
    },
  }

  const tabs = [
    {
      id: 'trends',
      label: 'Trends',
      icon: ArrowTrendingUpIcon,
      color: 'text-blue-400',
    },
    {
      id: 'demographics',
      label: 'Demographics',
      icon: UsersIcon,
      color: 'text-green-400',
    },
    {
      id: 'preparation',
      label: 'Preparation',
      icon: BookOpenIcon,
      color: 'text-purple-400',
    },
  ]

  const quickStats = [
    {
      icon: BeakerIcon,
      label: 'This Year',
      value: '87',
      change: '+12%',
      color: 'text-blue-400',
      description: 'Total baptisms'
    },
    {
      icon: CalendarDaysIcon,
      label: 'This Month',
      value: '16',
      change: '+3',
      color: 'text-green-400',
      description: 'Baptisms scheduled'
    },
    {
      icon: UserGroupIcon,
      label: 'In Preparation',
      value: activeCandidates.toString(),
      change: '+2',
      color: 'text-purple-400',
      description: 'Active candidates'
    },
    {
      icon: HeartIcon,
      label: 'Families Served',
      value: '78',
      change: '+8',
      color: 'text-gold-400',
      description: 'New parish families'
    },
  ]

  const upcomingEvents = [
    {
      date: 'Jul 20',
      event: 'Baptism Preparation Course',
      attendees: 8,
      type: 'preparation'
    },
    {
      date: 'Jul 22',
      event: 'Infant Baptism Ceremony',
      attendees: 4,
      type: 'ceremony'
    },
    {
      date: 'Jul 28',
      event: 'Adult Baptism (Easter Vigil prep)',
      attendees: 2,
      type: 'ceremony'
    }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Real-time Active Candidates */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Card variant="default" padding="md" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
          <CardContent>
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-blue-500 rounded-full"
              />
              <Text className="text-white font-semibold">
                {activeCandidates} candidates currently in baptism preparation
              </Text>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card variant="default" padding="md" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white transition-all duration-300">
              <CardContent>
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                    <Text size="xs" className="text-gray-300 font-medium">
                      {stat.label}
                    </Text>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <Text size="lg" className="font-bold text-white">
                      {stat.value}
                    </Text>
                    <Text size="xs" className="text-green-400">
                      {stat.change}
                    </Text>
                  </div>
                  <Text size="xs" className="text-gray-400">
                    {stat.description}
                  </Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Analytics Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600">
          <CardContent>
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Heading level="h3" color="white" className="text-xl font-semibold">
                  Baptism Analytics
                </Heading>
                <motion.div
                  animate={{ rotate: isVisible ? 360 : 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <ChartBarIcon className="h-6 w-6 text-gold-400" />
                </motion.div>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white text-slate-900'
                        : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-slate-900' : tab.color}`} />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Chart Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="h-80"
              >
                {activeTab === 'trends' && (
                  <div className="space-y-4">
                    <Heading level="h4" color="white" className="text-lg">
                      Baptism Trends (6 Months)
                    </Heading>
                    <Line data={trendsData} options={chartOptions} />
                  </div>
                )}
                {activeTab === 'demographics' && (
                  <div className="space-y-4">
                    <Heading level="h4" color="white" className="text-lg">
                      Age Demographics
                    </Heading>
                    <Bar data={demographicsData} options={chartOptions} />
                  </div>
                )}
                {activeTab === 'preparation' && (
                  <div className="space-y-4">
                    <Heading level="h4" color="white" className="text-lg">
                      Preparation Progress
                    </Heading>
                    <Doughnut data={preparationData} options={doughnutOptions} />
                  </div>
                )}
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600">
          <CardContent>
            <div className="space-y-4">
              <Heading level="h4" color="white" className="text-lg font-semibold">
                Upcoming Baptism Events
              </Heading>
              
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        event.type === 'ceremony' ? 'bg-blue-400' : 'bg-green-400'
                      }`} />
                      <div>
                        <Text className="text-white font-medium">{event.event}</Text>
                        <Text size="sm" className="text-gray-400">{event.date}</Text>
                      </div>
                    </div>
                    <div className="text-right">
                      <Text size="sm" className="text-gray-300">
                        {event.attendees} attendees
                      </Text>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="border-t border-slate-600 pt-6"
      >
        <Heading level="h5" color="white" className="text-sm font-semibold mb-4">
          Key Insights
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
              <Text size="sm" className="text-gray-300">
                Infant baptisms remain our primary sacramental activity at 78% of all baptisms
              </Text>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
              <Text size="sm" className="text-gray-300">
                Adult baptism preparation averages 8 months from enrollment to ceremony
              </Text>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
              <Text size="sm" className="text-gray-300">
                Peak baptism season occurs in spring (March-May) with 42% of annual baptisms
              </Text>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-gold-400 rounded-full mt-1.5 flex-shrink-0" />
              <Text size="sm" className="text-gray-300">
                Family participation in preparation courses shows 94% completion rate
              </Text>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}