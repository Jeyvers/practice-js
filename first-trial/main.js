const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' },
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards',
};

const alice1 = document.querySelector('#alice1');
const alice2 = document.querySelector('#alice2');
const alice3 = document.querySelector('#alice3');

// ONE WAY TO DO IT
const result = alice1.animate(aliceTumbling, aliceTiming);
result.finished.then(() => {
  alice2.animate(aliceTumbling, aliceTiming).finished.then(() => {
    alice3.animate(aliceTumbling, aliceTiming);
  });
});
