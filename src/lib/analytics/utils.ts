// Analytics Utility Functions

import { DeviceInfo, PageView, TimeRange } from './types';

/**
 * Create a privacy-preserving visitor ID hash
 */
export function hashVisitorId(ip: string, userAgent: string): string {
  // Simple hash function (not cryptographic, but sufficient for analytics)
  const str = `${ip}:${userAgent}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Parse User-Agent string to extract device info
 */
export function parseUserAgent(ua: string): DeviceInfo {
  const lowerUA = ua.toLowerCase();

  // Detect browser
  let browser = 'Other';
  if (lowerUA.includes('edg/') || lowerUA.includes('edge')) {
    browser = 'Edge';
  } else if (lowerUA.includes('chrome') && !lowerUA.includes('chromium')) {
    browser = 'Chrome';
  } else if (lowerUA.includes('safari') && !lowerUA.includes('chrome')) {
    browser = 'Safari';
  } else if (lowerUA.includes('firefox')) {
    browser = 'Firefox';
  } else if (lowerUA.includes('opera') || lowerUA.includes('opr/')) {
    browser = 'Opera';
  }

  // Detect OS
  let os = 'Other';
  if (lowerUA.includes('windows')) {
    os = 'Windows';
  } else if (lowerUA.includes('mac os') || lowerUA.includes('macos')) {
    os = 'macOS';
  } else if (lowerUA.includes('linux') && !lowerUA.includes('android')) {
    os = 'Linux';
  } else if (lowerUA.includes('android')) {
    os = 'Android';
  } else if (lowerUA.includes('iphone') || lowerUA.includes('ipad') || lowerUA.includes('ipod')) {
    os = 'iOS';
  }

  // Detect device type
  let device: DeviceInfo['device'] = 'desktop';
  if (lowerUA.includes('mobile') || lowerUA.includes('android') && !lowerUA.includes('tablet')) {
    device = 'mobile';
  } else if (lowerUA.includes('tablet') || lowerUA.includes('ipad')) {
    device = 'tablet';
  }

  return { browser, os, device };
}

/**
 * Sanitize path for safe storage
 */
export function sanitizePath(path: string): string {
  // Remove query params and hash
  let clean = path.split('?')[0].split('#')[0];

  // Normalize trailing slashes
  if (clean !== '/' && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }

  return clean || '/';
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get date range based on time range string
 */
export function getDateRange(range: TimeRange): { start: number; end: number } {
  const end = Date.now();
  const day = 24 * 60 * 60 * 1000;

  let start: number;
  switch (range) {
    case '7d':
      start = end - (7 * day);
      break;
    case '30d':
      start = end - (30 * day);
      break;
    case '90d':
      start = end - (90 * day);
      break;
    case 'all':
    default:
      start = 0;
      break;
  }

  return { start, end };
}

/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toISOString().split('T')[0];
}

/**
 * Get domain from referrer URL
 */
export function getReferrerDomain(referrer: string): string {
  if (!referrer) return 'Direct';

  try {
    const url = new URL(referrer);
    return url.hostname.replace('www.', '');
  } catch {
    return 'Unknown';
  }
}

/**
 * Check if referrer is from same site
 */
export function isSelfReferral(referrer: string, currentHost?: string): boolean {
  if (!referrer) return false;

  try {
    const url = new URL(referrer);
    const host = currentHost || (typeof window !== 'undefined' ? window.location.hostname : '');
    return url.hostname.includes(host) || host.includes(url.hostname);
  } catch {
    return false;
  }
}

/**
 * Convert page views to CSV format
 */
export function toCSV(pageViews: PageView[]): string {
  const headers = ['Date', 'Time', 'Path', 'Referrer', 'Country', 'Device', 'Browser', 'OS'];
  const rows = pageViews.map(pv => {
    const date = new Date(pv.timestamp);
    return [
      formatDate(pv.timestamp),
      date.toTimeString().split(' ')[0],
      pv.path,
      getReferrerDomain(pv.referrer),
      pv.country,
      pv.device,
      pv.browser,
      pv.os
    ].map(val => `"${String(val).replace(/"/g, '""')}"`).join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Format number with K/M suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

/**
 * Calculate percentage
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}
