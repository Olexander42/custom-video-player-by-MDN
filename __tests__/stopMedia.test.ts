import { playBtn, stopBtn, mediaEl, rwdBtn, fwdBtn, DURATION } from "./fixture.js";
import { stopMedia } from "../src/stopMedia.js"
import { playPauseMedia } from "../src/playPause.js";


vi.mock("../src/elements.js", () => ({ playBtn, mediaEl, rwdBtn, fwdBtn }));
playBtn.addEventListener('click', playPauseMedia);
stopBtn.addEventListener('click', stopMedia);

test("Stop button", () => {
  playBtn.dispatchEvent(new Event('click'));
  stopBtn.dispatchEvent(new Event('click'));

  expect(mediaEl.paused).toBe(true);
  expect(playBtn.getAttribute("data-icon")).toBe("P");
  expect(mediaEl.currentTime).toBe(0);
})

test("Media ended", () => {
  mediaEl.currentTime = DURATION / 2;
  mediaEl.play();
  
  expect(mediaEl.currentTime).not.toBe(0);
  expect(mediaEl.paused).toBe(false);
  
  mediaEl.addEventListener('ended', stopMedia)
  mediaEl.dispatchEvent(new Event('ended'));

  expect(mediaEl.paused).toBe(true);
  expect(playBtn.getAttribute("data-icon")).toBe("P");
  expect(mediaEl.currentTime).toBe(0);
})
