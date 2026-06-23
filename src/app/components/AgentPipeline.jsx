'use client'
import { Satellite, Cpu, Database, Bell, BarChart2 } from 'lucide-react'

const iconMap = { 'agent-collector': Satellite, 'agent-analyzer': Cpu, 'agent-db': Database, 'agent-alerter': Bell, 'agent-reporter': BarChart2 }
const statusStyles = {
  running: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e', label: '● Running' },
  processing: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', label: '⟳ Processing' },
  idle: { bg: 'rgba(100,116,139,0.12)', color: '#64748b', label: '○ Idle' },
}

export default function AgentPipeline({ data }) {
  const agents = data?.agents || []
  return (
    <div style={{ background: '#0d1220', border: '0.5px solid rgba(100,160,255,0.12)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '0.5px solid rgba(100,160,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Cpu size={15} color="#60a5fa" />
        <span style={{ fontSize: 13, fontWeight: 500, color: '#cbd5e1', flex: 1 }}>LangGraph Agent Pipeline</span>
        <span style={{ fontSize: 11, color: '#3b82f6', cursor: 'pointer' }}>Logs ↗</span>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {agents.map((agent, i) => {
          const Icon = iconMap[agent.id] || Cpu
          const st = statusStyles[agent.status] || statusStyles.idle
          return (
            <div key={agent.id} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(100,160,255,0.08)', borderRadius: 8,
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} color={st.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#cbd5e1', marginBottom: 2 }}>{agent.name}</div>
                <div style={{ fontSize: 11, color: '#475569' }}>{agent.description?.slice(0, 52)}...</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: st.bg, color: st.color, fontWeight: 500 }}>{st.label}</span>
                <span style={{ fontSize: 10, color: '#334155' }}>{agent.ping}ms · {agent.tasksToday?.toLocaleString()} tasks</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
