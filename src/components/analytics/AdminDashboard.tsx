'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Users,
  Clock,
  MousePointerClick,
  RefreshCw,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import StatsCard from './StatsCard';
import ExportButton from './ExportButton';
import { AnalyticsStats, TimeRange } from '@/lib/analytics/types';

type TabType = 'overview' | 'pages' | 'referrers' | 'devices' | 'countries';

export default function AdminDashboard() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<TimeRange>('7d');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  async function fetchStats() {
    setLoading(true);
    setError('');

    try {
      const password = sessionStorage.getItem('analytics_auth');
      const res = await fetch(`/api/analytics/stats?range=${range}`, {
        headers: { 'x-analytics-password': password || '' },
      });

      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem('analytics_auth');
          window.location.reload();
          return;
        }
        throw new Error('Failed to fetch stats');
      }

      const data = await res.json();
      setStats(data);
    } catch (e) {
      setError('Failed to load analytics data');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, [range]);

  function handleLogout() {
    sessionStorage.removeItem('analytics_auth');
    window.location.reload();
  }

  const rangeOptions: { value: TimeRange; label: string }[] = [
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '90d', label: '90 days' },
    { value: 'all', label: 'All time' },
  ];

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'pages', label: 'Pages' },
    { id: 'referrers', label: 'Referrers' },
    { id: 'devices', label: 'Devices' },
    { id: 'countries', label: 'Countries' },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="p-4 bg-red-500/20 rounded-full w-fit mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Failed to load data</h2>
          <p className="text-white/50 mb-6">{error}</p>
          <button
            onClick={fetchStats}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Analytics Dashboard
              </h1>
              <p className="text-white/40 text-sm mt-0.5">
                Portfolio performance insights
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Time Range Selector */}
              <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
                {rangeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRange(opt.value)}
                    className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all ${
                      range === opt.value
                        ? 'bg-purple-600 text-white'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Refresh */}
              <button
                onClick={fetchStats}
                disabled={loading}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>

              {/* Export */}
              <ExportButton range={range} />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 bg-white/5 hover:bg-red-500/20 rounded-xl text-white/70 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 overflow-x-auto pb-2 -mb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {loading && !stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-white/5 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : stats ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard
                    title="Total Page Views"
                    value={stats.overview.totalPageViews.toLocaleString()}
                    icon={Eye}
                    color="purple"
                    delay={0}
                  />
                  <StatsCard
                    title="Unique Visitors"
                    value={stats.overview.uniqueVisitors.toLocaleString()}
                    icon={Users}
                    color="blue"
                    delay={0.1}
                  />
                  <StatsCard
                    title="Avg. Time on Page"
                    value={`${Math.round(stats.overview.averageTimeOnPage / 1000)}s`}
                    icon={Clock}
                    color="green"
                    delay={0.2}
                  />
                  <StatsCard
                    title="Bounce Rate"
                    value={`${stats.overview.bounceRate}%`}
                    icon={MousePointerClick}
                    color="orange"
                    delay={0.3}
                  />
                </div>

                {/* Timeline Chart Placeholder */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Traffic Over Time
                  </h3>
                  <div className="h-48 flex items-end gap-1">
                    {stats.timeline.slice(-14).map((point, i) => {
                      const maxViews = Math.max(...stats.timeline.map(p => p.pageViews), 1);
                      const height = (point.pageViews / maxViews) * 100;
                      return (
                        <div
                          key={i}
                          className="flex-1 bg-purple-500/30 hover:bg-purple-500/50 rounded-t transition-colors relative group"
                          style={{ height: `${Math.max(height, 5)}%` }}
                        >
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#1a1a1a] px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {point.date}: {point.pageViews} views
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-white/30">
                    <span>{stats.timeline[0]?.date || ''}</span>
                    <span>{stats.timeline[stats.timeline.length - 1]?.date || ''}</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Top Pages */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Top Pages</h3>
                      <button
                        onClick={() => setActiveTab('pages')}
                        className="text-purple-400 text-sm hover:underline flex items-center gap-1"
                      >
                        View all <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {stats.pageViews.slice(0, 5).map((page, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-white/70 truncate max-w-[200px]">
                            {page.path}
                          </span>
                          <span className="text-white font-medium">{page.views}</span>
                        </div>
                      ))}
                      {stats.pageViews.length === 0 && (
                        <p className="text-white/40 text-sm">No data yet</p>
                      )}
                    </div>
                  </div>

                  {/* Top Referrers */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Top Referrers</h3>
                      <button
                        onClick={() => setActiveTab('referrers')}
                        className="text-purple-400 text-sm hover:underline flex items-center gap-1"
                      >
                        View all <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {stats.referrers.slice(0, 5).map((ref, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-white/70 truncate max-w-[200px] flex items-center gap-2">
                            <Globe className="w-3 h-3 text-white/30" />
                            {ref.source}
                          </span>
                          <span className="text-white font-medium">{ref.count}</span>
                        </div>
                      ))}
                      {stats.referrers.length === 0 && (
                        <p className="text-white/40 text-sm">No referrer data yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-lg font-semibold text-white">All Pages</h3>
                  <p className="text-white/40 text-sm mt-1">
                    Page views sorted by popularity
                  </p>
                </div>
                <div className="divide-y divide-white/5">
                  {stats.pageViews.map((page, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white/30 text-sm w-6">{i + 1}</span>
                        <span className="text-white">{page.path}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white/50 text-sm">{page.percentage}%</span>
                        <span className="text-white font-medium">{page.views} views</span>
                      </div>
                    </div>
                  ))}
                  {stats.pageViews.length === 0 && (
                    <p className="text-white/40 text-center py-12">No page data yet</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'referrers' && (
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
                  <p className="text-white/40 text-sm mt-1">
                    Where your visitors come from
                  </p>
                </div>
                <div className="divide-y divide-white/5">
                  {stats.referrers.map((ref, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-white/30" />
                        <span className="text-white">{ref.source}</span>
                        {ref.source !== 'Direct' && (
                          <a
                            href={`https://${ref.source}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/30 hover:text-white/50"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white/50 text-sm">{ref.percentage}%</span>
                        <span className="text-white font-medium">{ref.count} visits</span>
                      </div>
                    </div>
                  ))}
                  {stats.referrers.length === 0 && (
                    <p className="text-white/40 text-center py-12">No referrer data yet</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'devices' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Device Types */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Device Types</h3>
                  <div className="space-y-4">
                    {Object.entries(stats.devices.deviceTypes).map(([device, count]) => {
                      const total = Object.values(stats.devices.deviceTypes).reduce((a, b) => a + b, 0);
                      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                      const Icon = device === 'mobile' ? Smartphone : device === 'tablet' ? Tablet : Monitor;
                      return (
                        <div key={device}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white/70 flex items-center gap-2 capitalize">
                              <Icon className="w-4 h-4" />
                              {device}
                            </span>
                            <span className="text-white font-medium">{pct}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    {Object.keys(stats.devices.deviceTypes).length === 0 && (
                      <p className="text-white/40 text-sm">No device data yet</p>
                    )}
                  </div>
                </div>

                {/* Browsers */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Browsers</h3>
                  <div className="space-y-4">
                    {Object.entries(stats.devices.browsers)
                      .sort(([, a], [, b]) => b - a)
                      .map(([browser, count]) => {
                        const total = Object.values(stats.devices.browsers).reduce((a, b) => a + b, 0);
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                        return (
                          <div key={browser}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white/70">{browser}</span>
                              <span className="text-white font-medium">{pct}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    {Object.keys(stats.devices.browsers).length === 0 && (
                      <p className="text-white/40 text-sm">No browser data yet</p>
                    )}
                  </div>
                </div>

                {/* Operating Systems */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Operating Systems</h3>
                  <div className="space-y-4">
                    {Object.entries(stats.devices.operatingSystems)
                      .sort(([, a], [, b]) => b - a)
                      .map(([os, count]) => {
                        const total = Object.values(stats.devices.operatingSystems).reduce((a, b) => a + b, 0);
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                        return (
                          <div key={os}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white/70">{os}</span>
                              <span className="text-white font-medium">{pct}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    {Object.keys(stats.devices.operatingSystems).length === 0 && (
                      <p className="text-white/40 text-sm">No OS data yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'countries' && (
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-lg font-semibold text-white">Visitor Countries</h3>
                  <p className="text-white/40 text-sm mt-1">
                    Geographic distribution of visitors
                  </p>
                </div>
                <div className="divide-y divide-white/5">
                  {stats.countries.map((country, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white/30 text-sm w-6">{i + 1}</span>
                        <Globe className="w-4 h-4 text-white/30" />
                        <span className="text-white">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${country.percentage}%` }}
                          />
                        </div>
                        <span className="text-white/50 text-sm w-12 text-right">
                          {country.percentage}%
                        </span>
                        <span className="text-white font-medium w-16 text-right">
                          {country.count}
                        </span>
                      </div>
                    </div>
                  ))}
                  {stats.countries.length === 0 && (
                    <p className="text-white/40 text-center py-12">No country data yet</p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-white/30 text-xs text-center">
            Analytics data is stored in-memory and may reset on server restart
          </p>
        </div>
      </footer>
    </div>
  );
}
