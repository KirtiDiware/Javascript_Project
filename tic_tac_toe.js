let boxes = document.querySelectorAll(".box"); //access by class name
let resetBtn = document.querySelector("#reset-btn"); //access by id name
let newGameBtn = document.querySelector("#new-btn"); //to start new game
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg"); //display winner message after winning

//accessesing variable to know which players turn it is
let turnO = true;//playerX, playerO

//winning patterns
//2D array
const winPatterns = [
    [0,1,2],
    [3,4,5],       
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//reset game
const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

//adding event listeners on each boxes
boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO){ //playerO
            box.innerText = "O";
            turnO = false;
        } else{ //playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        //to check winner
        checkWinner();
    });
});

//disabled other boxes once we get our winner
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

//enable again after winning 
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


//display winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

//to check winner
const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

//new game
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);