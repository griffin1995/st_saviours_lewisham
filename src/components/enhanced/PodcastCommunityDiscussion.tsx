import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  UserIcon,
  ClockIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HandRaisedIcon,
  SparklesIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text, Button } from '@/components/ui'

interface Comment {
  id: number
  author: string
  avatar?: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
  isPrayer?: boolean
  isReflection?: boolean
}

interface PodcastCommunityDiscussionProps {
  episodeId: number
  episodeTitle: string
  className?: string
}

export default function PodcastCommunityDiscussion({ 
  episodeId, 
  episodeTitle, 
  className = '' 
}: PodcastCommunityDiscussionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [commentType, setCommentType] = useState<'discussion' | 'prayer' | 'reflection'>('discussion')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-liked'>('newest')
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
  const [showCommentBox, setShowCommentBox] = useState(false)

  // Sample comments data
  useEffect(() => {
    const sampleComments: Comment[] = [
      {
        id: 1,
        author: 'Maria Rodriguez',
        content: 'This episode really helped me understand the importance of Lenten practices. Fr Krisz\'s explanation of fasting as spiritual discipline rather than just giving up something was enlightening.',
        timestamp: '2 hours ago',
        likes: 12,
        isLiked: false,
        isReflection: true,
        replies: [
          {
            id: 11,
            author: 'John Smith',
            content: 'I agree! It made me reconsider my approach to Lent this year.',
            timestamp: '1 hour ago',
            likes: 3,
            isLiked: false
          }
        ]
      },
      {
        id: 2,
        author: 'Catherine O\'Brien',
        content: 'Please pray for my family as we navigate some difficult times. This podcast reminded me that God is always present in our struggles.',
        timestamp: '4 hours ago',
        likes: 8,
        isLiked: true,
        isPrayer: true,
        replies: [
          {
            id: 21,
            author: 'Fr Michael',
            content: 'You and your family are in our prayers, Catherine. Remember that our parish community is here to support you.',
            timestamp: '3 hours ago',
            likes: 15,
            isLiked: false
          },
          {
            id: 22,
            author: 'Sarah Thompson',
            content: 'Praying for you and your family. God\'s peace be with you.',
            timestamp: '2 hours ago',
            likes: 7,
            isLiked: false
          }
        ]
      },
      {
        id: 3,
        author: 'David Martinez',
        content: 'The discussion about integrating prayer into daily routine was exactly what I needed to hear. Thank you for this practical guidance.',
        timestamp: '6 hours ago',
        likes: 15,
        isLiked: false,
        replies: []
      },
      {
        id: 4,
        author: 'Sister Mary Agnes',
        content: 'Beautiful reflection on the spiritual disciplines. I\'ve shared this with our contemplative prayer group for discussion.',
        timestamp: '8 hours ago',
        likes: 21,
        isLiked: true,
        isReflection: true
      }
    ]
    setComments(sampleComments)
  }, [episodeId])

  const handleLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (isReply && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies?.map(reply => 
              reply.id === commentId
                ? { ...reply, isLiked: !reply.isLiked, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 }
                : reply
            ) || []
          }
        } else if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        }
        return comment
      })
    )
  }

  const toggleReplies = (commentId: number) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: 'You',
        content: newComment,
        timestamp: 'Just now',
        likes: 0,
        isLiked: false,
        isPrayer: commentType === 'prayer',
        isReflection: commentType === 'reflection',
        replies: []
      }
      
      setComments(prev => [comment, ...prev])
      setNewComment('')
      setShowCommentBox(false)
    }
  }

  const getCommentTypeIcon = (comment: Comment) => {
    if (comment.isPrayer) return <HandRaisedIcon className="h-4 w-4 text-purple-400" />
    if (comment.isReflection) return <SparklesIcon className="h-4 w-4 text-gold-400" />
    return <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-400" />
  }

  const getCommentTypeBadge = (comment: Comment) => {
    if (comment.isPrayer) return (
      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
        Prayer Request
      </span>
    )
    if (comment.isReflection) return (
      <span className="px-2 py-1 bg-gold-500/20 text-gold-300 text-xs rounded-full">
        Reflection
      </span>
    )
    return (
      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
        Discussion
      </span>
    )
  }

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return a.id - b.id
      case 'most-liked':
        return b.likes - a.likes
      case 'newest':
      default:
        return b.id - a.id
    }
  })

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <m.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-gold-400" />
          </m.div>
          <Heading level="h3" color="white" className="text-xl font-bold">
            Community Discussion
          </Heading>
        </div>
        <Text className="text-gray-300 max-w-2xl mx-auto">
          Share your thoughts, prayer requests, and reflections about "{episodeTitle}"
        </Text>
      </m.div>

      {/* Controls */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="default" padding="md" className="bg-white/10 backdrop-blur-sm border border-slate-600">
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <Text size="sm" className="text-gray-300">Sort by:</Text>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-slate-700 text-white rounded px-3 py-1 text-sm border border-slate-600 focus:border-gold-500 focus:outline-none"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="most-liked">Most liked</option>
                </select>
              </div>
              
              <m.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<PlusIcon className="h-4 w-4" />}
                  onClick={() => setShowCommentBox(!showCommentBox)}
                  className="bg-gold-500 hover:bg-gold-600 text-slate-900"
                >
                  Add Comment
                </Button>
              </m.div>
            </div>
          </CardContent>
        </Card>
      </m.div>

      {/* Comment Input */}
      <AnimatePresence>
        {showCommentBox && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600">
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['discussion', 'prayer', 'reflection'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setCommentType(type)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                          commentType === type
                            ? type === 'prayer' 
                              ? 'bg-purple-500 text-white'
                              : type === 'reflection'
                              ? 'bg-gold-500 text-slate-900'
                              : 'bg-blue-500 text-white'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        {type === 'prayer' ? 'Prayer Request' : type === 'reflection' ? 'Reflection' : 'Discussion'}
                      </button>
                    ))}
                  </div>
                  
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={
                      commentType === 'prayer' 
                        ? 'Share your prayer request with our community...'
                        : commentType === 'reflection'
                        ? 'Share your spiritual reflection on this episode...'
                        : 'Share your thoughts about this episode...'
                    }
                    className="w-full h-24 bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-gold-500 focus:outline-none resize-none"
                  />
                  
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCommentBox(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                      className="bg-gold-500 hover:bg-gold-600 text-slate-900 disabled:opacity-50"
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </m.div>
        )}
      </AnimatePresence>

      {/* Comments List */}
      <div className="space-y-4">
        {sortedComments.map((comment, index) => (
          <m.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white/20 transition-all duration-300">
              <CardContent>
                <div className="space-y-4">
                  {/* Comment Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Text className="font-medium text-white">{comment.author}</Text>
                          {getCommentTypeBadge(comment)}
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <ClockIcon className="h-3 w-3" />
                          <Text size="xs">{comment.timestamp}</Text>
                        </div>
                      </div>
                    </div>
                    {getCommentTypeIcon(comment)}
                  </div>

                  {/* Comment Content */}
                  <Text className="text-gray-200">{comment.content}</Text>

                  {/* Comment Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <m.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(comment.id)}
                        className={`flex items-center gap-1 transition-colors ${
                          comment.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <HeartIcon className="h-4 w-4" />
                        <Text size="sm">{comment.likes}</Text>
                      </m.button>
                      
                      <m.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <ShareIcon className="h-4 w-4" />
                      </m.button>
                      
                      <m.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-gold-400 transition-colors"
                      >
                        <BookmarkIcon className="h-4 w-4" />
                      </m.button>
                    </div>

                    {comment.replies && comment.replies.length > 0 && (
                      <button
                        onClick={() => toggleReplies(comment.id)}
                        className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Text size="sm">{comment.replies.length} replies</Text>
                        {expandedComments.has(comment.id) ? (
                          <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Replies */}
                  <AnimatePresence>
                    {expandedComments.has(comment.id) && comment.replies && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 space-y-3 border-l-2 border-slate-600 pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                                  <UserIcon className="h-3 w-3 text-gray-400" />
                                </div>
                                <Text size="sm" className="font-medium text-white">{reply.author}</Text>
                                <Text size="xs" className="text-gray-400">{reply.timestamp}</Text>
                              </div>
                              <Text size="sm" className="text-gray-300">{reply.content}</Text>
                              <div className="flex items-center gap-2">
                                <m.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleLike(reply.id, true, comment.id)}
                                  className={`flex items-center gap-1 transition-colors ${
                                    reply.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                                  }`}
                                >
                                  <HeartIcon className="h-3 w-3" />
                                  <Text size="xs">{reply.likes}</Text>
                                </m.button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </m.div>
        ))}
      </div>

      {/* Community Guidelines */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card variant="default" padding="md" className="bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
          <CardContent>
            <div className="space-y-2">
              <Heading level="h5" className="text-blue-300 text-sm font-semibold">
                Community Guidelines
              </Heading>
              <Text size="sm" className="text-blue-200">
                Please keep discussions respectful and in line with Catholic values. Prayer requests are welcomed and will be remembered in our parish prayers.
              </Text>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </div>
  )
}