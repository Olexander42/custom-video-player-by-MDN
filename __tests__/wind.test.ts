import { mediaEl, playEl, rwdEl, fwdEl, DURATION } from "./fixture.js";
import { intervalRwd, intervalFwd, mediaBackward, mediaForward } from "../src/wind.js";
import * as playPause from "../src/playPause.js";


vi.mock("../src/elements.js", () => ({ mediaEl, rwdEl, fwdEl, playEl }));
const stopMediaSpy = vi.spyOn(playPause, "stopMedia");

suite("Backward/Forward", () => {
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
    expect(mediaEl.paused).toBe(true);
    expect(mediaEl.currentTime).toBe(8000);

    rwdEl.dispatchEvent(new Event('click')); // stop rewinding
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(mediaEl.paused).toBe(false);
    expect(rwdEl.classList.contains("active")).toBe(false);

   
    // rewind to beginning
    mediaEl.currentTime = DURATION;
    rwdEl.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(DURATION);

    expect(rwdEl.classList.contains("active")).toBe(false);
    expect(intervalSpy).toHaveBeenCalledWith(intervalRwd);
    expect(stopMediaSpy).toHaveBeenCalled();
    expect(mediaEl.paused).toBe(true);
    expect(mediaEl.currentTime).toBe(0);
    expect(playEl.getAttribute("data-icon")).toBe("P");
  })

  test("Fast forward", () => {
    mediaEl.currentTime = 0;
  
    fwdEl.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(1000);

    expect(fwdEl.classList.contains("active")).toBe(true);
    expect(mediaEl.pause).toHaveBeenCalled();
    expect(mediaEl.paused).toBe(true);
    expect(mediaEl.currentTime).toBe(2000);

    fwdEl.dispatchEvent(new Event('click')); // stop fast-forwarding
    
    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(mediaEl.paused).toBe(false);
    expect(fwdEl.classList.contains("active")).toBe(false);

    // rewind to ending
    mediaEl.currentTime = 0;
    fwdEl.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(DURATION);

    expect(fwdEl.classList.contains("active")).toBe(false);
    expect(intervalSpy).toHaveBeenCalledWith(intervalFwd);
    expect(mediaEl.paused).toBe(true);
    expect(mediaEl.currentTime).toBe(0);
    expect(playEl.getAttribute("data-icon")).toBe("P");
    expect(stopMediaSpy).toHaveBeenCalled();

  })
})