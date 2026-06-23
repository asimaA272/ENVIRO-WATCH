'use client'
import { Flame, Wind, Droplets, Thermometer, Satellite, Check } from 'lucide-react'

const iconMap = { Wildfires: Flame, Storms: Wind, Floods: Droplets, Heat: Thermometer, Volcano: Satellite }
const severityStyles = {
  critical: { bg: 'rgba(248,113,113,0.06)', border: 'rgba(248,113,113,0.2)', iconBg: 'rgba(248,113,113,0.15)', iconColor: '#f87171', titleColor: '#fca5a5' },
  warning: { bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.2)', iconBg: 'rgba(245,158,11,0.15)', iconColor: '#f59e0b', titleColor: '#fcd34d' },
  info: { bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.15)', iconBg: 'rgba(59,130,246,0.15)', iconColor: '#60a5fa', titleColor: '#93c5fd' },
}

function getIcon(title) {
  if (title.toLowerCase().includes('fire')) return Flame
  if (title.toLowerCase().includes('flood') || title.toLowerCase().includes('river')) return Droplets
  if (title.toLowerCase().includes('storm') || title.toLowerCase().includes('aqi') || title.toLowerCase().includes('dust')) return Wind
  if (title.toLowerCase().includes('heat') || title.toLowerCase().includes('temp')) return Thermometer
  return Satellite
}

export default function AlertPanel({ data, onAck }) {
  const alerts = data?.alerts || []
  return (
    <div style={{ background: '#0d1220', border: '0.5px solid rgba(100,160,255,0.12)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '0.5px solid rgba(100,160,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 15, color: '#f87171' }}>●</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#cbd5e1', flex: 1 }}>Active Alerts</span>
        <span style={{ fontSize: 11, color: '#3b82f6', cursor: 'pointer' }}>View all</span>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 340, overflowY: 'auto' }}>
        {alerts.map((alert) => {
          const s = severityStyles[alert.severity] || severityStyles.info
          const Icon = getIcon(alert.title)
          return (
            <div key={alert.id} style={{
              display: 'flex', gap: 10, padding: '10px 12px',
              borderRadius: 8, border: `0.5px solid ${s.border}`, background: s.bg,
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} color={s.iconColor} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: s.titleColor, marginBottom: 2 }}>{alert.title}</div>
                <div style={{ fontSize: 11, color: '#475569' }}>{alert.message.slice(0, 60)}...</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: '#334155' }}>{alert.time}</span>
                {!alert.acked && (
                  <button onClick={() => onAck(alert.id)} style={{
                    background: 'rgba(34,197,94,0.1)', border: '0.5px solid rgba(34,197,94,0.2)',
                    borderRadius: 4, padding: '2px 6px', cursor: 'pointer', color: '#22c55e', fontSize: 10,
                    display: 'flex', alignItems: 'center', gap: 3,
                  }}>
                    <Check size={10} /> Ack
                  </button>
                )}
                {alert.acked && <span style={{ fontSize: 10, color: '#22c55e' }}>✓ Acked</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
