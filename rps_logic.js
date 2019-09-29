const ROCK = "rock"; 
const PAPER = "paper"; 
const SCISSORS = "scissors"; 
const WIN = true; 
const LOSE = false; 
const DRAW = "DRAW"; 
let winsRequired = 3; 
let wins = 0; 
let losses = 0; 

	function computerPlay() {
		let min = 1; 
		let max = 3; 
		let cpuAnswer = Math.floor(Math.random() * (max - min + 1)) + min;
		switch(cpuAnswer) {
			case 1 : 
				return ROCK;
			case 2 : 
				return PAPER;
			case 3 : 
				return SCISSORS; 
			default: 
				console.log("wrong number produced by cpu"); 
		}
	}

	function rpsRound(playerSelection, cpuSelection) {
		playerSelection = playerSelection.toLowerCase(); 

		if(playerSelection==cpuSelection) {
			return DRAW
		} else if(playerSelection==ROCK) {
			if(cpuSelection==SCISSORS) {
				return WIN;//"You win! Rock beats Scissors!";
			} else {
				return LOSE; //"You lose! Paper beats Rock!"; 
			}
		} else if(playerSelection==PAPER) {
			if(cpuSelection==ROCK) {
				return WIN; //"You win! Paper beats Rock!"; 
			} else {
				return LOSE; //"You lose! Scissors beats Paper!"; 
			}
		} else if(playerSelection==SCISSORS) {
			if(cpuSelection==ROCK) {
				return LOSE; //"You lose! Rock beats Scissors!"; 
			} else {
				return WIN; //"You win! Scissors beats Paper!"; 
			}
		} else {
			console.log("SOMETHING WENT WRONG AND THE CPU/PLAYER VALUES AREN'T AS EXPECTED"); 
			return; 
		}

	}

	function playGame(e) {
		if(wins==winsRequired || losses==winsRequired) {
			return; //already reached the game's end
			//TODO: change it so that it addes a "play again" button to 
			//reset the game, so you don't need to tell the user to refresh the page.
		}
		let oldPressedButton = document.querySelector(".player-buttons-pressed"); 
		if(oldPressedButton) { 
			console.log(oldPressedButton); 
			oldPressedButton.classList.remove("player-buttons-pressed") 
		}
		this.classList.add("player-buttons-pressed")
		let pAnswer = this.textContent.toLowerCase();
		let cpuAnswer = computerPlay(); 
		let result = rpsRound(pAnswer, cpuAnswer); 

		let playerInfoText = document.querySelector("#player-info-text"); 
		let playerScore = document.querySelector("#player-score");
		let cpuScore = document.querySelector("#cpu-score");  

		if(result==WIN) {
			wins++; 
			playerInfoText.textContent = "You win! CPU played " + cpuAnswer.charAt(0).toUpperCase() + cpuAnswer.substring(1) + " and " + pAnswer.charAt(0).toUpperCase() + pAnswer.substring(1) + " beats " + cpuAnswer.charAt(0).toUpperCase() + cpuAnswer.substring(1) + "!"; 
		} else if (result==LOSE) {
			losses++; 
			playerInfoText.textContent = "You lose! CPU played " + cpuAnswer.charAt(0).toUpperCase() + cpuAnswer.substring(1) + " and " + cpuAnswer.charAt(0).toUpperCase() + cpuAnswer.substring(1) + " beats " + pAnswer.charAt(0).toUpperCase()+ pAnswer.substring(1)  + "!"; 
		} else if( result==DRAW) {
			playerInfoText.textContent = "It's a draw! NOBODY WINS! Select your next move."; 
			
		}

		//update scoreboard
		playerScore.textContent = wins; 
		cpuScore.textContent = losses; 

		if(wins==winsRequired || losses==winsRequired) {
			if(result) {
				playerInfoText.textContent = "You won the set! Final score is " + wins + " - " + losses + ". Refresh the page to play again!"; 
			} else {
				playerInfoText.textContent = "You lost the set, CPU wins! Final score is " + wins + " - " + losses + ". Refresh the page to play again!"; 
			}
		}
	}


	const playerButtons = document.querySelectorAll(".player-buttons"); 
	playerButtons.forEach(btn => btn.addEventListener("click", playGame));