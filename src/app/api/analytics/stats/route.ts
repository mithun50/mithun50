// GET /api/analytics/stats - Fetch dashboard statistics

import { NextRequest, NextResponse } from 'next/server';
import { getStats } from '@/lib/analytics/store';
import { TimeRange } from '@/lib/analytics/types';

export async function GET(request: NextRequest) {
  try {
    // Password protection
    const password = request.headers.get('x-analytics-password');
    const expectedPassword = process.env.ANALYTICS_PASSWORD;

    if (!expectedPassword) {
      return NextResponse.json(
        { error: 'Analytics password not configured' },
        { status: 500 }
      );
    }

    if (password !== expectedPassword) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get time range from query params
    const { searchParams } = new URL(request.url);
    const range = (searchParams.get('range') || '7d') as TimeRange;

    // Validate range
    if (!['7d', '30d', '90d', 'all'].includes(range)) {
      return NextResponse.json(
        { error: 'Invalid range. Use: 7d, 30d, 90d, or all' },
        { status: 400 }
      );
    }

    // Get stats
    const stats = await getStats(range);

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('[Analytics] Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

// Disable caching
export const dynamic = 'force-dynamic';
