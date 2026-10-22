import { mediaEl, timerWrapperEl, timerSeekerEl } from "./elements.js";


export function jump(event: MouseEvent) {  
  const rect = timerWrapperEl.getBoundingClientRect();
  
  const offsetX = rect.left;
  const x = Math.round(event.clientX - offsetX); 

  switch (event.type) {
    case 'mousemove': 
      timerSeekerEl.style.width = `${x}px`;
      break;

    case 'mouseleave':
      timerSeekerEl.style.width = `0px`;
      break;
    
    case 'mouseup': 
      const timescale = event.currentTarget as HTMLElement;
      const timescaleWidth = timescale.clientWidth;
      
      const relativePosition = Number((x / timescaleWidth).toFixed(2));

      mediaEl.currentTime = Math.round(mediaEl.duration * relativePosition);
  }
}





