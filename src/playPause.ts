import { playEl, mediaEl } from "./elements.js";

export function playPauseMedia() {
  if (mediaEl.paused) {
    playEl.setAttribute("data-icon", "u");
    mediaEl.play();
  } else {
    playEl.setAttribute("data-icon", "P");
    mediaEl.pause();
  }
}

export function stopMedia() {
  mediaEl.pause();
  mediaEl.currentTime = 0;
  playEl.setAttribute("data-icon", "P");
}