const express = require('express');
const app = express();

// Route handlers.
app.get('/user/:id', (req, res, next) => {
  if (req.params.id === '0') {
    return next('route')
  }
  res.send(`User ${req.params.id}`)
})

app.get('/user/:id', (req, res) => {
  res.send('Special handler for user ID 0')
});

// Or even a function, an array of functions, or a combo of both

// More than one callback function can handle a route (make sure you specify the next object). For example:
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next();
}, (req, res) => {
  res.send('Hello from B!')
});

// An array of callback functions can handle a route. For example:

const cb0 = function (req, res, next) {
  console.log('CB0')
  next();
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next();
}

const cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

// A combination of independent functions and arrays of functions can handle a route. For example:
const cb0Two = function (req, res, next) {
  console.log('CB0')
  next();
}

const cb1Two = function (req, res, next) {
  console.log('CB1')
  next();
}

app.get('/example/d', [cb0Two, cb1Two], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next();
}, (req, res) => {
  res.send('Hello from D!');
});