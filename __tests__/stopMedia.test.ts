import { playEl, stopEl, mediaEl, rwdEl, fwdEl, DURATION } from "./fixture.js";
import { stopMedia } from "../src/stopMedia.js"
import { playPauseMedia } from "../src/playPause.js";


vi.mock("../src/elements.js", () => ({ playEl, mediaEl, rwdEl, fwdEl }));
playEl.addEventListener('click', playPauseMedia);
stopEl.addEventListener('click', stopMedia);

test("Stop button", () => {
  playEl.dispatchEvent(new Event('click'));
  stopEl.dispatchEvent(new Event('click'));

  expect(mediaEl.paused).toBe(true);
  expect(playEl.getAttribute("data-icon")).toBe("P");
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
  expect(playEl.getAttribute("data-icon")).toBe("P");
  expect(mediaEl.currentTime).toBe(0);
})
