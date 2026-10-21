import { mediaEl, playBtn, stopBtn, rwdBtn, fwdBtn, DURATION } from "./fixture.js";
import { intervalRwd, intervalFwd } from "../src/intervals.js";
import { mediaBackward, mediaForward } from "../src/wind.js";
import * as stopMedia from "../src/stopMedia.js";
import { playPauseMedia } from "../src/playPause.js";


vi.mock("../src/elements.js", () => ({ mediaEl, rwdBtn, fwdBtn, playBtn }));

const stopMediaSpy = vi.spyOn(stopMedia, "stopMedia");

rwdBtn.addEventListener('click', mediaBackward);
fwdBtn.addEventListener('click', mediaForward);
playBtn.addEventListener('click', playPauseMedia)
stopBtn.addEventListener('click', stopMediaSpy)

vi.useFakeTimers();

const intervalSpy = vi.spyOn(globalThis, "clearInterval"); // This initialization HAS TO come after `useFakeTimers`!

suite("Rewind", () => {
  test("Stop with 'rewind' button in 'paused' state", () => {
    mediaEl.currentTime = DURATION;
 
    rwdBtn.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(200);
    
    expect(rwdBtn.classList.contains("active")).toBe(true);
    expect(playBtn.getAttribute("data-icon")).toBe("P");
    expect(mediaEl.pause).toHaveBeenCalled();
    expect(mediaEl.currentTime).toBe(DURATION - 2);

    rwdBtn.dispatchEvent(new Event('click')); 
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(rwdBtn.classList.contains("active")).toBe(false);
    expect(mediaEl.paused).toBe(true);
    expect(playBtn.getAttribute("data-icon")).toBe("P");
  })

  test("Stop with 'rewind' button in 'active' state", () => {
    mediaEl.currentTime = DURATION;
    
    playBtn.dispatchEvent(new Event('click'));
    rwdBtn.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(200);

    rwdBtn.dispatchEvent(new Event('click')); 
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(rwdBtn.classList.contains("active")).toBe(false);
    expect(mediaEl.paused).toBe(false);
    expect(playBtn.getAttribute("data-icon")).toBe("u");
  })

  test("Stop with 'Play' button", () => {
    rwdBtn.dispatchEvent(new Event('click'));
    playBtn.dispatchEvent(new Event('click')); 
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(mediaEl.paused).toBe(false);
    expect(rwdBtn.classList.contains("active")).toBe(false);
    expect(playBtn.getAttribute("data-icon")).toBe("u");
  })

  test("Stop with 'Stop' button", () => {
    rwdBtn.dispatchEvent(new Event('click'));
    stopBtn.dispatchEvent(new Event('click')); 

    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(mediaEl.paused).toBe(true);
    expect(rwdBtn.classList.contains("active")).toBe(false);
    expect(playBtn.getAttribute("data-icon")).toBe("P");
  })

  test("Rewind to beginning", () => {
    mediaEl.currentTime = DURATION;
    rwdBtn.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(DURATION * 1000);

    expect(rwdBtn.classList.contains("active")).toBe(false);
    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(stopMediaSpy).toHaveBeenCalled();
    expect(playBtn.getAttribute("data-state")).toBe("paused");
    expect(playBtn.getAttribute("data-icon")).toBe("P");
  })
})

suite("Fast forward", () => {
  test("Stop with 'fast-forward' button in 'paused' state", () => {
    mediaEl.currentTime = 0;

    fwdBtn.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(1000);

    expect(fwdBtn.classList.contains("active")).toBe(true);
    expect(playBtn.getAttribute("data-icon")).toBe("P");
    expect(mediaEl.pause).toHaveBeenCalled();
    expect(mediaEl.currentTime).toBe(10);

    fwdBtn.dispatchEvent(new Event('click')); 
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(fwdBtn.classList.contains("active")).toBe(false);
    expect(mediaEl.paused).toBe(true);
    expect(playBtn.getAttribute("data-icon")).toBe("P");
  })

  test("Stop with 'fast-forward' button in 'active' state", () => {
    mediaEl.currentTime = 0;
    
    playBtn.dispatchEvent(new Event('click'));
    fwdBtn.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(200);

    fwdBtn.dispatchEvent(new Event('click')); 
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(fwdBtn.classList.contains("active")).toBe(false);
    expect(mediaEl.paused).toBe(false);
    expect(playBtn.getAttribute("data-icon")).toBe("u");
  })

  test("Stop with 'Play' button", () => {
    fwdBtn.dispatchEvent(new Event('click'));
    playBtn.dispatchEvent(new Event('click')); 
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(mediaEl.paused).toBe(false);
    expect(fwdBtn.classList.contains("active")).toBe(false);
    expect(playBtn.getAttribute("data-icon")).toBe("u");
  })

  test("Stop with 'Stop' button", () => {
    fwdBtn.dispatchEvent(new Event('click'));
    stopBtn.dispatchEvent(new Event('click')); 

    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(mediaEl.paused).toBe(true);
    expect(rwdBtn.classList.contains("active")).toBe(false);
    expect(playBtn.getAttribute("data-icon")).toBe("P");
  })

  test("Rewind to ending", () => {
    mediaEl.currentTime = 0;
    fwdBtn.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(DURATION * 1000);

    expect(fwdBtn.classList.contains("active")).toBe(false);
    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(stopMediaSpy).toHaveBeenCalled();
    expect(playBtn.getAttribute("data-state")).toBe("paused");
    expect(playBtn.getAttribute("data-icon")).toBe("P");
  })
})

test("Media ended", () => {
  mediaEl.addEventListener('ended', stopMediaSpy);
  mediaEl.currentTime = DURATION / 2;
  mediaEl.play();

  expect(mediaEl.paused).toBe(false);

  mediaEl.dispatchEvent(new Event('ended'));

  expect(stopMediaSpy).toHaveBeenCalled();
  expect(playBtn.getAttribute("data-icon")).toBe("P");
})