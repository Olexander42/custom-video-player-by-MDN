import { mediaEl, fwdBtn, rwdBtn, playBtn } from "./elements.js";
import { intervalRwd, intervalFwd, setIntervalRwd, setIntervalFwd } from "./intervals.js";
import { stopWind } from "./helpers.js";
import { stopMedia } from "./stopMedia.js";


const TIME_GAP = 100;
const CURRENT_TIME_STEP = 1;

export function mediaBackward() {
  stopWind(fwdBtn, intervalFwd);

  /* If the button has been already active, stop rewinding
  and return to the previous state. */
  if (rwdBtn.classList.contains("active")) {
    stopWind(rwdBtn, intervalRwd);

    if (playBtn.getAttribute("data-state") === "playing") {
      playBtn.setAttribute("data-icon", "u");
      mediaEl.play();
    }

  } else {
    rwdBtn.classList.add("active");
    playBtn.setAttribute("data-icon", "P");
    mediaEl.pause();
    setIntervalRwd(setInterval(windBackward, TIME_GAP));
  }
}

export function mediaForward() {
  stopWind(rwdBtn, intervalRwd);

  if (fwdBtn.classList.contains("active")) {    
    stopWind(fwdBtn, intervalFwd)

    /* If the button has been already active, stop fast-forwarding
    and return to the previous state. */
    if (playBtn.getAttribute("data-state") === "playing") {
      playBtn.setAttribute("data-icon", "u");
      mediaEl.play();
    }

  } else {
    fwdBtn.classList.add("active");
    playBtn.setAttribute("data-icon", "P")
    mediaEl.pause();
    setIntervalFwd(setInterval(windForward, TIME_GAP));
  }
}

function windBackward() {
  if (mediaEl.currentTime < CURRENT_TIME_STEP) {
    stopWind(rwdBtn, intervalRwd);
    stopMedia();
  } else {
    mediaEl.currentTime -= CURRENT_TIME_STEP;
  }
}

function windForward() {
  if (mediaEl.currentTime > mediaEl.duration - CURRENT_TIME_STEP) {
    stopWind(fwdBtn, intervalFwd)
    stopMedia();
  } else {
    mediaEl.currentTime += CURRENT_TIME_STEP;
  }
}




