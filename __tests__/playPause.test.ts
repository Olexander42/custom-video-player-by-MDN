import { playEl, mediaEl, rwdEl, fwdEl } from "./fixture.js";
import { playPauseMedia } from "../src/playPause.js";


vi.mock("../src/elements.js", () => ({ playEl, mediaEl, rwdEl, fwdEl }));

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
