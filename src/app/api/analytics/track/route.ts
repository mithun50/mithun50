// POST /api/analytics/track - Record page views

import { NextRequest, NextResponse } from 'next/server';
import { trackPageView, extractContext } from '@/lib/analytics/tracker';
import { TrackingPayload } from '@/lib/analytics/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as TrackingPayload;

    // Validate required fields
    if (!body.path || !body.sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields: path, sessionId' },
        { status: 400 }
      );
    }

    // Extract context from headers
    const context = extractContext(request.headers);

    // Track the page view
    await trackPageView(body, context);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Analytics] Tracking error:', error);
    return NextResponse.json(
      { error: 'Tracking failed' },
      { status: 500 }
    );
  }
}

// Disable caching for tracking endpoint
export const dynamic = 'force-dynamic';
