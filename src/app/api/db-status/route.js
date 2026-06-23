import { NextResponse } from 'next/server'
import { kvGet, kvIncr, kvSet, kvKeys } from '@/lib/kv'

export async function GET() {
  const totalRecords = await kvGet('stats:total_records') || 0
  const sensorReads = await kvGet('stats:sensor_reads') || 0
  const eventsFetched = await kvGet('stats:events_fetched') || 0
  const alertsAcked = await kvGet('stats:alerts_acked') || 0
  const lastFetch = await kvGet('meta:last_events_fetch') || 'Never'
  const keys = await kvKeys('sensor:*')

  return NextResponse.json({
    success: true,
    database: 'Vercel KV (Redis)',
    status: 'connected',
    stats: {
      totalRecords: Number(totalRecords),
      sensorReads: Number(sensorReads),
      eventsFetched: Number(eventsFetched),
      alertsAcked: Number(alertsAcked),
      activeKeys: keys.length,
      lastFetch,
    },
    tables: [
      { name: 'sensor:latest:*', type: 'Hash', records: 8, ttl: '120s' },
      { name: 'sensor:history:*', type: 'List', records: Number(sensorReads) * 8, ttl: 'persistent' },
      { name: 'alerts:active', type: 'JSON', records: 7, ttl: '1hr' },
      { name: 'cache:events', type: 'JSON', records: 8, ttl: '5min' },
      { name: 'agents:status', type: 'JSON', records: 5, ttl: '60s' },
    ],
  })
}
