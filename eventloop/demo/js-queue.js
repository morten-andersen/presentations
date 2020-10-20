#!/usr/bin/env node

// shows the ordering of the queues
console.log('script start');

setTimeout(()             => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise1'))
                 .then(() => console.log('promise2'));

Promise.resolve().then(() => console.log('promise3'));

queueMicrotask(()         => console.log('microtask'));

console.log('script end');
