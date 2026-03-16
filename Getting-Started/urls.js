const url = require('node:url');

// Parsing the URL string using the legacy API:
// const myURLTwo =  url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');

// Parsing the URL string using the WHATWG API:
const myURL = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');

// Constructing a URL from component parts
const myURLThree = new URL('https://example.org');
myURLThree.pathname = '/a/b/c';
myURLThree.search = '?d=e';
myURLThree.hash = '#fgh';

// or a template literal string
const pathname = '/a/b/c';
const search = '?d=e';
const hash = '#fgh';


const  myURLFour = new URL(`https://example.org${pathname}${search}${hash}`);
console.log(myURLFour.href);
console.log(URL === require('node:url').URL); // Prints 'true'
console.log('');

const myURLFive = new URL({ toString: () => 'https://example.org'});
console.log(myURLFive.href);

// new URL(input[, base])
const myURLSix = new URL('/foo', 'https://example.org/'); // https://example.org/foo
console.log(myURLSix.href);
console.log('');

// url.hash
const myURLSeven = new URL('https://example.org/foo#bar');
console.log(myURLSeven.hash); // Prints #bar

myURLSeven.hash = 'baz';
console.log(myURL.href); // Prints https://example.org/foo#baz
console.log('');

// url.host
const myURLEight = new URL('https://example.org:81/foo');
console.log(myURLEight.host); // Prints example.org:81

myURLEight.host = 'example.com:82';
console.log(myURLEight.href); // Prints https://example.com:82/foo
console.log('');

// Clas URL Pattern
const myPattern = new URLPattern('https://nodejs.org/docs/latest/api/*.html');
console.log(myPattern.exec('https://nodejs.org/docs/latest/api/dns.html'));
// Prints:
// {
//  "hash": { "groups": {  "0": "" },  "input": "" },
//  "hostname": { "groups": {}, "input": "nodejs.org" },
//  "inputs": [
//    "https://nodejs.org/docs/latest/api/dns.html"
//  ],
//  "password": { "groups": { "0": "" }, "input": "" },
//  "pathname": { "groups": { "0": "dns" }, "input": "/docs/latest/api/dns.html" },
//  "port": { "groups": {}, "input": "" },
//  "protocol": { "groups": {}, "input": "https" },
//  "search": { "groups": { "0": "" }, "input": "" },
//  "username": { "groups": { "0": "" }, "input": "" }
// }

console.log(myPattern.test('https://nodejs.org/docs/latest/api/dns.html'));
// Prints: true
