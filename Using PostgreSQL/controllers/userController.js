const db = require("../db/queries");

async function getUsernames(req, res) {
  const { search } = req.query;
  let usernames;

  if (search) {
    usernames = await db.searchUsername(search);
  } else usernames = await db.getAllUsernames();

  console.log("Usernames: ", usernames);
  
  res.send("Usernames: " + usernames.map(user => user.username).join(", "));
}

async function createUsernameGet(req, res) {
  try {
    res.render("createUsername");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

async function searchUsername(req, res) {
   try {
    res.render("searchUsername");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
}

async function deleteAllUsernames(req, res) {
  try {
    const rows = await db.deleteAllRows();

    if (rows.length === 0) {
      console.log("DB verified: empty");
    } else {
      console.log("DB NOT empty:", rows);
    }

    res.send(
      "Usernames after delete: " +
      rows.map(u => u.username).join(", ").length
    );

  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
}

module.exports = { getUsernames, createUsernameGet, createUsernamePost, searchUsername, deleteAllUsernames };