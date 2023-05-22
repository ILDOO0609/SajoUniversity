document.addEventListener("DOMContentLoaded", () => {
  const bird = document.getElementById("bird");
  const gameContainer = document.getElementById("game-container");
  let gravity = 0.5;
  let birdPosition = 250;
  let birdSpeed = 0;
  let gameLoop;

  function updateBird() {
    birdSpeed += gravity;
    birdPosition += birdSpeed;
    bird.style.top = birdPosition + "px";
  }

  function generatePipe() {
    const pipeHeight = Math.floor(Math.random() * 200) + 100;
    const pipe = document.createElement("div");
    pipe.classList.add("pipe");
    pipe.style.height = pipeHeight + "px";
    pipe.style.left = "400px";
    gameContainer.appendChild(pipe);

    function movePipe() {
      const pipes = document.getElementsByClassName("pipe");
      for (let i = 0; i < pipes.length; i++) {
        const currentPipe = pipes[i];
        const currentPipePosition = parseInt(currentPipe.style.left);
        currentPipe.style.left = currentPipePosition - 5 + "px";

        if (currentPipePosition < -80) {
          currentPipe.parentNode.removeChild(currentPipe);
        }

        if (
          birdPosition < pipeHeight &&
          birdPosition > pipeHeight - 50 &&
          currentPipePosition < 110 &&
          currentPipePosition > 30
        ) {
          gameOver();
        }
      }
    }

    gameLoop = setInterval(movePipe, 20);
  }

  function gameOver() {
    clearInterval(gameLoop);
    alert("Game over!");
    bird.style.top = "250px";
    birdSpeed = 0;
    gameLoop = setInterval(movePipe, 20);
  }

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      birdSpeed = -10;
    }
  });

  generatePipe();
  setInterval(updateBird, 20);
});