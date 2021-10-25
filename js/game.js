
let start = document.getElementsByClassName("startbtn");
function launchGame() {
    start[0].classList.add("d-none");
    document.getElementById("game").classList.remove("d-none");
}

// game

let choices = {"rock" : ["scissors", "rock", "paper"], "paper" : ["rock", "paper", "scissors"], "scissors" : ["paper", "scissors", "rock"]};
let userScore = 0;
let computerScore = 0;
let console = document.getElementById("console")

while (userScore < 3 && computerScore < 3) {

    // ##### userName
    let regex = /^[\p{Letter}\p{Script=Han}]{2,20}$/ui;
    let userName = askPlayerName()

    function askPlayerName() { 
        let name = document.getElementById("name").value;
        document.getElementById("submit").addEventListener("click", function(event){
            name = document.getElementById("name").value;
            while (regex.test(name)===false || name === null) {
                event.preventDefault();
                event.stopPropagation();
                name = document.getElementById("name").value;
            }
            document.getElementById("username").classList.add("d-none");
            document.getElementById("choice").classList.remove("d-none");
            console.innerText= `It's your turn to play ${name} choose one.`;
            event.preventDefault();
            event.stopPropagation();
            return name;
        });
    };


    // ##### userchoice
    let userChoice = askPlayerChoice();

    function askPlayerChoice() {
        let choices = document.getElementsByClassName("choice");
        for (var choice of choices) {
            choice.onclick = function() {
                document.getElementById("choice").classList.add("d-none");
                console.innerText = `You choose: ${this.value}`;
                return this.value;
            }
        }
    }

    // #### computerchoice
    let computerChoice = generateComputerChoice();
    
    function generateComputerChoice() {
        return Object.keys(choices)[Math.floor(Math.random() * Object.keys(choices).length)];
    };
    
    console.innerText = `Computer choose: ${computerChoice}`;

    // #### winner

    computerChoice = choices[userChoice].indexOf(computerChoice); 
    userChoice = choices[userChoice].indexOf(userChoice);

    if (userChoice === computerChoice) {
        console.innerText = `It's a draw.\n ${userName} : ${userScore}  |  Computer : ${computerScore}`;
    } else if (userChoice > computerChoice) {
        userScore++
        console.innerText = `You win this round.\n ${userName} : ${userScore}  |  Computer : ${computerScore}`;
    } else {
        computerScore++
        console.innerText = `Sorry you lost this round.\n ${userName} : ${userScore}  |  Computer : ${computerScore}`;
    }


    // ### final winner
    function replay() {
        document.getElementById("replay").classList.remove("d-none");
        console.innerText = "Do you want to play again?"
        let answers = document.getElementsByClassName("replay");
        for (var answer of answers) {
            answer.onclick = function() {
                return this.value;
            }
        }
        answer === "yes"? (userScore = 0, computerScore = 0) : console.innerText = "Thanks for this game, see you soon.";
    }

    if (userScore === 3 || computerScore === 3) {
        if (userScore < computerScore){
            console.innerText = "GAME OVER";
            replay();
        } else {
            console.innerText = "Congratulations you are the QUEEN/KING of Chi-Fou-Mi";
            replay();
        }
    }
}

