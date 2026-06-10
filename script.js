const board = document.getElementById("board");
const chatbox = document.getElementById("chatbox");

let gameState = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = false;
let mode = "";

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// Create Board
function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => makeMove(i));
        board.appendChild(cell);
    }
}

// Mode Selection
function setMode(selectedMode) {
    mode = selectedMode;
    gameActive = true;
    addMessage("Bot: Game started! 🎮", "bot");
    createBoard();
}

// Chat Messages
function addMessage(text, type) {
    let msg = document.createElement("p");
    msg.classList.add(type);
    msg.innerText = text;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Player Move
function makeMove(index) {
    if (!gameActive || gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    board.children[index].innerText = currentPlayer;

    addMessage(`Player ${currentPlayer} moved`, "user");

    if (checkWinner()) {
        addMessage(`🎉 Player ${currentPlayer} wins!`, "bot");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (mode === "bot" && currentPlayer === "O") {
        setTimeout(botMove, 500);
    }
}

// Bot Move
function botMove() {
    let empty = gameState.map((v,i)=>v===""?i:null).filter(v=>v!==null);
    let move = empty[Math.floor(Math.random()*empty.length)];

    gameState[move] = "O";
    board.children[move].innerText = "O";

    addMessage("Bot played 🤖", "bot");

    if (checkWinner()) {
        addMessage("Bot wins 😎", "bot");
        gameActive = false;
        return;
    }

    currentPlayer = "X";
}

// Check Winner
function checkWinner() {
    return winPatterns.some(pattern => {
        return pattern.every(i => gameState[i] === currentPlayer);
    });
}

// Restart
function restartGame() {
    gameState = ["","","","","","","","",""];
    currentPlayer = "X";
    gameActive = false;
    chatbox.innerHTML = '<p class="bot">Bot: Choose mode again 👇</p>';
    board.innerHTML = "";
}
