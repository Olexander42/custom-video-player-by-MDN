import { playEl, mediaEl, controlsEl, stopEl, rwdEl, fwdEl } from "./src/elements.js";
import { playPauseMedia } from "./src/playPause.js";
import { stopMedia } from "./src/stopMedia.js";
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

