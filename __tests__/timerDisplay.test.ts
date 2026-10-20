import { mediaEl, timerWrapperEl, timerEl, timerBarEl, DURATION } from "./fixture.js"
import { setTimerNumbers, setTimerWidth } from "../src/timerDisplay.js"


vi.mock("../src/elements.ts", () => ({  mediaEl, timerWrapperEl, timerEl, timerBarEl }));

mediaEl.currentTime = 80;

test("Timer Numbers", () => {
  setTimerNumbers();
  
  expect(timerEl.textContent).toBe("01:20");
})

test("Timer Width", () => {
  const DIVIDER = 3
  mediaEl.currentTime = DURATION / DIVIDER;  

  setTimerWidth();
  
  expect(parseFloat(timerBarEl.style.width)).toBe(timerWrapperEl.clientWidth / DIVIDER);
})
