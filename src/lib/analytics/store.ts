// In-Memory Analytics Store with optional file persistence

import { PageView, AnalyticsStore, AnalyticsStats, TimeRange } from './types';
import { getDateRange, formatDate, getReferrerDomain, percentage } from './utils';

// In-memory store (survives within same process/warm instance)
let analyticsData: AnalyticsStore = {
  pageViews: [],
  uniqueVisitors: [],
  lastUpdated: Date.now(),
};

// Write counter for periodic file sync
let writeCount = 0;
const SYNC_INTERVAL = 50; // Sync every 50 writes
const MAX_PAGEVIEWS = 10000; // Keep last 10k page views
const MAX_AGE_DAYS = 90; // Keep data for 90 days

/**
 * Try to load data from file (works on VPS, fails silently on serverless)
 */
async function loadFromFile(): Promise<void> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'analytics-data.json');

    const data = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(data) as AnalyticsStore;

    // Merge with existing in-memory data (in case of concurrent loads)
    analyticsData = {
      pageViews: [...parsed.pageViews, ...analyticsData.pageViews],
      uniqueVisitors: [...new Set([...parsed.uniqueVisitors, ...analyticsData.uniqueVisitors])],
      lastUpdated: Date.now(),
    };

    // Deduplicate page views by ID
    const seen = new Set<string>();
    analyticsData.pageViews = analyticsData.pageViews.filter(pv => {
      if (seen.has(pv.id)) return false;
      seen.add(pv.id);
      return true;
    });

    console.log('[Analytics] Loaded from file:', analyticsData.pageViews.length, 'page views');
  } catch {
    // File doesn't exist or can't be read - that's okay
    console.log('[Analytics] No existing data file, starting fresh');
  }
}

/**
 * Try to save data to file (works on VPS, fails silently on serverless)
 */
async function saveToFile(): Promise<void> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'analytics-data.json');

    await fs.writeFile(filePath, JSON.stringify(analyticsData, null, 2), 'utf-8');
    console.log('[Analytics] Saved to file:', analyticsData.pageViews.length, 'page views');
  } catch (error) {
    // Can't write file (read-only filesystem on serverless) - that's okay
    console.log('[Analytics] Could not save to file (likely serverless):', error);
  }
}

/**
 * Clean up old data
 */
function cleanup(): void {
  const cutoff = Date.now() - (MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

  // Remove old page views
  analyticsData.pageViews = analyticsData.pageViews
    .filter(pv => pv.timestamp > cutoff)
    .slice(-MAX_PAGEVIEWS); // Keep only last N

  // Clean up visitors (keep those with recent activity)
  const activeVisitors = new Set(
    analyticsData.pageViews.map(pv => pv.visitorId)
  );
  analyticsData.uniqueVisitors = analyticsData.uniqueVisitors.filter(
    v => activeVisitors.has(v)
  );
}

/**
 * Initialize store (load from file if available)
 */
let initialized = false;
export async function initStore(): Promise<void> {
  if (initialized) return;
  initialized = true;
  await loadFromFile();
  cleanup();
}

/**
 * Add a page view
 */
export async function addPageView(pageView: PageView): Promise<void> {
  await initStore();

  analyticsData.pageViews.push(pageView);

  // Track unique visitors
  if (!analyticsData.uniqueVisitors.includes(pageView.visitorId)) {
    analyticsData.uniqueVisitors.push(pageView.visitorId);
  }

  analyticsData.lastUpdated = Date.now();
  writeCount++;

  // Periodic sync to file
  if (writeCount >= SYNC_INTERVAL) {
    writeCount = 0;
    cleanup();
    await saveToFile();
  }
}

/**
 * Update time on page for a session
 */
export async function updateTimeOnPage(
  sessionId: string,
  path: string,
  timeOnPage: number
): Promise<void> {
  await initStore();

  // Find the most recent page view for this session and path
  for (let i = analyticsData.pageViews.length - 1; i >= 0; i--) {
    const pv = analyticsData.pageViews[i];
    if (pv.sessionId === sessionId && pv.path === path && !pv.timeOnPage) {
      pv.timeOnPage = timeOnPage;
      break;
    }
  }
}

/**
 * Get analytics stats for a time range
 */
export async function getStats(range: TimeRange): Promise<AnalyticsStats> {
  await initStore();

  const { start, end } = getDateRange(range);

  // Filter page views by time range
  const filtered = analyticsData.pageViews.filter(
    pv => pv.timestamp >= start && pv.timestamp <= end
  );

  // Calculate overview stats
  const totalPageViews = filtered.length;
  const uniqueVisitorIds = new Set(filtered.map(pv => pv.visitorId));
  const uniqueVisitors = uniqueVisitorIds.size;

  const timesOnPage = filtered.filter(pv => pv.timeOnPage).map(pv => pv.timeOnPage!);
  const averageTimeOnPage = timesOnPage.length > 0
    ? Math.round(timesOnPage.reduce((a, b) => a + b, 0) / timesOnPage.length)
    : 0;

  // Calculate bounce rate (sessions with only 1 page view)
  const sessionCounts: Record<string, number> = {};
  filtered.forEach(pv => {
    sessionCounts[pv.sessionId] = (sessionCounts[pv.sessionId] || 0) + 1;
  });
  const totalSessions = Object.keys(sessionCounts).length;
  const bounceSessions = Object.values(sessionCounts).filter(c => c === 1).length;
  const bounceRate = totalSessions > 0 ? Math.round((bounceSessions / totalSessions) * 100) : 0;

  // Page views by path
  const pathCounts: Record<string, number> = {};
  filtered.forEach(pv => {
    pathCounts[pv.path] = (pathCounts[pv.path] || 0) + 1;
  });
  const pageViews = Object.entries(pathCounts)
    .map(([path, views]) => ({
      path,
      views,
      percentage: percentage(views, totalPageViews),
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const topPage = pageViews[0]?.path || '/';

  // Referrers
  const referrerCounts: Record<string, number> = {};
  filtered.forEach(pv => {
    const domain = getReferrerDomain(pv.referrer);
    referrerCounts[domain] = (referrerCounts[domain] || 0) + 1;
  });
  const referrers = Object.entries(referrerCounts)
    .map(([source, count]) => ({
      source,
      count,
      percentage: percentage(count, totalPageViews),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Device breakdown
  const browsers: Record<string, number> = {};
  const operatingSystems: Record<string, number> = {};
  const deviceTypes: Record<string, number> = {};

  filtered.forEach(pv => {
    browsers[pv.browser] = (browsers[pv.browser] || 0) + 1;
    operatingSystems[pv.os] = (operatingSystems[pv.os] || 0) + 1;
    deviceTypes[pv.device] = (deviceTypes[pv.device] || 0) + 1;
  });

  // Countries
  const countryCounts: Record<string, number> = {};
  filtered.forEach(pv => {
    const country = pv.country || 'Unknown';
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });
  const countries = Object.entries(countryCounts)
    .map(([country, count]) => ({
      country,
      count,
      percentage: percentage(count, totalPageViews),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Timeline (daily breakdown)
  const dailyCounts: Record<string, { views: number; visitors: Set<string> }> = {};
  filtered.forEach(pv => {
    const date = formatDate(pv.timestamp);
    if (!dailyCounts[date]) {
      dailyCounts[date] = { views: 0, visitors: new Set() };
    }
    dailyCounts[date].views++;
    dailyCounts[date].visitors.add(pv.visitorId);
  });

  const timeline = Object.entries(dailyCounts)
    .map(([date, data]) => ({
      date,
      pageViews: data.views,
      uniqueVisitors: data.visitors.size,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    overview: {
      totalPageViews,
      uniqueVisitors,
      averageTimeOnPage,
      bounceRate,
      topPage,
    },
    pageViews,
    referrers,
    devices: {
      browsers,
      operatingSystems,
      deviceTypes,
    },
    countries,
    timeline,
  };
}

/**
 * Get raw page views for export
 */
export async function getPageViews(range: TimeRange): Promise<PageView[]> {
  await initStore();

  const { start, end } = getDateRange(range);

  return analyticsData.pageViews
    .filter(pv => pv.timestamp >= start && pv.timestamp <= end)
    .sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Force save to file
 */
export async function forceSave(): Promise<void> {
  cleanup();
  await saveToFile();
}
