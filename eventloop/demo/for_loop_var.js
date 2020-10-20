#!/usr/bin/env node

// https://wsvincent.com/javascript-event-loop/

// setTimeout callbacks are only pop'ed of the
// callback queue by the event loop when the
// callstack is empty

// as 'var' is function scoped the outer closure 'var'
// is 5 when the setTimeout callbacks finally runs
function varForLoop() {
  console.log('var loop start');
  for (var i = 1; i < 5; i++) {
      setTimeout(() => console.log(`var loop ${i}`), 0);
  }
  busyLoop(10000);
  console.log('var loop end');
}

function busyLoop(millis) {
    const start = Date.now();
    for (let now = Date.now(); now - start < millis; now = Date.now()) {}
}

varForLoop();
