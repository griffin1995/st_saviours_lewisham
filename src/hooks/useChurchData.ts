// CMS DATA SOURCE: Custom hooks for church data following React official patterns
// Based on React docs useData pattern for ergonomic data fetching

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ChurchEntity, 
  getChurchEntity, 
  getChurchChildren, 
  getAllChurchEntitiesByType,
  getChurchPath,
  churchStructure 
} from '@/lib/church-data-model';
import { getCMSContent } from '@/lib/cms-content';
import { getCMSImages } from '@/lib/cms-images';
import type { WebsiteSettings } from '@/lib/cms-data';

// CMS DATA SOURCE: Cache for data fetching following React patterns
const cache = new Map<string, any>();

// CMS DATA SOURCE: Generic data fetching hook exactly matching React docs useData pattern
export function useData<T>(key: string | null, fetcher: () => T | Promise<T>): T | null {
  const [data, setData] = useState<T | null>(null);
  
  useEffect(() => {
    if (!key) {
      setData(null);
      return;
    }

    // Check cache first - following React docs caching pattern
    if (cache.has(key)) {
      setData(cache.get(key));
      return;
    }

    let ignore = false;
    
    const fetchData = async () => {
      const result = await fetcher();
      if (!ignore) {
        cache.set(key, result);
        setData(result);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [key]);

  return data;
}

// CMS DATA SOURCE: Church entity data hook
export function useChurchEntity(entityId: string | null) {
  return useData(
    entityId ? `church-entity-${entityId}` : null,
    () => {
      if (!entityId) return null;
      return getChurchEntity(entityId) || null;
    }
  );
}

// CMS DATA SOURCE: Church children data hook
export function useChurchChildren(parentId: string | null) {
  return useData(
    parentId ? `church-children-${parentId}` : null,
    () => {
      if (!parentId) return [];
      return getChurchChildren(parentId);
    }
  );
}

// CMS DATA SOURCE: Church entities by type hook
export function useChurchEntitiesByType(type: ChurchEntity['type'] | null) {
  return useData(
    type ? `church-entities-${type}` : null,
    () => {
      if (!type) return [];
      return getAllChurchEntitiesByType(type);
    }
  );
}

// CMS DATA SOURCE: Church path (breadcrumb) hook
export function useChurchPath(entityId: string | null) {
  return useData(
    entityId ? `church-path-${entityId}` : null,
    () => {
      if (!entityId) return [];
      return getChurchPath(entityId);
    }
  );
}

// CMS DATA SOURCE: CMS content hook following React patterns
export function useCMSContent() {
  return useData(
    'cms-content',
    () => getCMSContent()
  );
}

// CMS DATA SOURCE: CMS images hook
export function useCMSImages() {
  return useData(
    'cms-images',
    () => getCMSImages()
  );
}

// CMS DATA SOURCE: Parish groups with filtering and search
export function useParishGroups(filters?: {
  ageGroup?: string;
  schedule?: string;
  ministry?: string;
  searchTerm?: string;
}) {
  const groups = useData(
    'parish-groups-all',
    () => getAllChurchEntitiesByType('group')
  );

  return useMemo(() => {
    if (!groups || !filters) return groups;

    return groups.filter(group => {
      // Age group filter
      if (filters.ageGroup && group.metadata?.ageGroup) {
        const groupAge = group.metadata.ageGroup.toLowerCase();
        const filterAge = filters.ageGroup.toLowerCase();
        if (!groupAge.includes(filterAge)) return false;
      }

      // Schedule filter
      if (filters.schedule && group.metadata?.schedule?.day) {
        const groupDay = group.metadata.schedule.day.toLowerCase();
        const filterDay = filters.schedule.toLowerCase();
        if (!groupDay.includes(filterDay)) return false;
      }

      // Ministry filter (parent check)
      if (filters.ministry && group.parentId) {
        const parent = getChurchEntity(group.parentId);
        if (!parent || !parent.title.toLowerCase().includes(filters.ministry.toLowerCase())) {
          return false;
        }
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const titleMatch = group.title.toLowerCase().includes(searchLower);
        const descMatch = group.description?.toLowerCase().includes(searchLower);
        const reqMatch = group.metadata?.requirements?.some(req => 
          req.toLowerCase().includes(searchLower)
        );
        
        if (!titleMatch && !descMatch && !reqMatch) return false;
      }

      return true;
    });
  }, [groups, filters]);
}

// CMS DATA SOURCE: Mass times and services hook
export function useMassServices() {
  return useData(
    'mass-services',
    async () => {
      // Simulate API call for Mass times
      // In reality, this would fetch from a CMS or database
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        weekday: [
          { day: 'Monday', time: '7:00 AM', type: 'Mass' },
          { day: 'Tuesday', time: '7:00 AM', type: 'Mass' },
          { day: 'Wednesday', time: '7:00 AM', type: 'Mass' },
          { day: 'Thursday', time: '7:00 AM', type: 'Mass' },
          { day: 'Friday', time: '7:00 AM', type: 'Mass' },
          { day: 'Saturday', time: '10:00 AM', type: 'Mass' }
        ],
        weekend: [
          { day: 'Saturday', time: '6:00 PM', type: 'Vigil Mass' },
          { day: 'Sunday', time: '8:00 AM', type: 'Mass' },
          { day: 'Sunday', time: '10:30 AM', type: 'Parish Mass' },
          { day: 'Sunday', time: '6:00 PM', type: 'Evening Mass' }
        ],
        special: [
          { day: 'Holy Days', time: 'As announced', type: 'Mass' },
          { day: 'Confessions', time: 'Saturday 5:15-5:45 PM', type: 'Sacrament' },
          { day: 'Adoration', time: 'First Friday 7:30 PM', type: 'Devotion' }
        ]
      };
    }
  );
}

// CMS DATA SOURCE: Events and announcements hook
export function useParishEvents(limit?: number) {
  return useData(
    limit ? `parish-events-${limit}` : 'parish-events-all',
    async () => {
      // Simulate API call for events
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const events = [
        {
          id: '1',
          title: 'Lenten Evening Prayer',
          date: '2025-03-15',
          time: '7:00 PM',
          description: 'Join us for special Lenten prayers and reflection',
          category: 'liturgical'
        },
        {
          id: '2',
          title: 'Parish Pilgrimage to Walsingham',
          date: '2025-04-20',
          time: '8:00 AM departure',
          description: 'Annual parish pilgrimage to the Shrine of Our Lady',
          category: 'pilgrimage'
        },
        {
          id: '3',
          title: 'First Holy Communion Preparation',
          date: '2025-02-10',
          time: '11:45 AM',
          description: 'Weekly preparation classes for children',
          category: 'sacraments'
        },
        {
          id: '4',
          title: 'Youth Group Social Evening',
          date: '2025-02-28',
          time: '7:00 PM',
          description: 'Games, pizza, and fellowship for teens',
          category: 'youth'
        }
      ];
      
      return limit ? events.slice(0, limit) : events;
    }
  );
}

// CMS DATA SOURCE: Combined hook for page data
export function usePageData(pageName: string) {
  const cmsContent = useCMSContent();
  const cmsImages = useCMSImages();
  
  return useMemo(() => {
    if (!cmsContent || !cmsImages) return null;
    
    return {
      content: cmsContent,
      images: cmsImages,
      pageImage: cmsImages.pages?.[pageName as keyof typeof cmsImages.pages],
      parish: cmsContent.parish,
      contact: cmsContent.contact,
      social: cmsContent.social,
      features: cmsContent.features
    };
  }, [cmsContent, cmsImages, pageName]);
}

// CMS DATA SOURCE: Invalidate cache utility
export function invalidateCache(key?: string) {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

// CMS DATA SOURCE: Cache management utilities
export function getCacheKeys() {
  return Array.from(cache.keys());
}

export function getCacheSize() {
  return cache.size;
}