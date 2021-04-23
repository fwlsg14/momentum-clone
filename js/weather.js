//전역 상수

//모듈 변수
let weather = {};
weather.currentLocation = {};

//초기 실행 함수
weather.init = function () {
  weather.loadLocation();
  weather.getWeather();
};
//weather 얻기
weather.getWeather = function () {
  if (weather.currentLocation.latitude) {
    console.log("weather");
    (function () {
      const location = weather.currentLocation;
      const lat = location.latitude;
      const lon = location.longitude;
      const apiKey = `0f097166a0d965593fdf60426de7630f`;
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          console.log(json);
          weather.currentWeather = {
            feelsTemp: json.main.feels_like,
            humidity: json.main.humidity,
            pressure: json.main.pressure,
            temp: json.main.temp,
            sunrise: json.sys.sunrise,
            sunset: json.sys.sunset,
            windDeg: json.wind.deg,
            windSpeed: json.wind.speed,
          };
          console.dir(weather.currentWeather);
        });
    })();
  }
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

weather.init();
