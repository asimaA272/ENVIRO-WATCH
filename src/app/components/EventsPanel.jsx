'use client'
import { Satellite } from 'lucide-react'

const statusStyle = {
  critical: { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
  warning: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  info: { color: '#60a5fa', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
  resolved: { color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.15)' },
}

export default function EventsPanel({ data }) {
  const events = data?.events || []
  return (
    <div style={{ background: '#0d1220', border: '0.5px solid rgba(100,160,255,0.12)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '0.5px solid rgba(100,160,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Satellite size={15} color="#60a5fa" />
        <span style={{ fontSize: 13, fontWeight: 500, color: '#cbd5e1', flex: 1 }}>NASA EONET Events</span>
        <span style={{ fontSize: 10, color: '#475569' }}>Source: {data?.source || 'dataset'}</span>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {events.map((e) => {
          const st = statusStyle[e.status] || statusStyle.info
          return (
            <div key={e.id} style={{ padding: '10px 12px', borderRadius: 8, background: st.bg, border: `0.5px solid ${st.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: st.color }}>{e.id}</span>
                <span style={{ fontSize: 10, color: '#475569', background: 'rgba(255,255,255,0.04)', padding: '1px 6px', borderRadius: 4 }}>{e.category}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#334155' }}>{e.date}</span>
              </div>
              <div style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 500, marginBottom: 3 }}>{e.title}</div>
              <div style={{ fontSize: 11, color: '#475569' }}>{e.description}</div>
              <div style={{ fontSize: 10, color: '#334155', marginTop: 4 }}>Source: {e.source} · {e.lat.toFixed(1)}°N, {e.lng.toFixed(1)}°E</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
