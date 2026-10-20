import { playEl, mediaEl } from "./elements.js";


export function stopMedia() {
  mediaEl.pause();
  mediaEl.currentTime = 0;
  playEl.setAttribute("data-icon", "P");
}