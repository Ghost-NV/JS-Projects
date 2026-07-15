let slider = document.querySelector(".slider-container");
let images = Array.from(slider.querySelectorAll("img"));
let slideNum = document.querySelector(".slide-number");
let pre = document.querySelector(".prev");
let indicators = document.querySelector(".indicators");
let next = document.querySelector(".next");

let ulMade = document.createElement("ul");
let imgIndex = 0;
for (let i = 0; i < images.length; i++) {
  images[i].id = `img-${imgIndex}`;
  let liMade = document.createElement("li");
  let aMade = document.createElement("a");
  aMade.href = `#img-${imgIndex}`; // ?
  aMade.textContent = `${imgIndex + 1}`;
  liMade.append(aMade);
  ulMade.append(liMade);
  imgIndex++;
}
indicators.append(ulMade);

let arrInd = [...[...indicators.children][0].children];

arrInd.forEach((el) => {
  el.addEventListener("click", () => {
    for (let i = 0; i < arrInd.length; i++) {
      arrInd[i].classList.remove("active");
      images[i].classList.remove("active");
    }
    el.classList.add("active");
    window.sessionStorage.setItem("imgID", `${el.children[0].textContent - 1}`);
    images[+window.sessionStorage.getItem("imgID")].classList.add("active");
    updateSlideNumber();
    if (el == arrInd[0]) {
      next.classList.remove("disabled");
      pre.classList.add("disabled");
    } else if (el == arrInd[arrInd.length - 1]) {
      pre.classList.remove("disabled");
      next.classList.add("disabled");
    } else {
      pre.classList.remove("disabled");
      next.classList.remove("disabled");
    }
  });
});

pre.addEventListener("click", () => {
  if (!pre.classList.contains("disabled"))
    arrInd[+window.sessionStorage.getItem("imgID") - 1].click();
});

next.addEventListener("click", () => {
  if (!next.classList.contains("disabled"))
    arrInd[+window.sessionStorage.getItem("imgID") + 1].click();
});

window.onload = function () {
  let current = window.sessionStorage.getItem("imgID");
  if (current !== null) {
    arrInd[+current].click();
  } else {
    arrInd[0].click();
  }
  updateSlideNumber();
};

function updateSlideNumber() {
  slideNum.textContent = `slide ${+window.sessionStorage.getItem("imgID") + 1}`;
}
