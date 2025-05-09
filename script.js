function getWeather() {
  const lon = document.getElementById('citylon').value;
  const lat = document.getElementById('citylat').value;

  if (!lat || !lon) return alert('Please provide both latitude and longitude.');

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.current_weather;
      if (!weather) return alert('Weather data unavailable.');

      // Populate HTML elements
      document.getElementById('cityName').textContent = getCityName(lat, lon);
      document.getElementById('weatherIcon').textContent = getWeatherIcon(weather.weathercode);
      document.getElementById('description').textContent = getWeatherCondition(weather.weathercode);
      document.getElementById('temperature').textContent = `Temperature: ${weather.temperature}°C`;
      document.getElementById('lastUpdated').textContent = `Last updated: ${weather.time}`;
      document.getElementById('weatherBox').classList.remove('hidden');
    })
    .catch(() => alert('Failed to fetch weather data.'));
}

// Weather code to icon logic (simplified)
function getWeatherIcon(code) {
  const iconMap = {
    0: '☀️',   // Clear sky
    1: '🌤️',   // Mainly clear
    2: '⛅',   // Partly cloudy
    3: '☁️',   // Overcast
    45: '🌫️',  // Fog
    48: '🌫️',  // Depositing rime fog
    51: '🌦️',  // Light drizzle
    53: '🌦️',  // Moderate drizzle
    55: '🌦️',  // Dense drizzle
    61: '🌧️',  // Slight rain
    63: '🌧️',  // Moderate rain
    65: '🌧️',  // Heavy rain
    71: '🌨️',  // Slight snow
    73: '🌨️',  // Moderate snow
    75: '🌨️',  // Heavy snow
    77: '❄️',   // Snow grains
    80: '🌦️',  // Slight rain showers
    81: '🌧️',  // Moderate rain showers
    82: '🌧️',  // Violent rain showers
    85: '🌨️',  // Slight snow showers
    86: '🌨️',  // Heavy snow showers
    95: '⛈️',  // Thunderstorm
    96: '⛈️',  // Thunderstorm with slight hail
    99: '⛈️'   // Thunderstorm with heavy hail
  };

  // Return emoji as string, or fallback
  return String(iconMap[code] || "❓");
}

function getWeatherCondition(code) {
  switch (true) {
    case code === 0:
      return "Clear sky";
    case [1, 2, 3].includes(code):
      return "Mainly clear, partly cloudy, or overcast";
    case [45, 48].includes(code):
      return "Fog or depositing rime fog";
    case [51, 53, 55].includes(code):
      return "Drizzle: Light, moderate, or dense intensity";
    case [56, 57].includes(code):
      return "Freezing drizzle: Light or dense intensity";
    case [61, 63, 65].includes(code):
      return "Rain: Slight, moderate, or heavy intensity";
    case [66, 67].includes(code):
      return "Freezing rain: Light or heavy intensity";
    case [71, 73, 75].includes(code):
      return "Snowfall: Slight, moderate, or heavy intensity";
    case code === 77:
      return "Snow grains";
    case [80, 81, 82].includes(code):
      return "Rain showers: Slight, moderate, or violent";
    case [85, 86].includes(code):
      return "Snow showers: Slight or heavy";
    case code === 95:
      return "Thunderstorm: Slight or moderate";
    case [96, 99].includes(code):
      return "Thunderstorm with hail: Slight or heavy";
    default:
      return "Unknown weather condition";
  }
}

function getCityName(lat, lon) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById('cityName').textContent = data.city || data.locality || 'Unknown location';
    })
    .catch(err => {
      console.error('Failed to get city name:', err);
      document.getElementById('cityName').textContent = 'Unknown location';
    });
}