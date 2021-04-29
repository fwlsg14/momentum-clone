// 전역상수 대문자스네이크케이스
const TODO = document.querySelector("#todo");
const TODO_BTN = TODO.querySelector("#todo-btn");
const TODO_CONTAINER = TODO.querySelector("#todo-container");
const NEW_TODO_BTN = TODO_CONTAINER.querySelector(`#new-todo-btn`);
const NEW_TODO_FORM = TODO_CONTAINER.querySelector(`#new-todo-form`);

//모듈 변수
let todo = {};
todo.arrayList = [];

//초기 실행 함수
todo.init = function () {
  todo.getNewTodoTab();
  todo.loadArrayList();
  todo.listenMouseEvents();
  TODO_CONTAINER.querySelector(`#todoToday`).classList.remove(`hidden`);
};
//마우스 이벤트 처리
todo.toggleTodo = function () {
  toggleHidden(TODO_CONTAINER);
};
//마우스 이벤트 감지
todo.listenMouseEvents = function () {
  TODO_BTN.addEventListener("mousedown", todo.toggleTodo);
  NEW_TODO_BTN.addEventListener("mousedown", todo.openNewTodoTab);
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
//체크박스 처리
todo.handleCheckboxEvent = function (event) {
  const target = event.target;
  const list = target.parentNode;
  const listId = list.id;
  const ul = list.parentNode;
  const ulId = ul.id;
  const split = listId.split(ulId);
  const id = split[1];
  if (target.checked === true) {
    list.classList.add(`todo-checked`);
    //array에 check변수 변경
    todo[`${ulId}`][id].checked = true;
    //array를 로컬스토리지에 저장
    localStorage.setItem(`${ulId}`, JSON.stringify(todo[`${ulId}`]));
  } else {
    list.classList.remove(`todo-checked`);
    //array에 check변수 변경
    todo[`${ulId}`][id].checked = false;
    //array를 로컬스토리지에 저장
    localStorage.setItem(`${ulId}`, JSON.stringify(todo[`${ulId}`]));
  }
};
//새로운 Todo-tab 감지
todo.getNewTodoTab = function () {
  NEW_TODO_FORM.addEventListener("submit", todo.handleNewTodoTabSubmit);
};
//새로운  Todo-tab 처리
todo.handleNewTodoTabSubmit = function (event) {
  event.preventDefault();
  //값 받아오기
  const form = event.target;
  const input = form.querySelector("input");
  const name = input.value;
  input.value = "";
  //todo-tab 생성하기
  todo.createTodoTab(name);
  //array에 넣는다
  todo.arrayList.push(name);
  todo[name] = [];
  //localstorage에 저장한다
  todo.saveTodoTabs();
  //자동으로 tab 열기
  hide(NEW_TODO_FORM);
  reveal(TODO_CONTAINER.querySelector(`#${name}`));
};
//새로운 Todo 감지
todo.getNewTodo = function (target) {
  target.addEventListener("submit", todo.handleNewTodoSubmit);
};
//새로운 Todo 처리
todo.handleNewTodoSubmit = function (event) {
  event.preventDefault();
  //값 받아오기
  const form = event.target;
  const ul = form.parentNode;
  const ulId = ul.id;
  const input = form.querySelector("input[type=text]");
  const inputValue = input.value;
  input.value = "";
  //todo 생성하기
  todo.createTodo(ulId, inputValue, false);
  //localstorage에 넣기
  todo.saveTodos(ulId);
};
//Todo-tab 생성
todo.createTodoTab = function (ulId) {
  let name = ulId;
  //ul element 생성
  const ul = document.createElement("ul");
  ul.id = name;
  ul.classList.add("hidden");
  const ulForm = document.createElement("form");
  const ulInput = document.createElement("input");
  const ulSubmit = document.createElement("input");
  const required = document.createAttribute("required");
  const typeText = document.createAttribute("type");
  typeText.value = `text`;
  ulInput.setAttributeNode(required);
  ulInput.setAttributeNode(typeText);
  ulInput.placeholder = "New Todo";
  ulSubmit.type = `submit`;
  ulSubmit.value = `Add Todo`;
  //form에 event를 만든다
  ulForm.appendChild(ulInput);
  ulForm.appendChild(ulSubmit);
  todo.getNewTodo(ulForm);
  ul.appendChild(ulForm);
  //delete-button을 만든다 todoToday는 만들지 않는다
  if (name !== "todoToday") {
    const deleteButton = document.createElement("button");
    const span2 = document.createElement("span");
    span2.innerText = `Delete List`;
    deleteButton.appendChild(span2);
    deleteButton.classList.add(`like-submit`);
    //delete-button에 event를 만든다
    deleteButton.addEventListener("mousedown", todo.deleteTodoTab);
    //delete-button은 맨뒤에 넣는다
    ul.appendChild(deleteButton);
  }
  //새로운 ul은 마지막에 넣는다
  TODO_CONTAINER.insertAdjacentElement("beforeend", ul);
  //button element 생성
  const button = document.createElement("button");
  button.id = `${name}-btn`;
  button.classList.add(`list-button`);
  const span = document.createElement("span");
  if (name === "todoToday") {
    span.innerText = "Today";
  } else {
    span.innerText = `${name}`;
  }
  button.appendChild(span);
  //button에 event를 만든다
  button.addEventListener("mousedown", todo.openTab);
  //새로운 button은 마지막 button 뒤에 넣는다
  const elements = TODO_CONTAINER.children; //HTML collection을 뱉는데 array method를 안먹는다
  const buttons = (function () {
    let array = [];
    const length = elements.length;
    for (let i = 0; i < length; i++) {
      if (elements[i].tagName === "BUTTON") {
        //참을 판별할때 tagName을 소문자로 하면 참이 나오지 않는다
        array.push(elements[i]);
      }
    }
    return array;
  })();
  const length = buttons.length;
  const lastButton = buttons[length - 1];
  lastButton.insertAdjacentElement("afterend", button);
};
// Todo 생성
todo.createTodo = function (ulId, text, checked) {
  //element 생성하기
  const ul = TODO_CONTAINER.querySelector(`#${ulId}`);
  const newId = todo[`${ulId}`].length;
  const list = document.createElement("li");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const icon = document.createElement("i");
  const iconClass = document.createAttribute("class");
  checkbox.type = "checkbox";
  checkbox.addEventListener("input", todo.handleCheckboxEvent);
  if (checked === true) {
    const listClass = document.createAttribute("class");
    listClass.value = "todo-checked";
    list.setAttributeNode(listClass);
    checkbox.checked = true;
  }
  span.innerText = text;
  iconClass.value = `fas fa-times`;
  icon.setAttributeNode(iconClass);
  button.appendChild(icon);
  button.addEventListener("click", todo.removeTodo);
  list.appendChild(checkbox);
  list.appendChild(span);
  list.appendChild(button);
  list.id = `${ulId}${newId}`;
  //첫 todo는 맨위에 그 다음부터는 마지막 todo 뒤에 넣기
  if (newId === 0) {
    ul.insertAdjacentElement("afterbegin", list);
  } else {
    ul.querySelector(`#${ulId}${newId - 1}`).insertAdjacentElement(
      "afterend",
      list
    );
  }
  //array에 넣기
  const object = {
    id: `${ulId}${newId}`,
    text: text,
    checked: checked,
  };
  todo[`${ulId}`].push(object);
  return;
};
// 로컬스토리지에서 arrayList 불러오기
todo.loadArrayList = function () {
  const arrayList = localStorage.getItem(`arrayList`);
  if (arrayList === null) {
    localStorage.setItem("arrayList", `["todoToday"]`);
    todo.arrayList = JSON.parse(localStorage.getItem("arrayList"));
  } else {
    todo.arrayList = JSON.parse(localStorage.getItem("arrayList"));
  }
  //Todo-Tab 불러오기
  todo.arrayList.forEach(function (name) {
    todo.loadTodoTab(name);
  });
};
//arrayList 로컬스토리지에 저장하기
todo.saveTodoTabs = function () {
  localStorage.setItem(`arrayList`, JSON.stringify(todo.arrayList));
};
//로컬스토리지에서 todo-tab 불러오기
todo.loadTodoTab = function (name) {
  todo.createTodoTab(name);
  const parsedTodos = JSON.parse(localStorage.getItem(`${name}`));
  if (parsedTodos !== null) {
    // todo[`${name}`] = parsedTodos;
    todo[`${name}`] = [];
    parsedTodos.forEach(function (array) {
      todo.createTodo(name, array.text, array.checked);
    });
  } else {
    todo[`${name}`] = [];
  }
};
//Todo-Tab을 삭제
todo.deleteTodoTab = function (event) {
  let button = event.target;
  if (button.tagName !== "BUTTON") {
    button = button.parentNode;
  }
  const ul = button.parentNode;
  const ulId = ul.id;
  //element를 삭제
  TODO_CONTAINER.removeChild(ul);
  TODO_CONTAINER.removeChild(TODO_CONTAINER.querySelector(`#${ulId}-btn`));
  //array 지우기
  todo[`${ulId}`] = [];
  todo.arrayList = todo.arrayList.filter(function (arg) {
    return arg !== ulId;
  });
  //로컬 스토리지에 저장
  todo.saveTodoTabs();
  todo.saveTodos(ulId);
  //자동으로 todoToday탭을 연다
  TODO_CONTAINER.querySelector(`#todoToday`).classList.remove(`hidden`);
};
//todo 로컬스토리지에 저장
todo.saveTodos = function (ulId) {
  localStorage.setItem(`${ulId}`, JSON.stringify(todo[`${ulId}`]));
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
