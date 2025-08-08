// CMS DATA SOURCE: Lazy-loaded components following React official documentation patterns
// Based on React docs lazy function and dynamic import patterns

import { lazy, Suspense } from 'react';
import { ComponentErrorFallback } from '@/components/shared/error';

// CMS DATA SOURCE: Loading fallback components following React official patterns
export function BasicLoading() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-centre text-white">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg">Loading page...</p>
      </div>
    </div>
  );
}

export function ComponentLoading() {
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-slate-600 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-slate-600 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-slate-600 rounded w-2/3"></div>
    </div>
  );
}

// CMS DATA SOURCE: Lazy-loaded enhanced components following React official lazy pattern
// IMPORTANT: Declared at top-level outside components as per React docs
export const LazyChurchDataDemo = lazy(() => import('@/components/enhanced/ChurchDataDemo'));
export const LazyPerformanceMonitor = lazy(() => import('@/components/enhanced/PerformanceMonitor'));
export const LazyAdvancedAudioPlayer = lazy(() => import('@/components/enhanced/AdvancedAudioPlayer'));
export const LazyEnhancedContactForm = lazy(() => import('@/components/enhanced/EnhancedContactForm'));
export const LazyEnhancedStaffDirectory = lazy(() => import('@/components/enhanced/EnhancedStaffDirectory'));
export const LazyVirtualChurchTour = lazy(() => import('@/components/enhanced/VirtualChurchTour'));
export const LazyLocationAnalytics = lazy(() => import('@/components/enhanced/LocationAnalytics'));
export const LazyLiveOfficeHours = lazy(() => import('@/components/enhanced/LiveOfficeHours').then(module => ({ default: module.LiveOfficeHours })));
export const LazyProgressIndicator = lazy(() => import('@/components/enhanced/ProgressIndicator').then(module => ({ default: module.ProgressIndicator })));
export const LazyPhotoSwipeLightbox = lazy(() => import('@/components/enhanced/PhotoSwipeLightbox').then(module => ({ default: module.PhotoSwipeLightbox })));
export const LazyEnhancedNewsletterForm = lazy(() => import('@/components/enhanced/EnhancedNewsletterForm').then(module => ({ default: module.EnhancedNewsletterForm })));
export const LazyAdvancedSearchSystem = lazy(() => import('@/components/enhanced/AdvancedSearchSystem').then(module => ({ default: module.AdvancedSearchSystem })));
export const LazyArticleBookmarkSystem = lazy(() => import('@/components/enhanced/ArticleBookmarkSystem').then(module => ({ default: module.ArticleBookmarkSystem })));

// CMS DATA SOURCE: Higher-order component wrapper for lazy loading with error boundaries
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

export function LazyWrapper({ children, fallback = <BasicLoading />, errorFallback }: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {errorFallback ? (
        <ComponentErrorFallback />
      ) : (
        children
      )}
    </Suspense>
  );
}

// CMS DATA SOURCE: Page-level lazy wrapper with enhanced loading states
export function LazyPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageLoading />}>
      {children}
    </Suspense>
  );
}

// CMS DATA SOURCE: Component-level lazy wrapper with error boundaries
export function LazyComponentWrapper({ 
  children, 
  componentName = 'component' 
}: { 
  children: React.ReactNode; 
  componentName?: string;
}) {
  return (
    <Suspense fallback={<ComponentLoading />}>
      <ComponentErrorFallback context={componentName} />
      {children}
    </Suspense>
  );
}