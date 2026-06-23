'use client'

const statusBadge = {
  critical: { bg: 'rgba(248,113,113,0.12)', color: '#f87171', label: 'Critical' },
  warning: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', label: 'Warning' },
  normal: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e', label: 'Normal' },
}

function Sparkline({ status }) {
  const vals = Array.from({ length: 10 }, () => Math.floor(Math.random() * 16) + 4)
  const color = status === 'critical' ? '#f87171' : status === 'warning' ? '#f59e0b' : '#3b82f6'
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 20 }}>
      {vals.map((h, i) => (
        <div key={i} style={{ width: 3, borderRadius: 1, background: color, opacity: 0.6, height: h }} />
      ))}
    </div>
  )
}

export default function SensorTable({ data }) {
  const sensors = data?.sensors || []
  return (
    <div style={{ background: '#0d1220', border: '0.5px solid rgba(100,160,255,0.12)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '0.5px solid rgba(100,160,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#cbd5e1', flex: 1 }}>Live Sensor Readings</span>
        <span style={{ fontSize: 11, color: '#3b82f6', cursor: 'pointer' }}>↓ Export CSV</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              {['Sensor ID', 'Location', 'CO₂ ppm', 'Temp', 'AQI', 'PM2.5', 'Status', 'Trend'].map(h => (
                <th key={h} style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px', padding: '0 12px 10px', textAlign: 'left', fontWeight: 500, borderBottom: '0.5px solid rgba(100,160,255,0.08)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sensors.map((s, i) => {
              const st = statusBadge[s.status] || statusBadge.normal
              return (
                <tr key={s.id} style={{ borderBottom: '0.5px solid rgba(100,160,255,0.05)' }}>
                  <td style={{ padding: '9px 12px', fontSize: 12, color: '#cbd5e1', fontWeight: 500 }}>{s.id}</td>
                  <td style={{ padding: '9px 12px', fontSize: 12, color: '#94a3b8' }}>{s.location}</td>
                  <td style={{ padding: '9px 12px', fontSize: 11, color: '#e2e8f0', fontFamily: 'monospace' }}>{Math.round(s.co2)}</td>
                  <td style={{ padding: '9px 12px', fontSize: 12, color: '#94a3b8' }}>{s.temp}°C</td>
                  <td style={{ padding: '9px 12px', fontSize: 11, color: '#e2e8f0', fontFamily: 'monospace' }}>{Math.round(s.aqi)}</td>
                  <td style={{ padding: '9px 12px', fontSize: 11, color: '#e2e8f0', fontFamily: 'monospace' }}>{Math.round(s.pm25)}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 10, background: st.bg, color: st.color, fontWeight: 500 }}>{st.label}</span>
                  </td>
                  <td style={{ padding: '9px 12px' }}><Sparkline status={s.status} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
