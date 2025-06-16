document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('toggleButton');
    const mainContent = document.getElementById('mainContent');
  
    button.addEventListener('click', () => {
      mainContent.classList.toggle('dark-theme-boxes');
    });
  });
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
  
    document.getElementById("hours").textContent = h;
    document.getElementById("minutes").textContent = m;
    document.getElementById("seconds").textContent = s;
  }
  
  setInterval(updateClock, 1000);
  updateClock(); // Run once immediately

  //----------------------------------------------------------------


  async function fetchWeatherData(city) {
    const apiKey = 'b83ae1337fc0b36ed792b3275a4e3b90'; // Add your actual OpenWeatherMap API key here
  
    try {
        const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`);
        const geoData = await geoResponse.json();
  
        if (!geoData.length) throw new Error('City not found');
  
        const { lat, lon } = geoData[0];
  
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();
  
        return {
            temperature: weatherData.main.temp,
            condition: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed
        };
    } catch (error) {
        throw new Error('Error fetching weather data: ' + error.message);
    }
  }
  
  function displayWeatherData(weatherData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const display = document.getElementById('weatherDisplay');
            display.innerHTML = `
                <p>🌡 Temperature: ${weatherData.temperature}°C</p>
                <p>🌤 Condition: ${weatherData.condition}</p>
                <p>💧 Humidity: ${weatherData.humidity}%</p>
                <p>🌬 Wind Speed: ${weatherData.windSpeed} m/s</p>
            `;
            resolve();
        }, 500);
    });
  }
  
  document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('enterCity').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
  
    fetchWeatherData(city)
        .then(displayWeatherData)
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('weatherDisplay').innerHTML = `<p>${error.message}</p>`;
        });
  });