// Example: Read a file and change its content and read
// it again using promise-based API.
const fs = require('fs/promises');

async function example() {
  const fileName = 'C:/Users/HomePC/Desktop/NodeJS/Node-JS-Explorer/test.txt';
  try {
    const data = await fs.readFile(fileName, 'utf8');
    console.log("Current Data....")
    console.log(data);
    console.log("End of current data...");
    console.log('');


    const content = 'Some content!';
    await fs.appendFile(fileName, content);
    console.log('Wrote some content!');
    console.log('');

    const newData = await fs.readFile(fileName, 'utf8');
    console.log("New data....");
    console.log(newData);
    console.log('End of new Data....');
  } catch (err) {
    console.log(err);
  }
}
example();