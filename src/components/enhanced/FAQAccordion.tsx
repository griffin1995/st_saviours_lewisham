import React, { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'contact' | 'services' | 'accessibility' | 'emergency'
}

interface FAQAccordionProps {
  reducedMotion?: boolean
  className?: string
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What are your office hours?',
    answer: 'Our parish office is open Monday to Friday from 9:00 AM to 5:00 PM, and Saturday from 10:00 AM to 2:00 PM. We are closed on Sundays except for emergencies.',
    category: 'general'
  },
  {
    id: '2',
    question: 'How can I contact the parish priest directly?',
    answer: 'You can contact Fr. Krzysztof Krzyskow through our parish office at 020 8852 7411, or email parish@saintsaviours.org.uk. For urgent pastoral matters, please call the emergency number.',
    category: 'contact'
  },
  {
    id: '3',
    question: 'Do you offer services in other languages?',
    answer: 'Yes, we offer Mass in multiple languages including Spanish and Portuguese. Please check our Mass times page for specific schedules, or contact us for more information.',
    category: 'services'
  },
  {
    id: '4',
    question: 'Is the church wheelchair accessible?',
    answer: 'Yes, St Saviour\'s is fully wheelchair accessible. We have accessible entrances, seating areas, toilet facilities, and hearing loops for those with hearing aids.',
    category: 'accessibility'
  },
  {
    id: '5',
    question: 'How do I arrange a baptism or wedding?',
    answer: 'Please contact our parish office to arrange a meeting with one of our priests. For baptisms, we recommend contacting us at least 2 months in advance. For weddings, please contact us at least 6 months in advance.',
    category: 'services'
  },
  {
    id: '6',
    question: 'What should I do in a pastoral emergency?',
    answer: 'For urgent pastoral care (serious illness, death, emergency baptism), please call our main number 020 8852 7411 and leave a clear message. We will respond as soon as possible, even outside office hours.',
    category: 'emergency'
  },
  {
    id: '7',
    question: 'Do you have parking available?',
    answer: 'There is limited street parking near the church. We recommend using the Lewisham Shopping Centre car park, which is just a 1-minute walk from the church.',
    category: 'general'
  },
  {
    id: '8',
    question: 'How can I get involved in parish activities?',
    answer: 'We have many ways to get involved! Visit our Parish Groups page to see our ministries, or speak with one of our priests or staff members about volunteering opportunities.',
    category: 'general'
  },
  {
    id: '9',
    question: 'Do you offer confession in different languages?',
    answer: 'Yes, our priests can offer the sacrament of reconciliation in English, Spanish, Portuguese, and Polish. Please contact us to arrange a time if you need confession in a specific language.',
    category: 'services'
  },
  {
    id: '10',
    question: 'How can I make a donation to the parish?',
    answer: 'We accept donations during Mass, online through our website, or by visiting the parish office. We also participate in the Gift Aid scheme for UK taxpayers.',
    category: 'general'
  }
]

const categoryColors = {
  general: 'blue',
  contact: 'green',
  services: 'purple',
  accessibility: 'amber',
  emergency: 'red'
} as const

const categoryLabels = {
  general: 'General',
  contact: 'Contact',
  services: 'Services',
  accessibility: 'Accessibility',
  emergency: 'Emergency'
} as const

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  reducedMotion = false,
  className = ''
}) => {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory)

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

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: reducedMotion ? 0.2 : 0.4,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <m.div
      className={`w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <m.div
        className="text-center mb-12"
        variants={itemVariants}
      >
        <div className="w-16 h-16 bg-gold-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <QuestionMarkCircleIcon className="h-8 w-8 text-gold-400" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
          Find answers to common questions about our parish, services, and how to get involved in our community.
        </p>
      </m.div>

      {/* Category Filter */}
      <m.div
        className="flex flex-wrap justify-center gap-2 mb-8"
        variants={itemVariants}
      >
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-gold-500 text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          All Questions
        </button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === key
                ? 'bg-gold-500 text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {label}
          </button>
        ))}
      </m.div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <m.div
            key={faq.id}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all duration-300"
            variants={itemVariants}
          >
            <button
              onClick={() => toggleItem(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  categoryColors[faq.category] === 'blue' ? 'bg-blue-500/20 text-blue-300' :
                  categoryColors[faq.category] === 'green' ? 'bg-green-500/20 text-green-300' :
                  categoryColors[faq.category] === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                  categoryColors[faq.category] === 'amber' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {categoryLabels[faq.category]}
                </span>
                <span className="text-lg font-medium text-white">
                  {faq.question}
                </span>
              </div>
              <m.div
                animate={{
                  rotate: openItems.includes(faq.id) ? 180 : 0
                }}
                transition={{
                  duration: reducedMotion ? 0.1 : 0.3,
                  ease: 'easeInOut'
                }}
              >
                <ChevronDownIcon className="h-5 w-5 text-gold-400" />
              </m.div>
            </button>
            
            <AnimatePresence>
              {openItems.includes(faq.id) && (
                <m.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <div className="pl-20 pr-4">
                      <p className="text-gray-100 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        ))}
      </div>

      {/* Contact CTA */}
      <m.div
        className="text-center mt-12 p-6 bg-white/5 rounded-2xl border border-white/10"
        variants={itemVariants}
      >
        <p className="text-gray-300 mb-4">
          Can't find what you're looking for?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+442088527411"
            className="bg-gold-600 text-black px-6 py-3 rounded-xl font-medium hover:bg-gold-500 transition-colors duration-300 text-center"
          >
            Call Us: 020 8852 7411
          </a>
          <a
            href="mailto:parish@saintsaviours.org.uk"
            className="bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors duration-300 text-center border border-white/20"
          >
            Send Email
          </a>
        </div>
      </m.div>
    </m.div>
  )
}

export default FAQAccordion