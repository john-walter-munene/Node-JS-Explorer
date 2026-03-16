const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

// creating an event
eventEmitter.on('start', (number) => {
    console.log(`started ${number}`);
});

eventEmitter.emit('start', 23);


// Multiple arguments:
eventEmitter.on('continue', (start, end) => {
  console.log(`continued from ${start} to ${end}`);
});

eventEmitter.emit('continue', 1, 100);

function addNumbers(numOne, numTwo) { return numOne + numTwo };

eventEmitter.on('addition', (firstNumber, secondnumber, additionFunction) => {
    console.log(`Adding ${firstNumber} to ${secondnumber} gives ${additionFunction(firstNumber, secondnumber)}`)
});


console.log(eventEmitter.eventNames());