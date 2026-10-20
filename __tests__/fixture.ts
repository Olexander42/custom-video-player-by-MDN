export const mediaEl = document.createElement('video');

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

export const DURATION = 100;
Object.defineProperty(mediaEl, 'duration', {
  value: DURATION
})

export const playEl = document.createElement('button');
export const stopEl = document.createElement('button');

export const rwdEl = document.createElement('button');
export const fwdEl = document.createElement('button');

export const timerWrapperEl = document.createElement('div');
Object.defineProperty(timerWrapperEl, 'clientWidth', () => {
  value: 100
})

export const timerEl = document.createElement('div');
export const timerBarEl = document.createElement('div');


