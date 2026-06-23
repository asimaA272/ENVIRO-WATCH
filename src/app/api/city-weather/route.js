export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const API_KEY = process.env.OPENWEATHER_API_KEY || 'YOUR_API_KEY'
  try {
    let weatherUrl
    if (lat && lon) {
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    } else {
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},PK&appid=${API_KEY}&units=metric`
    }
    const weatherRes = await fetch(weatherUrl)
    const weatherData = await weatherRes.json()
    if (weatherData.cod !== 200) {
      return Response.json({ error: 'City not found' }, { status: 404 })
    }
    const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`)
    const aqiData = await aqiRes.json()
    const aqi = aqiData.list?.[0]
    const components = aqi?.components || {}
    const aqiIndex = aqi?.main?.aqi || 1
    const aqiLabels = ['','Good','Fair','Moderate','Poor','Very Poor']
    const alerts = []
    if (aqiIndex >= 4) alerts.push({ type: 'danger', msg: 'Air quality POOR — bahar mat jao' })
    if (weatherData.main.temp >= 40) alerts.push({ type: 'danger', msg: `Extreme heat: ${Math.round(weatherData.main.temp)}°C` })
    if ((components.pm2_5 || 0) > 75) alerts.push({ type: 'danger', msg: `PM2.5 bahut zyada: ${components.pm2_5?.toFixed(1)}µg/m³` })
    return Response.json({
      city: weatherData.name,
      lat: weatherData.coord.lat,
      lon: weatherData.coord.lon,
      temperature: Math.round(weatherData.main.temp),
      feels_like: Math.round(weatherData.main.feels_like),
      humidity: weatherData.main.humidity,
      wind_speed: weatherData.wind.speed,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      aqi: {
        index: aqiIndex,
        label: aqiLabels[aqiIndex],
        pm25: (components.pm2_5 || 0).toFixed(1),
        pm10: (components.pm10 || 0).toFixed(1),
        no2: (components.no2 || 0).toFixed(1),
        o3: (components.o3 || 0).toFixed(1),
      },
      alerts,
    })
  } catch {
    return Response.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}