import { playEl, mediaEl, rwdEl, fwdEl } from "./elements.js";
import { intervalFwd, intervalRwd } from "./intervals.js";
import { stopWind } from "./helpers.js";

export function playPauseMedia() {
  if (mediaEl.paused) {
    playEl.setAttribute("data-icon", "u");
    mediaEl.play();
  } else {
    playEl.setAttribute("data-icon", "P");
    mediaEl.pause();
  }

  stopWind(rwdEl, intervalRwd);
  stopWind(fwdEl, intervalFwd);
}

