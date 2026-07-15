let gradeDiv = document.querySelector(".Quiz-result .grade");
let timeTakenDiv = document.querySelector(".Quiz-result .time-taken");
let reset = document.querySelector(".button");

let score = sessionStorage.getItem("quizScore") || 0;
let total = sessionStorage.getItem("totalQuestions") || 0;
let timeSpentSeconds = sessionStorage.getItem("timeSpent") || 0;

function TimeTaken(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60).toString();
  let seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

if (gradeDiv) {
  gradeDiv.textContent = `${score} / ${total}`;
}

if (timeTakenDiv) {
  timeTakenDiv.textContent = TimeTaken(timeSpentSeconds);
}

if (reset) {
  reset.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

console.log(`Score: ${score}/${total}`);
console.log(`Time Taken: ${TimeTaken(timeSpentSeconds)}`);
