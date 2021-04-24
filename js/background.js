//전역상수
const BODY = document.body;
const IMG_NUMBER = 9;
//모듈변수
const background = {};

//초기 실행 함수
background.init = () => {
  const randomNumber = background.genRandomNumber();
  background.loadImage(randomNumber);
};

//난수 생성하기
background.genRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * IMG_NUMBER);
  return randomNumber;
};
//이미지 불러오기
background.loadImage = function (number) {
  const img = new Image();
  img.src = `src/${number + 1}.jpg`;
  img.classList.add(`background-img`);
  BODY.appendChild(img);
  //이미지 정보 불러오기
  //   const json =
  console.log(xmlDoc);
  console.dir(xmlDoc);
};

background.init();
