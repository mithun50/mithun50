// GET /api/analytics/export - Export analytics data as JSON or CSV

import { NextRequest, NextResponse } from 'next/server';
import { getPageViews, getStats } from '@/lib/analytics/store';
import { TimeRange, ExportFormat } from '@/lib/analytics/types';
import { toCSV } from '@/lib/analytics/utils';

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

    // Get query params
    const { searchParams } = new URL(request.url);
    const format = (searchParams.get('format') || 'json') as ExportFormat;
    const range = (searchParams.get('range') || 'all') as TimeRange;

    // Validate params
    if (!['json', 'csv'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format. Use: json or csv' },
        { status: 400 }
      );
    }

    if (!['7d', '30d', '90d', 'all'].includes(range)) {
      return NextResponse.json(
        { error: 'Invalid range. Use: 7d, 30d, 90d, or all' },
        { status: 400 }
      );
    }

    // Get data
    const pageViews = await getPageViews(range);
    const stats = await getStats(range);

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `analytics-${range}-${timestamp}`;

    if (format === 'csv') {
      const csv = toCSV(pageViews);

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}.csv"`,
        },
      });
    }

    // JSON format - include both raw data and stats
    const exportData = {
      exportedAt: new Date().toISOString(),
      range,
      stats,
      pageViews,
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}.json"`,
      },
    });
  } catch (error) {
    console.error('[Analytics] Export error:', error);
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    );
  }
}

// Disable caching
export const dynamic = 'force-dynamic';
