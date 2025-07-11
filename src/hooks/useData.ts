import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useChurchStore } from '@/stores/churchStore'

// Types
interface MassTimeData {
  sunday: string[]
  weekday: string[]
  saturday: string[]
  special: Array<{
    date: string
    time: string
    type: string
    description: string
  }>
}

interface EventData {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  registrationRequired: boolean
  attendees?: number
  maxAttendees?: number
}

interface NewsData {
  id: string
  title: string
  excerpt: string
  content: string
  image?: string
  category: string
  date: string
  readTime: number
  author: string
  published: boolean
  slug: string
}

interface PrayerData {
  id: string
  title: string
  text: string
  category: 'morning' | 'evening' | 'mealtime' | 'special'
  language: string
  audioUrl?: string
}

// API Functions
const api = {
  // Mass Times
  getMassTimes: async (): Promise<MassTimeData> => {
    const response = await fetch('/api/mass-times')
    if (!response.ok) {
      throw new Error('Failed to fetch mass times')
    }
    return response.json()
  },

  updateMassTimes: async (data: Partial<MassTimeData>): Promise<MassTimeData> => {
    const response = await fetch('/api/mass-times', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to update mass times')
    }
    return response.json()
  },

  // Events
  getEvents: async (): Promise<EventData[]> => {
    const response = await fetch('/api/events')
    if (!response.ok) {
      throw new Error('Failed to fetch events')
    }
    return response.json()
  },

  getEvent: async (id: string): Promise<EventData> => {
    const response = await fetch(`/api/events/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch event')
    }
    return response.json()
  },

  createEvent: async (data: Omit<EventData, 'id'>): Promise<EventData> => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to create event')
    }
    return response.json()
  },

  updateEvent: async (id: string, data: Partial<EventData>): Promise<EventData> => {
    const response = await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to update event')
    }
    return response.json()
  },

  deleteEvent: async (id: string): Promise<void> => {
    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete event')
    }
  },

  // News
  getNews: async (): Promise<NewsData[]> => {
    const response = await fetch('/api/news')
    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }
    return response.json()
  },

  getNewsItem: async (slug: string): Promise<NewsData> => {
    const response = await fetch(`/api/news/${slug}`)
    if (!response.ok) {
      throw new Error('Failed to fetch news item')
    }
    return response.json()
  },

  // Prayers
  getPrayers: async (category?: string): Promise<PrayerData[]> => {
    const url = category ? `/api/prayers?category=${category}` : '/api/prayers'
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch prayers')
    }
    return response.json()
  },

  // Newsletter
  subscribeNewsletter: async (data: {
    email: string
    firstName?: string
    interests: string[]
    frequency: string
    consent: boolean
  }): Promise<{ success: boolean; message: string }> => {
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to subscribe to newsletter')
    }
    return response.json()
  },

  // Contact
  submitContactForm: async (data: {
    name: string
    email: string
    subject: string
    message: string
    type: string
  }): Promise<{ success: boolean; message: string }> => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to submit contact form')
    }
    return response.json()
  }
}

// Query Keys
export const queryKeys = {
  massTimes: ['massTimes'] as const,
  events: ['events'] as const,
  event: (id: string) => ['events', id] as const,
  news: ['news'] as const,
  newsItem: (slug: string) => ['news', slug] as const,
  prayers: (category?: string) => ['prayers', category] as const
}

// Mass Times Hooks
export const useMassTimesQuery = () => {
  return useQuery({
    queryKey: queryKeys.massTimes,
    queryFn: api.getMassTimes
  })
}

export const useMassTimesMutation = () => {
  const queryClient = useQueryClient()
  const addNotification = useChurchStore((state: any) => state.actions.addNotification)

  return useMutation({
    mutationFn: api.updateMassTimes,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.massTimes, data)
      addNotification({
        type: 'success',
        message: 'Mass times updated successfully',
        dismissible: true
      })
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Failed to update mass times',
        dismissible: true
      })
    }
  })
}

// Events Hooks
export const useEventsQuery = () => {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: api.getEvents
  })
}

export const useEventQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.event(id),
    queryFn: () => api.getEvent(id),
    enabled: !!id
  })
}

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient()
  const addNotification = useChurchStore((state: any) => state.actions.addNotification)

  return useMutation({
    mutationFn: api.createEvent,
    onSuccess: (newEvent) => {
      queryClient.setQueryData(queryKeys.events, (old: EventData[] = []) => [
        ...old,
        newEvent
      ])
      addNotification({
        type: 'success',
        message: 'Event created successfully',
        dismissible: true
      })
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Failed to create event',
        dismissible: true
      })
    }
  })
}

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient()
  const addNotification = useChurchStore((state: any) => state.actions.addNotification)

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EventData> }) =>
      api.updateEvent(id, data),
    onSuccess: (updatedEvent) => {
      queryClient.setQueryData(queryKeys.event(updatedEvent.id), updatedEvent)
      queryClient.setQueryData(queryKeys.events, (old: EventData[] = []) =>
        old.map(event => event.id === updatedEvent.id ? updatedEvent : event)
      )
      addNotification({
        type: 'success',
        message: 'Event updated successfully',
        dismissible: true
      })
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Failed to update event',
        dismissible: true
      })
    }
  })
}

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient()
  const addNotification = useChurchStore((state: any) => state.actions.addNotification)

  return useMutation({
    mutationFn: api.deleteEvent,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(queryKeys.events, (old: EventData[] = []) =>
        old.filter(event => event.id !== deletedId)
      )
      queryClient.removeQueries({ queryKey: queryKeys.event(deletedId) })
      addNotification({
        type: 'success',
        message: 'Event deleted successfully',
        dismissible: true
      })
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Failed to delete event',
        dismissible: true
      })
    }
  })
}

// News Hooks
export const useNewsQuery = () => {
  return useQuery({
    queryKey: queryKeys.news,
    queryFn: api.getNews
  })
}

export const useNewsItemQuery = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.newsItem(slug),
    queryFn: () => api.getNewsItem(slug),
    enabled: !!slug
  })
}

// Prayers Hooks
export const usePrayersQuery = (category?: string) => {
  return useQuery({
    queryKey: queryKeys.prayers(category),
    queryFn: () => api.getPrayers(category)
  })
}

// Newsletter Hook
export const useNewsletterMutation = () => {
  const addNotification = useChurchStore((state: any) => state.actions.addNotification)

  return useMutation({
    mutationFn: api.subscribeNewsletter,
    onSuccess: (data) => {
      addNotification({
        type: 'success',
        message: data.message || 'Successfully subscribed to newsletter',
        dismissible: true
      })
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Failed to subscribe to newsletter',
        dismissible: true
      })
    }
  })
}

// Contact Form Hook
export const useContactMutation = () => {
  const addNotification = useChurchStore((state: any) => state.actions.addNotification)

  return useMutation({
    mutationFn: api.submitContactForm,
    onSuccess: (data) => {
      addNotification({
        type: 'success',
        message: data.message || 'Message sent successfully',
        dismissible: true
      })
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Failed to send message',
        dismissible: true
      })
    }
  })
}

// Utility Hooks
export const useOptimisticUpdate = <T>(
  queryKey: readonly unknown[],
  updateFn: (old: T | undefined, newData: Partial<T>) => T
) => {
  const queryClient = useQueryClient()

  return (newData: Partial<T>) => {
    queryClient.setQueryData(queryKey, (old: T | undefined) =>
      updateFn(old, newData)
    )
  }
}

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () => queryClient.invalidateQueries(),
    invalidateMassTimes: () => queryClient.invalidateQueries({ queryKey: queryKeys.massTimes }),
    invalidateEvents: () => queryClient.invalidateQueries({ queryKey: queryKeys.events }),
    invalidateNews: () => queryClient.invalidateQueries({ queryKey: queryKeys.news }),
    invalidatePrayers: () => queryClient.invalidateQueries({ queryKey: queryKeys.prayers() })
  }
}