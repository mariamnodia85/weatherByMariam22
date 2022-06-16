let now = new Date();
let h1 = document.querySelector("h1");

let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
h1.innerHTML = `${day}, ${date} ${month} ${year}, 
 <br>
 ${hour}:${minutes} `;
console.log(date);

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchForLocation);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", showCurrentLocation);


function showWeather(response) {
  console.log(response.data);
  let description=document.querySelector("#description");
  let iconElement=document.querySelector ("#icon");
  celsiusTemperature = response.data.main.temp;
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temperatureId").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
 
  document.querySelector("#description").innerHTML  = response.data.weather[0].description;
  

}
function search(event) {
  event.preventDefault();

  let apiKey = "4c299453cbc989474d2293ba0fa4cac6";
  let city = document.querySelector("#search-input").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function searchForLocation(position) {
  let apiKey = "4c299453cbc989474d2293ba0fa4cac6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function displayFarhenheitTemperature(event) {
event.preventDefault();
let farhenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
let temperatureElemenet=document.querySelector("#temperatureId");
temperatureElemenet.innerHTML = Math.round(farhenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElemenet=document.querySelector("#temperatureId");
  temperatureElemenet.innerHTML = Math.round(celsiusTemperature);
  }
let celsiusTemperature = null;
let form = document.querySelector("form");
form.addEventListener("submit", search);

let farhetLink = document.querySelector("#farhet-link");
farhetLink.addEventListener("click", displayFarhenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);