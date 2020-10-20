## JavaScript Event Loop

The JavaScript Event Loop



#### The JavaScript Runtime Loop

* call stack
* event loop
* task queues
* tasks and microtasks


![overview](./eventloop/images/2019-10-24-js-overview.png)



#### The JavaScript Call Stack

* Single-threaded language
 * -> one single call stack
* Non-preemptive scheduling
 * -> whatever runs, runs to completion
 * -> no interrupts


#### Call Stack Example

```javascript
function world() {
  console.log('Hello world');
}

function hello() {
  world();
}

hello();
```

![call stack](./eventloop/images/2019-10-24-js-callstack.png)



#### The Heap

* memory allocation
* garbage collection


some other day!



#### The Event Loop

* single threaded
* semi-infinite
 * (*semi*: terminates when there is no more work)
* is not in the JS standard


![event loop](./eventloop/images/2019-10-24-js-overview.png)



[HTML standard - Web APIs - 8.1.4 Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)

> An event loop has one or more task queues.

> A task queue is a **set** of tasks.


#### Task Queues

> Task queues are **sets, not queues**, because step one of the event loop processing model grabs the first **runnable task** from the chosen queue, instead of dequeuing the first task.


#### Details Queue - here from node.js

![event loop](./eventloop/images/node-js-eventloop.png)



`setTimeout()` - `var`

```javascript
function varForLoop() {
  console.log('var loop start');
  for (var i = 1; i < 5; i++) {
      setTimeout(() => console.log(`var loop ${i}`), 0);
  }
  console.log('var loop end');
}

varForLoop();
```
([for_loop_var.js](./eventloop/demo/for_loop_var.js))

as 'var' is function scoped the outer closure 'var i'
is 5 when the `setTimeout()` callbacks finally runs


#### output
```
var loop start
var loop end
var loop 5
var loop 5
var loop 5
var loop 5
```



`setTimeout` - `let`

```javascript
function letForLoop() {
  console.log('let loop start');
  for (let i = 1; i < 5; i++) {
      setTimeout(() => console.log(`let loop ${i}`), 0);
  }
  console.log('let loop end');
}

letForLoop();
```
([for_loop_let.js](./eventloop/demo/for_loop_let.js))

as 'let' is lexically block scoped the closure 'let i'
is evaluated when the `setTimeout()` callbacks finally runs


#### output
```
let loop start
let loop end
let loop 1
let loop 2
let loop 3
let loop 4
```



#### Tasks and microtasks

[MDN: Using microtasks in JavaScript with queueMicrotask()](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)


#### Tasks

* js program or script element
* event callback
* `setTimeout()` / `setInterval()` ([HTML standard - Web APIs - 8.5 Timers](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers))


> The event loop driving your code handles these **tasks** one after another, in the order in which they were enqueued. Only tasks which were **already in the task queue** when the event loop pass began will be executed during the current iteration. The rest will have to wait until the following iteration.


#### Browser Rendering

* browser rendering happens between tasks
* rendering never happens in the middle of a task



#### Microtasks

* resolved promise _jobs_ (jobs is the term used in ECMAScript)
* `queueMicrotask()` ([HTML standard - Web APIs - 8.6 Microtask queuing](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#microtask-queuing))


#### Microtask Queue

> The **microtask** queue is **not** a task queue.

remember

> Task queues are **sets, not queues**, because step one of the event loop processing model grabs the first **runnable task** from the chosen queue, instead of dequeuing the first task.


> each time a **task exits**, the event loop checks to see if the task is returning control to other JavaScript code. If not, **it runs all of the microtasks in the microtask queue**. The microtask queue is, then, processed multiple times per iteration of the event loop, including after handling events and other callbacks.


> if a **microtask** adds more microtasks to the queue by calling queueMicrotask(), those **newly-added microtasks execute before the next task is run**. That's because the event loop will keep calling microtasks until there are none left in the queue, even if more keep getting added.



#### Tasks and Microtasks - ordering

[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)


```javascript
console.log('script start');

setTimeout(()             => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise1'))
                 .then(() => console.log('promise2'));

Promise.resolve().then(() => console.log('promise3'));

queueMicrotask(()         => console.log('microtask'));

console.log('script end');
```
([js-queue.js](./eventloop/demo/js-queue.js))


#### output
```
script start
script end
promise1
promise3
microtask
promise2
timeout
```


![ordering example](./eventloop/images/2019-10-24-js-microtasks-example.png)



#### Microtasks and Rendering

[Event loop: microtasks and macrotasks](https://javascript.info/event-loop#use-case-2-progress-indication)


![full event loop](./eventloop/images/2019-10-24-js-microtasks-loop.png)


#### Standard Blocking
```html
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

blocks the GUI rendering


#### Breaking it up in Tasks
```html
<div id="progress"></div>

<script>
  let i = 0;

  function count() {
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
      setTimeout(count);
    }
  }
  count();
</script>
```

updates the GUI as we go

[Event loop: microtasks and macrotasks](https://javascript.info/event-loop#use-case-2-progress-indication)


#### Breaking it up in Microtasks
```html
<div id="progress"></div>

<script>
  let i = 0;

  function count() {
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
      queueMicrotask(count);
    }
  }
  count();
</script>
```

blocks/starvates the GUI rendering

[Event loop: microtasks and macrotasks](https://javascript.info/event-loop#macrotasks-and-microtasks)



#### Resources

* [Jake Archibald - Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
* [The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
* [Timers, Immediates and Process.nextTick](https://blog.insiderattack.net/timers-immediates-and-process-nexttick-nodejs-event-loop-part-2-2c53fd511bb3)
* [Event loop: microtasks and macrotasks](https://javascript.info/event-loop)
