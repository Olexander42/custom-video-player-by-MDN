import { mediaEl, fwdEl, rwdEl } from "./elements.js";
import { stopMedia } from "./playPause.js";


const TIME_GAP = 500;
const TIME_STEP = 1000;

let intervalRwd: number | undefined;
let intervalFwd: number | undefined;

export function mediaBackward() {
  clearInterval(intervalFwd)
  fwdEl.classList.remove("active");

  if (rwdEl.classList.contains("active")) {
    rwdEl.classList.remove("active");
    clearInterval(intervalRwd);    
    mediaEl.play();
  } else {
    rwdEl.classList.add("active");
    mediaEl.pause();
    intervalRwd = setInterval(windBackward, TIME_GAP);
  }
}

export function mediaForward() {
  clearInterval(intervalRwd)
  rwdEl.classList.remove("active");

  if (fwdEl.classList.contains("active")) {
    fwdEl.classList.remove("active");
    clearInterval(intervalFwd);
    mediaEl.play();
  } else {
    fwdEl.classList.add("active");
    mediaEl.pause();
    intervalFwd = setInterval(windForward, TIME_GAP);
  }
}

function windBackward() {
  if (mediaEl.currentTime < TIME_GAP) {
    rwdEl.classList.remove("active");
    clearInterval(intervalRwd);
    stopMedia();
  } else {
    mediaEl.currentTime -= TIME_STEP;
  }
}

function windForward() {
  if (mediaEl.currentTime > mediaEl.duration - TIME_GAP) {
    fwdEl.classList.remove("active");
    clearInterval(intervalFwd);
    stopMedia();
  } else {
    mediaEl.currentTime += TIME_STEP;
  }
}

export { intervalRwd, intervalFwd }


