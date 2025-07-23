import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import {
  GiftIcon,
  LightBulbIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  HeartIcon,
  HandRaisedIcon,
  SparklesIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  FireIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text, Button } from '@/components/ui'

interface Gift {
  id: string
  name: string
  shortDescription: string
  fullDescription: string
  biblicalReference: string
  dailyApplication: string
  prayerIntention: string
  icon: React.ComponentType<any>
  color: string
  gradient: string
}

interface SevenGiftsInteractiveProps {
  className?: string
}

export default function SevenGiftsInteractive({ className = '' }: SevenGiftsInteractiveProps) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [revealedGifts, setRevealedGifts] = useState<Set<string>>(new Set())

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const gifts: Gift[] = [
    {
      id: 'wisdom',
      name: 'Wisdom',
      shortDescription: 'Helps us see life from God\'s perspective',
      fullDescription: 'Wisdom enables us to see life through God\'s eyes and make decisions that align with His will. It helps us understand the deeper meaning of our faith and how to live according to divine truth.',
      biblicalReference: 'Proverbs 9:10 - "The fear of the Lord is the beginning of wisdom"',
      dailyApplication: 'Seek God\'s guidance in daily decisions, prioritise eternal values over temporary pleasures, and view challenges as opportunities for spiritual growth.',
      prayerIntention: 'Lord, grant me the wisdom to see Your hand in all things and to choose what leads to eternal life.',
      icon: LightBulbIcon,
      color: 'text-yellow-400',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'understanding',
      name: 'Understanding',
      shortDescription: 'Deepens our comprehension of faith truths',
      fullDescription: 'Understanding illuminates the mysteries of faith and helps us comprehend the deeper truths of our Catholic teaching. It moves beyond mere knowledge to spiritual insight.',
      biblicalReference: 'Psalm 119:130 - "The unfolding of your words gives light; it gives understanding to the simple"',
      dailyApplication: 'Study Scripture and Church teaching with an open heart, reflect on the meaning of liturgy, and seek to understand rather than judge others.',
      prayerIntention: 'Holy Spirit, open my mind to understand Your truth and my heart to embrace Your love.',
      icon: BookOpenIcon,
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'counsel',
      name: 'Counsel (Right Judgement)',
      shortDescription: 'Guides us to make good decisions',
      fullDescription: 'Counsel helps us discern right from wrong and choose the path that leads to God. It provides guidance in moral decisions and helps us advise others wisely.',
      biblicalReference: 'Isaiah 11:2 - "The Spirit of the Lord will rest on him—the Spirit of wisdom and of understanding, the Spirit of counsel and of might"',
      dailyApplication: 'Pause before important decisions to pray, seek wise counsel from trusted advisors, and consider the moral implications of your choices.',
      prayerIntention: 'Guide my decisions, Lord, that I may always choose what is right and just in Your sight.',
      icon: ShieldCheckIcon,
      color: 'text-green-400',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      id: 'fortitude',
      name: 'Fortitude (Courage)',
      shortDescription: 'Gives us courage to do what is right',
      fullDescription: 'Fortitude provides the strength and courage to stand up for our faith, endure difficulties, and persevere in doing good even when it\'s challenging.',
      biblicalReference: 'Joshua 1:9 - "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go"',
      dailyApplication: 'Stand up for your beliefs with kindness, face difficulties with hope, and help others who are struggling or marginalised.',
      prayerIntention: 'Give me courage, O Lord, to follow You faithfully and to defend what is right and true.',
      icon: ShieldCheckIcon,
      color: 'text-red-400',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      id: 'knowledge',
      name: 'Knowledge',
      shortDescription: 'Helps us know God\'s will in our lives',
      fullDescription: 'Knowledge helps us recognise God\'s presence in creation and understand our relationship with Him. It reveals the beauty of faith and the path to salvation.',
      biblicalReference: 'Colossians 1:9 - "We continually ask God to fill you with the knowledge of his will through all the wisdom and understanding that the Spirit gives"',
      dailyApplication: 'Study your faith regularly, recognise God\'s presence in nature and daily events, and share your knowledge of faith with others.',
      prayerIntention: 'Fill me with knowledge of Your ways, dear God, that I may grow closer to You each day.',
      icon: AcademicCapIcon,
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      id: 'piety',
      name: 'Piety (Reverence)',
      shortDescription: 'Inspires us to worship and serve God',
      fullDescription: 'Piety fills us with love and reverence for God as our Father and helps us see others as our brothers and sisters. It deepens our prayer life and service to others.',
      biblicalReference: '1 Timothy 4:8 - "Physical training is of some value, but godliness has value for all things"',
      dailyApplication: 'Pray regularly with sincere devotion, participate actively in Mass, and serve others as you would serve Christ.',
      prayerIntention: 'Increase my love for You, Father, and help me to serve You in all I meet.',
      icon: HeartIcon,
      color: 'text-pink-400',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 'fear-of-lord',
      name: 'Fear of the Lord (Wonder and Awe)',
      shortDescription: 'Develops reverence and respect for God',
      fullDescription: 'Fear of the Lord is not being afraid of God, but rather a profound reverence and awe for His majesty, goodness, and power. It leads to wisdom and keeps us from sin.',
      biblicalReference: 'Psalm 111:10 - "The fear of the Lord is the beginning of wisdom; all who follow his precepts have good understanding"',
      dailyApplication: 'Approach prayer and worship with reverence, recognise God\'s greatness in creation, and let awe for God guide your moral choices.',
      prayerIntention: 'Fill my heart with holy reverence, Lord, that I may always honour and glorify Your name.',
      icon: HandRaisedIcon,
      color: 'text-gold-400',
      gradient: 'from-gold-500 to-yellow-500'
    }
  ]

  // Gradually reveal gifts as user explores
  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealedGifts(prev => new Set([...Array.from(prev), gifts[activeIndex].id]))
    }, 1000)
    return () => clearTimeout(timer)
  }, [activeIndex, gifts])

  const nextGift = () => {
    setActiveIndex((prev) => (prev + 1) % gifts.length)
  }

  const prevGift = () => {
    setActiveIndex((prev) => (prev - 1 + gifts.length) % gifts.length)
  }

  const selectGift = (gift: Gift) => {
    setSelectedGift(selectedGift?.id === gift.id ? null : gift)
    setRevealedGifts(prev => new Set([...Array.from(prev), gift.id]))
  }

  // React Spring animation for the central gift display
  const centralGiftSpring = useSpring({
    transform: selectedGift ? 'scale(1.1)' : 'scale(1)',
    config: { tension: 300, friction: 30 }
  })

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <m.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <FireIcon className="h-10 w-10 text-red-400" />
          </m.div>
          <Heading level="h3" color="white" className="text-2xl font-bold">
            The Seven Gifts of the Holy Spirit
          </Heading>
          <m.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <SparklesIcon className="h-10 w-10 text-gold-400" />
          </m.div>
        </div>
        <Text className="text-gray-300 max-w-3xl mx-auto">
          Explore each of the seven gifts that the Holy Spirit bestows upon us in Confirmation. 
          Click on any gift to discover its meaning, biblical foundation, and practical application.
        </Text>
      </m.div>

      {/* Interactive Gifts Circle */}
      <m.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative"
      >
        <div className="flex items-center justify-center">
          <div className="relative w-80 h-80">
            {/* Central Fire Symbol */}
            <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <animated.div style={centralGiftSpring}>
                <m.div
                  className="w-16 h-16 bg-gradient-to-r from-red-500 to-gold-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FireIcon className="h-8 w-8 text-white" />
                </m.div>
              </animated.div>
            </div>

            {/* Gift Circles */}
            {gifts.map((gift, index) => {
              const angle = (index * 360) / gifts.length
              const radius = 120
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius
              const Icon = gift.icon
              const isRevealed = revealedGifts.has(gift.id)
              const isSelected = selectedGift?.id === gift.id

              return (
                <m.div
                  key={gift.id}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0.6, scale: 0.8 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <m.button
                    whileHover={{ scale: 1.2, rotateZ: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => selectGift(gift)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected 
                        ? `bg-gradient-to-r ${gift.gradient} shadow-lg shadow-white/20` 
                        : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30'
                    }`}
                    aria-label={`Learn about ${gift.name}`}
                  >
                    <Icon className={`h-7 w-7 ${isSelected ? 'text-white' : gift.color}`} />
                  </m.button>
                  
                  {/* Gift Name Label */}
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isRevealed ? 1 : 0 }}
                    className="absolute top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <Text size="xs" className="text-white font-medium bg-slate-800/80 px-2 py-1 rounded">
                      {gift.name}
                    </Text>
                  </m.div>
                </m.div>
              )
            })}
          </div>
        </div>
      </m.div>

      {/* Navigation Controls */}
      <div className="flex justify-center gap-4">
        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevGift}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          aria-label="Previous gift"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </m.button>
        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextGift}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          aria-label="Next gift"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </m.button>
      </div>

      {/* Selected Gift Details */}
      <AnimatePresence>
        {selectedGift && (
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="default" padding="lg" className={`bg-gradient-to-r ${selectedGift.gradient}/20 border border-white/20 backdrop-blur-sm`}>
              <CardContent>
                <div className="space-y-6">
                  {/* Gift Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${selectedGift.gradient} rounded-full flex items-center justify-center`}>
                      <selectedGift.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <Heading level="h4" color="white" className="text-xl font-bold">
                        {selectedGift.name}
                      </Heading>
                      <Text className="text-gray-300">
                        {selectedGift.shortDescription}
                      </Text>
                    </div>
                  </div>

                  {/* Gift Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Heading level="h5" color="white" className="text-sm font-semibold mb-2">
                          Understanding This Gift
                        </Heading>
                        <Text size="sm" className="text-gray-200">
                          {selectedGift.fullDescription}
                        </Text>
                      </div>
                      
                      <div>
                        <Heading level="h5" color="white" className="text-sm font-semibold mb-2">
                          Biblical Foundation
                        </Heading>
                        <Text size="sm" className="text-gray-200 italic">
                          {selectedGift.biblicalReference}
                        </Text>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Heading level="h5" color="white" className="text-sm font-semibold mb-2">
                          Daily Application
                        </Heading>
                        <Text size="sm" className="text-gray-200">
                          {selectedGift.dailyApplication}
                        </Text>
                      </div>
                      
                      <div>
                        <Heading level="h5" color="white" className="text-sm font-semibold mb-2">
                          Prayer Intention
                        </Heading>
                        <Text size="sm" className="text-gray-200 italic">
                          "{selectedGift.prayerIntention}"
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </m.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="text-center">
        <Text size="sm" className="text-gray-400 mb-2">
          Gifts Explored: {revealedGifts.size} of {gifts.length}
        </Text>
        <div className="flex justify-center gap-2">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                revealedGifts.has(gift.id) ? 'bg-gold-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      {revealedGifts.size === gifts.length && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card variant="default" padding="md" className="bg-gradient-to-r from-red-500/20 to-gold-500/20 border border-gold-500/30 backdrop-blur-sm">
            <CardContent>
              <div className="space-y-4">
                <Text className="text-white font-semibold">
                  🎉 You've explored all seven gifts of the Holy Spirit!
                </Text>
                <Text size="sm" className="text-gray-300">
                  These gifts will be strengthened in you through the sacrament of Confirmation.
                </Text>
                <Button
                  variant="primary"
                  className="bg-gold-500 hover:bg-gold-600 text-slate-900"
                >
                  Begin Confirmation Preparation
                </Button>
              </div>
            </CardContent>
          </Card>
        </m.div>
      )}
    </div>
  )
}