// Writing a file

const fs = require('node:fs');
const content = 'Some Content!';

fs.writeFile('C:/Users/HomePC/Desktop/NodeJS/Node-JS-Explorer/test.txt', content, err => {
    if (err) console.log(err);
    else {
        // File written successfully.
    }
});

// Writing a file synchronously.
// const contentTwo = ' A second piece of content';

// try {
//   fs.writeFileSync('C:/Users/HomePC/Desktop/NodeJS/Node-JS-Explorer/test.txt', contentTwo);
//   // file written successfully
// } catch (err) {
//   console.error(err);
// }

// Appending content to a file.
// const contentThree = 'A third piece of content';

// fs.appendFile('file.log', contentThree, err => {
//   if (err) {
//     console.error(err);
//   } else {
//     // done!
//   }
// });

// Promise based
const fs = require('node:fs/promises');

async function example() {
  try {
    const content = 'Some content!';
    await fs.writeFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}

example();