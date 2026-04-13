const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
// await pool.query("INSERT INTO usernames (username) VALUES ('" + username + "')");
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function searchUsername(username) {
  const { rows } = await pool.query("SELECT * FROM usernames WHERE username ILIKE $1", [`%${username}%`]);
  return rows;
}

async function deleteAllRows() {
  await pool.query("TRUNCATE TABLE usernames RESTART IDENTITY");
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

module.exports = { getAllUsernames, insertUsername, searchUsername, deleteAllRows };