import { getBirdDim } from "./bird.js";
const PIPE_HOLE = 270;
let pipes = [];
const PIPE_SPEED = 2;
let pipe;
const PIPE_INTERVAL = 3000;
let time_since_last_pipe = 0;
const MIN = PIPE_HOLE * 1.5;
let passPipes = 0;
const MAX = window.innerHeight - PIPE_HOLE * 0.5;
function createPipe() {
	pipe = document.createElement("div");
	const topEle = createPipeSegment("top");
	const bottomEle = createPipeSegment("bottom");
	pipe.append(topEle);
	pipe.append(bottomEle);
	pipe.classList.add("pipe");
	let top_bottom = getRandomNumber(MIN, MAX);
	pipe.style.setProperty("--top-height", top_bottom);
	pipe.style.setProperty("--pipe-left", 1500);
	pipe.style.setProperty("--hole", PIPE_HOLE);
	document.body.append(pipe);
	pipes.push(pipe);
}
function createPipeSegment(position) {
	const segment = document.createElement("div");
	segment.classList.add("segment", position);
	return segment;
}
export function updatePipes(delta) {
	time_since_last_pipe += delta;
	if (time_since_last_pipe > PIPE_INTERVAL) {
		time_since_last_pipe = 0;
		createPipe();
	}
	pipes.forEach((pipe) => {
		let x = getLeft(pipe);
		if (x < -40) {
			pipe.remove();
			pipes.shift();
			passPipes++;
		} else {
			setLeft(pipe, x - PIPE_SPEED);
		}
	});
}
function getLeft(x) {
	return parseFloat(getComputedStyle(x).getPropertyValue("--pipe-left"));
}
function setLeft(x, value) {
	x.style.setProperty("--pipe-left", value);
}
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
export function getPassedPipes() {
	return passPipes;
}
export function removePipes() {
	pipes.forEach((pipe) => pipe.remove());
	pipes = [];
}
export function isCollision() {
	if (pipes.length == 0) return false;
	let bird = getBirdDim();
	let arr = pipes[0].children;
	let rect1 = arr[0].getBoundingClientRect();
	let rect2 = arr[1].getBoundingClientRect();
	if (
		(bird.right > rect1.left || bird.right > rect2.left) &&
		(bird.top < rect1.bottom || bird.bottom > rect2.top) &&
		(bird.left < rect1.right || bird.left < rect2.right)
	) {
		return true;
	}

	return false;
}
