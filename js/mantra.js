//전역상수 대문자 스네이크케이스
const MANTRA_CONTAINER = document.querySelector("#mantra-section");
const NEW_USERNAME = MANTRA_CONTAINER.querySelector("#new-username");
const MANTRA = MANTRA_CONTAINER.querySelector("#mantra");
const NEW_USERNAME_INPUT = NEW_USERNAME.querySelector("input");
const MANTRA_TEXT = MANTRA.querySelector("p");
const MANTRA_BTN = MANTRA.querySelector("#mantra__btn");
const MANTRA_MENU = MANTRA.querySelector("#mantra__menu");
const EDITNAME_BTN = MANTRA_MENU.querySelector("#edit-name-btn");

//모듈 변수
let mantra = {};
//초기 실행 함수
mantra.init = function () {
  mantra.usernameCheck();
  mantra.getName();
  mantra.listenMouseEvents();
};
//유저 이름 확인
mantra.usernameCheck = function () {
  const username = localStorage.getItem("username");
  if (username !== null) {
    hide(NEW_USERNAME);
    reveal(MANTRA);
    mantra.greetingDependOnTime(username);
  } else {
    reveal(NEW_USERNAME);
    hide(MANTRA);
  }
  console.log(`UserName = ${username}`);
};
//시간에 따른 인사말 출력
mantra.greetingDependOnTime = function (username) {
  const time = new Date();
  const hour = time.getHours();
  console.log(hour);
  if (11 >= hour && hour >= 5) {
    MANTRA_TEXT.innerText = `Good morning, ${username}`;
  } else if (17 >= hour && hour >= 12) {
    MANTRA_TEXT.innerText = `Good afternoon, ${username}`;
  } else if (23 >= hour && hour >= 18) {
    MANTRA_TEXT.innerText = `Good evening, ${username}`;
  } else if (hour === 24 || hour < 5) {
    MANTRA_TEXT.innerText = `Good night, ${username}`;
  } else {
    MANTRA_TEXT.innerText = `Hello, ${username}`;
  }
};
//마우스 이벤트 처리
mantra.revealMantraButton = function () {
  //username !== null
  if (NEW_USERNAME.classList.contains("hidden")) {
    reveal(MANTRA_BTN);
  }
};

mantra.hideMantraMore = function () {
  hide(MANTRA_BTN);
  hide(MANTRA_MENU);
};

mantra.toggleMantraMenu = function () {
  toggleHidden(MANTRA_MENU);
};
//마우스 이벤트 감지
mantra.listenMouseEvents = function () {
  MANTRA_CONTAINER.addEventListener("mouseenter", mantra.revealMantraButton);
  MANTRA_CONTAINER.addEventListener("mouseleave", mantra.hideMantraMore);
  MANTRA_BTN.addEventListener("mousedown", mantra.toggleMantraMenu);
  EDITNAME_BTN.addEventListener("mousedown", mantra.removeUsername);
};
//로컬스토리지에 유저 이름 저장
mantra.saveName = function (text) {
  localStorage.setItem("username", text);
};
//이름 입력 처리
mantra.handleUsernameSubmit = function (event) {
  const inputName = NEW_USERNAME_INPUT.value;
  event.preventDefault();
  mantra.saveName(inputName);
  mantra.usernameCheck();
};
//새로운 이름 입력 감지
mantra.getName = function () {
  NEW_USERNAME.addEventListener("submit", mantra.handleUsernameSubmit);
};
//유저 이름 지우기
mantra.removeUsername = function () {
  localStorage.removeItem("username");
  mantra.usernameCheck();
};

mantra.init();
