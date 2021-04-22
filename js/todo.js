// newtodo form처리부터 시작
// 전역상수 대문자스네이크케이스
const TODO = document.querySelector("#todo");
const TODO_BTN = TODO.querySelector("#todo-btn");
const TODO_CONTAINER = TODO.querySelector("#todo-container");
const NEW_TODO_BTN = TODO_CONTAINER.querySelector(`#new-todo-btn`);
const NEW_TODO_FORM = TODO_CONTAINER.querySelector(`#new-todo-form`);
const TODAY_TODO = TODO_CONTAINER.querySelector("#todoToday");
const TODAY_TODO_BTN = TODO_CONTAINER.querySelector(`#todoToday-btn`);
const TODAY_TODO_FORM = TODAY_TODO.querySelector("form");

//모듈 변수
let todo = {};
todo.todoToday = [];
todo.arrayList = [];

//초기 실행 함수
todo.init = function () {
  todo.getNewTodo();
  todo.loadArrayList();
  todo.listenMouseEvents();
};
//마우스 이벤트 처리
todo.toggleTodo = function () {
  toggleHidden(TODO_CONTAINER);
};
//마우스 이벤트 감지
todo.listenMouseEvents = function () {
  TODO_BTN.addEventListener("mousedown", todo.toggleTodo);
  NEW_TODO_BTN.addEventListener("mousedown", todo.openNewTodoTab);
  TODAY_TODO_BTN.addEventListener("mousedown", todo.openTab);
};
//열려있는 ul 또는 form 확인
todo.checkOpenTabs = function () {
  const form = TODO_CONTAINER.querySelector("form");
  const ulArray = TODO_CONTAINER.querySelectorAll("ul");
  if (form.classList.contains(`hidden`) === false) {
    return form;
  }
  const i = ulArray.length;
  for (let j = 0; j < i; j++) {
    if (ulArray[j].classList.contains(`hidden`) === false) {
      return ulArray[j];
    }
  }
};
//New Todo 탭 열기
todo.openNewTodoTab = function () {
  const openTab = todo.checkOpenTabs();
  hide(openTab);
  reveal(NEW_TODO_FORM);
};
//탭 열기
todo.openTab = function (event) {
  const openTab = todo.checkOpenTabs();
  hide(openTab);
  let button = event.target;
  if (button.tagName !== "BUTTON") {
    button = button.parentNode;
  }
  const buttonId = button.id;
  const targetUlId = buttonId.slice(0, -4);
  const targetUl = TODO_CONTAINER.querySelector(`#${targetUlId}`);
  reveal(targetUl);
};
//새로운 Todo 감지
todo.getNewTodo = function () {
  TODAY_TODO_FORM.addEventListener("submit", todo.handleNewTodoSubmit);
};
//새로운 Todo 처리
todo.handleNewTodoSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const ul = form.parentNode;
  const ulId = ul.id;
  const input = form.lastElementChild;
  const inputValue = input.value;
  todo.createTodo(ulId, inputValue);
};
//Todo 생성
todo.createTodo = function (ulId, text) {
  const ul = TODO_CONTAINER.querySelector(`#${ulId}`);
  const newId = todo[`${ulId}`].length;
  const list = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const icon = document.createElement("i");
  const iconClass = document.createAttribute("class");
  span.innerText = text;
  iconClass.value = `fas fa-times`;
  icon.setAttributeNode(iconClass);
  button.appendChild(icon);
  button.addEventListener("click", todo.removeTodo);
  list.appendChild(span);
  list.appendChild(button);
  list.id = `${ulId}${newId}`;
  if (newId === 0) {
    ul.insertAdjacentElement("afterbegin", list);
  } else {
    ul.querySelector(`#${ulId}${newId - 1}`).insertAdjacentElement("afterend", list);
  }
  const object = {
    id: `${ulId}${newId}`,
    text: text,
  };
  todo[`${ulId}`].push(object);
  todo.saveTodos(ulId);
};
//todo 배열 로컬스토리지에 저장
todo.saveTodos = function (ulId) {
  localStorage.setItem(`${ulId}`, JSON.stringify(todo[`${ulId}`]));
};
// 로컬스토리지에서 배열리스트 불러오기
todo.loadArrayList = function () {
  const arrayList = localStorage.getItem(`arrayList`);
  if (arrayList === null) {
    localStorage.setItem("arrayList", `["todoToday"]`);
    todo.arrayList = JSON.parse(localStorage.getItem("arrayList"));
  } else {
    todo.arrayList = JSON.parse(localStorage.getItem("arrayList"));
  }
  todo.arrayList.forEach(function (array) {
    todo.loadTodos(array);
  });
};
//로컬스토리지에서 todo 배열 불러오기
todo.loadTodos = function (text) {
  const parsedTodos = JSON.parse(localStorage.getItem(`${text}`));
  if (parsedTodos !== null) {
    parsedTodos.forEach(function (array) {
      todo.createTodo(text, array.text);
    });
    todo[`${text}`] = parsedTodos;
  }
};
//todo 삭제
todo.removeTodo = function (event) {
  let button = event.target;
  if (button.tagName !== "BUTTON") {
    button = button.parentNode;
  }
  const list = button.parentNode;
  const listId = list.id;
  const ul = list.parentNode;
  const ulId = ul.id;
  const array = todo[`${ulId}`];
  //element를 삭제
  ul.removeChild(list);
  //array에서 지우기
  const deletePosition = array.findIndex(function (object) {
    return object.id === listId;
  });
  array.splice(deletePosition, 1);
  //array의 id 조정
  if (array.length > 1) {
    let i = deletePosition + 1;
    let nextObject = array.find(function (object) {
      return object.id === `${ulId}${i}`;
    });

    while (nextObject !== undefined) {
      i += 1;
      nextObject = array.find(function (object) {
        return object.id === `${ulId}${i}`;
      });
    }
    for (let j = deletePosition + 1; j < i; j++) {
      nextObject = array.find(function (object) {
        return object.id === `${ulId}${j}`;
      });
      nextObject.id = `${ulId}${j - 1}`;
    }
  }
  //element id 조정
  if (array.length > 1) {
    let i = deletePosition + 1;
    let nextElement = TODO_CONTAINER.querySelector(`#${ulId}`).querySelector(
      `#${ulId}${i}`
    );
    while (nextElement !== null) {
      i += 1;
      nextElement = TODO_CONTAINER.querySelector(`#${ulId}`).querySelector(
        `#${ulId}${i}`
      );
    }
    for (let j = deletePosition + 1; j < i; j++) {
      nextElement = TODO_CONTAINER.querySelector(`#${ulId}`).querySelector(
        `#${ulId}${j}`
      );
      nextElement.id = `${ulId}${j - 1}`;
    }
  }
  //array를 저장
  todo.saveTodos(ulId);
};
todo.init();
