import { create } from 'zustand'
import { subscribeWithSelector, devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Types
interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  preferences: {
    language: 'en' | 'es' | 'fr' | 'pl'
    newsletter: boolean
    notifications: boolean
    massReminders: boolean
  }
  memberSince: string
}

interface MassTimes {
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

interface Event {
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

interface Prayer {
  id: string
  text: string
  category: 'morning' | 'evening' | 'mealtime' | 'special'
  language: string
  audioUrl?: string
  isFavorite: boolean
}

interface NavigationState {
  isOpen: boolean
  activeDropdown: string | null
  scrollPosition: number
  isScrolled: boolean
}

interface UIState {
  theme: 'light' | 'dark' | 'auto'
  reducedMotion: boolean
  fontSize: 'small' | 'medium' | 'large'
  contrastMode: boolean
  isLoading: boolean
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    timestamp: number
    dismissible: boolean
  }>
}

interface ChurchState {
  // User State
  user: User | null
  isAuthenticated: boolean
  
  // Content State
  massTimes: MassTimes
  events: Event[]
  prayers: Prayer[]
  lastSync: number
  
  // UI State
  navigation: NavigationState
  ui: UIState
  
  // Actions
  actions: {
    // User Actions
    setUser: (user: User | null) => void
    updateUserPreferences: (preferences: Partial<User['preferences']>) => void
    logout: () => void
    
    // Content Actions
    updateMassTimes: (massTimes: Partial<MassTimes>) => void
    addEvent: (event: Event) => void
    updateEvent: (id: string, updates: Partial<Event>) => void
    removeEvent: (id: string) => void
    togglePrayerFavorite: (id: string) => void
    
    // Navigation Actions
    setNavigationOpen: (isOpen: boolean) => void
    setActiveDropdown: (dropdown: string | null) => void
    updateScrollPosition: (position: number) => void
    
    // UI Actions
    setTheme: (theme: UIState['theme']) => void
    toggleReducedMotion: () => void
    setFontSize: (size: UIState['fontSize']) => void
    toggleContrastMode: () => void
    setLoading: (isLoading: boolean) => void
    addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void
    removeNotification: (id: string) => void
    
    // Data Actions
    syncData: () => Promise<void>
    resetStore: () => void
  }
}

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  
  massTimes: {
    sunday: ['8:00 AM', '10:00 AM', '12:00 PM', '6:00 PM'],
    weekday: ['7:00 AM', '9:00 AM', '12:15 PM'],
    saturday: ['9:00 AM', '6:00 PM (Vigil)'],
    special: []
  },
  
  events: [],
  prayers: [],
  lastSync: 0,
  
  navigation: {
    isOpen: false,
    activeDropdown: null,
    scrollPosition: 0,
    isScrolled: false
  },
  
  ui: {
    theme: 'auto' as const,
    reducedMotion: false,
    fontSize: 'medium' as const,
    contrastMode: false,
    isLoading: false,
    notifications: []
  }
}

// Store Creation with Multiple Middleware
export const useChurchStore = create<ChurchState>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((set, get) => ({
          ...initialState,
          
          actions: {
            // User Actions
            setUser: (user) => 
              set((state) => {
                state.user = user
                state.isAuthenticated = !!user
              }),
            
            updateUserPreferences: (preferences) =>
              set((state) => {
                if (state.user) {
                  state.user.preferences = { ...state.user.preferences, ...preferences }
                }
              }),
            
            logout: () =>
              set((state) => {
                state.user = null
                state.isAuthenticated = false
              }),
            
            // Content Actions
            updateMassTimes: (massTimes) =>
              set((state) => {
                state.massTimes = { ...state.massTimes, ...massTimes }
                state.lastSync = Date.now()
              }),
            
            addEvent: (event) =>
              set((state) => {
                state.events.push(event)
              }),
            
            updateEvent: (id, updates) =>
              set((state) => {
                const eventIndex = state.events.findIndex(e => e.id === id)
                if (eventIndex !== -1) {
                  state.events[eventIndex] = { ...state.events[eventIndex], ...updates }
                }
              }),
            
            removeEvent: (id) =>
              set((state) => {
                state.events = state.events.filter(e => e.id !== id)
              }),
            
            togglePrayerFavorite: (id) =>
              set((state) => {
                const prayer = state.prayers.find(p => p.id === id)
                if (prayer) {
                  prayer.isFavorite = !prayer.isFavorite
                }
              }),
            
            // Navigation Actions
            setNavigationOpen: (isOpen) =>
              set((state) => {
                state.navigation.isOpen = isOpen
                if (!isOpen) {
                  state.navigation.activeDropdown = null
                }
              }),
            
            setActiveDropdown: (dropdown) =>
              set((state) => {
                state.navigation.activeDropdown = dropdown
              }),
            
            updateScrollPosition: (position) =>
              set((state) => {
                state.navigation.scrollPosition = position
                state.navigation.isScrolled = position > 100
              }),
            
            // UI Actions
            setTheme: (theme) =>
              set((state) => {
                state.ui.theme = theme
              }),
            
            toggleReducedMotion: () =>
              set((state) => {
                state.ui.reducedMotion = !state.ui.reducedMotion
              }),
            
            setFontSize: (size) =>
              set((state) => {
                state.ui.fontSize = size
              }),
            
            toggleContrastMode: () =>
              set((state) => {
                state.ui.contrastMode = !state.ui.contrastMode
              }),
            
            setLoading: (isLoading) =>
              set((state) => {
                state.ui.isLoading = isLoading
              }),
            
            addNotification: (notification) =>
              set((state) => {
                // Ensure notifications array exists
                if (!state.ui.notifications) {
                  state.ui.notifications = []
                }
                
                const id = Math.random().toString(36).substr(2, 9)
                const timestamp = Date.now()
                state.ui.notifications.push({
                  ...notification,
                  id,
                  timestamp
                })
                
                // Auto-remove after 5 seconds for dismissible notifications
                if (notification.dismissible !== false) {
                  setTimeout(() => {
                    get().actions.removeNotification(id)
                  }, 5000)
                }
              }),
            
            removeNotification: (id) =>
              set((state) => {
                // Ensure notifications array exists
                if (!state.ui.notifications) {
                  state.ui.notifications = []
                }
                state.ui.notifications = state.ui.notifications.filter(n => n.id !== id)
              }),
            
            // Data Actions
            syncData: async () => {
              set((state) => {
                state.ui.isLoading = true
              })
              
              try {
                // Simulate API calls
                const [massTimesRes, eventsRes] = await Promise.all([
                  fetch('/api/mass-times'),
                  fetch('/api/events')
                ])
                
                if (massTimesRes.ok) {
                  const massTimes = await massTimesRes.json()
                  get().actions.updateMassTimes(massTimes)
                }
                
                if (eventsRes.ok) {
                  const events = await eventsRes.json()
                  set((state) => {
                    state.events = events
                    state.lastSync = Date.now()
                  })
                }
                
                get().actions.addNotification({
                  type: 'success',
                  message: 'Data synchronized successfully',
                  dismissible: true
                })
                
              } catch (error) {
                get().actions.addNotification({
                  type: 'error',
                  message: 'Failed to sync data',
                  dismissible: true
                })
              } finally {
                set((state) => {
                  state.ui.isLoading = false
                })
              }
            },
            
            resetStore: () =>
              set(() => ({ ...initialState, actions: get().actions }))
          }
        }))
      ),
      {
        name: 'st-saviours-store',
        partialize: (state) => ({
          user: state.user,
          ui: {
            theme: state.ui.theme,
            reducedMotion: state.ui.reducedMotion,
            fontSize: state.ui.fontSize,
            contrastMode: state.ui.contrastMode,
            // Always ensure notifications array exists
            notifications: []
          },
          massTimes: state.massTimes,
          lastSync: state.lastSync
        }),
        onRehydrateStorage: () => (state) => {
          // Ensure critical arrays are always initialized after rehydration
          if (state) {
            if (!state.ui.notifications) {
              state.ui.notifications = []
            }
            if (!state.events) {
              state.events = []
            }
            if (!state.prayers) {
              state.prayers = []
            }
            // Ensure isLoading is always false after rehydration
            state.ui.isLoading = false
          }
        }
      }
    ),
    {
      name: 'St Saviours Church Store'
    }
  )
)

// Selector Hooks for Performance
export const useUser = () => useChurchStore((state) => state.user)
export const useIsAuthenticated = () => useChurchStore((state) => state.isAuthenticated)
export const useMassTimes = () => useChurchStore((state) => state.massTimes)
export const useEvents = () => useChurchStore((state) => state.events)
export const useNavigation = () => useChurchStore((state) => state.navigation)
export const useUI = () => useChurchStore((state) => state.ui)
export const useActions = () => useChurchStore((state) => state.actions)

// Computed Selectors
export const useUpcomingEvents = () => 
  useChurchStore((state) => 
    state.events
      .filter(event => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)
  )

export const useFavoritePrayers = () =>
  useChurchStore((state) => state.prayers.filter(prayer => prayer.isFavorite))

export const useNotifications = () =>
  useChurchStore((state) => state.ui.notifications)

// Theme Subscription
export const subscribeToTheme = (callback: (theme: UIState['theme']) => void) =>
  useChurchStore.subscribe(
    (state) => state.ui.theme,
    callback
  )

// Auto-sync on app start
if (typeof window !== 'undefined') {
  // Sync data every 5 minutes
  setInterval(() => {
    const { actions } = useChurchStore.getState()
    actions.syncData()
  }, 5 * 60 * 1000)
  
  // Handle scroll position
  window.addEventListener('scroll', () => {
    const { actions } = useChurchStore.getState()
    actions.updateScrollPosition(window.scrollY)
  })
}