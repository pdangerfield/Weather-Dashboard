
//Todo list
//- api call to openweather
//- event listener on form button
//- event listener on all cities in search history
//- store search history
//- function to call api
//- collect weather from api
//-obtain API key


var historyList = document.querySelector('ul');
var displayCurrentWeather = document.getElementById('display-current-weather');
var searchBtn = document.getElementById('search-button');
var apiKey = '91585b227016d7e64d963eaaca28e0a9';
var lat = '40.314117';
var lon = '-112.006882';
var cityNameEl = document.querySelector("#city-search")

var cityName = cityNameEl.value.trim();
var cities = [];


function getCurrentWeather(event) {
  event.preventDefault();
  var cityName = cityNameEl.value.trim();
  localStorage.setItem("cities", cityName);

  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      var icon = document.createElement('img');
      var iconId = data.weather[0].icon;
      icon.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
      var currentTemp = document.createElement('li');
      var currentCity = document.createElement('h2');
      var currentHumidity = document.createElement('li');
      var currentDate = document.createElement('h2');
      var currentWind = document.createElement('li');
      var iconHeader = document.getElementById('current-weather-icon');
      iconHeader.insertAdjacentHTML('afterend', icon.outerHTML);
      var utcDate = new Date();
      var shiftSeconds = data.timezone;
      var localTime = utcDate.getTime() + (shiftSeconds * 1000);
      var localDate = new Date();
      localDate.setTime(localTime);
      var localDateString = localDate.toLocaleDateString();
      console.log(iconId);
      

      temperature = document.createTextNode("Temp: " + data.main.temp + ' \u00B0F');
      currentCityName = document.createTextNode(data.name);
      currentCityHumidity = document.createTextNode("The humidity is currently " + data.main.humidity + "%");
      currentCityDate = document.createTextNode(localDateString);
      wind = document.createTextNode(data.wind.speed + " MPH");



      currentTemp.appendChild(temperature);
      currentCity.appendChild(currentCityName);
      currentHumidity.appendChild(currentCityHumidity);
      currentDate.appendChild(currentCityDate);
      currentWind.appendChild(wind);


      displayCurrentWeather.appendChild(currentCity);
      displayCurrentWeather.appendChild(currentDate);
      displayCurrentWeather.appendChild(currentTemp);
      displayCurrentWeather.appendChild(currentHumidity);      
      displayCurrentWeather.appendChild(currentWind);

    });
}

//I am presented with the city name, the date, 
//an icon representation of weather conditions, the temperature, 
//the humidity, and the the wind speed






// stringify and sets key in local storage to cities array
// function storeSearchHistory(){
//   localStorage.setItem("cities", JSON.stringify(cities));
// }


// This code is to create the search history of the cities and create the list. currently the getItem from local storage is not working.

// var listItem = document.createElement('li');
//     listItem.textContent = data.name;
//     historyList.appendChild(listItem);
//     localStorage.getItem(cityName);





searchBtn.addEventListener('click', getCurrentWeather);





