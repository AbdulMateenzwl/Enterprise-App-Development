function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'e189b04e5a19401690c73510240602';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey} &q=${city}&aqi=no`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const weatherData = JSON.parse(xhr.responseText);
            console.log('Weather data:', weatherData);
            displayWeather(weatherData);
        } else {
            console.error('Error fetching weather data:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Network error occurred');
    };
    xhr.send();
}

function displayWeather(weatherData) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
      <h2>${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}</h2>
      <p>Local Time: ${weatherData.location.localtime}</p>
      <p>Temperature: ${weatherData.current.temp_c}°C / ${weatherData.current.temp_f}°F</p>
      <p>Weather: ${weatherData.current.condition.text}</p>
      <img src="https:${weatherData.current.condition.icon}" alt="Weather Icon">
      <p>Wind: ${weatherData.current.wind_kph} km/h ${weatherData.current.wind_dir}</p>
      <p>Pressure: ${weatherData.current.pressure_mb} mb / ${weatherData.current.pressure_in} in</p>
      <p>Humidity: ${weatherData.current.humidity}%</p>
      <p>Cloudiness: ${weatherData.current.cloud}%</p>
      <p>Feels Like: ${weatherData.current.feelslike_c}°C / ${weatherData.current.feelslike_f}°F</p>
      <p>Visibility: ${weatherData.current.vis_km} km / ${weatherData.current.vis_miles} miles</p>
      <p>UV Index: ${weatherData.current.uv}</p>
      <p>Gust Speed: ${weatherData.current.gust_kph} km/h</p>
    `;
}

