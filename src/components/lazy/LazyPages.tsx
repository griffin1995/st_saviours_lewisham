// CMS DATA SOURCE: Lazy-loaded pages following React official documentation patterns
// Based on React docs lazy function for page-level code splitting

import { lazy } from 'react';

// CMS DATA SOURCE: Lazy-loaded page components following React official lazy pattern
// IMPORTANT: Declared at top-level outside components as per React docs

// Main content pages
export const LazyAboutUsPage = lazy(() => import('@/pages/about-us'));
export const LazyContactUsPage = lazy(() => import('@/pages/contact-us'));
export const LazyGalleryPage = lazy(() => import('@/pages/gallery'));
export const LazyNewsPage = lazy(() => import('@/pages/news'));
export const LazyParishGroupsPage = lazy(() => import('@/pages/parish-groups'));
export const LazyStreamingPage = lazy(() => import('@/pages/streaming'));
export const LazyVenueHirePage = lazy(() => import('@/pages/venue-hire'));
export const LazyPodcastsPage = lazy(() => import('@/pages/podcasts'));
export const LazyDonatePage = lazy(() => import('@/pages/donate'));
export const LazyFindUsPage = lazy(() => import('@/pages/find-us'));

// Sacrament pages
export const LazyTheSacramentsPage = lazy(() => import('@/pages/the-sacraments'));
export const LazyBaptismPage = lazy(() => import('@/pages/the-sacraments/baptism'));
export const LazyConfirmationPage = lazy(() => import('@/pages/the-sacraments/confirmation'));
export const LazyTheEucharistPage = lazy(() => import('@/pages/the-sacraments/the-eucharist'));
export const LazyConfessionPage = lazy(() => import('@/pages/the-sacraments/confession'));
export const LazyAnointingOfTheSickPage = lazy(() => import('@/pages/the-sacraments/anointing-of-the-sick'));
export const LazyHolyOrdersPage = lazy(() => import('@/pages/the-sacraments/holy-orders'));
export const LazyMatrimonyPage = lazy(() => import('@/pages/the-sacraments/matrimony'));

// Policy pages
export const LazyPrivacyPolicyPage = lazy(() => import('@/pages/privacy-policy'));
export const LazyCookiePolicyPage = lazy(() => import('@/pages/cookie-policy'));
export const LazyAccessibilityStatementPage = lazy(() => import('@/pages/accessibility-statement'));

// Mass times page
export const LazyMassPage = lazy(() => import('@/pages/mass'));