import { NextResponse } from 'next/server'
import { NASA_EVENTS } from '@/lib/data'
import { kvGet, kvSet, kvIncr } from '@/lib/kv'

export async function GET() {
  await kvIncr('stats:events_fetched')
  const lastFetch = new Date().toISOString()
  await kvSet('meta:last_events_fetch', lastFetch, { ex: 3600 })
  const cached = await kvGet('cache:events')
  const events = cached || NASA_EVENTS
  const critical = events.filter(e => e.status === 'critical').length
  const warning = events.filter(e => e.status === 'warning').length
  return NextResponse.json({
    success: true,
    source: cached ? 'vercel_kv_cache' : 'hardcoded_dataset',
    lastFetch,
    total: events.length,
    summary: { critical, warning, info: events.length - critical - warning },
    events,
  })
}

export async function POST(req) {
  const body = await req.json()
  await kvSet('cache:events', body.events || NASA_EVENTS, { ex: 300 })
  return NextResponse.json({ success: true, message: 'Events cached in Vercel KV' })
}
