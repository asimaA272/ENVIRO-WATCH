'use client'
import { useState } from 'react'

const CITIES = [
  { name: 'Karachi', lat: 24.8607, lon: 67.0011 },
  { name: 'Lahore', lat: 31.5497, lon: 74.3436 },
  { name: 'Islamabad', lat: 33.6844, lon: 73.0479 },
  { name: 'Rawalpindi', lat: 33.5651, lon: 73.0169 },
  { name: 'Faisalabad', lat: 31.4504, lon: 73.1350 },
  { name: 'Multan', lat: 30.1978, lon: 71.4711 },
  { name: 'Peshawar', lat: 34.0151, lon: 71.5249 },
  { name: 'Quetta', lat: 30.1798, lon: 66.9750 },
  { name: 'Gujrat', lat: 32.5736, lon: 74.0790 },
  { name: 'Kharian', lat: 32.8155, lon: 73.8856 },
  { name: 'Sialkot', lat: 32.4945, lon: 74.5229 },
  { name: 'Gujranwala', lat: 32.1877, lon: 74.1945 },
  { name: 'Hyderabad', lat: 25.3960, lon: 68.3578 },
  { name: 'Bahawalpur', lat: 29.3956, lon: 71.6836 },
  { name: 'Abbottabad', lat: 34.1463, lon: 73.2117 },
]

export default function CitySearch() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInput = (val) => {
    setQuery(val)
    if (val.length < 2) { setSuggestions([]); return }
    setSuggestions(CITIES.filter(c => c.name.toLowerCase().includes(val.toLowerCase())).slice(0, 5))
  }

  const fetchCity = async (city) => {
    setLoading(true); setError(null); setData(null); setSuggestions([]); setQuery(city.name)
    try {
      const res = await fetch(`/api/city-weather?lat=${city.lat}&lon=${city.lon}`)
      const json = await res.json()
      if (json.error) setError(json.error)
      else setData(json)
    } catch { setError('Network error') }
    setLoading(false)
  }

  const searchManual = async () => {
    if (!query.trim()) return
    setLoading(true); setError(null); setData(null); setSuggestions([])
    try {
      const res = await fetch(`/api/city-weather?city=${encodeURIComponent(query)}`)
      const json = await res.json()
      if (json.error) setError('City nahi mili — dobara likho')
      else setData(json)
    } catch { setError('Network error') }
    setLoading(false)
  }

  return (
    <div style={{padding:'24px', color:'white', maxWidth:'700px'}}>
      <h2 style={{fontSize:'22px', fontWeight:'bold', marginBottom:'4px'}}>Pakistan City Search</h2>
      <p style={{color:'#9ca3af', marginBottom:'20px'}}>Kisi bhi city ka real environment data dekho</p>

      <div style={{display:'flex', gap:'8px', marginBottom:'12px', position:'relative'}}>
        <input
          value={query}
          onChange={e => handleInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchManual()}
          placeholder="City likho... (Gujrat, Lahore, Kharian)"
          style={{flex:1, background:'#1f2937', border:'1px solid #374151', borderRadius:'8px', padding:'12px 16px', color:'white', fontSize:'15px'}}
        />
        <button onClick={searchManual} style={{background:'#2563eb', color:'white', border:'none', borderRadius:'8px', padding:'12px 20px', cursor:'pointer', fontSize:'15px'}}>
          Search
        </button>
        {suggestions.length > 0 && (
          <div style={{position:'absolute', top:'100%', left:0, right:'80px', background:'#1f2937', border:'1px solid #374151', borderRadius:'8px', marginTop:'4px', zIndex:50}}>
            {suggestions.map(c => (
              <button key={c.name} onClick={() => fetchCity(c)}
                style={{display:'block', width:'100%', textAlign:'left', padding:'12px 16px', color:'white', background:'none', border:'none', borderBottom:'1px solid #374151', cursor:'pointer', fontSize:'14px'}}>
                📍 {c.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'24px'}}>
        {['Karachi','Lahore','Islamabad','Gujrat','Kharian','Peshawar','Quetta'].map(name => (
          <button key={name} onClick={() => fetchCity(CITIES.find(c => c.name === name))}
            style={{background:'#1f2937', border:'1px solid #374151', color:'#d1d5db', borderRadius:'20px', padding:'6px 14px', cursor:'pointer', fontSize:'13px'}}>
            {name}
          </button>
        ))}
      </div>

      {loading && <p style={{color:'#60a5fa', textAlign:'center', padding:'40px'}}>⏳ Data aa raha hai...</p>}
      {error && <div style={{background:'#450a0a', border:'1px solid #ef4444', borderRadius:'8px', padding:'16px', color:'#fca5a5'}}>{error}</div>}

      {data && (
        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          <div style={{background:'#1f2937', border:'1px solid #374151', borderRadius:'12px', padding:'20px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
              <div>
                <h3 style={{fontSize:'26px', fontWeight:'bold'}}>{data.city}</h3>
                <p style={{color:'#9ca3af', textTransform:'capitalize'}}>{data.description}</p>
              </div>
              <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="weather" style={{width:'60px'}} />
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
            {[
              { label:'🌡️ Temperature', value:`${data.temperature}°C`, sub:`Feels like ${data.feels_like}°C` },
              { label:'💧 Humidity', value:`${data.humidity}%`, sub:'Relative humidity' },
              { label:'💨 Wind', value:`${data.wind_speed} m/s`, sub:'Wind speed' },
              { label:'🌫️ Air Quality', value:data.aqi.label, sub:`AQI Level ${data.aqi.index}/5` },
            ].map(item => (
              <div key={item.label} style={{background:'#1f2937', border:'1px solid #374151', borderRadius:'12px', padding:'16px'}}>
                <p style={{color:'#9ca3af', fontSize:'13px', marginBottom:'4px'}}>{item.label}</p>
                <p style={{fontSize:'24px', fontWeight:'bold'}}>{item.value}</p>
                <p style={{color:'#6b7280', fontSize:'12px'}}>{item.sub}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#1f2937', border:'1px solid #374151', borderRadius:'12px', padding:'16px'}}>
            <p style={{fontWeight:'600', marginBottom:'12px'}}>Pollution Details</p>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px'}}>
              {[
                {label:'PM2.5', val:data.aqi.pm25, limit:15},
                {label:'PM10', val:data.aqi.pm10, limit:45},
                {label:'NO₂', val:data.aqi.no2, limit:40},
                {label:'O₃', val:data.aqi.o3, limit:100},
              ].map(item => (
                <div key={item.label} style={{background:'#111827', borderRadius:'8px', padding:'10px'}}>
                  <p style={{color:'#9ca3af', fontSize:'11px'}}>{item.label}</p>
                  <p style={{fontSize:'18px', fontWeight:'bold', color: parseFloat(item.val) > item.limit ? '#f87171' : '#4ade80'}}>{item.val}</p>
                  <p style={{color:'#4b5563', fontSize:'11px'}}>µg/m³</p>
                </div>
              ))}
            </div>
          </div>

          {data.alerts.length > 0 && (
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              {data.alerts.map((a, i) => (
                <div key={i} style={{background:'#450a0a', border:'1px solid #ef4444', borderRadius:'8px', padding:'12px', color:'#fca5a5'}}>
                  ⚠️ {a.msg}
                </div>
              ))}
            </div>
          )}
          {data.alerts.length === 0 && (
            <div style={{background:'#052e16', border:'1px solid #22c55e', borderRadius:'8px', padding:'12px', color:'#86efac'}}>
              ✅ Koi alert nahi — conditions normal hain
            </div>
          )}
        </div>
      )}
    </div>
  )
}