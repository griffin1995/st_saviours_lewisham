/**
 * Shared Chart.js Options Provider
 * Centralizes chart configurations used across all analytics components
 * 
 * OFFICIAL PATTERNS USED:
 * - Chart Configuration Structure: Chart.js docs "Define Chart.js Configuration Object Structure"
 * - Options Plugins Structure: Chart.js docs "Configuring Plugin Options in Chart.js"
 * - Tooltip Configuration: Chart.js docs "Chart.js Tooltip Configuration Options Reference"
 * - Legend Configuration: Chart.js docs "Chart.js Legend Configuration Options"
 * - Responsiveness Options: Chart.js docs "Chart.js Configuration Options for Responsiveness"
 * 
 * Based on enterprise consolidation analysis - extracted from:
 * - MassStatistics.tsx
 * - PodcastAnalytics.tsx  
 * - StreamingAnalytics.tsx
 * - LocationAnalytics.tsx
 * - SacramentalAnalytics.tsx
 * - InteractiveStatistics.tsx
 * - CommunityMetrics.tsx
 */

export type ChartType = 'line' | 'bar' | 'doughnut' | 'pie' | 'radar' | 'polarArea'

export interface ChartDataset {
  label: string
  data: number[]
  borderColor: string | string[]
  backgroundColor: string | string[]
  tension?: number
  fill?: boolean
  borderWidth?: number
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ChartConfig {
  type: ChartType
  data: ChartData
  title?: string
  reducedMotion?: boolean
}

/**
 * Standard Chart.js options for dark theme (slate-900 backgrounds)
 * Used across all analytics components
 * 
 * OFFICIAL PATTERN: Chart.js docs "Chart.js Configuration Options for Responsiveness" + "Chart.js Tooltip Configuration Options Reference"
 */
export const createChartOptions = (
  title?: string, 
  reducedMotion = false
) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff',
        font: {
          size: 14,
          family: 'Inter, sans-serif'
        },
        padding: 20,
        usePointStyle: true
      }
    },
    title: title ? {
      display: true,
      text: title,
      color: '#ffffff',
      font: {
        size: 18,
        weight: 'bold' as const,
        family: 'Inter, sans-serif'
      },
      padding: {
        bottom: 30
      }
    } : undefined,
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#d4af37',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      titleFont: {
        size: 14,
        weight: 'bold' as const
      },
      bodyFont: {
        size: 13
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        lineWidth: 1
      },
      border: {
        color: 'rgba(255, 255, 255, 0.2)'
      }
    },
    y: {
      ticks: {
        color: '#ffffff',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        lineWidth: 1
      },
      border: {
        color: 'rgba(255, 255, 255, 0.2)'
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  },
  animation: {
    duration: reducedMotion ? 0 : 2000,
    easing: 'easeInOutQuart' as const
  },
  elements: {
    point: {
      radius: 6,
      hoverRadius: 8,
      borderWidth: 2
    },
    line: {
      borderWidth: 3
    }
  }
})

/**
 * Doughnut/Pie chart specific options
 * 
 * OFFICIAL PATTERN: Chart.js docs "Chart.js Configuration Options for Responsiveness" + cutout property from Chart.js samples
 */
export const createDoughnutOptions = (
  title?: string,
  reducedMotion = false
) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: '#ffffff',
        font: {
          size: 14,
          family: 'Inter, sans-serif'
        },
        padding: 20,
        usePointStyle: true,
        generateLabels: (chart: any) => {
          const data = chart.data
          if (data.labels.length && data.datasets.length) {
            return data.labels.map((label: string, i: number) => ({
              text: label,
              fillStyle: data.datasets[0].backgroundColor[i],
              hidden: false,
              index: i
            }))
          }
          return []
        }
      }
    },
    title: title ? {
      display: true,
      text: title,
      color: '#ffffff',
      font: {
        size: 18,
        weight: 'bold' as const,
        family: 'Inter, sans-serif'
      },
      padding: {
        bottom: 30
      }
    } : undefined,
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#d4af37',
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: (context: any) => {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((context.parsed / total) * 100).toFixed(1)
          return `${context.label}: ${context.parsed} (${percentage}%)`
        }
      }
    }
  },
  animation: {
    duration: reducedMotion ? 0 : 1500,
    easing: 'easeInOutQuart' as const
  },
  cutout: '60%' // For doughnut charts
})

/**
 * Common color palettes for consistency across all charts
 */
export const chartColors = {
  // Primary church colors
  primary: {
    gold: '#d4af37',
    navy: '#1a365d',
    white: '#ffffff'
  },
  
  // Semantic colors for different data types
  attendance: {
    sunday: '#d4af37',
    weekday: '#1a365d', 
    online: '#059669',
    special: '#7c3aed'
  },
  
  // Analytics gradient colors
  gradients: {
    blue: {
      border: '#3b82f6',
      background: 'rgba(59, 130, 246, 0.1)'
    },
    green: {
      border: '#059669',
      background: 'rgba(5, 150, 105, 0.1)'
    },
    gold: {
      border: '#d4af37',
      background: 'rgba(212, 175, 55, 0.1)'
    },
    purple: {
      border: '#7c3aed',
      background: 'rgba(124, 58, 237, 0.1)'
    },
    red: {
      border: '#dc2626',
      background: 'rgba(220, 38, 38, 0.1)'
    }
  },
  
  // Multi-dataset color palette
  palette: [
    '#d4af37', // Gold
    '#1a365d', // Navy  
    '#059669', // Green
    '#7c3aed', // Purple
    '#dc2626', // Red
    '#0891b2', // Cyan
    '#ea580c', // Orange
    '#be185d'  // Pink
  ]
}

/**
 * Helper to create dataset with standard styling
 */
export const createDataset = (
  label: string,
  data: number[],
  colorKey: keyof typeof chartColors.gradients,
  options: Partial<ChartDataset> = {}
): ChartDataset => ({
  label,
  data,
  borderColor: chartColors.gradients[colorKey].border,
  backgroundColor: chartColors.gradients[colorKey].background,
  tension: 0.4,
  fill: true,
  borderWidth: 3,
  ...options
})

/**
 * Helper to initialize Chart.js with common registration
 * 
 * OFFICIAL PATTERN: Chart.js docs "Registering Chart.js Components for Tree-Shaking"
 */
export const initializeChart = async () => {
  try {
    const { Chart, registerables } = await import('chart.js')
    Chart.register(...registerables)
    return Chart
  } catch (error) {
    console.warn('Chart.js not available:', error)
    return null
  }
}

/**
 * Chart cleanup utility
 */
export const destroyChart = (chartInstance: any) => {
  if (chartInstance && typeof chartInstance.destroy === 'function') {
    chartInstance.destroy()
  }
}