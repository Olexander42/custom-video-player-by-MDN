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
  value: DURATION,
  configurable: true
})

export const playBtn = document.createElement('button');
export const stopBtn = document.createElement('button');

export const rwdBtn = document.createElement('button');
export const fwdBtn = document.createElement('button');

export const timerWrapperEl = document.createElement('div');
Object.defineProperty(timerWrapperEl, 'clientWidth', {
  value: DURATION
})

export const timerEl = document.createElement('div');
export const timerBarEl = document.createElement('div');


