var target = document.getElementById("target");
var currentLatitude;
var currentLongitude;
var rawTemp;
var fahrenheitTemp;
var celsiusTemp;
var weatherDescription;
var locationName;

function updateLocation(position) {
	currentLatitude = position.coords.latitude;
	currentLongitude = position.coords.longitude;
	console.log("Lat = " + currentLatitude);
	console.log("Long = " + currentLongitude);
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
		locationName = data.name;
		console.log(rawTemp, fahrenheitTemp, celsiusTemp, weatherDescription, locationName);
	});
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(updateLocation);
} else {
		target.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
}

