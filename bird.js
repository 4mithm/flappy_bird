
const bird = document.querySelector("[data-bird]");
const BIRD_Y = 3;
let time_since_last_jump;
let JUMP_TIME = 70;
export function setupBird() {
	bird.style.setProperty("--bird-top", window.innerHeight / 2);
	document.removeEventListener("keypress", handleJump);
	document.addEventListener("keypress", handleJump);
}
export function updateBird(delta) {
	delta = delta * 0.1 + BIRD_Y;
	if (time_since_last_jump < JUMP_TIME) setTop(getTop() - delta);
	else setTop(getTop() + delta);

	time_since_last_jump += delta;
}
function getTop() {
	return parseFloat(getComputedStyle(bird).getPropertyValue("--bird-top"));
}
function setTop(value) {
	bird.style.setProperty("--bird-top", value);
}
function handleJump(event) {
	if (event.code !== "Space") return;
	time_since_last_jump = 0;
}
export function birdPositionOut() {
	const rect = bird.getBoundingClientRect();
	if (rect.top < 0 || rect.bottom > window.innerHeight) return true;
	return false;
}
export function getBirdDim() {
	return bird.getBoundingClientRect();
}
