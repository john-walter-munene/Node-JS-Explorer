require('dotenv').config();
const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// Hardcoding them here for simplicity
module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "HomePC",
  database: "top_users",
  password: "552354",
  port: 5432 // The default port
});

// Alternative to defining the connection...
// Again, this should be read from an environment variable
// module.exports = new Pool({
//   connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
// });

