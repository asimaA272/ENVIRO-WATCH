import { NextResponse } from 'next/server'
import { AGENTS } from '@/lib/data'
import { kvGet, kvSet, kvIncr } from '@/lib/kv'

const STATUSES = ['running', 'processing', 'idle']

function simulateAgentStatus(agent) {
  const rand = Math.random()
  let status = agent.status
  if (agent.id === 'agent-analyzer') {
    status = rand > 0.4 ? 'processing' : 'running'
  } else if (agent.id === 'agent-db') {
    status = rand > 0.6 ? 'running' : 'idle'
  }
  return {
    ...agent,
    status,
    ping: agent.ping + Math.floor(Math.random() * 10 - 5),
    tasksToday: agent.tasksToday + Math.floor(Math.random() * 3),
    lastHeartbeat: new Date().toISOString(),
  }
}

export async function GET() {
  const agents = AGENTS.map(simulateAgentStatus)
  await kvSet('agents:status', agents, { ex: 60 })
  const running = agents.filter(a => a.status === 'running').length
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    totalAgents: agents.length,
    running,
    agents,
  })
}
