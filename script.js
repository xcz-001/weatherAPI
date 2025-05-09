const apiKey = 'YOUR_API_KEY_HERE';

function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById('cityName').textContent = data.name;
      document.getElementById('description').textContent = data.weather[0].description;
      document.getElementById('temperature').textContent = `${data.main.temp} °C`;
      document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById('weatherBox').classList.remove('hidden');
    })
    .catch(() => alert('City not found.'));
}