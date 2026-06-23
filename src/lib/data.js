export const NASA_EVENTS = [
  { id: 'EONET-6821', title: 'Wildfire — Balochistan Region', category: 'Wildfires', status: 'critical', lat: 29.5, lng: 66.9, date: '2024-06-20', source: 'NASA FIRMS', description: 'Active fire detected via MODIS satellite. Temp anomaly +48°C above baseline.' },
  { id: 'EONET-6798', title: 'Severe Storm — Arabian Sea', category: 'Severe Storms', status: 'warning', lat: 22.1, lng: 63.4, date: '2024-06-19', source: 'NASA GPM', description: 'Category 2 cyclone forming. Wind speed 95 km/h, moving NE at 18 km/h.' },
  { id: 'EONET-6774', title: 'Flood — Indus River Basin', category: 'Floods', status: 'warning', lat: 27.8, lng: 68.2, date: '2024-06-18', source: 'NASA MODIS', description: 'Water level 2.1m above threshold. 3 districts affected, monitoring ongoing.' },
  { id: 'EONET-6752', title: 'Volcanic Activity — Toba Region', category: 'Volcanoes', status: 'info', lat: 2.6, lng: 98.8, date: '2024-06-17', source: 'NASA ASTER', description: 'Passive degassing observed. SO₂ emission 340 tonnes/day. Category 1 watch.' },
  { id: 'EONET-6731', title: 'Dust Storm — Thar Desert', category: 'Dust Storms', status: 'warning', lat: 26.9, lng: 70.6, date: '2024-06-16', source: 'NASA CALIPSO', description: 'AOD reading 3.4. Visibility below 200m in affected zones. Moving NW.' },
  { id: 'EONET-6710', title: 'Wildfire — Central India', category: 'Wildfires', status: 'resolved', lat: 21.1, lng: 79.0, date: '2024-06-15', source: 'NASA FIRMS', description: 'Fire contained. 2,400 hectares affected. Recovery monitoring phase.' },
  { id: 'EONET-6689', title: 'Drought — Punjab Region', category: 'Drought', status: 'warning', lat: 30.7, lng: 73.1, date: '2024-06-14', source: 'NASA GRACE', description: 'Groundwater deficit 14cm below normal. 6th consecutive dry month recorded.' },
  { id: 'EONET-6668', title: 'Sea Surface Temp Anomaly', category: 'Sea and Lake Ice', status: 'info', lat: 18.5, lng: 72.8, date: '2024-06-13', source: 'NASA MODIS', description: 'SST +1.8°C above seasonal mean. Possible pre-monsoon indicator.' },
]

export const SENSORS = [
  { id: 'ISB-001', location: 'Islamabad', region: 'Punjab', co2: 398, temp: 27.8, humidity: 62, aqi: 41, pm25: 18, status: 'normal', lastUpdate: '2s ago' },
  { id: 'LHR-042', location: 'Lahore', region: 'Punjab', co2: 589, temp: 34.7, humidity: 38, aqi: 342, pm25: 340, status: 'critical', lastUpdate: '5s ago' },
  { id: 'KHI-017', location: 'Karachi', region: 'Sindh', co2: 431, temp: 32.2, humidity: 71, aqi: 72, pm25: 34, status: 'normal', lastUpdate: '3s ago' },
  { id: 'MUL-009', location: 'Multan', region: 'Punjab', co2: 467, temp: 38.1, humidity: 28, aqi: 118, pm25: 67, status: 'warning', lastUpdate: '8s ago' },
  { id: 'PSH-033', location: 'Peshawar', region: 'KPK', co2: 412, temp: 30.4, humidity: 44, aqi: 88, pm25: 42, status: 'warning', lastUpdate: '11s ago' },
  { id: 'QTA-006', location: 'Quetta', region: 'Balochistan', co2: 356, temp: 24.1, humidity: 35, aqi: 33, pm25: 12, status: 'normal', lastUpdate: '6s ago' },
  { id: 'FSD-022', location: 'Faisalabad', region: 'Punjab', co2: 521, temp: 36.8, humidity: 31, aqi: 156, pm25: 98, status: 'critical', lastUpdate: '4s ago' },
  { id: 'RWP-011', location: 'Rawalpindi', region: 'Punjab', co2: 445, temp: 29.2, humidity: 58, aqi: 64, pm25: 28, status: 'normal', lastUpdate: '9s ago' },
]

export const AGENTS = [
  { id: 'agent-collector', name: 'NASA Collector Agent', role: 'Data Collection', tech: 'LangGraph Node', status: 'running', ping: 12, tasksToday: 1847, description: 'Fetches satellite event data from NASA EONET feeds every 60s' },
  { id: 'agent-analyzer', name: 'Analysis Agent', role: 'ML Inference', tech: 'LangGraph Node', status: 'processing', ping: 45, tasksToday: 1203, description: 'Runs anomaly detection and severity classification on raw sensor data' },
  { id: 'agent-alerter', name: 'Alert Dispatcher', role: 'Notification', tech: 'LangGraph Node', status: 'running', ping: 8, tasksToday: 34, description: 'Evaluates thresholds and dispatches alerts via Email, Slack, PagerDuty' },
  { id: 'agent-db', name: 'DB Writer Agent', role: 'Persistence', tech: 'LangGraph + KV', status: 'idle', ping: 18, tasksToday: 9420, description: 'Writes processed sensor readings to Vercel KV (Redis) every 30s' },
  { id: 'agent-reporter', name: 'Report Agent', role: 'Summarization', tech: 'LangGraph Node', status: 'running', ping: 22, tasksToday: 12, description: 'Generates daily PDF summaries and pushes metrics to Grafana dashboard' },
]

export const ALERTS = [
  { id: 'ALT-001', title: 'AQI Critical — Lahore Grid', severity: 'critical', message: 'PM2.5 reading 340μg/m³ on sensor LHR-042. WHO limit is 15μg/m³.', sensor: 'LHR-042', time: '2 min ago', acked: false },
  { id: 'ALT-002', title: 'Wildfire Risk — Balochistan Zone 7', severity: 'critical', message: 'Temp 48°C + humidity 8% detected. NASA FIRMS confirms active fire pixel.', sensor: 'EONET-6821', time: '11 min ago', acked: false },
  { id: 'ALT-003', title: 'AQI High — Faisalabad', severity: 'critical', message: 'PM2.5 98μg/m³ on sensor FSD-022. Industrial zone cluster alert.', sensor: 'FSD-022', time: '18 min ago', acked: false },
  { id: 'ALT-004', title: 'Flood Watch — Indus River Basin', severity: 'warning', message: 'Water level 2.1m above threshold. Upstream sensors confirm rising trend.', sensor: 'EONET-6774', time: '34 min ago', acked: true },
  { id: 'ALT-005', title: 'Heat Anomaly — Multan', severity: 'warning', message: 'Temperature 38.1°C, +4.2°C above June baseline. Urban heat island effect.', sensor: 'MUL-009', time: '1 hr ago', acked: true },
  { id: 'ALT-006', title: 'Dust Storm Approaching — Thar', severity: 'warning', message: 'AOD 3.4 detected via CALIPSO. Storm front moving NW at 45km/h.', sensor: 'EONET-6731', time: '2 hr ago', acked: true },
  { id: 'ALT-007', title: 'NASA EONET — Volcanic Watch', severity: 'info', message: 'Passive volcanic activity flagged. Category 1 passive monitoring only.', sensor: 'EONET-6752', time: '3 hr ago', acked: true },
]

export const CO2_TIMESERIES = [
  { hour: '00:00', avg: 390 }, { hour: '02:00', avg: 385 },
  { hour: '04:00', avg: 378 }, { hour: '06:00', avg: 412 },
  { hour: '08:00', avg: 468 }, { hour: '10:00', avg: 521 },
  { hour: '12:00', avg: 534 }, { hour: '14:00', avg: 498 },
  { hour: '16:00', avg: 476 }, { hour: '18:00', avg: 445 },
  { hour: '20:00', avg: 421 }, { hour: '22:00', avg: 401 },
]

export const AQI_TREND = [
  { day: 'Mon', aqi: 72 }, { day: 'Tue', aqi: 89 },
  { day: 'Wed', aqi: 134 }, { day: 'Thu', aqi: 98 },
  { day: 'Fri', aqi: 156 }, { day: 'Sat', aqi: 112 },
  { day: 'Sun', aqi: 88 },
]

export const EVENT_CATEGORIES = [
  { name: 'Wildfires', count: 12, color: '#f87171' },
  { name: 'Floods', count: 8, color: '#60a5fa' },
  { name: 'Storms', count: 15, color: '#a78bfa' },
  { name: 'Drought', count: 5, color: '#f59e0b' },
  { name: 'Volcanoes', count: 3, color: '#fb923c' },
]
