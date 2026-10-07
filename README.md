# setImmediate() and Timer in Node.js

## Aim

To understand how `setImmediate()` and `setTimeout()` work in Node.js and how one callback can schedule another callback.

The main flow is:

```text
setImmediate()
     ↓
  Timer

Timer
  ↓
setImmediate()
```

---

## File Structure

```text
FSD/
│
├── immediate-timer.js
└── README.md
```

---

## Code

Create a file named `immediate-timer.js`:

```js
console.log("Start");

setImmediate(() => {
    console.log("Immediate callback");

    setTimeout(() => {
        console.log("Timer from immediate");
    }, 0);
});

setTimeout(() => {
    console.log("Timer callback");

    setImmediate(() => {
        console.log("Immediate from timer");
    });
}, 0);

console.log("End");
```

---

## How to Run

Open CMD or Terminal in your project folder.

Run:

```bash
node immediate-timer.js
```

---

## How It Works

### 1. Synchronous Code

First:

```js
console.log("Start");
```

prints:

```text
Start
```

Then both `setImmediate()` and `setTimeout()` are registered.

Finally:

```js
console.log("End");
```

prints:

```text
End
```

---

### 2. `setImmediate()` Callback

When the event loop reaches the **Check phase**, the `setImmediate()` callback can run.

It prints:

```text
Immediate callback
```

Inside this callback, a timer is scheduled:

```js
setTimeout(() => {
    console.log("Timer from immediate");
}, 0);
```

So the `setImmediate()` callback **schedules a timer**.

---

### 3. Timer Callback

When the event loop reaches the **Timers phase**, the timer callback runs.

It prints:

```text
Timer callback
```

Inside this callback, another `setImmediate()` is scheduled:

```js
setImmediate(() => {
    console.log("Immediate from timer");
});
```

So the timer callback **schedules a `setImmediate()`**.

---

## Basic Flow Diagram

```text
                 Program Starts
                       │
                       ▼
                    Start
                       │
                       ▼
                     End
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
       setImmediate()        setTimeout()
             │                   │
             ▼                   ▼
    Immediate callback       Timer callback
             │                   │
             │                   ▼
             │            schedules setImmediate()
             │                   │
             │                   ▼
             │          Immediate from timer
             │
             ▼
    schedules setTimeout()
             │
             ▼
    Timer from immediate
```

---

## Important Point

* `setImmediate()` runs in the **Check phase**.
* `setTimeout()` runs in the **Timers phase**.
* A `setImmediate()` callback can schedule a timer.
* A timer callback can schedule `setImmediate()`.

Also, when both `setImmediate()` and `setTimeout(..., 0)` are initially scheduled from the main script, their first execution order can vary.

## Conclusion

This program helps us understand how Node.js moves between the **Timers** and **Check** phases and how callbacks can schedule other callback