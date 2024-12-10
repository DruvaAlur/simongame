document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("game-container");
  const startGameBtn = document.getElementById("start-game-btn");

  let highlightedBox = null;
  let randomNumberArray = [];
  let boxClickedArray = [];
  let noOfRound = 0;

  for (let i = 1; i <= 4; i++) {
    const box = document.createElement("div");
    box.className = `box`;
    box.dataset.index = i;
    gameContainer.appendChild(box);

    box.addEventListener("click", () => {
      if (randomNumberArray.length == 0) {
        startGame();
      } else {
        boxClicked(parseInt(box.dataset.index));
      }
    });
  }

  const resetGame = () => {
    randomNumberArray = [];
    boxClickedArray = [];
    noOfRound = 0;
    document.querySelector(`#roundNo`).innerText = `Round : ${noOfRound}`;
  };

  const startGame = () => {
    resetGame();
    startNextRound();
  };

  const startNextRound = () => {
    boxClickedArray = [];
    noOfRound++;
    document.querySelector(`#roundNo`).innerText = `Round : ${noOfRound}`;
    highlightNextRandomBox();
  };

  const highlightNextRandomBox = () => {
    const max = 4;
    const min = 1;
    const highlightBox = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumberArray.push(highlightBox);

    highlightedBox = highlightBox;
    const box = document.querySelector(`.box[data-index="${highlightBox}"]`);
    box.classList.add("highlighted");

    setTimeout(() => {
      box.classList.remove("highlighted");
      highlightedBox = null;
    }, 1000);
  };

  const checkClickedBox = () => {
    if (boxClickedArray.length > noOfRound) {
      return false;
    }
    for (let i = 0; i < boxClickedArray.length; i++) {
      if (boxClickedArray[i] !== randomNumberArray[i]) {
        return false;
      }
    }
    return true;
  };

  const boxClicked = (boxIndex) => {
    boxClickedArray.push(boxIndex);

    if (checkClickedBox()) {
      if (boxClickedArray.length === noOfRound) {
        startNextRound();
      }
    } else {
      alert("Game over! Try again.");
      resetGame();
    }
  };
});
