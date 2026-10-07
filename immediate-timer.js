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