// A GET request.
const https = require('https');

const options = {
    hostname: 'example.com',
    port: 443,
    path: '/todos',
    method: 'GET',
};

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d);
    });
});

req.on('error', error => console.error(error));

req.end();

// Performing a post request
const data = JSON.stringify({
  todo: 'Buy the milk',
});

const optionsTwo = {
  hostname: 'whatever.com',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const reqTwo = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

reqTwo.on('error', error => {
  console.error(error);
});

reqTwo.write(data);
reqTwo.end();