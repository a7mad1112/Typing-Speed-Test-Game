/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/
// Array Of Words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];
// Setting Levels
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};
// Default Level:
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];
// console.log(words);
// console.log(lvls);lv
// console.log(defaultLevelName);
// console.log(defaultLevelSeconds);
// Catch Selectors:
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let SecondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let chooseLvl = document.querySelectorAll(".name .choose-lvl span");
// console.log(startButton);
// console.log(lvlNameSpan);
// console.log(SecondsSpan);
// console.log(theWord);
// console.log(upcomingWords);
// console.log(input);
// console.log(timeLeftSpan);
// console.log(scoreGot);
// console.log(scoreTotal);
// console.log(finishMessage);
// Setting Level Nane + Seconds + Score :::
lvlNameSpan.innerHTML = defaultLevelName;
SecondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Choose The Level
chooseLvl.forEach((span) => {
    span.onclick = function () {
        chooseLvl.forEach(span => span.classList.remove("active"));
        span.classList.add("active");
        defaultLevelName = span.innerHTML;
        lvlNameSpan.innerHTML = defaultLevelName;
        defaultLevelSeconds = lvls[defaultLevelName];
        SecondsSpan.innerHTML = defaultLevelSeconds;
        timeLeftSpan.innerHTML = defaultLevelSeconds;
    };
});

// Disaple Paste Event
input.onpaste = () => false;

// Start Game::
// Fun 1
startButton.onclick = function ()  {
    this.remove();
    document.querySelector(".name .choose-lvl").remove();
    document.querySelector(".name").style.display = "block";
    input.focus();
    // Generate Word Function 
    genWords();
};
function genWords() {
    // Get Random Word From Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get Word Index
    let wordIndex = words.indexOf(randomWord);
    // Remove Word From The Array
    words.splice(wordIndex, 1); // splice take the index and delete count thin remove the word from the array 
    // Show The Random Word
    theWord.innerHTML = randomWord;
    // Empty upcomingWords
    upcomingWords.innerHTML = "";
    // Generate Words
    for(let i = 0; i < words.length; i++) {
        // Create Div Element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    } // End loop
    // Start Play Function
    startPlay();
};
function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;

    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        // Stop Timer
        if(timeLeftSpan.innerHTML === '0') {
            clearInterval(start);
        // Compare Words
        if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
            // Empty Input Field
            input.value = "";
            // Increase Score
            scoreGot.innerHTML++;
            // Call Ganerate Word Function
            if (words.length > 0)
                genWords();
            else {
                let span = document.createElement("span");
                span.className = "good";
                let spanText = document.createTextNode("Winner");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
                // Rempove upcoming words
                upcomingWords.remove();
            }
        }
        else {
            let span = document.createElement("span");
            span.className = "bad";
            let spanText = document.createTextNode("Game Over");
            span.appendChild(spanText);
            finishMessage.appendChild(span);
        }
    }// main condition
    }, 1000);
};