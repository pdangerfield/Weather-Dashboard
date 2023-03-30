
//Todo list
//- api call to openweather
//- event listener on form button
//- event listener on all cities in search history
//- function to call api
//- collect weather from api
//-obtain API key


var historyList = document.querySelector('ul');
var searchBtn = document.getElementById('search-button');
// var apiKey = '{91585b227016d7e64d963eaaca28e0a9}';


function getWeather() {
  console.log("hello");
var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={91585b227016d7e64d963eaaca28e0a9}';

fetch(requestUrl)
.then(function (response){
  return response.json();
})
.then(function (list) {
  for (var i = 0; i < list.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = list[i].weather;
    repoList.appendChild(listItem);
  }
});
}

searchBtn.addEventListener('click', getWeather);