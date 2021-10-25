// variables

let choices = {"rock" : ["scissors", "rock", "paper"], "paper" : ["rock", "paper", "scissors"], "scissors" : ["paper", "scissors", "rock"]};
let userScore = 0;
let computerScore = 0;
let regex = /^[\p{Letter}\p{Script=Han}]{2,20}$/ui;

// functions
function askPlayerName() { 
    let name = prompt("Please enter your name?");
    while (regex.test(name)===false || name === null) {
        name = prompt("Your name must be between 2 and 20 letters")
    }
    return name;
}

function askPlayerChoice() {
    let choice = prompt(`It's your turn to play ${userName}.\nPlease make your choice between 'Rock', 'Paper' and 'Scissors'.`).toLowerCase();
        while (!Object.keys(choices).includes(choice)) {
            choice = prompt(`It's your turn to play ${userName}.\nPlease make your choice between 'Rock', 'Paper' and 'Scissors'.`).toLowerCase();  
        }
    return choice;
}

function generateComputerChoice() {
    return Object.keys(choices)[Math.floor(Math.random() * Object.keys(choices).length)];
}

function replay() {
    let answer = prompt("Do you want to play again? 'Yes' or 'No'").toLowerCase();
        while (answer !== "yes" && answer !== "no"){
            answer = prompt("Do you want to play again? 'Yes' or 'No'").toLowerCase();
        }
    answer === "yes"? (userScore = 0, computerScore = 0) : alert("Thanks for this game, see you soon.");
}

// game

alert("Welcome to the Chi-Fou-Mi Game. Are you ready to play?"); // welcoming message
let userName = askPlayerName(); // asking for user's name

// start of the game
 
while (userScore < 3 && computerScore < 3) { // loop for three victories
    // asking and checking for user's choice
    let userChoice = askPlayerChoice();
    // showing computer's choice
    let computerChoice = generateComputerChoice();
    alert(`Computer choose: ${computerChoice}`); 
    // transforming computerChoice and userChoice in number by using index of userChoice's property
    computerChoice = choices[userChoice].indexOf(computerChoice); 
    userChoice = choices[userChoice].indexOf(userChoice);
    // comparing values to determine the winner of a round
    if (userChoice === computerChoice) {
        alert(`It's a draw.\n ${userName} : ${userScore}  |  Computer : ${computerScore}`);
    } else if (userChoice > computerChoice) {
        userScore++
        alert(`You win this round.\n ${userName} : ${userScore}  |  Computer : ${computerScore}`);
    } else {
        computerScore++
        alert(`Sorry you lost this round.\n ${userName} : ${userScore}  |  Computer : ${computerScore}`);
    }
    // final winner
    if (userScore === 3 || computerScore === 3) {
        if (userScore < computerScore){
            alert("GAME OVER");
            replay();
        } else {
            alert("Congratulations you are the QUEEN/KING of Chi-Fou-Mi");
            replay();
        }
    }
}
// end of game
