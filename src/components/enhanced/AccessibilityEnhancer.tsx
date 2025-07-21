import React, { useState, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { 
  EyeIcon,
  EyeSlashIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  AdjustmentsHorizontalIcon,
  DocumentTextIcon,
  KeyboardIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/utils'

// CVA for accessibility features following 2025 standards
const featureVariants = cva(
  'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
  {
    variants: {
      status: {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-600',
        warning: 'bg-orange-100 text-orange-800',
        error: 'bg-red-100 text-red-800'
      }
    },
    defaultVariants: {
      status: 'inactive'
    }
  }
)

interface AccessibilitySettings {
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  screenReaderMode: boolean
  keyboardNavigation: boolean
  focusIndicators: boolean
  audioDescriptions: boolean
  subtitles: boolean
  fontSize: number // percentage: 100, 125, 150, 175, 200
  lineHeight: number // multiplier: 1.4, 1.6, 1.8, 2.0
  letterSpacing: number // em: 0, 0.05, 0.1, 0.15
}

interface AccessibilityTest {
  id: string
  category: 'visual' | 'motor' | 'cognitive' | 'hearing'
  title: string
  description: string
  wcagLevel: 'A' | 'AA' | 'AAA'
  status: 'pass' | 'fail' | 'warning' | 'untested'
  details?: string
}

interface AccessibilityEnhancerProps {
  showToolbar?: boolean
  showTests?: boolean
  showKeyboardHelp?: boolean
  autoSaveSettings?: boolean
  reducedMotion?: boolean
  className?: string
}

// Mock accessibility test data
const accessibilityTests: AccessibilityTest[] = [
  {
    id: 'contrast-ratio',
    category: 'visual',
    title: 'Color Contrast Ratio',
    description: 'Text has sufficient contrast against background colors',
    wcagLevel: 'AA',
    status: 'pass',
    details: 'All text meets WCAG AA contrast ratio of 4.5:1'
  },
  {
    id: 'keyboard-navigation',
    category: 'motor',
    title: 'Keyboard Navigation',
    description: 'All interactive elements accessible via keyboard',
    wcagLevel: 'A',
    status: 'pass',
    details: 'Tab order is logical, all buttons and links focusable'
  },
  {
    id: 'alt-text',
    category: 'visual',
    title: 'Image Alt Text',
    description: 'All images have descriptive alternative text',
    wcagLevel: 'A',
    status: 'warning',
    details: '2 decorative images missing empty alt attributes'
  },
  {
    id: 'focus-indicators',
    category: 'motor',
    title: 'Focus Indicators',
    description: 'Visible focus indicators for all interactive elements',
    wcagLevel: 'AA',
    status: 'pass',
    details: 'Custom focus rings with 2px gold outline'
  },
  {
    id: 'headings-structure',
    category: 'cognitive',
    title: 'Heading Structure',
    description: 'Proper heading hierarchy and semantic structure',
    wcagLevel: 'A',
    status: 'pass',
    details: 'Logical H1-H6 structure maintained throughout page'
  },
  {
    id: 'motion-preferences',
    category: 'visual',
    title: 'Reduced Motion Support',
    description: 'Respects user motion preferences',
    wcagLevel: 'AAA',
    status: 'pass',
    details: 'All animations disabled when prefers-reduced-motion is set'
  }
]

// Keyboard shortcuts help data
const keyboardShortcuts = [
  { keys: ['Tab'], description: 'Navigate forward through interactive elements' },
  { keys: ['Shift', 'Tab'], description: 'Navigate backward through interactive elements' },
  { keys: ['Enter'], description: 'Activate buttons and links' },
  { keys: ['Space'], description: 'Activate buttons and checkboxes' },
  { keys: ['Escape'], description: 'Close modals and dropdown menus' },
  { keys: ['Arrow Keys'], description: 'Navigate menu items and carousel slides' },
  { keys: ['Home'], description: 'Jump to beginning of content' },
  { keys: ['End'], description: 'Jump to end of content' },
  { keys: ['Alt', 'A'], description: 'Open accessibility settings' },
  { keys: ['Alt', 'K'], description: 'Show keyboard navigation help' },
  { keys: ['Alt', 'H'], description: 'Navigate to main heading' },
  { keys: ['Alt', 'M'], description: 'Navigate to main content' }
]

export const AccessibilityEnhancer: React.FC<AccessibilityEnhancerProps> = ({
  showToolbar = true,
  showTests = true,
  showKeyboardHelp = true,
  autoSaveSettings = true,
  reducedMotion = false,
  className = ''
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReaderMode: false,
    keyboardNavigation: true,
    focusIndicators: true,
    audioDescriptions: false,
    subtitles: false,
    fontSize: 100,
    lineHeight: 1.6,
    letterSpacing: 0
  })

  const [activeTests, setActiveTests] = useState(accessibilityTests)
  const [showSettings, setShowSettings] = useState(false)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [isRunningTests, setIsRunningTests] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setSettings(prev => ({ ...prev, reducedMotion: mediaQuery.matches }))
      // reducedMotion prop takes precedence
    }
  }, [])

  // Load saved settings
  useEffect(() => {
    if (typeof window !== 'undefined' && autoSaveSettings) {
      const savedSettings = localStorage.getItem('accessibility-settings')
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings)
          setSettings(parsed)
          applySettings(parsed)
        } catch (error) {
          console.error('Error loading accessibility settings:', error)
        }
      }
    }
  }, [autoSaveSettings])

  // Save settings when changed
  useEffect(() => {
    if (typeof window !== 'undefined' && autoSaveSettings) {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings))
      applySettings(settings)
    }
  }, [settings, autoSaveSettings])

  // Apply settings to document
  const applySettings = useCallback((newSettings: AccessibilitySettings) => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // High contrast mode
    if (newSettings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Large text mode
    if (newSettings.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }

    // Font size
    root.style.setProperty('--font-size-multiplier', `${newSettings.fontSize}%`)

    // Line height
    root.style.setProperty('--line-height', newSettings.lineHeight.toString())

    // Letter spacing
    root.style.setProperty('--letter-spacing', `${newSettings.letterSpacing}em`)

    // Focus indicators
    if (newSettings.focusIndicators) {
      root.classList.add('enhanced-focus')
    } else {
      root.classList.remove('enhanced-focus')
    }
  }, [])

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const runAccessibilityTests = async () => {
    setIsRunningTests(true)
    
    // Simulate running accessibility tests
    for (let i = 0; i < activeTests.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setActiveTests(prev => prev.map((test, index) => {
        if (index === i) {
          // Simulate test results
          const randomResult = Math.random()
          return {
            ...test,
            status: randomResult > 0.8 ? 'fail' : randomResult > 0.6 ? 'warning' : 'pass'
          }
        }
        return test
      }))
    }
    
    setIsRunningTests(false)
  }

  const getTestStatusIcon = (status: AccessibilityTest['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />
      case 'fail':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-4 w-4 text-orange-600" />
      default:
        return <InformationCircleIcon className="h-4 w-4 text-gray-400" />
    }
  }

  const getCategoryIcon = (category: AccessibilityTest['category']) => {
    switch (category) {
      case 'visual':
        return <EyeIcon className="h-4 w-4" />
      case 'motor':
        return <KeyboardIcon className="h-4 w-4" />
      case 'cognitive':
        return <DocumentTextIcon className="h-4 w-4" />
      case 'hearing':
        return <SpeakerWaveIcon className="h-4 w-4" />
      default:
        return <InformationCircleIcon className="h-4 w-4" />
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.3 }
    }
  }

  return (
    <m.div
      className={cn('bg-white rounded-3xl shadow-xl overflow-hidden', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <m.div
        className="p-8 border-b border-gray-200"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
              Accessibility Enhancer
            </h3>
            <p className="text-gray-600">
              WCAG 2.1 AA compliance tools and customization options
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Show keyboard shortcuts"
            >
              <KeyboardIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-xl bg-gold-100 hover:bg-gold-200 transition-colors"
              aria-label="Open accessibility settings"
            >
              <Cog6ToothIcon className="h-5 w-5 text-gold-600" />
            </button>
          </div>
        </div>

        {/* Current Settings Summary */}
        <div className="flex flex-wrap gap-2">
          <div className={featureVariants({ 
            status: settings.highContrast ? 'active' : 'inactive' 
          })}>
            <EyeIcon className="h-4 w-4" />
            High Contrast
          </div>
          <div className={featureVariants({ 
            status: settings.largeText ? 'active' : 'inactive' 
          })}>
            <MagnifyingGlassIcon className="h-4 w-4" />
            Large Text
          </div>
          <div className={featureVariants({ 
            status: settings.reducedMotion ? 'active' : 'inactive' 
          })}>
            Motion: {settings.reducedMotion ? 'Reduced' : 'Full'}
          </div>
          <div className={featureVariants({ 
            status: settings.screenReaderMode ? 'active' : 'inactive' 
          })}>
            <SpeakerWaveIcon className="h-4 w-4" />
            Screen Reader
          </div>
        </div>
      </m.div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <m.div
            className="p-8 border-b border-gray-200 bg-gray-50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.3 }}
          >
            <h4 className="text-lg font-semibold text-slate-900 mb-6">
              Accessibility Settings
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Visual Settings */}
              <div className="space-y-4">
                <h5 className="font-medium text-slate-900 flex items-center gap-2">
                  <EyeIcon className="h-4 w-4" />
                  Visual
                </h5>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.highContrast}
                      onChange={(e) => updateSetting('highContrast', e.target.checked)}
                      className="w-4 h-4 text-gold-600 rounded focus:ring-gold-500"
                    />
                    <span className="text-sm">High contrast mode</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.largeText}
                      onChange={(e) => updateSetting('largeText', e.target.checked)}
                      className="w-4 h-4 text-gold-600 rounded focus:ring-gold-500"
                    />
                    <span className="text-sm">Large text mode</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size: {settings.fontSize}%
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="200"
                      step="25"
                      value={settings.fontSize}
                      onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Line Height: {settings.lineHeight}
                    </label>
                    <input
                      type="range"
                      min="1.4"
                      max="2.0"
                      step="0.2"
                      value={settings.lineHeight}
                      onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* Motor Settings */}
              <div className="space-y-4">
                <h5 className="font-medium text-slate-900 flex items-center gap-2">
                  <KeyboardIcon className="h-4 w-4" />
                  Motor & Navigation
                </h5>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.reducedMotion}
                      onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                      className="w-4 h-4 text-gold-600 rounded focus:ring-gold-500"
                    />
                    <span className="text-sm">Reduce motion and animations</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.keyboardNavigation}
                      onChange={(e) => updateSetting('keyboardNavigation', e.target.checked)}
                      className="w-4 h-4 text-gold-600 rounded focus:ring-gold-500"
                    />
                    <span className="text-sm">Enhanced keyboard navigation</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.focusIndicators}
                      onChange={(e) => updateSetting('focusIndicators', e.target.checked)}
                      className="w-4 h-4 text-gold-600 rounded focus:ring-gold-500"
                    />
                    <span className="text-sm">Enhanced focus indicators</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSettings({
                  highContrast: false,
                  largeText: false,
                  reducedMotion: false,
                  screenReaderMode: false,
                  keyboardNavigation: true,
                  focusIndicators: true,
                  audioDescriptions: false,
                  subtitles: false,
                  fontSize: 100,
                  lineHeight: 1.6,
                  letterSpacing: 0
                })}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Reset to Defaults
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-gold-600 text-white rounded-xl hover:bg-gold-700 transition-colors font-semibold"
              >
                Apply Settings
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts */}
      <AnimatePresence>
        {showKeyboardShortcuts && (
          <m.div
            className="p-8 border-b border-gray-200 bg-blue-50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.3 }}
          >
            <h4 className="text-lg font-semibold text-slate-900 mb-6">
              Keyboard Navigation Help
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyboardShortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-white rounded-xl"
                >
                  <div className="flex gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        <kbd className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded font-mono">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && (
                          <span className="text-gray-400 text-xs self-center">+</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <span className="text-sm text-gray-700">{shortcut.description}</span>
                </div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Accessibility Tests */}
      {showTests && (
        <m.div
          className="p-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-slate-900">
              WCAG 2.1 Compliance Tests
            </h4>
            <button
              onClick={runAccessibilityTests}
              disabled={isRunningTests}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
            >
              {isRunningTests ? 'Running Tests...' : 'Run Tests'}
            </button>
          </div>

          <div className="space-y-4">
            {activeTests.map((test, index) => (
              <m.div
                key={test.id}
                className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all duration-300"
                variants={itemVariants}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: reducedMotion ? 0.2 : 0.3, 
                  delay: isRunningTests ? index * 0.1 : 0 
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(test.category)}
                    <div>
                      <h5 className="font-semibold text-slate-900">
                        {test.title}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {test.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      test.wcagLevel === 'AAA' ? 'bg-green-100 text-green-800' :
                      test.wcagLevel === 'AA' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    )}>
                      WCAG {test.wcagLevel}
                    </span>
                    {getTestStatusIcon(test.status)}
                  </div>
                </div>

                {test.details && (
                  <div className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                    {test.details}
                  </div>
                )}
              </m.div>
            ))}
          </div>

          {/* Test Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {activeTests.filter(test => test.status === 'pass').length}
                </div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {activeTests.filter(test => test.status === 'warning').length}
                </div>
                <div className="text-sm text-gray-600">Warnings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {activeTests.filter(test => test.status === 'fail').length}
                </div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">
                  {Math.round((activeTests.filter(test => test.status === 'pass').length / activeTests.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </m.div>
  )
}

export default AccessibilityEnhancer