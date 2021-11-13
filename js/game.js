// GLOBAL VARIABLES

let start = document.getElementsByClassName("startbtn");
let form = document.getElementById("form");
let help = document.getElementById("invalid");
let choices = {"rock" : ["scissors", "rock", "paper"], "paper" : ["rock", "paper", "scissors"], "scissors" : ["paper", "scissors", "rock"]};
let scores = document.getElementById("scores");
let userScore = 0;
let computerScore = 0;
let consoleGame = document.getElementById("console");
let regex = /^[\p{Letter}\p{Script=Han}]{2,20}$/ui;

// FUNCTIONS

    // ##### launch game 
    function launchGame() {
        start[0].classList.add("d-none");
        document.getElementById("game").classList.remove("d-none");
        askPlayerName();
    }

    // ##### userName
    function askPlayerName() { 
        form.classList.remove("d-none")
        document.getElementById("submit").addEventListener("click", function(event){
        let userName = document.getElementById("name").value;
            if (regex.test(userName)=== false || userName === null) {
                help.classList.remove("d-none");
                askPlayerName();
            } else {
                help.classList.add("d-none");
                askPlayerChoice(userScore, computerScore, userName); 
            }
        });
    };

    // ##### userchoice
    function askPlayerChoice(userScore, computerScore, userName) {
        form.classList.add("d-none");
        scores.classList.remove("d-none");
        scores.innerText = `${userName} : ${userScore}  |  Computer : ${computerScore}`;
        document.getElementById("choice").classList.remove("d-none");
        consoleGame.innerText= `It's your turn to play ${userName} choose one:`;
        let choices = document.getElementsByClassName("choice");
        for (var choice of choices) {
            choice.onclick = function() {
                document.getElementById("choice").classList.add("d-none");
                let userChoice = this.value;
                consoleGame.innerText = `You choose: ${userChoice}`;
                setTimeout(generateComputerChoice, 1000, userScore, computerScore, userName, userChoice);
            }
        }
    }

    // ##### computerchoice
    function generateComputerChoice(userScore, computerScore, userName, userChoice) {
        let computerChoice = Object.keys(choices)[Math.floor(Math.random() * Object.keys(choices).length)];
        consoleGame.innerText = `Computer choose: ${computerChoice}`;
        setTimeout(findWinner, 1000, userScore, computerScore, userName, userChoice, computerChoice);
    };

    // ##### winner
    function findWinner(userScore, computerScore, userName, userChoice, computerChoice) {
        computerChoice = choices[userChoice].indexOf(computerChoice); 
        userChoice = choices[userChoice].indexOf(userChoice);
        if (userChoice === computerChoice) {
            consoleGame.innerText = "It's a draw.";
            scores.innerText = `${userName} : ${userScore}  |  Computer : ${computerScore}`;
        } else if (userChoice > computerChoice) {
            userScore++
            consoleGame.innerText = "You win this round.";
            scores.innerText = `${userName} : ${userScore}  |  Computer : ${computerScore}`;
        } else {
            computerScore++
            consoleGame.innerText = "Sorry you lost this round.";
            scores.innerText = `${userName} : ${userScore}  |  Computer : ${computerScore}`;
        }
        if (userScore < 3 && computerScore < 3) {
            setTimeout(askPlayerChoice, 1000, userScore, computerScore, userName);
        } else {
            setTimeout(endGame, 1000, userScore, computerScore, userName);
        }
    }

    // ##### final winner
    function endGame(userScore, computerScore, userName) {
        if (userScore < computerScore){
            consoleGame.innerText = "GAME OVER";
            setTimeout(replay, 1000, userName);
        } else {
            consoleGame.innerText = "Congratulations you are the QUEEN/KING of Chi-Fou-Mi";
            setTimeout(replay, 1000, userName);
        }
    }
   
    // ##### replay
    function replay(userName) {
        scores.classList.add("d-none");
        document.getElementById("replay").classList.remove("d-none");
        consoleGame.innerText = "Do you want to play again?";
        let answers = document.getElementsByClassName("replay");
        for (var answer of answers) {
            answer.onclick = function() {
                document.getElementById("replay").classList.add("d-none");
                this.value === "yes"? askPlayerChoice(userScore = 0, computerScore = 0, userName) : (consoleGame.innerText = "Thanks for this game, see you soon.", setTimeout(resetGame, 1000));
            }
        }
    }

    // ##### reset game
    function resetGame() {
        document.getElementById("game").classList.add("d-none");
        start[0].classList.remove("d-none");
        consoleGame.innerText = "Please enter your name:";
    }