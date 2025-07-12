import React, { useState } from 'react'
import { Motion } from '@/lib/motion'
import { PlusIcon } from '@heroicons/react/24/solid'

interface FloatingAction {
  icon: React.ReactNode
  label: string
  onClick: () => void
  color?: 'gold' | 'navy' | 'slate'
}

interface FloatingActionButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  actions: FloatingAction[]
  reducedMotion?: boolean
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  position = 'bottom-right',
  actions,
  reducedMotion = false
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  const colorClasses = {
    gold: 'bg-gold-600 hover:bg-gold-700',
    navy: 'bg-navy-600 hover:bg-navy-700',
    slate: 'bg-slate-600 hover:bg-slate-700'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Action Items */}
      <div className="flex flex-col-reverse gap-3 mb-3">
        {actions.map((action, index) => (
          <Motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 20 }}
            transition={{ 
              duration: reducedMotion ? 0.1 : 0.2, 
              delay: reducedMotion ? 0 : index * 0.05 
            }}
            className="flex items-center gap-3"
          >
            {/* Label */}
            <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
              {action.label}
            </div>
            
            {/* Action Button */}
            <Motion.button
              onClick={action.onClick}
              className={`w-12 h-12 rounded-full ${colorClasses[action.color || 'gold']} text-white shadow-lg flex items-center justify-center`}
              whileHover={reducedMotion ? {} : { scale: 1.1 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
            >
              {action.icon}
            </Motion.button>
          </Motion.div>
        ))}
      </div>

      {/* Main FAB */}
      <Motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gold-600 hover:bg-gold-700 text-white rounded-full shadow-lg flex items-center justify-center"
        whileHover={reducedMotion ? {} : { scale: 1.1 }}
        whileTap={reducedMotion ? {} : { scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.2 }}
      >
        <PlusIcon className="h-6 w-6" />
      </Motion.button>
    </div>
  )
}