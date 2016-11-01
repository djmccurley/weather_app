var localTime = new Date().getHours();
var currentLatitude;
var currentLongitude;
var rawTemp;
var fahrenheitTemp;
var celsiusTemp;
var weatherDescription;
var weatherCode;
//var sunsetTime;
var locationName;
var countryCode;
var dayorNight;

function updateLocation(position) {
	currentLatitude = position.coords.latitude;
	currentLongitude = position.coords.longitude;
	console.log("Lat = " + currentLatitude);
	console.log("Long = " + currentLongitude);
	console.log(localTime);
	getWeather();
}

function getWeather() {
	console.log("getWeather running");
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + currentLatitude + "&lon=" + currentLongitude + "&APPID=a001db6b0e2e052f5af44a88b34090b7", function(data) {
		console.log(data);
		rawTemp = data.main.temp;
		fahrenheitTemp = (1.8 * (rawTemp - 273)) + 32;
		celsiusTemp = rawTemp - 273.15;
		weatherDescription = data.weather[0].description;
		weatherCode = data.weather[0].id;
		//sunsetTime = data.sys.sunset;
		locationName = data.name;
		countryCode = data.sys.country;
		console.log(rawTemp, fahrenheitTemp, celsiusTemp, weatherDescription, weatherCode, locationName, countryCode);
		if(localTime <= 7 || localTime >= 20) {
			dayorNight = "night";
		} else {
			dayorNight = "day";
		}
		console.log('It is currently ' + dayorNight + "time.");

	});
}



$(document).ready(function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(updateLocation);
	} else {
			target.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
	}
});

