// CMS DATA SOURCE: React Context for deep data passing following React official patterns
// Based on React docs Context API pattern for avoiding prop drilling

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChurchEntity } from '@/lib/church-data-model';
import { useCMSContent, useCMSImages, useParishGroups, useMassServices } from '@/hooks/useChurchData';
import type { WebsiteSettings } from '@/lib/cms-data';

// CMS DATA SOURCE: Simple context exactly matching React docs pattern
const ChurchDataContext = createContext<WebsiteSettings | null>(null);

// CMS DATA SOURCE: Simple provider exactly matching React docs pattern
export function ChurchDataProvider({ children }: { children: ReactNode }) {
  const cmsContent = useCMSContent();
  
  return (
    <ChurchDataContext.Provider value={cmsContent}>
      {children}
    </ChurchDataContext.Provider>
  );
}

// CMS DATA SOURCE: Simple hook exactly matching React docs pattern
export function useChurchDataContext(): WebsiteSettings | null {
  const context = useContext(ChurchDataContext);
  return context;
}