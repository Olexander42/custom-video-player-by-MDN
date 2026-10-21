import { playBtn, mediaEl, rwdBtn, fwdBtn } from "./elements.js";
import { intervalRwd, intervalFwd } from "./intervals.js";
import { stopWind } from "./helpers.js"


export function stopMedia() {
  stopWind(rwdBtn, intervalRwd);
  stopWind(fwdBtn, intervalFwd);

  mediaEl.pause();
  mediaEl.currentTime = 0;
  playBtn.setAttribute("data-icon", "P");
  playBtn.setAttribute("data-state", "paused")
}