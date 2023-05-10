const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const locationInput = document.getElementById('location-input');
  const location = locationInput.value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8c2a600d5d63d7fb13432fd58dcc419b&units=metric`)
    .then(response => response.json())
    .then(data => {
      const weatherData = document.getElementById('weather-data');
      weatherData.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div>
          <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
          <span>${data.main.temp}&deg;C</span>
        </div>
        <p>${data.weather[0].description}</p>
        <p>Feels like ${data.main.feels_like}&deg;C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind speed: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(error => {
      const weatherData = document.getElementById('weather-data');
      weatherData.innerHTML = `
        <p>Error: Unable to retrieve weather data for ${location}</p>
      `;
    });
});
