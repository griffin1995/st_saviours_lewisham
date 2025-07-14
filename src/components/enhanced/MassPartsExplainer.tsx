import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import {
  BookOpenIcon,
  MusicalNoteIcon,
  HandRaisedIcon,
  CircleStackIcon,
  BeakerIcon,
  HeartIcon,
  SunIcon,
  SparklesIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text, Button } from '@/components/ui'

interface MassPart {
  id: string
  name: string
  section: 'introductory' | 'liturgy-word' | 'liturgy-eucharist' | 'concluding'
  description: string
  purpose: string
  whenItHappens: string
  participation: string
  spiritualSignificance: string
  icon: React.ComponentType<any>
  color: string
  duration: string
  responses?: string[]
}

interface MassPartsExplainerProps {
  className?: string
}

export default function MassPartsExplainer({ className = '' }: MassPartsExplainerProps) {
  const [selectedPart, setSelectedPart] = useState<MassPart | null>(null)
  const [activeSection, setActiveSection] = useState<string>('introductory')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false)

  const massParts: MassPart[] = [
    {
      id: 'entrance',
      name: 'Entrance Antiphon & Procession',
      section: 'introductory',
      description: 'The priest and ministers process to the altar while the entrance song is sung',
      purpose: 'To gather the faithful, foster unity, and introduce the liturgical season',
      whenItHappens: 'At the very beginning of Mass',
      participation: 'Stand and sing the entrance hymn',
      spiritualSignificance: 'We join our voices as one body coming together to worship God',
      icon: MusicalNoteIcon,
      color: 'text-blue-400',
      duration: '3-5 minutes',
      responses: ['Join in singing', 'Stand respectfully']
    },
    {
      id: 'greeting',
      name: 'Greeting & Sign of the Cross',
      section: 'introductory',
      description: 'The priest greets the assembly in the name of the Trinity',
      purpose: 'To establish the sacred nature of our gathering',
      whenItHappens: 'After the entrance procession',
      participation: 'Make the Sign of the Cross and respond to the greeting',
      spiritualSignificance: 'We acknowledge God\'s presence among us and our unity in Christ',
      icon: HandRaisedIcon,
      color: 'text-green-400',
      duration: '1-2 minutes',
      responses: ['In the name of the Father...', 'And with your spirit']
    },
    {
      id: 'penitential',
      name: 'Penitential Act',
      section: 'introductory',
      description: 'We acknowledge our sins and ask for God\'s mercy',
      purpose: 'To prepare our hearts to receive God\'s word and grace',
      whenItHappens: 'After the greeting (on most days)',
      participation: 'Pray the Confiteor or respond to the invocations',
      spiritualSignificance: 'We humbly admit our need for God\'s forgiveness and mercy',
      icon: HeartIcon,
      color: 'text-purple-400',
      duration: '2-3 minutes',
      responses: ['I confess to almighty God...', 'Lord, have mercy']
    },
    {
      id: 'gloria',
      name: 'Gloria',
      section: 'introductory',
      description: 'Ancient hymn of praise to God (except during Advent and Lent)',
      purpose: 'To give glory to God and celebrate His majesty',
      whenItHappens: 'After Penitential Act (on feast days and Sundays)',
      participation: 'Sing or recite this ancient hymn of praise',
      spiritualSignificance: 'We join the angels in praising God\'s glory',
      icon: SunIcon,
      color: 'text-gold-400',
      duration: '3-4 minutes',
      responses: ['Glory to God in the highest...']
    },
    {
      id: 'first-reading',
      name: 'First Reading',
      section: 'liturgy-word',
      description: 'Usually from the Old Testament, sometimes from Acts or Revelation',
      purpose: 'To hear God\'s word from salvation history',
      whenItHappens: 'Beginning of the Liturgy of the Word',
      participation: 'Sit and listen attentively',
      spiritualSignificance: 'God speaks to us through the inspired word of Scripture',
      icon: BookOpenIcon,
      color: 'text-blue-500',
      duration: '2-3 minutes',
      responses: ['The word of the Lord / Thanks be to God']
    },
    {
      id: 'psalm',
      name: 'Responsorial Psalm',
      section: 'liturgy-word',
      description: 'Sung or recited psalm that responds to the first reading',
      purpose: 'To meditate on God\'s word through song and prayer',
      whenItHappens: 'After the first reading',
      participation: 'Sing or say the psalm response',
      spiritualSignificance: 'We respond to God\'s word with the inspired prayers of the psalms',
      icon: MusicalNoteIcon,
      color: 'text-green-500',
      duration: '2-3 minutes',
      responses: ['Sing the antiphon response']
    },
    {
      id: 'gospel',
      name: 'Gospel Reading',
      section: 'liturgy-word',
      description: 'The words and deeds of Jesus Christ',
      purpose: 'To hear the Good News of Jesus Christ',
      whenItHappens: 'After the second reading (or psalm on weekdays)',
      participation: 'Stand and make the sign of the cross on forehead, lips, and heart',
      spiritualSignificance: 'Christ himself speaks to us through the Gospel',
      icon: HeartIcon,
      color: 'text-red-500',
      duration: '3-5 minutes',
      responses: ['Glory to you, O Lord / Praise to you, Lord Jesus Christ']
    },
    {
      id: 'homily',
      name: 'Homily',
      section: 'liturgy-word',
      description: 'The priest or deacon explains the Scripture readings',
      purpose: 'To help us understand and apply God\'s word to our lives',
      whenItHappens: 'After the Gospel reading',
      participation: 'Sit and listen attentively',
      spiritualSignificance: 'God\'s word is broken open and applied to our daily lives',
      icon: SparklesIcon,
      color: 'text-purple-500',
      duration: '8-12 minutes'
    },
    {
      id: 'offertory',
      name: 'Presentation of Gifts',
      section: 'liturgy-eucharist',
      description: 'Bread and wine are brought to the altar along with our offerings',
      purpose: 'To offer our gifts and prepare for the Eucharistic sacrifice',
      whenItHappens: 'Beginning of the Liturgy of the Eucharist',
      participation: 'Stand, sing, and present our offerings',
      spiritualSignificance: 'We offer ourselves along with the bread and wine',
      icon: HandRaisedIcon,
      color: 'text-amber-500',
      duration: '3-5 minutes',
      responses: ['Blessed be God for ever']
    },
    {
      id: 'consecration',
      name: 'Consecration',
      section: 'liturgy-eucharist',
      description: 'The bread and wine become the Body and Blood of Christ',
      purpose: 'The central moment when Christ becomes present under the appearances of bread and wine',
      whenItHappens: 'During the Eucharistic Prayer',
      participation: 'Kneel in adoration and reverence',
      spiritualSignificance: 'The greatest miracle - Christ becomes truly present',
      icon: CircleStackIcon,
      color: 'text-gold-600',
      duration: '2-3 minutes',
      responses: ['We proclaim your Death, O Lord...']
    },
    {
      id: 'communion',
      name: 'Holy Communion',
      section: 'liturgy-eucharist',
      description: 'We receive the Body and Blood of Christ',
      purpose: 'To be united with Christ and nourished for our journey',
      whenItHappens: 'After the Lord\'s Prayer and peace',
      participation: 'Process forward to receive with reverence',
      spiritualSignificance: 'We become one with Christ and each other',
      icon: BeakerIcon,
      color: 'text-red-600',
      duration: '5-10 minutes',
      responses: ['The Body of Christ / Amen']
    },
    {
      id: 'blessing',
      name: 'Final Blessing & Dismissal',
      section: 'concluding',
      description: 'The priest blesses the assembly and sends us forth',
      purpose: 'To send us out to live the Gospel in our daily lives',
      whenItHappens: 'At the end of Mass',
      participation: 'Receive the blessing and respond to the dismissal',
      spiritualSignificance: 'We are sent forth to be Christ to others',
      icon: SunIcon,
      color: 'text-blue-600',
      duration: '1-2 minutes',
      responses: ['Thanks be to God']
    }
  ]

  const sections = [
    { id: 'introductory', label: 'Introductory Rites', color: 'text-blue-400' },
    { id: 'liturgy-word', label: 'Liturgy of the Word', color: 'text-green-400' },
    { id: 'liturgy-eucharist', label: 'Liturgy of the Eucharist', color: 'text-amber-400' },
    { id: 'concluding', label: 'Concluding Rites', color: 'text-purple-400' }
  ]

  const filteredParts = massParts.filter(part => part.section === activeSection)

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayEnabled && isPlaying) {
      const timer = setInterval(() => {
        setCurrentPartIndex(prev => {
          const nextIndex = (prev + 1) % massParts.length
          setSelectedPart(massParts[nextIndex])
          setActiveSection(massParts[nextIndex].section)
          return nextIndex
        })
      }, 5000)
      
      return () => clearInterval(timer)
    }
  }, [autoPlayEnabled, isPlaying, massParts])

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
    setAutoPlayEnabled(!autoPlayEnabled)
  }

  const selectPart = (part: MassPart) => {
    setSelectedPart(selectedPart?.id === part.id ? null : part)
    if (autoPlayEnabled) {
      setIsPlaying(false)
      setAutoPlayEnabled(false)
    }
  }

  const navigateParts = (direction: 'next' | 'prev') => {
    const currentIndex = massParts.findIndex(p => p.id === selectedPart?.id)
    let newIndex
    
    if (direction === 'next') {
      newIndex = currentIndex < massParts.length - 1 ? currentIndex + 1 : 0
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : massParts.length - 1
    }
    
    const newPart = massParts[newIndex]
    setSelectedPart(newPart)
    setActiveSection(newPart.section)
  }

  // React Spring animation for the timeline
  const timelineSpring = useSpring({
    transform: selectedPart ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 300, friction: 30 }
  })

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{ rotate: autoPlayEnabled && isPlaying ? [0, 360] : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <CircleStackIcon className="h-10 w-10 text-amber-400" />
          </motion.div>
          <Heading level="h3" color="white" className="text-2xl font-bold">
            Understanding the Mass
          </Heading>
          <motion.div
            animate={{ scale: autoPlayEnabled && isPlaying ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <SparklesIcon className="h-10 w-10 text-gold-400" />
          </motion.div>
        </div>
        <Text className="text-gray-300 max-w-3xl mx-auto">
          Explore the different parts of the Catholic Mass and understand their meaning and significance. 
          Click on any part to learn more, or use auto-play to follow the flow of the Mass.
        </Text>
      </motion.div>

      {/* Auto-play Controls */}
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAutoPlay}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            autoPlayEnabled && isPlaying 
              ? 'bg-amber-500 text-slate-900' 
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          {autoPlayEnabled && isPlaying ? (
            <PauseIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
          {autoPlayEnabled && isPlaying ? 'Pause Tour' : 'Auto-Play Tour'}
        </motion.button>
        
        {selectedPart && (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateParts('prev')}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
            >
              <ChevronLeftIcon className="h-5 w-5 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateParts('next')}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
            >
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-2">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeSection === section.id
                ? 'bg-white text-slate-900'
                : 'bg-white/20 hover:bg-white/30 text-gray-300'
            }`}
          >
            {section.label}
          </motion.button>
        ))}
      </div>

      {/* Mass Parts Timeline */}
      <animated.div style={timelineSpring}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParts.map((part, index) => {
            const Icon = part.icon
            const isSelected = selectedPart?.id === part.id
            
            return (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.03, rotateY: 2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => selectPart(part)}
                  className={`w-full text-left transition-all duration-300 ${
                    isSelected 
                      ? 'transform scale-105' 
                      : ''
                  }`}
                >
                  <Card variant="default" padding="md" className={`border-2 ${
                    isSelected 
                      ? 'bg-amber-500/20 border-amber-500/50 backdrop-blur-sm' 
                      : 'bg-white/10 border-slate-600 hover:border-amber-400 backdrop-blur-sm'
                  }`}>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-amber-500/30' : 'bg-white/20'
                          }`}>
                            <Icon className={`h-5 w-5 ${part.color}`} />
                          </div>
                          <div className="flex-1">
                            <Heading level="h5" color="white" className="font-semibold text-sm">
                              {part.name}
                            </Heading>
                            <Text size="xs" className="text-gray-400">
                              {part.duration}
                            </Text>
                          </div>
                        </div>
                        <Text size="sm" className="text-gray-300">
                          {part.description}
                        </Text>
                      </div>
                    </CardContent>
                  </Card>
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </animated.div>

      {/* Selected Part Details */}
      <AnimatePresence>
        {selectedPart && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="default" padding="lg" className="bg-gradient-to-r from-amber-500/20 to-gold-500/20 border border-amber-500/30 backdrop-blur-sm">
              <CardContent>
                <div className="space-y-6">
                  {/* Part Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-gold-500 rounded-full flex items-center justify-center">
                      <selectedPart.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <Heading level="h4" color="white" className="text-xl font-bold">
                        {selectedPart.name}
                      </Heading>
                      <Text className="text-amber-300">
                        Duration: {selectedPart.duration}
                      </Text>
                    </div>
                  </div>

                  {/* Part Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Heading level="h5" color="white" className="text-sm font-semibold mb-2">
                          Purpose
                        </Heading>
                        <Text size="sm" className="text-gray-200">
                          {selectedPart.purpose}
                        </Text>
                      </div>
                      
                      <div>
                        <Heading level="h5" color="white" className="text-sm font-semibold mb-2">
                          When It Happens
                        </Heading>
                        <Text size="sm" className="text-gray-200">
                          {selectedPart.whenItHappens}
                        </Text>
                      </div>
                      
                      <div>
                        <Heading level="h5" color="white" className="text-sm font-semibold mb-2">
                          How to Participate
                        </Heading>
                        <Text size="sm" className="text-gray-200">
                          {selectedPart.participation}
                        </Text>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Heading level="h5" color="white" className="text-sm font-semibold mb-2">
                          Spiritual Significance
                        </Heading>
                        <Text size="sm" className="text-gray-200">
                          {selectedPart.spiritualSignificance}
                        </Text>
                      </div>
                      
                      {selectedPart.responses && selectedPart.responses.length > 0 && (
                        <div>
                          <Heading level="h5" color="white" className="text-sm font-semibold mb-2">
                            Common Responses
                          </Heading>
                          <ul className="space-y-1">
                            {selectedPart.responses.map((response, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                                <Text size="sm" className="text-gray-300 italic">
                                  "{response}"
                                </Text>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Card variant="default" padding="md" className="bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
          <CardContent>
            <div className="space-y-2">
              <Text className="text-blue-300 font-semibold text-sm">
                💡 Learning Tip
              </Text>
              <Text size="sm" className="text-blue-200">
                The Mass has the same basic structure worldwide, uniting Catholics across cultures and languages in the same sacred worship.
              </Text>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}