import { mediaEl, fwdEl, rwdEl } from "./elements.js";
import { intervalRwd, intervalFwd, setIntervalRwd, setIntervalFwd } from "./intervals.js";
import { stopWind } from "./helpers.js";
import { stopMedia } from "./stopMedia.js";


const TIME_GAP = 500;
const CURRENT_TIME_STEP = 1;

export function mediaBackward() {
  stopWind(fwdEl, intervalFwd);

  if (rwdEl.classList.contains("active")) {
    stopWind(rwdEl, intervalRwd);    
    mediaEl.play();
  } else {
    rwdEl.classList.add("active");
    mediaEl.pause();
    setIntervalRwd(setInterval(windBackward, TIME_GAP));
  }
}

export function mediaForward() {
  stopWind(rwdEl, intervalRwd);

  if (fwdEl.classList.contains("active")) {
    stopWind(fwdEl, intervalFwd)
    mediaEl.play();
  } else {
    fwdEl.classList.add("active");
    mediaEl.pause();
    setIntervalFwd(setInterval(windForward, TIME_GAP));
  }
}

function windBackward() {
  if (mediaEl.currentTime < CURRENT_TIME_STEP) {
    stopWind(rwdEl, intervalRwd);
    stopMedia();
  } else {
    mediaEl.currentTime -= CURRENT_TIME_STEP;
  }
}

function windForward() {
  if (mediaEl.currentTime > mediaEl.duration - CURRENT_TIME_STEP) {
    stopWind(fwdEl, intervalFwd)
    stopMedia();
  } else {
    mediaEl.currentTime += CURRENT_TIME_STEP;
  }
}




