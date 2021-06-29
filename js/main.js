import { namesOne, namesTwo } from "./names.js";

const initApp = () => {
  document.getElementById("submitForm").addEventListener("submit", (event) => {
    event.preventDefault();
    clearSuggestions();
    const getTextArray = randomText();
    displayNames(getTextArray);
  });
};
// when the dom content will be loaded then initApp function will start working
document.addEventListener("DOMContentLoaded", initApp);

// clear the suggestion section function
const clearSuggestions = () => {
  const display = document.getElementById("suggestionSection");
  if (!display.classList.contains("hidden")) {
    display.classList.toggle("hidden");
  }
  const list = document.querySelector(".suggestionSection ol");
  list.innerHTML = "";
};

// generate random text
const randomText = () => {
  const randomNumArr = [];
  for (let i = 0; i < 9; ) {
    const randomNumber = Math.floor(Math.random() * 10);
    if (randomNumArr.includes(randomNumber)) continue;
    randomNumArr.push(randomNumber);
    i++;
  }
  const suggestion1 = namesOne[randomNumArr[1]] + namesTwo[randomNumArr[3]];
  const suggestion2 = namesOne[randomNumArr[2]] + namesTwo[randomNumArr[4]];
  const suggestion3 = namesOne[randomNumArr[5]] + namesTwo[randomNumArr[7]];
  const suggestion4 = namesOne[randomNumArr[6]] + namesTwo[randomNumArr[0]];
  return [suggestion1, suggestion2, suggestion3, suggestion4];
};
// this function will display the names
const displayNames = (namesArray) => {
  const list = document.querySelector(".suggestionSection ol");
  const nameValue = document.getElementById("submitSection-textInput").value;
  const firstName = sanitizeInput(nameValue);

  namesArray.forEach((name) => {
    list.innerHTML += `<li> <a href='https://youtube.com/${name}' target="_blank">${name}</a> </li>`;

    list.innerHTML += `<ul>
       <li>
     <a href='https://youtube.com/${firstName}s${name}' target='_blank'>${firstName}s${name}</a> 
     </li>
     <li>
     <a href='https://youtube.com/${name}with${firstName}' target='_blank'>${name}with${firstName}</a> 
     </li>
      </ul>`;
  });
  const display = document.getElementById("suggestionSection");
  if (display.classList.contains("hidden")) display.classList.toggle("hidden");

  // reset button
  document.getElementById("reset").addEventListener("click", () => {
    display.innerHTML = "";
    document.getElementById("submitSection-textInput").value = "";
  });
};
// innerhtml issue solved
const sanitizeInput = (inputValue) => {
  const div = document.createElement("div");
  div.textContent = inputValue;
  return div.innerHTML;
};
