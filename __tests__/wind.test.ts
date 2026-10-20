import { mediaEl, playEl, stopEl, rwdEl, fwdEl, DURATION } from "./fixture.js";
import { intervalRwd, intervalFwd } from "../src/intervals.js";
import { mediaBackward, mediaForward } from "../src/wind.js";
import * as stopMedia from "../src/stopMedia.js";
import { playPauseMedia } from "../src/playPause.js";


vi.mock("../src/elements.js", () => ({ mediaEl, rwdEl, fwdEl, playEl }));

const stopMediaSpy = vi.spyOn(stopMedia, "stopMedia");

rwdEl.addEventListener('click', mediaBackward);
fwdEl.addEventListener('click', mediaForward);
playEl.addEventListener('click', playPauseMedia)
stopEl.addEventListener('click', stopMediaSpy)

vi.useFakeTimers();

const intervalSpy = vi.spyOn(globalThis, "clearInterval");

suite("Rewind", () => {
  test("Stop with 'rewind' button", () => {
    mediaEl.currentTime = DURATION;

    rwdEl.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(200);
    
    expect(rwdEl.classList.contains("active")).toBe(true);
    expect(mediaEl.pause).toHaveBeenCalled();
    expect(mediaEl.currentTime).toBe(DURATION - 2);

    rwdEl.dispatchEvent(new Event('click')); 
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(mediaEl.paused).toBe(false);
    expect(rwdEl.classList.contains("active")).toBe(false);
  })

  test("Stop with 'Play' button", () => {
    rwdEl.dispatchEvent(new Event('click'));
    playEl.dispatchEvent(new Event('click')); 
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(mediaEl.paused).toBe(false);
    expect(rwdEl.classList.contains("active")).toBe(false);
  })

  test("Stop with 'Stop' button", () => {
    rwdEl.dispatchEvent(new Event('click'));
    stopEl.dispatchEvent(new Event('click')); 

    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(mediaEl.paused).toBe(true);
    expect(rwdEl.classList.contains("active")).toBe(false);
    expect(playEl.getAttribute("data-icon")).toBe("P");
  })

  test("Rewind to beginning", () => {
    mediaEl.currentTime = DURATION;
    rwdEl.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(DURATION * 1000);

    expect(rwdEl.classList.contains("active")).toBe(false);
    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(stopMediaSpy).toHaveBeenCalled();
  })
})

suite("Fast forward", () => {
  test("Stop with 'fast-forward' button", () => {
    mediaEl.currentTime = 0;

    fwdEl.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(1000);

    expect(fwdEl.classList.contains("active")).toBe(true);
    expect(mediaEl.pause).toHaveBeenCalled();
    expect(mediaEl.currentTime).toBe(10);

    fwdEl.dispatchEvent(new Event('click')); 
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(mediaEl.paused).toBe(false);
    expect(fwdEl.classList.contains("active")).toBe(false);
  })

  test("Stop with 'Play' button", () => {
    fwdEl.dispatchEvent(new Event('click'));
    playEl.dispatchEvent(new Event('click')); 
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(mediaEl.paused).toBe(false);
    expect(fwdEl.classList.contains("active")).toBe(false);
  })

  test("Stop with 'Stop' button", () => {
    fwdEl.dispatchEvent(new Event('click'));
    stopEl.dispatchEvent(new Event('click')); 

    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(mediaEl.paused).toBe(true);
    expect(rwdEl.classList.contains("active")).toBe(false);
    expect(playEl.getAttribute("data-icon")).toBe("P");
  })

  test("Rewind to ending", () => {
    mediaEl.currentTime = 0;
    fwdEl.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(DURATION * 1000);

    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(stopMediaSpy).toHaveBeenCalled();
  })
})

test("Media ended", () => {
  mediaEl.addEventListener('ended', stopMediaSpy);
  mediaEl.currentTime = DURATION / 2;
  mediaEl.play();

  expect(mediaEl.paused).toBe(false);

  mediaEl.dispatchEvent(new Event('ended'));

  expect(stopMediaSpy).toHaveBeenCalled();
})