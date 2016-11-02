var localTime = new Date().getHours();
var currentLatitude;
var currentLongitude;
var rawTemp;
var fahrenheitTemp;
var celsiusTemp;
var fahrenheitTempDisplay;
var celsiusTempDisplay;
var weatherDescription;
var weatherCode;
//var sunsetTime;
var locationName;
var countryCode;
var dayOrNight;
//must access weatherCodeIcons values with object[value] notation
var dayIcons = {
	200: "day-thunderstorm",
	201: "day-thunderstorm",
	202: "day-thunderstorm",
	210: "day-lightning",
	211: "day-lightning",
	212: "day-lightning",
	221: "day-lightning",
	230: "day-thunderstorm",
	231: "day-thunderstorm",
	232: "day-thunderstorm",
	300: "day-sprinkle",
	301: "day-sprinkle",
	302: "day-rain",
	310: "day-rain",
	311: "day-rain",
	312: "day-rain",
	313: "day-rain",
	314: "day-rain",
	321: "day-sprinkle",
	500: "day-sprinkle",
	501: "day-rain",
	502: "day-rain",
	503: "day-rain",
	504: "day-rain",
	511: "day-rain-mix",
	520: "day-showers",
	521: "day-showers",
	522: "day-showers",
	531: "day-storm-showers",
	600: "day-snow",
	601: "day-sleet",
	602: "day-snow",
	611: "day-rain-mix",
	612: "day-rain-mix",
	615: "day-rain-mix",
	616: "day-rain-mix",
	620: "day-rain-mix",
	621: "day-snow",
	622: "day-snow",
	701: "day-showers",
	711: "smoke",
	721: "day-haze",
	731: "dust",
	741: "day-fog",
	761: "dust",
	762: "dust",
	781: "tornado",
	800: "day-sunny",
	801: "day-cloudy-gusts",
	802: "day-cloudy-gusts",
	803: "day-cloudy-gusts",
	804: "day-sunny-overcast",
	900: "tornado",
	902: "hurricane",
	903: "snowflake-cold",
	904: "hot",
	906: "day-hail",
	957: "strong-wind",
};

var nightIcons = {	
	200: "night-alt-thunderstorm",
	201: "night-alt-thunderstorm",
	202: "night-alt-thunderstorm",
	210: "night-alt-lightning",
	211: "night-alt-lightning",
	212: "night-alt-lightning",
	221: "night-alt-lightning",
	230: "night-alt-thunderstorm",
	231: "night-alt-thunderstorm",
	232: "night-alt-thunderstorm",
	300: "night-alt-sprinkle",
	301: "night-alt-sprinkle",
	302: "night-alt-rain",
	310: "night-alt-rain",
	311: "night-alt-rain",
	312: "night-alt-rain",
	313: "night-alt-rain",
	314: "night-alt-rain",
	321: "night-alt-sprinkle",
	500: "night-alt-sprinkle",
	501: "night-alt-rain",
	502: "night-alt-rain",
	503: "night-alt-rain",
	504: "night-alt-rain",
	511: "night-alt-rain-mix",
	520: "night-alt-showers",
	521: "night-alt-showers",
	522: "night-alt-showers",
	531: "night-alt-storm-showers",
	600: "night-alt-snow",
	601: "night-alt-sleet",
	602: "night-alt-snow",
	611: "night-alt-rain-mix",
	612: "night-alt-rain-mix",
	615: "night-alt-rain-mix",
	616: "night-alt-rain-mix",
	620: "night-alt-rain-mix",
	621: "night-alt-snow",
	622: "night-alt-snow",
	701: "night-alt-showers",
	711: "smoke",
	721: "day-haze",
	731: "dust",
	741: "night-fog",
	761: "dust",
	762: "dust",
	781: "tornado",
	800: "night-clear",
	801: "night-alt-cloudy-gusts",
	802: "night-alt-cloudy-gusts",
	803: "night-alt-cloudy-gusts",
	804: "night-alt-cloudy",
	900: "tornado",
	902: "hurricane",
	903: "snowflake-cold",
	904: "hot",
	906: "night-alt-hail",
	957: "strong-wind"
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
		fahrenheitTempDisplay = fahrenheitTemp + "&#176 F";
		celsiusTempDisplay = celsiusTemp + "&#176 C";
		weatherDescription = data.weather[0].description;
		weatherCode = data.weather[0].id;
		//sunsetTime = data.sys.sunset;
		locationName = data.name;
		countryCode = data.sys.country;
		console.log(rawTemp, fahrenheitTemp, celsiusTemp, weatherDescription, weatherCode, locationName, countryCode);
		if(localTime <= 7 || localTime >= 20) {
			dayOrNight = "night";
		} else {
			dayOrNight = "day";
		}
		console.log('It is currently ' + dayOrNight + "time.");
		updateDisplay();
	});
}

function updateDisplay() {
	//removes visuallyhidden class to show app data all at once
	document.getElementById("app_wrapper").className = "";
	//updates text displays
	document.getElementById("temp_display").innerHTML = fahrenheitTempDisplay;
	document.getElementById("loc_display").innerHTML = locationName + ", " + countryCode;
	/* 	updates icon based on weather and day or night
			sets color palette based on temp and day/night 	*/
	var colorTemperature;
	if(dayOrNight === "night") {
		document.getElementById("icon_holder").innerHTML = "<i class=\"wi wi-" + nightIcons[weatherCode] + "\"></i>";
		switch(true) {
			case fahrenheitTemp<35: colorTemperature = "night_cold";
			break; 
			case fahrenheitTemp<60: colorTemperature = "night_cool";
			break; 
			case fahrenheitTemp<80: colorTemperature = "night_warm";
			break; 
			case fahrenheitTemp>=80: colorTemperature = "night_hot";
			break; 
			default: colorTemperature = "night_cool";
		}
	} else if(dayOrNight === "day") {
			document.getElementById("icon_holder").innerHTML = "<i class=\"wi wi-" + dayIcons[weatherCode] + "\"></i>";
			switch(true) {
				case fahrenheitTemp<35: colorTemperature = "day_cold";
					break; 
				case fahrenheitTemp<60: colorTemperature = "day_cool";
					break; 
				case fahrenheitTemp<80: colorTemperature = "day_warm";
					break; 
				case fahrenheitTemp>=80: colorTemperature = "day_hot";
					break; 
				default: colorTemperature = "day_hot";
		}
	}
	document.getElementById("body").className = colorTemperature;
}

$(document).ready(function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(updateLocation);
	} else {
			target.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
	}
});

