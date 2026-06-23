'use client'
import { Activity, Map, Bell, Bot, Satellite, Database, BarChart2, FileText, Settings, LogOut } from 'lucide-react'

const navItems = [
  { icon: Activity, label: 'Overview', badge: 'Live', badgeType: 'live' },
  { icon: Map, label: 'Sensor Map' },
  { icon: Map, label: 'City Search' },
  { icon: Bell, label: 'Alerts', badge: '3', badgeType: 'danger' },
  { icon: Bot, label: 'Agents', badge: '1', badgeType: 'warn' },
  { icon: Satellite, label: 'NASA Events' },
  { icon: Database, label: 'KV Database' },
  { icon: BarChart2, label: 'Grafana' },
  { icon: FileText, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
]

const agentDots = [
  { name: 'Collector Agent', status: 'online', ping: '12ms' },
  { name: 'Analysis Agent', status: 'processing', ping: '45ms' },
  { name: 'Alert Agent', status: 'online', ping: '8ms' },
  { name: 'DB Writer Agent', status: 'syncing', ping: '18ms' },
  { name: 'Report Agent', status: 'online', ping: '22ms' },
]

const dotColor = { online: '#22c55e', processing: '#f59e0b', syncing: '#3b82f6' }

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside style={{
      width: 220, minWidth: 220, background: '#0d1220',
      borderRight: '0.5px solid rgba(100,160,255,0.15)',
      display: 'flex', flexDirection: 'column', height: '100vh',
    }}>
      <div style={{ padding: '20px 18px 16px', borderBottom: '0.5px solid rgba(100,160,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#1a4fd6', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Satellite size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>EnviroWatch</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>Multi-Agent System</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 12px 8px' }}>
        <div style={{ fontSize: 10, color: '#475569', letterSpacing: 1, textTransform: 'uppercase', padding: '0 6px', marginBottom: 6 }}>Navigation</div>
        {navItems.map((item, i) => {
          const Icon = item.icon
          const isActive = activeTab === i
          return (
            <div key={i}
              onClick={() => item.label === 'City Search' ? window.location.href = '/city-search' : onTabChange(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                borderRadius: 6, cursor: 'pointer', marginBottom: 2,
                background: isActive ? 'rgba(59,130,246,0.15)' : 'transparent',
                color: isActive ? '#60a5fa' : '#64748b',
                transition: 'all 0.15s',
              }}>
              <Icon size={16} />
              <span style={{ fontSize: 13, flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: 10, padding: '2px 6px', borderRadius: 10, fontWeight: 500,
                  background: item.badgeType === 'danger' ? '#3d0a0a' : item.badgeType === 'warn' ? '#3d2a00' : '#1e3a5f',
                  color: item.badgeType === 'danger' ? '#f87171' : item.badgeType === 'warn' ? '#f59e0b' : '#60a5fa',
                }}>{item.badge}</span>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ padding: '12px' }}>
        <div style={{ fontSize: 10, color: '#475569', letterSpacing: 1, textTransform: 'uppercase', padding: '0 6px', marginBottom: 8 }}>Agent Status</div>
        <div style={{ padding: 10, background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(100,160,255,0.1)', borderRadius: 8 }}>
          {agentDots.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: dotColor[a.status],
                boxShadow: `0 0 6px ${dotColor[a.status]}80`,
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 12, color: '#94a3b8', flex: 1 }}>{a.name}</span>
              <span style={{ fontSize: 10, color: '#475569' }}>{a.ping}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'auto', padding: 12, borderTop: '0.5px solid rgba(100,160,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', background: '#1a4fd6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 500, color: '#fff', flexShrink: 0,
          }}>AR</div>
          <div style={{ fontSize: 12 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 500 }}>Ahmed Raza</div>
            <div style={{ color: '#475569', fontSize: 11 }}>Admin · Research</div>
          </div>
          <LogOut size={14} color="#475569" style={{ marginLeft: 'auto', cursor: 'pointer' }} />
        </div>
      </div>
    </aside>
  )
}