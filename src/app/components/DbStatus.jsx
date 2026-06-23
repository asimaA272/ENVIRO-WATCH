'use client'
import { Database, Server, Table } from 'lucide-react'

export default function DbStatus({ data }) {
  const stats = data?.stats || {}
  const tables = data?.tables || []
  const isConnected = data?.status === 'connected'

  return (
    <div style={{ background: '#0d1220', border: '0.5px solid rgba(100,160,255,0.12)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '0.5px solid rgba(100,160,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Database size={15} color="#60a5fa" />
        <span style={{ fontSize: 13, fontWeight: 500, color: '#cbd5e1', flex: 1 }}>Vercel KV Database</span>
        <span style={{
          fontSize: 10, padding: '3px 8px', borderRadius: 10, fontWeight: 500,
          background: isConnected ? 'rgba(34,197,94,0.12)' : 'rgba(248,113,113,0.12)',
          color: isConnected ? '#22c55e' : '#f87171',
        }}>
          {isConnected ? '● Connected' : '○ Offline'}
        </span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Total Records', value: (stats.sensorReads * 8 || 0).toLocaleString() },
            { label: 'Active Keys', value: stats.activeKeys || 0 },
            { label: 'Alerts Acked', value: stats.alertsAcked || 0 },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 7, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 500, color: '#e2e8f0' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#475569', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Key Namespaces</div>
        {tables.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i < tables.length - 1 ? '0.5px solid rgba(100,160,255,0.05)' : 'none' }}>
            <Table size={12} color="#475569" />
            <span style={{ fontSize: 12, color: '#94a3b8', flex: 1, fontFamily: 'monospace' }}>{t.name}</span>
            <span style={{ fontSize: 10, color: '#475569', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: 4 }}>{t.type}</span>
            <span style={{ fontSize: 10, color: '#334155' }}>TTL: {t.ttl}</span>
          </div>
        ))}
        <div style={{ marginTop: 12, fontSize: 11, color: '#334155' }}>
          Last sync: {stats.lastFetch ? new Date(stats.lastFetch).toLocaleTimeString() : 'Never'}
        </div>
      </div>
    </div>
  )
}
