import { playEl, mediaEl, stopEl, DURATION } from "./fixture.js";
import { playPauseMedia, stopMedia } from "../src/playPause.js";


vi.mock("../src/elements.js", () => ({ playEl, mediaEl }));

suite("Play/Pause Button", () => {
  playEl.addEventListener('click', playPauseMedia);

  test("Play successfully", () => {
    Object.defineProperty(mediaEl, "paused", {
      value: true,
      configurable: true
    });

    playEl.dispatchEvent(new Event('click'));

    expect(mediaEl.paused).toBe(false);
    expect(playEl.getAttribute("data-icon")).toBe("u");
  })

  test("Pause successfully", () => {
    Object.defineProperty(mediaEl, "paused", {
      value: false,
      configurable: true
    });

    playEl.dispatchEvent(new Event('click'));

    expect(mediaEl.paused).toBe(true);
    expect(playEl.getAttribute("data-icon")).toBe("P");
  })
})


suite("Stop media", () => {
  test("Stop button", () => {
    stopEl.addEventListener('click', stopMedia);
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
})





