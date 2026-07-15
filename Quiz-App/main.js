let QuestionCard = document.querySelector(".Question-card");
let navQuest = document.querySelector(".nav-Quest");
let QuestionsRemain = document.querySelector(".Questions-Remain");
let countDown = document.querySelector(".count-down");
let QuestionCont = document.querySelector(".Question-cont");
let Question = document.querySelector(".Question");
let options = document.querySelector(".options");
let ul = document.querySelector(".ul-Questions");
let ulQuestions = document.querySelector(".ul-Questions");
let next = document.querySelector(".next");

let jsonfile = "Quest.json";
let index = 0;
let correctCounter = 0;
let quizjson = [];
let questionCounter = 1;
let timeFn;
countDown.textContent = `pending..`;

async function FetchAPI() {
  try {
    let response = await fetch(jsonfile);
    let data = await response.json();

    data.forEach((el) => {
      quizjson.push(el);
    });

    let startingDate = data[index];

    Question.textContent = data[index].question;
    ul.children[0].textContent = data[index].answers[0];
    ul.children[1].textContent = data[index].answers[1];
    ul.children[2].textContent = data[index].answers[2];
    ul.children[3].textContent = data[index].answers[3];

    QuestionsRemain.textContent = `${questionCounter} From ${quizjson.length}`;

    timeFn = quizjson.length * 60;
    startTimer();

    setupOptionsEvents();
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
}
FetchAPI();

next.addEventListener("click", () => {
  if (index < quizjson.length - 1) {
    ++questionCounter;
    QuestionsRemain.textContent = `${questionCounter} From ${quizjson.length}`;

    if (next.classList.contains("submit")) {
      const childrenArray = Array.from(ulQuestions.children);

      for (let i = 0; i < childrenArray.length; i++) {
        if (childrenArray[i].classList.contains("activeLi")) {
          if (
            childrenArray.indexOf(childrenArray[i]) ===
            quizjson[index].correct_answer_index
          ) {
            console.log("true");
            ++correctCounter;
          }
        }
      }
    }
    ++index;
    Question.textContent = quizjson[index].question;
    ul.children[0].textContent = quizjson[index].answers[0];
    ul.children[1].textContent = quizjson[index].answers[1];
    ul.children[2].textContent = quizjson[index].answers[2];
    ul.children[3].textContent = quizjson[index].answers[3];
    console.log(`question id was ${index}`);
    Array.from(ulQuestions.children).forEach((element) => {
      element.classList.remove("activeLi");
      element.style.color = "white";
      next.textContent = "next";
      next.style.cssText = "color: black; opacity: 1";
      next.classList.remove("submit");
    });
  } else if (index === quizjson.length - 1) {
    if (next.classList.contains("submit")) {
      const childrenArray = Array.from(ulQuestions.children);
      for (let i = 0; i < childrenArray.length; i++) {
        if (childrenArray[i].classList.contains("activeLi")) {
          if (
            childrenArray.indexOf(childrenArray[i]) ===
            quizjson[index].correct_answer_index
          ) {
            ++correctCounter;
          }
        }
      }
    }

    let totalTime = quizjson.length * 60;
    let timeSpent = totalTime - timeFn;
    sessionStorage.setItem("timeSpent", timeSpent);

    sessionStorage.setItem("quizScore", correctCounter);
    sessionStorage.setItem("totalQuestions", quizjson.length);

    window.location.href = "result.html";
  }
});

function setupOptionsEvents() {
  Array.from(ulQuestions.children).forEach((element) => {
    element.addEventListener("click", function () {
      const isAlreadyActive = element.classList.contains("activeLi");

      Array.from(ulQuestions.children).forEach((element) => {
        element.classList.remove("activeLi");

        element.style.color = "white";
        next.textContent = "next";
        next.style.cssText = "color: black; opacity: 1";
        next.classList.remove("submit");
      });

      if (!isAlreadyActive) {
        element.classList.add("activeLi");
        next.textContent = "submit";
        element.style.color = "black";
        next.style.cssText = "color: green;opacity: 0.8";
        next.classList.add("submit");
      }
    });
  });
}

function startTimer() {
  let timerId = setInterval(() => {
    if (timeFn >= 0) {
      let minutes = Math.floor(timeFn / 60).toString();
      let seconds = (timeFn % 60).toString().padStart(2, "0");
      countDown.textContent = `${minutes}:${seconds} Left`;
      --timeFn;
    } else {
      clearInterval(timerId);
      countDown.textContent = "Time Up!";

      let totalTime = quizjson.length * 60;
      sessionStorage.setItem("timeSpent", totalTime);

      sessionStorage.setItem("quizScore", correctCounter);
      sessionStorage.setItem("totalQuestions", quizjson.length);

      window.location.href = "result.html";
    }
  }, 1000);
}
