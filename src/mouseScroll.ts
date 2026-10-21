import { mediaEl } from "./elements.js";


export function jump(event: MouseEvent) {
  const relativePosition = seeker(event)

  mediaEl.currentTime = Math.round(mediaEl.duration * relativePosition);
}

export function seeker(event: MouseEvent): number {
  const timescale = event.currentTarget as HTMLElement;
  const timescaleWidth = timescale.clientWidth;

  const x = event.offsetX;
  
  const relativePosition = Number((x / timescaleWidth).toFixed(2));

  return relativePosition
}




