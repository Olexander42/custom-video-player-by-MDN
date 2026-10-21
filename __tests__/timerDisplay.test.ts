import { mediaEl, timerWrapperEl, timerEl, timerBarEl, DURATION } from "./fixture.js"
import { setTimerNumbers, setTimerWidth } from "../src/timerDisplay.js"


vi.mock("../src/elements.ts", () => ({ timerWrapperEl, timerBarEl, timerEl, mediaEl,  }));


suite("Timer Numbers", () => {
  afterAll(() => {
    Object.defineProperty(mediaEl, 'duration', {
      value: DURATION
    })
  })

  test("Seconds long video", () => {
    Object.defineProperty(mediaEl, 'duration', {
      value: 10
    })

    mediaEl.currentTime = 9;

    setTimerNumbers();
    
    expect(timerEl.textContent).toBe("09");
  })

  test("Minutes long video", () => {
    Object.defineProperty(mediaEl, 'duration', {
      value: 100
    })

    mediaEl.currentTime = 80;

    setTimerNumbers();
    
    expect(timerEl.textContent).toBe("01:20");
  })

  test("More than hour", () => {
    Object.defineProperty(mediaEl, 'duration', {
      value: 10000
    })

    mediaEl.currentTime = 3661;

    setTimerNumbers();
    
    expect(timerEl.textContent).toBe("01:01:01");
  })
})


test("Timer Width", () => {
  mediaEl.currentTime = mediaEl.duration / 3;  

  setTimerWidth();

  expect(parseInt(timerBarEl.style.width)).toBe(33);
})
