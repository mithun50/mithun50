// Analytics Tracking Logic

import { PageView, TrackingPayload } from './types';
import { hashVisitorId, parseUserAgent, sanitizePath, generateId } from './utils';
import { addPageView, updateTimeOnPage } from './store';

interface TrackingContext {
  ip: string;
  userAgent: string;
  country: string;
}

/**
 * Track a page view
 */
export async function trackPageView(
  payload: TrackingPayload,
  context: TrackingContext
): Promise<void> {
  const { ip, userAgent, country } = context;
  const deviceInfo = parseUserAgent(userAgent);
  const visitorId = hashVisitorId(ip, userAgent);
  const path = sanitizePath(payload.path);

  // Handle exit tracking (update time on page)
  if (payload.isExit && payload.timeOnPage) {
    await updateTimeOnPage(payload.sessionId, path, payload.timeOnPage);
    return;
  }

  // Create page view record
  const pageView: PageView = {
    id: generateId(),
    path,
    timestamp: Date.now(),
    referrer: payload.referrer || '',
    country: country || 'Unknown',
    device: deviceInfo.device,
    browser: deviceInfo.browser,
    os: deviceInfo.os,
    sessionId: payload.sessionId,
    visitorId,
    timeOnPage: payload.timeOnPage,
  };

  await addPageView(pageView);
}

/**
 * Extract tracking context from request headers
 */
export function extractContext(headers: Headers): TrackingContext {
  // Get IP from various headers (different platforms use different headers)
  const ip =
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') || // Cloudflare
    'unknown';

  const userAgent = headers.get('user-agent') || '';

  // Get country from platform-specific headers
  const country =
    headers.get('x-vercel-ip-country') || // Vercel
    headers.get('cf-ipcountry') || // Cloudflare
    headers.get('x-country') || // Custom/Netlify
    'Unknown';

  return { ip, userAgent, country };
}
