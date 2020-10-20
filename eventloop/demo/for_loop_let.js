#!/usr/bin/env node

// https://wsvincent.com/javascript-event-loop/

// setTimeout callbacks are only pop'ed of the
// callback queue by the event loop when the
// callstack is empty

// as 'let' is lexically block scoped
// when is this evaluated?
function letForLoop() {
  console.log('let loop start');
  for (let i = 1; i < 5; i++) {
      setTimeout(() => console.log(`let loop ${i}`), 0);
  }
  busyLoop(10000);
  console.log('let loop end');
}

function busyLoop(millis) {
    const start = Date.now();
    for (let now = Date.now(); now - start < millis; now = Date.now()) {}
}

letForLoop();
