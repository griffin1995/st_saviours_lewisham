import React, { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/solid'

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'staff' | 'system'
  timestamp: Date
  staffName?: string
  isTyping?: boolean
}

interface LiveChatWidgetProps {
  reducedMotion?: boolean
  className?: string
}

const predefinedResponses = {
  greeting: "Hello! Welcome to St Saviour's Catholic Church. How can I help you today?",
  massTime: "Our Mass times are: Sunday 8:00 AM, 10:00 AM, 12:00 PM, 6:00 PM. Monday-Friday 9:00 AM. Saturday 6:00 PM (Vigil). Would you like more details about any specific service?",
  contact: "You can reach us at 020 8852 7411 or email parish@saintsaviours.org.uk. Our office hours are Monday-Friday 9:00 AM-5:00 PM, Saturday 10:00 AM-2:00 PM.",
  baptism: "For baptism arrangements, please contact our parish office. We recommend booking at least 2 months in advance. Fr. Krzysztof will guide you through the preparation process.",
  wedding: "For wedding arrangements, please contact us at least 6 months in advance. We'll arrange a meeting with one of our priests to discuss your requirements and preparation.",
  confession: "Confession is available Saturday 5:00-5:45 PM and by appointment. We can offer the sacrament in English, Spanish, Portuguese, and Polish.",
  emergency: "For pastoral emergencies (serious illness, death, emergency sacraments), please call 020 8852 7411 immediately. We respond to emergencies 24/7."
}

const quickReplies = [
  { text: "Mass Times", key: "massTime" },
  { text: "Contact Info", key: "contact" },
  { text: "Baptism", key: "baptism" },
  { text: "Wedding", key: "wedding" },
  { text: "Confession", key: "confession" },
  { text: "Emergency", key: "emergency" }
]

const staffMembers = [
  { name: "Margaret", role: "Parish Secretary", online: true },
  { name: "Fr. Krzysztof", role: "Parish Priest", online: false },
  { name: "Revd. Carlos", role: "Associate Priest", online: true }
]

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  reducedMotion = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentStaff, setCurrentStaff] = useState(staffMembers[0])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send greeting message
      setTimeout(() => {
        addMessage(predefinedResponses.greeting, 'staff', currentStaff.name)
      }, 1000)
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addMessage = (text: string, sender: 'user' | 'staff' | 'system', staffName?: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      staffName: sender === 'staff' ? staffName : undefined
    }
    
    setMessages(prev => [...prev, newMessage])
    
    if (sender === 'staff' && !isOpen) {
      setUnreadCount(prev => prev + 1)
    }
  }

  const handleSendMessage = () => {
    if (inputText.trim()) {
      addMessage(inputText, 'user')
      setInputText('')
      
      // Simulate typing and response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        
        // Simple keyword matching for responses
        const input = inputText.toLowerCase()
        let response = "Thank you for your message. A member of our staff will respond shortly. For urgent matters, please call 020 8852 7411."
        
        if (input.includes('mass') || input.includes('service') || input.includes('time')) {
          response = predefinedResponses.massTime
        } else if (input.includes('contact') || input.includes('phone') || input.includes('email')) {
          response = predefinedResponses.contact
        } else if (input.includes('baptism') || input.includes('christening')) {
          response = predefinedResponses.baptism
        } else if (input.includes('wedding') || input.includes('marry') || input.includes('marriage')) {
          response = predefinedResponses.wedding
        } else if (input.includes('confession') || input.includes('reconciliation')) {
          response = predefinedResponses.confession
        } else if (input.includes('emergency') || input.includes('urgent') || input.includes('death')) {
          response = predefinedResponses.emergency
        }
        
        addMessage(response, 'staff', currentStaff.name)
      }, 2000)
    }
  }

  const handleQuickReply = (key: string) => {
    const response = predefinedResponses[key as keyof typeof predefinedResponses]
    if (response) {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage(response, 'staff', currentStaff.name)
      }, 1000)
    }
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const chatVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: 20,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.4,
        ease: "easeOut"
      }
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.3 }
    }
  }

  const buttonVariants = {
    hover: reducedMotion ? {} : {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: reducedMotion ? {} : {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Chat Button */}
      <m.button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-red-600 hover:bg-red-500' : 'bg-gold-600 hover:bg-gold-500'
        }`}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
        )}
        
        {/* Unread Badge */}
        {unreadCount > 0 && !isOpen && (
          <m.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white text-xs font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </m.div>
        )}
      </m.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            className={`absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 ${
              isMinimized ? 'h-12' : 'h-96'
            }`}
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">St Saviour's Support</div>
                    <div className="text-xs text-gray-300 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      {currentStaff.name} ({currentStaff.role})
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={minimizeChat}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={toggleChat}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {messages.map((message) => (
                    <m.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gold-600 text-white'
                          : message.sender === 'staff'
                          ? 'bg-white text-gray-900 border border-gray-200'
                          : 'bg-blue-100 text-blue-900 text-center'
                      }`}>
                        {message.sender === 'staff' && message.staffName && (
                          <div className="text-xs text-gray-500 mb-1">
                            {message.staffName}
                          </div>
                        )}
                        <p className="text-sm">{message.text}</p>
                        <div className="text-xs opacity-70 mt-1">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </m.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <m.div
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-2xl">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{currentStaff.name} is typing</span>
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <m.div
                                key={i}
                                className="w-1 h-1 bg-gray-400 rounded-full"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </m.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length <= 1 && (
                  <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                    <div className="text-xs text-gray-600 mb-2">Quick questions:</div>
                    <div className="flex flex-wrap gap-1">
                      {quickReplies.slice(0, 3).map((reply) => (
                        <button
                          key={reply.key}
                          onClick={() => handleQuickReply(reply.key)}
                          className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                          {reply.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      className="w-8 h-8 bg-gold-600 text-white rounded-full flex items-center justify-center hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <PaperAirplaneIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LiveChatWidget