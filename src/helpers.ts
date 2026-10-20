export function stopWind(el: HTMLElement, interval: number | undefined) {
  el.classList.remove("active");
  clearInterval(interval);
}