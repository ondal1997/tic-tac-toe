const scores = [0, 0];
const board = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
let turn = 0;
let isOver = false;
let winner = NaN;

function resetBoard() {
  for (let i = 0; i < 9; i++) {
    board[i] = NaN;
  }
  turn = 0;
  isOver = false;
  winner = NaN;
  render();
}

function act(position) {
  if (isOver) {
    return;
  }

  if (!isNaN(board[position])) {
    return;
  }

  board[position] = turn % 2;

  turn++;
  updateIsOver();
  render();
}

function updateIsOver() {
  if (turn === 9) {
    isOver = true;
    return;
  }

  for (let i = 0; i < 3; i++) {
    if (
      board[i * 3] === board[i * 3 + 1] &&
      board[i * 3] === board[i * 3 + 2]
    ) {
      isOver = true;
    }
    if (board[i] === board[i + 1 * 3] && board[i] === board[i + 2 * 3]) {
      isOver = true;
    }
  }
  if (board[0] === board[4] && board[4] === board[8]) {
    isOver = true;
  }
  if (board[2] === board[4] && board[4] === board[6]) {
    isOver = true;
  }

  if (isOver) {
    winner = (turn + 1) % 2;
    scores[winner]++;
  }
}

const $tiles = window.document.querySelectorAll(".board div");
const $score = window.document.querySelector(".score");
const $text = window.document.querySelector(".text");
const $reset = window.document.querySelector(".reset");

render();

$reset.disabled = false;
$reset.addEventListener("click", resetBoard);

$tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => {
    act(index);
  });
});

function render() {
  board.forEach((value, index) => {
    switch (value) {
      case 0:
        $tiles[index].className = "red";
        break;
      case 1:
        $tiles[index].className = "blue";
        break;
      default:
        $tiles[index].className = "";
        break;
    }
  });

  $score.innerHTML = `${scores[0]} : ${scores[1]}`;

  if (isOver) {
    switch (winner) {
      case 0:
        $text.innerHTML = "red win!";
        break;
      case 1:
        $text.innerHTML = "blue win!";
        break;
      default:
        $text.innerHTML = "draw...";
        break;
    }
  } else {
    $text.innerHTML = `now ${turn % 2 ? "blue" : "red"}`;
  }
}
