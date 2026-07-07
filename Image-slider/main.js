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
    window.localStorage.setItem("imgID", `${el.children[0].textContent - 1}`);
    images[+window.localStorage.getItem("imgID")].classList.add("active");
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
    arrInd[+window.localStorage.getItem("imgID") - 1].click();
});

next.addEventListener("click", () => {
  if (!next.classList.contains("disabled"))
    arrInd[+window.localStorage.getItem("imgID") + 1].click();
});

window.onload = function () {
  let current = window.localStorage.getItem("imgID");
  if (current !== null) {
    arrInd[+current].click();
  } else {
    arrInd[0].click();
  }
  updateSlideNumber();
};

function updateSlideNumber() {
  slideNum.textContent = `slide ${+window.localStorage.getItem("imgID") + 1}`;
}

// reference here referes to '<li><a href="#id">id</a></li>'
// [1] looping and adding
/*
  loop through every image in the .slider-container
  add an id to every image (start from 1 then +1 (based on total length))
  create '.indicators ul li' elements based on images length
  ...and add '<a href="#idOfTheImage">idOfTheImage</a>' inside li (start from 1 then +1 on every creation)
*/

// [2] sessionStorage
// make one variable, its key is "imgID", its value is the current image id
// if sessionStorage is not empty -> add '.active' to image that has the saved id and reference, .slide-number is saved id
// else -> add '.active' to image that its id = 1 and reference (and add .disabled to the .prev button, .slide-number is id too), then make imgID value = 1

// [3]
// add .active to li that referes to the image (in case of reload or close and open tab.. image is active, then reference is active)

// [4] onclick function algorithm
/* 
  li onclick => 
    if clicked li is not the current active li
      - remove .active from current image and current li
      - add .active to the targeted image and clicked li
      - remove .disabled from .next and .prev buttons (reset)
    if clicked li is the last one -> 
      - add .disabled to the .next button
    if clicked li is the first one -> 
      - add .disabled to the .prev button
*/

// [5]
/* .slide-number value is updated to be the current image id (which has .active), ex: 'Slide 3' */

// [6]
/*
  onclick .next -> click (simulation) on the next li (+1 on the id reference)
  onclick .prev -> click (simulation) on the previous li (-1 on the id reference)
*/

// bonus
// may change id to be more than such a number.. like a 1img or 1imgreference somehow??!
