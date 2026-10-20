import { playEl, mediaEl, controlsEl, stopEl, rwdEl, fwdEl } from "./src/elements.js";
import { playPauseMedia, stopMedia } from "./src/playPause.js";
import { setTimerNumbers, setTimerWidth } from "./src/timerDisplay.js";
import { mediaBackward, mediaForward } from "./src/wind.js";


mediaEl.removeAttribute("controls")
controlsEl.style.visibility = "visible"

playEl.addEventListener('click', playPauseMedia);
stopEl.addEventListener('click', stopMedia);

mediaEl.addEventListener('ended', stopMedia);
mediaEl.addEventListener('timeupdate', setTimerNumbers);
mediaEl.addEventListener('timeupdate', setTimerWidth);

rwdEl.addEventListener('click', mediaBackward);
fwdEl.addEventListener('click', mediaForward);

