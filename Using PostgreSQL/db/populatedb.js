const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

const user = process.env.DB_USER;
const password = process.env.DATABASE_PASSWORD;
const dbName = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

if (!user) console.log("User unavailable");
if (!password) console.log("Password unavailable");

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: `postgresql://${user}:${password}@${host}:${port}/${dbName}`,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();

// # populating production db
// # run it from your machine once after deployment of your app & db
// node db/populatedb.js <production-db-url>
