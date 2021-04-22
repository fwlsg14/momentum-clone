function reloadLinkList_LS() {
  console.log("linkList_LS 다시 불러오는 중");
  let i = 0;
  while (true) {
    linkList_LS.push(localStorage.getItem(`link_LS_${i}`));
    if (linkList_LS.indexOf(null) !== -1) {
      linkList_LS.pop();
      console.log(`linkList_LS의 ${i}번째 요소가 null`);
      return i;
    } else {
      i += 1;
    }
  }
}
function loadLinkList() {
  let i = reloadLinkList_LS();
  for (let index = 0; index < i; index++) {
    linkListObject[`link_LS_${index}`] = linkList_LS[index];
    console.log(`${index}번째 링크 불러옴`);
  }
  console.log("링크 불러오기 완료");
}

function createLinkInit() {
  let i = loadLinkList();
  let name,
    url,
    li,
    li_id,
    span,
    span_href,
    span_text,
    button,
    button_id,
    icon,
    icon_class,
    array;
  for (let n = 0; n < i + 1; n++) {
    array = linkListArray;
    name = array[0];
    url = array[1];
    li = document.createElement("li");
    span = document.createElement("span");
    button = document.createElement("button");
    li_id = document.createAttribute("id");
    li_id.value = `link_${n}`;
    li.setAttributeNode(li_id);
    span_href = document.createAttribute("href");
    span_href.value = `${url}`;
    span_text = document.createTextNode(`${name}`);
    span.setAttributeNode(span_href);
    span.appendChild(span_text);
    button = document.createElement("button");
    button_id = document.createAttribute("id");
    button_id.value = `link_${n}_more`;
    button.setAttributeNode(button_id);
    icon = document.createElement("i");
    icon_class = document.createAttribute("class");
    icon_class.value = "fas fa-ellipsis-h";
    button.appendChild(icon);
    li.appendChild(span);
    li.appendChild(button);
    linkList.insertAdjacentElement("beforeend", li);
    console.log(`${n}번째 링크 생성 완료`);
  }
  console.log(`전체 링크 생성 완료`);
}
