import React, { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import { 
  BookOpenIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowPathIcon,
  ShareIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid'

interface Scripture {
  id: string
  verse: string
  reference: string
  book: string
  chapter: number
  verseNumber: string
  translation: string
  theme: string
  reflection?: string
  tags: string[]
  date: string
  liturgicalSeason?: string
}

interface ScriptureCardProps {
  displayMode?: 'daily' | 'random' | 'themed'
  theme?: string
  showReflection?: boolean
  showAudio?: boolean
  reducedMotion?: boolean
  className?: string
}

const scriptureDatabase: Scripture[] = [
  {
    id: '1',
    verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
    book: "John",
    chapter: 3,
    verseNumber: "16",
    translation: "NIV",
    theme: "Love",
    reflection: "This verse reminds us of God's immense love for humanity. In our daily lives, we can reflect this love through acts of kindness, forgiveness, and compassion towards others.",
    tags: ["love", "salvation", "eternal life"],
    date: "2024-01-01",
    liturgicalSeason: "Ordinary Time"
  },
  {
    id: '2',
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    book: "Romans",
    chapter: 8,
    verseNumber: "28",
    translation: "NIV",
    theme: "Hope",
    reflection: "Even in difficult times, we can trust that God is working in our lives. This verse gives us hope and encourages us to look for His purpose in every situation.",
    tags: ["hope", "purpose", "trust"],
    date: "2024-01-02",
    liturgicalSeason: "Ordinary Time"
  },
  {
    id: '3',
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    book: "Joshua",
    chapter: 1,
    verseNumber: "9",
    translation: "NIV",
    theme: "Courage",
    reflection: "God calls us to be brave and confident, knowing that He is always with us. We can face any challenge with courage because we are not alone.",
    tags: ["courage", "strength", "presence"],
    date: "2024-01-03",
    liturgicalSeason: "Ordinary Time"
  },
  {
    id: '4',
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    book: "Proverbs",
    chapter: 3,
    verseNumber: "5-6",
    translation: "NIV",
    theme: "Trust",
    reflection: "Sometimes we try to understand everything ourselves, but God calls us to trust in Him completely. When we surrender our plans to Him, He guides us on the right path.",
    tags: ["trust", "wisdom", "guidance"],
    date: "2024-01-04",
    liturgicalSeason: "Ordinary Time"
  },
  {
    id: '5',
    verse: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    reference: "Psalm 23:1-3",
    book: "Psalms",
    chapter: 23,
    verseNumber: "1-3",
    translation: "NIV",
    theme: "Peace",
    reflection: "In the midst of life's storms, God provides peace and rest. He cares for us like a shepherd cares for his sheep, ensuring we have everything we need.",
    tags: ["peace", "provision", "comfort"],
    date: "2024-01-05",
    liturgicalSeason: "Ordinary Time"
  },
  {
    id: '6',
    verse: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13",
    book: "Philippians",
    chapter: 4,
    verseNumber: "13",
    translation: "NIV",
    theme: "Strength",
    reflection: "Our strength comes not from ourselves but from Christ. When we feel weak or overwhelmed, we can draw on His power to accomplish what seems impossible.",
    tags: ["strength", "power", "perseverance"],
    date: "2024-01-06",
    liturgicalSeason: "Ordinary Time"
  }
]

export const ScriptureCard: React.FC<ScriptureCardProps> = ({
  displayMode = 'daily',
  theme,
  showReflection = true,
  showAudio = true,
  reducedMotion = false,
  className = ''
}) => {
  const [currentScripture, setCurrentScripture] = useState<Scripture | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullReflection, setShowFullReflection] = useState(false)
  const [scriptureIndex, setScriptureIndex] = useState(0)

  useEffect(() => {
    loadScripture()
  }, [displayMode, theme, scriptureIndex])

  const loadScripture = () => {
    let scripture: Scripture

    switch (displayMode) {
      case 'daily':
        const today = new Date().toISOString().split('T')[0]
        scripture = scriptureDatabase.find(s => s.date === today) || scriptureDatabase[0]
        break
      case 'themed':
        const themedScriptures = scriptureDatabase.filter(s => s.theme === theme)
        scripture = themedScriptures[Math.floor(Math.random() * themedScriptures.length)] || scriptureDatabase[0]
        break
      case 'random':
      default:
        scripture = scriptureDatabase[scriptureIndex]
        break
    }

    setCurrentScripture(scripture)
  }

  const handleRefresh = () => {
    if (displayMode === 'random') {
      setScriptureIndex(Math.floor(Math.random() * scriptureDatabase.length))
    } else {
      loadScripture()
    }
  }

  const handleShare = async () => {
    if (!currentScripture) return

    const shareText = `"${currentScripture.verse}" - ${currentScripture.reference}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Scripture',
          text: shareText,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      await navigator.clipboard.writeText(shareText)
    }
  }

  const handleAudio = () => {
    if ('speechSynthesis' in window && currentScripture) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(
          `${currentScripture.verse} ${currentScripture.reference}`
        )
        utterance.rate = 0.8
        utterance.pitch = 1
        utterance.volume = 0.8
        
        utterance.onstart = () => setIsPlaying(true)
        utterance.onend = () => setIsPlaying(false)
        utterance.onerror = () => setIsPlaying(false)
        
        window.speechSynthesis.speak(utterance)
      }
    }
  }

  const navigateScripture = (direction: number) => {
    const newIndex = (scriptureIndex + direction + scriptureDatabase.length) % scriptureDatabase.length
    setScriptureIndex(newIndex)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        ease: "easeOut"
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.4,
        delay: 0.2
      }
    }
  }

  if (!currentScripture) return null

  return (
    <m.div
      className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gold-700/20 rounded-xl flex items-center justify-center">
            <BookOpenIcon className="h-6 w-6 text-gold-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {displayMode === 'daily' ? 'Daily Scripture' : 
               displayMode === 'themed' ? `${theme} Scripture` : 'Scripture Reflection'}
            </h3>
            <p className="text-sm text-gray-300">
              {currentScripture.liturgicalSeason}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {displayMode === 'random' && (
            <>
              <button
                onClick={() => navigateScripture(-1)}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigateScripture(1)}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </>
          )}
          
          <button
            onClick={handleRefresh}
            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ArrowPathIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scripture Content */}
      <m.div
        className="space-y-6"
        variants={contentVariants}
      >
        {/* Main Verse */}
        <div className="text-center">
          <blockquote className="text-xl lg:text-2xl font-light text-white leading-relaxed mb-4">
            "{currentScripture.verse}"
          </blockquote>
          <cite className="text-gold-300 font-medium">
            {currentScripture.reference} ({currentScripture.translation})
          </cite>
        </div>

        {/* Theme Badge */}
        <div className="flex justify-center">
          <span className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-sm font-medium">
            {currentScripture.theme}
          </span>
        </div>

        {/* Reflection */}
        {showReflection && currentScripture.reflection && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="text-sm font-semibold text-white mb-2">Reflection</h4>
            <p className="text-gray-100 text-sm leading-relaxed">
              {showFullReflection 
                ? currentScripture.reflection 
                : `${currentScripture.reflection.substring(0, 150)}...`
              }
            </p>
            {currentScripture.reflection.length > 150 && (
              <button
                onClick={() => setShowFullReflection(!showFullReflection)}
                className="text-gold-300 text-sm hover:text-gold-200 transition-colors mt-2"
              >
                {showFullReflection ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {currentScripture.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          {showAudio && 'speechSynthesis' in window && (
            <button
              onClick={handleAudio}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
            >
              {isPlaying ? (
                <SpeakerXMarkIcon className="h-4 w-4" />
              ) : (
                <SpeakerWaveIcon className="h-4 w-4" />
              )}
              <span className="text-sm">
                {isPlaying ? 'Stop' : 'Listen'}
              </span>
            </button>
          )}
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            <ShareIcon className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </button>
          
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              isLiked 
                ? 'bg-red-500/20 text-red-300' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <HeartIcon className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">
              {isLiked ? 'Liked' : 'Like'}
            </span>
          </button>
        </div>
      </m.div>
    </m.div>
  )
}

export default ScriptureCard