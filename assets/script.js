
//Todo list
//- api call to openweather
//- event listener on form button
//- event listener on all cities in search history
//- function to call api
//- collect weather from api
//-obtain API key


var historyList = document.querySelector('ul');
var searchBtn = document.getElementById('search-button');
var apiKey = '91585b227016d7e64d963eaaca28e0a9';
var lat = '40.314117';
var lon = '-112.006882';
var cityName = 'Eagle Mountain'

function getWeather(){
  event.preventDefault();
var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;



fetch(requestUrl)
.then(function (response){
  return response.json();  
})
.then(function (data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = data[i].weather;
    repoList.appendChild(listItem);
  }
});
}

searchBtn.addEventListener('click', getWeather);



