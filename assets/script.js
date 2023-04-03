
//Todo list
//- api call to openweather -good
//- event listener on form button - good
//- event listener on all cities in search history
//- store search history
//- function to call api
//- collect weather from api
//-obtain API key - done



// creating variables
var historyList = document.getElementById('history');
var displayCurrentWeather = document.getElementById('display-current-weather');
var searchBtn = document.getElementById('search-button');
var apiKey = '91585b227016d7e64d963eaaca28e0a9';

var cityNameEl = document.querySelector("#city-search")

var cityName = cityNameEl.value.trim();
var cities = [];

// function to store the name of the city entered into local storage

function storeCities(cityName) {
  cities.push(cityName);
  localStorage.setItem("cities", JSON.stringify(cities));
}

// function to clear the previous icon when new current weather is loaded
function clearWeathericon(){
  var existingIcon = document.getElementById('weather-icon');
  if(existingIcon){
    existingIcon.remove();
  }
}

// function to get the current weather from openAPI and then get the wind, temp, 
//name, date, humidity and append it to the DOM

function getCurrentWeather(event) {
  event.preventDefault();
  var cityName = cityNameEl.value.trim();
  

  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      //clear existing current weather
      displayCurrentWeather.innerHTML = '';
      clearWeathericon();

      var iconHeader = document.getElementById('display-current-weather');
      var existingIcon = document.getElementById('weather-icon');
      if (existingIcon) {
        iconHeader.removeChild(existingIcon);
      } 

//display current weather
      var icon = document.createElement('img');
      var iconId = data.weather[0].icon;
      icon.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
      icon.id = 'weather-icon';
      var currentTemp = document.createElement('li');
      var currentCity = document.createElement('h2');
      var currentHumidity = document.createElement('li');
      var currentDate = document.createElement('h2');
      var currentWind = document.createElement('li');
      var iconHeader = document.getElementById('display-current-weather');
      
      var utcDate = new Date();
      var shiftSeconds = data.timezone;
      var localTime = utcDate.getTime() + (shiftSeconds * 1000);
      var localDate = new Date();
      localDate.setTime(localTime);
      var localDateString = localDate.toLocaleDateString();
  
      

      temperature = document.createTextNode("Temp: " + data.main.temp + ' \u00B0F');
      currentCityName = document.createTextNode(data.name);
      currentCityHumidity = document.createTextNode("Humidity:  " + data.main.humidity + "%");
      currentCityDate = document.createTextNode(localDateString);
      wind = document.createTextNode("Wind: " + data.wind.speed + " MPH");



      currentTemp.appendChild(temperature);
      currentCity.appendChild(currentCityName);
      currentHumidity.appendChild(currentCityHumidity);
      currentDate.appendChild(currentCityDate);
      currentWind.appendChild(wind);

      iconHeader.insertAdjacentHTML('afterend', icon.outerHTML);
      displayCurrentWeather.appendChild(currentCity);
      displayCurrentWeather.appendChild(currentDate);
      displayCurrentWeather.appendChild(currentTemp);
      displayCurrentWeather.appendChild(currentHumidity);      
      displayCurrentWeather.appendChild(currentWind);

// add the searched city to history list
      var listItem = document.createElement('li');
          listItem.textContent = data.name;
          historyList.appendChild(listItem);
          

    // store city in local storage
storeCities(cityName);
renderCities();

    });
}

// function to show the cities stored in storage
function renderCities(){
  historyList.innerHTML = "";
  for(var i = 0; i < cities.length; i++){
    var listItem = document.createElement('li');
    listItem.textContent = cities[i];
    historyList.appendChild(listItem);
  }
}

// initial function when page is loaded that will get the cities and then call the render cities funciton
function init(){
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if(storedCities !== null){
    cities = storedCities;
  }
  renderCities();
}

// function to display weather when search history is clicked


function displayWeatherForCity(cityName){
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      //clear existing current weather
      displayCurrentWeather.innerHTML = '';
      clearWeathericon();

      var iconHeader = document.getElementById('display-current-weather');
      var existingIcon = document.getElementById('weather-icon');
      if (existingIcon) {
        iconHeader.removeChild(existingIcon);
      } 

//display current weather
      var icon = document.createElement('img');
      var iconId = data.weather[0].icon;
      icon.src = `http://openweathermap.org/img/w/${iconId}.png`;
      icon.id = 'weather-icon';
      var currentTemp = document.createElement('li');
      var currentCity = document.createElement('h2');
      var currentHumidity = document.createElement('li');
      var currentDate = document.createElement('h2');
      var currentWind = document.createElement('li');
      var iconHeader = document.getElementById('display-current-weather');
      
      var utcDate = new Date();
      var shiftSeconds = data.timezone;
      var localTime = utcDate.getTime() + (shiftSeconds * 1000);
      var localDate = new Date();
      localDate.setTime(localTime);
      var localDateString = localDate.toLocaleDateString();
  
      

      temperature = document.createTextNode("Temp: " + data.main.temp + ' \u00B0F');
      currentCityName = document.createTextNode(data.name);
      currentCityHumidity = document.createTextNode("Humidity:  " + data.main.humidity + "%");
      currentCityDate = document.createTextNode(localDateString);
      wind = document.createTextNode("Wind: " + data.wind.speed + " MPH");



      currentTemp.appendChild(temperature);
      currentCity.appendChild(currentCityName);
      currentHumidity.appendChild(currentCityHumidity);
      currentDate.appendChild(currentCityDate);
      currentWind.appendChild(wind);

      iconHeader.insertAdjacentHTML('afterend', icon.outerHTML);
      displayCurrentWeather.appendChild(currentCity);
      displayCurrentWeather.appendChild(currentDate);
      displayCurrentWeather.appendChild(currentTemp);
      displayCurrentWeather.appendChild(currentHumidity);      
      displayCurrentWeather.appendChild(currentWind);


    });
}


// function to get the  5 day forecast
function fiveDayForecast(cityName){
  event.preventDefault();
  var cityName = cityNameEl.value.trim();
  

  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      displayFiveDayForecast(data);

});
}

//function to display the 5 day forecast

function displayFiveDayForecast(data) {
var forecastContainer = document.getElementById("5-day-forecast");
forecastContainer.innerHTML = ""; // clear previous content

for (var i = 0; i < data.list.length; i += 8) { // step 8 to get daily forecast
  var dayData = data.list[i];
  var card = document.createElement("div");
  card.classList.add("card");

  // Create and append card content
  var cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  var date = new Date(dayData.dt * 1000).toLocaleDateString("en-US", {weekday: "long"});
  var dateEl = document.createElement("h5");
  dateEl.classList.add("card-title");
  dateEl.textContent = date;

  var iconCode = dayData.weather[0].icon;
  var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  var iconEl = document.createElement("img");
  iconEl.src = iconUrl;
  iconEl.alt = dayData.weather[0].description;

  var temp = Math.round(dayData.main.temp);
  var tempEl = document.createElement("p");
  tempEl.classList.add("card-text");
  tempEl.innerHTML = `${temp}&deg;F`;

  cardBody.append(dateEl, iconEl, tempEl);
  card.append(cardBody);
  forecastContainer.append(card);
}
}

// add event listener to history items
historyList.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.matches('li')) {
    var cityName = event.target.textContent.trim();
    displayWeatherForCity(cityName);
    fiveDayForecast(cityName);
  }
});










init();

searchBtn.addEventListener('click', getCurrentWeather);
searchBtn.addEventListener('click', fiveDayForecast);


