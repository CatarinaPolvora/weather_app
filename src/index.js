function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);



function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-name");
  let city = document.querySelector("h1");
  city.innerHTML = cityInput.value;
  insertCity(cityInput.value);
}

let form = document.querySelector("#search-city");

form.addEventListener("submit", search);

function insertCity(city) {
  let apiKey = "d4a6a488c953cc85e69ba334cc42f424";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let iconElement = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);
  let actualTemp = document.querySelector("#temperature");
  let weatherDescription = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let currentWeather = document.querySelector("#weather-description");
  currentWeather.innerHTML = weatherDescription;

  let currentWindSpeed = document.querySelector("#wind");
  currentWindSpeed.innerHTML = `Wind: ${windSpeed}km/h`;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  actualTemp.innerHTML = `${temperature}°C`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
 getForecast(response.data.coord);
}

function showWeather(response) {
  let iconElement = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let currentWeather = document.querySelector("#weather-description");
  currentWeather.innerHTML = weatherDescription;

  let currentWindSpeed = document.querySelector("#wind");
  currentWindSpeed.innerHTML = `Wind: ${windSpeed}km/h`;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("#temperature");
  h1.innerHTML = `${response.data.name}`;
  h2.innerHTML = `${temperature}°C`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
  
}

function showPosition(position) {
  let apiKey = "d4a6a488c953cc85e69ba334cc42f424";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
document
  .querySelector("#current-location")
  .addEventListener("click", getPosition);

  function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun","Mon"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-sm">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
  
}


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d4a6a488c953cc85e69ba334cc42f424";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

insertCity("Lisbon");