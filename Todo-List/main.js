let tasks = document.querySelector(".tasks");
let form = document.querySelector(".form");
let input = document.querySelector(".input");
let add = document.querySelector(".add");

function clickTask() {
  if (input.value.trim() !== "") {
    let divi = document.createElement("div");
    divi.setAttribute("class", "task");
    divi.id = Date.now();

    let taskKey = input.value;
    let savedTask = window.localStorage.key(divi.id);
    window.localStorage.setItem(Date.now(), taskKey);

    let del = document.createElement("div");
    del.setAttribute("class", "delete");
    del.textContent = "delete";

    let P = document.createElement("p");
    P.setAttribute("class", "text");
    P.textContent = savedTask;
    P.textContent = input.value;

    divi.append(P);
    divi.append(del);
    tasks.prepend(divi);

    del.onclick = function () {
      divi.classList.toggle("done");
      window.localStorage.removeItem(savedTask);
      window.localStorage.removeItem(taskKey);
    };
  }
  input.value = "";
}

function checkTasks() {
  Object.entries(window.localStorage).forEach(([key, value]) => {
    let divi = document.createElement("div");
    divi.setAttribute("class", "task");
    let P = document.createElement("p");
    P.setAttribute("class", "text");
    let del = document.createElement("div");
    del.setAttribute("class", "delete");
    del.textContent = "delete";

    divi.id = key;
    P.textContent = value;

    divi.append(P);
    divi.append(del);
    tasks.prepend(divi);

    del.onclick = function () {
      divi.classList.toggle("done");
      window.localStorage.removeItem(savedTask);
      window.localStorage.removeItem(taskKey);
    };
  });
}
window.addEventListener("load", checkTasks);

add.addEventListener("click", clickTask);

// window.localStorage.clear();
