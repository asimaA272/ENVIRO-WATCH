import { NextResponse } from 'next/server'
import { ALERTS } from '@/lib/data'
import { kvGet, kvSet, kvIncr } from '@/lib/kv'

export async function GET() {
  const stored = await kvGet('alerts:active')
  const alerts = stored || ALERTS
  const unacked = alerts.filter(a => !a.acked).length
  return NextResponse.json({
    success: true,
    source: stored ? 'vercel_kv' : 'default_dataset',
    total: alerts.length,
    unacknowledged: unacked,
    alerts,
  })
}

export async function PATCH(req) {
  const { id } = await req.json()
  const stored = await kvGet('alerts:active')
  const alerts = stored || ALERTS
  const updated = alerts.map(a => a.id === id ? { ...a, acked: true } : a)
  await kvSet('alerts:active', updated, { ex: 3600 })
  await kvIncr('stats:alerts_acked')
  return NextResponse.json({ success: true, message: `Alert ${id} acknowledged` })
}
