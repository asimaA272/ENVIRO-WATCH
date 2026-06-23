'use client'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { CO2_TIMESERIES, AQI_TREND, EVENT_CATEGORIES } from '@/lib/data'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1e293b', border: '0.5px solid rgba(100,160,255,0.2)', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#e2e8f0' }}>
      <div style={{ color: '#64748b', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>{p.name}: <strong>{Math.round(p.value)}</strong></div>
      ))}
    </div>
  )
}

export default function Charts() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: 16 }}>
      <div style={{ background: '#0d1220', border: '0.5px solid rgba(100,160,255,0.12)', borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 4 }}>CO₂ Concentration</div>
        <div style={{ fontSize: 11, color: '#475569', marginBottom: 14 }}>24h rolling average (ppm)</div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={CO2_TIMESERIES}>
            <XAxis dataKey="hour" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} dot={false} name="CO₂" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: '#0d1220', border: '0.5px solid rgba(100,160,255,0.12)', borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 4 }}>AQI Weekly Trend</div>
        <div style={{ fontSize: 11, color: '#475569', marginBottom: 14 }}>Average Air Quality Index</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={AQI_TREND}>
            <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="aqi" name="AQI" radius={[3, 3, 0, 0]}>
              {AQI_TREND.map((e, i) => (
                <Cell key={i} fill={e.aqi > 150 ? '#f87171' : e.aqi > 100 ? '#f59e0b' : '#3b82f6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: '#0d1220', border: '0.5px solid rgba(100,160,255,0.12)', borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 4 }}>Events by Category</div>
        <div style={{ fontSize: 11, color: '#475569', marginBottom: 8 }}>NASA EONET classification</div>
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie data={EVENT_CATEGORIES} dataKey="count" cx="50%" cy="50%" outerRadius={50} innerRadius={28}>
              {EVENT_CATEGORIES.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          {EVENT_CATEGORIES.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#64748b' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: e.color }} />
              {e.name} ({e.count})
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
