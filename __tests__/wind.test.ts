import { mediaEl, playEl, rwdEl, fwdEl, DURATION } from "./fixture.js";
import { intervalRwd, intervalFwd } from "../src/intervals.js";
import { mediaBackward, mediaForward } from "../src/wind.js";
import * as stopMedia from "../src/stopMedia.js";
import { playPauseMedia } from "../src/playPause.js";


vi.mock("../src/elements.js", () => ({ mediaEl, rwdEl, fwdEl, playEl }));
const stopMediaSpy = vi.spyOn(stopMedia, "stopMedia");

rwdEl.addEventListener('click', mediaBackward);
fwdEl.addEventListener('click', mediaForward);
playEl.addEventListener('click', playPauseMedia)

vi.useFakeTimers();

const intervalSpy = vi.spyOn(globalThis, "clearInterval");

test("Rewind", () => {
  mediaEl.currentTime = DURATION;

  rwdEl.dispatchEvent(new Event('click'));
  vi.advanceTimersByTime(1000);
  
  expect(rwdEl.classList.contains("active")).toBe(true);
  expect(mediaEl.pause).toHaveBeenCalled();
  expect(mediaEl.currentTime).toBe(DURATION - 2);

  rwdEl.dispatchEvent(new Event('click')); // stop rewinding
  
  expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
  expect(mediaEl.paused).toBe(false);
  expect(rwdEl.classList.contains("active")).toBe(false);

  rwdEl.dispatchEvent(new Event('click'));
  playEl.dispatchEvent(new Event('click')); // stop by hitting 'Play' button
  
  expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
  expect(mediaEl.paused).toBe(false);
  expect(rwdEl.classList.contains("active")).toBe(false);
   
  // rewind to beginning
  mediaEl.currentTime = DURATION;
  rwdEl.dispatchEvent(new Event('click'));
  vi.advanceTimersByTime(DURATION * 1000);

  expect(rwdEl.classList.contains("active")).toBe(false);
  expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
  expect(stopMediaSpy).toHaveBeenCalled();
})

test("Fast forward", () => {
  mediaEl.currentTime = 0;

  fwdEl.dispatchEvent(new Event('click'));
  vi.advanceTimersByTime(1000);

  expect(fwdEl.classList.contains("active")).toBe(true);
  expect(mediaEl.pause).toHaveBeenCalled();
  expect(mediaEl.currentTime).toBe(2);

  fwdEl.dispatchEvent(new Event('click')); // stop fast-forwarding
  
  expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
  expect(mediaEl.paused).toBe(false);
  expect(fwdEl.classList.contains("active")).toBe(false);

  fwdEl.dispatchEvent(new Event('click'));
  playEl.dispatchEvent(new Event('click')); // stop by hitting 'Play' button
  
  //expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
  expect(mediaEl.paused).toBe(false);
  expect(fwdEl.classList.contains("active")).toBe(false);

  // rewind to ending
  mediaEl.currentTime = 0;
  fwdEl.dispatchEvent(new Event('click'));
  vi.advanceTimersByTime(DURATION * 1000);

  expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
  expect(stopMediaSpy).toHaveBeenCalled();
})

test("Media ended", () => {
  mediaEl.addEventListener('ended', stopMediaSpy);
  mediaEl.currentTime = DURATION / 2;
  mediaEl.play();

  expect(mediaEl.paused).toBe(false);

  mediaEl.dispatchEvent(new Event('ended'));

  expect(stopMediaSpy).toHaveBeenCalled();
})