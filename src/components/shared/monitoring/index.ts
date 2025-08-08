/**
 * Shared Monitoring Components Barrel Export
 * Consolidated performance monitoring functionality across all pages
 */

export {
  SharedPerformanceMonitor,
  AppLevelPerformanceMonitor,
  MainPagePerformanceMonitor,
  MediaPagePerformanceMonitor,
  SacramentalPerformanceMonitor,
  PolicyPagePerformanceMonitor,
  type SharedPerformanceMonitorProps,
  type MonitoringPageContext
} from './SharedPerformanceMonitor'

export {
  SharedAccessibilityEnhancer,
  MainPageAccessibilityEnhancer,
  SacramentalAccessibilityEnhancer,
  PolicyPageAccessibilityEnhancer,
  type SharedAccessibilityEnhancerProps,
  type AccessibilityPageContext
} from './SharedAccessibilityEnhancer'

export { default } from './SharedPerformanceMonitor'