// 전역상수 대문자스네이크케이스
const LINKS = document.querySelector("#links");
const LINK_LIST = LINKS.querySelector("#links-list");
const LINKS_BTN = LINKS.querySelector("#links-btn");
const NEWLINK_TAB = LINKS.querySelector("#new-link-tab");
const NEWLINK_FORM = NEWLINK_TAB.querySelector("form");
const NEWLINK_NAME = NEWLINK_FORM.querySelector("#new-link-name");
const NEWLINK_URL = NEWLINK_FORM.querySelector("#new-link-url");

//모듈 변수
let links = {};
links.LinkList = links.LinkList || {}; //Object는 파스칼케이스로 작성
links.ButtonEvent = links.ButtonEvent || {};

//초기 실행 함수
links.init = function () {
  links.createLinkList();
  links.getNewLink();
  links.listenMouseEvents();
};

//로컬 스토리지 확인
links.checkLocalStorage = function () {
  let i = 0;
  let name;
  let URL;
  while (true) {
    name = localStorage.getItem(`link_${i}_name`);
    URL = localStorage.getItem(`link_${i}_URL`);
    if (name === null) {
      break;
    } else if (URL === null) {
      break;
    } else {
      i++;
    }
  }
  name = localStorage.getItem(`link_${i + 1}_name`);
  URL = localStorage.getItem(`link_${i + 1}_URL`);
  if (name === null || URL === null) {
    return { space: i };
  } else {
    let j = i + 1;
    while (true) {
      name = localStorage.getItem(`link_${j}_name`);
      URL = localStorage.getItem(`link_${j}_URL`);
      if (name === null || URL === null) {
        let name2;
        let URL2;
        for (let k = 1; i + k < j; k++) {
          name2 = localStorage.getItem(`link_${i + k}_name`);
          URL2 = localStorage.getItem(`link_${i + k}_URL`);
          localStorage.setItem(`link_${i + k - 1}_name`, name2);
          localStorage.setItem(`link_${i + k - 1}_URL`, URL2);
        }
        localStorage.removeItem(`link_${j - 1}_name`);
        localStorage.removeItem(`link_${j - 1}_URL`);
        return { space: j - 1 };
      } else {
        j++;
      }
    }
  }
};
//로컬 스토리지 불러오기
links.loadLocalStorage = function () {
  const space = links.checkLocalStorage().space;
  for (let j = 0; j < space; j++) {
    links.LinkList[`linkName_${j}`] = localStorage.getItem(`link_${j}_name`);
    links.LinkList[`linkURL_${j}`] = localStorage.getItem(`link_${j}_URL`);
  }
  return {
    amount: space,
  };
};
//링크 개수 확인
links.checkNumberOfLinks = function () {
  let i = 0;
  let name = links.LinkList[`linkName_${i}`];
  while (name !== undefined) {
    i++;
    name = links.LinkList[`linkName_${i}`];
  }
  return { number: i };
};
//링크 편집 탭 만들기
links.createEditLinkTab = function (number) {
  //create container
  const div = document.createElement("div");
  // const divClass = document.createAttribute("class");
  const divId = document.createAttribute("id");
  //divClass.value = `.hidden link-more`;
  div.classList.add(`hidden`);
  div.classList.add(`link-more`);
  divId.value = `link-${number}__more`;
  // div.setAttributeNode(divClass);
  div.setAttributeNode(divId);
  //create form
  const form = document.createElement("form");
  //create name-input
  const label = document.createElement("label");
  const labelFor = document.createAttribute("for");
  const labelText = document.createTextNode("Name");
  labelFor.value = `link-${number}-name`;
  label.setAttributeNode(labelFor);
  label.appendChild(labelText);
  const input = document.createElement("input");
  const inputId = document.createAttribute("id");
  const inputValue = document.createAttribute("value");
  const required = document.createAttribute("required");
  inputId.value = `link-${number}-name`;
  inputValue.value = `${links.LinkList[`linkName_${number}`]}`;
  input.type = `text`;
  input.setAttributeNode(inputId);
  input.setAttributeNode(inputValue);
  input.setAttributeNode(required);
  //create url-input
  const label2 = document.createElement("label");
  const label2For = document.createAttribute("for");
  const label2Text = document.createTextNode("URL");
  label2For.value = `link-${number}-url`;
  label2.setAttributeNode(label2For);
  label2.appendChild(label2Text);
  const input2 = document.createElement("input");
  const input2Id = document.createAttribute("id");
  const input2Value = document.createAttribute("value");
  const required2 = document.createAttribute("required");
  input2Id.value = `link-${number}-url`;
  input2Value.value = `${links.LinkList[`linkURL_${number}`]}`;
  input2.type = `url`;
  input2.setAttributeNode(input2Id);
  input2.setAttributeNode(input2Value);
  input2.setAttributeNode(required2);
  //create submit-input
  const input3 = document.createElement("input");
  const input3Id = document.createAttribute("value");
  const input3Type = document.createAttribute("type");
  input3Id.value = `Edit`;
  input3Type.value = `submit`;
  input3.setAttributeNode(input3Id);
  input3.setAttributeNode(input3Type);
  //create delete-btn
  const button = document.createElement("button");
  const buttonId = document.createAttribute("id");
  const buttonSpan = document.createElement("span");
  const buttonText = document.createTextNode(`Delete`);
  buttonSpan.appendChild(buttonText);
  buttonId.value = `link-${number}-delete`;
  button.setAttributeNode(buttonId);
  button.appendChild(buttonSpan);
  button.classList.add(`like-submit`);
  //merge
  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(label2);
  form.appendChild(input2);
  form.appendChild(input3);
  div.appendChild(form);
  div.appendChild(button);
  //insert under links
  LINKS.insertAdjacentElement("beforeend", div);
};
//링크 편집
links.editLink = function (number, name, URL) {
  const link = LINK_LIST.querySelector(`#link-${number}`);
  const anchor = link.querySelector("a");
  anchor.innerText = `${name}`;
  anchor.setAttribute("href", `${URL}`);
  links.LinkList[`linkName_${number}`] = name;
  links.LinkList[`linkURL_${number}`] = URL;
};
//링크 지우기
links.deleteLink = function (number) {
  //Close Edit-Tab
  hide(LINKS.querySelector(`#link-${number}__more`));
  //Remove Local Storage Item
  localStorage.removeItem(`link_${number}_name`);
  localStorage.removeItem(`link_${number}_URL`);

  history.go(0);
};
//링크 만들기
links.createLink = function (number, name, URL) {
  // create list
  const list = document.createElement("li");
  const listId = document.createAttribute("id");
  listId.value = `link-${number}`;
  list.setAttributeNode(listId);
  //create name
  const div = document.createElement("div");
  const anchor = document.createElement("a");
  const anchorText = document.createTextNode(`${name}`);
  anchor.appendChild(anchorText);
  const anchorHref = document.createAttribute("href");
  anchorHref.value = `${URL}`;
  anchor.setAttributeNode(anchorHref);
  div.appendChild(anchor);
  //create button
  const button = document.createElement("button");
  const buttonId = document.createAttribute("id");
  buttonId.value = `link-${number}__btn`;
  button.setAttributeNode(buttonId);
  const icon = document.createElement("i");
  const iconClass = document.createAttribute("class");
  iconClass.value = `fas fa-ellipsis-h`;
  icon.setAttributeNode(iconClass);
  button.appendChild(icon);
  //merge
  list.appendChild(div);
  list.appendChild(button);
  //insert under link-list
  if (number === 0) {
    LINK_LIST.insertAdjacentElement("beforeend", list);
  } else {
    LINK_LIST.querySelector(`#link-${number - 1}`).insertAdjacentElement(
      "afterend",
      list
    );
  }
  //create EditLinkTab
  links.createEditLinkTab(number);
  //create buttonEvent
  links.ButtonEvent[`detectButtonEventLink_${number}`] = function (number) {
    const currentLink = LINK_LIST.querySelector(`#link-${number}`);
    const moreButton = currentLink.querySelector(`#link-${number}__btn`);
    const linkMore = LINKS.querySelector(`#link-${number}__more`);
    const form = linkMore.querySelector("form");
    const deleteButton = linkMore.querySelector(`#link-${number}-delete`);
    form.addEventListener("submit", links.ButtonEvent[`editLink_${number}`]);
    moreButton.addEventListener(
      "mousedown",
      links.ButtonEvent[`toggleMoreButton_${number}`]
    );
    deleteButton.addEventListener(
      "mousedown",
      links.ButtonEvent[`deleteLink_${number}`]
    );
  };
  links.ButtonEvent[`editLink_${number}`] = function (event) {
    event.preventDefault();
    const linkMore = LINKS.querySelector(`#link-${number}__more`);
    const form = linkMore.querySelector("form");
    const nameEdit = form.querySelector(`#link-${number}-name`);
    const URLEdit = form.querySelector(`#link-${number}-url`);
    const name = nameEdit.value;
    const URL = URLEdit.value;
    links.editLink(number, name, URL);
    localStorage.setItem(`link_${number}_name`, name);
    localStorage.setItem(`link_${number}_URL`, URL);
  };
  links.ButtonEvent[`toggleMoreButton_${number}`] = function () {
    const i = links.checkNumberOfLinks().number;
    for (let j = 0; j < i; j++) {
      let tab = LINKS.querySelector(`#link-${j}__more`);
      if (j !== number) {
        if (!tab.classList.contains("hidden")) {
          hide(tab);
        }
      }
    }
    hide(NEWLINK_TAB);
    toggleHidden(LINKS.querySelector(`#link-${number}__more`));
  };
  links.ButtonEvent[`deleteLink_${number}`] = function () {
    links.deleteLink(number);
  };
  links.ButtonEvent[`detectButtonEventLink_${number}`](number);
};
//새로운 링크 만들기
links.handleNewLinkSubmit = function (event) {
  event.preventDefault();
  hide(NEWLINK_TAB);
  const space = links.checkLocalStorage().space;
  const name = NEWLINK_NAME.value;
  const URL = NEWLINK_URL.value;
  NEWLINK_NAME.value = "";
  NEWLINK_URL.value = "";
  localStorage.setItem(`link_${space}_name`, name);
  localStorage.setItem(`link_${space}_URL`, URL);
  links.LinkList[`linkName_${space}`] = localStorage.getItem(
    `link_${space}_name`
  );
  links.LinkList[`linkURL_${space}`] = localStorage.getItem(
    `link_${space}_URL`
  );
  links.createLink(space, name, URL);
};
//링크 리스트 만들기
links.createLinkList = function () {
  //reload localStorage
  const amount = links.loadLocalStorage().amount;
  //create linklist
  for (let i = 0; i < amount; i++) {
    let name = links.LinkList[`linkName_${i}`];
    let URL = links.LinkList[`linkURL_${i}`];
    links.createLink(i, name, URL);
  }
  //create new-link-tab
  const link = document.createElement("li");
  const linkId = document.createAttribute("id");
  linkId.value = `new-link`;
  link.setAttributeNode(linkId);
  const icon = document.createElement("icon");
  const iconClass = document.createAttribute("class");
  iconClass.value = "fas fa-plus";
  icon.setAttributeNode(iconClass);
  const span = document.createElement("span");
  const spanText = document.createTextNode(" New Link");
  span.appendChild(icon);
  span.appendChild(spanText);
  link.appendChild(span);
  LINK_LIST.insertAdjacentElement("afterbegin", link);
};
//새로운 링크 제출 감지
links.getNewLink = function () {
  NEWLINK_FORM.addEventListener("submit", links.handleNewLinkSubmit);
};
//링크 토글 버튼
links.toggleLinks = function () {
  toggleHidden(LINKS.querySelector("#links-container"));
  if (LINKS.querySelector("#links-container").classList.contains("hidden")) {
    hide(NEWLINK_TAB);
    const i = links.checkNumberOfLinks().number;
    for (let j = 0; j < i; j++) {
      let tab = LINKS.querySelector(`#link-${j}__more`);
      if (!tab.classList.contains("hidden")) {
        hide(tab);
      }
    }
  }
};
//새 링크 탭 토글 버튼
links.toggleNewLinkTab = function () {
  const i = links.checkNumberOfLinks().number;
  for (let j = 0; j < i; j++) {
    let tab = LINKS.querySelector(`#link-${j}__more`);
    if (!tab.classList.contains("hidden")) {
      hide(tab);
    }
  }
  toggleHidden(NEWLINK_TAB);
};
//버튼 클릭 감지
links.listenMouseEvents = function () {
  const NEW_LINK = LINKS.querySelector("#new-link");
  LINKS_BTN.addEventListener("mousedown", links.toggleLinks);
  NEW_LINK.addEventListener("mousedown", links.toggleNewLinkTab);
};

links.init();
