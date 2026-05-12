const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { Client } = require("pg");

const schema = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "user_sessions" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "user_sessions" ("expire");
`;

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

if (!user || !password || !host || !port || !dbName) throw new Error("Missing environment variables in .env file");
const dbUrl = `postgresql://${user}:${password}@${host}:${port}/${dbName}`;


async function main() {
    console.log("Initializing database...");

    const client = new Client({
        connectionString: dbUrl,
        ssl: process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
    });

    try {
        await client.connect();

        await client.query("BEGIN");

        await client.query(schema);

        await client.query("COMMIT");

        console.log("Database initialized successfully 🚀");
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Initialization failed:", err);
    } finally {
        await client.end();
        console.log("Connection closed.");
    }
}

main();