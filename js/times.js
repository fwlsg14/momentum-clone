//전역 상수 대문자 스네이크케이스로 작성
const TIME_CONTAINER = document.querySelector("#time-section");
const NORMAL_CLOCK = TIME_CONTAINER.querySelector("#normal-clock");
const NORMAL_TIME = NORMAL_CLOCK.querySelector("time");
const NORMAL_CLOCK_BTN = NORMAL_CLOCK.querySelector("#normal-clock__btn");
const NORMAL_CLOCK_MENU = NORMAL_CLOCK.querySelector("#normal-clock__menu");
const TOGGLE_24_HOUR = NORMAL_CLOCK_MENU.querySelector("#toggle-24-hour");
//모듈 변수
let times = {};
times.twentyFourClockBoolen = localStorage.getItem("twentyFourClockBoolen");
//초기 실행 함수
times.init = function () {
  times.getTimeData();
  times.normalClockTime();
  times.timeInterval();
  times.listenMouseEvents();
};
//시간 생성
times.getTimeData = function () {
  const date = new Date();
  return date;
};
//마우스 이벤트 처리
times.revealNormalClockButton = function () {
  reveal(NORMAL_CLOCK_BTN);
};

times.hideNormalClockMore = function () {
  hide(NORMAL_CLOCK_BTN);
  hide(NORMAL_CLOCK_MENU);
};

times.toggleNormalClockMenu = function () {
  toggleHidden(NORMAL_CLOCK_MENU);
};
//마우스 이벤트 감지
times.listenMouseEvents = function () {
  TIME_CONTAINER.addEventListener("mouseenter", times.revealNormalClockButton);
  TIME_CONTAINER.addEventListener("mouseleave", times.hideNormalClockMore);
  NORMAL_CLOCK_BTN.addEventListener("mousedown", times.toggleNormalClockMenu);
  TOGGLE_24_HOUR.addEventListener("mousedown", times.toggleTwentyFourClock);
};
//24시간 시계 토글
times.toggleTwentyFourClock = function () {
  if (times.twentyFourClockBoolen !== false) {
    times.twentyFourClockBoolen = false;
    localStorage.setItem("twentyFourClockBoolen", false);
    console.log(`24시간 시계 : ${times.twentyFourClockBoolen}`);
  } else {
    times.twentyFourClockBoolen = true;
    localStorage.setItem("twentyFourClockBoolen", true);
    console.log(`24시간 시계 : ${times.twentyFourClockBoolen}`);
  }
  times.normalClockTime();
};
//일반시계
times.normalClockTime = function () {
  const date = times.getTimeData();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const checkbox = TOGGLE_24_HOUR.querySelector(`input`);

  if (times.twentyFourClockBoolen !== false) {
    NORMAL_TIME.innerText = `${hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
    checkbox.checked = true;
  } else {
    NORMAL_TIME.innerText = `${hours > 12 ? `${hours % 12}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
    checkbox.checked = false;
  }
};
//1초 인터벌
times.timeInterval = function () {
  setInterval(times.normalClockTime, 1000);
};

times.init();
