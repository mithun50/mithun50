// Analytics TypeScript Types

export interface PageView {
  id: string;
  path: string;
  timestamp: number;
  referrer: string;
  country: string;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  sessionId: string;
  visitorId: string;
  timeOnPage?: number;
}

export interface DeviceInfo {
  browser: string;
  os: string;
  device: 'desktop' | 'mobile' | 'tablet';
}

export interface AnalyticsStore {
  pageViews: PageView[];
  uniqueVisitors: string[];
  lastUpdated: number;
}

export interface OverviewStats {
  totalPageViews: number;
  uniqueVisitors: number;
  averageTimeOnPage: number;
  bounceRate: number;
  topPage: string;
}

export interface PageStats {
  path: string;
  views: number;
  percentage: number;
}

export interface ReferrerStats {
  source: string;
  count: number;
  percentage: number;
}

export interface DeviceStats {
  browsers: Record<string, number>;
  operatingSystems: Record<string, number>;
  deviceTypes: Record<string, number>;
}

export interface CountryStats {
  country: string;
  count: number;
  percentage: number;
}

export interface TimelinePoint {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
}

export interface AnalyticsStats {
  overview: OverviewStats;
  pageViews: PageStats[];
  referrers: ReferrerStats[];
  devices: DeviceStats;
  countries: CountryStats[];
  timeline: TimelinePoint[];
}

export interface TrackingPayload {
  path: string;
  referrer?: string;
  screenWidth?: number;
  screenHeight?: number;
  sessionId: string;
  timeOnPage?: number;
  isExit?: boolean;
}

export type TimeRange = '7d' | '30d' | '90d' | 'all';
export type ExportFormat = 'json' | 'csv';
