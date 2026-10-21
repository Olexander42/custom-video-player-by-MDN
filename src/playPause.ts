import { playBtn, mediaEl, rwdBtn, fwdBtn } from "./elements.js";
import { intervalFwd, intervalRwd } from "./intervals.js";
import { stopWind } from "./helpers.js";

export function playPauseMedia() {
  if (mediaEl.paused) {
    playBtn.setAttribute("data-icon", "u");
    playBtn.setAttribute("data-state", "playing")
    mediaEl.play();
  } else {
    playBtn.setAttribute("data-icon", "P");
    playBtn.setAttribute("data-state", "paused")
    mediaEl.pause();
  }

  stopWind(rwdBtn, intervalRwd);
  stopWind(fwdBtn, intervalFwd);
}

