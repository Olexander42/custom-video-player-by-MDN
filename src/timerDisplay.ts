import { mediaEl, timerWrapperEl, timerEl, timerBarEl } from "./elements.js"


export function setTimerNumbers() {
  const minutes = Math.floor(mediaEl.currentTime / 60);
  const seconds = Math.floor(mediaEl.currentTime - minutes * 60);

  const minutesText = minutes.toString().padStart(2, "0");
  const secondsText = seconds.toString().padStart(2, "0");

  timerEl.textContent = `${minutesText}:${secondsText}`;
}

export function setTimerWidth() {
  console.log(timerWrapperEl.clientWidth);
  
  const timerWidth = timerWrapperEl.clientWidth * (mediaEl.currentTime / mediaEl.duration);
  
  timerBarEl.style.width = `${timerWidth}px`;
}