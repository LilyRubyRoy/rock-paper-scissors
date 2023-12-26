function getComputerChoice() {
  let computerChoice;
  let randomNumber = Math.floor(Math.random() * 3) + 1;
  switch (randomNumber) {
    case 1:
      computerChoice = "rock";
      break;
    case 2:
      computerChoice = "paper";
      break;
    case 3:
      computerChoice = "scissors";
      break;
  }
  return computerChoice;
}

function getUserChoice() {
  let userChoice = prompt("What will you pick? (rock, paper, scissors)");
  userChoice = userChoice.toLowerCase();
  switch (userChoice) {
    case "rock":
    case "paper":
    case "scissors":
      break;
    default:
      alert(
        `You wrote an invalid item. Our choices are (rock, paper, scissors) -- you wrote: \n${userChoice}`,
      );
      getUserChoice();
  }
  return userChoice;
}

function callPlayRound(noOfRounds) {
  let playerSelection, computerSelection;
  for (let i = 0; i < noOfRounds; i++) {
    playerSelection = getUserChoice();
    computerSelection = getComputerChoice();
    console.log(playerSelection, computerSelection);
    console.log(playRound(playerSelection, computerSelection));
  }
}

function playRound(playerSelection, computerSelection) {
  let result;
  if (playerSelection === computerSelection) {
    result = "It's a tie!";
  } else {
    switch (playerSelection) {
      case "rock":
        result =
          computerSelection === "paper"
            ? "You lose! Rock beats Paper"
            : "You win! Rock beats Scissors";
        break;
      case "paper":
        result =
          computerSelection === "scissors"
            ? "You lose! Scissors beats Paper"
            : "You win! Paper beats Rock";
        break;
      case "scissors":
        result =
          computerSelection === "rock"
            ? "You lose! Rock beats Scissors"
            : "You win! Scissors beats Paper";
        break;
    }
  }
  return result;
}

function getNoOfRounds() {
  let noOfRounds = +prompt("How many rounds are we going to play?");
  console.log(noOfRounds);
  if (noOfRounds < 1 || noOfRounds > 20 || isNaN(noOfRounds)) {
    if (isNaN(noOfRounds)) {
      alert("Please enter a number.");
    } else {
      alert("Please enter a realistic number...");
    }
    getNoOfRounds();
  }
  return noOfRounds;
}

function game() {
  let noOfRounds = getNoOfRounds();
  callPlayRound(noOfRounds);
}

game();
