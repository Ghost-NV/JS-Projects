let redDot = document.querySelector(".dot--red");
let yellowDot = document.querySelector(".dot--yellow");
let greenDot = document.querySelector(".dot--green");

let fileCont = document.querySelector(".editor-bar__tab");
let blueDot = document.createElement("span");
blueDot.classList.add("editor-bar__tab-icon");

let activity = document.querySelector("#activity");
let subtitle = document.querySelector(".subtitle");
let statusText = document.querySelector("#status-text");

let balloon = document.querySelectorAll(".balloon");
let wordSlots = document.querySelector("#word-slots");
let key = document.querySelectorAll(".key");

let attemptsCount = document.querySelector("#attempts-count");
let reset = document.querySelector("#restart-btn");

// ============================================

let theWord = "";
let testJson = [];
let i = 0;

async function FetchAPI() {
  try {
    let response = await fetch("./Words.json");
    let data = await response.json();

    console.log(data);

    testJson = [...data];

    updateUI();
    slotMaker();
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
}
FetchAPI();

function closeFN() {
  window.location.href = "/balloon-pop-game/goodbye.html";
}

function resetFN() {
  updateUI();
  wordSlots.innerHTML = "";
  slotMaker();
  statusText.textContent = `Waiting for the first guess...`;
  Array.from(key).forEach((el) => {
    el.classList.remove("is-correct");
    el.classList.remove("is-wrong");
    el.classList.remove("is-disabled");
  });
  attemptsCount.textContent = 0;
  for (let i = 0; i < Array.from(balloon).length; i++) {
    Array.from(balloon)[i].classList.remove("pop");
  }
  blueDot.remove();
  activity.textContent = "---";
}

redDot.onclick = closeFN;
yellowDot.onclick = () => {
  window.location.reload();
};
greenDot.onclick = resetFN;

window.addEventListener("keydown", function (event) {
  if (event.key == "Enter") resetFN();
  if (event.key == "Delete") closeFN();
});

reset.addEventListener("click", resetFN);

Array.from(key).forEach((el) => {
  el.addEventListener("click", () => {
    console.log("it works");
    el.classList.add("is-disabled");
    fileCont.prepend(blueDot);
    blueDot.textContent = "●";
    activity.textContent = "Active";
    subtitle.remove();

    if (
      Array.from(theWord).some(
        (letter) => el.textContent.toLowerCase() === letter,
      )
    ) {
      let elementSlots = [...wordSlots.children];

      el.classList.add("is-correct");
      statusText.textContent = `True, '${el.textContent}' is in the word`;

      const indices = [];
      for (let i = 0; i < theWord.length; i++) {
        if (theWord[i] === el.textContent.toLowerCase()) {
          indices.push(i);
        }
      }
      for (let i = 0; i < indices.length; i++) {
        [...wordSlots.children][indices[i]].querySelector(
          ".letter-slot__char",
        ).textContent = el.textContent;

        elementSlots[indices[i]].classList.add("is-filled");
        console.log(`index of '${el.textContent}' is ${indices[i]}`);
      }
      let allFilled = elementSlots.every((el) =>
        el.classList.contains("is-filled"),
      );

      if (allFilled) {
        Array.from(key).forEach((el) => {
          el.classList.add("is-disabled");
        });
        statusText.textContent = `Congrats! it's '${theWord}'`;
      }
    } else {
      el.classList.add("is-wrong");
      Array.from(balloon)[attemptsCount.textContent].classList.add("pop");
      statusText.textContent = `Wrong, '${el.textContent}' is NOT in the word`;

      attemptsCount.textContent++;
      if (attemptsCount.textContent == 6) {
        Array.from(key).forEach((el) => {
          el.classList.add("is-disabled");
        });
        statusText.textContent = `Lost that one, it's '${theWord}'`;
      }
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (parseInt(attemptsCount.textContent) >= 6) return;
  const elementSlots = [...wordSlots.children];
  if (
    elementSlots.length > 0 &&
    elementSlots.every((el) => el.classList.contains("is-filled"))
  ) {
    return;
  }
  const keyLower = e.key.toLowerCase();
  if (keyLower < "a" || keyLower > "z" || keyLower.length > 1) return;
  const target = Array.from(key).find(
    (k) => k.textContent.trim().toLowerCase() === keyLower,
  );
  if (target && !target.classList.contains("is-disabled")) {
    target.click();
  }
});

function updateUI() {
  const randomIndex = Math.floor(Math.random() * testJson.length);
  const randomItem = testJson[randomIndex];

  theWord = randomItem["word"];
  document.querySelector("#category-display").textContent =
    randomItem["category"];
  document.querySelector("#hint-display").textContent =
    `Hint: ${randomItem["hint"]}`;
  console.log(theWord);
}

function slotMaker() {
  for (let i = 0; i < theWord.length; i++) {
    let el = document.createElement("span");
    el.classList.add("letter-slot");
    let elInner = document.createElement("span");
    elInner.classList.add("letter-slot__char");
    elInner.id = `char-${i}`;
    el.append(elInner);
    wordSlots.append(el);
  }
}
