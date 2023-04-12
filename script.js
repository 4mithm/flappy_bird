import { updateBird, setupBird, birdPositionOut } from "./bird.js";
import { updatePipes,getPassedPipes,removePipes,isCollision } from "./pipe.js";
document.addEventListener("keypress", startGame, { once: true });
const title = document.querySelector(".title");
const subtitle = document.querySelector("[data-subtitle]");
let last_time = 0;

function startGame() {
	last_time = 0;
	title.classList.add("hide");
	subtitle.classList.add("hide");
	setupBird();
	requestAnimationFrame(updateGame);
}
function updateGame(time) {
	if (last_time == 0) last_time = time;
	let delta = time - last_time;
	last_time = time;
	if (birdPositionOut() || isCollision()) return endGame();
	updateBird(delta);
      updatePipes(delta);
	requestAnimationFrame(updateGame);
}
function endGame() {
	setTimeout(() => {
		title.classList.remove("hide");
		subtitle.classList.remove("hide");
		subtitle.textContent = `${getPassedPipes()} pipes`;
		document.addEventListener("keypress", startGame, { once: true });
		removePipes()
	}, 400);
}
