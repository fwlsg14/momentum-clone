//전역 상수
const WEATHER_BRIEF = document.querySelector(`#weather-brief`);
const WEATHER_DETAIL = document.querySelector(`#weather-detail`);
//모듈 변수
let weather = {};
weather.currentLocation = {};
weather.currentWeather = {};

//초기 실행 함수
weather.init = function () {
  weather.loadLocation();
  weather.getWeather();
};

//location 불러오기
weather.loadLocation = function () {
  const localLocation = localStorage.getItem(`location`);
  if (localLocation === null) {
    weather.getlocation();
  } else {
    const loadObject = JSON.parse(localStorage.getItem(`location`));
    const latitude = loadObject.latitude;
    const longitude = loadObject.longitude;
    weather.currentLocation = { latitude, longitude };
  }
};
//location 얻기
weather.getlocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        weather.currentLocation = { latitude, longitude };
        localStorage.setItem(`location`, JSON.stringify(weather.currentLocation));
      },
      function () {
        console.log(`Geolocation is not supported by this browser.`);
      }
    );
  } else {
    console.log(`Geolocation is not supported by this browser.`);
  }
};
//weather 얻기
weather.getWeather = function () {
  if (weather.currentLocation.latitude) {
    const location = weather.currentLocation;
    const lat = location.latitude;
    const lon = location.longitude;
    const apiKey = `0f097166a0d965593fdf60426de7630f`;
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    )
      .then((response) => {
        return response.json();
      }) //날씨 불러오기
      .then((json) => {
        console.log(json);
        object = {
          name: json.name,
          feelsTemp: json.main.feels_like,
          humidity: json.main.humidity,
          pressure: json.main.pressure,
          temp: json.main.temp,
          sunrise: json.sys.sunrise,
          sunset: json.sys.sunset,
          windDeg: json.wind.deg,
          windSpeed: json.wind.speed,
          weatherMain: json.weather[0].main,
          weatherDesc: json.weather[0].description,
          weatherIcon: json.weather[0].icon,
        };
        if (json.rain) {
          object.rain1h = json.rain[`1h`];
          object.rain3h = json.rain[`3h`];
        }
        if (json.snow) {
          object.snow1h = json.snow[`1h`];
          object.snow3h = json.snow[`3h`];
        }
        return object;
      })
      .then((object) => {
        //간략한 날씨 표시
        const weatherIcon = object.weatherIcon;
        const tempKelvin = object.temp;
        const name = object.name;
        console.log(weatherIcon, tempKelvin, name);
        //element 생성
        const img = document.createElement("img");
        const src = document.createAttribute("src");
        src.value = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
        img.setAttributeNode(src);
        const tempSpan = document.createElement("span");
        const tempCelsius = tempKelvin - 273.15;
        tempSpan.innerText = `${tempCelsius}ºC`;
        const location = document.createElement("p");
        location.innerText = `${name}`;
        //element #weather-brief에 넣기
        WEATHER_BRIEF.appendChild(img);
        WEATHER_BRIEF.appendChild(tempSpan);
        WEATHER_BRIEF.appendChild(location);
      });
  }
};
// // weather-brief 클릭시 weather-detail 토글
// weather.toggleWeatherDetail = function () {
//   toggleHidden(WEATHER_DETAIL);
// };

weather.init();
