import { playBtn, mediaEl, rwdBtn, fwdBtn } from "./fixture.js";
import { playPauseMedia } from "../src/playPause.js";


vi.mock("../src/elements.js", () => ({ playBtn, mediaEl, rwdBtn, fwdBtn }));

suite("Play/Pause Button", () => {
  playBtn.addEventListener('click', playPauseMedia);

  test("Play successfully", () => {
    Object.defineProperty(mediaEl, "paused", {
      value: true,
      configurable: true
    });

    playBtn.dispatchEvent(new Event('click'));

    expect(mediaEl.paused).toBe(false);
    expect(playBtn.getAttribute("data-icon")).toBe("u");
  })

  test("Pause successfully", () => {
    Object.defineProperty(mediaEl, "paused", {
      value: false,
      configurable: true
    });

    playBtn.dispatchEvent(new Event('click'));

    expect(mediaEl.paused).toBe(true);
    expect(playBtn.getAttribute("data-icon")).toBe("P");
  })
})
