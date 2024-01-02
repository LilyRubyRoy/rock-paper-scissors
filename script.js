// VARIABLES

let choices = document.querySelector(".choices");

let rock = document.querySelector(".rock").cloneNode(true);
let paper = document.querySelector(".paper").cloneNode(true);
let scissors = document.querySelector(".scissors").cloneNode(true);

let userScore = 0;
let computerScore = 0;
let rounds = 5;

let uiMessage = document.querySelector(".messages");
let userScoreMessage = document.querySelector(".userScore");
let computerScoreMessage = document.querySelector(".computerScore");

let originalChoices = [rock, paper, scissors];

// EVENT LISTENERS

choices.addEventListener("click", playAnimation, false);
choices.addEventListener("click", game);

// FUNCTIONS
function game(evt) {
  let userChoice = createCloneByID(evt.target.className);
  let whateverChoice = createCloneByID("rock");
  let computerChoice = createCloneByID(getComputerResults());

  let parent = document.querySelector(".choices");

  let newChildren = [userChoice, whateverChoice, computerChoice];

  let continueGame = true;

  userChoice.firstElementChild.className = "";
  userChoice.firstElementChild.classList.add("right");
  computerChoice.firstElementChild.className = "";
  computerChoice.firstElementChild.classList.add("left");
  whateverChoice.style.visibility = "hidden";

  newChildren.map((button) => (button.disabled = true));

  setTimeout(() => {
    parent.replaceChildren(...newChildren);
    playRound(userChoice.className, computerChoice.className);
    continueGame = checkGameOver();
  }, 800);

  setTimeout(() => {
    updateNeutralMessage(continueGame);
    parent.replaceChildren(...originalChoices);
  }, 3300);
}

// FUNCTIONS -- GAME LOGIC
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return updateUI("tie");
  }
  let winner;
  switch (playerSelection) {
    case "rock":
      winner = computerSelection === "paper" ? "computer" : "user";
      break;
    case "paper":
      winner = computerSelection === "scissors" ? "computer" : "user";
      break;
    case "scissors":
      winner = computerSelection === "rock" ? "computer" : "user";
      break;
  }

  updateUI(winner, playerSelection, computerSelection);
}
// prettier-ignore
function updateUI(winner, userChoice, computerChoice) {
  if (winner === "tie") {
    uiMessage.textContent = `It's a tie!`;
  }
  if (winner === "user") {
    userScoreMessage.textContent = `${++userScore}`;
    uiMessage.textContent = `You win!\n ${formatText(userChoice)} beats ${formatText(computerChoice)}.`;
  }
  if (winner === "computer") {
    computerScoreMessage.textContent = `${++computerScore}`;
    uiMessage.textContent = `You lose!\n ${formatText(computerChoice)} beats ${formatText(userChoice)}.`;
  }
}

function updateNeutralMessage(continueBool) {
  if (continueBool) {
    uiMessage.textContent = `Please select again.`;
  }
}

function checkGameOver() {
  if (userScore < rounds && computerScore < rounds) {
    return true;
  }
  choices.removeEventListener("click", game);
  choices.removeEventListener("click", playAnimation, false);
  displayGameOver();
}

function displayGameOver() {
  uiMessage.textContent = `Game Over!\n You ${
    userScore > computerScore ? "Win!" : "Lose..."
  }`;
  uiMessage.appendChild(createResetButton());
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  uiMessage.removeChild(uiMessage.lastElementChild);
  uiMessage.textContent = `First to 5 Wins!\nGood luck!`;
  userScoreMessage.textContent = "0";
  computerScoreMessage.textContent = "0";
  choices.addEventListener("click", playAnimation, false);
  choices.addEventListener("click", game);
}

// FUNCTIONS -- UTILITY
function playAnimation() {
  document.querySelector(".choices").className = "choices";
  requestAnimationFrame((time) => {
    requestAnimationFrame((time) => {
      document.querySelector(".choices").className = "choices animate";
    });
  });
}

function formatText(text) {
  return text[0].toUpperCase() + text.slice(1);
}

function createCloneByID(choiceString) {
  switch (choiceString) {
    case "rock":
      return rock.cloneNode(true);
    case "paper":
      return paper.cloneNode(true);
    case "scissors":
      return scissors.cloneNode(true);
  }
}

function getComputerResults() {
  let randomNumber = Math.floor(Math.random() * 3) + 1;
  switch (randomNumber) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
  }
}

function createResetButton() {
  let resetButton = document.createElement("button");
  resetButton.textContent = "Play Again?";
  resetButton.className = "reset";
  resetButton.addEventListener("click", resetGame);

  return resetButton;
}
