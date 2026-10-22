import { playBtn, mediaEl, controlsEl, stopBtn, rwdBtn, fwdBtn, timerWrapperEl } from "./src/elements.js";
import { playPauseMedia } from "./src/playPause.js";
import { stopMedia } from "./src/stopMedia.js";
import { setTimerNumbers, setTimerWidth } from "./src/timerDisplay.js";
import { mediaBackward, mediaForward } from "./src/wind.js";
import { jump } from "./src/mouseScroll.js";


mediaEl.removeAttribute("controls")
controlsEl.style.visibility = "visible"

playBtn.addEventListener('click', playPauseMedia);
stopBtn.addEventListener('click', stopMedia);

mediaEl.addEventListener('ended', stopMedia);
mediaEl.addEventListener('timeupdate', setTimerNumbers);
mediaEl.addEventListener('timeupdate', setTimerWidth);

rwdBtn.addEventListener('click', mediaBackward);
fwdBtn.addEventListener('click', mediaForward);

timerWrapperEl.addEventListener('mousemove', jump);
timerWrapperEl.addEventListener('mouseup', jump);
timerWrapperEl.addEventListener('mouseleave', jump)


