import { mediaEl, timerWrapperEl } from "./fixture.js";
import { jump } from "../src/mouseScroll.js";

vi.mock("../src/elements.js", () => ({ mediaEl }));

timerWrapperEl.addEventListener('mouseup', jump);
const mouseClick = new MouseEvent('mouseup');

test("Jump to cursor on click", () => {
  const DIVIDER = 3
  Object.defineProperty(mouseClick, 'offsetX', {
    value: timerWrapperEl.clientWidth / DIVIDER
  })

  timerWrapperEl.dispatchEvent(mouseClick);

  expect(mediaEl.currentTime).toBe(Math.round(mediaEl.duration / DIVIDER))
})






