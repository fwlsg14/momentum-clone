links.deleteLink = function (number) {
  //Close Edit-Tab
  hide(LINKS.querySelector(`#link-${number}__more`));
  //Remove Element
  let link = LINK_LIST.querySelector(`#link-${number}`);
  LINK_LIST.removeChild(link);
  //Remove Local Storage Item
  localStorage.removeItem(`link_${number}_name`);
  localStorage.removeItem(`link_${number}_URL`);
  links.checkLocalStorage();
  //Remove LinkList Property and Change ID
  if (links.LinkList[`linkName_${number + 1}`] !== undefined) {
    let i = number + 1;
    let name = links.LinkList[`linkName_${i}`];
    let URL = links.LinkList[`linkURL_${i}`];
    while (name !== undefined && URL !== undefined) {
      i++;
      name = links.LinkList[`linkName_${i}`];
      URL = links.LinkList[`linkURL_${i}`];
    }
    for (let j = 1; number + j < i; j++) {
      //Remove LinkList Property
      let name2 = links.LinkList[`linkName_${number + j}`];
      let URL2 = links.LinkList[`linkURL_${number + j}`];

      links.LinkList[`linkName_${number + j - 1}`] = name2;
      links.LinkList[`linkURL_${number + j - 1}`] = URL2;

      //Change Element ID
      let list = LINK_LIST.querySelector(`#link-${number + j}`);
      let div = LINKS.querySelector(`#link-${number + j}__more`);

      list.setAttribute("id", `link-${number + j - 1}`);
      list.querySelector("button").setAttribute("id", `link-${number + j - 1}__btn`);

      div.setAttribute("id", `link-${number + j - 1}__more`);
      div
        .getElementsByTagName("label")[0]
        .setAttribute("for", `link-${number + j - 1}-name`);
      div
        .getElementsByTagName("input")[0]
        .setAttribute("id", `link-${number + j - 1}-name`);
      div
        .getElementsByTagName("input")[0]
        .setAttribute("value", `${links.LinkList[`linkName_${number + j - 1}`]}`);
      div
        .getElementsByTagName("label")[1]
        .setAttribute("for", `link-${number + j - 1}-url`);
      div
        .getElementsByTagName("input")[1]
        .setAttribute("id", `link-${number + j - 1}-url`);
      div
        .getElementsByTagName("input")[1]
        .setAttribute("value", `${links.LinkList[`linkURL_${number + j - 1}`]}`);
      div.querySelector("button").setAttribute("id", `link-${number + j - 1}-delete`);

      //Change ButtonEvent
      // let list2 = LINK_LIST.querySelector(`#link-${number + j - 1}`);
      // let div2 = LINKS.querySelector(`#link-${number + j - 1}__more`);
      let eventTarget = links.ButtonEvent[`detectButtonEventLink_${number + j - 1}`];
      eventTarget.removeEventListener(
        "submit",
        links.ButtonEvent[`editLink_${number + j - 1}`]
      );
      eventTarget.removeEventListener(
        "mousedown",
        links.ButtonEvent[`toggleMoreButton_${number + j - 1}`]
      );
      eventTarget.removeEventListener(
        "mousedown",
        links.ButtonEvent[`deleteLink_${number + j - 1}`]
      );
      links.ButtonEvent[`detectButtonEventLink_${number + j - 1}`](number + j - 1);
    }
    links.LinkList[`linkName_${i - 1}`] = undefined;
    links.LinkList[`linkURL_${i - 1}`] = undefined;
  } else {
    links.LinkList[`linkName_${number}`] = undefined;
    links.LinkList[`linkURL_${number}`] = undefined;
  }
};

for (let j = 0; j < i; j++) {
  let link = LINK_LIST.querySelector(`#link-${j}`);
  LINK_LIST.removeChild(link);
  console.log(`${j}번 링크 삭제`);
}

links.ButtonEvent[`toggleMoreButton_${number}`] = function (nub) {
  //create EditLinkTab
  links.createEditLinkTab(number);
  let i = links.checkNumberOfLinks().number;
  for (let j = 0; j < i; j++) {
    let tab = LINKS.querySelector(`#link-${j}__more`);
    if (j !== number) {
      if (!tab.classList.contains("hidden")) {
        tab.classList.add("hidden");
      }
    }
  }
  toggleHidden(LINKS.querySelector(`#link-${number}__more`));
};

function revealTime() {
  reveal(NORMAL_CLOCK.querySelector(".more"));
}
function hideTime() {
  hide(NORMAL_CLOCK.querySelector(".more"));
}
function toggleOptionTime() {
  toggleHidden(NORMAL_CLOCK.querySelector(".option"));
}
