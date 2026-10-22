import { mediaEl, timerWrapperEl, timerSeekerEl } from "./fixture.js";
import { jump } from "../src/mouseScroll.js";

vi.mock("../src/elements.js", () => ({ mediaEl, timerSeekerEl, timerWrapperEl }));

timerWrapperEl.addEventListener('mousemove', jump);
timerWrapperEl.addEventListener('mouseup', jump);
timerWrapperEl.addEventListener('mouseleave', jump)

const DIVIDER = 3;
const timerWrapperLeft = timerWrapperEl.getBoundingClientRect().left;
const mouseX = (timerWrapperEl.clientWidth + timerWrapperLeft) / DIVIDER + timerWrapperLeft;


test("Seeker", () => {
  const mouseHover = new MouseEvent('mousemove');

  Object.defineProperty(mouseHover, 'clientX', {
    value: mouseX
  })

  timerWrapperEl.dispatchEvent(mouseHover);
  expect(parseInt(timerSeekerEl.style.width)).toBe(Math.round(mouseX - timerWrapperLeft));

  timerWrapperEl.dispatchEvent(new Event('mouseleave'));
  expect(parseInt(timerSeekerEl.style.width)).toBe(0);
})

test("Jump to cursor on click", () => {
  const mouseClick = new MouseEvent('mouseup');

  Object.defineProperty(mouseClick, 'clientX', {
    value: mouseX
  })

  timerWrapperEl.dispatchEvent(mouseClick);

  expect(mediaEl.currentTime).toBe(Math.round(mediaEl.duration - mediaEl.duration / DIVIDER))
})






