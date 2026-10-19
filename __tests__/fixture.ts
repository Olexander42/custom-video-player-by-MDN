export const mediaEl = document.createElement('video');
export const playEl = document.createElement('button');
export const stopEl = document.createElement('button');
export const rwdEl = document.createElement('button');
export const fwdEl = document.createElement('button');

mediaEl.play = vi.fn().mockImplementation(() => {
  Object.defineProperty(mediaEl, 'paused', {
    value: false,
    configurable: true
  })
});

mediaEl.pause = vi.fn().mockImplementation(() => {
  Object.defineProperty(mediaEl, 'paused', {
    value: true,
    configurable: true
  })
});

export const DURATION = 10000;
Object.defineProperty(mediaEl, 'duration', {
  value: DURATION
})


