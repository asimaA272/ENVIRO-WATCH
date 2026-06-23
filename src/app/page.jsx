'use client'
import { useState, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import MetricCards from './components/MetricCards'
import AlertPanel from './components/AlertPanel'
import AgentPipeline from './components/AgentPipeline'
import SensorTable from './components/SensorTable'
import Charts from './components/Charts'
import DbStatus from './components/DbStatus'
import EventsPanel from './components/EventsPanel'
import { RefreshCw, Bell, MoreVertical } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const [sensors, setSensors] = useState(null)
  const [alerts, setAlerts] = useState(null)
  const [agents, setAgents] = useState(null)
  const [events, setEvents] = useState(null)
  const [dbStatus, setDbStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(null)
  const [spinning, setSpinning] = useState(false)

  const fetchAll = useCallback(async () => {
    setSpinning(true)
    try {
      const [s, a, ag, e, db] = await Promise.all([
        fetch('/api/sensors').then(r => r.json()).catch(() => null),
        fetch('/api/alerts').then(r => r.json()).catch(() => null),
        fetch('/api/agents').then(r => r.json()).catch(() => null),
        fetch('/api/events').then(r => r.json()).catch(() => null),
        fetch('/api/db-status').then(r => r.json()).catch(() => null),
      ])
      setSensors(s)
      setAlerts(a)
      setAgents(ag)
      setEvents(e)
      setDbStatus(db)
      setLastRefresh(new Date())
    } finally {
      setLoading(false)
      setTimeout(() => setSpinning(false), 600)
    }
  }, [])

  useEffect(() => {
    fetchAll()
    const interval = setInterval(fetchAll, 30000)
    return () => clearInterval(interval)
  }, [fetchAll])

  const handleAck = async (id) => {
    await fetch('/api/alerts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchAll()
  }

  const unacked = (alerts?.alerts || []).filter(a => !a.acked).length

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0a0e1a' }}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{
          height: 56, background: '#0d1220', borderBottom: '0.5px solid rgba(100,160,255,0.1)',
          display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16, flexShrink: 0,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#e2e8f0' }}>Environmental Dashboard</div>
            <div style={{ fontSize: 11, color: '#475569' }}>LangGraph · Hardcoded NASA Data · Vercel KV · Recharts</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: 'rgba(34,197,94,0.1)', border: '0.5px solid rgba(34,197,94,0.2)', fontSize: 12, fontWeight: 500, color: '#22c55e' }}>
            <div className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
            All systems live
          </div>
          {unacked > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: 'rgba(245,158,11,0.1)', border: '0.5px solid rgba(245,158,11,0.2)', fontSize: 12, fontWeight: 500, color: '#f59e0b' }}>
              <div className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#f59e0b' }} />
              {unacked} active alerts
            </div>
          )}

          {lastRefresh && (
            <span style={{ fontSize: 11, color: '#334155' }}>
              Updated {lastRefresh.toLocaleTimeString()}
            </span>
          )}

          <button onClick={fetchAll} style={{ width: 32, height: 32, borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(100,160,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
            <RefreshCw size={14} className={spinning ? 'spin-slow' : ''} />
          </button>
          <button style={{ width: 32, height: 32, borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(100,160,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
            <Bell size={14} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: '#475569', fontSize: 14 }}>
              <RefreshCw size={18} className="spin-slow" style={{ marginRight: 10 }} />
              Connecting to agents...
            </div>
          ) : (
            <>
              <MetricCards sensors={sensors} alerts={alerts} events={events} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
                <AgentPipeline data={agents} />
                <AlertPanel data={alerts} onAck={handleAck} />
              </div>

              <Charts />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <DbStatus data={dbStatus} />
                <EventsPanel data={events} />
              </div>

              <SensorTable data={sensors} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
