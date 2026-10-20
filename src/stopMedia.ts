import { playEl, mediaEl, rwdEl, fwdEl } from "./elements.js";
import { intervalRwd, intervalFwd } from "./intervals.js";
import { stopWind } from "./helpers.js"


export function stopMedia() {
  stopWind(rwdEl, intervalRwd);
  stopWind(fwdEl, intervalFwd);

  mediaEl.pause();
  mediaEl.currentTime = 0;
  playEl.setAttribute("data-icon", "P");
}