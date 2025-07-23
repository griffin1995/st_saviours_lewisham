/**
 * Shared Analytics Components Export
 * Enterprise consolidation - centralizes all analytics patterns
 */

export { 
  AnalyticsDashboard, 
  AnalyticsDashboardWithErrorBoundary,
  createDashboardTab,
  type DashboardTab,
  type AnalyticsDashboardProps
} from './AnalyticsDashboard'

export {
  QuickStatsGrid,
  createAttendanceStat,
  createEngagementStat,
  createGrowthStat,
  createServiceStat,
  type StatCard,
  type QuickStatsGridProps
} from './QuickStatsGrid'

export {
  createChartOptions,
  createDoughnutOptions,
  chartColors,
  createDataset,
  initializeChart,
  destroyChart,
  type ChartType,
  type ChartDataset,
  type ChartData,
  type ChartConfig
} from './ChartOptionsProvider'