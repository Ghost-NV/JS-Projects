// A comprehensive word bank categorized by difficulty for a typing test app
console.log("test");

const Level = {
  Easy: 2,
  Normal: 3,
  Hard: 4,
};

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let levelOfWords = document.querySelector(".upcoming-words");
let Easy = document.querySelector(".Easy");
let Normal = document.querySelector(".Normal");
let Hard = document.querySelector(".Hard");

let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
// No paste
let input = document.querySelector(".input");
input.onpaste = function () {
  return false;
};

let index = 1;
index = sessionStorage.getItem("index")
  ? parseInt(sessionStorage.getItem("index"))
  : 1;

window.addEventListener("load", () => {
  sessionStorage.setItem("index", index);
  if (levelOfWords.children[index]) levelOfWords.children[index].click();
});

let defaultLevel = Object.keys(Level)[index];
let defaultLevelSeconds = Level[defaultLevel];

let testJson = {};
let i = 0;

async function FetchAPI() {
  try {
    let response = await fetch("./Words.json");
    let data = await response.json();

    console.log(data);

    Object.entries(data).forEach(([key, value]) => {
      testJson[key] = value;
    });

    updateUI();
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
}
FetchAPI();

function updateUI() {
  index = sessionStorage.getItem("index")
    ? parseInt(sessionStorage.getItem("index"))
    : 1;
  defaultLevel = Object.keys(Level)[index];
  defaultLevelSeconds = Level[defaultLevel];

  lvlNameSpan.innerHTML = defaultLevel;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;

  if (testJson[defaultLevel]) {
    scoreTotal.innerHTML = testJson[defaultLevel].length;
  }
}

Array.from(levelOfWords.children).forEach((el) => {
  el.addEventListener("click", () => {
    if (!document.body.contains(startButton)) return;
    if (startButton.textContent === "Reset") return;

    Array.from(levelOfWords.children).forEach((element) => {
      element.classList.remove("active");
    });
    el.classList.add("active");
    if (el === Easy) {
      index = 0;
      sessionStorage.setItem("index", index);
    } else if (el === Normal) {
      index = 1;
      sessionStorage.setItem("index", index);
    } else if (el === Hard) {
      index = 2;
      sessionStorage.setItem("index", index);
    }
    updateUI();
  });
});

theWord.textContent = "";

function startBT() {
  startButton.classList.add("reset");
  startButton.textContent = "Reset";
  startButton.onclick = function () {
    window.location.reload();
  };
}

startButton.onclick = function () {
  if (!testJson[defaultLevel]) return;

  startBT();
  input.focus();

  theWord.textContent = testJson[defaultLevel][i];
  generateWords();
};

function generateWords() {
  clearInterval(window.liveTimer);
  timeLeftSpan.innerHTML = defaultLevelSeconds;

  window.liveTimer = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML == 0) {
      clearInterval(window.liveTimer);
      theWord.textContent = `your score is ${scoreGot.textContent}`;
      input.value = "";
      input.blur();

      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    }
  }, 1000);
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (startButton.textContent !== "Reset") return;
    if (theWord.textContent === "Done!") return;
    if (theWord.textContent.startsWith("your score is")) return;
    if (input.value.trim() === "") return;

    if (input.value.trim() === theWord.textContent) {
      scoreGot.textContent++;
      ++i;

      // game won't reach length
      if (i < testJson[defaultLevel].length) {
        theWord.textContent = testJson[defaultLevel][i];
        input.value = "";
        generateWords();
      } else {
        // then end it
        clearInterval(window.liveTimer);
        theWord.textContent = "Done!";
        input.value = "";
        input.blur();
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      }
    } else {
      console.log("wrong");
      clearInterval(window.liveTimer);
      theWord.textContent = `your score is ${scoreGot.textContent}`;
      input.value = "";
      input.blur();
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    }
  }
  if (event.key === "s" && event.ctrlKey) {
    event.preventDefault(); // disable default browser save
    console.log("Custom save triggered");
  }
});

// soon
function calculateWPM(characterCount, startTime, endTime) {
  const timeElapsedInMinutes = (endTime - startTime) / 1000 / 60;
  if (timeElapsedInMinutes === 0) return 0;
  const standardWordCount = characterCount / 5;
  const wpm = Math.round(standardWordCount / timeElapsedInMinutes);
  return wpm;
}
