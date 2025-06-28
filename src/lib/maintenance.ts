import { GetServerSidePropsContext } from 'next';
import { getWebsiteSettings } from './cms-data';

export function checkMaintenanceMode() {
  try {
    const settings = getWebsiteSettings();
    return settings?.website?.maintenanceMode || false;
  } catch (error) {
    console.error('Error checking maintenance mode:', error);
    return false;
  }
}

export function withMaintenanceCheck<T = any>(
  getServerSidePropsFunc?: (context: GetServerSidePropsContext) => Promise<{ props: T }>
) {
  return async (context: GetServerSidePropsContext) => {
    // Skip maintenance check for admin pages
    if (context.req.url?.startsWith('/admin')) {
      if (getServerSidePropsFunc) {
        return await getServerSidePropsFunc(context);
      }
      return { props: {} as T };
    }

    // Check if maintenance mode is enabled
    const maintenanceMode = checkMaintenanceMode();
    
    if (maintenanceMode) {
      return {
        redirect: {
          destination: '/maintenance',
          permanent: false,
        },
      };
    }

    // If no maintenance mode, proceed with original function or return empty props
    if (getServerSidePropsFunc) {
      return await getServerSidePropsFunc(context);
    }
    
    return { props: {} as T };
  };
}

// Default export for pages that don't need custom props
export const defaultMaintenanceCheck = withMaintenanceCheck();