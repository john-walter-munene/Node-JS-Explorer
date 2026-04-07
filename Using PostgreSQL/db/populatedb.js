require('dotenv').config({ path: '../.env' });
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

const roleName = process.env.roleName;
const rolePassword = process.env.role_password;

if (!roleName) console.log("Role name unavailable");
if (!rolePassword) console.log("Password unavailable");

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${roleName}:${rolePassword}@localhost:5432/top_users`,
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
