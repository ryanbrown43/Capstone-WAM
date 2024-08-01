const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score= document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timer'); // use querySelector() to get the timer element.

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay based on difficulty.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  } else {
    throw new Error(`Invalid difficulty level: ${difficulty}`);
  }
}

/**
 * Chooses a random hole, ensuring it's not the last one used.
 */
function chooseHole(holes) {
  const index = randomInteger(0, 8);
  const hole = holes[index];

  if (hole === lastHole) {
    return chooseHole(holes);
  }

  lastHole = hole;
  return hole;
}

/**
 * Determines if the game should continue or stop.
 */
function gameOver() {
  if (time <= 0) {
    return stopGame();
  } else {
    return showUp();
  }
}

/**
 * Shows a mole and hides it after a delay.
 */
function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
 * Toggles the visibility of a mole, then hides it after a delay.
 */
function showAndHide(hole, delay) {
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay); // Use the provided delay instead of 0
  return timeoutID;
}

/**
 * Toggles the 'show' class for a hole.
 */
function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}

/**
 * Increments the score and updates the scoreboard.
 */
function updateScore() {
  points += 1;
  score.textContent = points;
  return points;
}

/**
 * Resets the score to 0 and updates the scoreboard.
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 * Updates the timer display and checks if the game is over.
 */
function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  } else {
    gameOver(time);
  }
  return time;
}

/**
 * Starts the timer and updates the timer display every second.
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 * Event handler for clicking a mole, updating the score.
 */
function whack(event) {
  updateScore();
  return points;
}

/**
 * Adds 'click' event listeners to all moles.
 */
function setEventListeners() {
  moles.forEach(mole => {
    mole.addEventListener('click', whack);
  });
  return moles;
}

/**
 * Sets the game duration.
 */
function setDuration(duration) {
  time = duration;
  return time;
}

/**
 * Stops the game and clears the timer.
 */
function stopGame() {
  clearInterval(timer);
  return "game stopped";
}

/**
 * Starts the game, initializes score, timer, and event listeners.
 */
function startGame() {
  clearScore();
  setDuration(10); // Set the game duration to 10 seconds for example
  startTimer();
  showUp();
  setEventListeners();
  return "game started";
}

startButton.addEventListener("click", startGame);

window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;