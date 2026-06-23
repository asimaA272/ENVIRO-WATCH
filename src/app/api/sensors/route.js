import { NextResponse } from 'next/server'
import { SENSORS } from '@/lib/data'
import { kvSet, kvGet, kvIncr, kvLpush } from '@/lib/kv'

function simulateLiveReading(sensor) {
  const jitter = (range) => +(Math.random() * range * 2 - range).toFixed(1)
  return {
    ...sensor,
    co2: Math.max(350, sensor.co2 + jitter(8)),
    temp: +(sensor.temp + jitter(0.3)).toFixed(1),
    humidity: Math.min(100, Math.max(10, sensor.humidity + jitter(2))),
    aqi: Math.max(0, sensor.aqi + jitter(5)),
    pm25: Math.max(0, sensor.pm25 + jitter(3)),
    lastUpdate: 'just now',
    timestamp: new Date().toISOString(),
  }
}

export async function GET() {
  await kvIncr('stats:sensor_reads')
  const readings = SENSORS.map(simulateLiveReading)

  for (const r of readings) {
    await kvSet(`sensor:latest:${r.id}`, r, { ex: 120 })
    const logEntry = JSON.stringify({ ts: r.timestamp, aqi: r.aqi, temp: r.temp, co2: r.co2 })
    await kvLpush(`sensor:history:${r.id}`, logEntry)
  }

  await kvSet('stats:total_records', await kvGet('stats:sensor_reads') || 0)

  const critical = readings.filter(r => r.status === 'critical').length
  const warning = readings.filter(r => r.status === 'warning').length

  return NextResponse.json({
    success: true,
    source: 'live_simulation + vercel_kv',
    timestamp: new Date().toISOString(),
    totalSensors: readings.length,
    summary: { critical, warning, normal: readings.length - critical - warning },
    sensors: readings,
  })
}
