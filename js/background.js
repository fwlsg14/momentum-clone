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
  const randomNumber = Math.floor(Math.random() * IMG_NUMBER) + 1;
  return randomNumber;
};
//이미지 불러오기
background.loadImage = function (number) {
  const img = new Image();
  img.src = `src/${number}.jpg`;
  img.classList.add(`background-img`);
  BODY.appendChild(img);
  //이미지 정보 불러오기
  const object = background.srcInfo();
  const imgInfo = object[`${number}`];
  const author = imgInfo.author;
  const webPage = imgInfo.webPage;
  const location = imgInfo.location;
  const desc = imgInfo.desc;  
  //이미지 정보 표시
  const a = document.createElement(`a`);
  const line = document.createElement(`div`);
  const line2 =document.createElement(`div`);
  const authorSpan = document.createElement(`span`);
  const icon = document.createElement(`i`);
  const iconClass = document.createAttribute('class')
  const locationSpan = document.createElement(`span`);
  const line3 =document.createElement(`div`);
  const p = document.createElement(`p`);
  a.href = webPage;
  authorSpan.innerText = author;
  iconClass.value = `fas fa-map-marker-alt`
  icon.setAttributeNode(iconClass);
  locationSpan.innerText = location;
  p.innerText = desc;
  line.appendChild(authorSpan);
  line2.appendChild(icon);
  line2.appendChild(locationSpan);
  line3.appendChild(p);
  a.appendChild(line);
  a.appendChild(line2);
  document.querySelector(`#photo-info`).appendChild(a);
  document.querySelector(`#photo-info`).appendChild(line3);

};

background.srcInfo =function () {
  return object = {
    1: {
      author: "Jamie Davies",
      webPage: "https://unsplash.com/@jamie_davies",
      location: "Sydney, Australia",
      desc: "Birds Eye View of Sydney"
    },
    2: {
      author: "Luca Bravo",
      webPage: "https://unsplash.com/@lucabravo",
      location: "Lago di Braies",
      desc: "Boathouse on a mountain lake"
    },
    3: {
      author: "Lucas Metz",
      webPage: "https://unsplash.com/@lucashew",
      location: "Uyuni desert, Bolivia",
      desc: "Uyuni salt desert in Bolivia at sunrise, after a rainy day. We were very lucky because it rained the day before. As a consequence, the desert was covered by water. During the night, the water went away and when we woke up for the sunrise, only a tiny amount of water was still here, transforming the desert into a giant mirror."
    },
    4: {
      author: "Lucas Wesney",
      webPage: "https://unsplash.com/@wesnext",
      location: "Dolomites, Campitello di Fassa, Trentino, Italy",
      desc: "@wesnext_photography for more. @lukewesney for more."
    },
    5: {
      author: "Ken Cheung",
      webPage: "https://unsplash.com/@kencheungphoto",
      location: "Iceland",
      desc: ""
    },
    6: {
      author: "Karthik Sreenivas",
      webPage: "https://unsplash.com/@karthik_sreenivas",
      location: "Horseshoe Bend, Arizona, USA",
      desc: "Horseshoe bend"
    },
    7: {
      author: "Michal Mrozek",
      webPage: "https://unsplash.com/@miqul",
      location: "Gibraltar",
      desc: ""
    },
    8: {
      author: "Sung Shin",
      webPage: "https://unsplash.com/@ironstagram",
      location: "서귀포시 성산읍 성산 일출봉",
      desc: "Sunrise,"
    },
    9: {
      author: "Ansar Naib",
      webPage: "https://unsplash.com/@ansar2k21",
      location: "Barcelona, Spain",
      desc: ""
    }
  }
}


background.init();
