import { mediaEl, playEl, rwdEl, fwdEl, DURATION } from "./fixture.js";
import { intervalRwd, intervalFwd, mediaBackward, mediaForward } from "../src/wind.js";
import * as playPause from "../src/playPause.js";


vi.mock("../src/elements.js", () => ({ mediaEl, rwdEl, fwdEl, playEl }));
const stopMediaSpy = vi.spyOn(playPause, "stopMedia");


rwdEl.addEventListener('click', mediaBackward);
fwdEl.addEventListener('click', mediaForward);

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