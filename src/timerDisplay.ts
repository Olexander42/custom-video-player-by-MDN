import { timerWrapperEl, timerBarEl, timerEl, mediaEl } from "./elements.js"


export function setTimerNumbers() {
  const currentTime = mediaEl.currentTime
  const duration = mediaEl.duration;

  const hours = Math.floor(currentTime / 3600);
  const minutes = Math.floor((currentTime - hours * 3600) / 60);
  const seconds = Math.floor(
    currentTime - hours * 3600 - minutes * 60
  );

  const hoursText = hours.toString().padStart(2, "0");
  const minutesText = minutes.toString().padStart(2, "0");
  const secondsText = seconds.toString().padStart(2, "0");

  if (duration > 3600) {
    timerEl.textContent = `${hoursText}:${minutesText}:${secondsText}`;
  } else if (duration > 60) {
    timerEl.textContent = `${minutesText}:${secondsText}`;
  } else {
    timerEl.textContent = `${secondsText}`;
  }
}

export function setTimerWidth() {  
  const timerWidth = timerWrapperEl.clientWidth * (mediaEl.currentTime / mediaEl.duration);
    
  timerBarEl.style.width = `${timerWidth}px`;
}