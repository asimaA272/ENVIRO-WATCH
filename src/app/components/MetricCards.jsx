'use client'
import { Radio, Wind, Thermometer, AlertTriangle } from 'lucide-react'

export default function MetricCards({ sensors, alerts, events }) {
  const activeSensors = sensors?.totalSensors || 8
  const avgAqi = sensors?.sensors
    ? Math.round(sensors.sensors.reduce((s, r) => s + r.aqi, 0) / sensors.sensors.length)
    : 94
  const avgTemp = sensors?.sensors
    ? (sensors.sensors.reduce((s, r) => s + r.temp, 0) / sensors.sensors.length).toFixed(1)
    : 31.6
  const criticalCount = (alerts?.alerts || []).filter(a => a.severity === 'critical' && !a.acked).length

  const cards = [
    { icon: Radio, label: 'Active Sensors', value: activeSensors, unit: 'nodes', change: '+2 online', changeType: 'up', accent: '#3b82f6' },
    { icon: Wind, label: 'Avg Air Quality', value: avgAqi, unit: 'AQI', change: `${sensors?.summary?.critical || 0} critical sensors`, changeType: avgAqi > 100 ? 'down' : 'up', accent: '#22c55e' },
    { icon: Thermometer, label: 'Avg Temperature', value: avgTemp, unit: '°C', change: '+2.1° above baseline', changeType: 'down', accent: '#f59e0b' },
    { icon: AlertTriangle, label: 'Critical Alerts', value: criticalCount, unit: 'active', change: `${(alerts?.alerts || []).filter(a => a.acked).length} resolved`, changeType: 'neutral', accent: '#f87171' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {cards.map((c, i) => {
        const Icon = c.icon
        return (
          <div key={i} style={{
            background: '#0d1220', border: '0.5px solid rgba(100,160,255,0.12)',
            borderRadius: 10, padding: '14px 16px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: c.accent }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Icon size={13} color="#475569" />
              <span style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{c.label}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 500, color: '#e2e8f0', lineHeight: 1 }}>
              {c.value} <span style={{ fontSize: 13, color: '#64748b', fontWeight: 400 }}>{c.unit}</span>
            </div>
            <div style={{
              fontSize: 11, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4,
              color: c.changeType === 'up' ? '#22c55e' : c.changeType === 'down' ? '#f87171' : '#64748b',
            }}>{c.change}</div>
          </div>
        )
      })}
    </div>
  )
}
