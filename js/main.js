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
//must access weatherCodeIcons values with object[value] notation
var weatherCodeIcons = {
	200: "thunderstorm",
	201: "thunderstorm",
	202: "thunderstorm",
	210: "lightning",
	211: "lightning",
	212: "lightning",
	221: "lightning",
	230: "thunderstorm",
	231: "thunderstorm",
	232: "thunderstorm",
	300: "sprinkle",
	301: "sprinkle",
	302: "rain",
	310: "rain-mix",
	311: "rain",
	312: "rain",
	313: "showers",
	314: "rain",
	321: "sprinkle",
	500: "sprinkle",
	501: "rain",
	502: "rain",
	503: "rain",
	504: "rain",
	511: "rain-mix",
	520: "showers",
	521: "showers",
	522: "showers",
	531: "storm-showers",
	600: "snow",
	601: "snow",
	602: "sleet",
	611: "rain-mix",
	612: "rain-mix",
	615: "rain-mix",
	616: "rain-mix",
	620: "rain-mix",
	621: "snow",
	622: "snow",
	701: "showers",
	711: "smoke",
	721: "day-haze",
	731: "dust",
	741: "fog",
	761: "dust",
	762: "dust",
	771: "cloudy-gusts",
	781: "tornado",
	800: "day-sunny",
	801: "cloudy-gusts",
	802: "cloudy-gusts",
	803: "cloudy-gusts",
	804: "cloudy",
	900: "tornado",
	901: "storm-showers",
	902: "hurricane",
	903: "snowflake-cold",
	904: "hot",
	905: "windy",
	906: "hail",
	957: "strong-wind",
};	

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
		fahrenheitTemp = Math.floor((1.8 * (rawTemp - 273)) + 32);
		celsiusTemp = Math.floor(rawTemp - 273.15);
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
		updateDisplay();
	});
}

function updateDisplay() {
	document.getElementById("app_wrapper").className = "";
	document.getElementById("temp_display").innerHTML = fahrenheitTemp;
	document.getElementById("icon_holder").innerHTML = "<i class=\"wi wi-" + weatherCodeIcons[weatherCode] + "\"></i>";
	// <i class="wi wi-sprinkle"></i>
	document.getElementById("loc_display").innerHTML = locationName + ", " + countryCode;
}

$(document).ready(function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(updateLocation);
	} else {
			target.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
	}
});

