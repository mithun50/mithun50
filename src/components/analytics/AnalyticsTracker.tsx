'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Get or create a session ID
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analytics_session');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('analytics_session', sessionId);
  }
  return sessionId;
}

/**
 * Track page view via API
 */
async function trackPageView(data: Record<string, unknown>): Promise<void> {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    // Silently fail - analytics should never break the site
    console.debug('[Analytics] Tracking failed:', error);
  }
}

/**
 * Track exit via sendBeacon (more reliable for page unload)
 */
function trackExit(data: Record<string, unknown>): void {
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/track', JSON.stringify(data));
    }
  } catch {
    // Silently fail
  }
}

/**
 * Analytics Tracker Component
 * Automatically tracks page views on route changes
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const lastPathRef = useRef<string>('');
  const isFirstMount = useRef<boolean>(true);

  useEffect(() => {
    // Skip tracking in development
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    // Skip admin pages from being tracked
    if (pathname.startsWith('/admin')) {
      return;
    }

    // Skip if same path (prevents double tracking on mount)
    if (pathname === lastPathRef.current && !isFirstMount.current) {
      return;
    }

    isFirstMount.current = false;

    // Track time on previous page before navigating
    if (lastPathRef.current && lastPathRef.current !== pathname) {
      const timeOnPage = Date.now() - startTimeRef.current;
      trackExit({
        path: lastPathRef.current,
        timeOnPage,
        sessionId: getSessionId(),
        isExit: true,
      });
    }

    // Reset timer for new page
    startTimeRef.current = Date.now();
    lastPathRef.current = pathname;

    // Track new page view
    trackPageView({
      path: pathname,
      referrer: document.referrer,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      sessionId: getSessionId(),
    });

    // Handle page unload
    const handleUnload = () => {
      const timeOnPage = Date.now() - startTimeRef.current;
      trackExit({
        path: pathname,
        timeOnPage,
        sessionId: getSessionId(),
        isExit: true,
      });
    };

    // Handle visibility change (user switches tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const timeOnPage = Date.now() - startTimeRef.current;
        trackExit({
          path: pathname,
          timeOnPage,
          sessionId: getSessionId(),
          isExit: true,
        });
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);

  // This component renders nothing
  return null;
}
